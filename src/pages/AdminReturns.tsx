import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminOrders, useUpdateReturnStatus } from '@/hooks/useAdmin';
import { Button } from '@/components/ui/button';
import { RotateCcw, Check, X, Truck, Package, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

const returnStatusLabels: Record<string, string> = { requested: 'Requested', approved: 'Approved', rejected: 'Rejected', pickup_scheduled: 'Pickup Scheduled', returned: 'Returned', refund_processed: 'Refund Processed' };
const returnStatusColors: Record<string, string> = { requested: 'bg-accent text-accent-foreground', approved: 'bg-primary/10 text-primary', rejected: 'bg-destructive/10 text-destructive', pickup_scheduled: 'bg-primary/10 text-primary', returned: 'bg-success/10 text-success', refund_processed: 'bg-success/10 text-success' };
const nextReturnAction: Record<string, { status: string; label: string; icon: React.ElementType }[]> = {
  requested: [{ status: 'approved', label: 'Approve', icon: Check }, { status: 'rejected', label: 'Reject', icon: X }],
  approved: [{ status: 'pickup_scheduled', label: 'Schedule Pickup', icon: Truck }],
  pickup_scheduled: [{ status: 'returned', label: 'Mark Returned', icon: Package }],
  returned: [{ status: 'refund_processed', label: 'Process Refund', icon: CreditCard }],
  rejected: [], refund_processed: [],
};

const AdminReturns = () => {
  const { data: orders, isLoading } = useAdminOrders();
  const updateReturn = useUpdateReturnStatus();

  const returnsOrders = (orders || []).filter(o => o.returns && o.returns.length > 0);

  if (isLoading) return <AdminLayout title="Return Management"><Skeleton className="h-64 rounded-xl" /></AdminLayout>;

  return (
    <AdminLayout title="Return Management">
      {returnsOrders.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-8 text-center"><RotateCcw size={40} className="mx-auto mb-3 text-muted-foreground" /><p className="text-muted-foreground">No return requests</p></div>
      ) : (
        <div className="space-y-4">
          {returnsOrders.map(order => {
            const ret = order.returns![0];
            const actions = nextReturnAction[ret.status] || [];
            return (
              <div key={ret.id} className="bg-card rounded-xl border border-border p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{order.order_number}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium ${returnStatusColors[ret.status]}`}>{returnStatusLabels[ret.status]}</span>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-primary">${Number(ret.refund_amount).toFixed(2)}</p>
                </div>
                <div className="mb-4 p-3 bg-muted/30 rounded-lg"><p className="text-xs text-muted-foreground mb-1">Reason</p><p className="text-sm">{ret.reason}</p></div>
                <div className="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-hide">
                  {(ret.return_timeline || []).map((t, i) => (
                    <div key={i} className="flex items-center gap-1 text-xs whitespace-nowrap">
                      <span className="w-2 h-2 rounded-full bg-success flex-shrink-0" />
                      <span className="font-medium capitalize">{t.status.replace('_', ' ')}</span>
                      {i < (ret.return_timeline || []).length - 1 && <span className="text-muted-foreground mx-1">→</span>}
                    </div>
                  ))}
                </div>
                {actions.length > 0 && (
                  <div className="flex gap-2">
                    {actions.map(action => (
                      <Button key={action.status} size="sm" variant={action.status === 'rejected' ? 'destructive' : 'default'} onClick={() => { updateReturn.mutate({ returnId: ret.id, status: action.status }); toast.success(`Return ${action.label.toLowerCase()}`); }}>
                        <action.icon size={14} className="mr-1" />{action.label}
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
