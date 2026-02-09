import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const stats = [
  { value: '200+', label: 'International Brands' },
  { value: '2,000+', label: 'High-Quality Products' },
  { value: '30,000+', label: 'Happy Customers' },
];

const brands = ['VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'Calvin Klein'];

const banners = [
  {
    title: 'Premium Silk Blouse',
    subtitle: 'Extraordinary Visual & Exceptional Power',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop',
  },
  {
    title: 'New Season',
    subtitle: 'Up to 50% off on trending items',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=1080&fit=crop',
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
                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center p-5">
                  <h2 className="text-lg font-bold text-primary-foreground mb-1">{banner.title}</h2>
                  <p className="text-xs text-primary-foreground/80 mb-3 max-w-[60%]">{banner.subtitle}</p>
                  <Link to="/products">
                    <Button size="sm" className="btn-primary text-xs h-8 px-4">Shop Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Mobile brand strip */}
        <div className="bg-primary py-4 overflow-hidden">
          <div className="flex items-center justify-around gap-6 px-4">
            {brands.slice(0, 4).map((brand) => (
              <span key={brand} className="text-primary-foreground text-xs font-bold tracking-wider whitespace-nowrap">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop: SHOP.CO style hero */}
      <section className="hidden md:block bg-secondary">
        <div className="container-main">
          <div className="flex items-center min-h-[600px] lg:min-h-[660px]">
            {/* Left Content */}
            <div className="flex-1 py-16 pr-8">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl lg:text-[64px] font-black leading-[1.1] tracking-tight uppercase mb-6"
              >
                Find Clothes That Matches Your Style
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-muted-foreground text-base max-w-lg mb-8 leading-relaxed"
              >
                Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Button asChild size="lg" className="btn-primary px-14 h-13 text-base">
                  <Link to="/products">Shop Now</Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-8 mt-12"
              >
                {stats.map((stat, i) => (
                  <div key={stat.label} className={`${i > 0 ? 'pl-8 border-l border-border' : ''}`}>
                    <p className="text-3xl lg:text-[40px] font-black">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block flex-1 relative h-[600px]"
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop"
                alt="Fashion model"
                className="w-full h-full object-cover object-top"
              />
              {/* Decorative star */}
              <svg className="absolute top-8 right-8 w-16 h-16 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
              </svg>
              <svg className="absolute bottom-20 left-4 w-8 h-8 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Brand bar */}
        <div className="bg-primary py-6">
          <div className="container-main">
            <div className="flex items-center justify-between">
              {brands.map((brand) => (
                <span key={brand} className="text-primary-foreground text-xl lg:text-2xl font-bold tracking-wider"
                  style={{ fontFamily: 'serif', fontStyle: brand === 'ZARA' ? 'italic' : 'normal' }}
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroBanner;
