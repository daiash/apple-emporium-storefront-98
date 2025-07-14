
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/types/product';

interface ProductDetailHeaderProps {
  product: Product;
}

const ProductDetailHeader: React.FC<ProductDetailHeaderProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 -ml-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Назад
      </Button>

      <div className="flex items-center gap-4 mb-4">
        <Badge variant="secondary" className="text-xs">
          {product.category.toUpperCase()}
        </Badge>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
          <span className="ml-2 text-sm text-gray-600">(4.8)</span>
          <span className="ml-2 text-sm text-blue-600">8 отзывов</span>
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
        {product.name}
      </h1>
    </div>
  );
};

export default ProductDetailHeader;
