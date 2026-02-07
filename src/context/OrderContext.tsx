import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Order, OrderStatus, ReturnRequest, ReturnStatus, ShippingInfo, ShippingStage, AdminProduct } from '@/types/orders';
import { mockOrders, mockAdminProducts } from '@/data/mockOrders';
import { Product } from '@/data/products';

interface OrderContextType {
  // Orders
  orders: Order[];
  getOrdersByCustomer: (customerId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;

  // Admin: Order management
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Admin: Shipping
  assignShipping: (orderId: string, courier: string, trackingId: string) => void;
  updateShippingStage: (orderId: string, stage: ShippingStage, location: string) => void;

  // Returns
  requestReturn: (orderId: string, reason: string) => void;
  updateReturnStatus: (returnId: string, status: ReturnStatus) => void;

  // Admin: Products
  adminProducts: AdminProduct[];
  toggleProductActive: (productId: string) => void;
  updateProductStock: (productId: string, stock: number) => void;
  addProduct: (product: AdminProduct) => void;
  deleteProduct: (productId: string) => void;

  // Place order from checkout
  placeOrder: (items: { product: Product; quantity: number }[], address: string, paymentMethod: string) => string;

  // Cancel
  cancelOrder: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [adminProducts, setAdminProducts] = useState<AdminProduct[]>(mockAdminProducts);

  const getOrdersByCustomer = useCallback((customerId: string) => {
    return orders.filter(o => o.customerId === customerId);
  }, [orders]);

  const getOrderById = useCallback((orderId: string) => {
    return orders.find(o => o.id === orderId);
  }, [orders]);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      const newTimeline = [...order.timeline, { status, date: new Date().toISOString() }];
      return { ...order, status, timeline: newTimeline };
    }));
  }, []);

  const assignShipping = useCallback((orderId: string, courier: string, trackingId: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      const shipping: ShippingInfo = {
        courier,
        trackingId,
        stage: 'picked_up',
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        updates: [{ stage: 'picked_up', date: new Date().toISOString(), location: `${courier} Warehouse` }],
      };
      const newTimeline = [...order.timeline, { status: 'shipped' as OrderStatus, date: new Date().toISOString() }];
      return { ...order, shipping, status: 'shipped', timeline: newTimeline };
    }));
  }, []);

  const updateShippingStage = useCallback((orderId: string, stage: ShippingStage, location: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId || !order.shipping) return order;
      const newUpdates = [...order.shipping.updates, { stage, date: new Date().toISOString(), location }];
      const newStatus: OrderStatus = stage === 'delivered' ? 'delivered' : stage === 'out_for_delivery' ? 'out_for_delivery' : order.status;
      const newTimeline = stage === 'out_for_delivery' || stage === 'delivered'
        ? [...order.timeline, { status: newStatus, date: new Date().toISOString() }]
        : order.timeline;
      return {
        ...order,
        status: newStatus,
        shipping: { ...order.shipping, stage, updates: newUpdates },
        timeline: newTimeline,
      };
    }));
  }, []);

  const requestReturn = useCallback((orderId: string, reason: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      const returnReq: ReturnRequest = {
        id: `RET-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        orderId,
        reason,
        status: 'requested',
        requestedAt: new Date().toISOString(),
        items: order.items,
        refundAmount: order.totalAmount,
        timeline: [{ status: 'requested', date: new Date().toISOString() }],
      };
      return { ...order, returnRequest: returnReq };
    }));
  }, []);

  const updateReturnStatus = useCallback((returnId: string, status: ReturnStatus) => {
    setOrders(prev => prev.map(order => {
      if (!order.returnRequest || order.returnRequest.id !== returnId) return order;
      const newTimeline = [...order.returnRequest.timeline, { status, date: new Date().toISOString() }];
      return {
        ...order,
        returnRequest: { ...order.returnRequest, status, timeline: newTimeline },
      };
    }));
  }, []);

  const toggleProductActive = useCallback((productId: string) => {
    setAdminProducts(prev => prev.map(p =>
      p.id === productId ? { ...p, isActive: !p.isActive } : p
    ));
  }, []);

  const updateProductStock = useCallback((productId: string, stock: number) => {
    setAdminProducts(prev => prev.map(p =>
      p.id === productId ? { ...p, stock } : p
    ));
  }, []);

  const addProduct = useCallback((product: AdminProduct) => {
    setAdminProducts(prev => [product, ...prev]);
  }, []);

  const deleteProduct = useCallback((productId: string) => {
    setAdminProducts(prev => prev.filter(p => p.id !== productId));
  }, []);

  const placeOrder = useCallback((items: { product: Product; quantity: number }[], address: string, paymentMethod: string) => {
    const orderId = `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const totalAmount = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const newOrder: Order = {
      id: orderId,
      customerId: 'user-1',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      items: items.map(i => ({ product: i.product, quantity: i.quantity, price: i.product.price })),
      status: 'placed',
      totalAmount,
      shippingAddress: address,
      paymentMethod,
      placedAt: new Date().toISOString(),
      timeline: [{ status: 'placed', date: new Date().toISOString() }],
    };
    setOrders(prev => [newOrder, ...prev]);
    return orderId;
  }, []);

  const cancelOrder = useCallback((orderId: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      const newTimeline = [...order.timeline, { status: 'cancelled' as OrderStatus, date: new Date().toISOString() }];
      return { ...order, status: 'cancelled', timeline: newTimeline };
    }));
  }, []);

  return (
    <OrderContext.Provider value={{
      orders, getOrdersByCustomer, getOrderById,
      updateOrderStatus, assignShipping, updateShippingStage,
      requestReturn, updateReturnStatus,
      adminProducts, toggleProductActive, updateProductStock, addProduct, deleteProduct,
      placeOrder, cancelOrder,
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within OrderProvider');
  return context;
};
