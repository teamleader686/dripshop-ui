import { useState } from 'react';
import { Product } from '@/data/products';
import { motion } from 'framer-motion';

interface ProductImageGalleryProps {
  product: Product;
}

const ProductImageGallery = ({ product }: ProductImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = product.images || [product.image];

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
              <div className="relative aspect-square bg-secondary overflow-hidden">
                <img src={img} alt={product.name} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === 0 ? 'bg-foreground' : 'bg-border'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: thumbnails left + main image right (SHOP.CO style) */}
      <div className="hidden md:flex gap-4">
        {/* Thumbnails column */}
        {images.length > 1 && (
          <div className="flex flex-col gap-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-[152px] h-[168px] rounded-[20px] overflow-hidden border-2 transition-colors flex-shrink-0 ${
                  selectedImage === index ? 'border-foreground' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Main image */}
        <div className="flex-1 relative aspect-square rounded-[20px] overflow-hidden bg-secondary">
          <img
            src={images[selectedImage]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductImageGallery;
