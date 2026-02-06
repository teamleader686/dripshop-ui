import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const shipping = totalPrice > 50 ? 0 : 5.99;
  const total = totalPrice + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    navigate('/order-success');
  };

  if (items.length === 0) {
    return (
      <AppLayout>
        <div className="container-main py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container-main py-4 md:py-8 lg:py-12">
        <Link to="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 md:mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Back to Cart
        </Link>

        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
            {/* Shipping Info */}
            <div className="lg:col-span-2 space-y-4 md:space-y-8">
              {/* Contact */}
              <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Contact Information</h2>
                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="email" className="text-sm">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" required />
                  </div>
                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="phone" className="text-sm">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" required />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Shipping Address</h2>
                <div className="space-y-3 md:space-y-4">
                  <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-1.5 md:space-y-2">
                      <Label htmlFor="firstName" className="text-sm">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <Label htmlFor="lastName" className="text-sm">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="address" className="text-sm">Address</Label>
                    <Input id="address" placeholder="123 Main Street" required />
                  </div>
                  <div className="grid grid-cols-3 gap-3 md:gap-4">
                    <div className="space-y-1.5 md:space-y-2">
                      <Label htmlFor="city" className="text-sm">City</Label>
                      <Input id="city" placeholder="New York" required />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <Label htmlFor="state" className="text-sm">State</Label>
                      <Input id="state" placeholder="NY" required />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <Label htmlFor="zip" className="text-sm">ZIP</Label>
                      <Input id="zip" placeholder="10001" required />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 p-3 md:p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer flex-1">
                      <Truck size={18} className="text-primary" />
                      <div>
                        <p className="font-medium text-sm">Cash on Delivery</p>
                        <p className="text-xs text-muted-foreground">Pay when you receive</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 md:p-4 border border-border rounded-lg cursor-pointer opacity-60">
                    <RadioGroupItem value="card" id="card" disabled />
                    <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                      <CreditCard size={18} className="text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">Credit / Debit Card</p>
                        <p className="text-xs text-muted-foreground">Coming soon</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-4 md:p-6 sticky top-24">
                <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Order Summary</h2>
                <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-18 md:w-16 md:h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-xs md:text-sm font-medium line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-xs md:text-sm font-medium mt-1">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 md:space-y-3 pt-3 md:pt-4 border-t border-border mb-4 md:mb-6">
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 md:pt-3 border-t border-border">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full btn-primary">
                  Place Order
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-3 md:mt-4">
                  <Shield size={14} />
                  <span>Secure & encrypted checkout</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default Checkout;
