import { products } from '@/data/products';
import { Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const InstagramSection = () => {
  const instagramPosts = products.slice(0, 6);

  return (
    <section className="py-6 md:py-16 lg:py-24">
      <div className="container-main">
        <div className="text-center mb-4 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 rounded-full mb-2 md:mb-4">
            <Instagram className="text-pink-500" size={16} />
            <span className="font-medium text-xs md:text-base">Follow @luxe.official</span>
          </div>
          <h2 className="text-lg md:text-3xl lg:text-4xl font-bold mb-1 md:mb-4">Shop Our Instagram</h2>
          <p className="text-muted-foreground text-xs md:text-base max-w-md mx-auto hidden md:block">
            Get inspired by our community. Tag #LUXESTYLE for a chance to be featured.
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 md:gap-4">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="group relative aspect-square rounded-lg md:rounded-xl overflow-hidden cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="text-secondary-foreground" size={24} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
