import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import BottomNavMobile from './BottomNavMobile';
import MobileSearchBar from './MobileSearchBar';

interface AppLayoutProps {
  children: ReactNode;
  showMobileSearch?: boolean;
}

const AppLayout = ({ children, showMobileSearch = false }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {showMobileSearch && <MobileSearchBar />}
      <main className="mobile-main-content">
        {children}
      </main>
      <Footer />
      <BottomNavMobile />
    </div>
  );
};

export default AppLayout;
