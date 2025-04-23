import { supabase } from '../supabaseClient';

export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Erro ao fazer login:', error.message);
    throw new Error(error.message);
  }

  return data;
}