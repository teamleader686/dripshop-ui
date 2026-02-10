import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  const shipping = totalPrice > 50 ? 0 : 5.99;
  const discount = totalPrice > 100 ? totalPrice * 0.2 : 0;
  const total = totalPrice + shipping - discount;

  return (
    <AppLayout>
      <div className="container-main py-4 md:py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-4 md:mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">{'>'}</span>
          <span className="text-foreground">Cart</span>
        </nav>

        <h1 className="text-2xl md:text-[40px] font-black uppercase mb-6 md:mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <ShoppingBag size={32} className="text-muted-foreground" />
            </div>
            <h2 className="text-lg md:text-xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground text-sm mb-4 md:mb-6">
              Looks like you haven't added any items yet.
            </p>
            <Button asChild className="btn-primary px-8 h-11">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_400px] gap-5">
            {/* Cart Items */}
            <div className="border border-border rounded-[20px] p-4 md:p-6 space-y-4">
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`flex gap-4 ${index < items.length - 1 ? 'pb-4 border-b border-border' : ''}`}
                  >
                    <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-[100px] h-[100px] md:w-[124px] md:h-[124px] object-cover rounded-lg"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link
                            to={`/product/${item.product.id}`}
                            className="font-bold text-sm md:text-base hover:text-muted-foreground transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Size: Large
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Color: White
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 text-destructive hover:text-destructive/80 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-2">
                        <span className="font-bold text-lg">
                          ${(item.product.price * item.quantity).toFixed(0)}
                        </span>
                        <div className="flex items-center bg-secondary rounded-full">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 hover:bg-border/50 rounded-l-full transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 hover:bg-border/50 rounded-r-full transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="hidden lg:block">
              <div className="border border-border rounded-[20px] p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold">${totalPrice.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount (-20%)</span>
                    <span className="font-bold text-destructive">-${discount.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span className="font-bold">{shipping === 0 ? 'Free' : `$${shipping.toFixed(0)}`}</span>
                  </div>
                  <div className="pt-4 border-t border-border flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="text-xl font-bold">${total.toFixed(0)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="flex gap-2 mb-6">
                  <div className="relative flex-1">
                    <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Add promo code"
                      className="h-11 pl-11 rounded-full bg-secondary border-0 text-sm"
                    />
                  </div>
                  <Button className="btn-primary h-11 px-6 text-sm">Apply</Button>
                </div>

                <Button asChild size="lg" className="w-full btn-primary h-13 text-sm">
                  <Link to="/checkout">
                    Go to Checkout
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Checkout Bar */}
      {items.length > 0 && (
        <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-card border-t border-border px-4 py-3 shadow-bottom-nav md:bottom-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total ({totalItems} items)</span>
            <span className="text-lg font-bold">${total.toFixed(0)}</span>
          </div>
          <Button asChild size="lg" className="w-full btn-primary h-11">
            <Link to="/checkout">
              Go to Checkout
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </Button>
        </div>
      )}
    </AppLayout>
  );
};

export default Cart;
