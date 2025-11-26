// components/admin/AdminSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ListTree, 
  ShoppingCart, 
  RotateCcw, 
  ShieldAlert, 
  Zap, 
  BarChart3, 
  Activity, 
  Settings,
  LogOut
} from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Ürünler', href: '/admin/products', icon: Package },
  { name: 'Kategoriler', href: '/admin/categories', icon: ListTree },
  { name: 'Siparişler', href: '/admin/orders', icon: ShoppingCart },
  { name: 'RMA (İade)', href: '/admin/rma', icon: RotateCcw },
  { name: 'Fraud Kontrol', href: '/admin/fraud', icon: ShieldAlert },
  { name: 'Fiyat Motoru', href: '/admin/pricing', icon: Zap },
  { name: 'Analitik', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Activity Logs', href: '/admin/logs', icon: Activity },
  { name: 'Ayarlar', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-zinc-950 text-white flex flex-col border-r border-zinc-800 z-50">
      {/* Logo Alanı */}
      <div className="h-16 flex items-center px-6 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
            A
          </div>
          <span className="font-bold text-lg tracking-tight">ARCHETYPE<span className="text-zinc-500">OS</span></span>
        </div>
      </div>

      {/* Menü Linkleri */}
      <nav className="flex-1 overflow-y-auto admin-scroll p-4 space-y-1">
        <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 px-2">Menu</div>
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Alt Profil/Çıkış */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
        <button className="flex items-center gap-3 w-full px-3 py-2 text-zinc-400 hover:text-red-400 transition-colors text-sm font-medium">
          <LogOut size={18} />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
