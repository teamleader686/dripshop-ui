 import Header from '@/components/layout/Header';
 import Footer from '@/components/layout/Footer';
 import { 
   DollarSign, 
   ShoppingBag, 
   Users, 
   TrendingUp,
   Package,
   Eye
 } from 'lucide-react';
 import { products } from '@/data/products';
 
 const AdminDashboard = () => {
   const stats = [
     { title: 'Total Sales', value: '$12,450', icon: DollarSign, change: '+12.5%' },
     { title: 'Orders', value: '156', icon: ShoppingBag, change: '+8.2%' },
     { title: 'Customers', value: '1,234', icon: Users, change: '+15.3%' },
     { title: 'Conversion', value: '3.2%', icon: TrendingUp, change: '+2.1%' },
   ];
 
   const recentOrders = [
     { id: 'ORD-001', customer: 'John Doe', amount: 129.99, status: 'Delivered', date: '2025-02-05' },
     { id: 'ORD-002', customer: 'Jane Smith', amount: 89.99, status: 'Shipped', date: '2025-02-04' },
     { id: 'ORD-003', customer: 'Mike Johnson', amount: 249.99, status: 'Processing', date: '2025-02-04' },
     { id: 'ORD-004', customer: 'Sarah Wilson', amount: 59.99, status: 'Pending', date: '2025-02-03' },
     { id: 'ORD-005', customer: 'Tom Brown', amount: 179.99, status: 'Delivered', date: '2025-02-03' },
   ];
 
   const campaigns = [
     { name: 'Instagram Ads', reach: '45.2K', clicks: '2.3K', conversion: '4.2%', spend: '$450' },
     { name: 'Facebook Ads', reach: '32.1K', clicks: '1.8K', conversion: '3.8%', spend: '$320' },
     { name: 'Google Ads', reach: '28.5K', clicks: '1.5K', conversion: '3.5%', spend: '$280' },
   ];
 
   const getStatusColor = (status: string) => {
     switch (status) {
       case 'Delivered':
         return 'bg-success/10 text-success';
       case 'Shipped':
         return 'bg-blue-500/10 text-blue-500';
       case 'Processing':
         return 'bg-primary/10 text-primary';
       default:
         return 'bg-muted text-muted-foreground';
     }
   };
 
   return (
     <div className="min-h-screen bg-background">
       <Header />
       <main className="container-main py-8">
         <div className="mb-8">
           <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
           <p className="text-muted-foreground">Welcome back! Here's your store overview.</p>
         </div>
 
         {/* Stats Grid */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
           {stats.map((stat) => (
             <div key={stat.title} className="bg-card rounded-xl border border-border p-6">
               <div className="flex items-center justify-between mb-4">
                 <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                   <stat.icon className="text-primary" size={20} />
                 </div>
                 <span className="text-xs font-medium text-success">{stat.change}</span>
               </div>
               <p className="text-2xl font-bold">{stat.value}</p>
               <p className="text-sm text-muted-foreground">{stat.title}</p>
             </div>
           ))}
         </div>
 
         <div className="grid lg:grid-cols-2 gap-8 mb-8">
           {/* Recent Orders */}
           <div className="bg-card rounded-xl border border-border p-6">
             <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
             <div className="overflow-x-auto">
               <table className="w-full text-sm">
                 <thead>
                   <tr className="text-muted-foreground border-b border-border">
                     <th className="text-left py-3">Order ID</th>
                     <th className="text-left py-3">Customer</th>
                     <th className="text-left py-3">Amount</th>
                     <th className="text-left py-3">Status</th>
                   </tr>
                 </thead>
                 <tbody>
                   {recentOrders.map((order) => (
                     <tr key={order.id} className="border-b border-border last:border-0">
                       <td className="py-3 font-medium">{order.id}</td>
                       <td className="py-3">{order.customer}</td>
                       <td className="py-3">${order.amount}</td>
                       <td className="py-3">
                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                           {order.status}
                         </span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
 
           {/* Campaign Performance */}
           <div className="bg-card rounded-xl border border-border p-6">
             <h2 className="text-lg font-semibold mb-4">Campaign Performance</h2>
             <div className="space-y-4">
               {campaigns.map((campaign) => (
                 <div key={campaign.name} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                   <div>
                     <p className="font-medium">{campaign.name}</p>
                     <p className="text-sm text-muted-foreground">
                       Reach: {campaign.reach} • Clicks: {campaign.clicks}
                     </p>
                   </div>
                   <div className="text-right">
                     <p className="font-medium text-primary">{campaign.conversion}</p>
                     <p className="text-sm text-muted-foreground">{campaign.spend}</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </div>
 
         {/* Products Table */}
         <div className="bg-card rounded-xl border border-border p-6">
           <div className="flex items-center justify-between mb-4">
             <h2 className="text-lg font-semibold">Products</h2>
             <span className="text-sm text-muted-foreground">{products.length} total</span>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-sm">
               <thead>
                 <tr className="text-muted-foreground border-b border-border">
                   <th className="text-left py-3">Product</th>
                   <th className="text-left py-3">Category</th>
                   <th className="text-left py-3">Price</th>
                   <th className="text-left py-3">Rating</th>
                   <th className="text-left py-3">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {products.slice(0, 6).map((product) => (
                   <tr key={product.id} className="border-b border-border last:border-0">
                     <td className="py-3">
                       <div className="flex items-center gap-3">
                         <img
                           src={product.image}
                           alt={product.name}
                           className="w-10 h-12 object-cover rounded"
                         />
                         <span className="font-medium">{product.name}</span>
                       </div>
                     </td>
                     <td className="py-3">{product.category}</td>
                     <td className="py-3">${product.price.toFixed(2)}</td>
                     <td className="py-3">
                       <span className="text-primary">★</span> {product.rating}
                     </td>
                     <td className="py-3">
                       <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                         <Eye size={16} />
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
       </main>
       <Footer />
     </div>
   );
 };
 
 export default AdminDashboard;