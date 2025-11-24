import { Product } from '@/types/product';

export const seedProducts: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // iPhone 16 models
  {
    name: 'iPhone 16',
    description: 'Новый iPhone 16 с Dynamic Island и камерой 48 Мп',
    price: 99990,
    category: 'iPhone',
    subtype: 'iPhone 16',
    images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500'],
    inStock: true,
    featured: true,
    colors: ['Черный', 'Белый', 'Розовый', 'Синий', 'Зеленый'],
    storage: ['128GB', '256GB', '512GB'],
    specifications: {
      'Дисплей': '6.1 дюйма Super Retina XDR',
      'Чип': 'A18',
      'Камера': '48 Мп основная'
    }
  },
  {
    name: 'iPhone 16 Plus',
    description: 'iPhone 16 Plus с увеличенным дисплеем',
    price: 119990,
    category: 'iPhone',
    subtype: 'iPhone 16 Plus',
    images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500'],
    inStock: true,
    featured: true,
    colors: ['Черный', 'Белый', 'Розовый', 'Синий', 'Зеленый'],
    storage: ['128GB', '256GB', '512GB'],
    specifications: {
      'Дисплей': '6.7 дюйма Super Retina XDR',
      'Чип': 'A18',
      'Камера': '48 Мп основная'
    }
  },
  {
    name: 'iPhone 16 Pro',
    description: 'iPhone 16 Pro с титановым корпусом и чипом A18 Pro',
    price: 139990,
    category: 'iPhone',
    subtype: 'iPhone 16 Pro',
    images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500'],
    inStock: true,
    featured: true,
    colors: ['Титановый черный', 'Титановый белый', 'Титановый серый', 'Титановый синий'],
    storage: ['256GB', '512GB', '1TB'],
    specifications: {
      'Дисплей': '6.3 дюйма Super Retina XDR ProMotion',
      'Чип': 'A18 Pro',
      'Камера': '48 Мп тройная система камер'
    }
  },
  {
    name: 'iPhone 16 Pro Max',
    description: 'Максимальный iPhone 16 Pro Max',
    price: 159990,
    category: 'iPhone',
    subtype: 'iPhone 16 Pro Max',
    images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500'],
    inStock: true,
    featured: true,
    colors: ['Титановый черный', 'Титановый белый', 'Титановый серый', 'Титановый синий'],
    storage: ['256GB', '512GB', '1TB'],
    specifications: {
      'Дисплей': '6.9 дюйма Super Retina XDR ProMotion',
      'Чип': 'A18 Pro',
      'Камера': '48 Мп тройная система камер с 5x zoom'
    }
  },
  
  // Mac products
  {
    name: 'MacBook Air 13" M3',
    description: 'Легкий и мощный MacBook Air с чипом M3',
    price: 129990,
    category: 'Mac',
    subtype: 'MacBook Air',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'],
    inStock: true,
    featured: true,
    specifications: {
      'Дисплей': '13.6 дюйма Liquid Retina',
      'Чип': 'Apple M3',
      'Память': '8GB',
      'Накопитель': '256GB SSD'
    }
  },
  {
    name: 'MacBook Air 15" M3',
    description: 'MacBook Air 15 дюймов с чипом M3',
    price: 149990,
    category: 'Mac',
    subtype: 'MacBook Air',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'],
    inStock: true,
    featured: false,
    specifications: {
      'Дисплей': '15.3 дюйма Liquid Retina',
      'Чип': 'Apple M3',
      'Память': '8GB',
      'Накопитель': '256GB SSD'
    }
  },
  {
    name: 'MacBook Pro 14" M3 Pro',
    description: 'Профессиональный MacBook Pro 14 с чипом M3 Pro',
    price: 219990,
    category: 'Mac',
    subtype: 'MacBook Pro',
    images: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500'],
    inStock: true,
    featured: true,
    specifications: {
      'Дисплей': '14.2 дюйма Liquid Retina XDR',
      'Чип': 'Apple M3 Pro',
      'Память': '18GB',
      'Накопитель': '512GB SSD'
    }
  },
  {
    name: 'MacBook Pro 16" M3 Max',
    description: 'Максимальная производительность MacBook Pro 16',
    price: 299990,
    category: 'Mac',
    subtype: 'MacBook Pro',
    images: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500'],
    inStock: true,
    featured: false,
    specifications: {
      'Дисплей': '16.2 дюйма Liquid Retina XDR',
      'Чип': 'Apple M3 Max',
      'Память': '36GB',
      'Накопитель': '1TB SSD'
    }
  },
  {
    name: 'iMac 24" M3',
    description: 'Яркий и стильный iMac с чипом M3',
    price: 169990,
    category: 'Mac',
    subtype: 'iMac',
    images: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500'],
    inStock: true,
    featured: false,
    specifications: {
      'Дисплей': '24 дюйма 4.5K Retina',
      'Чип': 'Apple M3',
      'Память': '8GB',
      'Накопитель': '256GB SSD'
    }
  },
  {
    name: 'Mac mini M2',
    description: 'Компактный Mac mini с чипом M2',
    price: 69990,
    category: 'Mac',
    subtype: 'Mac mini',
    images: ['https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=500'],
    inStock: true,
    featured: false,
    specifications: {
      'Чип': 'Apple M2',
      'Память': '8GB',
      'Накопитель': '256GB SSD'
    }
  },
  {
    name: 'Mac Studio M2 Max',
    description: 'Мощная рабочая станция Mac Studio',
    price: 249990,
    category: 'Mac',
    subtype: 'Mac Studio',
    images: ['https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=500'],
    inStock: true,
    featured: false,
    specifications: {
      'Чип': 'Apple M2 Max',
      'Память': '32GB',
      'Накопитель': '512GB SSD'
    }
  },
  {
    name: 'Mac Pro',
    description: 'Профессиональная рабочая станция Mac Pro',
    price: 899990,
    category: 'Mac',
    subtype: 'Mac Pro',
    images: ['https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=500'],
    inStock: true,
    featured: false,
    specifications: {
      'Чип': 'Apple M2 Ultra',
      'Память': '64GB',
      'Накопитель': '1TB SSD'
    }
  },
  {
    name: 'Studio Display',
    description: 'Профессиональный дисплей Studio Display 27"',
    price: 179990,
    category: 'Mac',
    subtype: 'Display',
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500'],
    inStock: true,
    featured: false,
    specifications: {
      'Дисплей': '27 дюймов 5K Retina',
      'Разрешение': '5120x2880',
      'Яркость': '600 нит'
    }
  },
  
  // iPad products
  {
    name: 'iPad 10.9"',
    description: 'Универсальный iPad для повседневных задач',
    price: 44990,
    category: 'iPad',
    subtype: 'iPad',
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500'],
    inStock: true,
    featured: true,
    specifications: {
      'Дисплей': '10.9 дюйма Liquid Retina',
      'Чип': 'A14 Bionic',
      'Память': '64GB'
    }
  },
  {
    name: 'iPad mini',
    description: 'Компактный iPad mini с чипом A15',
    price: 59990,
    category: 'iPad',
    subtype: 'iPad mini',
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500'],
    inStock: true,
    featured: false,
    specifications: {
      'Дисплей': '8.3 дюйма Liquid Retina',
      'Чип': 'A15 Bionic',
      'Память': '64GB'
    }
  },
  {
    name: 'iPad Air 11" M2',
    description: 'iPad Air с чипом M2 и дисплеем 11 дюймов',
    price: 74990,
    category: 'iPad',
    subtype: 'iPad Air',
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500'],
    inStock: true,
    featured: true,
    specifications: {
      'Дисплей': '11 дюймов Liquid Retina',
      'Чип': 'Apple M2',
      'Память': '128GB'
    }
  },
  {
    name: 'iPad Air 13" M2',
    description: 'iPad Air с чипом M2 и дисплеем 13 дюймов',
    price: 94990,
    category: 'iPad',
    subtype: 'iPad Air',
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500'],
    inStock: true,
    featured: false,
    specifications: {
      'Дисплей': '13 дюймов Liquid Retina',
      'Чип': 'Apple M2',
      'Память': '128GB'
    }
  },
  {
    name: 'iPad Pro 11" M4',
    description: 'Профессиональный iPad Pro 11 с чипом M4',
    price: 99990,
    category: 'iPad',
    subtype: 'iPad Pro',
    images: ['https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500'],
    inStock: true,
    featured: true,
    specifications: {
      'Дисплей': '11 дюймов Ultra Retina XDR',
      'Чип': 'Apple M4',
      'Память': '256GB'
    }
  },
  {
    name: 'iPad Pro 13" M4',
    description: 'Максимальный iPad Pro 13 с чипом M4',
    price: 129990,
    category: 'iPad',
    subtype: 'iPad Pro',
    images: ['https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500'],
    inStock: true,
    featured: false,
    specifications: {
      'Дисплей': '13 дюймов Ultra Retina XDR',
      'Чип': 'Apple M4',
      'Память': '256GB'
    }
  },
  
  // Apple Watch products
  {
    name: 'Apple Watch Series 9',
    description: 'Умные часы Apple Watch Series 9',
    price: 49990,
    category: 'Apple Watch',
    images: ['https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500'],
    inStock: true,
    featured: true,
    specifications: {
      'Дисплей': 'Always-On Retina',
      'Чип': 'S9',
      'Функции': 'ЭКГ, измерение кислорода в крови'
    }
  },
  {
    name: 'Apple Watch Ultra 2',
    description: 'Экстремальные Apple Watch Ultra 2',
    price: 99990,
    category: 'Apple Watch',
    images: ['https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500'],
    inStock: true,
    featured: true,
    specifications: {
      'Дисплей': '49mm Always-On Retina',
      'Чип': 'S9',
      'Функции': 'Глубиномер, GPS двухдиапазонный'
    }
  },
  {
    name: 'Apple Watch SE',
    description: 'Доступные Apple Watch SE',
    price: 34990,
    category: 'Apple Watch',
    images: ['https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500'],
    inStock: true,
    featured: false,
    specifications: {
      'Дисплей': 'Retina',
      'Чип': 'S8',
      'Функции': 'Пульсометр, акселерометр'
    }
  },
  
  // AirPods products
  {
    name: 'AirPods Pro 2',
    description: 'Беспроводные наушники с активным шумоподавлением',
    price: 29990,
    category: 'AirPods',
    subtype: '2-го поколения',
    images: ['https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500'],
    inStock: true,
    featured: true,
    specifications: {
      'Функции': 'Активное шумоподавление, адаптивная прозрачность',
      'Батарея': 'До 6 часов'
    }
  },
  {
    name: 'AirPods 3',
    description: 'Беспроводные наушники AirPods 3-го поколения',
    price: 21990,
    category: 'AirPods',
    subtype: '3-го поколения',
    images: ['https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500'],
    inStock: true,
    featured: false,
    specifications: {
      'Функции': 'Пространственное аудио',
      'Батарея': 'До 6 часов'
    }
  },
  {
    name: 'AirPods Max',
    description: 'Накладные наушники премиум-класса',
    price: 69990,
    category: 'AirPods',
    subtype: 'Max',
    images: ['https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500'],
    inStock: true,
    featured: false,
    specifications: {
      'Функции': 'Активное шумоподавление, пространственное аудио',
      'Батарея': 'До 20 часов'
    }
  },
  
  // Accessories
  {
    name: 'Magic Mouse',
    description: 'Беспроводная мышь Magic Mouse',
    price: 9990,
    category: 'Accessories',
    subtype: 'Мышь',
    images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=500'],
    inStock: true,
    featured: false,
    specifications: {
      'Подключение': 'Bluetooth',
      'Батарея': 'Встроенная'
    }
  },
  {
    name: 'Magic Keyboard',
    description: 'Беспроводная клавиатура Magic Keyboard',
    price: 12990,
    category: 'Accessories',
    subtype: 'Клавиатура',
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'],
    inStock: true,
    featured: false,
    specifications: {
      'Подключение': 'Bluetooth',
      'Батарея': 'Встроенная'
    }
  },
  {
    name: 'Apple Pencil Pro',
    description: 'Стилус Apple Pencil Pro для iPad',
    price: 14990,
    category: 'Accessories',
    subtype: 'Стилус',
    images: ['https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=500'],
    inStock: true,
    featured: true,
    specifications: {
      'Функции': 'Сенсор нажатия, тактильная отдача',
      'Совместимость': 'iPad Pro, iPad Air'
    }
  },
  {
    name: 'USB-C to Lightning Cable',
    description: 'Кабель USB-C to Lightning 1м',
    price: 2490,
    category: 'Accessories',
    subtype: 'Кабель',
    images: ['https://images.unsplash.com/photo-1585351650549-2f30e7c1b84b?w=500'],
    inStock: true,
    featured: false,
    specifications: {
      'Длина': '1 метр',
      'Тип': 'USB-C to Lightning'
    }
  },
  {
    name: 'USB-C Power Adapter 20W',
    description: 'Адаптер питания USB-C 20W',
    price: 2990,
    category: 'Accessories',
    subtype: 'Адаптер',
    images: ['https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=500'],
    inStock: true,
    featured: false,
    specifications: {
      'Мощность': '20W',
      'Тип': 'USB-C'
    }
  },
  {
    name: 'AirTag 4 Pack',
    description: 'Трекер AirTag (набор 4 шт)',
    price: 12990,
    category: 'Accessories',
    subtype: 'Трекер',
    images: ['https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?w=500'],
    inStock: true,
    featured: false,
    specifications: {
      'Функции': 'Поиск вещей через Локатор',
      'Батарея': 'Сменная CR2032'
    }
  }
];
