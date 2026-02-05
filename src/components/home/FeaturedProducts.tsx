 import { products } from '@/data/products';
 import ProductCard from '@/components/products/ProductCard';
 import { Link } from 'react-router-dom';
 import { Button } from '@/components/ui/button';
 import { ArrowRight } from 'lucide-react';
 
 interface FeaturedProductsProps {
   title: string;
   subtitle?: string;
   filter?: 'trending' | 'sale' | 'new';
   limit?: number;
 }
 
 const FeaturedProducts = ({ title, subtitle, filter, limit = 4 }: FeaturedProductsProps) => {
   const filteredProducts = filter
     ? products.filter((p) => p.badge === filter).slice(0, limit)
     : products.slice(0, limit);
 
   return (
     <section className="py-16 lg:py-24">
       <div className="container-main">
         <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
           <div>
             <h2 className="text-3xl lg:text-4xl font-bold mb-2">{title}</h2>
             {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
           </div>
           <Button asChild variant="ghost" className="text-primary hover:text-primary/80">
             <Link to="/products">
               View All
               <ArrowRight className="ml-2" size={16} />
             </Link>
           </Button>
         </div>
 
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
           {filteredProducts.map((product, index) => (
             <ProductCard key={product.id} product={product} index={index} />
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default FeaturedProducts;