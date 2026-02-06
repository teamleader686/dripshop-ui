import { useState } from 'react';
import { Product } from '@/data/products';
import { motion } from 'framer-motion';

interface ProductImageGalleryProps {
  product: Product;
}

const ProductImageGallery = ({ product }: ProductImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = product.images || [product.image];

  const discountPercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Mobile: swipeable slider */}
      <div className="md:hidden">
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {images.map((img, index) => (
            <div key={index} className="snap-center flex-shrink-0 w-full">
              <div className="relative aspect-square bg-card rounded-xl overflow-hidden mx-0">
                <img src={img} alt={product.name} className="w-full h-full object-cover" />
                {product.badge && index === 0 && (
                  <span className={`product-badge ${
                    product.badge === 'sale' ? 'product-badge-sale' : 'product-badge-new'
                  }`}>
                    {product.badge === 'sale' ? `-${discountPercent}%` : product.badge.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Dots */}
        {images.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === 0 ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: main image + thumbnails */}
      <div className="hidden md:block">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted mb-4">
          <img
            src={images[selectedImage]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <span className={`product-badge ${
              product.badge === 'sale' ? 'product-badge-sale' : 'product-badge-new'
            }`}>
              {product.badge === 'sale' ? `-${discountPercent}%` : product.badge.toUpperCase()}
            </span>
          )}
        </div>
        {images.length > 1 && (
          <div className="flex gap-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductImageGallery;
