// app/cart/page.tsx
'use client';

import { useCartStore } from '@/store/cartStore';
import { getDictionary } from '@/lib/i18n'; // Client-safe dictionary fetcher
import { Locale } from '@/lib/i18n';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getCartTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [dict, setDict] = useState<any>(null);

  // Client-side i18n loading
  useEffect(() => {
    const loadDict = async () => {
      const d = await getDictionary('tr'); // Varsayılan TR, gerçekte cookieden okunmalı
      setDict(d);
    };
    loadDict();
    setMounted(true);
  }, []);

  if (!mounted || !dict) return <div className="min-h-screen bg-white" />;

  const subtotal = getCartTotal();
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white pt-10 pb-20">
      <div className="max-w-screen-xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter mb-12 border-b border-zinc-100 pb-6">
          Your Cart ({items.length})
        </h1>

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-zinc-500 mb-8">Your shopping bag is empty.</p>
            <Link href="/products" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors">
              <ArrowLeft size={16} /> Return to Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Ürün Listesi */}
            <div className="lg:col-span-8 space-y-8">
              {items.map((item) => (
                <div key={`${item.id}-${JSON.stringify(item.variant)}`} className="flex gap-6 border-b border-zinc-100 pb-8 last:border-0">
                  <div className="relative w-24 h-32 md:w-32 md:h-40 bg-zinc-100 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-heading font-bold uppercase tracking-wide">
                        <Link href={`/products/${item.slug}`}>{item.name}</Link>
                      </h3>
                      <div className="mt-2 space-y-1 text-xs font-bold uppercase tracking-wider text-zinc-500">
                        {item.variant?.size && <p>Size: {item.variant.size}</p>}
                        {item.variant?.color && <p>Color: {item.variant.color}</p>}
                        <p className="text-black mt-2">{item.price} €</p>
                      </div>
                    </div>

                    <div className="flex items-start justify-between md:justify-end gap-6">
                      <div className="flex items-center border border-zinc-200 h-10">
                        <button 
                          onClick={() => updateQuantity(item.id, -1, item.variant)}
                          className="w-10 h-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-12 h-full flex items-center justify-center text-sm font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1, item.variant)}
                          className="w-10 h-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold">{item.price * item.quantity} €</p>
                        <button 
                          onClick={() => removeItem(item.id, item.variant)}
                          className="text-xs text-red-500 hover:text-red-700 underline mt-2 inline-flex items-center gap-1"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={clearCart}
                className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors"
              >
                Clear Shopping Cart
              </button>
            </div>

            {/* Özet Alanı */}
            <div className="lg:col-span-4">
              <div className="bg-zinc-50 p-8 sticky top-24">
                <h2 className="text-lg font-heading font-bold uppercase tracking-widest mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Subtotal</span>
                    <span className="font-bold">{subtotal} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Shipping</span>
                    <span className="font-bold">{shipping === 0 ? 'Free' : `${shipping} €`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Tax (Included)</span>
                    <span className="font-bold">{(subtotal * 0.18).toFixed(2)} €</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-bold border-t border-zinc-200 pt-6 mb-8">
                  <span>Total</span>
                  <span>{total} €</span>
                </div>

                <Link 
                  href="/checkout"
                  className="w-full bg-black text-white py-4 font-heading font-bold text-lg uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors shadow-lg"
                >
                  Proceed to Checkout <ArrowRight size={18} />
                </Link>
                
                <div className="mt-6 flex items-center gap-3 justify-center text-zinc-400">
                  <ShieldCheck size={16} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Secure Checkout</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
