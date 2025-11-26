'use client';

import { X, Plus, Minus, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Bu bileşen normalde bir Global Context (Zustand/Redux) tarafından kontrol edilir.
// Şimdilik UI gösterimi için local state kullanıyoruz.

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  // Mock Cart Data
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'NOIR OVERSIZED HOODIE', price: 120, quantity: 1, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=200', size: 'L' },
    { id: 2, name: 'OBSIDIAN RING SET', price: 85, quantity: 2, image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&q=80&w=200', size: 'ONESIZE' },
  ]);

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Sidebar Content */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-100">
          <h2 className="text-xl font-heading font-black uppercase tracking-tight">Shopping Bag ({cartItems.length})</h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative w-20 h-24 bg-zinc-100 flex-shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold uppercase tracking-wide pr-4">{item.name}</h3>
                    <span className="text-sm font-bold">€{item.price * item.quantity}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1 uppercase">Size: {item.size}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-zinc-200">
                    <button className="p-1 hover:bg-black hover:text-white transition-colors"><Minus size={12} /></button>
                    <span className="px-2 text-xs font-bold">{item.quantity}</span>
                    <button className="p-1 hover:bg-black hover:text-white transition-colors"><Plus size={12} /></button>
                  </div>
                  <button className="text-xs underline text-zinc-400 hover:text-red-600 transition-colors">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-100 bg-zinc-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold uppercase tracking-widest text-zinc-500">Subtotal</span>
            <span className="text-xl font-bold">€{total}</span>
          </div>
          <p className="text-xs text-zinc-400 mb-6 text-center">Shipping & taxes calculated at checkout.</p>
          <Link 
            href="/checkout" 
            className="w-full bg-black text-white py-4 font-heading font-bold text-lg uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors"
          >
            Checkout <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
