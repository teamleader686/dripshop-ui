 import { Link } from 'react-router-dom';
 import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
 import { Input } from '@/components/ui/input';
 import { Button } from '@/components/ui/button';
 
 const Footer = () => {
   const footerLinks = {
     shop: [
       { name: 'New Arrivals', path: '/products' },
       { name: 'Best Sellers', path: '/products' },
       { name: 'Sale', path: '/products?sale=true' },
       { name: 'All Products', path: '/products' },
     ],
     help: [
       { name: 'Contact Us', path: '/contact' },
       { name: 'FAQs', path: '/faq' },
       { name: 'Shipping Info', path: '/shipping' },
       { name: 'Returns', path: '/returns' },
     ],
     company: [
       { name: 'About Us', path: '/about' },
       { name: 'Careers', path: '/careers' },
       { name: 'Privacy Policy', path: '/privacy' },
       { name: 'Terms of Service', path: '/terms' },
     ],
   };
 
   return (
     <footer className="bg-secondary text-secondary-foreground">
       {/* Newsletter Section */}
       <div className="border-b border-secondary-foreground/10">
         <div className="container-main py-12">
           <div className="max-w-xl mx-auto text-center">
             <h3 className="text-2xl font-bold mb-2">Join the LUXE Family</h3>
             <p className="text-secondary-foreground/70 mb-6">
               Subscribe for exclusive offers, new arrivals, and 10% off your first order.
             </p>
             <div className="flex gap-2 max-w-md mx-auto">
               <Input
                 type="email"
                 placeholder="Enter your email"
                 className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50"
               />
               <Button className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap">
                 Subscribe
               </Button>
             </div>
           </div>
         </div>
       </div>
 
       {/* Links Section */}
       <div className="container-main py-12">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
           {/* Brand */}
           <div className="col-span-2 md:col-span-1">
             <span className="text-2xl font-bold text-gradient">LUXE</span>
             <p className="mt-4 text-sm text-secondary-foreground/70">
               Premium fashion and lifestyle products curated for the modern individual.
             </p>
             <div className="flex gap-4 mt-6">
               <a href="#" className="social-icon instagram-gradient text-white">
                 <Instagram size={18} />
               </a>
               <a href="#" className="social-icon facebook-bg text-white">
                 <Facebook size={18} />
               </a>
               <a href="#" className="social-icon bg-secondary-foreground/20 text-secondary-foreground hover:bg-primary hover:text-primary-foreground">
                 <Twitter size={18} />
               </a>
               <a href="#" className="social-icon bg-secondary-foreground/20 text-secondary-foreground hover:bg-primary hover:text-primary-foreground">
                 <Mail size={18} />
               </a>
             </div>
           </div>
 
           {/* Shop Links */}
           <div>
             <h4 className="font-semibold mb-4">Shop</h4>
             <ul className="space-y-3">
               {footerLinks.shop.map((link) => (
                 <li key={link.name}>
                   <Link
                     to={link.path}
                     className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                   >
                     {link.name}
                   </Link>
                 </li>
               ))}
             </ul>
           </div>
 
           {/* Help Links */}
           <div>
             <h4 className="font-semibold mb-4">Help</h4>
             <ul className="space-y-3">
               {footerLinks.help.map((link) => (
                 <li key={link.name}>
                   <Link
                     to={link.path}
                     className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                   >
                     {link.name}
                   </Link>
                 </li>
               ))}
             </ul>
           </div>
 
           {/* Company Links */}
           <div>
             <h4 className="font-semibold mb-4">Company</h4>
             <ul className="space-y-3">
               {footerLinks.company.map((link) => (
                 <li key={link.name}>
                   <Link
                     to={link.path}
                     className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                   >
                     {link.name}
                   </Link>
                 </li>
               ))}
             </ul>
           </div>
         </div>
       </div>
 
       {/* Bottom Bar */}
       <div className="border-t border-secondary-foreground/10">
         <div className="container-main py-6">
           <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-secondary-foreground/60">
             <p>© 2025 LUXE. All rights reserved.</p>
             <div className="flex items-center gap-6">
               <span>💳 Secure Payments</span>
               <span>🚚 Fast Shipping</span>
               <span>↩️ Easy Returns</span>
             </div>
           </div>
         </div>
       </div>
     </footer>
   );
 };
 
 export default Footer;