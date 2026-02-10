
-- Roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles
CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can read all profiles" ON public.profiles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.email, '')
  );
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Categories
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT,
  description TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage categories" ON public.categories FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  category_id UUID REFERENCES public.categories(id),
  images TEXT[] NOT NULL DEFAULT '{}',
  rating NUMERIC(2,1) NOT NULL DEFAULT 0,
  review_count INT NOT NULL DEFAULT 0,
  stock INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read active products" ON public.products FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage products" ON public.products FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Orders
CREATE TYPE public.order_status AS ENUM ('placed', 'processing', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled');

CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE DEFAULT 'ORD-' || UPPER(SUBSTR(MD5(RANDOM()::TEXT), 1, 8)),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status order_status NOT NULL DEFAULT 'placed',
  total_amount NUMERIC(10,2) NOT NULL,
  shipping_address TEXT NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'cod',
  placed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage all orders" ON public.orders FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Order items
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  price NUMERIC(10,2) NOT NULL,
  product_name TEXT NOT NULL,
  product_image TEXT
);
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own order items" ON public.order_items
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Users can insert own order items" ON public.order_items
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Admins can manage all order items" ON public.order_items
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Order timeline
CREATE TABLE public.order_timeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  status order_status NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.order_timeline ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own order timeline" ON public.order_timeline
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_timeline.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Admins can manage all timelines" ON public.order_timeline
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Auto-insert timeline on order status change
CREATE OR REPLACE FUNCTION public.handle_order_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO public.order_timeline (order_id, status)
    VALUES (NEW.id, NEW.status);
  END IF;
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_order_status_change
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_order_status_change();

-- Auto-insert initial timeline on order creation
CREATE OR REPLACE FUNCTION public.handle_new_order()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.order_timeline (order_id, status)
  VALUES (NEW.id, NEW.status);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_order_created
  AFTER INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_order();

-- Shipping
CREATE TYPE public.shipping_stage AS ENUM ('picked_up', 'in_transit', 'out_for_delivery', 'delivered');

CREATE TABLE public.shipping (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL UNIQUE,
  courier TEXT NOT NULL,
  tracking_id TEXT NOT NULL,
  stage shipping_stage NOT NULL DEFAULT 'picked_up',
  estimated_delivery DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.shipping ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own shipping" ON public.shipping
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = shipping.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Admins can manage all shipping" ON public.shipping
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Shipping updates
CREATE TABLE public.shipping_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipping_id UUID REFERENCES public.shipping(id) ON DELETE CASCADE NOT NULL,
  stage shipping_stage NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.shipping_updates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own shipping updates" ON public.shipping_updates
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.shipping s
    JOIN public.orders o ON o.id = s.order_id
    WHERE s.id = shipping_updates.shipping_id AND o.user_id = auth.uid()
  ));
CREATE POLICY "Admins can manage all shipping updates" ON public.shipping_updates
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Returns
CREATE TYPE public.return_status AS ENUM ('requested', 'approved', 'rejected', 'pickup_scheduled', 'returned', 'refund_processed');

CREATE TABLE public.returns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reason TEXT NOT NULL,
  status return_status NOT NULL DEFAULT 'requested',
  refund_amount NUMERIC(10,2) NOT NULL,
  requested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.returns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own returns" ON public.returns FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own returns" ON public.returns FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage all returns" ON public.returns FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Return timeline
CREATE TABLE public.return_timeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  return_id UUID REFERENCES public.returns(id) ON DELETE CASCADE NOT NULL,
  status return_status NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.return_timeline ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own return timeline" ON public.return_timeline
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.returns WHERE returns.id = return_timeline.return_id AND returns.user_id = auth.uid()));
CREATE POLICY "Admins can manage all return timelines" ON public.return_timeline
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Auto-insert return timeline on status change
CREATE OR REPLACE FUNCTION public.handle_return_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.return_timeline (return_id, status)
    VALUES (NEW.id, NEW.status);
  ELSIF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO public.return_timeline (return_id, status)
    VALUES (NEW.id, NEW.status);
  END IF;
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_return_status_change
  BEFORE INSERT OR UPDATE ON public.returns
  FOR EACH ROW EXECUTE FUNCTION public.handle_return_status_change();

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_shipping_updated_at BEFORE UPDATE ON public.shipping FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);
CREATE POLICY "Anyone can view product images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Admins can upload product images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update product images" ON storage.objects FOR UPDATE USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete product images" ON storage.objects FOR DELETE USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.shipping;
ALTER PUBLICATION supabase_realtime ADD TABLE public.returns;
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;

-- Indexes
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_active ON public.products(is_active);
CREATE INDEX idx_orders_user ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_order_items_order ON public.order_items(order_id);
CREATE INDEX idx_shipping_order ON public.shipping(order_id);
CREATE INDEX idx_returns_order ON public.returns(order_id);
CREATE INDEX idx_returns_user ON public.returns(user_id);
