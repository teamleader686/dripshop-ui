 import { useState, useMemo } from 'react';
 import { useSearchParams } from 'react-router-dom';
 import Header from '@/components/layout/Header';
 import Footer from '@/components/layout/Footer';
 import ProductCard from '@/components/products/ProductCard';
 import { products, categories } from '@/data/products';
 import { Button } from '@/components/ui/button';
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
 import { Slider } from '@/components/ui/slider';
 import { Filter, X } from 'lucide-react';
 import { motion, AnimatePresence } from 'framer-motion';
 
 const Products = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const [isFilterOpen, setIsFilterOpen] = useState(false);
   const [priceRange, setPriceRange] = useState([0, 200]);
   const [sortBy, setSortBy] = useState('latest');
 
   const selectedCategory = searchParams.get('category') || '';
   const isSale = searchParams.get('sale') === 'true';
 
   const filteredProducts = useMemo(() => {
     let result = [...products];
 
     // Category filter
     if (selectedCategory) {
       result = result.filter((p) => p.category === selectedCategory);
     }
 
     // Sale filter
     if (isSale) {
       result = result.filter((p) => p.badge === 'sale');
     }
 
     // Price filter
     result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
 
     // Sorting
     switch (sortBy) {
       case 'price-low':
         result.sort((a, b) => a.price - b.price);
         break;
       case 'price-high':
         result.sort((a, b) => b.price - a.price);
         break;
       case 'popular':
         result.sort((a, b) => b.reviews - a.reviews);
         break;
       default:
         break;
     }
 
     return result;
   }, [selectedCategory, isSale, priceRange, sortBy]);
 
   const handleCategoryChange = (category: string) => {
     const newParams = new URLSearchParams(searchParams);
     if (category) {
       newParams.set('category', category);
     } else {
       newParams.delete('category');
     }
     setSearchParams(newParams);
   };
 
   const clearFilters = () => {
     setSearchParams({});
     setPriceRange([0, 200]);
     setSortBy('latest');
   };
 
   return (
     <div className="min-h-screen bg-background">
       <Header />
       <main className="pb-16">
         {/* Page Header */}
         <div className="bg-muted/50 py-12">
           <div className="container-main">
             <h1 className="text-3xl lg:text-4xl font-bold mb-2">
               {isSale ? 'Sale' : selectedCategory || 'All Products'}
             </h1>
             <p className="text-muted-foreground">
               {filteredProducts.length} products found
             </p>
           </div>
         </div>
 
         <div className="container-main py-8">
           {/* Filters Bar */}
           <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
             <div className="flex items-center gap-3">
               <Button
                 variant="outline"
                 size="sm"
                 onClick={() => setIsFilterOpen(!isFilterOpen)}
                 className="lg:hidden"
               >
                 <Filter size={16} className="mr-2" />
                 Filters
               </Button>
 
               {/* Category Pills */}
               <div className="hidden lg:flex items-center gap-2">
                 <Button
                   variant={!selectedCategory ? 'default' : 'outline'}
                   size="sm"
                   onClick={() => handleCategoryChange('')}
                 >
                   All
                 </Button>
                 {categories.slice(0, 4).map((cat) => (
                   <Button
                     key={cat.id}
                     variant={selectedCategory === cat.name ? 'default' : 'outline'}
                     size="sm"
                     onClick={() => handleCategoryChange(cat.name)}
                   >
                     {cat.name}
                   </Button>
                 ))}
               </div>
             </div>
 
             <div className="flex items-center gap-3">
               {(selectedCategory || isSale) && (
                 <Button variant="ghost" size="sm" onClick={clearFilters}>
                   <X size={14} className="mr-1" />
                   Clear
                 </Button>
               )}
               <Select value={sortBy} onValueChange={setSortBy}>
                 <SelectTrigger className="w-[160px]">
                   <SelectValue placeholder="Sort by" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="latest">Latest</SelectItem>
                   <SelectItem value="price-low">Price: Low to High</SelectItem>
                   <SelectItem value="price-high">Price: High to Low</SelectItem>
                   <SelectItem value="popular">Most Popular</SelectItem>
                 </SelectContent>
               </Select>
             </div>
           </div>
 
           {/* Mobile Filters */}
           <AnimatePresence>
             {isFilterOpen && (
               <motion.div
                 initial={{ height: 0, opacity: 0 }}
                 animate={{ height: 'auto', opacity: 1 }}
                 exit={{ height: 0, opacity: 0 }}
                 className="lg:hidden mb-8 overflow-hidden"
               >
                 <div className="p-4 bg-muted rounded-xl space-y-6">
                   <div>
                     <h4 className="font-medium mb-3">Categories</h4>
                     <div className="flex flex-wrap gap-2">
                       {categories.map((cat) => (
                         <Button
                           key={cat.id}
                           variant={selectedCategory === cat.name ? 'default' : 'outline'}
                           size="sm"
                           onClick={() => handleCategoryChange(cat.name)}
                         >
                           {cat.name}
                         </Button>
                       ))}
                     </div>
                   </div>
 
                   <div>
                     <h4 className="font-medium mb-3">Price Range: ${priceRange[0]} - ${priceRange[1]}</h4>
                     <Slider
                       value={priceRange}
                       onValueChange={setPriceRange}
                       max={200}
                       step={10}
                       className="mt-2"
                     />
                   </div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
 
           {/* Product Grid */}
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
             {filteredProducts.map((product, index) => (
               <ProductCard key={product.id} product={product} index={index} />
             ))}
           </div>
 
           {filteredProducts.length === 0 && (
             <div className="text-center py-16">
               <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
               <Button className="mt-4" onClick={clearFilters}>
                 Clear Filters
               </Button>
             </div>
           )}
         </div>
       </main>
       <Footer />
     </div>
   );
 };
 
 export default Products;