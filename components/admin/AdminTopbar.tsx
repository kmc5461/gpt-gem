// components/admin/AdminTopbar.tsx
'use client';

import { Search, Bell, User } from 'lucide-react';

export default function AdminTopbar() {
  return (
    <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-8 sticky top-0 z-40">
      {/* Arama Barı */}
      <div className="flex items-center w-96">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Ara (Ctrl + K)..." 
            className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
          />
        </div>
      </div>

      {/* Sağ Aksiyonlar */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">System Online</span>
        </div>
        
        <div className="h-6 w-px bg-zinc-200 mx-2"></div>

        <button className="relative p-2 text-zinc-500 hover:bg-zinc-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-zinc-50 p-1 rounded-lg transition-colors">
          <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center text-white">
            <User size={16} />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-bold text-zinc-800 leading-none">Admin User</p>
            <p className="text-xs text-zinc-500 mt-0.5">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
