const getUrl = () => process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const getKey = () => process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

if (typeof window === 'undefined') {
  console.log('[supabase] URL:', process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 30));
}

async function supabaseFetch(path: string) {
  const res = await fetch(`${getUrl()}/rest/v1/${path}`, {
    headers: {
      apikey: getKey(),
      Authorization: `Bearer ${getKey()}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Supabase error: ${res.status} ${res.statusText} — ${body}`);
  }
  return res.json();
}

export async function getWingBySlug(slug: string) {
  const data = await supabaseFetch(`market_wings?slug=eq.${slug}&select=id&limit=1`);
  return data?.[0] ?? null;
}

export async function getProductsByWingId(wingId: string) {
  return supabaseFetch(
    `products?wing_id=eq.${wingId}&select=*,vendors(store_name,stall_number,whatsapp_number),market_wings(slug,name)`
  );
}

export async function searchProducts(query: string) {
  return supabaseFetch(
    `products?name=ilike.*${query}*&select=*,vendors(store_name,stall_number,whatsapp_number),market_wings(slug,name)&limit=12`
  );
}
