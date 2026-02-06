import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Heart, Minus, Plus, Truck, Shield, RotateCcw, Instagram, Facebook, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface ProductInfoProps {
  product: Product;
  quantity: number;
  setQuantity: (q: number) => void;
  onAddToCart: () => void;
}

const ProductInfo = ({ product, quantity, setQuantity, onAddToCart }: ProductInfoProps) => {
  const discountPercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex flex-col"
    >
      {/* Rating */}
      <div className="flex items-center gap-2 mb-2 md:mb-4">
        <div className="flex items-center gap-1 text-sm">
          <span className="text-primary">★</span>
          <span className="font-medium">{product.rating}</span>
        </div>
        <span className="text-muted-foreground text-xs md:text-sm">({product.reviews} reviews)</span>
      </div>

      <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">{product.name}</h1>

      {/* Price */}
      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
        <span className="text-2xl md:text-3xl font-bold">${product.price.toFixed(2)}</span>
        {product.originalPrice && (
          <>
            <span className="text-base md:text-xl text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
            <span className="px-2 py-0.5 bg-destructive/10 text-destructive text-xs md:text-sm font-medium rounded">
              Save {discountPercent}%
            </span>
          </>
        )}
      </div>

      <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 md:mb-8">
        {product.description}
      </p>

      {/* Quantity & Add to Cart - desktop only */}
      <div className="hidden md:flex items-center gap-4 mb-6">
        <div className="flex items-center border border-border rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-3 hover:bg-muted transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-3 hover:bg-muted transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>

        <Button onClick={onAddToCart} size="lg" className="flex-1 btn-primary">
          Add to Cart
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={() => toast.success('Added to wishlist!')}
        >
          <Heart size={20} />
        </Button>
      </div>

      {/* Features */}
      <div className="space-y-2 md:space-y-3 py-4 md:py-6 border-t border-border">
        <div className="flex items-center gap-3 text-xs md:text-sm">
          <Truck size={16} className="text-primary flex-shrink-0" />
          <span>Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center gap-3 text-xs md:text-sm">
          <Shield size={16} className="text-primary flex-shrink-0" />
          <span>Secure checkout with 256-bit encryption</span>
        </div>
        <div className="flex items-center gap-3 text-xs md:text-sm">
          <RotateCcw size={16} className="text-primary flex-shrink-0" />
          <span>Easy 30-day returns</span>
        </div>
      </div>

      {/* Social Share */}
      <div className="pt-4 md:pt-6 border-t border-border">
        <p className="text-xs md:text-sm font-medium mb-2 md:mb-3">Share this product:</p>
        <div className="flex gap-2 md:gap-3">
          <button className="social-icon instagram-gradient text-card">
            <Instagram size={16} />
          </button>
          <button className="social-icon facebook-bg text-card">
            <Facebook size={16} />
          </button>
          <button className="social-icon bg-muted text-foreground hover:bg-primary hover:text-primary-foreground">
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductInfo;
