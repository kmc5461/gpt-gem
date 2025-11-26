// app/admin/pricing-engine/simulation/page.tsx
'use client';

import { useState } from 'react';
import { Play, RefreshCw, TrendingUp, AlertCircle } from 'lucide-react';

export default function PricingSimulationPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSimulate = () => {
    setLoading(true);
    // Mock API Call to AI Pricing Service
    setTimeout(() => {
      setResult({
        currentPrice: 120,
        recommendedPrice: 138.50,
        confidence: 94,
        factors: ['Yüksek Sezon Talebi', 'Düşük Stok', 'Rakip Fiyat Artışı']
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Fiyat Simülasyonu</h1>
          <p className="text-zinc-500 text-sm">Yapay zeka modelini test verileriyle çalıştırın.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Girdi Formu */}
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Parametreler</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Ürün</label>
              <select className="w-full border border-zinc-300 rounded-lg p-2 text-sm">
                <option>Noir Oversized Hoodie</option>
                <option>Trench Coat</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Talep Skoru (0-100)</label>
                <input type="number" className="w-full border border-zinc-300 rounded-lg p-2 text-sm" defaultValue={85} />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Stok Adedi</label>
                <input type="number" className="w-full border border-zinc-300 rounded-lg p-2 text-sm" defaultValue={12} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Rakip Fiyatı (€)</label>
                <input type="number" className="w-full border border-zinc-300 rounded-lg p-2 text-sm" defaultValue={125} />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Sezon Etkisi</label>
                <select className="w-full border border-zinc-300 rounded-lg p-2 text-sm">
                  <option value="1.2">Yüksek Sezon</option>
                  <option value="1.0">Normal</option>
                  <option value="0.8">Sezon Sonu</option>
                </select>
              </div>
            </div>
            <button 
              onClick={handleSimulate}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors"
            >
              {loading ? <RefreshCw className="animate-spin" size={18} /> : <Play size={18} />}
              Simülasyonu Başlat
            </button>
          </div>
        </div>

        {/* Sonuç Kartı */}
        <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200 flex flex-col justify-center">
          {!result ? (
            <div className="text-center text-zinc-400">
              <TrendingUp size={48} className="mx-auto mb-4 opacity-20" />
              <p>Sonuçları görmek için simülasyonu çalıştırın.</p>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-zinc-500 font-bold uppercase">Mevcut Fiyat</p>
                  <p className="text-2xl font-bold text-zinc-400 line-through">€{result.currentPrice}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-emerald-600 font-bold uppercase">AI Önerisi</p>
                  <p className="text-4xl font-black text-zinc-900">€{result.recommendedPrice}</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-zinc-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-zinc-700">Model Güven Skoru</span>
                  <span className="text-sm font-bold text-emerald-600">%{result.confidence}</span>
                </div>
                <div className="w-full bg-zinc-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${result.confidence}%` }}></div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-zinc-900 mb-2 flex items-center gap-2">
                  <AlertCircle size={14} /> Etkileyen Faktörler
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.factors.map((factor: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-white border border-zinc-200 rounded-full text-xs font-medium text-zinc-600 shadow-sm">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
