import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const placeholderValues = [
  'https://your-project-ref.supabase.co',
  'your-supabase-anon-key',
  'https://placeholder.supabase.co',
  'placeholder-key',
];

export const isSupabaseConfigured = Boolean(
  supabaseUrl
    && supabaseAnonKey
    && !placeholderValues.includes(supabaseUrl)
    && !placeholderValues.includes(supabaseAnonKey),
);

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
);
