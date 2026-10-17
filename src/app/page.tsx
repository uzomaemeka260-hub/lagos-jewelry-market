'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, X, Sparkles } from 'lucide-react';
import GlobalSearchBar from '@/components/GlobalSearchBar';
import ProductCard from '@/components/ProductCard';

const JEWELLERY_WINGS = [
  { title: "Ates Gold Market", slug: "ates-gold", tagline: "Premium plated long-lasting gold pieces", items: ["Xuping", "Sunbelle", "CF", "JBL", "DS"] },
  { title: "Steel Market", slug: "steel-market", tagline: "Durable, tarnish-free stainless steel essentials", items: ["Children Set", "Adult Set", "Earring & Pendant Set", "Steel Earring", "Steel Handchain", "Necklace", "Bracelet", "Cubana"] },
  { title: "Fashion Jewelleries", slug: "fashion-jewelleries", tagline: "Trendy everyday statement designs and earrings", items: ["Earring & Pendant", "Earrings", "Chains"] },
  { title: "Zirconia Market", slug: "zirconia", tagline: "High-grade stone settings with diamond-standard cuts", items: ["Stone Earring & Pendant", "Zirconia Earrings"] },
  { title: "Dubai / Arabian Set Market", slug: "dubai-arabian", tagline: "Luxury heavyweight bridal wear sets", items: ["Full Bridal Sets", "Mini Sets", "Dubai Bangles"] },
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <div className="min-h-screen pb-16" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #fce7f3 40%, #fff7ed 100%)' }}>

      {/* Shine overlay */}
      <div className="pointer-events-none fixed inset-0 z-0" style={{ background: 'radial-gradient(ellipse at 20% 20%, rgba(212,175,55,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(192,132,252,0.10) 0%, transparent 60%)' }} />

      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-3 flex flex-col sm:flex-row gap-3 justify-between items-center shadow-md" style={{ background: 'linear-gradient(90deg, #2d1b4e 0%, #6b21a8 50%, #2d1b4e 100%)', borderBottom: '2px solid #d4af37' }}>

        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #d4af37, #f9e077, #b8860b)', boxShadow: '0 0 12px rgba(212,175,55,0.6)' }}>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-black tracking-widest uppercase gold-glitter">Lagos Jewelry</span>
            <span className="text-[9px] font-bold tracking-widest uppercase text-pink-200">Market Hub</span>
          </div>
        </div>

        <GlobalSearchBar onSelectProduct={(product) => setSelectedProduct(product)} />

        <Link href="/vendor/login" className="text-xs font-bold px-4 py-1.5 rounded-lg transition shrink-0" style={{ background: 'linear-gradient(90deg, #d4af37, #f9e077)', color: '#2d1b4e' }}>
          Merchant Portal
        </Link>
      </header>

      {/* Product modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-purple-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="relative w-full max-w-sm bg-white p-2 rounded-2xl shadow-2xl" style={{ border: '2px solid #d4af37' }}>
            <button type="button" onClick={() => setSelectedProduct(null)} className="absolute top-3 right-3 z-50 p-1.5 bg-white border rounded-full text-neutral-400 hover:text-neutral-600 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
            <ProductCard item={selectedProduct} />
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-14 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4" style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid #d4af37', color: '#92400e' }}>
          <Sparkles className="w-3 h-3" style={{ color: '#d4af37' }} /> Nigeria's #1 Jewelry Hub
        </div>
        <h1 className="text-4xl font-black sm:text-5xl tracking-tight leading-tight gold-glitter">
          Lagos Jewelry Market
        </h1>
        <p className="text-sm text-purple-800 max-w-lg mx-auto mt-3 font-medium">
          Browse live vendor stalls, pick your items, and checkout directly on WhatsApp.
        </p>
      </div>

      {/* Market Wing Cards */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {JEWELLERY_WINGS.map((wing) => (
          <div key={wing.slug} className="rounded-2xl p-5 flex flex-col justify-between transition hover:scale-[1.01] duration-200" style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(212,175,55,0.4)', boxShadow: '0 4px 24px rgba(107,33,168,0.08), inset 0 1px 0 rgba(212,175,55,0.2)' }}>
            <div>
              {/* Gold shimmer line */}
              <div className="h-0.5 w-12 rounded-full mb-3" style={{ background: 'linear-gradient(90deg, #d4af37, #f9e077, #d4af37)' }} />
              <h2 className="text-base font-black" style={{ color: '#2d1b4e' }}>{wing.title}</h2>
              <p className="text-xs text-pink-700 mt-1 mb-4 leading-relaxed">{wing.tagline}</p>

              {/* Clickable item tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {wing.items.map((item) => (
                  <Link
                    key={item}
                    href={`/market-hub/${wing.slug}?item=${encodeURIComponent(item.toLowerCase())}`}
                    className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md transition hover:scale-105 duration-150"
                    style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(219,39,119,0.10))', border: '1px solid rgba(212,175,55,0.5)', color: '#6b21a8' }}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <Link href={`/market-hub/${wing.slug}`} className="w-full text-center text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition hover:opacity-90" style={{ background: 'linear-gradient(90deg, #6b21a8, #db2777)', color: '#fff', boxShadow: '0 2px 12px rgba(107,33,168,0.25)' }}>
              Enter Market Section <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
}
