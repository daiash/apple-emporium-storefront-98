
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/types/product';

interface ProductSpecificationsProps {
  product: Product;
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({ product }) => {
  const specEntries = Object.entries(product.specifications);
  
  if (specEntries.length === 0) {
    return null;
  }

  return (
    <Card className="mt-12">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-6">Технические характеристики</h2>
        <div className="space-y-4">
          {specEntries.map(([key, value], index) => (
            <div key={key}>
              <div className="flex justify-between items-center py-3">
                <span className="font-medium text-gray-700 flex-shrink-0">{key}</span>
                <span className="text-gray-900 text-right ml-4">{value}</span>
              </div>
              {index < specEntries.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSpecifications;
