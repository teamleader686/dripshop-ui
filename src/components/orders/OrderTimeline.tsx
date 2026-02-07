import { OrderStatus, ReturnStatus } from '@/types/orders';
import { Check, Package, Truck, MapPin, Home, X, RotateCcw, CreditCard, Clock } from 'lucide-react';

const orderSteps: { status: OrderStatus; label: string; icon: React.ElementType }[] = [
  { status: 'placed', label: 'Order Placed', icon: Package },
  { status: 'processing', label: 'Processing', icon: Clock },
  { status: 'packed', label: 'Packed', icon: Package },
  { status: 'shipped', label: 'Shipped', icon: Truck },
  { status: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin },
  { status: 'delivered', label: 'Delivered', icon: Home },
];

const returnSteps: { status: ReturnStatus; label: string; icon: React.ElementType }[] = [
  { status: 'requested', label: 'Return Requested', icon: RotateCcw },
  { status: 'approved', label: 'Approved', icon: Check },
  { status: 'pickup_scheduled', label: 'Pickup Scheduled', icon: Truck },
  { status: 'returned', label: 'Returned', icon: Package },
  { status: 'refund_processed', label: 'Refund Processed', icon: CreditCard },
];

interface OrderTimelineProps {
  timeline: { status: string; date: string }[];
  currentStatus: string;
  type?: 'order' | 'return';
  isCancelled?: boolean;
}

const OrderTimeline = ({ timeline, currentStatus, type = 'order', isCancelled = false }: OrderTimelineProps) => {
  const steps = type === 'order' ? orderSteps : returnSteps;
  const completedStatuses = timeline.map(t => t.status);

  const getDate = (status: string) => {
    const entry = timeline.find(t => t.status === status);
    if (!entry) return null;
    return new Date(entry.date).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  if (isCancelled) {
    return (
      <div className="flex items-center gap-3 p-4 bg-destructive/10 rounded-xl border border-destructive/20">
        <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
          <X size={20} className="text-destructive" />
        </div>
        <div>
          <p className="font-medium text-destructive">Order Cancelled</p>
          <p className="text-xs text-muted-foreground">{getDate('cancelled')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {steps.map((step, index) => {
        const isCompleted = completedStatuses.includes(step.status);
        const isCurrent = step.status === currentStatus;
        const isLast = index === steps.length - 1;
        const Icon = step.icon;

        return (
          <div key={step.status} className="flex gap-3">
            {/* Line + dot */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                isCompleted
                  ? 'bg-success text-success-foreground'
                  : isCurrent
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
              }`}>
                {isCompleted ? <Check size={14} /> : <Icon size={14} />}
              </div>
              {!isLast && (
                <div className={`w-0.5 h-8 ${isCompleted ? 'bg-success' : 'bg-border'}`} />
              )}
            </div>

            {/* Label */}
            <div className={`pb-6 ${!isLast ? '' : ''}`}>
              <p className={`text-sm font-medium ${
                isCompleted ? 'text-foreground' : isCurrent ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {step.label}
              </p>
              {getDate(step.status) && (
                <p className="text-xs text-muted-foreground">{getDate(step.status)}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;
