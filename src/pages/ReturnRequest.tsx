import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { useOrder, useRequestReturn } from '@/hooks/useOrders';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

const returnReasons = [
  'Product does not match description', 'Defective or damaged product', 'Wrong item received',
  'Size does not fit', 'Quality not as expected', 'Changed my mind', 'Other',
];

const ReturnRequestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoading } = useOrder(id);
  const requestReturn = useRequestReturn();
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  if (isLoading) return <AppLayout><div className="container-main py-8"><Skeleton className="h-64 rounded-xl" /></div></AppLayout>;

  if (!order || order.status !== 'delivered' || (order.returns && order.returns.length > 0)) {
    return <AppLayout><div className="container-main py-16 text-center"><h1 className="text-2xl font-bold mb-4">Return not available</h1><p className="text-muted-foreground mb-4">This order is not eligible for return.</p><Button asChild><Link to="/orders">Back to Orders</Link></Button></div></AppLayout>;
  }

  const handleSubmit = async () => {
    const reason = selectedReason === 'Other' ? otherReason : selectedReason;
    if (!reason.trim()) { toast.error('Please select a reason for return'); return; }
    try {
      await requestReturn.mutateAsync({ orderId: order.id, reason, refundAmount: Number(order.total_amount) });
      toast.success('Return request submitted!');
      navigate(`/orders/${order.id}`);
    } catch { toast.error('Failed to submit return request'); }
  };

  return (
    <AppLayout>
      <div className="container-main py-4 md:py-8 max-w-2xl">
        <Link to={`/orders/${order.id}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"><ArrowLeft size={16} className="mr-2" />Back to Order</Link>
        <div className="mb-6"><h1 className="text-xl md:text-2xl font-bold flex items-center gap-2"><RotateCcw size={24} className="text-primary" />Request Return</h1><p className="text-sm text-muted-foreground mt-1">Order: {order.order_number}</p></div>

        <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-4">
          <h2 className="text-sm font-semibold mb-3">Items to Return</h2>
          <div className="space-y-3">
            {(order.order_items || []).map((item) => (
              <div key={item.id} className="flex gap-3">
                <img src={item.product_image || '/placeholder.svg'} alt={item.product_name} className="w-14 h-18 object-cover rounded-lg" />
                <div><p className="font-medium text-sm">{item.product_name}</p><p className="text-xs text-muted-foreground">Qty: {item.quantity}</p><p className="text-sm font-medium mt-1">${(Number(item.price) * item.quantity).toFixed(2)}</p></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-4">
          <h2 className="text-sm font-semibold mb-3">Reason for Return</h2>
          <div className="space-y-2">
            {returnReasons.map(reason => (
              <label key={reason} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${selectedReason === reason ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`}>
                <input type="radio" name="reason" value={reason} checked={selectedReason === reason} onChange={() => setSelectedReason(reason)} className="accent-primary" />
                <span className="text-sm">{reason}</span>
              </label>
            ))}
          </div>
          {selectedReason === 'Other' && (
            <textarea value={otherReason} onChange={(e) => setOtherReason(e.target.value)} placeholder="Please describe the reason..." className="w-full mt-3 p-3 rounded-lg border border-border bg-background text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-ring" />
          )}
        </div>

        <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-6">
          <h2 className="text-sm font-semibold mb-2">Refund Amount</h2>
          <p className="text-2xl font-bold text-primary">${Number(order.total_amount).toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">Refund will be processed after the item is returned and inspected.</p>
        </div>

        <Button onClick={handleSubmit} size="lg" className="w-full btn-primary" disabled={!selectedReason || requestReturn.isPending}>
          {requestReturn.isPending ? 'Submitting...' : 'Submit Return Request'}
        </Button>
      </div>
    </AppLayout>
  );
};

export default ReturnRequestPage;
