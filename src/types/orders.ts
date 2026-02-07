import { Product } from '@/data/products';

export type OrderStatus = 'placed' | 'processing' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';
export type ReturnStatus = 'requested' | 'approved' | 'rejected' | 'pickup_scheduled' | 'returned' | 'refund_processed';
export type ShippingStage = 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered';

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface ShippingInfo {
  courier: string;
  trackingId: string;
  stage: ShippingStage;
  estimatedDelivery: string;
  updates: { stage: ShippingStage; date: string; location: string }[];
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  reason: string;
  status: ReturnStatus;
  requestedAt: string;
  items: OrderItem[];
  refundAmount: number;
  timeline: { status: ReturnStatus; date: string }[];
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  placedAt: string;
  shipping?: ShippingInfo;
  returnRequest?: ReturnRequest;
  timeline: { status: OrderStatus; date: string }[];
}

export interface AdminProduct extends Product {
  isActive: boolean;
  stock: number;
}
