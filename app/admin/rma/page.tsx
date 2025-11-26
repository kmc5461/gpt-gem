// app/admin/rma/page.tsx
'use client';

import { Eye, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const RMA_DATA = [
  { id: 'RMA-001', orderId: '#ORD-7721', user: 'Ahmet Yılmaz', reason: 'Beden Uymadı', status: 'Bekliyor', date: '2024-03-10' },
  { id: 'RMA-002', orderId: '#ORD-7718', user: 'Selin Demir', reason: 'Kusurlu Ürün', status: 'Onaylandı', date: '2024-03-09' },
  { id: 'RMA-003', orderId: '#ORD-7650', user: 'Caner Erkin', reason: 'Vazgeçti', status: 'Reddedildi', date: '2024-03-08' },
  { id: 'RMA-004', orderId: '#ORD-7725', user: 'Elif Kaya', reason: 'Yanlış Ürün', status: 'Bekliyor', date: '2024-03-11' },
];

export default function RmaPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">İade Yönetimi (RMA)</h1>
          <p className="text-zinc-500 text-sm">Müşteri iade taleplerini yönetin.</p>
        </div>
        <div className="flex gap-2">
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <RotateCcw size={14} /> 2 Bekleyen Talep
            </span>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-medium">
            <tr>
              <th className="px-6 py-4">RMA ID</th>
              <th className="px-6 py-4">Sipariş No</th>
              <th className="px-6 py-4">Kullanıcı</th>
              <th className="px-6 py-4">Sebep</th>
              <th className="px-6 py-4">Durum</th>
              <th className="px-6 py-4">Tarih</th>
              <th className="px-6 py-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {RMA_DATA.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-zinc-900">{item.id}</td>
                <td className="px-6 py-4 text-zinc-600">{item.orderId}</td>
                <td className="px-6 py-4 font-medium">{item.user}</td>
                <td className="px-6 py-4 text-zinc-500">{item.reason}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    item.status === 'Bekliyor' ? 'bg-amber-100 text-amber-700' :
                    item.status === 'Onaylandı' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-500">{item.date}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-1.5 text-zinc-500 hover:bg-zinc-100 rounded transition-colors" title="Detay">
                      <Eye size={16} />
                    </button>
                    {item.status === 'Bekliyor' && (
                      <>
                        <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors" title="Onayla">
                          <CheckCircle size={16} />
                        </button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Reddet">
                          <XCircle size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
