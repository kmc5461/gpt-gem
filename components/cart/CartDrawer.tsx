// components/cart/CartDrawer.tsx
'use client';

import { useCartStore } from '@/store/cartStore';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CartDrawerProps {
  dict: any; // i18n dictionary
}

export default function CartDrawer({ dict }: CartDrawerProps) {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getCartTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Hydration hatasını önlemek için
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={closeCart}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <h2 className="text-lg font-heading font-black uppercase tracking-wide">
              {dict?.cart?.title || 'Shopping Bag'} ({items.length})
            </h2>
          </div>
          <button 
            onClick={closeCart}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingBag size={48} className="text-zinc-200" />
              <p className="text-zinc-500 font-medium">Your bag is empty.</p>
              <button 
                onClick={closeCart}
                className="text-xs font-bold uppercase underline tracking-widest hover:text-black"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex gap-4 animate-in fade-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className="relative w-20 h-24 bg-zinc-100 flex-shrink-0 overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-bold uppercase tracking-wide pr-4 leading-tight">
                        <Link href={`/products/${item.slug}`} onClick={closeCart}>{item.name}</Link>
                      </h3>
                      <span className="text-sm font-bold">{item.price * item.quantity} €</span>
                    </div>
                    {item.variant && (
                      <p className="text-[10px] text-zinc-500 mt-1 uppercase font-bold tracking-wider">
                        {item.variant.size} / {item.variant.color}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-zinc-200 h-8">
                      <button 
                        onClick={() => updateQuantity(item.id, -1, item.variant)}
                        className="w-8 h-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 h-full flex items-center justify-center text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1, item.variant)}
                        className="w-8 h-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id, item.variant)}
                      className="text-zinc-400 hover:text-red-600 transition-colors p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-zinc-100 bg-zinc-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Subtotal</span>
              <span className="text-xl font-bold">{getCartTotal()} €</span>
            </div>
            <p className="text-[10px] text-zinc-400 mb-6 text-center">
              Shipping & taxes calculated at checkout.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Link 
                href="/cart"
                onClick={closeCart}
                className="w-full border border-black text-black py-4 font-heading font-bold text-sm uppercase tracking-widest flex items-center justify-center hover:bg-zinc-100 transition-colors"
              >
                View Cart
              </Link>
              <Link 
                href="/checkout" 
                onClick={closeCart}
                className="w-full bg-black text-white py-4 font-heading font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors"
              >
                Checkout <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
