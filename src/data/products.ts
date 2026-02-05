 export interface Product {
   id: string;
   name: string;
   price: number;
   originalPrice?: number;
   image: string;
   images?: string[];
   category: string;
   description: string;
   badge?: 'sale' | 'new' | 'trending';
   rating: number;
   reviews: number;
   inStock: boolean;
 }
 
 export interface Category {
   id: string;
   name: string;
   image: string;
   productCount: number;
 }
 
 export const categories: Category[] = [
   { id: '1', name: 'Women\'s Fashion', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop', productCount: 234 },
   { id: '2', name: 'Men\'s Collection', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', productCount: 156 },
   { id: '3', name: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', productCount: 89 },
   { id: '4', name: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', productCount: 112 },
   { id: '5', name: 'Home & Living', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', productCount: 78 },
   { id: '6', name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop', productCount: 145 },
 ];
 
 export const products: Product[] = [
   {
     id: '1',
     name: 'Premium Silk Blouse',
     price: 49.99,
     originalPrice: 89.99,
     image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500&h=600&fit=crop',
     images: [
       'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&h=1000&fit=crop',
       'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=1000&fit=crop',
     ],
     category: 'Women\'s Fashion',
     description: 'Elegant silk blouse perfect for any occasion. Features a relaxed fit and premium quality fabric.',
     badge: 'sale',
     rating: 4.8,
     reviews: 124,
     inStock: true,
   },
   {
     id: '2',
     name: 'Classic Leather Watch',
     price: 129.99,
     image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=600&fit=crop',
     category: 'Accessories',
     description: 'Timeless leather watch with premium craftsmanship. Water-resistant up to 50m.',
     badge: 'new',
     rating: 4.9,
     reviews: 89,
     inStock: true,
   },
   {
     id: '3',
     name: 'Wireless Earbuds Pro',
     price: 79.99,
     originalPrice: 119.99,
     image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=600&fit=crop',
     category: 'Electronics',
     description: 'High-quality wireless earbuds with active noise cancellation and 24h battery life.',
     badge: 'trending',
     rating: 4.7,
     reviews: 312,
     inStock: true,
   },
   {
     id: '4',
     name: 'Designer Handbag',
     price: 189.99,
     image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop',
     category: 'Accessories',
     description: 'Luxurious designer handbag crafted from genuine leather with gold-tone hardware.',
     badge: 'new',
     rating: 4.6,
     reviews: 67,
     inStock: true,
   },
   {
     id: '5',
     name: 'Minimalist Sneakers',
     price: 89.99,
     originalPrice: 129.99,
     image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop',
     category: 'Men\'s Collection',
     description: 'Clean, minimalist sneakers designed for comfort and style. Premium leather construction.',
     badge: 'sale',
     rating: 4.8,
     reviews: 203,
     inStock: true,
   },
   {
     id: '6',
     name: 'Organic Face Serum',
     price: 34.99,
     image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=600&fit=crop',
     category: 'Beauty',
     description: 'Hydrating face serum with vitamin C and hyaluronic acid. Suitable for all skin types.',
     rating: 4.9,
     reviews: 456,
     inStock: true,
   },
   {
     id: '7',
     name: 'Cozy Throw Blanket',
     price: 59.99,
     image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=600&fit=crop',
     category: 'Home & Living',
     description: 'Super soft throw blanket perfect for chilly evenings. Machine washable.',
     badge: 'trending',
     rating: 4.7,
     reviews: 178,
     inStock: true,
   },
   {
     id: '8',
     name: 'Slim Fit Blazer',
     price: 149.99,
     originalPrice: 199.99,
     image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop',
     category: 'Men\'s Collection',
     description: 'Modern slim fit blazer perfect for business or casual occasions. Premium wool blend.',
     badge: 'sale',
     rating: 4.5,
     reviews: 92,
     inStock: true,
   },
   {
     id: '9',
     name: 'Portable Bluetooth Speaker',
     price: 49.99,
     image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=600&fit=crop',
     category: 'Electronics',
     description: 'Compact yet powerful speaker with deep bass. Waterproof and 12h battery.',
     rating: 4.6,
     reviews: 234,
     inStock: true,
   },
   {
     id: '10',
     name: 'Floral Summer Dress',
     price: 69.99,
     image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop',
     category: 'Women\'s Fashion',
     description: 'Beautiful floral print dress perfect for summer. Lightweight and breathable fabric.',
     badge: 'new',
     rating: 4.8,
     reviews: 156,
     inStock: true,
   },
   {
     id: '11',
     name: 'Smart Fitness Tracker',
     price: 99.99,
     originalPrice: 149.99,
     image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=600&fit=crop',
     category: 'Electronics',
     description: 'Advanced fitness tracker with heart rate monitor, GPS, and sleep tracking.',
     badge: 'sale',
     rating: 4.7,
     reviews: 389,
     inStock: true,
   },
   {
     id: '12',
     name: 'Luxury Candle Set',
     price: 44.99,
     image: 'https://images.unsplash.com/photo-1602874801007-3ee7c0517a8a?w=500&h=600&fit=crop',
     category: 'Home & Living',
     description: 'Set of 3 luxury scented candles. Long-lasting with natural soy wax.',
     badge: 'trending',
     rating: 4.9,
     reviews: 267,
     inStock: true,
   },
 ];
 
 export const testimonials = [
   {
     id: '1',
     name: 'Sarah M.',
     avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
     text: 'Absolutely love this store! The quality exceeded my expectations and shipping was super fast.',
     rating: 5,
   },
   {
     id: '2',
     name: 'James K.',
     avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
     text: 'Best online shopping experience. Customer service is amazing and products are top-notch.',
     rating: 5,
   },
   {
     id: '3',
     name: 'Emily R.',
     avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
     text: 'I\'ve been shopping here for months. Never disappointed with the quality and prices!',
     rating: 5,
   },
 ];