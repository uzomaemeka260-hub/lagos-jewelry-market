import { NextRequest, NextResponse } from 'next/server';
import { searchProducts } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query?.trim()) return NextResponse.json([]);

  try {
    const data = await searchProducts(query);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
