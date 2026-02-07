import AdminLayout from '@/components/admin/AdminLayout';
import { useOrders } from '@/context/OrderContext';
import {
  DollarSign,
  ShoppingBag,
  Package,
  RotateCcw,
  TrendingUp,
  Truck,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { orders, adminProducts } = useOrders();

  const totalSales = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingShipments = orders.filter(o => ['placed', 'processing', 'packed'].includes(o.status)).length;
  const returnsRequested = orders.filter(o => o.returnRequest).length;
  const deliveredCount = orders.filter(o => o.status === 'delivered').length;

  const stats = [
    { title: 'Total Sales', value: `$${totalSales.toFixed(0)}`, icon: DollarSign, change: '+12.5%', color: 'text-success' },
    { title: 'Total Orders', value: String(orders.length), icon: ShoppingBag, change: '+8.2%', color: 'text-primary' },
    { title: 'Products', value: String(adminProducts.length), icon: Package, change: '', color: 'text-accent-foreground' },
    { title: 'Pending Shipments', value: String(pendingShipments), icon: Truck, change: '', color: 'text-primary' },
    { title: 'Returns', value: String(returnsRequested), icon: RotateCcw, change: '', color: 'text-destructive' },
    { title: 'Delivered', value: String(deliveredCount), icon: TrendingUp, change: '', color: 'text-success' },
  ];

  const recentOrders = orders.slice(0, 5);

  const statusColors: Record<string, string> = {
    placed: 'bg-accent text-accent-foreground',
    processing: 'bg-accent text-accent-foreground',
    packed: 'bg-primary/10 text-primary',
    shipped: 'bg-primary/10 text-primary',
    out_for_delivery: 'bg-primary/10 text-primary',
    delivered: 'bg-success/10 text-success',
    cancelled: 'bg-destructive/10 text-destructive',
  };

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-card rounded-xl border border-border p-3 md:p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                <stat.icon className={stat.color} size={18} />
              </div>
              {stat.change && (
                <span className="text-[10px] md:text-xs font-medium text-success">{stat.change}</span>
              )}
            </div>
            <p className="text-lg md:text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Link to="/admin/orders" className="bg-card rounded-xl border border-border p-4 text-center hover:shadow-soft transition-shadow">
          <ShoppingBag size={24} className="mx-auto mb-2 text-primary" />
          <p className="text-sm font-medium">Manage Orders</p>
        </Link>
        <Link to="/admin/products" className="bg-card rounded-xl border border-border p-4 text-center hover:shadow-soft transition-shadow">
          <Package size={24} className="mx-auto mb-2 text-primary" />
          <p className="text-sm font-medium">Manage Products</p>
        </Link>
        <Link to="/admin/shipping" className="bg-card rounded-xl border border-border p-4 text-center hover:shadow-soft transition-shadow">
          <Truck size={24} className="mx-auto mb-2 text-primary" />
          <p className="text-sm font-medium">Shipping</p>
        </Link>
        <Link to="/admin/returns" className="bg-card rounded-xl border border-border p-4 text-center hover:shadow-soft transition-shadow">
          <RotateCcw size={24} className="mx-auto mb-2 text-primary" />
          <p className="text-sm font-medium">Returns</p>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-xl border border-border p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base md:text-lg font-semibold">Recent Orders</h2>
          <Link to="/admin/orders" className="text-sm text-primary hover:underline">View All</Link>
        </div>
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
              {recentOrders.map(order => (
                <tr key={order.id} className="border-b border-border last:border-0">
                  <td className="py-2 md:py-3 font-medium">{order.id}</td>
                  <td className="py-2 md:py-3">{order.customerName}</td>
                  <td className="py-2 md:py-3">${order.totalAmount.toFixed(2)}</td>
                  <td className="py-2 md:py-3">
                    <span className={`px-1.5 md:px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium capitalize ${statusColors[order.status]}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
