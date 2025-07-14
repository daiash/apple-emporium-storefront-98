
import React from 'react';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { useProductsData } from '@/hooks/useProductsData';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, CreditCard, Headphones, Loader2 } from 'lucide-react';

const Index = () => {
  const { data: products = [], isLoading, error } = useProductsData();
  
  const featuredProducts = products.filter(product => product.featured).slice(0, 3);
  const allCategories = [...new Set(products.map(p => p.category))];

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Ошибка загрузки</h1>
          <p className="text-gray-600">Не удалось загрузить данные о товарах</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero />

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Популярные товары</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Самые востребованные продукты Apple с лучшими характеристиками
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProducts.map((product) => (
                <div key={product.id} className="animate-fade-in">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Button asChild size="lg" className="bg-black hover:bg-gray-800 text-white">
              <Link to="/catalog">
                Смотреть все товары
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Категории товаров</h2>
            <p className="text-gray-600 text-lg">Найдите именно то, что вам нужно</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {allCategories.map((category) => {
                const categoryNames: Record<string, string> = {
                  'iPhone': 'iPhone',
                  'iPad': 'iPad', 
                  'MacBook Pro': 'MacBook Pro',
                  'Apple Watch': 'Apple Watch',
                  'AirPods': 'AirPods',
                  'Accessories': 'Аксессуары'
                };

                return (
                  <Link
                    key={category}
                    to={`/catalog?category=${encodeURIComponent(category)}`}
                    className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 text-center hover:-translate-y-1"
                  >
                    <div className="text-2xl mb-3">
                      {category === 'iPhone' && '📱'}
                      {(category === 'iPad' || category.includes('iPad')) && '📟'}
                      {(category === 'MacBook Pro' || category.includes('Mac')) && '💻'}
                      {(category === 'Apple Watch' || category.includes('Watch')) && '⌚'}
                      {(category === 'AirPods' || category.includes('AirPods')) && '🎧'}
                      {category === 'Accessories' && '🔌'}
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-black transition-colors">
                      {categoryNames[category] || category}
                    </h3>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Truck className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">Доставим заказ в течение 1-2 дней по всему Казахстану</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Гарантия качества</h3>
              <p className="text-gray-600">Официальная гарантия Apple на все товары</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <CreditCard className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Удобная оплата</h3>
              <p className="text-gray-600">Принимаем все виды карт и электронные кошельки</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Headphones className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Поддержка 24/7</h3>
              <p className="text-gray-600">Круглосуточная помощь по любым вопросам</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
