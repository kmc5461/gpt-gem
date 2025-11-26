// app/admin/fraud-ml/page.tsx
'use client';

import { ShieldAlert, Activity, CheckCircle2, XCircle } from 'lucide-react';

const ANOMALIES = [
  { id: 'TX-9982', risk: 92, type: 'Velocity Check', detail: '10 dk içinde 5. sipariş denemesi', status: 'Blocked' },
  { id: 'TX-9983', risk: 88, type: 'Geo Mismatch', detail: 'IP: Russia, Billing: USA', status: 'Review' },
  { id: 'TX-9984', risk: 45, type: 'High Amount', detail: '€2,500 (Ortalamanın 5x üstü)', status: 'Flagged' },
];

export default function FraudMLPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Fraud ML Engine</h1>
          <p className="text-zinc-500 text-sm">Anomaly detection model performansı ve vaka analizi.</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold flex items-center gap-2">
            <Activity size={14} /> Model v2.4 Active
          </span>
        </div>
      </div>

      {/* Model Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <p className="text-xs font-bold text-zinc-500 uppercase">Doğruluk Oranı</p>
          <h3 className="text-3xl font-black text-zinc-900 mt-2">%99.2</h3>
          <p className="text-xs text-emerald-600 mt-1">+0.4% geçen haftaya göre</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <p className="text-xs font-bold text-zinc-500 uppercase">False Positive</p>
          <h3 className="text-3xl font-black text-zinc-900 mt-2">%0.8</h3>
          <p className="text-xs text-zinc-400 mt-1">Hedef: &lt; 1.0%</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <p className="text-xs font-bold text-zinc-500 uppercase">Engellenen Tutar</p>
          <h3 className="text-3xl font-black text-zinc-900 mt-2">€12,450</h3>
          <p className="text-xs text-zinc-400 mt-1">Son 30 gün</p>
        </div>
      </div>

      {/* Live Feed */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 bg-red-50 border-b border-red-100 flex items-center gap-2 text-red-700 font-bold">
          <ShieldAlert size={20} /> Tespit Edilen Anomaliler (Canlı)
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-white text-zinc-500 border-b border-zinc-200">
            <tr>
              <th className="px-6 py-4">Transaction ID</th>
              <th className="px-6 py-4">Risk Skoru</th>
              <th className="px-6 py-4">Anomali Tipi</th>
              <th className="px-6 py-4">Detay</th>
              <th className="px-6 py-4 text-right">AI Kararı</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {ANOMALIES.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-50">
                <td className="px-6 py-4 font-mono text-zinc-600">{item.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-zinc-200 rounded-full overflow-hidden">
                      <div className={`h-full ${item.risk > 80 ? 'bg-red-600' : 'bg-amber-500'}`} style={{ width: `${item.risk}%` }}></div>
                    </div>
                    <span className="font-bold">{item.risk}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{item.type}</td>
                <td className="px-6 py-4 text-zinc-500">{item.detail}</td>
                <td className="px-6 py-4 text-right">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                    item.status === 'Blocked' ? 'bg-red-100 text-red-700' : 
                    item.status === 'Review' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {item.status === 'Blocked' ? <XCircle size={12} /> : <CheckCircle2 size={12} />}
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
