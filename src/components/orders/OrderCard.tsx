import { Link } from 'react-router-dom';
import { Order } from '@/types/orders';
import { ChevronRight } from 'lucide-react';

const statusColors: Record<string, string> = {
  placed: 'bg-accent text-accent-foreground',
  processing: 'bg-accent text-accent-foreground',
  packed: 'bg-primary/10 text-primary',
  shipped: 'bg-primary/10 text-primary',
  out_for_delivery: 'bg-primary/10 text-primary',
  delivered: 'bg-success/10 text-success',
  cancelled: 'bg-destructive/10 text-destructive',
};

const statusLabels: Record<string, string> = {
  placed: 'Placed',
  processing: 'Processing',
  packed: 'Packed',
  shipped: 'Shipped',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <Link
      to={`/orders/${order.id}`}
      className="block bg-card rounded-xl border border-border p-3 md:p-4 hover:shadow-soft transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-sm">{order.id}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(order.placedAt).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric',
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium ${statusColors[order.status]}`}>
            {statusLabels[order.status]}
          </span>
          <ChevronRight size={16} className="text-muted-foreground" />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {order.items.slice(0, 3).map((item, i) => (
          <img
            key={i}
            src={item.product.image}
            alt={item.product.name}
            className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-lg flex-shrink-0"
          />
        ))}
        {order.items.length > 3 && (
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
            <span className="text-xs text-muted-foreground">+{order.items.length - 3}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <span className="text-xs text-muted-foreground">{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
        <span className="font-semibold text-sm">${order.totalAmount.toFixed(2)}</span>
      </div>

      {order.returnRequest && (
        <div className="mt-2 px-2 py-1 bg-destructive/5 rounded text-[10px] text-destructive font-medium">
          Return {order.returnRequest.status === 'rejected' ? 'Rejected' : 'In Progress'}
        </div>
      )}
    </Link>
  );
};

export default OrderCard;
