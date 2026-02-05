 import { Truck, Shield, RefreshCw, Headphones } from 'lucide-react';
 
 const PromoBar = () => {
   const features = [
     { icon: Truck, title: 'Free Shipping', description: 'On orders over $50' },
     { icon: Shield, title: 'Secure Payment', description: '100% secure checkout' },
     { icon: RefreshCw, title: 'Easy Returns', description: '30-day return policy' },
     { icon: Headphones, title: '24/7 Support', description: 'Dedicated support' },
   ];
 
   return (
     <section className="py-12 border-y border-border">
       <div className="container-main">
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
           {features.map((feature) => (
             <div key={feature.title} className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                 <feature.icon className="text-primary" size={22} />
               </div>
               <div>
                 <h4 className="font-semibold text-sm">{feature.title}</h4>
                 <p className="text-xs text-muted-foreground">{feature.description}</p>
               </div>
             </div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default PromoBar;