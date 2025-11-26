import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  category: string;
  slug: string;
}

export default function ProductCard({ id, name, price, originalPrice, image, category, slug }: ProductCardProps) {
  return (
    <Link href={`/products/${slug}`} className="group block h-full">
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 mb-4">
        {/* Ana Görsel */}
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 group-hover:saturate-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* İndirim Rozeti */}
        {originalPrice && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-10">
            Sale
          </div>
        )}

        {/* Hover'da Çıkan "Hızlı Ekle" Butonu */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
          <button className="w-full bg-white/90 backdrop-blur-sm text-black font-bold uppercase text-xs py-3 tracking-widest hover:bg-black hover:text-white transition-colors">
            Quick Add
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{category}</p>
        <h3 className="text-sm font-heading font-bold uppercase tracking-wide group-hover:underline decoration-1 underline-offset-4">{name}</h3>
        <div className="flex gap-3 text-sm font-medium">
          <span className={originalPrice ? 'text-red-600' : 'text-black'}>{price}</span>
          {originalPrice && (
            <span className="text-zinc-400 line-through text-xs mt-0.5">{originalPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
