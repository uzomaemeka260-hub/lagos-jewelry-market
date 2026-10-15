import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const textQuery = searchParams.get('q') || '';

    if (!textQuery.trim()) {
      return NextResponse.json([]);
    }

    const { data, error } = await supabase
      .from('products')
      .select('*, vendors(store_name, stall_number, whatsapp_number), market_wings(slug, name)')
      .ilike('name', `%${textQuery}%`)
      .eq('is_available', true)
      .range(0, 12);

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
