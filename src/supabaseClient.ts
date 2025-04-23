import { createClient } from '@supabase/supabase-js';

// URL do projeto e chave pública (ANON_KEY) do Supabase
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

// Inicializa o cliente do Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);