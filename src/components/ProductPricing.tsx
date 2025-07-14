
import React from 'react';
import { Product } from '@/types/product';

interface ProductPricingProps {
  product: Product;
}

const ProductPricing: React.FC<ProductPricingProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-6 mb-6">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <span className="text-3xl font-bold text-gray-900">
            {formatPrice(product.price)} ₽
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-500 line-through ml-3">
              {formatPrice(product.originalPrice)} ₽
            </span>
          )}
        </div>
        {product.originalPrice && (
          <div className="text-right">
            <div className="text-green-600 font-semibold">
              Скидка {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </div>
            <div className="text-sm text-gray-600">
              Экономия {formatPrice(product.originalPrice - product.price)} ₽
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
          {product.inStock ? '✓ В наличии' : '✗ Нет в наличии'}
        </span>
        <span className="text-gray-600">Код товара: {product.id.slice(0, 8)}</span>
      </div>
    </div>
  );
};

export default ProductPricing;
