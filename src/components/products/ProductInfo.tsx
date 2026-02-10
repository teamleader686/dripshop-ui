import { useState } from 'react';
import { DbProduct, getProductImage, getDiscountPercent } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Heart, Minus, Plus, Truck, Shield, RotateCcw, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface ProductInfoProps {
  product: DbProduct;
  quantity: number;
  setQuantity: (q: number) => void;
  onAddToCart: () => void;
}

const ProductInfo = ({ product, quantity, setQuantity, onAddToCart }: ProductInfoProps) => {
  const discountPercent = getDiscountPercent(product);

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-col">
      <h1 className="text-2xl md:text-3xl lg:text-[40px] font-black uppercase leading-tight mb-3">{product.name}</h1>
      <div className="flex items-center gap-3 mb-4">
        <div className="star-rating">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} className={i < Math.floor(product.rating) ? 'star-filled' : 'text-muted-foreground/30'} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
          ))}
        </div>
        <span className="text-sm">{product.rating}/<span className="text-muted-foreground">5</span></span>
      </div>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl md:text-[32px] font-bold">${Number(product.price).toFixed(0)}</span>
        {product.original_price && (
          <>
            <span className="text-2xl md:text-[32px] text-muted-foreground line-through">${Number(product.original_price).toFixed(0)}</span>
            <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-medium rounded-full">-{discountPercent}%</span>
          </>
        )}
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 pb-6 border-b border-border">{product.description}</p>

      <div className="mb-6 pb-6 border-b border-border">
        <p className="text-sm text-muted-foreground mb-3">Select Colors</p>
        <div className="flex gap-3">
          {['bg-[hsl(30_15%_30%)]', 'bg-[hsl(150_30%_30%)]', 'bg-[hsl(220_30%_30%)]'].map((color, i) => (
            <button key={i} className={`w-9 h-9 rounded-full ${color} ${i === 0 ? 'ring-2 ring-foreground ring-offset-2' : ''}`} />
          ))}
        </div>
      </div>

      <div className="mb-6 pb-6 border-b border-border">
        <p className="text-sm text-muted-foreground mb-3">Choose Size</p>
        <div className="flex gap-2">
          {['Small', 'Medium', 'Large', 'X-Large'].map((size, i) => (
            <button key={size} className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${i === 2 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground'}`}>{size}</button>
          ))}
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4 mb-6">
        <div className="flex items-center bg-secondary rounded-full">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3.5 hover:bg-border/50 rounded-l-full transition-colors"><Minus size={18} /></button>
          <span className="w-14 text-center font-medium">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="p-3.5 hover:bg-border/50 rounded-r-full transition-colors"><Plus size={18} /></button>
        </div>
        <Button onClick={onAddToCart} size="lg" className="flex-1 btn-primary h-13 text-sm">Add to Cart</Button>
      </div>

      <div className="space-y-3 py-5 border-t border-border">
        <div className="flex items-center gap-3 text-sm"><Truck size={18} className="text-muted-foreground flex-shrink-0" /><span>Free shipping on orders over $50</span></div>
        <div className="flex items-center gap-3 text-sm"><Shield size={18} className="text-muted-foreground flex-shrink-0" /><span>Secure checkout with 256-bit encryption</span></div>
        <div className="flex items-center gap-3 text-sm"><RotateCcw size={18} className="text-muted-foreground flex-shrink-0" /><span>Easy 30-day returns</span></div>
      </div>
    </motion.div>
  );
};

export default ProductInfo;
