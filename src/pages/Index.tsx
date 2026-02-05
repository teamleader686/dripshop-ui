import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroBanner from '@/components/home/HeroBanner';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import InstagramSection from '@/components/home/InstagramSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PromoBar from '@/components/home/PromoBar';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroBanner />
        <PromoBar />
        <FeaturedProducts 
          title="Trending Now" 
          subtitle="Our most popular picks this season"
          filter="trending"
        />
        <CategoryGrid />
        <FeaturedProducts 
          title="On Sale" 
          subtitle="Limited time offers you don't want to miss"
          filter="sale"
        />
        <InstagramSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
