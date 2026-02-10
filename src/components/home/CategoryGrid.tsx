import { Link } from 'react-router-dom';
import { useCategories } from '@/hooks/useProducts';
import { motion } from 'framer-motion';

const dressStyles = [
  { name: 'Casual', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop', className: 'md:col-span-1' },
  { name: 'Formal', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=400&fit=crop', className: 'md:col-span-2' },
  { name: 'Party', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop', className: 'md:col-span-2' },
  { name: 'Gym', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop', className: 'md:col-span-1' },
];

const CategoryGrid = () => {
  const { data: categories } = useCategories();

  return (
    <section className="py-6 md:py-16 lg:py-20">
      <div className="container-main">
        <div className="md:hidden">
          <h2 className="text-base font-bold mb-3">Categories</h2>
          <div className="flex overflow-x-auto gap-3 scrollbar-hide pb-2">
            {(categories || []).map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${encodeURIComponent(category.slug)}`}
                className="flex-shrink-0 px-4 py-2 bg-secondary rounded-full text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <div className="bg-secondary rounded-[40px] p-10 lg:p-16">
            <h2 className="section-heading mb-10 lg:mb-14">Browse By Dress Style</h2>
            <div className="grid grid-cols-3 gap-5">
              {dressStyles.map((style, index) => (
                <motion.div
                  key={style.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className={style.className}
                >
                  <Link
                    to={`/products?category=${encodeURIComponent(style.name.toLowerCase())}`}
                    className="group block relative h-[290px] rounded-[20px] overflow-hidden bg-card"
                  >
                    <img src={style.image} alt={style.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-transparent" />
                    <h3 className="absolute top-6 left-8 text-2xl lg:text-[36px] font-bold text-foreground">{style.name}</h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
