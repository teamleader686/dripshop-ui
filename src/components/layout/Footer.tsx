import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About', path: '/about' },
      { name: 'Features', path: '/features' },
      { name: 'Works', path: '/works' },
      { name: 'Career', path: '/career' },
    ],
    help: [
      { name: 'Customer Support', path: '/contact' },
      { name: 'Delivery Details', path: '/shipping' },
      { name: 'Terms & Conditions', path: '/terms' },
      { name: 'Privacy Policy', path: '/privacy' },
    ],
    faq: [
      { name: 'Account', path: '/faq' },
      { name: 'Manage Deliveries', path: '/faq' },
      { name: 'Orders', path: '/orders' },
      { name: 'Payments', path: '/faq' },
    ],
    resources: [
      { name: 'Free eBooks', path: '/resources' },
      { name: 'Development Tutorial', path: '/resources' },
      { name: 'How to - Blog', path: '/blog' },
      { name: 'Youtube Playlist', path: '/resources' },
    ],
  };

  return (
    <footer className="bg-secondary text-foreground mb-16 md:mb-0">
      {/* Newsletter Section */}
      <div className="container-main -mt-1">
        <div className="bg-primary text-primary-foreground rounded-[20px] px-6 py-8 md:px-16 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <h3 className="text-2xl md:text-[40px] font-black leading-tight max-w-md uppercase">
            Stay Upto Date About Our Latest Offers
          </h3>
          <div className="flex flex-col gap-3 w-full md:w-auto md:min-w-[350px]">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <Input
                type="email"
                placeholder="Enter your email address"
                className="h-12 pl-12 pr-4 rounded-full bg-card text-foreground border-0 text-sm placeholder:text-muted-foreground"
              />
            </div>
            <Button className="h-12 rounded-full bg-card text-foreground hover:bg-card/90 font-medium text-sm">
              Subscribe to Newsletter
            </Button>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="container-main py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-[28px] font-black tracking-tight uppercase">SHOP.CO</span>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-7 h-7 rounded-full border border-border bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                <Twitter size={14} />
              </a>
              <a href="#" className="w-7 h-7 rounded-full border border-border bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                <Facebook size={14} />
              </a>
              <a href="#" className="w-7 h-7 rounded-full border border-border bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                <Instagram size={14} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-medium text-sm uppercase tracking-wider mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container-main py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
            <p>Shop.co © 2000-2023, All Rights Reserved</p>
            <div className="flex items-center gap-3">
              <div className="h-8 px-3 bg-card rounded flex items-center justify-center border border-border">
                <span className="text-xs font-medium">Visa</span>
              </div>
              <div className="h-8 px-3 bg-card rounded flex items-center justify-center border border-border">
                <span className="text-xs font-medium">Mastercard</span>
              </div>
              <div className="h-8 px-3 bg-card rounded flex items-center justify-center border border-border">
                <span className="text-xs font-medium">PayPal</span>
              </div>
              <div className="h-8 px-3 bg-card rounded flex items-center justify-center border border-border">
                <span className="text-xs font-medium">Apple Pay</span>
              </div>
              <div className="h-8 px-3 bg-card rounded flex items-center justify-center border border-border">
                <span className="text-xs font-medium">G Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
