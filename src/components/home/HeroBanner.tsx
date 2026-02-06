import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const banners = [
  {
    title: 'Premium Silk Blouse',
    subtitle: 'Extraordinary Visual & Exceptional Power',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop',
    cta: 'Shop Now',
    link: '/products',
  },
  {
    title: 'New Season',
    subtitle: 'Up to 50% off on trending items',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=1080&fit=crop',
    cta: 'Explore',
    link: '/products?sale=true',
  },
];

const HeroBanner = () => {
  return (
    <>
      {/* Mobile: Horizontal scroll banners */}
      <section className="md:hidden">
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {banners.map((banner, i) => (
            <div key={i} className="snap-center flex-shrink-0 w-full">
              <div className="relative h-48 mx-4 my-3 rounded-2xl overflow-hidden">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center p-5">
                  <h2 className="text-lg font-bold text-card mb-1">{banner.title}</h2>
                  <p className="text-xs text-card/80 mb-3 max-w-[60%]">{banner.subtitle}</p>
                  <Link to={banner.link}>
                    <Button size="sm" className="btn-primary rounded-full text-xs h-8 px-4">
                      {banner.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Desktop: Full hero */}
      <section className="hidden md:flex relative min-h-[600px] lg:min-h-[700px] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>

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
                <Link to="/products?sale=true">View Sale</Link>
              </Button>
            </motion.div>

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
    </>
  );
};

export default HeroBanner;
