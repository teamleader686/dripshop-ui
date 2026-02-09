import { Search, MapPin } from 'lucide-react';

const MobileSearchBar = () => {
  return (
    <div className="md:hidden bg-card px-4 pt-3 pb-3 border-b border-border">
      {/* Logo + Search */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xl font-black tracking-tight uppercase flex-shrink-0">SHOP.CO</span>
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search for products..."
            className="w-full h-9 pl-9 pr-4 rounded-full bg-secondary text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-border"
          />
        </div>
      </div>
      {/* Location */}
      <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
        <MapPin size={12} />
        <span>Deliver to <strong className="text-foreground">New York, 10001</strong></span>
      </div>
    </div>
  );
};

export default MobileSearchBar;
