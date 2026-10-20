import React from 'react';
export const dynamic = 'force-dynamic';
import { getWingBySlug, getProductsByWingId } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { ArrowLeft, HelpCircle, Sparkles, ArrowRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ wing: string }>;
  searchParams: Promise<{ item?: string; cat?: string }>;
}

const BRAND_INFO: Record<string, {
  headline: string;
  description: string;
  categories: { label: string; subcat: string; price: string; icon: string }[];
}> = {
  sunbelle: {
    headline: '✨ Sunbelle Jewelry Collection',
    description: 'Sunbelle is one of Lagos finest gold-plated jewelry brands, known for its elegant earring sets and stunning earring & pendant combinations. Every Sunbelle piece is non-tarnish, crafted to maintain its shine and last long even with daily wear. All items available for immediate WhatsApp order and delivery.',
    categories: [
      { label: 'Sunbelle Earring', subcat: 'sunbelle earring', price: '₦5,000', icon: '💛' },
      { label: 'Sunbelle Earring & Pendant', subcat: 'sunbelle earring and pendant', price: '₦8,000', icon: '💎' },
    ]
  },
  xuping: {
    headline: '💎 Xuping Jewelry Collection',
    description: 'Xuping is a premium Chinese gold-plated jewelry brand trusted by thousands of Nigerian buyers. All Xuping pieces are non-tarnish, renowned for their bold designs, long-lasting finish, and affordable luxury. Perfect for everyday wear and special occasions without losing their shine.',
    categories: [
      { label: 'Xuping Earring', subcat: 'xuping earring', price: '₦5,000', icon: '💛' },
      { label: 'Xuping Earring & Pendant', subcat: 'xuping earring and pendant', price: '₦8,000', icon: '💎' },
    ]
  },
  cf: {
    headline: '🌟 CF Jewelry Collection',
    description: 'CF Jewelry offers a wide range of beautifully crafted non-tarnish gold-plated pieces that combine modern style with traditional elegance. Popular among Lagos market buyers for their quality finish, durability, and variety of designs. Perfect for gifting or personal styling — guaranteed to stay shiny.',
    categories: [
      { label: 'CF Earring & Set', subcat: 'cf', price: '₦5,000', icon: '💛' },
    ]
  },
  jbl: {
    headline: '👑 JBL Jewelry Collection',
    description: 'JBL Jewelry is a top-tier non-tarnish gold-plated brand offering three distinct categories — classic earrings, earring & pendant sets, and luxurious long sets. All JBL pieces are built to last without tarnishing. Something for every occasion and budget.',
    categories: [
      { label: 'JBL Earring', subcat: 'jbl earring', price: '₦5,000', icon: '💛' },
      { label: 'JBL Earring & Pendant', subcat: 'jbl earring and pendant', price: '₦8,000', icon: '💎' },
      { label: 'JBL Long Set', subcat: 'jbl long set', price: '₦10,000', icon: '👑' },
    ]
  },
};

