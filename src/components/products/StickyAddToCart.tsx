import { DbProduct, getProductImage } from '@/types/database';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface StickyAddToCartProps {
  product: DbProduct;
  onAddToCart: () => void;
}

const StickyAddToCart = ({ product, onAddToCart }: StickyAddToCartProps) => {
  return (
    <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-card border-t border-border px-4 py-3 shadow-bottom-nav">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <span className="text-lg font-bold">${Number(product.price).toFixed(0)}</span>
          {product.original_price && (
            <span className="text-xs text-muted-foreground line-through ml-1">${Number(product.original_price).toFixed(0)}</span>
          )}
        </div>
        <Button className="flex-1 h-10 text-sm btn-primary" onClick={onAddToCart}>
          <ShoppingCart size={16} className="mr-1.5" /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default StickyAddToCart;
