import { supabase } from '../supabaseClient';

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Erro ao obter usuário atual:', error.message);
    throw new Error(error.message);
  }

  return data.user;
}