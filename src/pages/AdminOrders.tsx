import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminOrders, useUpdateOrderStatus } from '@/hooks/useAdmin';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

const statusLabels: Record<string, string> = { placed: 'Placed', processing: 'Processing', packed: 'Packed', shipped: 'Shipped', out_for_delivery: 'Out for Delivery', delivered: 'Delivered', cancelled: 'Cancelled' };
const statusColors: Record<string, string> = { placed: 'bg-accent text-accent-foreground', processing: 'bg-accent text-accent-foreground', packed: 'bg-primary/10 text-primary', shipped: 'bg-primary/10 text-primary', out_for_delivery: 'bg-primary/10 text-primary', delivered: 'bg-success/10 text-success', cancelled: 'bg-destructive/10 text-destructive' };
const nextStatuses: Record<string, string[]> = { placed: ['processing', 'cancelled'], processing: ['packed', 'cancelled'], packed: ['shipped'], shipped: ['out_for_delivery'], out_for_delivery: ['delivered'], delivered: [], cancelled: [] };

const AdminOrders = () => {
  const { data: orders, isLoading } = useAdminOrders();
  const updateStatus = useUpdateOrderStatus();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = (orders || []).filter(o => {
    const matchesSearch = o.order_number.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout title="Order Management">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm w-full"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" /></div>
        <Select value={filterStatus} onValueChange={setFilterStatus}><SelectTrigger className="w-[160px]"><SelectValue placeholder="Filter" /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem>{Object.entries(statusLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent></Select>
      </div>

      {isLoading ? <Skeleton className="h-64 rounded-xl" /> : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
              <thead><tr className="text-muted-foreground border-b border-border bg-muted/30"><th className="text-left py-3 px-4">Order</th><th className="text-left py-3 px-4 hidden md:table-cell">Items</th><th className="text-left py-3 px-4">Amount</th><th className="text-left py-3 px-4">Status</th><th className="text-left py-3 px-4">Action</th></tr></thead>
              <tbody>
                {filtered.map(order => {
                  const available = nextStatuses[order.status] || [];
                  return (
                    <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                      <td className="py-3 px-4 font-medium">{order.order_number}</td>
                      <td className="py-3 px-4 hidden md:table-cell text-muted-foreground">{(order.order_items || []).length} items</td>
                      <td className="py-3 px-4">${Number(order.total_amount).toFixed(2)}</td>
                      <td className="py-3 px-4"><span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium capitalize ${statusColors[order.status]}`}>{statusLabels[order.status]}</span></td>
                      <td className="py-3 px-4">
                        {available.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {available.map(status => (
                              <Button key={status} size="sm" variant={status === 'cancelled' ? 'destructive' : 'outline'} className="h-7 text-[10px] md:text-xs px-2" onClick={() => { updateStatus.mutate({ orderId: order.id, status }); toast.success(`Order updated to ${statusLabels[status]}`); }}>
                                {statusLabels[status]}
                              </Button>
                            ))}
                          </div>
                        ) : <span className="text-xs text-muted-foreground">—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <div className="text-center py-8 text-muted-foreground text-sm">No orders found</div>}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminOrders;
