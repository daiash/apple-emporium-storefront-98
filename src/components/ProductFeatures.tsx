
import React from 'react';
import { Truck, Shield, CreditCard, Headphones } from 'lucide-react';

const ProductFeatures: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: 'Быстрая доставка',
      description: 'По Москве в течение дня'
    },
    {
      icon: Shield,
      title: 'Гарантия Apple',
      description: 'Официальная гарантия 1 год'
    },
    {
      icon: CreditCard,
      title: 'Рассрочка 0%',
      description: 'До 24 месяцев без переплат'
    },
    {
      icon: Headphones,
      title: 'Поддержка 24/7',
      description: 'Помощь в любое время'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {features.map((feature) => {
        const IconComponent = feature.icon;
        return (
          <div key={feature.title} className="text-center p-4 bg-white rounded-xl border">
            <IconComponent className="w-8 h-8 text-black mx-auto mb-2" />
            <p className="font-medium text-sm mb-1">{feature.title}</p>
            <p className="text-xs text-gray-600">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProductFeatures;
