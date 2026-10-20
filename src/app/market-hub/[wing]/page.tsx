import React from 'react';
export const dynamic = 'force-dynamic';
import { getWingBySlug, getProductsByWingId } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { ArrowLeft, HelpCircle, Sparkles } from 'lucide-react';

interface PageProps {
  params: Promise<{ wing: string }>;
  searchParams: Promise<{ item?: string }>;
}

const BRAND_INFO: Record<string, { headline: string; description: string }> = {
  sunbelle: {
    headline: '✨ Sunbelle Jewelry Collection',
    description: 'Sunbelle is one of Lagos finest gold-plated jewelry brands, known for its elegant earring sets and stunning earring & pendant combinations. Every Sunbelle piece is non-tarnish, crafted to maintain its shine and last long even with daily wear. Each piece is designed to turn heads. Browse our latest Sunbelle inventory below — all items available for immediate WhatsApp order and delivery.'
  },
  xuping: {
    headline: '💎 Xuping Jewelry Collection',
    description: 'Xuping is a premium Chinese gold-plated jewelry brand trusted by thousands of Nigerian buyers. All Xuping pieces are non-tarnish, renowned for their bold designs, long-lasting finish, and affordable luxury. From classic earrings to statement earring & pendant sets, Xuping pieces are perfect for everyday wear and special occasions without losing their shine.'
  },
  cf: {
    headline: '🌟 CF Jewelry Collection',
    description: 'CF Jewelry offers a wide range of beautifully crafted non-tarnish gold-plated pieces that combine modern style with traditional elegance. Popular among Lagos market buyers for their quality finish, durability, and variety of designs. Perfect for gifting or personal styling — guaranteed to stay shiny.'
  },
  jbl: {
    headline: '👑 JBL Jewelry Collection',
    description: 'JBL Jewelry is a top-tier non-tarnish gold-plated brand offering three distinct categories — classic earrings, earring & pendant sets, and luxurious long sets. All JBL pieces are built to last without tarnishing. Whether you are dressing up for an event or looking for an everyday accessory, JBL has something for every occasion and budget.'
  },
};

export default async function MarketWingPage({ params, searchParams }: PageProps) {
  const { wing: currentWingSlug } = await params;
  const { item: itemFilter } = await searchParams;

  const wing = await getWingBySlug(currentWingSlug);
  const products = wing ? await getProductsByWingId(wing.id) : null;

  const filtered = itemFilter && products
    ? products.filter((p: any) => p.sub_category?.toLowerCase().includes(itemFilter.toLowerCase()) || p.name?.toLowerCase().includes(itemFilter.toLowerCase()))
    : products;

  const wingLabel = currentWingSlug.replace(/-/g, ' ');

  return (
    <div className="min-h-screen pb-16" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #fce7f3 40%, #fff7ed 100%)' }}>

      <div className="pointer-events-none fixed inset-0 z-0" style={{ background: 'radial-gradient(ellipse at 20% 20%, rgba(212,175,55,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(192,132,252,0.10) 0%, transparent 60%)' }} />

      {/* Header bar */}
      <header className="sticky top-0 z-50 px-6 py-3 flex items-center justify-between shadow-md" style={{ background: 'linear-gradient(90deg, #2d1b4e 0%, #6b21a8 50%, #2d1b4e 100%)', borderBottom: '2px solid #d4af37' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #d4af37, #f9e077, #b8860b)', boxShadow: '0 0 10px rgba(212,175,55,0.5)' }}>
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-black tracking-widest uppercase gold-glitter">Lagos Jewelry Market</span>
        </div>
        <Link href="/" className="text-xs font-bold flex items-center gap-1 transition" style={{ color: '#f9e077' }}>
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Link>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-8">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-0.5 flex-1 rounded-full" style={{ background: 'linear-gradient(90deg, #d4af37, transparent)' }} />
          <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid #d4af37', color: '#6b21a8' }}>
            {itemFilter ? `${wingLabel} › ${itemFilter}` : wingLabel}
          </span>
          <div className="h-0.5 flex-1 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #d4af37)' }} />
        </div>

        {/* Item sub-filter pills — show if came from a tag click */}
        {itemFilter && (
          <div className="mb-6 flex items-center gap-2">
            <span className="text-[10px] text-purple-700 font-bold uppercase tracking-wider">Filtered by:</span>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-md" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(219,39,119,0.12))', border: '1px solid rgba(212,175,55,0.5)', color: '#6b21a8' }}>
              {itemFilter}
            </span>
            <Link href={`/market-hub/${currentWingSlug}`} className="text-[10px] text-pink-600 font-bold underline">Clear filter</Link>
          </div>
        )}

        {/* Brand writeup — shows when filtering by brand */}
        {itemFilter && BRAND_INFO[itemFilter.toLowerCase()] && (
          <div className="mb-8 rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.75)', border: '1.5px solid rgba(212,175,55,0.3)', backdropFilter: 'blur(12px)' }}>
            <div className="h-0.5 w-10 rounded-full mb-3" style={{ background: 'linear-gradient(90deg, #d4af37, #f9e077)' }} />
            <h2 className="text-base font-black mb-2" style={{ color: '#2d1b4e' }}>{BRAND_INFO[itemFilter.toLowerCase()].headline}</h2>
            <p className="text-xs leading-relaxed" style={{ color: '#6b21a8' }}>{BRAND_INFO[itemFilter.toLowerCase()].description}</p>
          </div>
        )}

        {filtered && filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((product: any) => (
              <ProductCard key={product.id} item={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl max-w-md mx-auto mt-12 p-8" style={{ background: 'rgba(255,255,255,0.75)', border: '1.5px dashed rgba(212,175,55,0.4)' }}>
            <HelpCircle className="w-8 h-8 mx-auto mb-2" style={{ color: '#d4af37' }} />
            <h3 className="font-bold text-sm" style={{ color: '#2d1b4e' }}>No Inventory Available</h3>
            <p className="text-xs text-pink-600 mt-1">Vendors have not uploaded listings to this section yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
