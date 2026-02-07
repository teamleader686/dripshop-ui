import { Link, useLocation } from 'react-router-dom';
import { Home, Grid3X3, ShoppingCart, Package, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Grid3X3, label: 'Categories', path: '/products' },
  { icon: ShoppingCart, label: 'Cart', path: '/cart' },
  { icon: Package, label: 'Orders', path: '/orders' },
  { icon: User, label: 'Profile', path: '/login' },
];

const BottomNavMobile = () => {
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-bottom-nav border-t border-border shadow-bottom-nav">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isCart = item.label === 'Cart';

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full relative transition-colors ${
                isActive
                  ? 'text-bottom-nav-active'
                  : 'text-bottom-nav-foreground'
              }`}
            >
              <div className="relative">
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                {isCart && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className={`text-[10px] leading-tight ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavMobile;
