
import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'Самый продвинутый iPhone с титановым корпусом и чипом A17 Pro',
    price: 129990,
    originalPrice: 139990,
    category: 'iPhone',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500'
    ],
    specifications: {
      'Дисплей': '6.1" Super Retina XDR',
      'Чип': 'A17 Pro',
      'Камера': 'Тройная 48 Мп',
      'Память': '128 ГБ, 256 ГБ, 512 ГБ, 1 ТБ',
      'Материал': 'Титан',
      'Водозащита': 'IP68'
    },
    colors: ['Натуральный титан', 'Голубой титан', 'Белый титан', 'Черный титан'],
    storage: ['128 ГБ', '256 ГБ', '512 ГБ', '1 ТБ'],
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'MacBook Pro 14"',
    description: 'Профессиональный ноутбук с чипом M3 Pro для максимальной производительности',
    price: 219990,
    category: 'MacBook Pro',
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'
    ],
    specifications: {
      'Дисплей': '14.2" Liquid Retina XDR',
      'Чип': 'Apple M3 Pro',
      'ОЗУ': '18 ГБ',
      'Накопитель': '512 ГБ SSD',
      'Порты': '3x Thunderbolt 4, HDMI, SDXC, MagSafe',
      'Батарея': 'До 22 часов'
    },
    colors: ['Серый космос', 'Серебристый'],
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'iPad Pro 12.9"',
    description: 'Самый мощный iPad с чипом M2 и дисплеем Liquid Retina XDR',
    price: 139990,
    category: 'iPad',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500'
    ],
    specifications: {
      'Дисплей': '12.9" Liquid Retina XDR',
      'Чип': 'Apple M2',
      'Камера': '12 Мп основная, 10 Мп фронтальная',
      'Память': '128 ГБ, 256 ГБ, 512 ГБ, 1 ТБ, 2 ТБ',
      'Подключение': 'Wi-Fi 6E, 5G (опционально)',
      'Apple Pencil': 'Поддержка Apple Pencil (2-го поколения)'
    },
    colors: ['Серый космос', 'Серебристый'],
    storage: ['128 ГБ', '256 ГБ', '512 ГБ', '1 ТБ', '2 ТБ'],
    inStock: true,
    featured: true
  },
  {
    id: '4',
    name: 'Apple Watch Series 9',
    description: 'Самые продвинутые умные часы с чипом S9 и новым ярким дисплеем',
    price: 44990,
    category: 'Apple Watch',
    images: [
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500'
    ],
    specifications: {
      'Дисплей': 'Always-On Retina',
      'Чип': 'S9 SiP',
      'Размеры': '41 мм, 45 мм',
      'Водозащита': 'WR50',
      'Датчики': 'ЭКГ, кислород в крови, температура',
      'Батарея': 'До 18 часов'
    },
    colors: ['Полуночный', 'Сияющая звезда', 'Серебристый', 'Розовый', 'Красный'],
    inStock: true
  },
  {
    id: '5',
    name: 'AirPods Pro (2-го поколения)',
    description: 'Беспроводные наушники с активным шумоподавлением и адаптивной прозрачностью',
    price: 29990,
    category: 'AirPods',
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500',
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500'
    ],
    specifications: {
      'Чип': 'H2',
      'Шумоподавление': 'Активное',
      'Батарея': 'До 6 часов (30 часов с кейсом)',
      'Зарядка': 'Lightning, MagSafe, Qi',
      'Управление': 'Сенсорное',
      'Защита': 'IPX4'
    },
    inStock: true
  },
  {
    id: '6',
    name: 'iPhone 15',
    description: 'Новый iPhone 15 с Dynamic Island и камерой 48 Мп',
    price: 89990,
    category: 'iPhone',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500'
    ],
    specifications: {
      'Дисплей': '6.1" Super Retina XDR',
      'Чип': 'A16 Bionic',
      'Камера': 'Двойная 48 Мп',
      'Память': '128 ГБ, 256 ГБ, 512 ГБ',
      'Водозащита': 'IP68'
    },
    colors: ['Черный', 'Синий', 'Зеленый', 'Желтый', 'Розовый'],
    storage: ['128 ГБ', '256 ГБ', '512 ГБ'],
    inStock: true
  }
];
