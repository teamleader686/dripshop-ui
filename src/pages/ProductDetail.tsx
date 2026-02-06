import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Heart, Minus, Plus, Truck, Shield, RotateCcw, Instagram, Facebook, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import ProductImageGallery from '@/components/products/ProductImageGallery';
import ProductInfo from '@/components/products/ProductInfo';
import StickyAddToCart from '@/components/products/StickyAddToCart';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <AppLayout>
        <div className="container-main py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  return (
    <AppLayout>
      {/* Breadcrumb - desktop only */}
      <div className="hidden md:block container-main py-4">
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-primary">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <div className="container-main pb-4 md:pb-16">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 lg:gap-12">
          <ProductImageGallery product={product} />
          <ProductInfo
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-4 md:mt-16">
        <FeaturedProducts title="You May Also Like" limit={4} />
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <StickyAddToCart product={product} onAddToCart={handleAddToCart} />
    </AppLayout>
  );
};

export default ProductDetail;
