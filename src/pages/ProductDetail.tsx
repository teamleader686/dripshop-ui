import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import ProductImageGallery from '@/components/products/ProductImageGallery';
import ProductInfo from '@/components/products/ProductInfo';
import StickyAddToCart from '@/components/products/StickyAddToCart';
import { Skeleton } from '@/components/ui/skeleton';
import { getProductImage } from '@/types/database';

const mockReviews = [
  { id: '1', name: 'Samantha D.', rating: 5, date: 'August 14, 2023', text: '"I absolutely love this! The quality is top-notch and the design is so unique."', verified: true },
  { id: '2', name: 'Alex M.', rating: 4, date: 'August 15, 2023', text: '"The item exceeded my expectations! The material feels premium and the fit is perfect."', verified: true },
  { id: '3', name: 'Ethan R.', rating: 5, date: 'August 16, 2023', text: '"This is exactly what I was looking for. Great quality, fast shipping."', verified: true },
  { id: '4', name: 'Olivia B.', rating: 5, date: 'August 17, 2023', text: '"The attention to detail is remarkable. I love everything about it!"', verified: true },
];

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('reviews');

  const { data: product, isLoading } = useProduct(id);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="container-main py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-[20px]" />
            <div className="space-y-4"><Skeleton className="h-8 w-3/4" /><Skeleton className="h-6 w-1/2" /><Skeleton className="h-24 w-full" /></div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!product) {
    return (
      <AppLayout>
        <div className="container-main py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild><Link to="/products">Back to Products</Link></Button>
        </div>
      </AppLayout>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: getProductImage(product),
    }, quantity);
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const tabs = [
    { key: 'details', label: 'Product Details' },
    { key: 'reviews', label: 'Rating & Reviews' },
    { key: 'faqs', label: 'FAQs' },
  ];

  return (
    <AppLayout>
      <div className="container-main py-4">
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">{'>'}</span>
          <Link to="/products" className="hover:text-foreground">Shop</Link>
          <span className="mx-2">{'>'}</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <div className="container-main pb-4 md:pb-16">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 lg:gap-12">
          <ProductImageGallery product={product} />
          <ProductInfo product={product} quantity={quantity} setQuantity={setQuantity} onAddToCart={handleAddToCart} />
        </div>
      </div>

      <div className="border-b border-border">
        <div className="container-main">
          <div className="flex">
            {tabs.map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex-1 py-4 text-sm md:text-base font-medium text-center border-b-2 transition-colors ${activeTab === tab.key ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === 'reviews' && (
        <div className="container-main py-8 md:py-12">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold">All Reviews <span className="text-muted-foreground font-normal text-base">({mockReviews.length})</span></h3>
            <Button className="btn-primary px-6 h-10 text-sm hidden md:flex">Write a Review</Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            {mockReviews.map((review, index) => (
              <motion.div key={review.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="border border-border rounded-[20px] p-5 md:p-6">
                <div className="star-rating mb-3">
                  {[...Array(5)].map((_, i) => (<Star key={i} size={16} className={i < review.rating ? 'star-filled' : 'text-muted-foreground/30'} fill={i < review.rating ? 'currentColor' : 'none'} />))}
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="font-bold text-sm">{review.name}</span>
                  {review.verified && <svg className="w-5 h-5 text-success" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{review.text}</p>
                <p className="text-xs text-muted-foreground">Posted on {review.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'details' && (
        <div className="container-main py-8 md:py-12">
          <div className="max-w-3xl">
            <h3 className="text-xl font-bold mb-4">Product Details</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
            <div className="space-y-3">
              <div className="flex"><span className="w-32 font-medium text-sm">Category</span><span className="text-sm text-muted-foreground">{product.categories?.name || 'N/A'}</span></div>
              <div className="flex"><span className="w-32 font-medium text-sm">Rating</span><span className="text-sm text-muted-foreground">{product.rating}/5 ({product.review_count} reviews)</span></div>
              <div className="flex"><span className="w-32 font-medium text-sm">Availability</span><span className="text-sm text-muted-foreground">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'faqs' && (
        <div className="container-main py-8 md:py-12">
          <div className="max-w-3xl space-y-4">
            {[
              { q: 'What is the return policy?', a: 'We offer a 30-day return policy for all unworn items with original tags attached.' },
              { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days.' },
              { q: 'Do you ship internationally?', a: 'Yes, we ship to over 50 countries worldwide.' },
            ].map((faq, i) => (
              <div key={i} className="border border-border rounded-[20px] p-5">
                <h4 className="font-bold text-sm mb-2">{faq.q}</h4>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-border">
        <FeaturedProducts title="You Might Also Like" limit={4} />
      </div>

      <StickyAddToCart product={product} onAddToCart={handleAddToCart} />
    </AppLayout>
  );
};

export default ProductDetail;
