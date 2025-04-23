import { supabase } from '../supabaseClient';

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Erro ao fazer logout:', error.message);
    throw new Error(error.message);
  }

  console.log('Usuário desconectado com sucesso.');
}