import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, ChevronDown, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
  const { totalItems } = useCart();
  const { user, isAdmin, signOut } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Shop', path: '/products', hasDropdown: true },
    { name: 'New Arrivals', path: '/products' },
    { name: 'My Orders', path: '/orders' },
    ...(isAdmin ? [{ name: 'Admin', path: '/admin' }] : []),
  ];

  const handleSignOut = async () => { await signOut(); navigate('/'); };

  return (
    <header className="hidden md:block sticky top-0 z-50 bg-card border-b border-border">
      <div className="announcement-bar text-xs">
        <p>Sign up and get 20% off to your first order. <Link to="/login" className="underline font-semibold ml-1">Sign Up Now</Link></p>
      </div>
      <div className="container-main">
        <div className="flex items-center justify-between h-16 gap-8">
          <Link to="/" className="flex items-center flex-shrink-0"><span className="text-[28px] font-black tracking-tight text-foreground uppercase">SHOP.CO</span></Link>
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors">
                {link.name}{link.hasDropdown && <ChevronDown size={14} />}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:flex flex-1 max-w-lg">
            <div className="relative w-full">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search for products..." className="w-full h-10 pl-11 pr-4 rounded-full bg-secondary border-0 text-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-border" />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="lg:hidden p-2.5 hover:bg-secondary rounded-full transition-colors" onClick={() => setIsSearchOpen(!isSearchOpen)}><Search size={22} /></button>
            <Link to="/cart" className="relative p-2.5 hover:bg-secondary rounded-full transition-colors">
              <ShoppingBag size={22} />
              {totalItems > 0 && <span className="absolute top-0.5 right-0.5 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">{totalItems}</span>}
            </Link>
            {user ? (
              <button onClick={handleSignOut} className="p-2.5 hover:bg-secondary rounded-full transition-colors" title="Sign Out"><LogOut size={22} /></button>
            ) : (
              <Link to="/login" className="p-2.5 hover:bg-secondary rounded-full transition-colors"><User size={22} /></Link>
            )}
          </div>
        </div>
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden pb-3">
              <div className="relative"><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" /><Input type="search" placeholder="Search for products..." className="w-full h-10 pl-11 pr-4 rounded-full bg-secondary border-0 text-sm" autoFocus /></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
