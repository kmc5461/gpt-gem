// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getLocale, getDictionary } from '@/lib/i18n-server';
import { getCategoryBySlug, getProductsByCategory } from '@/lib/data';
import ProductCard from '@/components/products/ProductCard';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.id);
  const categoryName = locale === 'tr' ? category.name_tr : category.name_en;

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-12 md:py-20">
      <div className="mb-12 border-b border-zinc-100 pb-8 text-center md:text-left">
        <span className="text-xs font-bold text-zinc-400 tracking-widest uppercase block mb-3">Category</span>
        <h1 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter">
          {categoryName}
        </h1>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              dict={dict} 
              locale={locale} 
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
           <p className="text-zinc-400 font-bold uppercase tracking-widest">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
