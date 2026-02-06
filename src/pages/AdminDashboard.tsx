import AppLayout from '@/components/layout/AppLayout';
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  TrendingUp,
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
        return 'bg-primary/10 text-primary';
      case 'Processing':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <AppLayout>
      <div className="container-main py-4 md:py-8">
        <div className="mb-4 md:mb-8">
          <h1 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground text-xs md:text-base">Welcome back! Here's your store overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-8">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-card rounded-xl border border-border p-3 md:p-6">
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent flex items-center justify-center">
                  <stat.icon className="text-accent-foreground" size={16} />
                </div>
                <span className="text-[10px] md:text-xs font-medium text-success">{stat.change}</span>
              </div>
              <p className="text-lg md:text-2xl font-bold">{stat.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground">{stat.title}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-8">
          {/* Recent Orders */}
          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b border-border">
                    <th className="text-left py-2 md:py-3">Order ID</th>
                    <th className="text-left py-2 md:py-3">Customer</th>
                    <th className="text-left py-2 md:py-3">Amount</th>
                    <th className="text-left py-2 md:py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0">
                      <td className="py-2 md:py-3 font-medium">{order.id}</td>
                      <td className="py-2 md:py-3">{order.customer}</td>
                      <td className="py-2 md:py-3">${order.amount}</td>
                      <td className="py-2 md:py-3">
                        <span className={`px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium ${getStatusColor(order.status)}`}>
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
          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Campaign Performance</h2>
            <div className="space-y-3 md:space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.name} className="flex items-center justify-between p-3 md:p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{campaign.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Reach: {campaign.reach} • Clicks: {campaign.clicks}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm text-primary">{campaign.conversion}</p>
                    <p className="text-xs text-muted-foreground">{campaign.spend}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-card rounded-xl border border-border p-4 md:p-6">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 className="text-base md:text-lg font-semibold">Products</h2>
            <span className="text-xs md:text-sm text-muted-foreground">{products.length} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
              <thead>
                <tr className="text-muted-foreground border-b border-border">
                  <th className="text-left py-2 md:py-3">Product</th>
                  <th className="text-left py-2 md:py-3 hidden md:table-cell">Category</th>
                  <th className="text-left py-2 md:py-3">Price</th>
                  <th className="text-left py-2 md:py-3">Rating</th>
                  <th className="text-left py-2 md:py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 6).map((product) => (
                  <tr key={product.id} className="border-b border-border last:border-0">
                    <td className="py-2 md:py-3">
                      <div className="flex items-center gap-2 md:gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-8 h-10 md:w-10 md:h-12 object-cover rounded"
                        />
                        <span className="font-medium line-clamp-1">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-2 md:py-3 hidden md:table-cell">{product.category}</td>
                    <td className="py-2 md:py-3">${product.price.toFixed(2)}</td>
                    <td className="py-2 md:py-3">
                      <span className="text-primary">★</span> {product.rating}
                    </td>
                    <td className="py-2 md:py-3">
                      <button className="p-1.5 md:p-2 hover:bg-muted rounded-lg transition-colors">
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
