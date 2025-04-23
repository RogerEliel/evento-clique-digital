import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  return !!user;
};

const getUserType = (): 'photographer' | 'client' | null => {
  const user = localStorage.getItem('user');
  if (!user) return null;

  try {
    const parsedUser = JSON.parse(user);
    return parsedUser.type || null;
  } catch {
    return null;
  }
};

interface PrivateRouteProps {
  children: React.ReactElement;
  userType: 'photographer' | 'client';
}

export default function PrivateRoute({ children, userType }: PrivateRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const currentUserType = getUserType();

  // Se estiver logado, mas for do tipo errado, redireciona para o painel correto
  if (currentUserType !== userType) {
    return <Navigate to={`/dashboard/${currentUserType}`} replace />;
  }

  return children;
}
