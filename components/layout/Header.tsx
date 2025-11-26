'use client';

import Link from 'next/link';
import { ShoppingBag, Search, Menu, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll efekti için
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-zinc-100 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 flex items-center justify-between">
        
        {/* LEFT: MOBILE MENU & NAV */}
        <div className="flex items-center gap-6">
           <button className="lg:hidden">
             <Menu className={isScrolled ? 'text-black' : 'text-black lg:text-white'} />
           </button>
           <nav className="hidden lg:flex gap-8 text-sm font-bold uppercase tracking-widest">
             <Link href="/products?cat=new" className={`hover:opacity-60 transition-opacity ${isScrolled ? 'text-black' : 'text-white mix-blend-difference'}`}>New</Link>
             <Link href="/products" className={`hover:opacity-60 transition-opacity ${isScrolled ? 'text-black' : 'text-white mix-blend-difference'}`}>Shop</Link>
             <Link href="/collections" className={`hover:opacity-60 transition-opacity ${isScrolled ? 'text-black' : 'text-white mix-blend-difference'}`}>Collections</Link>
           </nav>
        </div>

        {/* CENTER: LOGO */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <span className={`text-3xl font-oswald font-black tracking-tighter ${isScrolled ? 'text-black' : 'text-white mix-blend-difference'}`}>
            ARCHETYPE.
          </span>
        </Link>

        {/* RIGHT: ACTIONS */}
        <div className={`flex items-center gap-6 ${isScrolled ? 'text-black' : 'text-white mix-blend-difference'}`}>
           <button>
             <Search size={20} />
           </button>
           <Link href="/account" className="hidden lg:block">
             <User size={20} />
           </Link>
           <button className="relative">
             <ShoppingBag size={20} />
             <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-full">2</span>
           </button>
        </div>
      </div>
    </header>
  );
}
