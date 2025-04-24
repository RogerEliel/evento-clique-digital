import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserType, UserType } from '@/utils/auth';

interface PrivateRouteProps {
  children: React.ReactElement;
  userType: UserType;
}

export default function PrivateRoute({ children, userType }: PrivateRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const currentUserType = getUserType();

  if (currentUserType !== userType) {
    return <Navigate to={`/dashboard/${currentUserType}`} replace />;
  }

  return children;
}
