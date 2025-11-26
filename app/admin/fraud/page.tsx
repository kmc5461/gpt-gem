// app/admin/fraud/page.tsx
'use client';

import { ShieldAlert, AlertTriangle, Check, Ban, Search } from 'lucide-react';

const FRAUD_DATA = [
  { id: '#ORD-9921', user: 'Bot_User_X', score: 92, tags: ['IP Mismatch', 'VPN Detected'], decision: 'Review' },
  { id: '#ORD-9922', user: 'Mehmet Y.', score: 12, tags: ['Clean'], decision: 'Allow' },
  { id: '#ORD-9923', user: 'Anonym_55', score: 88, tags: ['High Velocity', 'New Device'], decision: 'Block' },
  { id: '#ORD-9924', user: 'Ali Veli', score: 45, tags: ['High Amount'], decision: 'Review' },
];

export default function FraudPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-2xl font-bold text-zinc-900">Fraud Detection Engine</h1>
           <p className="text-zinc-500 text-sm">Yapay zeka destekli risk analizi ve karar merkezi.</p>
        </div>
      </div>

      {/* Top Card */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-6 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                <ShieldAlert size={24} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-red-900">Yüksek Riskli Siparişler</h3>
                <p className="text-sm text-red-700">Bugün tespit edilen kritik risk sayısı.</p>
            </div>
         </div>
         <div className="text-4xl font-black text-red-600">3</div>
      </div>

      {/* Fraud Table */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-zinc-200 flex justify-between items-center bg-zinc-50/50">
            <h3 className="font-bold text-zinc-700">Canlı Risk Analizi</h3>
            <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                <input type="text" placeholder="Sipariş No Ara..." className="pl-8 pr-4 py-1.5 text-sm border border-zinc-300 rounded-md outline-none focus:border-red-500" />
            </div>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 text-zinc-500 font-medium border-b border-zinc-200">
            <tr>
              <th className="px-6 py-4">Sipariş No</th>
              <th className="px-6 py-4">Kullanıcı</th>
              <th className="px-6 py-4">Risk Skoru</th>
              <th className="px-6 py-4">Risk Etiketleri</th>
              <th className="px-6 py-4">Oto. Karar</th>
              <th className="px-6 py-4 text-right">Aksiyon</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {FRAUD_DATA.map((item) => (
              <tr key={item.id} className={item.score > 80 ? 'bg-red-50/30' : ''}>
                <td className="px-6 py-4 font-medium">{item.id}</td>
                <td className="px-6 py-4">{item.user}</td>
                <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-zinc-200 rounded-full overflow-hidden">
                            <div 
                                className={`h-full ${item.score > 75 ? 'bg-red-600' : item.score > 40 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                                style={{ width: `${item.score}%` }}
                            ></div>
                        </div>
                        <span className="font-bold">{item.score}/100</span>
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap">
                        {item.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-zinc-100 border border-zinc-200 text-zinc-600 text-xs rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                </td>
                <td className="px-6 py-4">
                    <span className={`font-bold text-xs uppercase ${
                        item.decision === 'Block' ? 'text-red-600' : 
                        item.decision === 'Allow' ? 'text-emerald-600' : 'text-amber-600'
                    }`}>
                        {item.decision}
                    </span>
                </td>
                <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                        <button className="px-3 py-1.5 border border-zinc-200 hover:bg-zinc-50 text-xs font-medium rounded">Detay</button>
                        {item.decision === 'Review' && (
                            <button className="px-3 py-1.5 bg-zinc-900 text-white hover:bg-zinc-700 text-xs font-medium rounded">İncele</button>
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
