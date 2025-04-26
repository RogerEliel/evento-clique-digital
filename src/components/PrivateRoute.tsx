
import React, { useEffect } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/utils/auth';
import { Loader2 } from 'lucide-react';

const MAX_REDIRECTS = 5; // Maximum number of redirects before stopping to prevent loops

interface PrivateRouteProps {
  children: React.ReactElement;
  userType: UserRole;
}

export default function PrivateRoute({ children, userType }: PrivateRouteProps) {
  const { user, isLoading, hasRole, redirectCount, incrementRedirectCount, resetRedirectCount } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Reset redirect count when component mounts with stable location
    const cleanup = () => {
      resetRedirectCount();
    };
    
    return cleanup;
  }, [resetRedirectCount]);

  useEffect(() => {
    console.log(`[PrivateRoute] Mounting for path: ${location.pathname}, required role: ${userType}, user role: ${user?.type}, redirectCount: ${redirectCount}`);
    
    // Log every render to track potential loops
    return () => {
      console.log(`[PrivateRoute] Unmounting from path: ${location.pathname}`);
    };
  }, [location.pathname, userType, user?.type, redirectCount]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (redirectCount >= MAX_REDIRECTS) {
    console.error('[PrivateRoute] Too many redirects detected. Stopping to prevent infinite loop.');
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-xl font-bold text-red-600 mb-4">Navigation Error</h1>
        <p className="text-center mb-4">Too many redirects detected. Please try logging out and back in.</p>
        <button 
          onClick={() => {
            resetRedirectCount();
            navigate('/login');
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (!user) {
    // If not authenticated, increment redirect count and redirect to login
    incrementRedirectCount();
    console.log('[PrivateRoute] Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasRole(userType)) {
    incrementRedirectCount();
    
    // Determine where to redirect based on user role
    if (hasRole('admin')) {
      console.log('[PrivateRoute] User is admin, redirecting to admin panel');
      return <Navigate to="/admin" replace />;
    }
    
    const redirectPath = `/dashboard/${user.type}`;
    console.log(`[PrivateRoute] User role ${user.type} doesn't match required role ${userType}, redirecting to ${redirectPath}`);
    return <Navigate to={redirectPath} replace />;
  }

  // User has the correct role, reset redirect count and show children
  resetRedirectCount();
  return children;
}
