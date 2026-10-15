import React from 'react';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { ArrowLeft, HelpCircle } from 'lucide-react';

interface PageProps {
  params: Promise<{ wing: string }>;
}

export default async function MarketWingPage({ params }: PageProps) {
  const resolvedParams = await params;
  const currentWingSlug = resolvedParams.wing;

  const { data: products } = await supabase
    .from('products')
    .select('*, vendors!inner(store_name, stall_number, whatsapp_number), market_wings!inner(slug, name)')
    .eq('market_wings.slug', currentWingSlug);

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="text-xs font-bold text-neutral-600 flex items-center gap-1 hover:text-neutral-900 transition">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Main Market
          </Link>
          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md uppercase tracking-wider">
            Section: {currentWingSlug.replace('-', ' ')}
          </span>
        </div>

        {products && products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product: any) => (
              <ProductCard key={product.id} item={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-dashed rounded-2xl max-w-md mx-auto mt-12 p-8">
            <HelpCircle className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
            <h3 className="font-bold text-sm text-neutral-700">No Inventory Available</h3>
            <p className="text-xs text-neutral-400 mt-1">Importers have not uploaded listings to this wing today.</p>
          </div>
        )}
      </div>
    </div>
  );
}
