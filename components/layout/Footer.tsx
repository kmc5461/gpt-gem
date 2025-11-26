import Link from 'next/link';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-zinc-900">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* BRAND */}
          <div className="space-y-6">
             <h2 className="text-4xl font-oswald font-black tracking-tighter">ARCHETYPE.</h2>
             <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
               Redefining the intersection of luxury and streetwear. 
               Engineered in Istanbul, worn globally.
             </p>
             <div className="flex gap-4 text-zinc-400">
               <Instagram size={20} className="hover:text-white cursor-pointer"/>
               <Twitter size={20} className="hover:text-white cursor-pointer"/>
               <Facebook size={20} className="hover:text-white cursor-pointer"/>
             </div>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="font-bold uppercase tracking-widest mb-6 text-sm">Shop</h3>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Accessories</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Gift Cards</Link></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="font-bold uppercase tracking-widest mb-6 text-sm">Support</h3>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Size Guide</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="font-bold uppercase tracking-widest mb-6 text-sm">Stay Updated</h3>
            <p className="text-zinc-500 text-xs mb-4">Subscribe for exclusive drops and early access.</p>
            <div className="flex border-b border-zinc-700 pb-2">
               <input 
                 type="email" 
                 placeholder="ENTER EMAIL ADDRESS" 
                 className="bg-transparent w-full outline-none text-sm placeholder-zinc-600 uppercase"
               />
               <button className="text-xs font-bold uppercase hover:text-zinc-400">Join</button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 uppercase tracking-wider pt-8 border-t border-zinc-900">
           <p>© 2024 ARCHETYPE STUDIOS. ALL RIGHTS RESERVED.</p>
           <div className="flex gap-6 mt-4 md:mt-0">
             <span>Privacy Policy</span>
             <span>Terms of Service</span>
           </div>
        </div>
      </div>
    </footer>
  );
}
