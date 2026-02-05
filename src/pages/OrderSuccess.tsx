 import { Link } from 'react-router-dom';
 import Header from '@/components/layout/Header';
 import Footer from '@/components/layout/Footer';
 import { Button } from '@/components/ui/button';
 import { CheckCircle, Package, ArrowRight } from 'lucide-react';
 import { motion } from 'framer-motion';
 
 const OrderSuccess = () => {
   const orderId = `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
 
   return (
     <div className="min-h-screen bg-background">
       <Header />
       <main className="container-main py-16 lg:py-24">
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
           className="max-w-md mx-auto text-center"
         >
           <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
             <CheckCircle className="text-success" size={40} />
           </div>
 
           <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
           <p className="text-muted-foreground mb-8">
             Thank you for your purchase. Your order has been received and is being processed.
           </p>
 
           <div className="bg-card rounded-xl border border-border p-6 mb-8">
             <div className="flex items-center justify-center gap-3 mb-4">
               <Package className="text-primary" size={24} />
               <span className="font-semibold">Order ID: {orderId}</span>
             </div>
             <p className="text-sm text-muted-foreground">
               You will receive an email confirmation shortly with your order details and tracking information.
             </p>
           </div>
 
           <div className="space-y-3">
             <Button asChild size="lg" className="w-full btn-primary">
               <Link to="/products">
                 Continue Shopping
                 <ArrowRight className="ml-2" size={18} />
               </Link>
             </Button>
             <Button asChild variant="outline" size="lg" className="w-full">
               <Link to="/">
                 Back to Home
               </Link>
             </Button>
           </div>
         </motion.div>
       </main>
       <Footer />
     </div>
   );
 };
 
 export default OrderSuccess;