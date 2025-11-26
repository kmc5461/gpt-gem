// app/api/search/route.ts
import { NextResponse } from 'next/server';
import { searchClient, INDEX_NAME } from '@/lib/search/client';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const sort = searchParams.get('sort'); // örn: 'price:asc'

  const index = searchClient.index(INDEX_NAME);

  // Filtreleri oluştur
  const filter: string[] = [];
  if (category) filter.push(`category = "${category}"`);
  if (minPrice) filter.push(`price >= ${minPrice}`);
  if (maxPrice) filter.push(`price <= ${maxPrice}`);
  // Sadece stokta olanları göster
  filter.push('inStock = true');

  try {
    const searchResults = await index.search(query, {
      filter: filter,
      sort: sort ? [sort] : ['demandScore:desc'], // Varsayılan: popülerlik
      limit: 20,
      attributesToHighlight: ['name'], // Eşleşen kelimeleri vurgula
    });

    return NextResponse.json(searchResults);
  } catch (error: any) {
    console.error('Search API Error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
