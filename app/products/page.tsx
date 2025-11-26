import Link from 'next/link';

export default function ProductListingPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* SIDEBAR FILTERS (Sticky) */}
        <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-24 md:h-[calc(100vh-6rem)] overflow-y-auto hidden md:block">
          <div className="space-y-8 pb-12">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-2">Categories</h3>
              <ul className="space-y-3 text-sm text-zinc-600">
                {['All Products', 'New Arrivals', 'Hoodies', 'T-Shirts', 'Pants', 'Accessories'].map((cat, i) => (
                  <li key={i} className="hover:text-black cursor-pointer transition-colors">{cat}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-2">Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button key={size} className="border border-zinc-200 py-2 text-xs hover:border-black hover:bg-black hover:text-white transition-all">
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* PRODUCT GRID */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-oswald font-bold uppercase">All Products <span className="text-zinc-400 text-lg ml-2">(24)</span></h1>
            <button className="md:hidden text-sm uppercase font-bold underline">Filter</button>
            <div className="hidden md:flex gap-4 text-sm">
               <span className="text-zinc-400">Sort by:</span>
               <select className="bg-transparent font-bold outline-none">
                 <option>Featured</option>
                 <option>Price: Low to High</option>
                 <option>Price: High to Low</option>
               </select>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {/* Mock Products Generation */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Link href={`/products/demo-product`} key={i} className="group">
                <div className="aspect-[3/4] bg-zinc-100 mb-4 overflow-hidden relative">
                   <img 
                     src={`https://source.unsplash.com/random/600x800?fashion,dark&sig=${i}`} 
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 saturate-0 group-hover:saturate-100"
                     alt="Product" 
                   />
                   {i === 2 && <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase">Sold Out</span>}
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide">Essential Tee</h3>
                    <p className="text-xs text-zinc-500 mt-1">Oversized Fit</p>
                  </div>
                  <span className="text-sm font-bold">€45</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
