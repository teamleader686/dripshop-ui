import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useOrders } from '@/context/OrderContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShippingStage } from '@/types/orders';
import { Truck, Package, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const couriers = ['FedEx', 'DHL', 'UPS', 'USPS', 'BlueDart', 'Delhivery'];

const shippingStageLabels: Record<ShippingStage, string> = {
  picked_up: 'Picked Up',
  in_transit: 'In Transit',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
};

const nextShippingStage: Record<string, ShippingStage[]> = {
  picked_up: ['in_transit'],
  in_transit: ['out_for_delivery'],
  out_for_delivery: ['delivered'],
  delivered: [],
};

const AdminShipping = () => {
  const { orders, assignShipping, updateShippingStage } = useOrders();
  const [assigningOrder, setAssigningOrder] = useState<string | null>(null);
  const [courier, setCourier] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [location, setLocation] = useState('');

  // Orders that can have shipping assigned or updated
  const shippableOrders = orders.filter(o =>
    ['packed', 'shipped', 'out_for_delivery'].includes(o.status) ||
    (o.status === 'processing')
  );

  const handleAssign = (orderId: string) => {
    if (!courier || !trackingId) {
      toast.error('Please fill courier and tracking ID');
      return;
    }
    assignShipping(orderId, courier, trackingId);
    toast.success(`Shipping assigned to ${orderId}`);
    setAssigningOrder(null);
    setCourier('');
    setTrackingId('');
  };

  const handleStageUpdate = (orderId: string, stage: ShippingStage) => {
    updateShippingStage(orderId, stage, location || 'Transit Hub');
    toast.success(`Shipping updated to ${shippingStageLabels[stage]}`);
    setLocation('');
  };

  return (
    <AdminLayout title="Shipping Management">
      <div className="space-y-4">
        {shippableOrders.length === 0 ? (
          <div className="bg-card rounded-xl border border-border p-8 text-center">
            <Truck size={40} className="mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">No orders need shipping attention</p>
          </div>
        ) : (
          shippableOrders.map(order => (
            <div key={order.id} className="bg-card rounded-xl border border-border p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-semibold">{order.id}</h3>
                  <p className="text-sm text-muted-foreground">{order.customerName} • {order.shippingAddress}</p>
                </div>
                <span className="text-sm font-medium capitalize px-2 py-0.5 rounded-full bg-primary/10 text-primary w-fit">
                  {order.status.replace('_', ' ')}
                </span>
              </div>

              {/* Items preview */}
              <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 flex-shrink-0">
                    <img src={item.product.image} alt="" className="w-8 h-10 object-cover rounded" />
                    <div>
                      <p className="text-xs font-medium line-clamp-1">{item.product.name}</p>
                      <p className="text-[10px] text-muted-foreground">x{item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {!order.shipping ? (
                // Assign shipping
                assigningOrder === order.id ? (
                  <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                    <div className="grid grid-cols-2 gap-3">
                      <Select value={courier} onValueChange={setCourier}>
                        <SelectTrigger className="h-9 text-sm">
                          <SelectValue placeholder="Select Courier" />
                        </SelectTrigger>
                        <SelectContent>
                          {couriers.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Tracking ID"
                        value={trackingId}
                        onChange={e => setTrackingId(e.target.value)}
                        className="h-9 text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleAssign(order.id)}>
                        <Truck size={14} className="mr-1" /> Assign
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setAssigningOrder(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => setAssigningOrder(order.id)}>
                    <Package size={14} className="mr-1" /> Assign Courier & Tracking
                  </Button>
                )
              ) : (
                // Update shipping stage
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Truck size={18} className="text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{order.shipping.courier} • {order.shipping.trackingId}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        Current: {shippingStageLabels[order.shipping.stage]}
                      </p>
                    </div>
                  </div>

                  {/* Tracking history */}
                  <div className="space-y-2 pl-2">
                    {order.shipping.updates.map((update, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <MapPin size={12} className="text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium capitalize">{update.stage.replace('_', ' ')}</span>
                          <span className="text-muted-foreground"> • {update.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Next stage actions */}
                  {(nextShippingStage[order.shipping.stage] || []).length > 0 && (
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Location (optional)"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        className="h-8 text-xs flex-1 max-w-xs"
                      />
                      {(nextShippingStage[order.shipping.stage] || []).map(stage => (
                        <Button
                          key={stage}
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() => handleStageUpdate(order.id, stage)}
                        >
                          Mark {shippingStageLabels[stage]}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminShipping;
