
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductsData } from '@/hooks/useProductsData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, ShoppingBag, Star, Shield, Truck, CreditCard, Loader2 } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { data: products = [], isLoading, error } = useProductsData();

  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('kk-KZ').format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 -ml-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.images[selectedImage] || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-black' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category.toUpperCase()}
              </Badge>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-gray-600">(4.8)</span>
                </div>
                
                <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'В наличии' : 'Нет в наличии'}
                </span>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="bg-gray-100 rounded-2xl p-6">
              <div className="flex items-baseline space-x-4">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)} ₸
                </span>
              </div>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Цвет:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      onClick={() => setSelectedColor(color)}
                      className="justify-start"
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Storage Selection */}
            {product.storage && product.storage.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Объем памяти:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.storage.map((storage) => (
                    <Button
                      key={storage}
                      variant={selectedStorage === storage ? "default" : "outline"}
                      onClick={() => setSelectedStorage(storage)}
                      className="justify-start"
                    >
                      {storage}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              size="lg"
              className="w-full bg-black hover:bg-gray-800 text-white py-4 text-lg font-semibold"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Добавить в корзину
            </Button>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center p-4 bg-white rounded-xl">
                <Truck className="w-8 h-8 text-black mx-auto mb-2" />
                <p className="text-sm font-medium">Быстрая доставка</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl">
                <Shield className="w-8 h-8 text-black mx-auto mb-2" />
                <p className="text-sm font-medium">Гарантия Apple</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl">
                <CreditCard className="w-8 h-8 text-black mx-auto mb-2" />
                <p className="text-sm font-medium">Рассрочка 0%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <Card className="mt-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Технические характеристики</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specifications).map(([key, value], index) => (
                <div key={key}>
                  <div className="flex justify-between py-3">
                    <span className="font-medium text-gray-700">{key}</span>
                    <span className="text-gray-900 text-right flex-1 ml-4">{value}</span>
                  </div>
                  {index < Object.entries(product.specifications).length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
