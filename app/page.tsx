import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Mock Data
const LATEST_DROPS = [
  { id: 1, name: 'NOIR OVERSIZED HOODIE', price: '120 €', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'TRENCH COAT V2', price: '450 €', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'LEATHER COMBAT BOOTS', price: '280 €', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800' },
];

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative h-[90vh] w-full bg-zinc-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-70">
           {/* Placeholder for Hero Video/Image */}
           <img 
             src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2000" 
             className="w-full h-full object-cover grayscale"
             alt="Season Campaign"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>
        
        <div className="relative z-10 text-center text-white space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <h2 className="text-sm md:text-base tracking-[0.5em] font-medium text-zinc-300">EST. 2024 / ISTANBUL</h2>
          <h1 className="text-7xl md:text-9xl font-oswald font-bold tracking-tighter leading-none">
            SEASON <br className="md:hidden" /> 02 / 24
          </h1>
          <div className="flex justify-center gap-4 pt-8">
            <Link 
              href="/products" 
              className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
            >
              Shop Collection
            </Link>
            <Link 
              href="/products?cat=new" 
              className="px-8 py-4 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              View Lookbook
            </Link>
          </div>
        </div>
      </section>

      {/* TRENDING SECTION */}
      <section className="py-24 px-6 max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-5xl font-oswald font-bold uppercase">Latest Drops</h2>
          <Link href="/products" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wide hover:text-zinc-500 transition-colors">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LATEST_DROPS.map((product) => (
            <Link href={`/products/product-slug`} key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 mb-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 backdrop-blur-sm">
                   <span className="text-xs font-bold uppercase tracking-widest">Quick Add</span>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold font-oswald tracking-wide">{product.name}</h3>
                <p className="text-sm text-zinc-500 font-medium">{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CATEGORY MARQUEE */}
      <section className="py-20 bg-black text-white overflow-hidden whitespace-nowrap border-t border-zinc-800">
         <div className="animate-marquee inline-block text-8xl font-oswald font-black opacity-20 hover:opacity-100 transition-opacity duration-500 cursor-default">
            HOODIES — JACKETS — ACCESSORIES — FOOTWEAR — DENIM — HOODIES — JACKETS —
         </div>
      </section>
    </>
  );
}