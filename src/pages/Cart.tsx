import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  const shipping = totalPrice > 50 ? 0 : 5.99;
  const total = totalPrice + shipping;

  return (
    <AppLayout>
      <div className="container-main py-4 md:py-8 lg:py-12">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <ShoppingBag size={32} className="text-muted-foreground" />
            </div>
            <h2 className="text-lg md:text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground text-sm mb-4 md:mb-6">
              Looks like you haven't added any items yet.
            </p>
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 md:space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-3 md:gap-4 p-3 md:p-4 bg-card rounded-xl border border-border"
                  >
                    <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-24 md:w-24 md:h-32 object-cover rounded-lg"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col min-w-0">
                      <Link
                        to={`/product/${item.product.id}`}
                        className="font-medium text-sm md:text-base hover:text-primary transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mb-1 md:mb-2">
                        {item.product.category}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1.5 md:p-2 hover:bg-muted transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 md:w-8 text-center text-xs md:text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 md:p-2 hover:bg-muted transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <span className="font-semibold text-sm md:text-base">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 md:p-2 text-muted-foreground hover:text-destructive transition-colors self-start"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary - desktop */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-success">🎉 You qualify for free shipping!</p>
                  )}
                  <div className="pt-4 border-t border-border flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button asChild size="lg" className="w-full btn-primary">
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Secure checkout powered by SSL encryption
                </p>
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
            <span className="text-lg font-bold">${total.toFixed(2)}</span>
          </div>
          <Button asChild size="lg" className="w-full btn-primary h-11">
            <Link to="/checkout">
              Checkout
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </Button>
        </div>
      )}
    </AppLayout>
  );
};

export default Cart;
