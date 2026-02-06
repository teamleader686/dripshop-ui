import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DealsSection = () => {
  const dealProducts = products.filter((p) => p.badge === 'sale').slice(0, 6);

  return (
    <section className="md:hidden py-4">
      <div className="container-main">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-destructive fill-destructive" />
            <h2 className="text-base font-bold">Flash Deals for You</h2>
          </div>
          <Button asChild variant="ghost" size="sm" className="text-primary text-xs">
            <Link to="/products?sale=true">
              See All
              <ArrowRight className="ml-1" size={14} />
            </Link>
          </Button>
        </div>

        <div className="flex overflow-x-auto gap-3 scrollbar-hide pb-2">
          {dealProducts.map((product) => {
            const discountPercent = product.originalPrice
              ? Math.round((1 - product.price / product.originalPrice) * 100)
              : 0;

            return (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="flex-shrink-0 w-28"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-card border border-border">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {discountPercent > 0 && (
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full">
                      -{discountPercent}%
                    </span>
                  )}
                </div>
                <div className="mt-1.5 px-0.5">
                  <p className="text-xs font-medium line-clamp-1">{product.name}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-primary">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-[10px] text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
