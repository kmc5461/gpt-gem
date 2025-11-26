// app/admin/pricing-engine/page.tsx
'use client';

import { Zap, ArrowRight, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { useState } from 'react';

const PRICING_SCENARIOS = [
  { id: 1, product: 'Noir Oversized Hoodie', oldPrice: 120, newPrice: 135, reason: 'Yüksek Talep', trend: 'up' },
  { id: 2, product: 'Essential Trench Coat', oldPrice: 450, newPrice: 450, reason: 'Stabil', trend: 'stable' },
  { id: 3, product: 'Combat Boots', oldPrice: 280, newPrice: 250, reason: 'Düşük Stok Rotasyonu', trend: 'down' },
  { id: 4, product: 'Silk Kimono Shirt', oldPrice: 180, newPrice: 195, reason: 'Rakip Fiyat Artışı', trend: 'up' },
];

export default function PricingEnginePage() {
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
            <Zap className="text-amber-500 fill-amber-500" /> AI Pricing Engine
          </h1>
          <p className="text-zinc-500 text-sm">Talep, stok ve rakip verilerine göre dinamik fiyatlandırma.</p>
        </div>
        <button 
            onClick={runSimulation}
            disabled={isSimulating}
            className="flex items-center gap-2 bg-zinc-900 text-white px-5 py-2.5 rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-70"
        >
            <RefreshCw size={18} className={isSimulating ? 'animate-spin' : ''} />
            {isSimulating ? 'Analiz Ediliyor...' : 'Fiyat Motorunu Çalıştır'}
        </button>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 bg-zinc-50 border-b border-zinc-200 flex justify-between items-center">
            <h3 className="font-bold text-zinc-700">Simülasyon Sonuçları (Önizleme)</h3>
            <span className="text-xs text-zinc-500">Son güncelleme: Az önce</span>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="text-zinc-500 font-medium border-b border-zinc-200">
            <tr>
              <th className="px-6 py-4">Ürün Adı</th>
              <th className="px-6 py-4">Mevcut Fiyat</th>
              <th className="px-6 py-4">Önerilen Fiyat</th>
              <th className="px-6 py-4">Değişim</th>
              <th className="px-6 py-4">AI Gerekçesi</th>
              <th className="px-6 py-4 text-right">Durum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {PRICING_SCENARIOS.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-50/50">
                <td className="px-6 py-4 font-bold text-zinc-900">{item.product}</td>
                <td className="px-6 py-4 text-zinc-500">€{item.oldPrice}</td>
                <td className="px-6 py-4 font-bold text-zinc-900">€{item.newPrice}</td>
                <td className="px-6 py-4">
                    {item.trend === 'up' && <span className="text-emerald-600 flex items-center text-xs font-bold gap-1"><TrendingUp size={14}/> +{Math.round(((item.newPrice-item.oldPrice)/item.oldPrice)*100)}%</span>}
                    {item.trend === 'down' && <span className="text-red-600 flex items-center text-xs font-bold gap-1"><TrendingDown size={14}/> {Math.round(((item.newPrice-item.oldPrice)/item.oldPrice)*100)}%</span>}
                    {item.trend === 'stable' && <span className="text-zinc-400 text-xs font-bold">-</span>}
                </td>
                <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-zinc-100 text-zinc-600 text-xs rounded border border-zinc-200">
                        {item.reason}
                    </span>
                </td>
                <td className="px-6 py-4 text-right">
                    <button className="text-xs font-bold text-blue-600 hover:underline">Uygula</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
