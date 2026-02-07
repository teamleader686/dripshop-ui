import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { useOrders } from '@/context/OrderContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const returnReasons = [
  'Product does not match description',
  'Defective or damaged product',
  'Wrong item received',
  'Size does not fit',
  'Quality not as expected',
  'Changed my mind',
  'Other',
];

const ReturnRequestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrderById, requestReturn } = useOrders();
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  const order = getOrderById(id || '');

  if (!order || order.status !== 'delivered' || order.returnRequest) {
    return (
      <AppLayout>
        <div className="container-main py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Return not available</h1>
          <p className="text-muted-foreground mb-4">This order is not eligible for return.</p>
          <Button asChild><Link to="/orders">Back to Orders</Link></Button>
        </div>
      </AppLayout>
    );
  }

  const handleSubmit = () => {
    const reason = selectedReason === 'Other' ? otherReason : selectedReason;
    if (!reason.trim()) {
      toast.error('Please select a reason for return');
      return;
    }
    requestReturn(order.id, reason);
    toast.success('Return request submitted!');
    navigate(`/orders/${order.id}`);
  };

  return (
    <AppLayout>
      <div className="container-main py-4 md:py-8 max-w-2xl">
        <Link to={`/orders/${order.id}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft size={16} className="mr-2" />
          Back to Order
        </Link>

        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <RotateCcw size={24} className="text-primary" />
            Request Return
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Order: {order.id}</p>
        </div>

        {/* Items being returned */}
        <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-4">
          <h2 className="text-sm font-semibold mb-3">Items to Return</h2>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex gap-3">
                <img src={item.product.image} alt={item.product.name} className="w-14 h-18 object-cover rounded-lg" />
                <div>
                  <p className="font-medium text-sm">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  <p className="text-sm font-medium mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reason Selection */}
        <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-4">
          <h2 className="text-sm font-semibold mb-3">Reason for Return</h2>
          <div className="space-y-2">
            {returnReasons.map(reason => (
              <label
                key={reason}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedReason === reason
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:bg-muted/50'
                }`}
              >
                <input
                  type="radio"
                  name="reason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={() => setSelectedReason(reason)}
                  className="accent-primary"
                />
                <span className="text-sm">{reason}</span>
              </label>
            ))}
          </div>
          {selectedReason === 'Other' && (
            <textarea
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              placeholder="Please describe the reason..."
              className="w-full mt-3 p-3 rounded-lg border border-border bg-background text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          )}
        </div>

        {/* Refund Info */}
        <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-6">
          <h2 className="text-sm font-semibold mb-2">Refund Amount</h2>
          <p className="text-2xl font-bold text-primary">${order.totalAmount.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Refund will be processed after the item is returned and inspected.
          </p>
        </div>

        <Button onClick={handleSubmit} size="lg" className="w-full btn-primary" disabled={!selectedReason}>
          Submit Return Request
        </Button>
      </div>
    </AppLayout>
  );
};

export default ReturnRequestPage;
