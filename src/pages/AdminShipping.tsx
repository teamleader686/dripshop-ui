import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminOrders, useAssignShipping, useUpdateShippingStage } from '@/hooks/useAdmin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Truck, Package, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

const couriers = ['FedEx', 'DHL', 'UPS', 'USPS', 'BlueDart', 'Delhivery'];
const shippingStageLabels: Record<string, string> = { picked_up: 'Picked Up', in_transit: 'In Transit', out_for_delivery: 'Out for Delivery', delivered: 'Delivered' };
const nextShippingStage: Record<string, string[]> = { picked_up: ['in_transit'], in_transit: ['out_for_delivery'], out_for_delivery: ['delivered'], delivered: [] };

const AdminShipping = () => {
  const { data: orders, isLoading } = useAdminOrders();
  const assignShipping = useAssignShipping();
  const updateStage = useUpdateShippingStage();
  const [assigningOrder, setAssigningOrder] = useState<string | null>(null);
  const [courier, setCourier] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [location, setLocation] = useState('');

  const shippableOrders = (orders || []).filter(o => ['processing', 'packed', 'shipped', 'out_for_delivery'].includes(o.status));

  if (isLoading) return <AdminLayout title="Shipping Management"><Skeleton className="h-64 rounded-xl" /></AdminLayout>;

  return (
    <AdminLayout title="Shipping Management">
      <div className="space-y-4">
        {shippableOrders.length === 0 ? (
          <div className="bg-card rounded-xl border border-border p-8 text-center"><Truck size={40} className="mx-auto mb-3 text-muted-foreground" /><p className="text-muted-foreground">No orders need shipping attention</p></div>
        ) : shippableOrders.map(order => {
          const shipping = order.shipping as any;
          return (
            <div key={order.id} className="bg-card rounded-xl border border-border p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                <div><h3 className="font-semibold">{order.order_number}</h3><p className="text-sm text-muted-foreground">{order.shipping_address}</p></div>
                <span className="text-sm font-medium capitalize px-2 py-0.5 rounded-full bg-primary/10 text-primary w-fit">{order.status.replace('_', ' ')}</span>
              </div>

              {!shipping ? (
                assigningOrder === order.id ? (
                  <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                    <div className="grid grid-cols-2 gap-3">
                      <Select value={courier} onValueChange={setCourier}><SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select Courier" /></SelectTrigger><SelectContent>{couriers.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
                      <Input placeholder="Tracking ID" value={trackingId} onChange={e => setTrackingId(e.target.value)} className="h-9 text-sm" />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => { if (!courier || !trackingId) { toast.error('Fill courier and tracking ID'); return; } assignShipping.mutate({ orderId: order.id, courier, trackingId }); toast.success('Shipping assigned'); setAssigningOrder(null); setCourier(''); setTrackingId(''); }}><Truck size={14} className="mr-1" /> Assign</Button>
                      <Button size="sm" variant="outline" onClick={() => setAssigningOrder(null)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => setAssigningOrder(order.id)}><Package size={14} className="mr-1" /> Assign Courier & Tracking</Button>
                )
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Truck size={18} className="text-primary" />
                    <div className="flex-1"><p className="text-sm font-medium">{shipping.courier} • {shipping.tracking_id}</p><p className="text-xs text-muted-foreground capitalize">Current: {shippingStageLabels[shipping.stage]}</p></div>
                  </div>
                  <div className="space-y-2 pl-2">
                    {(shipping.shipping_updates || []).map((update: any, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-xs"><MapPin size={12} className="text-primary mt-0.5 flex-shrink-0" /><div><span className="font-medium capitalize">{update.stage.replace('_', ' ')}</span><span className="text-muted-foreground"> • {update.location}</span></div></div>
                    ))}
                  </div>
                  {(nextShippingStage[shipping.stage] || []).length > 0 && (
                    <div className="flex items-center gap-2">
                      <Input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} className="h-8 text-xs flex-1 max-w-xs" />
                      {(nextShippingStage[shipping.stage] || []).map((stage: string) => (
                        <Button key={stage} size="sm" className="h-8 text-xs" onClick={() => { updateStage.mutate({ shippingId: shipping.id, orderId: order.id, stage, location: location || 'Transit Hub' }); toast.success(`Updated to ${shippingStageLabels[stage]}`); setLocation(''); }}>Mark {shippingStageLabels[stage]}</Button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
};

export default AdminShipping;
