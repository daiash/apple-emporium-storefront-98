
import React from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';

interface ProductOptionsProps {
  product: Product;
  selectedColor: string;
  selectedStorage: string;
  onColorChange: (color: string) => void;
  onStorageChange: (storage: string) => void;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  product,
  selectedColor,
  selectedStorage,
  onColorChange,
  onStorageChange
}) => {
  return (
    <div className="space-y-6">
      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <h3 className="font-semibold text-lg mb-3">Цвет:</h3>
          <div className="grid grid-cols-2 gap-3">
            {product.colors.map((color) => (
              <Button
                key={color}
                variant={selectedColor === color ? "default" : "outline"}
                onClick={() => onColorChange(color)}
                className="justify-start h-12 text-left"
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
          <h3 className="font-semibold text-lg mb-3">Объем памяти:</h3>
          <div className="grid grid-cols-2 gap-3">
            {product.storage.map((storage) => (
              <Button
                key={storage}
                variant={selectedStorage === storage ? "default" : "outline"}
                onClick={() => onStorageChange(storage)}
                className="justify-start h-12 text-left"
              >
                {storage}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductOptions;
