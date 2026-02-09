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
    <section className="py-6 md:py-12 lg:py-16">
      <div className="container-main">
        <h2 className="section-heading mb-6 md:mb-10">{title}</h2>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden flex overflow-x-auto gap-3 scrollbar-hide pb-2">
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="flex-shrink-0 w-[44vw]">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All button */}
        <div className="flex justify-center mt-6 md:mt-10">
          <Button asChild variant="outline" className="rounded-full px-14 h-12 text-sm font-medium border-border hover:bg-secondary">
            <Link to="/products">
              View All
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
