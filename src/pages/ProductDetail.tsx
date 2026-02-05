 import { useState } from 'react';
 import { useParams, Link } from 'react-router-dom';
 import Header from '@/components/layout/Header';
 import Footer from '@/components/layout/Footer';
 import { products } from '@/data/products';
 import { useCart } from '@/context/CartContext';
 import { Button } from '@/components/ui/button';
 import { Heart, Minus, Plus, Truck, Shield, RotateCcw, Instagram, Facebook, Share2 } from 'lucide-react';
 import { motion } from 'framer-motion';
 import { toast } from 'sonner';
 import FeaturedProducts from '@/components/home/FeaturedProducts';
 
 const ProductDetail = () => {
   const { id } = useParams();
   const { addToCart } = useCart();
   const [quantity, setQuantity] = useState(1);
   const [selectedImage, setSelectedImage] = useState(0);
 
   const product = products.find((p) => p.id === id);
 
   if (!product) {
     return (
       <div className="min-h-screen bg-background">
         <Header />
         <div className="container-main py-16 text-center">
           <h1 className="text-2xl font-bold mb-4">Product not found</h1>
           <Button asChild>
             <Link to="/products">Back to Products</Link>
           </Button>
         </div>
         <Footer />
       </div>
     );
   }
 
   const images = product.images || [product.image];
 
   const handleAddToCart = () => {
     addToCart(product, quantity);
     toast.success(`${quantity} x ${product.name} added to cart!`);
   };
 
   const discountPercent = product.originalPrice
     ? Math.round((1 - product.price / product.originalPrice) * 100)
     : 0;
 
   return (
     <div className="min-h-screen bg-background">
       <Header />
       <main className="pb-16">
         {/* Breadcrumb */}
         <div className="container-main py-4">
           <nav className="text-sm text-muted-foreground">
             <Link to="/" className="hover:text-primary">Home</Link>
             <span className="mx-2">/</span>
             <Link to="/products" className="hover:text-primary">Products</Link>
             <span className="mx-2">/</span>
             <span className="text-foreground">{product.name}</span>
           </nav>
         </div>
 
         {/* Product Section */}
         <div className="container-main">
           <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
             {/* Image Gallery */}
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5 }}
             >
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
             </motion.div>
 
             {/* Product Info */}
             <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5, delay: 0.1 }}
               className="flex flex-col"
             >
               <div className="flex items-center gap-2 mb-4">
                 <div className="flex items-center gap-1 text-sm">
                   <span className="text-primary">★</span>
                   <span className="font-medium">{product.rating}</span>
                 </div>
                 <span className="text-muted-foreground">({product.reviews} reviews)</span>
               </div>
 
               <h1 className="text-3xl lg:text-4xl font-bold mb-4">{product.name}</h1>
 
               <div className="flex items-center gap-3 mb-6">
                 <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                 {product.originalPrice && (
                   <>
                     <span className="text-xl text-muted-foreground line-through">
                       ${product.originalPrice.toFixed(2)}
                     </span>
                     <span className="px-2 py-1 bg-primary/10 text-primary text-sm font-medium rounded">
                       Save {discountPercent}%
                     </span>
                   </>
                 )}
               </div>
 
               <p className="text-muted-foreground leading-relaxed mb-8">
                 {product.description}
               </p>
 
               {/* Quantity & Add to Cart */}
               <div className="flex items-center gap-4 mb-6">
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
 
                 <Button onClick={handleAddToCart} size="lg" className="flex-1 btn-primary">
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
               <div className="space-y-3 py-6 border-t border-border">
                 <div className="flex items-center gap-3 text-sm">
                   <Truck size={18} className="text-primary" />
                   <span>Free shipping on orders over $50</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm">
                   <Shield size={18} className="text-primary" />
                   <span>Secure checkout with 256-bit encryption</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm">
                   <RotateCcw size={18} className="text-primary" />
                   <span>Easy 30-day returns</span>
                 </div>
               </div>
 
               {/* Social Share */}
               <div className="pt-6 border-t border-border">
                 <p className="text-sm font-medium mb-3">Share this product:</p>
                 <div className="flex gap-3">
                   <button className="social-icon instagram-gradient text-white">
                     <Instagram size={18} />
                   </button>
                   <button className="social-icon facebook-bg text-white">
                     <Facebook size={18} />
                   </button>
                   <button className="social-icon bg-muted text-foreground hover:bg-primary hover:text-primary-foreground">
                     <Share2 size={18} />
                   </button>
                 </div>
               </div>
             </motion.div>
           </div>
         </div>
 
         {/* Related Products */}
         <div className="mt-16">
           <FeaturedProducts title="You May Also Like" limit={4} />
         </div>
       </main>
       <Footer />
     </div>
   );
 };
 
 export default ProductDetail;