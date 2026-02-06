import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const discountPercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-card border border-border">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badge */}
          {product.badge && (
            <span className={`product-badge ${
              product.badge === 'sale' ? 'product-badge-sale' : 'product-badge-new'
            }`}>
              {product.badge === 'sale' ? `-${discountPercent}%` : product.badge.toUpperCase()}
            </span>
          )}

          {/* Wishlist Button - desktop only */}
          <button
            className="absolute top-2 right-2 w-8 h-8 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-primary hover:text-primary-foreground hidden md:flex"
            onClick={(e) => {
              e.preventDefault();
              toast.success('Added to wishlist!');
            }}
          >
            <Heart size={16} />
          </button>

          {/* Quick Add Button - desktop only */}
          <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-card/95 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground"
              size="sm"
            >
              <ShoppingBag size={14} className="mr-1.5" />
              Quick Add
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-2 md:mt-4 space-y-0.5 md:space-y-1">
          <h3 className="font-medium text-xs md:text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm md:text-base text-foreground">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-[11px] md:text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-[11px] md:text-sm text-muted-foreground">
            <span className="text-primary">★</span>
            <span>{product.rating}</span>
            <span>({product.reviews})</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
