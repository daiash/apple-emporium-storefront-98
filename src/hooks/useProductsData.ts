
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/product';

export const useProductsData = () => {
  return useQuery({
    queryKey: ['products-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
      
      return data?.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        price: Number(item.price),
        category: item.category as any,
        subtype: item.subtype,
        images: item.images || [],
        specifications: {},
        inStock: item.in_stock,
        featured: item.featured,
        colors: [],
        storage: [],
        createdAt: item.created_at,
        updatedAt: item.updated_at
      })) as Product[] || [];
    }
  });
};
