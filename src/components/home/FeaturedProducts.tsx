import { products } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  filter?: 'trending' | 'sale' | 'new';
  limit?: number;
}

const FeaturedProducts = ({ title, subtitle, filter, limit = 4 }: FeaturedProductsProps) => {
  const filteredProducts = filter
    ? products.filter((p) => p.badge === filter).slice(0, limit)
    : products.slice(0, limit);

  return (
    <section className="py-4 md:py-16 lg:py-24">
      <div className="container-main">
        {/* Mobile: compact header with "See All" */}
        <div className="flex items-center justify-between mb-3 md:mb-10">
          <div>
            <h2 className="text-base md:text-3xl lg:text-4xl font-bold mb-0 md:mb-2">{title}</h2>
            {subtitle && <p className="text-muted-foreground text-xs md:text-base hidden md:block">{subtitle}</p>}
          </div>
          <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary/80 text-xs md:text-sm">
            <Link to="/products">
              <span className="md:hidden">See All</span>
              <span className="hidden md:inline">View All</span>
              <ArrowRight className="ml-1" size={14} />
            </Link>
          </Button>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden flex overflow-x-auto gap-3 scrollbar-hide pb-2">
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="flex-shrink-0 w-[42vw]">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
