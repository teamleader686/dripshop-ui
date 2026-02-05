 import { testimonials } from '@/data/products';
 import { motion } from 'framer-motion';
 import { Star } from 'lucide-react';
 
 const TestimonialsSection = () => {
   return (
     <section className="py-16 lg:py-24 bg-muted/50">
       <div className="container-main">
         <div className="text-center mb-12">
           <h2 className="text-3xl lg:text-4xl font-bold mb-4">What Our Customers Say</h2>
           <p className="text-muted-foreground max-w-md mx-auto">
             Join thousands of satisfied customers who love shopping with us
           </p>
         </div>
 
         <div className="grid md:grid-cols-3 gap-6">
           {testimonials.map((testimonial, index) => (
             <motion.div
               key={testimonial.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1, duration: 0.4 }}
               className="bg-card rounded-2xl p-6 shadow-soft"
             >
               <div className="flex gap-1 mb-4">
                 {[...Array(testimonial.rating)].map((_, i) => (
                   <Star key={i} size={16} className="fill-primary text-primary" />
                 ))}
               </div>
               <p className="text-foreground/80 mb-6 leading-relaxed">"{testimonial.text}"</p>
               <div className="flex items-center gap-3">
                 <img
                   src={testimonial.avatar}
                   alt={testimonial.name}
                   className="w-10 h-10 rounded-full object-cover"
                 />
                 <span className="font-medium">{testimonial.name}</span>
               </div>
             </motion.div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default TestimonialsSection;