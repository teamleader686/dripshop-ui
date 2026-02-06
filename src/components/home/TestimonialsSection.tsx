import { testimonials } from '@/data/products';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  return (
    <section className="py-6 md:py-16 lg:py-24 bg-muted/50">
      <div className="container-main">
        <div className="text-center mb-4 md:mb-12">
          <h2 className="text-lg md:text-3xl lg:text-4xl font-bold mb-1 md:mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground text-xs md:text-base max-w-md mx-auto hidden md:block">
            Join thousands of satisfied customers who love shopping with us
          </p>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden flex overflow-x-auto gap-3 scrollbar-hide pb-2">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-[75vw] bg-card rounded-xl p-4 shadow-card"
            >
              <div className="flex gap-0.5 mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={12} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/80 text-xs mb-3 leading-relaxed">"{testimonial.text}"</p>
              <div className="flex items-center gap-2">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium text-xs">{testimonial.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
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
