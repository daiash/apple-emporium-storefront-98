
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] bg-gradient-apple flex items-center justify-center text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Main Apple Products Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1920&h=1080&fit=crop"
          alt="Apple Products"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Badge */}
        <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-8 animate-fade-in">
          <Star className="w-4 h-4 mr-2 text-yellow-400" />
          <span className="text-sm font-medium">Новые поступления Apple</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Магазин Apple
          <br />
          <span className="gradient-text bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Официальные устройства
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in">
          Откройте для себя новейшие продукты Apple с непревзойденным качеством и инновационным дизайном
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-4 text-lg group"
          >
            <Link to="/catalog">
              Смотреть каталог
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
          >
            <Link to="/catalog?featured=true">
              Популярные товары
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">1000+</div>
            <div className="text-sm text-white/80">Довольных клиентов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">50+</div>
            <div className="text-sm text-white/80">Товаров в наличии</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">24/7</div>
            <div className="text-sm text-white/80">Поддержка</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
