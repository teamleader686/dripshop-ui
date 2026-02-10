import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { DbProduct, getProductImage, getDiscountPercent } from '@/types/database';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface ProductCardProps {
  product: DbProduct;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const discountPercent = getDiscountPercent(product);
  const image = getProductImage(product);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative aspect-square rounded-[20px] overflow-hidden bg-secondary mb-3">
          <img src={image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <button
            className="absolute top-3 right-3 w-8 h-8 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-destructive hover:text-destructive-foreground"
            onClick={(e) => { e.preventDefault(); toast.success('Added to wishlist!'); }}
          >
            <Heart size={16} />
          </button>
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-sm md:text-base text-foreground line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-1.5">
            <div className="star-rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className={i < Math.floor(product.rating) ? 'star-filled' : 'text-muted-foreground/30'} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{product.rating}/<span className="text-muted-foreground/60">5</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg md:text-xl text-foreground">${Number(product.price).toFixed(0)}</span>
            {product.original_price && (
              <>
                <span className="text-sm md:text-base text-muted-foreground line-through">${Number(product.original_price).toFixed(0)}</span>
                <span className="px-2 py-0.5 bg-destructive/10 text-destructive text-[10px] md:text-xs font-medium rounded-full">-{discountPercent}%</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
