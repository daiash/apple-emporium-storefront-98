
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

interface ProductStorageSelectorProps {
  storage: string[];
  onStorageChange: (storage: string[]) => void;
}

const ProductStorageSelector: React.FC<ProductStorageSelectorProps> = ({
  storage,
  onStorageChange
}) => {
  const [newStorage, setNewStorage] = React.useState('');

  const addStorage = () => {
    if (newStorage.trim() && !storage.includes(newStorage.trim())) {
      onStorageChange([...storage, newStorage.trim()]);
      setNewStorage('');
    }
  };

  const removeStorage = (storageToRemove: string) => {
    onStorageChange(storage.filter(item => item !== storageToRemove));
  };

  return (
    <div className="space-y-3">
      <Label>Объем памяти</Label>
      
      {/* Add new storage */}
      <div className="flex gap-2">
        <Input
          value={newStorage}
          onChange={(e) => setNewStorage(e.target.value)}
          placeholder="Добавить объем (например, 128GB)"
          onKeyDown={(e) => e.key === 'Enter' && addStorage()}
        />
        <Button type="button" onClick={addStorage} size="icon" variant="outline">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Display current storage options */}
      {storage.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {storage.map((item) => (
            <Badge key={item} variant="secondary" className="flex items-center gap-1">
              {item}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeStorage(item)}
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

export default ProductStorageSelector;
