'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  sub_category: string;
  price: number | string;
  image_url: string;
  vendors: { store_name: string; stall_number: string; whatsapp_number: string };
}

export default function WingPageClient({ products }: { products: Product[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prev = () => setLightboxIndex((i) => (i !== null ? (i - 1 + products.length) % products.length : 0));
  const next = () => setLightboxIndex((i) => (i !== null ? (i + 1) % products.length : 0));

  const current = lightboxIndex !== null ? products[lightboxIndex] : null;

  return (
    <>
      {/* Lightbox */}
      {current && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4" onClick={() => setLightboxIndex(null)}>
          <div className="relative max-w-lg w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {/* Close */}
            <button onClick={() => setLightboxIndex(null)} className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-neutral-600 font-bold shadow-lg z-10 cursor-pointer">
              <X className="w-4 h-4" />
            </button>

            {/* Prev */}
            <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-white transition">
              <ChevronLeft className="w-5 h-5 text-neutral-700" />
            </button>

            <img src={current.image_url} alt={current.name} className="w-full rounded-2xl shadow-2xl object-contain max-h-[75vh]" />

            <p className="text-center text-white text-xs font-bold mt-3 opacity-80">{current.name}</p>
            <p className="text-center text-white/50 text-[10px] mt-1">{lightboxIndex! + 1} / {products.length}</p>

            {/* Next */}
            <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-white transition">
              <ChevronRight className="w-5 h-5 text-neutral-700" />
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={product.id} item={product} onImageClick={() => setLightboxIndex(index)} />
        ))}
      </div>
    </>
  );
}
