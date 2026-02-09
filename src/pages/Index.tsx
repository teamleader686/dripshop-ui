import AppLayout from '@/components/layout/AppLayout';
import HeroBanner from '@/components/home/HeroBanner';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import DealsSection from '@/components/home/DealsSection';
import InstagramSection from '@/components/home/InstagramSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PromoBar from '@/components/home/PromoBar';

const Index = () => {
  return (
    <AppLayout showMobileSearch>
      <HeroBanner />
      <PromoBar />
      <FeaturedProducts 
        title="New Arrivals" 
        subtitle="Our most popular picks this season"
        filter="new"
      />
      <div className="border-t border-border" />
      <FeaturedProducts 
        title="Top Selling" 
        subtitle="Limited time offers you don't want to miss"
        filter="trending"
      />
      <DealsSection />
      <CategoryGrid />
      <TestimonialsSection />
      <InstagramSection />
    </AppLayout>
  );
};

export default Index;
