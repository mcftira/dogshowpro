import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'dogshow-auth',
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 2
    }
  },
  global: {
    headers: {
      'x-application-name': 'dogshow-pro'
    }
  }
});

// Add heartbeat to keep connection alive
setInterval(() => {
  supabase.from('users').select('id', { count: 'exact', head: true }).then(() => {
    console.debug('Supabase connection heartbeat');
  });
}, 240000); // Every 4 minutes

export type SupabaseClient = typeof supabase;