'use client';

import { DollarSign, ShoppingBag, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DATA = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '€124,500', change: '+12.5%', icon: DollarSign, positive: true },
          { label: 'Total Orders', value: '1,234', change: '+8.2%', icon: ShoppingBag, positive: true },
          { label: 'Active Customers', value: '3,421', change: '-2.1%', icon: Users, positive: false },
          { label: 'Avg Order Value', value: '€325', change: '+5.4%', icon: ArrowUpRight, positive: true },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
             <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400">
                  <stat.icon size={20} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded ${stat.positive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                   {stat.change}
                   {stat.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                </div>
             </div>
             <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
             <div className="text-xs text-zinc-500 uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
           <h3 className="text-lg font-bold text-white mb-6">Revenue Analytics</h3>
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={DATA}>
                 <defs>
                   <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#fff" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                 <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                 <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `€${value}`} />
                 <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                 />
                 <Area type="monotone" dataKey="revenue" stroke="#fff" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
           <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
           <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                   <div className="flex-1">
                      <p className="text-sm text-zinc-300 font-medium">New order #ORD-772{i}</p>
                      <p className="text-xs text-zinc-600">2 minutes ago</p>
                   </div>
                   <span className="text-sm font-bold text-white">€120.00</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
