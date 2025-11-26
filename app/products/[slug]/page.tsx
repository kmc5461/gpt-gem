import { Star, Truck, RotateCcw } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* LEFT: IMAGE GALLERY */}
        <div className="bg-zinc-100 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] overflow-hidden grid grid-rows-2">
           <img 
             src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1200" 
             className="w-full h-full object-cover" 
             alt="Product Detail 1"
           />
           <div className="hidden lg:grid grid-cols-2">
             <img 
               src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800" 
               className="w-full h-full object-cover border-r border-white" 
               alt="Product Detail 2"
             />
             <img 
               src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800" 
               className="w-full h-full object-cover" 
               alt="Product Detail 3"
             />
           </div>
        </div>

        {/* RIGHT: PRODUCT INFO */}
        <div className="p-8 lg:p-20 flex flex-col justify-center bg-white">
           <div className="mb-8">
             <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-widest mb-4">
                <span>Home</span> / <span>Hoodies</span> / <span>Noir Collection</span>
             </div>
             <h1 className="text-5xl lg:text-7xl font-oswald font-bold tracking-tighter uppercase mb-2">
               Noir Oversized Hoodie
             </h1>
             <div className="flex items-center gap-4">
               <span className="text-2xl font-bold">€120.00</span>
               <div className="flex text-black">
                 {[...Array(5)].map((_,i) => <Star key={i} size={14} fill="black" />)}
                 <span className="text-xs text-zinc-500 ml-2 underline">42 Reviews</span>
               </div>
             </div>
           </div>

           <div className="space-y-8 border-t border-b border-zinc-100 py-8 my-4">
              <p className="text-zinc-600 leading-relaxed">
                Crafted from heavyweight 480gsm French Terry cotton. Features dropped shoulders, a cropped hem, and distressed detailing. The ultimate silhouette for the modern avant-garde wardrobe.
              </p>
              
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-3">
                   <span>Select Size</span>
                   <button className="underline text-zinc-400">Size Guide</button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                   {['S', 'M', 'L', 'XL'].map(size => (
                     <button key={size} className="py-4 border border-zinc-200 hover:border-black hover:bg-black hover:text-white transition-all font-bold">
                       {size}
                     </button>
                   ))}
                </div>
              </div>

              <button className="w-full bg-black text-white py-5 font-oswald font-bold text-xl uppercase tracking-widest hover:bg-zinc-800 transition-colors">
                Add to Cart
              </button>
           </div>

           <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <Truck size={18} />
                <span>Free Express Shipping on orders over €200</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <RotateCcw size={18} />
                <span>14-Day Returns & Exchanges</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
