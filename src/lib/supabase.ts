import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const placeholderValues = ['https://placeholder.supabase.co', 'placeholder-anon-key'];

export const supabaseConfigError =
  !supabaseUrl || !supabaseAnonKey
    ? 'Missing Supabase environment variables.'
    : placeholderValues.includes(supabaseUrl) || placeholderValues.includes(supabaseAnonKey)
      ? 'Supabase is still using placeholder credentials. Add your real VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env, then restart the dev server.'
      : '';

export const isSupabaseConfigured = !supabaseConfigError;

export const assertSupabaseConfigured = () => {
  if (supabaseConfigError) {
    throw new Error(supabaseConfigError);
  }
};

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  event_type: string;
  location: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
}
