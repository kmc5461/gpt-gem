// components/products/ProductCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data';
import { Locale } from '@/lib/i18n';

interface ProductCardProps {
  product: Product;
  dict: any;
  locale: Locale;
}

export default function ProductCard({ product, dict, locale }: ProductCardProps) {
  // Dile göre isim seçimi
  const name = locale === 'tr' ? product.name_tr : product.name_en;

  return (
    <div className="group flex flex-col h-full">
      <Link href={`/products/${product.slug}`} className="block relative overflow-hidden bg-zinc-100 aspect-[3/4] mb-4 cursor-pointer">
        {/* Görsel */}
        <Image
          src={product.images[0]}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:saturate-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Stok Durumu (Eğer yoksa) */}
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
            Sold Out
          </div>
        )}

        {/* Hover Action */}
        <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
           <button className="w-full bg-white text-black font-bold uppercase text-xs py-4 tracking-widest hover:bg-black hover:text-white transition-colors border-t border-black">
             {dict.common.addToCart}
           </button>
        </div>
      </Link>

      {/* Bilgiler */}
      <div className="flex flex-col flex-1 space-y-1">
        <h3 className="text-sm font-heading font-bold uppercase tracking-wide leading-tight group-hover:underline underline-offset-4 decoration-1">
          <Link href={`/products/${product.slug}`}>{name}</Link>
        </h3>
        <div className="flex justify-between items-center mt-auto pt-2">
           <span className="text-sm font-medium text-zinc-900">{product.price} {product.currency}</span>
        </div>
      </div>
    </div>
  );
}
