// app/admin/shipping/page.tsx
'use client';

import { Truck, Package, Search, MapPin, RotateCcw, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const SHIPMENTS = [
  { id: 'SH-1001', order: '#ORD-7721', carrier: 'Yurtici', tracking: 'YK123456789', status: 'Yolda', date: '12.03.2024' },
  { id: 'SH-1002', order: '#ORD-7722', carrier: 'HepsiJet', tracking: 'HJ987654321', status: 'Teslim Edildi', date: '11.03.2024' },
  { id: 'SH-1003', order: '#ORD-7723', carrier: 'MNG', tracking: 'MNG456123789', status: 'Hazırlanıyor', date: '13.03.2024' },
];

export default function ShippingPage() {
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [activeTracking, setActiveTracking] = useState('');

  const handleTrack = (tracking: string) => {
    setActiveTracking(tracking);
    setTrackModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Lojistik & Kargo</h1>
          <p className="text-zinc-500 text-sm">Gönderi takibi, kargo etiketleri ve lojistik operasyonları.</p>
        </div>
        <div className="flex gap-2">
            <button className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                <RotateCcw size={16} /> İade Etiketi Oluştur
            </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-zinc-500 text-xs uppercase font-bold">Yoldaki Kargo</p>
                    <h3 className="text-2xl font-bold mt-1">124</h3>
                </div>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Truck size={20} /></div>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-zinc-500 text-xs uppercase font-bold">Bugün Teslim Edilen</p>
                    <h3 className="text-2xl font-bold mt-1">45</h3>
                </div>
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Package size={20} /></div>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-zinc-500 text-xs uppercase font-bold">Ortalama Maliyet</p>
                    <h3 className="text-2xl font-bold mt-1">₺42.50</h3>
                </div>
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><MapPin size={20} /></div>
            </div>
        </div>
      </div>

      {/* Shipments Table */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-zinc-200 flex justify-between items-center bg-zinc-50/50">
            <h3 className="font-bold text-zinc-700">Son Gönderiler</h3>
            <div className="relative w-64">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                <input type="text" placeholder="Takip No / Sipariş No" className="w-full pl-8 pr-4 py-1.5 text-sm border border-zinc-300 rounded-md outline-none focus:border-black" />
            </div>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 text-zinc-500 font-medium border-b border-zinc-200">
            <tr>
              <th className="px-6 py-4">Sevkiyat ID</th>
              <th className="px-6 py-4">Sipariş</th>
              <th className="px-6 py-4">Kargo Firması</th>
              <th className="px-6 py-4">Takip No</th>
              <th className="px-6 py-4">Durum</th>
              <th className="px-6 py-4">Tarih</th>
              <th className="px-6 py-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {SHIPMENTS.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-50/50">
                <td className="px-6 py-4 font-medium">{item.id}</td>
                <td className="px-6 py-4 text-zinc-600">{item.order}</td>
                <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold border ${
                        item.carrier === 'Yurtici' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        item.carrier === 'HepsiJet' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                        'bg-indigo-50 text-indigo-700 border-indigo-100'
                    }`}>
                        {item.carrier}
                    </span>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-zinc-500">{item.tracking}</td>
                <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-bold ${
                        item.status === 'Teslim Edildi' ? 'text-emerald-600' :
                        item.status === 'Yolda' ? 'text-blue-600' : 'text-zinc-500'
                    }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                            item.status === 'Teslim Edildi' ? 'bg-emerald-500' :
                            item.status === 'Yolda' ? 'bg-blue-500' : 'bg-zinc-400'
                        }`}></span>
                        {item.status}
                    </span>
                </td>
                <td className="px-6 py-4 text-zinc-500">{item.date}</td>
                <td className="px-6 py-4 text-right">
                    <button 
                        onClick={() => handleTrack(item.tracking)}
                        className="text-zinc-500 hover:text-black flex items-center gap-1 ml-auto text-xs font-bold uppercase"
                    >
                        Takip Et <ExternalLink size={12} />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tracking Modal (Simple) */}
      {trackModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setTrackModalOpen(false)}>
            <div className="bg-white p-6 rounded-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Kargo Hareketleri</h3>
                    <button onClick={() => setTrackModalOpen(false)}>Kapat</button>
                </div>
                <div className="space-y-4">
                    <div className="p-3 bg-zinc-50 rounded border border-zinc-100">
                        <p className="text-xs text-zinc-400 mb-1">Takip No:</p>
                        <p className="font-mono font-bold">{activeTracking}</p>
                    </div>
                    <div className="relative pl-4 border-l-2 border-zinc-200 space-y-6 py-2">
                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                            <p className="text-sm font-bold">Transfer Merkezinde</p>
                            <p className="text-xs text-zinc-500">İstanbul - 14:30</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 bg-zinc-300 rounded-full border-2 border-white"></div>
                            <p className="text-sm font-bold text-zinc-500">Çıkış Şubesinde</p>
                            <p className="text-xs text-zinc-500">Ankara - 09:15</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
