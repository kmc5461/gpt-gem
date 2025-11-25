// lib/search/client.ts
import { MeiliSearch } from 'meilisearch';

// Meilisearch İstemcisi
// Ortam değişkenlerinden bağlantı bilgilerini alır
export const searchClient = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || 'http://127.0.0.1:7700',
  apiKey: process.env.MEILISEARCH_KEY || 'masterKey',
});

export const INDEX_NAME = 'products';

// İstemci tarafında güvenli kullanım için sadece arama yapabilen public key kullanılmalıdır
// Bu örnekte basitlik adına master key kullanılıyor, production'da ayrılmalıdır.
