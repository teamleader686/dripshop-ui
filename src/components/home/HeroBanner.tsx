 import { Link } from 'react-router-dom';
 import { Button } from '@/components/ui/button';
 import { motion } from 'framer-motion';
 import { ArrowRight } from 'lucide-react';
 
 const HeroBanner = () => {
   return (
     <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
       {/* Background */}
       <div className="absolute inset-0">
         <img
           src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop"
           alt="Hero background"
           className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
       </div>
 
       {/* Content */}
       <div className="container-main relative z-10">
         <div className="max-w-xl">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
           >
             <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
               New Season Collection
             </span>
           </motion.div>
 
           <motion.h1
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
           >
             Discover Your
             <br />
             <span className="text-gradient">Perfect Style</span>
           </motion.h1>
 
           <motion.p
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="text-lg text-muted-foreground mb-8 max-w-md"
           >
             Explore our curated collection of premium fashion and lifestyle products. 
             Elevate your wardrobe with pieces that define you.
           </motion.p>
 
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.3 }}
             className="flex flex-wrap gap-4"
           >
             <Button asChild size="lg" className="btn-primary rounded-full px-8">
               <Link to="/products">
                 Shop Now
                 <ArrowRight className="ml-2" size={18} />
               </Link>
             </Button>
             <Button asChild variant="outline" size="lg" className="rounded-full px-8">
               <Link to="/products?sale=true">
                 View Sale
               </Link>
             </Button>
           </motion.div>
 
           {/* Stats */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.6, delay: 0.5 }}
             className="flex gap-8 mt-12 pt-8 border-t border-border/50"
           >
             <div>
               <p className="text-2xl font-bold">50k+</p>
               <p className="text-sm text-muted-foreground">Happy Customers</p>
             </div>
             <div>
               <p className="text-2xl font-bold">1000+</p>
               <p className="text-sm text-muted-foreground">Products</p>
             </div>
             <div>
               <p className="text-2xl font-bold">4.9</p>
               <p className="text-sm text-muted-foreground">Rating</p>
             </div>
           </motion.div>
         </div>
       </div>
     </section>
   );
 };
 
 export default HeroBanner;