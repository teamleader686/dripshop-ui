 import { useState } from 'react';
 import { Link } from 'react-router-dom';
 import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { useCart } from '@/context/CartContext';
 import { motion, AnimatePresence } from 'framer-motion';
 
 const Header = () => {
   const { totalItems } = useCart();
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isSearchOpen, setIsSearchOpen] = useState(false);
 
   const navLinks = [
     { name: 'Home', path: '/' },
     { name: 'Shop', path: '/products' },
     { name: 'Categories', path: '/products' },
     { name: 'Sale', path: '/products?sale=true' },
   ];
 
   return (
     <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
       {/* Announcement Bar */}
       <div className="announcement-bar">
         <p>🎉 FREE SHIPPING on orders over $50 | Use code: SAVE20 for 20% off</p>
       </div>
 
       {/* Main Header */}
       <div className="container-main">
         <div className="flex items-center justify-between h-16">
           {/* Mobile Menu Button */}
           <button
             className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
             onClick={() => setIsMenuOpen(!isMenuOpen)}
           >
             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
 
           {/* Logo */}
           <Link to="/" className="flex items-center gap-2">
             <span className="text-2xl font-bold text-gradient">LUXE</span>
           </Link>
 
           {/* Desktop Navigation */}
           <nav className="hidden lg:flex items-center gap-8">
             {navLinks.map((link) => (
               <Link
                 key={link.name}
                 to={link.path}
                 className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
               >
                 {link.name}
               </Link>
             ))}
           </nav>
 
           {/* Right Actions */}
           <div className="flex items-center gap-2">
             {/* Search */}
             <AnimatePresence>
               {isSearchOpen && (
                 <motion.div
                   initial={{ width: 0, opacity: 0 }}
                   animate={{ width: 200, opacity: 1 }}
                   exit={{ width: 0, opacity: 0 }}
                   className="hidden md:block overflow-hidden"
                 >
                   <Input
                     type="search"
                     placeholder="Search products..."
                     className="h-9"
                     autoFocus
                   />
                 </motion.div>
               )}
             </AnimatePresence>
             <button
               className="p-2 hover:bg-muted rounded-lg transition-colors"
               onClick={() => setIsSearchOpen(!isSearchOpen)}
             >
               <Search size={20} />
             </button>
 
             {/* Account */}
             <Link to="/login" className="p-2 hover:bg-muted rounded-lg transition-colors">
               <User size={20} />
             </Link>
 
             {/* Cart */}
             <Link to="/cart" className="relative p-2 hover:bg-muted rounded-lg transition-colors">
               <ShoppingBag size={20} />
               {totalItems > 0 && (
                 <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                   {totalItems}
                 </span>
               )}
             </Link>
           </div>
         </div>
       </div>
 
       {/* Mobile Menu */}
       <AnimatePresence>
         {isMenuOpen && (
           <motion.div
             initial={{ height: 0, opacity: 0 }}
             animate={{ height: 'auto', opacity: 1 }}
             exit={{ height: 0, opacity: 0 }}
             className="lg:hidden border-t border-border overflow-hidden bg-background"
           >
             <div className="container-main py-4 space-y-4">
               <Input type="search" placeholder="Search products..." className="w-full" />
               <nav className="flex flex-col gap-2">
                 {navLinks.map((link) => (
                   <Link
                     key={link.name}
                     to={link.path}
                     className="py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                     onClick={() => setIsMenuOpen(false)}
                   >
                     {link.name}
                   </Link>
                 ))}
               </nav>
             </div>
           </motion.div>
         )}
       </AnimatePresence>
     </header>
   );
 };
 
 export default Header;