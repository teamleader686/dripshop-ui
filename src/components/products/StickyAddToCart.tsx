import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface StickyAddToCartProps {
  product: Product;
  onAddToCart: () => void;
}

const StickyAddToCart = ({ product, onAddToCart }: StickyAddToCartProps) => {
  return (
    <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-card border-t border-border px-4 py-3 shadow-bottom-nav">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through ml-1">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <Button
          variant="outline"
          className="flex-1 h-10 text-sm border-primary text-primary"
          onClick={() => toast.success('Buy Now coming soon!')}
        >
          <Zap size={16} className="mr-1.5" />
          Buy Now
        </Button>
        <Button
          className="flex-1 h-10 text-sm btn-primary"
          onClick={onAddToCart}
        >
          <ShoppingCart size={16} className="mr-1.5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default StickyAddToCart;
