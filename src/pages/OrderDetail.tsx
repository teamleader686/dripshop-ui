import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import OrderTimeline from '@/components/orders/OrderTimeline';
import { useOrders } from '@/context/OrderContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Truck, RotateCcw, X, MapPin, Copy } from 'lucide-react';
import { toast } from 'sonner';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrderById, cancelOrder } = useOrders();
  const order = getOrderById(id || '');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  if (!order) {
    return (
      <AppLayout>
        <div className="container-main py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Button asChild><Link to="/orders">Back to Orders</Link></Button>
        </div>
      </AppLayout>
    );
  }

  const canCancel = ['placed', 'processing'].includes(order.status);
  const canReturn = order.status === 'delivered' && !order.returnRequest;

  const handleCancel = () => {
    cancelOrder(order.id);
    toast.success('Order cancelled successfully');
    setShowCancelConfirm(false);
  };

  const copyTrackingId = () => {
    if (order.shipping?.trackingId) {
      navigator.clipboard.writeText(order.shipping.trackingId);
      toast.success('Tracking ID copied!');
    }
  };

  return (
    <AppLayout>
      <div className="container-main py-4 md:py-8">
        <Link to="/orders" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft size={16} className="mr-2" />
          Back to Orders
        </Link>

        {/* Order Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">{order.id}</h1>
            <p className="text-sm text-muted-foreground">
              Placed on {new Date(order.placedAt).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric',
              })}
            </p>
          </div>
          <div className="flex gap-2 mt-3 md:mt-0">
            {canCancel && (
              <Button
                variant="outline"
                size="sm"
                className="text-destructive border-destructive/30 hover:bg-destructive/10"
                onClick={() => setShowCancelConfirm(true)}
              >
                <X size={14} className="mr-1" /> Cancel Order
              </Button>
            )}
            {canReturn && (
              <Button variant="outline" size="sm" onClick={() => navigate(`/orders/${order.id}/return`)}>
                <RotateCcw size={14} className="mr-1" /> Request Return
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
          {/* Timeline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <h2 className="text-base md:text-lg font-semibold mb-4">Order Status</h2>
              <OrderTimeline
                timeline={order.timeline}
                currentStatus={order.status}
                isCancelled={order.status === 'cancelled'}
              />
            </div>

            {/* Shipping Info */}
            {order.shipping && (
              <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                <h2 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2">
                  <Truck size={18} className="text-primary" /> Shipping Details
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground">Courier</p>
                      <p className="font-medium text-sm">{order.shipping.courier}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Tracking ID</p>
                      <button onClick={copyTrackingId} className="font-medium text-sm text-primary flex items-center gap-1">
                        {order.shipping.trackingId}
                        <Copy size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Est. Delivery</p>
                    <p className="font-medium text-sm">{order.shipping.estimatedDelivery}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Tracking Updates</p>
                    {order.shipping.updates.map((update, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <MapPin size={14} className="text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium capitalize">{update.stage.replace('_', ' ')}</p>
                          <p className="text-xs text-muted-foreground">{update.location} • {new Date(update.date).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Return Info */}
            {order.returnRequest && (
              <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                <h2 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2">
                  <RotateCcw size={18} className="text-destructive" /> Return Status
                </h2>
                <p className="text-sm text-muted-foreground mb-4">Reason: {order.returnRequest.reason}</p>
                <OrderTimeline
                  timeline={order.returnRequest.timeline}
                  currentStatus={order.returnRequest.status}
                  type="return"
                />
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Refund Amount</p>
                  <p className="font-semibold text-lg">${order.returnRequest.refundAmount.toFixed(2)}</p>
                </div>
              </div>
            )}

            {/* Items */}
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <h2 className="text-base md:text-lg font-semibold mb-4">Order Items</h2>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="font-semibold text-sm mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <h3 className="font-semibold text-sm mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-success">FREE</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t border-border">
                  <span>Total</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <h3 className="font-semibold text-sm mb-3">Delivery Address</h3>
              <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>
            </div>

            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <h3 className="font-semibold text-sm mb-3">Payment</h3>
              <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2">Cancel Order?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to cancel this order? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowCancelConfirm(false)}>
                Keep Order
              </Button>
              <Button variant="destructive" className="flex-1" onClick={handleCancel}>
                Yes, Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default OrderDetail;
