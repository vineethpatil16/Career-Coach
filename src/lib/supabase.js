// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// Read environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug: ensure variables are loaded
console.log('Supabase URL:', SUPABASE_URL);
console.log('Supabase Key:', SUPABASE_KEY);

// Initialize Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);