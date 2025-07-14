
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, X } from 'lucide-react';

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category') ? [searchParams.get('category')!] : []
  );
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'iphone', name: 'iPhone' },
    { id: 'ipad', name: 'iPad' },
    { id: 'mac', name: 'Mac' },
    { id: 'watch', name: 'Apple Watch' },
    { id: 'airpods', name: 'AirPods' },
    { id: 'accessories', name: 'Аксессуары' }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 || 
                             selectedCategories.includes(product.category);
      
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      const matchesFeatured = !searchParams.get('featured') || product.featured;

      return matchesSearch && matchesCategory && matchesPrice && matchesFeatured;
    });
  }, [searchTerm, selectedCategories, priceRange, searchParams]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 300000]);
    setSearchTerm('');
    setSearchParams({});
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Каталог товаров</h1>
          <p className="text-gray-600 text-lg">
            Найдите идеальные продукты Apple для ваших потребностей
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card className="sticky top-4">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Фильтры
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-sm"
                >
                  Очистить
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Поиск</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Найти товар..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Категории</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.id}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={(checked) => 
                            handleCategoryChange(category.id, checked as boolean)
                          }
                        />
                        <label
                          htmlFor={category.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Цена: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])} ₽
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={300000}
                    min={0}
                    step={5000}
                    className="w-full"
                  />
                </div>

                {/* Active Filters */}
                {(selectedCategories.length > 0 || searchTerm) && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Активные фильтры</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategories.map((categoryId) => {
                        const category = categories.find(c => c.id === categoryId);
                        return (
                          <Badge key={categoryId} variant="secondary" className="flex items-center">
                            {category?.name}
                            <X
                              className="w-3 h-3 ml-1 cursor-pointer"
                              onClick={() => handleCategoryChange(categoryId, false)}
                            />
                          </Badge>
                        );
                      })}
                      {searchTerm && (
                        <Badge variant="secondary" className="flex items-center">
                          "{searchTerm}"
                          <X
                            className="w-3 h-3 ml-1 cursor-pointer"
                            onClick={() => setSearchTerm('')}
                          />
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-600">
                  Найдено {filteredProducts.length} товар(ов)
                </p>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="animate-fade-in">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Товары не найдены</h3>
                <p className="text-gray-600 mb-4">
                  Попробуйте изменить параметры фильтрации
                </p>
                <Button onClick={clearFilters}>
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
