// app/search/page.tsx
import SearchResults from './components/SearchResults';
import SearchBar from './components/SearchBar';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-white pt-12 pb-24">
      <div className="max-w-screen-2xl mx-auto px-6">
        
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-heading font-bold uppercase tracking-tighter mb-6">Arama</h1>
          <div className="max-w-lg mx-auto">
            <SearchBar />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sol Filtre Alanı (Placeholder) */}
          <aside className="w-full lg:w-64 flex-shrink-0 hidden lg:block space-y-8">
            <div>
              <h3 className="font-bold uppercase tracking-widest text-xs mb-4 border-b border-zinc-100 pb-2">Kategoriler</h3>
              <div className="space-y-2 text-sm text-zinc-500">
                <label className="flex items-center gap-2 hover:text-black cursor-pointer">
                  <input type="checkbox" className="rounded border-zinc-300" /> Hoodies
                </label>
                <label className="flex items-center gap-2 hover:text-black cursor-pointer">
                  <input type="checkbox" className="rounded border-zinc-300" /> Outerwear
                </label>
                <label className="flex items-center gap-2 hover:text-black cursor-pointer">
                  <input type="checkbox" className="rounded border-zinc-300" /> Accessories
                </label>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold uppercase tracking-widest text-xs mb-4 border-b border-zinc-100 pb-2">Fiyat Aralığı</h3>
              <div className="flex gap-2 items-center">
                <input type="number" placeholder="Min" className="w-full border border-zinc-200 p-2 text-sm rounded" />
                <span className="text-zinc-400">-</span>
                <input type="number" placeholder="Max" className="w-full border border-zinc-200 p-2 text-sm rounded" />
              </div>
            </div>
          </aside>

          {/* Sonuçlar */}
          <div className="flex-1">
            <SearchResults />
          </div>
        </div>

      </div>
    </div>
  );
}
