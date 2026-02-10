import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import type { DbOrder } from '@/types/database';

export const useUserOrders = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['user-orders', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items(*),
          order_timeline(*),
          shipping(*, shipping_updates(*)),
          returns(*, return_timeline(*))
        `)
        .eq('user_id', user.id)
        .order('placed_at', { ascending: false });
      if (error) throw error;
      return data as DbOrder[];
    },
    enabled: !!user,
  });

  // Realtime subscription
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel('user-orders-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders', filter: `user_id=eq.${user.id}` },
        () => queryClient.invalidateQueries({ queryKey: ['user-orders'] })
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'shipping' },
        () => queryClient.invalidateQueries({ queryKey: ['user-orders'] })
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'returns', filter: `user_id=eq.${user.id}` },
        () => queryClient.invalidateQueries({ queryKey: ['user-orders'] })
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user, queryClient]);

  return query;
};

export const useOrder = (orderId: string | undefined) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      if (!orderId || !user) return null;
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items(*),
          order_timeline(*),
          shipping(*, shipping_updates(*)),
          returns(*, return_timeline(*))
        `)
        .eq('id', orderId)
        .maybeSingle();
      if (error) throw error;
      return data as DbOrder | null;
    },
    enabled: !!orderId && !!user,
  });
};

export const usePlaceOrder = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ items, address, paymentMethod }: {
      items: { productId: string; productName: string; productImage: string; price: number; quantity: number }[];
      address: string;
      paymentMethod: string;
    }) => {
      if (!user) throw new Error('Must be logged in');
      const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: totalAmount,
          shipping_address: address,
          payment_method: paymentMethod,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map(i => ({
        order_id: order.id,
        product_id: i.productId,
        product_name: i.productName,
        product_image: i.productImage,
        price: i.price,
        quantity: i.quantity,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw itemsError;

      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-orders'] });
    },
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId: string) => {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'cancelled' })
        .eq('id', orderId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-orders'] });
      queryClient.invalidateQueries({ queryKey: ['order'] });
    },
  });
};

export const useRequestReturn = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, reason, refundAmount }: { orderId: string; reason: string; refundAmount: number }) => {
      if (!user) throw new Error('Must be logged in');
      const { error } = await supabase.from('returns').insert({
        order_id: orderId,
        user_id: user.id,
        reason,
        refund_amount: refundAmount,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-orders'] });
      queryClient.invalidateQueries({ queryKey: ['order'] });
    },
  });
};
