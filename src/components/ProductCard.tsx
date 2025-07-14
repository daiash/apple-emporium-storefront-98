
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('kk-KZ').format(price);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
        <CardContent className="p-0">
          {/* Image */}
          <div className="relative overflow-hidden bg-gray-50">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.featured && (
              <Badge className="absolute top-3 left-3 bg-black text-white">
                <Star className="w-3 h-3 mr-1" />
                Популярное
              </Badge>
            )}
            {product.originalPrice && (
              <Badge variant="destructive" className="absolute top-3 right-3">
                Скидка
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-2">
              <Badge variant="secondary" className="text-xs">
                {product.category.toUpperCase()}
              </Badge>
            </div>
            
            <h3 className="font-semibold text-lg mb-2 group-hover:text-black transition-colors">
              {product.name}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(product.price)} ₸
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    {formatPrice(product.originalPrice)} ₸
                  </span>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center justify-between">
              <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'В наличии' : 'Нет в наличии'}
              </span>
              
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                size="sm"
                className="bg-black hover:bg-gray-800 text-white"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                В корзину
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
