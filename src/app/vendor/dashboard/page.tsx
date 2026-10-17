'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';
import ImageCompressor from '@/components/ImageCompressor';
import { ShieldCheck, PlusCircle, LogOut } from 'lucide-react';

const MARKET_TAXONOMY = [
  { id: 'ates-gold', name: 'Ates Gold Market', subs: ['Xuping', 'Sunbelle', 'CF', 'JBL', 'DS'] },
  { id: 'steel-market', name: 'Steel Market', subs: ['Children Set', 'Adult Set', 'Earring & Pendant Set', 'Steel Earring', 'Steel Handchain', 'Necklace', 'Bracelet', 'Cubana'] },
  { id: 'fashion-jewelleries', name: 'Fashion Jewelleries', subs: ['Earring & Pendant', 'Earrings', 'Chains'] },
  { id: 'zirconia', name: 'Zirconia Market', subs: ['Stone Earring & Pendant', 'Zirconia Earrings'] },
  { id: 'dubai-arabian', name: 'Dubai / Arabian Set Market', subs: ['Full Bridal Sets', 'Mini Sets', 'Dubai Bangles'] }
];

export default function VendorDashboard() {
  const router = useRouter();
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [wing, setWing] = useState(MARKET_TAXONOMY[0].id);
  const [subCat, setSubCat] = useState(MARKET_TAXONOMY[0].subs[0]);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const checkSecuritySession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push('/vendor/login'); return; }

      const { data: profile } = await supabase
        .from('vendors')
        .select('*')
        .eq('auth_user_id', session.user.id)
        .single();

      if (!profile) { setStatus('No merchant profile linked to this account.'); return; }
      setVendor(profile);
      setLoading(false);
    };
    checkSecuritySession();
  }, [router]);

  const handleWingChange = (wingId: string) => {
    setWing(wingId);
    const target = MARKET_TAXONOMY.find(w => w.id === wingId);
    if (target) setSubCat(target.subs[0]);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!compressedFile || !vendor) { setStatus('Please attach and optimize a product item photograph.'); return; }

    setPublishing(true);
    setStatus('Uploading optimized photo...');

    try {
      const filePath = `${vendor.id}/${Date.now()}.webp`;
      const { error: uploadErr } = await supabase.storage.from('jewellery-inventory').upload(filePath, compressedFile);
      if (uploadErr) throw uploadErr;

      const { data: { publicUrl } } = supabase.storage.from('jewellery-inventory').getPublicUrl(filePath);
      const { data: wingObj } = await supabase.from('market_wings').select('id').eq('slug', wing).single();

      const { error: insertErr } = await supabase.from('products').insert({
        vendor_id: vendor.id,
        wing_id: wingObj?.id,
        name,
        sub_category: subCat,
        price: parseFloat(price),
        image_url: publicUrl
      });

      if (insertErr) throw insertErr;

      setStatus('🎉 Product published live successfully!');
      setName('');
      setPrice('');
      setCompressedFile(null);
    } catch (err: any) {
      setStatus(`System Error: ${err.message}`);
    } finally {
      setPublishing(false);
    }
  };

  if (loading) return <div className="p-16 text-center text-xs font-bold tracking-widest text-neutral-400 animate-pulse uppercase">Authenticating core security credentials...</div>;

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-xl mx-auto bg-white border rounded-2xl p-6 shadow-xs">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <h1 className="text-md font-black text-neutral-800 uppercase tracking-tight">{vendor.store_name}</h1>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Stall: {vendor.stall_number}</p>
            </div>
          </div>
          <button onClick={() => supabase.auth.signOut().then(() => router.push('/vendor/login'))} className="text-xs bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg text-neutral-600 flex items-center gap-1 font-bold transition cursor-pointer"><LogOut className="w-3 h-3" /> Exit</button>
        </div>

        <form onSubmit={handlePublish} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Product Item Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Authentic Xuping Handchain" className="w-full px-3 py-2 border rounded-xl text-xs bg-neutral-50 focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Price (₦ Naira)</label>
              <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} placeholder="20000" className="w-full px-3 py-2 border rounded-xl text-xs bg-neutral-50 focus:outline-none focus:border-amber-500" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Market Section</label>
              <select value={wing} onChange={(e) => handleWingChange(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs bg-neutral-50 focus:outline-none focus:border-amber-500">
                {MARKET_TAXONOMY.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Item Classification</label>
              <select value={subCat} onChange={(e) => setSubCat(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-xs bg-neutral-50 focus:outline-none focus:border-amber-500">
                {MARKET_TAXONOMY.find(w => w.id === wing)?.subs.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2">Jewelry Photograph Asset</label>
            <ImageCompressor onCompressionComplete={(file) => setCompressedFile(file)} />
            {compressedFile && <p className="text-[10px] text-emerald-600 font-bold mt-2">✓ Texture optimized to {(compressedFile.size / 1024).toFixed(1)} KB (Safe for Free Tier)</p>}
          </div>

          <button type="submit" disabled={publishing} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer">
            <PlusCircle className="w-3.5 h-3.5" /> {publishing ? 'Publishing...' : 'Publish Item Live'}
          </button>
        </form>

        {status && <div className="mt-4 text-center text-xs font-bold p-3 bg-neutral-50 border rounded-xl text-neutral-600 leading-relaxed">{status}</div>}
      </div>
    </div>
  );
}
