
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductSpecificationsProps {
  category: Product['category'];
  specifications: Record<string, string>;
  onSpecificationsChange: (specifications: Record<string, string>) => void;
}

const getSpecificationFields = (category: Product['category']): string[] => {
  switch (category) {
    case 'iPhone':
      return [
        'Экран',
        'Процессор',
        'Камера',
        'Батарея',
        'Операционная система',
        'Материал корпуса',
        'Водозащита',
        'Беспроводная зарядка'
      ];
    case 'iPad':
      return [
        'Экран',
        'Процессор',
        'Камера',
        'Батарея',
        'Операционная система',
        'Поддержка Apple Pencil',
        'Клавиатура',
        'Связь'
      ];
    case 'Mac':
      return [
        'Процессор',
        'Память',
        'Накопитель',
        'Экран',
        'Графика',
        'Порты',
        'Операционная система',
        'Время работы от батареи'
      ];
    case 'Apple Watch':
      return [
        'Экран',
        'Процессор',
        'Датчики',
        'Водозащита',
        'Батарея',
        'Связь',
        'Операционная система',
        'Материал корпуса'
      ];
    case 'AirPods':
      return [
        'Процессор',
        'Время работы',
        'Зарядный кейс',
        'Подключение',
        'Шумоподавление',
        'Водозащита',
        'Совместимость'
      ];
    case 'Accessories':
      return [
        'Совместимость',
        'Материал',
        'Размеры',
        'Вес',
        'Особенности'
      ];
    default:
      return [];
  }
};

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({
  category,
  specifications,
  onSpecificationsChange
}) => {
  const suggestedFields = getSpecificationFields(category);
  
  const updateSpecification = (key: string, value: string) => {
    if (value.trim()) {
      onSpecificationsChange({
        ...specifications,
        [key]: value
      });
    } else {
      const newSpecs = { ...specifications };
      delete newSpecs[key];
      onSpecificationsChange(newSpecs);
    }
  };

  const addCustomField = () => {
    const key = `Характеристика ${Object.keys(specifications).length + 1}`;
    onSpecificationsChange({
      ...specifications,
      [key]: ''
    });
  };

  const removeSpecification = (keyToRemove: string) => {
    const newSpecs = { ...specifications };
    delete newSpecs[keyToRemove];
    onSpecificationsChange(newSpecs);
  };

  const allFields = [
    ...suggestedFields,
    ...Object.keys(specifications).filter(key => !suggestedFields.includes(key))
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base">Характеристики</Label>
        <Button
          type="button"
          onClick={addCustomField}
          size="sm"
          variant="outline"
        >
          <Plus className="w-4 h-4 mr-1" />
          Добавить
        </Button>
      </div>

      <div className="space-y-3">
        {allFields.map((field) => (
          <div key={field} className="flex gap-2 items-start">
            <div className="flex-1 space-y-1">
              <Label className="text-sm font-medium">{field}</Label>
              <Input
                value={specifications[field] || ''}
                onChange={(e) => updateSpecification(field, e.target.value)}
                placeholder={`Введите ${field.toLowerCase()}`}
              />
            </div>
            {!suggestedFields.includes(field) && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="mt-6"
                onClick={() => removeSpecification(field)}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSpecifications;
