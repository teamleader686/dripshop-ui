import { products } from '@/data/products';
import { Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const InstagramSection = () => {
  const instagramPosts = products.slice(0, 6);

  return (
    <section className="py-6 md:py-16 lg:py-20 hidden md:block">
      <div className="container-main">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full mb-4">
            <Instagram className="text-foreground" size={16} />
            <span className="font-medium text-sm">Follow @shopco.official</span>
          </div>
          <h2 className="section-heading">Shop Our Instagram</h2>
        </div>

        <div className="grid grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="group relative aspect-square rounded-[20px] overflow-hidden cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="text-background" size={24} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
