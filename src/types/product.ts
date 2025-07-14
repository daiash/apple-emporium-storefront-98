
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'iPhone' | 'iPad' | 'MacBook Pro' | 'Apple Watch' | 'AirPods' | 'Accessories';
  subtype?: string;
  images: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  featured?: boolean;
  colors?: string[];
  storage?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, options?: { color?: string; storage?: string }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}
