'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Gem, X } from 'lucide-react';
import GlobalSearchBar from '@/components/GlobalSearchBar';
import ProductCard from '@/components/ProductCard';

const JEWELLERY_WINGS = [
  { title: "Ates Gold Market", slug: "ates-gold", tagline: "Premium plated long-lasting gold pieces", items: ["Xuping", "Sunbelle", "CF", "JBL", "DS"], color: "border-amber-400 bg-amber-50/10" },
  { title: "Steel Market", slug: "steel-market", tagline: "Durable, tarnish-free stainless steel essentials", items: ["Children Set", "Adult Set", "Earring & Pendant Set", "Steel Earring", "Steel Handchain", "Necklace", "Bracelet", "Cubana"], color: "border-slate-400 bg-slate-50/10" },
  { title: "Fashion Jewelleries", slug: "fashion-jewelleries", tagline: "Trendy everyday statement designs and earrings", items: ["Earring & Pendant", "Earrings", "Chains"], color: "border-pink-400 bg-pink-50/10" },
  { title: "Zirconia Market", slug: "zirconia", tagline: "High-grade stone settings with diamond-standard cuts", items: ["Stone Earring & Pendant", "Zirconia Earrings"], color: "border-cyan-400 bg-cyan-50/10" },
  { title: "Dubai / Arabian Set Market", slug: "dubai-arabian", tagline: "Luxury heavyweight bridal wear sets", items: ["Full Bridal Sets", "Mini Sets", "Dubai Bangles"], color: "border-yellow-600 bg-yellow-50/5" }
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-16">
      <header className="border-b bg-white sticky top-0 z-50 px-6 py-4 flex flex-col sm:flex-row gap-4 justify-between items-center shadow-xs">
        <div className="flex items-center gap-1.5 shrink-0">
          <Gem className="w-5 h-5 text-amber-600" />
          <span className="text-md font-black tracking-wider text-neutral-800 uppercase">Lagos Jewelry Market</span>
        </div>

        <GlobalSearchBar onSelectProduct={(product) => setSelectedProduct(product)} />

        <Link href="/vendor/login" className="text-xs bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-3 py-1.5 rounded-lg transition shrink-0">
          Merchant Portal
        </Link>
      </header>

      {/* Target Focus Overlay Modal Frame */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="relative w-full max-w-sm bg-white p-2 rounded-2xl shadow-xl">
            <button type="button" onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-50 p-1.5 bg-white border rounded-full text-neutral-400 hover:text-neutral-600 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
            <ProductCard item={selectedProduct} />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 pt-16 text-center">
        <h1 className="text-4xl font-black sm:text-5xl text-neutral-800 tracking-tight leading-tight">Nigeria's Ultimate Jewelry Hub</h1>
        <p className="text-sm text-neutral-500 max-w-lg mx-auto mt-3">Direct digital access to vendor stalls. Browse live listings, specify your items, and complete checkouts seamlessly on WhatsApp.</p>
      </div>

      <main className="max-w-7xl mx-auto px-6 mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {JEWELLERY_WINGS.map((wing) => (
          <div key={wing.slug} className={`border rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition bg-white ${wing.color}`}>
            <div>
              <h2 className="text-lg font-black text-neutral-800">{wing.title}</h2>
              <p className="text-xs text-neutral-500 mt-1 mb-4 leading-relaxed">{wing.tagline}</p>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {wing.items.map((item) => (
                  <span key={item} className="text-[10px] bg-neutral-100 border border-neutral-200 text-neutral-700 px-2 py-0.5 rounded-md font-bold uppercase tracking-wide">{item}</span>
                ))}
              </div>
            </div>
            <Link href={`/market-hub/${wing.slug}`} className="w-full text-center bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold py-2.5 rounded-xl block transition flex items-center justify-center gap-1">
              Enter Market Section <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
}
