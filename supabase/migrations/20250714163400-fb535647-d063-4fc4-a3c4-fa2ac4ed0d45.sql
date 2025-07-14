
-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  subtype TEXT,
  images TEXT[] DEFAULT '{}',
  in_stock BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a store, products should be publicly readable)
CREATE POLICY "Anyone can view products" 
  ON public.products 
  FOR SELECT 
  USING (true);

-- Admin policies (you might want to restrict these later with proper auth)
CREATE POLICY "Anyone can insert products" 
  ON public.products 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can update products" 
  ON public.products 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Anyone can delete products" 
  ON public.products 
  FOR DELETE 
  USING (true);

-- Insert some sample data from existing products
INSERT INTO public.products (name, description, price, category, subtype, images, in_stock, featured) VALUES
('iPhone 15 Pro', 'Самый продвинутый iPhone с титановым корпусом и чипом A17 Pro', 129990, 'iPhone', 'Pro', ARRAY['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500', 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500'], true, true),
('MacBook Pro 14"', 'Профессиональный ноутбук с чипом M3 Pro для максимальной производительности', 219990, 'MacBook Pro', '14-inch', ARRAY['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'], true, true),
('iPad Pro 12.9"', 'Самый мощный iPad с чипом M2 и дисплеем Liquid Retina XDR', 139990, 'iPad Pro', '12.9-inch', ARRAY['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500', 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500'], true, true),
('Apple Watch Series 9', 'Самые продвинутые умные часы с чипом S9 и новым ярким дисплеем', 44990, 'Apple Watch', 'Series 9', ARRAY['https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500'], true, false),
('AirPods Pro (2-го поколения)', 'Беспроводные наушники с активным шумоподавлением и адаптивной прозрачностью', 29990, 'AirPods', '2-го поколения', ARRAY['https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500', 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500'], true, false),
('iPhone 15', 'Новый iPhone 15 с Dynamic Island и камерой 48 Мп', 89990, 'iPhone', 'Standard', ARRAY['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500'], true, false);
