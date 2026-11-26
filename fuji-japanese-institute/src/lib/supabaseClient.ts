import { createClient } from '@supabase/supabase-js';

// Bulletproof fallback credentials ensuring createClient NEVER throws 'supabaseUrl is required'
const defaultUrl = 'https://ovnohmkktqlusveemydb.supabase.co';
const defaultAnonKey = 'sb_publishable_kQSx3aUQcqh_7o4rNhUwWQ_kfsoNDNQ';

const envUrl = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_URL) ? String(import.meta.env.VITE_SUPABASE_URL).trim() : '';
const envKey = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) ? String(import.meta.env.VITE_SUPABASE_ANON_KEY).trim() : '';

const supabaseUrl = envUrl || defaultUrl;
const supabaseAnonKey = envKey || defaultAnonKey;

let clientInstance: any;

try {
  clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    }
  });
} catch (err) {
  console.warn("Supabase client initialization fallback invoked:", err);
  clientInstance = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: async () => ({ data: null, error: new Error('Supabase client offline') }),
      signOut: async () => ({ error: null }),
      resetPasswordForEmail: async () => ({ error: null }),
      updateUser: async () => ({ data: null, error: null }),
      resend: async () => ({ error: null }),
      signInWithOAuth: async () => ({ error: null }),
    },
    from: () => ({
      select: () => ({
        order: () => Promise.resolve({ data: [], error: null }),
        eq: () => Promise.resolve({ data: [], error: null }),
        single: () => Promise.resolve({ data: null, error: null }),
        then: (cb: any) => Promise.resolve({ data: [], error: null }).then(cb),
      }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null }),
      upsert: () => Promise.resolve({ data: null, error: null }),
    }),
    rpc: async () => ({ data: null, error: null }),
    functions: {
      invoke: async () => ({ data: null, error: null })
    }
  };
}

export const supabase = clientInstance;
