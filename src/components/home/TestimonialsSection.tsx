import { testimonials } from '@/data/products';
import { motion } from 'framer-motion';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const TestimonialsSection = () => {
  return (
    <section className="py-8 md:py-16 lg:py-20">
      <div className="container-main">
        <div className="flex items-end justify-between mb-6 md:mb-10">
          <h2 className="section-heading text-left !text-2xl md:!text-4xl lg:!text-5xl">
            Our Happy Customers
          </h2>
          <div className="hidden md:flex items-center gap-2">
            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <ArrowLeft size={18} />
            </button>
            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden flex overflow-x-auto gap-3 scrollbar-hide pb-2">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-[85vw] border border-border rounded-[20px] p-6"
            >
              <div className="star-rating mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="star-filled" fill="currentColor" />
                ))}
              </div>
              <div className="flex items-center gap-1 mb-2">
                <span className="font-bold text-sm">{testimonial.name}</span>
                <svg className="w-5 h-5 text-success" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">"{testimonial.text}"</p>
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="border border-border rounded-[20px] p-7"
            >
              <div className="star-rating mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="star-filled" fill="currentColor" />
                ))}
              </div>
              <div className="flex items-center gap-1.5 mb-3">
                <span className="font-bold">{testimonial.name}</span>
                <svg className="w-5 h-5 text-success" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p className="text-muted-foreground leading-relaxed">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
