// lib/data.ts

// Prisma modellerine benzer tip tanımları
export type Product = {
  id: string;
  slug: string;
  name_tr: string;
  name_en: string;
  description_tr: string;
  description_en: string;
  price: number;
  currency: string;
  categoryId: string;
  images: string[];
  inStock: boolean;
  variants: {
    name: string; // 'Color', 'Size'
    options: string[]; // ['S', 'M', 'L']
  }[];
};

export type Category = {
  id: string;
  slug: string;
  name_tr: string;
  name_en: string;
};

// Mock Veriler
const CATEGORIES: Category[] = [
  { id: '1', slug: 'hoodies', name_tr: 'Hoodie', name_en: 'Hoodies' },
  { id: '2', slug: 'outerwear', name_tr: 'Dış Giyim', name_en: 'Outerwear' },
  { id: '3', slug: 'accessories', name_tr: 'Aksesuar', name_en: 'Accessories' },
];

const PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'noir-oversized-hoodie',
    name_tr: 'Noir Oversized Hoodie',
    name_en: 'Noir Oversized Hoodie',
    description_tr: 'Ağır gramajlı pamuklu kumaş. Düşük omuz kesimi ve eskitme detaylar.',
    description_en: 'Heavyweight cotton fabric. Dropped shoulder cut and distressed details.',
    price: 120,
    currency: '€',
    categoryId: '1',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800&flip=h',
    ],
    inStock: true,
    variants: [
      { name: 'Size', options: ['S', 'M', 'L', 'XL'] },
      { name: 'Color', options: ['Black', 'Charcoal'] },
    ],
  },
  {
    id: '2',
    slug: 'essential-trench-coat',
    name_tr: 'Essential Trençkot',
    name_en: 'Essential Trench Coat',
    description_tr: 'Su itici teknik kumaş. Modern şehir hayatı için tasarlandı.',
    description_en: 'Water-repellent technical fabric. Designed for modern city life.',
    price: 450,
    currency: '€',
    categoryId: '2',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    ],
    inStock: true,
    variants: [
      { name: 'Size', options: ['46', '48', '50', '52'] },
    ],
  },
  {
    id: '3',
    slug: 'obsidian-ring-set',
    name_tr: 'Obsidyen Yüzük Seti',
    name_en: 'Obsidian Ring Set',
    description_tr: 'Paslanmaz çelik ve doğal taş.',
    description_en: 'Stainless steel and natural stone.',
    price: 85,
    currency: '€',
    categoryId: '3',
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&q=80&w=800',
    ],
    inStock: false,
    variants: [
      { name: 'Size', options: ['One Size'] },
    ],
  },
  {
    id: '4',
    slug: 'combat-boots-v2',
    name_tr: 'Combat Bot V2',
    name_en: 'Combat Boots V2',
    description_tr: 'İtalyan derisi, Vibram taban.',
    description_en: 'Italian leather, Vibram sole.',
    price: 280,
    currency: '€',
    categoryId: '2', // Mock category
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800',
    ],
    inStock: true,
    variants: [
      { name: 'Size', options: ['40', '41', '42', '43', '44'] },
    ],
  }
];

// Data Fetching Simülasyonu
export async function getProducts() {
  return PRODUCTS;
}

export async function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

export async function getCategoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug) || null;
}

export async function getProductsByCategory(categoryId: string) {
  return PRODUCTS.filter((p) => p.categoryId === categoryId);
}
