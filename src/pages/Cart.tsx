
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, CreditCard } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, clearCart, total, itemCount } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showCheckout, setShowCheckout] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('kk-KZ').format(price);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handlePayment = () => {
    // Здесь будет интеграция с реальной платежной системой
    alert(`Оплата на сумму ${formatPrice(total)} ₸ прошла успешно!`);
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4">Корзина пуста</h1>
          <p className="text-gray-600 mb-6">
            Добавьте товары в корзину, чтобы оформить заказ
          </p>
          <Button onClick={() => navigate('/catalog')} size="lg">
            Перейти к покупкам
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="-ml-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Продолжить покупки
          </Button>

          <Button
            variant="outline"
            onClick={clearCart}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Очистить корзину
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-2xl font-bold mb-6">
              Корзина ({itemCount} товар{itemCount > 1 ? 'а' : ''})
            </h1>

            {items.map((item) => (
              <Card key={`${item.product.id}-${item.selectedColor}-${item.selectedStorage}`} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="w-full md:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">{item.product.name}</h3>
                        <p className="text-gray-600 text-sm">{item.product.description}</p>
                        
                        {/* Options */}
                        <div className="flex gap-4 mt-2">
                          {item.selectedColor && (
                            <span className="text-sm text-gray-500">
                              Цвет: {item.selectedColor}
                            </span>
                          )}
                          {item.selectedStorage && (
                            <span className="text-sm text-gray-500">
                              Память: {item.selectedStorage}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="h-8 w-8"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          
                          <span className="font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <div className="font-bold text-lg">
                            {formatPrice(item.product.price * item.quantity)} ₸
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatPrice(item.product.price)} ₸ за шт.
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Итого к оплате</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Товары ({itemCount})</span>
                    <span>{formatPrice(total)} ₸</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Доставка</span>
                    <span className="text-green-600">Бесплатно</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Итого</span>
                  <span>{formatPrice(total)} ₸</span>
                </div>

                {!showCheckout ? (
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-black hover:bg-gray-800 text-white py-6 text-lg font-semibold"
                    size="lg"
                  >
                    Оформить заказ
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" type="tel" placeholder="+7 (777) 123-45-67" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Адрес доставки</Label>
                      <Input id="address" placeholder="Укажите адрес доставки" />
                    </div>

                    <div className="space-y-2">
                      <Label>Способ оплаты</Label>
                      <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="card">Банковская карта</SelectItem>
                          <SelectItem value="kaspi">Kaspi Pay</SelectItem>
                          <SelectItem value="halyk">Halyk Pay</SelectItem>
                          <SelectItem value="cash">Наличные при получении</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      onClick={handlePayment}
                      className="w-full bg-black hover:bg-gray-800 text-white py-6 text-lg font-semibold"
                      size="lg"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Оплатить {formatPrice(total)} ₸
                    </Button>
                  </div>
                )}

                <div className="text-center text-sm text-gray-500">
                  Безопасная оплата с помощью SSL-шифрования
                </div>

                {/* Benefits */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Быстрая доставка по Казахстану</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Официальная гарантия Apple</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Возврат в течение 14 дней</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
