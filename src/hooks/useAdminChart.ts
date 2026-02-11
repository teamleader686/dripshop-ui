import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useSalesChart = (period: 'daily' | 'monthly') => {
  return useQuery({
    queryKey: ['admin-sales-chart', period],
    queryFn: async () => {
      const { data: orders, error } = await supabase
        .from('orders')
        .select('placed_at, total_amount, status')
        .neq('status', 'cancelled')
        .order('placed_at', { ascending: true });

      if (error) throw error;

      const grouped: Record<string, number> = {};
      (orders || []).forEach(order => {
        const date = new Date(order.placed_at);
        const key = period === 'daily'
          ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          : date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
        grouped[key] = (grouped[key] || 0) + Number(order.total_amount);
      });

      return Object.entries(grouped).map(([name, sales]) => ({ name, sales: Math.round(sales) }));
    },
  });
};
