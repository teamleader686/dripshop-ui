 import { useState } from 'react';
 import { Link, useNavigate } from 'react-router-dom';
 import Header from '@/components/layout/Header';
 import Footer from '@/components/layout/Footer';
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
       <div className="min-h-screen bg-background">
         <Header />
         <div className="container-main py-16 text-center">
           <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
           <Button asChild>
             <Link to="/products">Continue Shopping</Link>
           </Button>
         </div>
         <Footer />
       </div>
     );
   }
 
   return (
     <div className="min-h-screen bg-background">
       <Header />
       <main className="container-main py-8 lg:py-12">
         <Link to="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
           <ArrowLeft size={16} className="mr-2" />
           Back to Cart
         </Link>
 
         <h1 className="text-3xl lg:text-4xl font-bold mb-8">Checkout</h1>
 
         <form onSubmit={handlePlaceOrder}>
           <div className="grid lg:grid-cols-3 gap-8">
             {/* Shipping Info */}
             <div className="lg:col-span-2 space-y-8">
               {/* Contact */}
               <div className="bg-card rounded-xl border border-border p-6">
                 <h2 className="text-lg font-semibold mb-6">Contact Information</h2>
                 <div className="grid sm:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="email">Email</Label>
                     <Input id="email" type="email" placeholder="your@email.com" required />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="phone">Phone</Label>
                     <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" required />
                   </div>
                 </div>
               </div>
 
               {/* Shipping Address */}
               <div className="bg-card rounded-xl border border-border p-6">
                 <h2 className="text-lg font-semibold mb-6">Shipping Address</h2>
                 <div className="space-y-4">
                   <div className="grid sm:grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <Label htmlFor="firstName">First Name</Label>
                       <Input id="firstName" placeholder="John" required />
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="lastName">Last Name</Label>
                       <Input id="lastName" placeholder="Doe" required />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="address">Address</Label>
                     <Input id="address" placeholder="123 Main Street" required />
                   </div>
                   <div className="grid sm:grid-cols-3 gap-4">
                     <div className="space-y-2">
                       <Label htmlFor="city">City</Label>
                       <Input id="city" placeholder="New York" required />
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="state">State</Label>
                       <Input id="state" placeholder="NY" required />
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="zip">ZIP Code</Label>
                       <Input id="zip" placeholder="10001" required />
                     </div>
                   </div>
                 </div>
               </div>
 
               {/* Payment Method */}
               <div className="bg-card rounded-xl border border-border p-6">
                 <h2 className="text-lg font-semibold mb-6">Payment Method</h2>
                 <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                   <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                     <RadioGroupItem value="cod" id="cod" />
                     <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer flex-1">
                       <Truck size={20} className="text-primary" />
                       <div>
                         <p className="font-medium">Cash on Delivery</p>
                         <p className="text-sm text-muted-foreground">Pay when you receive</p>
                       </div>
                     </Label>
                   </div>
                   <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer opacity-60">
                     <RadioGroupItem value="card" id="card" disabled />
                     <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                       <CreditCard size={20} className="text-muted-foreground" />
                       <div>
                         <p className="font-medium">Credit / Debit Card</p>
                         <p className="text-sm text-muted-foreground">Coming soon</p>
                       </div>
                     </Label>
                   </div>
                 </RadioGroup>
               </div>
             </div>
 
             {/* Order Summary */}
             <div className="lg:col-span-1">
               <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                 <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
 
                 <div className="space-y-4 mb-6">
                   {items.map((item) => (
                     <div key={item.product.id} className="flex gap-3">
                       <img
                         src={item.product.image}
                         alt={item.product.name}
                         className="w-16 h-20 object-cover rounded-lg"
                       />
                       <div className="flex-1">
                         <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                         <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                         <p className="text-sm font-medium mt-1">
                           ${(item.product.price * item.quantity).toFixed(2)}
                         </p>
                       </div>
                     </div>
                   ))}
                 </div>
 
                 <div className="space-y-3 pt-4 border-t border-border mb-6">
                   <div className="flex justify-between text-sm">
                     <span className="text-muted-foreground">Subtotal</span>
                     <span>${totalPrice.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-muted-foreground">Shipping</span>
                     <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                   </div>
                   <div className="flex justify-between font-semibold pt-3 border-t border-border">
                     <span>Total</span>
                     <span>${total.toFixed(2)}</span>
                   </div>
                 </div>
 
                 <Button type="submit" size="lg" className="w-full btn-primary">
                   Place Order
                 </Button>
 
                 <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
                   <Shield size={14} />
                   <span>Secure & encrypted checkout</span>
                 </div>
               </div>
             </div>
           </div>
         </form>
       </main>
       <Footer />
     </div>
   );
 };
 
 export default Checkout;