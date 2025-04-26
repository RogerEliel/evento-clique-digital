import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserType } from '@/utils/auth';
import type { UserRole } from '@/utils/auth';

interface PrivateRouteProps {
  children: React.ReactElement;
  userType: UserRole;
}

export default function PrivateRoute({ children, userType }: PrivateRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const currentUserType = getUserType();

  if (currentUserType !== userType) {
    // If user is admin, redirect to admin panel instead of client/photographer dashboard
    if (currentUserType === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    
    // Otherwise redirect to appropriate dashboard
    return <Navigate to={`/dashboard/${currentUserType}`} replace />;
  }

  return children;
}
