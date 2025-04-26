
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'client' | 'photographer' | 'admin';

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

export const getUserType = (): UserRole | null => {
  const user = getUser();
  return user ? user.type : null;
};

export const isAdmin = async (userId?: string): Promise<boolean> => {
  if (!userId && !isAuthenticated()) return false;
  
  const id = userId || (getUser()?.email as string);
  if (!id) return false;

  try {
    const { data, error } = await supabase.rpc('is_admin', { user_id: id });
    if (error) throw error;
    return !!data;
  } catch (error) {
    console.error('Error checking if user is admin:', error);
    return false;
  }
};

export const promoteToAdmin = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase.rpc('promote_to_admin', { target_user_id: userId });
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error promoting user to admin:', error);
    return false;
  }
};

export const setUserActiveStatus = async (userId: string, isActive: boolean): Promise<boolean> => {
  try {
    const { error } = await supabase.rpc('set_user_active_status', { 
      target_user_id: userId,
      is_active: isActive
    });
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error setting user active status:', error);
    return false;
  }
};
