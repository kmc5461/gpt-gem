// app/search/components/SearchBar.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Debounce hook (basit implementasyon)
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Autocomplete araması
  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        const data = await res.json();
        setResults(data.hits || []);
        setIsOpen(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  // Dışarı tıklandığında kapat
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ara..."
          className="w-full bg-zinc-50 border border-zinc-200 rounded-full py-2.5 pl-12 pr-10 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
        {query && (
          <button 
            type="button" 
            onClick={() => { setQuery(''); setResults([]); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black"
          >
            <X size={16} />
          </button>
        )}
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-zinc-200 rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            {results.map((item: any) => (
              <Link 
                href={`/products/${item.slug}`} 
                key={item.id}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 p-3 hover:bg-zinc-50 transition-colors border-b border-zinc-50 last:border-0"
              >
                <div className="relative w-12 h-12 bg-zinc-100 rounded-md overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-zinc-900 truncate">{item.name}</h4>
                  <p className="text-xs text-zinc-500 truncate">{item.category}</p>
                </div>
                <span className="text-sm font-bold text-zinc-900">{item.price} €</span>
              </Link>
            ))}
            <Link 
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={() => setIsOpen(false)}
              className="block p-3 text-center text-xs font-bold uppercase text-zinc-500 hover:text-black hover:bg-zinc-50 transition-colors"
            >
              Tüm sonuçları gör ({results.length})
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
