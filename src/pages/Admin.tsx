import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/hooks/useProducts';
import { Plus, Edit, Trash2, Save, X, Package, BarChart3, Users, ShoppingBag, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import ProductColorSelector from '@/components/admin/ProductColorSelector';
import ProductStorageSelector from '@/components/admin/ProductStorageSelector';
import ProductSpecifications from '@/components/admin/ProductSpecifications';

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: 'iPhone',
    images: [],
    inStock: true,
    featured: false,
    subtype: '',
    colors: [],
    storage: [],
    specifications: {}
  });

  // Hooks
  const { data: products = [], isLoading, error } = useProducts();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'iPhone',
      images: [],
      inStock: true,
      featured: false,
      subtype: '',
      colors: [],
      storage: [],
      specifications: {}
    });
    setIsCreating(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.category || formData.price === undefined) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    try {
      if (isCreating) {
        await createProductMutation.mutateAsync(formData as Omit<Product, 'id' | 'createdAt' | 'updatedAt'>);
      } else if (editingProduct) {
        await updateProductMutation.mutateAsync({ 
          id: editingProduct.id, 
          ...formData 
        });
      }
      
      setEditingProduct(null);
      setIsCreating(false);
      setFormData({});
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setIsCreating(false);
    setFormData({});
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      await deleteProductMutation.mutateAsync(id);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData({
        ...formData,
        images: [...(formData.images || []), ...newImages]
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.images?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, images: newImages });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('kk-KZ').format(price);
  };

  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + p.price, 0),
    inStock: products.filter(p => p.inStock).length,
    featured: products.filter(p => p.featured).length
  };

  const tabs = [
    { id: 'dashboard', name: 'Дашборд', icon: BarChart3 },
    { id: 'products', name: 'Товары', icon: Package },
    { id: 'orders', name: 'Заказы', icon: ShoppingBag }
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-6">
          <CardContent>
            <p className="text-red-600">Ошибка загрузки данных: {error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Админ-панель</h1>
          <p className="text-gray-600">Управление магазином Apple Store</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Всего товаров</p>
                      <p className="text-2xl font-bold">{isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats.totalProducts}</p>
                    </div>
                    <Package className="w-8 h-8 text-black" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">В наличии</p>
                      <p className="text-2xl font-bold">{isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats.inStock}</p>
                    </div>
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Популярные</p>
                      <p className="text-2xl font-bold">{isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats.featured}</p>
                    </div>
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Общая стоимость</p>
                      <p className="text-2xl font-bold">{isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : `${formatPrice(stats.totalValue)} ₸`}</p>
                    </div>
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Быстрые действия</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button onClick={handleCreate} className="h-20 bg-black hover:bg-gray-800">
                    <div className="text-center">
                      <Plus className="w-6 h-6 mx-auto mb-2" />
                      <span>Добавить товар</span>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-20">
                    <div className="text-center">
                      <BarChart3 className="w-6 h-6 mx-auto mb-2" />
                      <span>Просмотр аналитики</span>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-20">
                    <div className="text-center">
                      <Users className="w-6 h-6 mx-auto mb-2" />
                      <span>Управление пользователями</span>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Products Management */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Управление товарами</h2>
              <Button onClick={handleCreate} className="bg-black hover:bg-gray-800">
                <Plus className="w-4 h-4 mr-2" />
                Добавить товар
              </Button>
            </div>

            {/* Product Form */}
            {(editingProduct || isCreating) && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {isCreating ? 'Создание товара' : 'Редактирование товара'}
                    </CardTitle>
                    <Button variant="ghost" onClick={handleCancel}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Название</Label>
                        <Input
                          id="name"
                          value={formData.name || ''}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Название товара"
                        />
                      </div>

                      <div>
                        <Label htmlFor="price">Цена (₸)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price || 0}
                          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <Label htmlFor="category">Категория</Label>
                        <Select 
                          value={formData.category || 'iPhone'} 
                          onValueChange={(value) => setFormData({ ...formData, category: value as any, specifications: {} })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="iPhone">iPhone</SelectItem>
                            <SelectItem value="iPad">iPad</SelectItem>
                            <SelectItem value="MacBook Pro">MacBook Pro</SelectItem>
                            <SelectItem value="Apple Watch">Apple Watch</SelectItem>
                            <SelectItem value="AirPods">AirPods</SelectItem>
                            <SelectItem value="Accessories">Аксессуары</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="subtype">Подтип</Label>
                        <Input
                          id="subtype"
                          value={formData.subtype || ''}
                          onChange={(e) => setFormData({ ...formData, subtype: e.target.value })}
                          placeholder="Подтип товара"
                        />
                      </div>
                    </div>

                    {/* Status and Options */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="inStock"
                          checked={formData.inStock || false}
                          onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked as boolean })}
                        />
                        <Label htmlFor="inStock">В наличии</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="featured"
                          checked={formData.featured || false}
                          onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                        />
                        <Label htmlFor="featured">Популярный товар</Label>
                      </div>

                      {/* Color Selector */}
                      <ProductColorSelector
                        colors={formData.colors || []}
                        onColorsChange={(colors) => setFormData({ ...formData, colors })}
                      />

                      {/* Storage Selector */}
                      <ProductStorageSelector
                        storage={formData.storage || []}
                        onStorageChange={(storage) => setFormData({ ...formData, storage })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Описание товара"
                      rows={3}
                    />
                  </div>

                  {/* Specifications */}
                  <ProductSpecifications
                    category={formData.category || 'iPhone'}
                    specifications={formData.specifications || {}}
                    onSpecificationsChange={(specifications) => setFormData({ ...formData, specifications })}
                  />

                  {/* Image Upload */}
                  <div className="space-y-4">
                    <Label>Изображения товара</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <div className="text-center">
                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <div className="flex justify-center">
                          <Button variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>
                            <Upload className="w-4 h-4 mr-2" />
                            Загрузить изображения
                          </Button>
                          <input
                            id="image-upload"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">PNG, JPG, JPEG до 10MB</p>
                      </div>
                    </div>
                    
                    {/* Image Preview */}
                    {formData.images && formData.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Изображение ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6"
                              onClick={() => removeImage(index)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <Button 
                      onClick={handleSave} 
                      className="bg-black hover:bg-gray-800"
                      disabled={createProductMutation.isPending || updateProductMutation.isPending}
                    >
                      {(createProductMutation.isPending || updateProductMutation.isPending) ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Сохранить
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Отмена
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Products List */}
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {products.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={product.images[0] || '/placeholder.svg'}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-gray-600 text-sm">{product.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="secondary">{product.category}</Badge>
                              {product.subtype && <Badge variant="outline">{product.subtype}</Badge>}
                              {product.featured && <Badge>Популярное</Badge>}
                              <Badge variant={product.inStock ? "default" : "destructive"}>
                                {product.inStock ? 'В наличии' : 'Нет в наличии'}
                              </Badge>
                              {product.colors && product.colors.length > 0 && (
                                <Badge variant="outline">{product.colors.length} цветов</Badge>
                              )}
                              {product.storage && product.storage.length > 0 && (
                                <Badge variant="outline">{product.storage.length} объемов</Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="font-bold text-lg">{formatPrice(product.price)} ₸</div>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEdit(product)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDelete(product.id)}
                              disabled={deleteProductMutation.isPending}
                            >
                              {deleteProductMutation.isPending ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Заказы</h2>
            <Card>
              <CardContent className="p-8 text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Заказы не найдены</h3>
                <p className="text-gray-600">
                  Когда клиенты начнут делать заказы, они появятся здесь
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
