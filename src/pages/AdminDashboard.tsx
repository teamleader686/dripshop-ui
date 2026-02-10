import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminStats, useAdminOrders } from '@/hooks/useAdmin';
import { DollarSign, ShoppingBag, Package, RotateCcw, TrendingUp, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

const statusColors: Record<string, string> = {
  placed: 'bg-accent text-accent-foreground', processing: 'bg-accent text-accent-foreground',
  packed: 'bg-primary/10 text-primary', shipped: 'bg-primary/10 text-primary',
  out_for_delivery: 'bg-primary/10 text-primary', delivered: 'bg-success/10 text-success',
  cancelled: 'bg-destructive/10 text-destructive',
};

const AdminDashboard = () => {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: orders } = useAdminOrders();

  const statItems = [
    { title: 'Total Sales', value: `$${(stats?.totalSales || 0).toFixed(0)}`, icon: DollarSign, color: 'text-success' },
    { title: 'Total Orders', value: String(stats?.totalOrders || 0), icon: ShoppingBag, color: 'text-primary' },
    { title: 'Products', value: String(stats?.totalProducts || 0), icon: Package, color: 'text-accent-foreground' },
    { title: 'Pending Shipments', value: String(stats?.pendingShipments || 0), icon: Truck, color: 'text-primary' },
    { title: 'Returns', value: String(stats?.returnsRequested || 0), icon: RotateCcw, color: 'text-destructive' },
    { title: 'Delivered', value: String(stats?.deliveredCount || 0), icon: TrendingUp, color: 'text-success' },
  ];

  const recentOrders = (orders || []).slice(0, 5);

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6">
        {statItems.map((stat) => (
          <div key={stat.title} className="bg-card rounded-xl border border-border p-3 md:p-5">
            {statsLoading ? <Skeleton className="h-16" /> : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center"><stat.icon className={stat.color} size={18} /></div>
                </div>
                <p className="text-lg md:text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.title}</p>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { to: '/admin/orders', icon: ShoppingBag, label: 'Manage Orders' },
          { to: '/admin/products', icon: Package, label: 'Manage Products' },
          { to: '/admin/shipping', icon: Truck, label: 'Shipping' },
          { to: '/admin/returns', icon: RotateCcw, label: 'Returns' },
        ].map(item => (
          <Link key={item.to} to={item.to} className="bg-card rounded-xl border border-border p-4 text-center hover:shadow-soft transition-shadow">
            <item.icon size={24} className="mx-auto mb-2 text-primary" /><p className="text-sm font-medium">{item.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base md:text-lg font-semibold">Recent Orders</h2>
          <Link to="/admin/orders" className="text-sm text-primary hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm">
            <thead><tr className="text-muted-foreground border-b border-border"><th className="text-left py-2 md:py-3">Order</th><th className="text-left py-2 md:py-3">Amount</th><th className="text-left py-2 md:py-3">Status</th></tr></thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} className="border-b border-border last:border-0">
                  <td className="py-2 md:py-3 font-medium">{order.order_number}</td>
                  <td className="py-2 md:py-3">${Number(order.total_amount).toFixed(2)}</td>
                  <td className="py-2 md:py-3"><span className={`px-1.5 md:px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium capitalize ${statusColors[order.status]}`}>{order.status.replace('_', ' ')}</span></td>
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
