import { supabase } from '../supabaseClient';

export async function registerUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Erro ao registrar usuário:', error.message);
    throw new Error(error.message);
  }

  return data;
}