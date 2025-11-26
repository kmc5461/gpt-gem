// app/admin/users/page.tsx
import React from 'react';
import { Search, User, Shield, MoreHorizontal, Lock, Unlock, Mail } from 'lucide-react';

// Mock Data (Gerçekte Prisma ile çekilecek)
const USERS = [
  { id: '1', name: 'Ahmet Yılmaz', email: 'ahmet@example.com', role: 'ADMIN', status: 'Active', twoFactor: true, lastLogin: '2 dakika önce' },
  { id: '2', name: 'Mehmet Demir', email: 'mehmet@seller.com', role: 'SELLER', status: 'Active', twoFactor: false, lastLogin: '1 gün önce' },
  { id: '3', name: 'Ayşe Kaya', email: 'ayse@customer.com', role: 'CUSTOMER', status: 'Suspended', twoFactor: false, lastLogin: '1 hafta önce' },
  { id: '4', name: 'Fatma Çelik', email: 'fatma@support.com', role: 'SUPPORT', status: 'Active', twoFactor: true, lastLogin: '3 saat önce' },
  { id: '5', name: 'Ali Veli', email: 'ali@test.com', role: 'CUSTOMER', status: 'Active', twoFactor: false, lastLogin: '5 gün önce' },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6 p-8 bg-zinc-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Kullanıcı Yönetimi</h1>
          <p className="text-zinc-500 text-sm">Sistemdeki tüm kullanıcıların rolleri ve erişim durumları.</p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-zinc-800 transition-colors flex items-center gap-2">
          <User size={16} /> Yeni Kullanıcı Ekle
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input 
            type="text" 
            placeholder="İsim, email veya ID ara..." 
            className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none focus:border-black transition-colors"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="bg-zinc-50 border border-zinc-200 text-sm rounded-lg px-3 py-2 outline-none focus:border-black">
            <option value="all">Tüm Roller</option>
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
            <option value="customer">Customer</option>
          </select>
          <select className="bg-zinc-50 border border-zinc-200 text-sm rounded-lg px-3 py-2 outline-none focus:border-black">
            <option value="all">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="suspended">Askıda</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 text-zinc-500 font-medium border-b border-zinc-200">
              <tr>
                <th className="px-6 py-4">Kullanıcı</th>
                <th className="px-6 py-4">Rol (RBAC)</th>
                <th className="px-6 py-4">Durum</th>
                <th className="px-6 py-4">2FA</th>
                <th className="px-6 py-4">Son Giriş</th>
                <th className="px-6 py-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {USERS.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 font-bold text-xs">
                        {user.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-zinc-900">{user.name}</div>
                        <div className="text-xs text-zinc-500 flex items-center gap-1">
                          <Mail size={10} /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                      user.role === 'ADMIN' ? 'bg-zinc-900 text-white border-zinc-900' :
                      user.role === 'SELLER' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      user.role === 'SUPPORT' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                      'bg-gray-50 text-gray-600 border-gray-200'
                    }`}>
                      <Shield size={10} />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      user.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.twoFactor ? (
                      <span className="text-emerald-600 flex items-center gap-1 text-xs font-bold">
                        <Lock size={12} /> Açık
                      </span>
                    ) : (
                      <span className="text-zinc-400 flex items-center gap-1 text-xs font-medium">
                        <Unlock size={12} /> Kapalı
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-zinc-500 text-xs">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
