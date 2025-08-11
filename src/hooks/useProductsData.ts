
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
      
      return data?.map(item => {
        // Map old category names to new ones
        let mappedCategory = item.category;
        if (item.category === 'MacBook Pro') {
          mappedCategory = 'Mac';
        } else if (item.category === 'iPad Pro') {
          mappedCategory = 'iPad';
        }
        
        return {
          id: item.id,
          name: item.name,
          description: item.description || '',
          price: Number(item.price),
          category: mappedCategory as any,
          subtype: item.subtype,
          images: item.images || [],
          specifications: (item as any).specifications || {},
          inStock: item.in_stock,
          featured: item.featured,
          colors: (item as any).colors || [],
          storage: (item as any).storage || [],
          createdAt: item.created_at,
          updatedAt: item.updated_at
        };
      }) as Product[] || [];
    }
  });
};
