import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useUserOrders } from '@/hooks/useOrders';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Package, ShoppingBag, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import type { DbOrder } from '@/types/database';

const statusColors: Record<string, string> = {
  placed: 'bg-accent text-accent-foreground', processing: 'bg-accent text-accent-foreground',
  packed: 'bg-primary/10 text-primary', shipped: 'bg-primary/10 text-primary',
  out_for_delivery: 'bg-primary/10 text-primary', delivered: 'bg-success/10 text-success',
  cancelled: 'bg-destructive/10 text-destructive',
};
const statusLabels: Record<string, string> = {
  placed: 'Placed', processing: 'Processing', packed: 'Packed', shipped: 'Shipped',
  out_for_delivery: 'Out for Delivery', delivered: 'Delivered', cancelled: 'Cancelled',
};

const tabs = [
  { key: 'all', label: 'All' }, { key: 'active', label: 'Active' },
  { key: 'delivered', label: 'Delivered' }, { key: 'cancelled', label: 'Cancelled' },
  { key: 'returns', label: 'Returns' },
];

const OrderCard = ({ order }: { order: DbOrder }) => (
  <Link to={`/orders/${order.id}`} className="block bg-card rounded-xl border border-border p-3 md:p-4 hover:shadow-soft transition-shadow">
    <div className="flex items-start justify-between mb-3">
      <div>
        <p className="font-semibold text-sm">{order.order_number}</p>
        <p className="text-xs text-muted-foreground">{new Date(order.placed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium ${statusColors[order.status]}`}>{statusLabels[order.status]}</span>
        <ChevronRight size={16} className="text-muted-foreground" />
      </div>
    </div>
    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
      {(order.order_items || []).slice(0, 3).map((item) => (
        <img key={item.id} src={item.product_image || '/placeholder.svg'} alt={item.product_name} className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-lg flex-shrink-0" />
      ))}
      {(order.order_items || []).length > 3 && (
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
          <span className="text-xs text-muted-foreground">+{(order.order_items || []).length - 3}</span>
        </div>
      )}
    </div>
    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
      <span className="text-xs text-muted-foreground">{(order.order_items || []).length} item{(order.order_items || []).length > 1 ? 's' : ''}</span>
      <span className="font-semibold text-sm">${Number(order.total_amount).toFixed(2)}</span>
    </div>
    {order.returns && order.returns.length > 0 && (
      <div className="mt-2 px-2 py-1 bg-destructive/5 rounded text-[10px] text-destructive font-medium">Return In Progress</div>
    )}
  </Link>
);

const MyOrders = () => {
  const { user } = useAuth();
  const { data: orders, isLoading } = useUserOrders();
  const [activeTab, setActiveTab] = useState('all');

  if (!user) {
    return (
      <AppLayout>
        <div className="container-main py-16 text-center">
          <h2 className="text-lg font-semibold mb-2">Sign in to view orders</h2>
          <Button asChild><Link to="/login">Sign In</Link></Button>
        </div>
      </AppLayout>
    );
  }

  const filteredOrders = (orders || []).filter(order => {
    switch (activeTab) {
      case 'active': return !['delivered', 'cancelled'].includes(order.status);
      case 'delivered': return order.status === 'delivered';
      case 'cancelled': return order.status === 'cancelled';
      case 'returns': return order.returns && order.returns.length > 0;
      default: return true;
    }
  });

  return (
    <AppLayout>
      <div className="container-main py-4 md:py-8">
        <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">My Orders</h1>
        <div className="flex gap-1 overflow-x-auto scrollbar-hide mb-4 md:mb-6 pb-1">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.key ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)}</div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4"><Package size={32} className="text-muted-foreground" /></div>
            <h2 className="text-lg font-semibold mb-2">No orders found</h2>
            <p className="text-muted-foreground text-sm mb-4">{activeTab === 'all' ? "You haven't placed any orders yet." : `No ${activeTab} orders.`}</p>
            <Button asChild><Link to="/products"><ShoppingBag size={16} className="mr-2" />Start Shopping</Link></Button>
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {filteredOrders.map(order => <OrderCard key={order.id} order={order} />)}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default MyOrders;
