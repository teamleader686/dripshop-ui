import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';
import type { DbOrder, DbProduct } from '@/types/database';

export const useAdminProducts = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(*)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as DbProduct[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('admin-products-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' },
        () => queryClient.invalidateQueries({ queryKey: ['admin-products'] })
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);

  return query;
};

export const useToggleProductActive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const { error } = await supabase.from('products').update({ is_active: !isActive }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProductStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, stock }: { id: string; stock: number }) => {
      const { error } = await supabase.from('products').update({ stock }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-products'] }),
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useAdminOrders = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items(*),
          order_timeline(*),
          shipping(*, shipping_updates(*)),
          returns(*, return_timeline(*))
        `)
        .order('placed_at', { ascending: false });
      if (error) throw error;
      return data as DbOrder[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('admin-orders-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' },
        () => queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'shipping' },
        () => queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'returns' },
        () => queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);

  return query;
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const { error } = await supabase.from('orders').update({ status: status as any }).eq('id', orderId);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-orders'] }),
  });
};

export const useAssignShipping = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, courier, trackingId }: { orderId: string; courier: string; trackingId: string }) => {
      // Create shipping record
      const { data: shipping, error: shippingError } = await supabase
        .from('shipping')
        .insert({
          order_id: orderId,
          courier,
          tracking_id: trackingId,
          estimated_delivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        })
        .select()
        .single();
      if (shippingError) throw shippingError;

      // Add initial shipping update
      await supabase.from('shipping_updates').insert({
        shipping_id: shipping.id,
        stage: 'picked_up',
        location: `${courier} Warehouse`,
      });

      // Update order status to shipped
      await supabase.from('orders').update({ status: 'shipped' }).eq('id', orderId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-orders'] }),
  });
};

export const useUpdateShippingStage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ shippingId, orderId, stage, location }: { shippingId: string; orderId: string; stage: string; location: string }) => {
      // Update shipping stage
      await supabase.from('shipping').update({ stage: stage as any }).eq('id', shippingId);

      // Add update record
      await supabase.from('shipping_updates').insert({
        shipping_id: shippingId,
        stage: stage as any,
        location,
      });

      // Update order status if needed
      if (stage === 'out_for_delivery') {
        await supabase.from('orders').update({ status: 'out_for_delivery' }).eq('id', orderId);
      } else if (stage === 'delivered') {
        await supabase.from('orders').update({ status: 'delivered' }).eq('id', orderId);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-orders'] }),
  });
};

export const useUpdateReturnStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ returnId, status }: { returnId: string; status: string }) => {
      const { error } = await supabase.from('returns').update({ status: status as any }).eq('id', returnId);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-orders'] }),
  });
};

// Dashboard stats
export const useAdminStats = () => {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [ordersRes, productsRes, returnsRes] = await Promise.all([
        supabase.from('orders').select('id, status, total_amount'),
        supabase.from('products').select('id', { count: 'exact' }),
        supabase.from('returns').select('id', { count: 'exact' }),
      ]);

      const orders = ordersRes.data || [];
      const totalSales = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + Number(o.total_amount), 0);
      const pendingShipments = orders.filter(o => ['placed', 'processing', 'packed'].includes(o.status)).length;
      const deliveredCount = orders.filter(o => o.status === 'delivered').length;

      return {
        totalSales,
        totalOrders: orders.length,
        totalProducts: productsRes.count || 0,
        pendingShipments,
        returnsRequested: returnsRes.count || 0,
        deliveredCount,
      };
    },
  });
};
