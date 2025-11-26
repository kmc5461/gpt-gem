// app/admin/analytics/page.tsx
'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { ArrowUpRight, Package } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SALES_DATA = {
  labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'],
  datasets: [
    {
      label: 'Gerçekleşen Ciro',
      data: [12000, 19000, 3000, 5000, 2000, 3000],
      borderColor: 'rgb(37, 99, 235)',
      backgroundColor: 'rgba(37, 99, 235, 0.5)',
      tension: 0.4,
    },
    {
      label: 'AI Tahmini',
      data: [13000, 18000, 4000, 6000, 3000, 5000], // Gelecek projeksiyonu
      borderColor: 'rgb(16, 185, 129)',
      borderDash: [5, 5],
      tension: 0.4,
    }
  ],
};

const TOP_PRODUCTS = [
  { name: 'Noir Hoodie', sales: 1200, revenue: '€144,000' },
  { name: 'Trench Coat', sales: 850, revenue: '€382,500' },
  { name: 'Combat Boots', sales: 600, revenue: '€168,000' },
  { name: 'Silk Shirt', sales: 450, revenue: '€81,000' },
  { name: 'Cargo Pants', sales: 300, revenue: '€48,000' },
];

const OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' as const },
    title: { display: false },
  },
  scales: {
    y: { beginAtZero: true, grid: { color: '#f4f4f5' } },
    x: { grid: { display: false } }
  }
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Tahminsel Analitik</h1>
          <p className="text-zinc-500 text-sm">Gelecek dönem satış projeksiyonları ve performans raporları.</p>
        </div>
        <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
            <ArrowUpRight size={16} /> Büyüme Beklentisi: +18%
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ana Grafik */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-800 mb-6">Ciro Trendi & AI Tahmini</h3>
            <div className="h-[350px]">
                <Line data={SALES_DATA} options={OPTIONS} />
            </div>
        </div>

        {/* Top Ürünler */}
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-800 mb-6">En Çok Satanlar (Top 5)</h3>
            <div className="space-y-4">
                {TOP_PRODUCTS.map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-3 hover:bg-zinc-50 rounded-lg transition-colors border border-transparent hover:border-zinc-100">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-zinc-100 rounded flex items-center justify-center text-zinc-500 font-bold text-xs">
                                {i + 1}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-zinc-900">{p.name}</p>
                                <p className="text-xs text-zinc-500">{p.sales} adet</p>
                            </div>
                        </div>
                        <span className="text-sm font-bold text-zinc-900">{p.revenue}</span>
                    </div>
                ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm text-zinc-500 hover:text-zinc-900 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors">
                Tüm Raporu İndir
            </button>
        </div>
      </div>
    </div>
  );
}
