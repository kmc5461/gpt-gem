// app/admin/recommendations/page.tsx
'use client';

import { Search, User, ThumbsUp, Eye, ShoppingBag } from 'lucide-react';

const MOCK_USER_RECS = [
  { id: '1', name: 'Tech Coat V2', score: 98, reason: 'Geçmiş siparişlerine benzer' },
  { id: '2', name: 'Cargo Pants Black', score: 85, reason: 'Birlikte sık alınıyor' },
  { id: '3', name: 'Beanie Hat', score: 72, reason: 'Popüler aksesuar' },
];

export default function RecommendationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Öneri Motoru</h1>
          <p className="text-zinc-500 text-sm">Kullanıcı bazlı collaborative filtering sonuçlarını inceleyin.</p>
        </div>
      </div>

      {/* Kullanıcı Arama */}
      <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input 
            type="text" 
            placeholder="Kullanıcı ID veya Email ile ara..." 
            className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg outline-none focus:border-black"
          />
        </div>
        <button className="bg-black text-white px-6 py-2 rounded-lg font-bold text-sm">Analiz Et</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profil Kartı */}
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center">
              <User size={24} className="text-zinc-500" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Ahmet Yılmaz</h3>
              <p className="text-sm text-zinc-500">Premium Üye</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-zinc-100 pb-2">
              <span className="text-zinc-500">Son Giriş</span>
              <span className="font-medium">2 saat önce</span>
            </div>
            <div className="flex justify-between border-b border-zinc-100 pb-2">
              <span className="text-zinc-500">Toplam Harcama</span>
              <span className="font-medium">€1,250</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Favori Kategori</span>
              <span className="font-medium">Outerwear</span>
            </div>
          </div>
        </div>

        {/* Öneriler Listesi */}
        <div className="md:col-span-2 bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 bg-zinc-50 border-b border-zinc-200 font-bold text-zinc-700 flex items-center gap-2">
            <ThumbsUp size={18} /> AI Önerileri (Top 3)
          </div>
          <div className="divide-y divide-zinc-100">
            {MOCK_USER_RECS.map((rec, i) => (
              <div key={rec.id} className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-zinc-900 text-white rounded flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900">{rec.name}</h4>
                    <p className="text-xs text-zinc-500">{rec.reason}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs text-zinc-400 font-bold uppercase">Match Score</div>
                    <div className="text-emerald-600 font-black text-lg">%{rec.score}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 border border-zinc-200 rounded hover:bg-zinc-100" title="View Product"><Eye size={16}/></button>
                    <button className="p-2 border border-zinc-200 rounded hover:bg-zinc-100" title="Purchase History"><ShoppingBag size={16}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
