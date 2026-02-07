import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import OrderCard from '@/components/orders/OrderCard';
import { useOrders } from '@/context/OrderContext';
import { Button } from '@/components/ui/button';
import { Package, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'cancelled', label: 'Cancelled' },
  { key: 'returns', label: 'Returns' },
];

const MyOrders = () => {
  const { getOrdersByCustomer } = useOrders();
  const [activeTab, setActiveTab] = useState('all');
  const userOrders = getOrdersByCustomer('user-1');

  const filteredOrders = userOrders.filter(order => {
    switch (activeTab) {
      case 'active': return !['delivered', 'cancelled'].includes(order.status);
      case 'delivered': return order.status === 'delivered';
      case 'cancelled': return order.status === 'cancelled';
      case 'returns': return !!order.returnRequest;
      default: return true;
    }
  });

  return (
    <AppLayout>
      <div className="container-main py-4 md:py-8">
        <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">My Orders</h1>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto scrollbar-hide mb-4 md:mb-6 pb-1">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold mb-2">No orders found</h2>
            <p className="text-muted-foreground text-sm mb-4">
              {activeTab === 'all' ? "You haven't placed any orders yet." : `No ${activeTab} orders.`}
            </p>
            <Button asChild>
              <Link to="/products">
                <ShoppingBag size={16} className="mr-2" />
                Start Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {filteredOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default MyOrders;
