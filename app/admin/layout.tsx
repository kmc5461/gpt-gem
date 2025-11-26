import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings, ShieldAlert, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Package, label: 'Products', href: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
    { icon: Users, label: 'Customers', href: '/admin/customers' },
    { icon: ShieldAlert, label: 'Fraud Detection', href: '/admin/fraud' },
    { icon: Zap, label: 'Pricing Engine', href: '/admin/pricing' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col fixed h-full z-10">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
           <span className="font-heading font-black text-xl tracking-tighter">ARCHETYPE <span className="text-zinc-600">OS</span></span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold">AD</div>
            <div className="text-xs">
              <div className="text-white font-bold">Admin User</div>
              <div className="text-zinc-500">Super Admin</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 bg-black min-h-screen">
        <header className="h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur sticky top-0 z-20 flex items-center justify-between px-8">
           <h1 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Enterprise Control Center</h1>
           <div className="flex items-center gap-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-mono text-emerald-500">SYSTEM ONLINE</span>
           </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
