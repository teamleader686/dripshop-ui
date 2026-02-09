import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import ProductCard from '@/components/products/ProductCard';
import { products, categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Filter, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState('latest');

  const selectedCategory = searchParams.get('category') || '';
  const isSale = searchParams.get('sale') === 'true';

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (isSale) {
      result = result.filter((p) => p.badge === 'sale');
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'popular': result.sort((a, b) => b.reviews - a.reviews); break;
      default: break;
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
    <AppLayout showMobileSearch>
      <div className="pb-0">
        {/* Breadcrumb */}
        <div className="container-main py-4">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">{'>'}</span>
            <span className="text-foreground">{isSale ? 'Sale' : selectedCategory || 'Shop'}</span>
          </nav>
        </div>

        <div className="container-main pb-8">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-[250px] flex-shrink-0">
              <div className="border border-border rounded-[20px] p-5 sticky top-24">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold">Filters</h3>
                  <Filter size={18} className="text-muted-foreground" />
                </div>

                <div className="border-t border-border pt-5 mb-5">
                  <h4 className="font-medium text-sm mb-3">Categories</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleCategoryChange('')}
                      className={`flex items-center justify-between w-full text-sm py-1 transition-colors ${
                        !selectedCategory ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span>All</span>
                      <ChevronRight size={14} />
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.name)}
                        className={`flex items-center justify-between w-full text-sm py-1 transition-colors ${
                          selectedCategory === cat.name ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <ChevronRight size={14} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-5 mb-5">
                  <h4 className="font-medium text-sm mb-4">Price</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200}
                    step={10}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                <Button onClick={clearFilters} className="w-full btn-primary h-10 text-sm">
                  Apply Filter
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl md:text-2xl font-bold">
                  {isSale ? 'Sale' : selectedCategory || 'All Products'}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground hidden md:inline">
                    Showing {filteredProducts.length} Products
                  </span>
                  {/* Mobile filter button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="lg:hidden h-9 text-xs rounded-full"
                  >
                    <Filter size={14} className="mr-1.5" />
                    Filters
                  </Button>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[140px] h-9 text-xs rounded-full border-border">
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="price-low">Price: Low-High</SelectItem>
                      <SelectItem value="price-high">Price: High-Low</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Mobile filter panel */}
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="lg:hidden mb-4 overflow-hidden"
                  >
                    <div className="p-4 bg-secondary rounded-[20px] space-y-5">
                      <div>
                        <h4 className="font-bold text-sm mb-2">Categories</h4>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant={!selectedCategory ? 'default' : 'outline'}
                            size="sm"
                            className="text-xs h-8 rounded-full"
                            onClick={() => handleCategoryChange('')}
                          >
                            All
                          </Button>
                          {categories.map((cat) => (
                            <Button
                              key={cat.id}
                              variant={selectedCategory === cat.name ? 'default' : 'outline'}
                              size="sm"
                              className="text-xs h-8 rounded-full"
                              onClick={() => handleCategoryChange(cat.name)}
                            >
                              {cat.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm mb-2">Price: ${priceRange[0]} - ${priceRange[1]}</h4>
                        <Slider value={priceRange} onValueChange={setPriceRange} max={200} step={10} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Product Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg mb-4">No products found.</p>
                  <Button className="btn-primary" onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Products;
