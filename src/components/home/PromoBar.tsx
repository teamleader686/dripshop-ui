import { Truck, Shield, RefreshCw, Headphones } from 'lucide-react';

const PromoBar = () => {
  const features = [
    { icon: Truck, title: 'Free Shipping', description: 'On orders over $50' },
    { icon: Shield, title: 'Secure Payment', description: '100% protected' },
    { icon: RefreshCw, title: 'Easy Returns', description: '30-day policy' },
    { icon: Headphones, title: '24/7 Support', description: 'Dedicated help' },
  ];

  return (
    <section className="py-3 md:py-6 border-b border-border">
      <div className="container-main">
        {/* Mobile: horizontal scroll */}
        <div className="md:hidden flex overflow-x-auto gap-4 scrollbar-hide">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <feature.icon className="text-foreground" size={14} />
              </div>
              <div>
                <h4 className="font-bold text-xs whitespace-nowrap">{feature.title}</h4>
                <p className="text-[10px] text-muted-foreground whitespace-nowrap">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <feature.icon className="text-foreground" size={18} />
              </div>
              <div>
                <h4 className="font-bold text-sm">{feature.title}</h4>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBar;
