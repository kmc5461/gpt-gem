// app/admin/activity-logs/page.tsx
'use client';

import { Activity, Filter, Download } from 'lucide-react';

const LOGS = [
  { id: 1, date: '2024-03-12 14:30', user: 'Admin User', action: 'UPDATE_PRODUCT', desc: 'Noir Hoodie fiyatı güncellendi (120 -> 135)' },
  { id: 2, date: '2024-03-12 14:15', user: 'System (AI)', action: 'FRAUD_CHECK', desc: 'Sipariş #ORD-9923 riskli olarak işaretlendi.' },
  { id: 3, date: '2024-03-12 13:45', user: 'Support Team', action: 'RMA_APPROVE', desc: 'İade #RMA-002 onaylandı.' },
  { id: 4, date: '2024-03-12 11:20', user: 'Admin User', action: 'LOGIN', desc: 'Başarılı sistem girişi (IP: 192.168.1.1)' },
  { id: 5, date: '2024-03-12 10:05', user: 'System', action: 'STOCK_ALERT', desc: 'Combat Boots stok seviyesi kritik (5 adet).' },
];

export default function ActivityLogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Activity Logs</h1>
          <p className="text-zinc-500 text-sm">Sistem genelindeki tüm işlemlerin denetim kaydı.</p>
        </div>
        <button className="flex items-center gap-2 text-sm text-zinc-600 hover:text-black border border-zinc-300 px-4 py-2 rounded-lg">
            <Download size={16} /> CSV İndir
        </button>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
        {/* Filtre Barı */}
        <div className="p-4 border-b border-zinc-200 flex gap-4 items-center bg-zinc-50">
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
                <Filter size={16} />
                <span className="font-bold">Filtrele:</span>
            </div>
            <select className="text-sm border border-zinc-300 rounded px-2 py-1 outline-none focus:border-black">
                <option>Tüm Aksiyonlar</option>
                <option>Sistem</option>
                <option>Kullanıcı</option>
                <option>Hata</option>
            </select>
            <input type="date" className="text-sm border border-zinc-300 rounded px-2 py-1 outline-none" />
        </div>

        <table className="w-full text-sm text-left">
          <thead className="bg-white text-zinc-500 font-medium border-b border-zinc-200">
            <tr>
              <th className="px-6 py-4">Tarih</th>
              <th className="px-6 py-4">Kullanıcı / Kaynak</th>
              <th className="px-6 py-4">Aksiyon Tipi</th>
              <th className="px-6 py-4">Açıklama</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {LOGS.map((log) => (
              <tr key={log.id} className="hover:bg-zinc-50/50">
                <td className="px-6 py-4 text-zinc-500 whitespace-nowrap font-mono text-xs">{log.date}</td>
                <td className="px-6 py-4 font-bold text-zinc-800 flex items-center gap-2">
                    <Activity size={14} className="text-zinc-400" />
                    {log.user}
                </td>
                <td className="px-6 py-4">
                    <span className="bg-zinc-100 text-zinc-600 px-2 py-1 rounded text-xs border border-zinc-200 font-mono">
                        {log.action}
                    </span>
                </td>
                <td className="px-6 py-4 text-zinc-600">{log.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
