import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { getProductImage, getDiscountPercent } from '@/types/database';
import { Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DealsSection = () => {
  const { data: products } = useProducts({ limit: 12 });
  const dealProducts = (products || []).filter(p => p.original_price && p.original_price > p.price).slice(0, 6);

  if (dealProducts.length === 0) return null;

  return (
    <section className="md:hidden py-4">
      <div className="container-main">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-destructive fill-destructive" />
            <h2 className="text-base font-bold">Flash Deals</h2>
          </div>
          <Button asChild variant="ghost" size="sm" className="text-foreground text-xs">
            <Link to="/products">See All<ArrowRight className="ml-1" size={14} /></Link>
          </Button>
        </div>
        <div className="flex overflow-x-auto gap-3 scrollbar-hide pb-2">
          {dealProducts.map((product) => {
            const discountPercent = getDiscountPercent(product);
            const image = getProductImage(product);
            return (
              <Link key={product.id} to={`/product/${product.id}`} className="flex-shrink-0 w-28">
                <div className="relative aspect-square rounded-[16px] overflow-hidden bg-secondary">
                  <img src={image} alt={product.name} className="w-full h-full object-cover" />
                  {discountPercent > 0 && (
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full">-{discountPercent}%</span>
                  )}
                </div>
                <div className="mt-1.5 px-0.5">
                  <p className="text-xs font-bold line-clamp-1">{product.name}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold">${Number(product.price)}</span>
                    {product.original_price && (
                      <span className="text-[10px] text-muted-foreground line-through">${Number(product.original_price)}</span>
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
