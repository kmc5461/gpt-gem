// app/admin/logs/page.tsx
'use client';

import { useState } from 'react';
import { Terminal, Filter, Download, RefreshCw, Search, AlertTriangle, Info, CheckCircle } from 'lucide-react';

// Mock Log Data
const MOCK_LOGS = [
  { id: 1, timestamp: '2024-03-15 10:42:01', level: 'info', service: 'order-service', message: 'Order #ORD-1234 created successfully.' },
  { id: 2, timestamp: '2024-03-15 10:42:05', level: 'info', service: 'payment-service', message: 'Payment processed for #ORD-1234.' },
  { id: 3, timestamp: '2024-03-15 10:45:12', level: 'warning', service: 'inventory-service', message: 'Stock low for SKU: HOODIE-BLK-L (Qty: 2).' },
  { id: 4, timestamp: '2024-03-15 10:48:30', level: 'error', service: 'fraud-service', message: 'Timeout connecting to external ML engine.' },
  { id: 5, timestamp: '2024-03-15 10:50:00', level: 'critical', service: 'database', message: 'Connection pool utilization > 90%.' },
  { id: 6, timestamp: '2024-03-15 10:51:22', level: 'info', service: 'web-frontend', message: 'User login: admin@archetype.com' },
];

export default function SystemLogsPage() {
  const [filterLevel, setFilterLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = MOCK_LOGS.filter(log => {
    const matchesLevel = filterLevel === 'all' || log.level === filterLevel;
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.service.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
            <Terminal className="text-zinc-700" /> System Logs
          </h1>
          <p className="text-zinc-500 text-sm">Loki Aggregation Stream (Live)</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-500" title="Refresh">
            <RefreshCw size={18} />
          </button>
          <button className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-500" title="Export">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* Filtreler */}
      <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input 
            type="text" 
            placeholder="Search logs..." 
            className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none focus:border-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-zinc-400" />
          <select 
            className="bg-zinc-50 border border-zinc-200 text-sm rounded-lg px-3 py-2 outline-none focus:border-black"
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Log Konsolu */}
      <div className="flex-1 bg-[#1e1e1e] rounded-xl overflow-hidden border border-zinc-800 font-mono text-sm shadow-inner flex flex-col">
        <div className="p-2 bg-[#2d2d2d] border-b border-[#3e3e3e] flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        
        <div className="flex-1 overflow-auto p-4 space-y-1 custom-scrollbar">
          {filteredLogs.map((log) => (
            <div key={log.id} className="flex gap-3 hover:bg-[#2d2d2d] p-1 rounded group">
              <span className="text-zinc-500 min-w-[150px]">{log.timestamp}</span>
              <span className={`font-bold min-w-[80px] uppercase text-xs flex items-center ${
                log.level === 'info' ? 'text-blue-400' :
                log.level === 'warning' ? 'text-yellow-400' :
                log.level === 'error' ? 'text-red-400' :
                'text-purple-500'
              }`}>
                {log.level}
              </span>
              <span className="text-zinc-400 min-w-[120px] font-bold">[{log.service}]</span>
              <span className="text-zinc-300 flex-1">{log.message}</span>
            </div>
          ))}
          {filteredLogs.length === 0 && (
            <div className="text-zinc-500 text-center py-10 italic">No logs found matching criteria.</div>
          )}
        </div>
      </div>
    </div>
  );
}