export default async function MarketWingPage({ params, searchParams }: PageProps) {
  const { wing: currentWingSlug } = await params;
  const { item: itemFilter, cat: catFilter } = await searchParams;

  const wing = await getWingBySlug(currentWingSlug);
  const products = wing ? await getProductsByWingId(wing.id) : null;

  const brandKey = itemFilter?.toLowerCase();
  const brandData = brandKey ? BRAND_INFO[brandKey] : null;

  // Filter products by sub-category when cat is selected
  const filtered = catFilter && products
    ? products.filter((p: any) => p.sub_category?.toLowerCase().includes(catFilter.toLowerCase()) || p.name?.toLowerCase().includes(catFilter.toLowerCase()))
    : itemFilter && products && !brandData
      ? products.filter((p: any) => p.sub_category?.toLowerCase().includes(itemFilter.toLowerCase()) || p.name?.toLowerCase().includes(itemFilter.toLowerCase()))
      : null;

  const wingLabel = currentWingSlug.replace(/-/g, ' ');

  return (
    <div className="min-h-screen pb-16" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #fce7f3 40%, #fff7ed 100%)' }}>

      <div className="pointer-events-none fixed inset-0 z-0" style={{ background: 'radial-gradient(ellipse at 20% 20%, rgba(212,175,55,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(192,132,252,0.10) 0%, transparent 60%)' }} />

      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-3 flex items-center justify-between shadow-md" style={{ background: 'linear-gradient(90deg, #2d1b4e 0%, #6b21a8 50%, #2d1b4e 100%)', borderBottom: '2px solid #d4af37' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #d4af37, #f9e077, #b8860b)', boxShadow: '0 0 10px rgba(212,175,55,0.5)' }}>
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-black tracking-widest uppercase gold-glitter">Lagos Jewelry Market</span>
        </div>
        <Link
          href={catFilter ? `/market-hub/${currentWingSlug}?item=${itemFilter}` : itemFilter ? `/market-hub/${currentWingSlug}` : '/'}
          className="text-xs font-bold flex items-center gap-1 transition"
          style={{ color: '#f9e077' }}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Link>
      </header>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-8">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-0.5 flex-1 rounded-full" style={{ background: 'linear-gradient(90deg, #d4af37, transparent)' }} />
          <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid #d4af37', color: '#6b21a8' }}>
            {catFilter ? catFilter : itemFilter ? itemFilter : wingLabel}
          </span>
          <div className="h-0.5 flex-1 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #d4af37)' }} />
        </div>

        {/* Brand writeup + category buttons */}
        {brandData && !catFilter && (
          <div>
            {/* Writeup card */}
            <div className="mb-6 rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.85)', border: '2px solid rgba(212,175,55,0.4)', backdropFilter: 'blur(12px)', boxShadow: '0 4px 24px rgba(107,33,168,0.08)' }}>
              <div className="h-0.5 w-10 rounded-full mb-3" style={{ background: 'linear-gradient(90deg, #d4af37, #f9e077)' }} />
              <h2 className="text-lg font-black mb-3" style={{ color: '#2d1b4e' }}>{brandData.headline}</h2>
              <p className="text-sm leading-relaxed" style={{ color: '#6b21a8' }}>{brandData.description}</p>
            </div>

            {/* Category selection buttons */}
            <p className="text-xs font-black uppercase tracking-widest text-center mb-4" style={{ color: '#2d1b4e' }}>Select a Category to Browse</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {brandData.categories.map((cat) => (
                <Link
                  key={cat.subcat}
                  href={`/market-hub/${currentWingSlug}?item=${itemFilter}&cat=${encodeURIComponent(cat.subcat)}`}
                  className="group rounded-2xl p-5 flex items-center justify-between transition hover:scale-[1.02] duration-200"
                  style={{ background: 'rgba(255,255,255,0.9)', border: '2.5px solid #d4af37', boxShadow: '0 4px 20px rgba(212,175,55,0.2), inset 0 1px 0 rgba(255,240,160,0.5)' }}
                >
                  <div>
                    <span className="text-xl mb-1 block">{cat.icon}</span>
                    <h3 className="text-sm font-black" style={{ color: '#2d1b4e' }}>{cat.label}</h3>
                    <p className="text-xs font-bold mt-0.5" style={{ color: '#d4af37' }}>{cat.price} per piece</p>
                  </div>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center group-hover:scale-110 transition" style={{ background: 'linear-gradient(135deg, #d4af37, #f9e077)', boxShadow: '0 0 10px rgba(212,175,55,0.4)' }}>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Products grid */}
        {filtered && filtered.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((product: any) => (
              <ProductCard key={product.id} item={product} />
            ))}
          </div>
        )}

        {/* No inventory */}
        {filtered && filtered.length === 0 && (
          <div className="text-center py-20 rounded-2xl max-w-md mx-auto mt-12 p-8" style={{ background: 'rgba(255,255,255,0.75)', border: '1.5px dashed rgba(212,175,55,0.4)' }}>
            <HelpCircle className="w-8 h-8 mx-auto mb-2" style={{ color: '#d4af37' }} />
            <h3 className="font-bold text-sm" style={{ color: '#2d1b4e' }}>No Inventory Available</h3>
            <p className="text-xs text-pink-600 mt-1">Vendors have not uploaded listings to this section yet.</p>
          </div>
        )}

        {/* Wing-level products (no filter) */}
        {!itemFilter && !catFilter && products && products.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product: any) => (
              <ProductCard key={product.id} item={product} />
            ))}
          </div>
        )}

        {!itemFilter && !catFilter && (!products || products.length === 0) && (
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
