import { Search, MapPin } from 'lucide-react';

const MobileSearchBar = () => {
  return (
    <div className="md:hidden bg-primary px-4 pt-3 pb-4 space-y-2">
      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search products, brands & more"
          className="w-full h-10 pl-10 pr-4 rounded-lg bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      {/* Location */}
      <div className="flex items-center gap-1.5 text-primary-foreground/90 text-xs">
        <MapPin size={12} />
        <span>Deliver to <strong className="text-primary-foreground">New York, 10001</strong></span>
      </div>
    </div>
  );
};

export default MobileSearchBar;
