import React from 'react';
import { Navigate } from 'react-router-dom';

// Simulando autenticação — substitua pela lógica real do seu projeto
const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  return user !== null;
};

const getUserType = () => {
  const user = localStorage.getItem('user');
  if (!user) return null;
  try {
    return JSON.parse(user).type; // Espera que o user tenha um campo "type": "photographer" ou "client"
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
    return <Navigate to="/dashboard/login" replace />;
  }

  const currentUserType = getUserType();

  if (currentUserType !== userType) {
    return <Navigate to={`/dashboard/${currentUserType}`} replace />;
  }

  return children;
}
