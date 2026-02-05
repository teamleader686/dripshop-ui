 import { Link } from 'react-router-dom';
 import { categories } from '@/data/products';
 import { motion } from 'framer-motion';
 
 const CategoryGrid = () => {
   return (
     <section className="py-16 lg:py-24 bg-muted/50">
       <div className="container-main">
         <div className="text-center mb-12">
           <h2 className="text-3xl lg:text-4xl font-bold mb-4">Shop by Category</h2>
           <p className="text-muted-foreground max-w-md mx-auto">
             Browse our curated collections and find exactly what you're looking for
           </p>
         </div>
 
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
           {categories.map((category, index) => (
             <motion.div
               key={category.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1, duration: 0.4 }}
             >
               <Link
                 to={`/products?category=${encodeURIComponent(category.name)}`}
                 className="group block"
               >
                 <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                   <img
                     src={category.image}
                     alt={category.name}
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
                   <div className="absolute bottom-0 left-0 right-0 p-4 text-secondary-foreground">
                     <h3 className="font-semibold text-sm lg:text-base">{category.name}</h3>
                     <p className="text-xs text-secondary-foreground/70">{category.productCount} items</p>
                   </div>
                 </div>
               </Link>
             </motion.div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default CategoryGrid;