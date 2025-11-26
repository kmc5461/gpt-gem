// app/search/components/SearchResults.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/products/ProductCard';
import { Loader2, AlertCircle } from 'lucide-react';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const category = searchParams.get('category');
  
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, processingTimeMs: 0 });

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        // API route'a parametreleri ilet
        const params = new URLSearchParams();
        if (query) params.append('q', query);
        if (category) params.append('category', category);
        
        const res = await fetch(`/api/search?${params.toString()}`);
        const data = await res.json();
        
        setResults(data.hits || []);
        setStats({ total: data.nbHits, processingTimeMs: data.processingTimeMs });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, category]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-300" />
        <p className="text-xs text-zinc-400 mt-4 uppercase tracking-widest">Arama Yapılıyor...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle className="w-12 h-12 text-zinc-200 mb-4" />
        <h2 className="text-lg font-bold text-zinc-900">Sonuç Bulunamadı</h2>
        <p className="text-zinc-500 mt-2 max-w-md">"{query}" araması için herhangi bir ürün eşleşmedi. Lütfen farklı anahtar kelimeler deneyin.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-xs text-zinc-500 border-b border-zinc-100 pb-4">
        <span>"{query}" için <strong>{stats.total}</strong> sonuç bulundu</span>
        <span>{stats.processingTimeMs}ms</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {results.map((product) => (
          // Mock ProductCard props mapping - Gerçek projede i18n ve tipler uyuşmalı
          <ProductCard 
            key={product.id} 
            product={{
              ...product,
              // Search index'te tutulan veriyi ProductCard formatına uydurma
              name_tr: product.name,
              name_en: product.name,
              currency: '€',
              images: [product.image],
              variants: []
            }} 
            dict={{ common: { addToCart: 'Sepete Ekle' } }} // Basit mock
            locale="tr"
          />
        ))}
      </div>
    </div>
  );
}
