// src/utils/auth.ts

export type UserType = 'photographer' | 'client';

export interface UserData {
  type: UserType;
  email?: string;
  // Você pode adicionar mais campos aqui se quiser
}

export const saveUser = (user: UserData) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = (): UserData | null => {
  const user = localStorage.getItem('user');
  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error('Erro ao parsear o user do localStorage:', error);
    return null;
  }
};

export const getUserType = (): UserType | null => {
  const user = getUser();
  return user?.type || null;
};

export const clearUser = () => {
  localStorage.removeItem('user');
};

export const isAuthenticated = (): boolean => {
  return getUser() !== null;
};
