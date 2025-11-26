import { ShieldCheck, CreditCard, Apple } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      
      {/* SOL: Form Alanı */}
      <div className="p-8 lg:p-20 order-2 lg:order-1">
        <div className="max-w-xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-heading font-black uppercase tracking-tighter">Checkout</h1>
            <Link href="/cart" className="text-xs font-bold underline text-zinc-500">Return to Cart</Link>
          </div>

          {/* Express Checkout */}
          <div className="grid grid-cols-2 gap-4">
             <button className="flex items-center justify-center gap-2 bg-[#F7C52F] text-black py-3 rounded font-bold text-sm hover:opacity-90 transition-opacity">
               <span className="font-sans font-bold italic">PayPal</span>
             </button>
             <button className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded font-bold text-sm hover:opacity-90 transition-opacity">
               <Apple size={16} fill="white" /> Pay
             </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-200"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-zinc-400">Or pay with card</span></div>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-widest">Contact</h2>
              <input type="email" placeholder="Email Address" className="w-full p-3 border border-zinc-200 text-sm outline-none focus:border-black transition-colors" />
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-widest">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="w-full p-3 border border-zinc-200 text-sm outline-none focus:border-black transition-colors" />
                <input type="text" placeholder="Last Name" className="w-full p-3 border border-zinc-200 text-sm outline-none focus:border-black transition-colors" />
              </div>
              <input type="text" placeholder="Address Line 1" className="w-full p-3 border border-zinc-200 text-sm outline-none focus:border-black transition-colors" />
              <div className="grid grid-cols-3 gap-4">
                <input type="text" placeholder="City" className="w-full p-3 border border-zinc-200 text-sm outline-none focus:border-black transition-colors" />
                <input type="text" placeholder="State" className="w-full p-3 border border-zinc-200 text-sm outline-none focus:border-black transition-colors" />
                <input type="text" placeholder="ZIP" className="w-full p-3 border border-zinc-200 text-sm outline-none focus:border-black transition-colors" />
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <h2 className="text-sm font-bold uppercase tracking-widest">Payment</h2>
              <div className="border border-zinc-200 p-4 rounded bg-zinc-50">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard size={20} />
                  <span className="text-sm font-medium">Credit Card</span>
                </div>
                <div className="space-y-4">
                   <input type="text" placeholder="Card Number" className="w-full p-3 border border-zinc-200 bg-white text-sm outline-none focus:border-black transition-colors" />
                   <div className="grid grid-cols-2 gap-4">
                     <input type="text" placeholder="MM / YY" className="w-full p-3 border border-zinc-200 bg-white text-sm outline-none focus:border-black transition-colors" />
                     <input type="text" placeholder="CVC" className="w-full p-3 border border-zinc-200 bg-white text-sm outline-none focus:border-black transition-colors" />
                   </div>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-black text-white py-5 font-heading font-bold text-lg uppercase tracking-widest hover:bg-zinc-800 transition-colors mt-8">
              Pay €205.00
            </button>
          </form>
        </div>
      </div>

      {/* SAĞ: Özet (Masaüstünde) */}
      <div className="bg-zinc-50 p-8 lg:p-20 order-1 lg:order-2 border-b lg:border-l border-zinc-200">
        <div className="max-w-md lg:mx-0 mx-auto space-y-8 sticky top-20">
          {/* Ürün Listesi */}
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4 items-center">
                 <div className="relative w-16 h-20 bg-white border border-zinc-200 rounded overflow-hidden">
                    <Image src={`https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=200`} alt="Product" fill className="object-cover" />
                    <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-bl font-bold">1</span>
                 </div>
                 <div className="flex-1">
                    <h3 className="text-sm font-bold">Noir Oversized Hoodie</h3>
                    <p className="text-xs text-zinc-500">L / Black</p>
                 </div>
                 <span className="text-sm font-bold">€120.00</span>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-200 pt-6 space-y-3">
             <div className="flex justify-between text-sm">
               <span className="text-zinc-500">Subtotal</span>
               <span className="font-bold">€205.00</span>
             </div>
             <div className="flex justify-between text-sm">
               <span className="text-zinc-500">Shipping</span>
               <span className="font-bold">Free</span>
             </div>
             <div className="flex justify-between text-lg border-t border-zinc-200 pt-3">
               <span className="font-bold">Total</span>
               <span className="font-black">€205.00</span>
             </div>
          </div>

          <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 p-4 rounded text-xs font-bold">
            <ShieldCheck size={16} />
            <span>Secure SSL Encrypted Transaction</span>
          </div>
        </div>
      </div>
    </div>
  );
}
