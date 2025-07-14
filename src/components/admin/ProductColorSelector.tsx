
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

interface ProductColorSelectorProps {
  colors: string[];
  onColorsChange: (colors: string[]) => void;
}

const ProductColorSelector: React.FC<ProductColorSelectorProps> = ({
  colors,
  onColorsChange
}) => {
  const [newColor, setNewColor] = React.useState('');

  const addColor = () => {
    if (newColor.trim() && !colors.includes(newColor.trim())) {
      onColorsChange([...colors, newColor.trim()]);
      setNewColor('');
    }
  };

  const removeColor = (colorToRemove: string) => {
    onColorsChange(colors.filter(color => color !== colorToRemove));
  };

  return (
    <div className="space-y-3">
      <Label>Цвет</Label>
      
      {/* Add new color */}
      <div className="flex gap-2">
        <Input
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          placeholder="Добавить цвет"
          onKeyDown={(e) => e.key === 'Enter' && addColor()}
        />
        <Button type="button" onClick={addColor} size="icon" variant="outline">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Display current colors */}
      {colors.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <Badge key={color} variant="secondary" className="flex items-center gap-1">
              {color}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeColor(color)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductColorSelector;
