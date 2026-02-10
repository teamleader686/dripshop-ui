import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import OrderTimeline from '@/components/orders/OrderTimeline';
import { useOrder, useCancelOrder } from '@/hooks/useOrders';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Truck, RotateCcw, X, MapPin, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoading } = useOrder(id);
  const cancelOrder = useCancelOrder();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  if (isLoading) {
    return <AppLayout><div className="container-main py-8"><Skeleton className="h-8 w-48 mb-4" /><Skeleton className="h-64 rounded-xl" /></div></AppLayout>;
  }

  if (!order) {
    return <AppLayout><div className="container-main py-16 text-center"><h1 className="text-2xl font-bold mb-4">Order not found</h1><Button asChild><Link to="/orders">Back to Orders</Link></Button></div></AppLayout>;
  }

  const canCancel = ['placed', 'processing'].includes(order.status);
  const hasReturn = order.returns && order.returns.length > 0;
  const canReturn = order.status === 'delivered' && !hasReturn;
  const returnReq = hasReturn ? order.returns![0] : null;
  const shipping = order.shipping as any; // single shipping object

  const handleCancel = async () => {
    try {
      await cancelOrder.mutateAsync(order.id);
      toast.success('Order cancelled successfully');
      setShowCancelConfirm(false);
    } catch { toast.error('Failed to cancel order'); }
  };

  const copyTrackingId = () => {
    if (shipping?.tracking_id) { navigator.clipboard.writeText(shipping.tracking_id); toast.success('Tracking ID copied!'); }
  };

  return (
    <AppLayout>
      <div className="container-main py-4 md:py-8">
        <Link to="/orders" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"><ArrowLeft size={16} className="mr-2" />Back to Orders</Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">{order.order_number}</h1>
            <p className="text-sm text-muted-foreground">Placed on {new Date(order.placed_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <div className="flex gap-2 mt-3 md:mt-0">
            {canCancel && <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => setShowCancelConfirm(true)}><X size={14} className="mr-1" /> Cancel Order</Button>}
            {canReturn && <Button variant="outline" size="sm" onClick={() => navigate(`/orders/${order.id}/return`)}><RotateCcw size={14} className="mr-1" /> Request Return</Button>}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <h2 className="text-base md:text-lg font-semibold mb-4">Order Status</h2>
              <OrderTimeline timeline={(order.order_timeline || []).map(t => ({ status: t.status, date: t.created_at }))} currentStatus={order.status} isCancelled={order.status === 'cancelled'} />
            </div>

            {shipping && (
              <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                <h2 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2"><Truck size={18} className="text-primary" /> Shipping Details</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div><p className="text-xs text-muted-foreground">Courier</p><p className="font-medium text-sm">{shipping.courier}</p></div>
                    <div className="text-right"><p className="text-xs text-muted-foreground">Tracking ID</p><button onClick={copyTrackingId} className="font-medium text-sm text-primary flex items-center gap-1">{shipping.tracking_id}<Copy size={12} /></button></div>
                  </div>
                  {shipping.estimated_delivery && <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground mb-1">Est. Delivery</p><p className="font-medium text-sm">{shipping.estimated_delivery}</p></div>}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Tracking Updates</p>
                    {(shipping.shipping_updates || []).map((update: any, i: number) => (
                      <div key={i} className="flex items-start gap-3 text-sm"><MapPin size={14} className="text-primary mt-0.5 flex-shrink-0" /><div><p className="font-medium capitalize">{update.stage.replace('_', ' ')}</p><p className="text-xs text-muted-foreground">{update.location} • {new Date(update.created_at).toLocaleString()}</p></div></div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {returnReq && (
              <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                <h2 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2"><RotateCcw size={18} className="text-destructive" /> Return Status</h2>
                <p className="text-sm text-muted-foreground mb-4">Reason: {returnReq.reason}</p>
                <OrderTimeline timeline={(returnReq.return_timeline || []).map(t => ({ status: t.status, date: t.created_at }))} currentStatus={returnReq.status} type="return" />
                <div className="mt-4 p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Refund Amount</p><p className="font-semibold text-lg">${Number(returnReq.refund_amount).toFixed(2)}</p></div>
              </div>
            )}

            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <h2 className="text-base md:text-lg font-semibold mb-4">Order Items</h2>
              <div className="space-y-3">
                {(order.order_items || []).map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.product_image || '/placeholder.svg'} alt={item.product_name} className="w-16 h-20 object-cover rounded-lg" />
                    <div className="flex-1"><p className="font-medium text-sm">{item.product_name}</p><p className="text-xs text-muted-foreground">Qty: {item.quantity}</p><p className="font-semibold text-sm mt-1">${(Number(item.price) * item.quantity).toFixed(2)}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <h3 className="font-semibold text-sm mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${Number(order.total_amount).toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-success">FREE</span></div>
                <div className="flex justify-between font-semibold pt-2 border-t border-border"><span>Total</span><span>${Number(order.total_amount).toFixed(2)}</span></div>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6"><h3 className="font-semibold text-sm mb-3">Delivery Address</h3><p className="text-sm text-muted-foreground">{order.shipping_address}</p></div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6"><h3 className="font-semibold text-sm mb-3">Payment</h3><p className="text-sm text-muted-foreground">{order.payment_method}</p></div>
          </div>
        </div>
      </div>

      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2">Cancel Order?</h3>
            <p className="text-sm text-muted-foreground mb-6">Are you sure? This action cannot be undone.</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowCancelConfirm(false)}>Keep Order</Button>
              <Button variant="destructive" className="flex-1" onClick={handleCancel} disabled={cancelOrder.isPending}>Yes, Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default OrderDetail;
