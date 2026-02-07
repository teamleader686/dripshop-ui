import AdminLayout from '@/components/admin/AdminLayout';
import { useOrders } from '@/context/OrderContext';
import { Button } from '@/components/ui/button';
import { ReturnStatus } from '@/types/orders';
import { RotateCcw, Check, X, Truck, Package, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

const returnStatusLabels: Record<ReturnStatus, string> = {
  requested: 'Requested',
  approved: 'Approved',
  rejected: 'Rejected',
  pickup_scheduled: 'Pickup Scheduled',
  returned: 'Returned',
  refund_processed: 'Refund Processed',
};

const returnStatusColors: Record<ReturnStatus, string> = {
  requested: 'bg-accent text-accent-foreground',
  approved: 'bg-primary/10 text-primary',
  rejected: 'bg-destructive/10 text-destructive',
  pickup_scheduled: 'bg-primary/10 text-primary',
  returned: 'bg-success/10 text-success',
  refund_processed: 'bg-success/10 text-success',
};

const nextReturnAction: Record<ReturnStatus, { status: ReturnStatus; label: string; icon: React.ElementType }[]> = {
  requested: [
    { status: 'approved', label: 'Approve', icon: Check },
    { status: 'rejected', label: 'Reject', icon: X },
  ],
  approved: [
    { status: 'pickup_scheduled', label: 'Schedule Pickup', icon: Truck },
  ],
  pickup_scheduled: [
    { status: 'returned', label: 'Mark Returned', icon: Package },
  ],
  returned: [
    { status: 'refund_processed', label: 'Process Refund', icon: CreditCard },
  ],
  rejected: [],
  refund_processed: [],
};

const AdminReturns = () => {
  const { orders, updateReturnStatus } = useOrders();

  const returnsOrders = orders.filter(o => o.returnRequest);

  const handleUpdate = (returnId: string, status: ReturnStatus, label: string) => {
    updateReturnStatus(returnId, status);
    toast.success(`Return ${label.toLowerCase()}`);
  };

  return (
    <AdminLayout title="Return Management">
      {returnsOrders.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-8 text-center">
          <RotateCcw size={40} className="mx-auto mb-3 text-muted-foreground" />
          <p className="text-muted-foreground">No return requests</p>
        </div>
      ) : (
        <div className="space-y-4">
          {returnsOrders.map(order => {
            const ret = order.returnRequest!;
            const actions = nextReturnAction[ret.status] || [];

            return (
              <div key={ret.id} className="bg-card rounded-xl border border-border p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{ret.id}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium ${returnStatusColors[ret.status]}`}>
                        {returnStatusLabels[ret.status]}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Order: {order.id} • {order.customerName}</p>
                  </div>
                  <p className="text-lg font-bold text-primary">${ret.refundAmount.toFixed(2)}</p>
                </div>

                <div className="mb-4 p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Reason</p>
                  <p className="text-sm">{ret.reason}</p>
                </div>

                {/* Items */}
                <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
                  {ret.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 flex-shrink-0">
                      <img src={item.product.image} alt="" className="w-8 h-10 object-cover rounded" />
                      <div>
                        <p className="text-xs font-medium line-clamp-1">{item.product.name}</p>
                        <p className="text-[10px] text-muted-foreground">x{item.quantity} • ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-hide">
                  {ret.timeline.map((t, i) => (
                    <div key={i} className="flex items-center gap-1 text-xs whitespace-nowrap">
                      <span className="w-2 h-2 rounded-full bg-success flex-shrink-0" />
                      <span className="font-medium capitalize">{t.status.replace('_', ' ')}</span>
                      {i < ret.timeline.length - 1 && <span className="text-muted-foreground mx-1">→</span>}
                    </div>
                  ))}
                </div>

                {/* Actions */}
                {actions.length > 0 && (
                  <div className="flex gap-2">
                    {actions.map(action => (
                      <Button
                        key={action.status}
                        size="sm"
                        variant={action.status === 'rejected' ? 'destructive' : 'default'}
                        onClick={() => handleUpdate(ret.id, action.status, action.label)}
                      >
                        <action.icon size={14} className="mr-1" />
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminReturns;
