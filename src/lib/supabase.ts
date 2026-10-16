import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

// Provide a dummy URL during build time to prevent Supabase from throwing
const safeUrl = url || 'https://placeholder.supabase.co';
const safeKey = key || 'placeholder';

export const supabase = createClient(safeUrl, safeKey);
