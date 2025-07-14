
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductsData } from '@/hooks/useProductsData';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Loader2 } from 'lucide-react';
import ProductDetailHeader from '@/components/ProductDetailHeader';
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductPricing from '@/components/ProductPricing';
import ProductOptions from '@/components/ProductOptions';
import ProductFeatures from '@/components/ProductFeatures';
import ProductSpecifications from '@/components/ProductSpecifications';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { data: products = [], isLoading, error } = useProductsData();

  const product = products.find(p => p.id === id);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Ошибка загрузки</h1>
          <p className="text-gray-600">Не удалось загрузить информацию о товаре</p>
          <Button onClick={() => navigate('/catalog')} className="mt-4">
            Вернуться к каталогу
          </Button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
          <Button onClick={() => navigate('/catalog')}>
            Вернуться к каталогу
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, {
      color: selectedColor || undefined,
      storage: selectedStorage || undefined
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <ProductDetailHeader product={product} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div>
            <ProductImageGallery 
              images={product.images} 
              productName={product.name} 
            />
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Product Description */}
            <div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Pricing */}
            <ProductPricing product={product} />

            {/* Product Options */}
            <ProductOptions
              product={product}
              selectedColor={selectedColor}
              selectedStorage={selectedStorage}
              onColorChange={setSelectedColor}
              onStorageChange={setSelectedStorage}
            />

            {/* Add to Cart Button */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                size="lg"
                className="w-full bg-black hover:bg-gray-800 text-white py-4 text-lg font-semibold"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {product.inStock ? 'Добавить в корзину' : 'Товара нет в наличии'}
              </Button>

              <div className="text-center text-sm text-gray-600">
                <p>Нажимая "Добавить в корзину", вы соглашаетесь с условиями продажи</p>
              </div>
            </div>

            {/* Features */}
            <ProductFeatures />
          </div>
        </div>

        {/* Specifications */}
        <ProductSpecifications product={product} />
      </div>
    </div>
  );
};

export default ProductDetail;
