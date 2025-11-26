// app/admin/notifications/page.tsx
'use client';

import { useState } from 'react';
import { Send, Mail, Smartphone, Bell } from 'lucide-react';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<'email' | 'sms' | 'push'>('email');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data: any = Object.fromEntries(formData.entries());
    
    try {
      const endpoint = `/api/notify/${activeTab}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (res.ok) alert('Gönderim Başarılı!');
      else alert('Hata oluştu');
    } catch (err) {
      alert('Sistem hatası');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Bildirim Merkezi</h1>
          <p className="text-zinc-500 text-sm">Kampanya ve duyuru gönderimleri.</p>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
        {/* Tabs */}
        <div className="flex border-b border-zinc-200">
          <button 
            onClick={() => setActiveTab('email')}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'email' ? 'border-b-2 border-black text-black' : 'text-zinc-500 hover:text-zinc-800'}`}
          >
            <Mail size={18} /> E-posta
          </button>
          <button 
            onClick={() => setActiveTab('sms')}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'sms' ? 'border-b-2 border-black text-black' : 'text-zinc-500 hover:text-zinc-800'}`}
          >
            <Smartphone size={18} /> SMS
          </button>
          <button 
            onClick={() => setActiveTab('push')}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'push' ? 'border-b-2 border-black text-black' : 'text-zinc-500 hover:text-zinc-800'}`}
          >
            <Bell size={18} /> Push Bildirim
          </button>
        </div>

        {/* Forms */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
            {activeTab === 'email' && (
              <>
                <div>
                  <label className="block text-sm font-bold mb-2">Alıcı (Email)</label>
                  <input name="to" type="email" placeholder="ornek@site.com" className="w-full border border-zinc-300 rounded-lg p-2.5 text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Konu</label>
                  <input name="subject" type="text" placeholder="Kampanya Başlığı" className="w-full border border-zinc-300 rounded-lg p-2.5 text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">İçerik (HTML)</label>
                  <textarea name="html" rows={6} className="w-full border border-zinc-300 rounded-lg p-2.5 text-sm" placeholder="<p>Merhaba...</p>" required></textarea>
                </div>
              </>
            )}

            {activeTab === 'sms' && (
              <>
                <div>
                  <label className="block text-sm font-bold mb-2">Alıcı (Tel No)</label>
                  <input name="to" type="tel" placeholder="+90555..." className="w-full border border-zinc-300 rounded-lg p-2.5 text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Mesaj</label>
                  <textarea name="message" rows={4} className="w-full border border-zinc-300 rounded-lg p-2.5 text-sm" maxLength={160} placeholder="Kampanya mesajınız..." required></textarea>
                  <p className="text-xs text-zinc-400 mt-1 text-right">Maks 160 karakter</p>
                </div>
              </>
            )}

            {activeTab === 'push' && (
              <>
                <input type="hidden" name="type" value="mobile" />
                <div>
                  <label className="block text-sm font-bold mb-2">Hedef (Expo Token)</label>
                  <input name="target" type="text" placeholder="ExponentPushToken[...]" className="w-full border border-zinc-300 rounded-lg p-2.5 text-sm" required />
                  <p className="text-xs text-zinc-400 mt-1">Çoklu gönderim için virgülle ayırın (Backend'de array'e çevrilmeli)</p>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Mesaj</label>
                  <textarea name="message" rows={3} className="w-full border border-zinc-300 rounded-lg p-2.5 text-sm" placeholder="Bildirim içeriği..." required></textarea>
                </div>
              </>
            )}

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-zinc-900 text-white py-3 rounded-lg font-bold hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Gönderiliyor...' : 'Gönder'} <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
