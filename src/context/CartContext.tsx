
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, CartContextType, Product } from '@/types/product';

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; options?: { color?: string; storage?: string } } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, options } = action.payload;
      const existingItem = state.find(
        item => 
          item.product.id === product.id &&
          item.selectedColor === options?.color &&
          item.selectedStorage === options?.storage
      );

      if (existingItem) {
        return state.map(item =>
          item.product.id === product.id &&
          item.selectedColor === options?.color &&
          item.selectedStorage === options?.storage
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...state, {
        product,
        quantity: 1,
        selectedColor: options?.color,
        selectedStorage: options?.storage
      }];
    }
    
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.product.id !== action.payload);
    
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.product.id === action.payload.productId
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
    
    case 'CLEAR_CART':
      return [];
    
    case 'LOAD_CART':
      return action.payload;
    
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const savedCart = localStorage.getItem('apple-store-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('apple-store-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, options?: { color?: string; storage?: string }) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, options } });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
