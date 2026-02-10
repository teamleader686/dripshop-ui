import type { Tables } from '@/integrations/supabase/types';

export type DbProduct = Tables<'products'> & {
  categories?: Tables<'categories'> | null;
};

export type DbCategory = Tables<'categories'>;

export type DbOrder = Tables<'orders'> & {
  order_items?: DbOrderItem[];
  order_timeline?: Tables<'order_timeline'>[];
  shipping?: DbShipping | null;
  returns?: DbReturn[];
};

export type DbOrderItem = Tables<'order_items'>;

export type DbShipping = Tables<'shipping'> & {
  shipping_updates?: Tables<'shipping_updates'>[];
};

export type DbReturn = Tables<'returns'> & {
  return_timeline?: Tables<'return_timeline'>[];
};

// Helper to get first image or placeholder
export const getProductImage = (product: DbProduct): string => {
  return product.images?.[0] || '/placeholder.svg';
};

export const getDiscountPercent = (product: DbProduct): number => {
  if (!product.original_price) return 0;
  return Math.round((1 - product.price / product.original_price) * 100);
};
