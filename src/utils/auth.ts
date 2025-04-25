
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'client' | 'photographer';

export interface UserData {
  type: UserRole;
  email?: string;
}

export const getUserRole = async (userId: string): Promise<UserRole | null> => {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user role:', error);
    return null;
  }

  return data?.role || null;
};

export const saveUser = (user: UserData) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = (): UserData | null => {
  const user = localStorage.getItem('user');
  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
};

export const clearUser = () => {
  localStorage.removeItem('user');
};

export const isAuthenticated = (): boolean => {
  return getUser() !== null;
};

