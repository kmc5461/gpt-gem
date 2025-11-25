// lib/search/indexer.ts
import { prisma } from '@/lib/prisma';
import { searchClient, INDEX_NAME } from './client';

/**
 * Veritabanındaki ürünleri Arama Motoruna senkronize eder.
 * Genellikle bir Cron job veya Admin panelinden tetiklenir.
 */
export async function syncProductsToSearchIndex() {
  const index = searchClient.index(INDEX_NAME);

  // 1. İndeks Ayarlarını Yapılandır
  await index.updateSettings({
    searchableAttributes: ['name', 'description', 'category', 'tags'],
    filterableAttributes: ['category', 'price', 'variants', 'inStock'],
    sortableAttributes: ['price', 'createdAt', 'demandScore'],
    rankingRules: [
      'words',
      'typo',
      'proximity',
      'attribute',
      'sort',
      'exactness',
      'demandScore:desc' // Özel sıralama kuralı (AI skoru)
    ]
  });

  // 2. Veritabanından Ürünleri Çek
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: {
      category: true,
      variants: {
        include: { options: true }
      }
    }
  });

  // 3. Arama Motoru Formatına Dönüştür
  const searchDocuments = products.map(product => ({
    id: product.id,
    name: product.name, // i18n ise string'e çevrilmeli veya ayrı alanlar açılmalı
    description: product.description,
    slug: product.slug,
    price: Number(product.currentPrice),
    category: product.category.name,
    image: product.images[0],
    inStock: product.isActive, // Stok mantığına göre güncellenebilir
    variants: product.variants.map(v => v.options.map(o => o.value)).flat(),
    demandScore: product.demandScore,
    createdAt: product.createdAt.getTime(),
  }));

  // 4. İndekse Gönder
  const response = await index.addDocuments(searchDocuments);
  console.log('Search Index Updated:', response);
}
