
import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserType, isAdmin } from '@/utils/auth';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const MAX_REDIRECTS = 5; // Maximum number of redirects before stopping to prevent loops

interface AdminRouteProps {
  children: React.ReactElement;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const [loading, setLoading] = useState(true);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const { user, isLoading: authLoading, redirectCount, incrementRedirectCount, resetRedirectCount, hasRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`[AdminRoute] Mounting for path: ${location.pathname}, user role: ${user?.type}, redirectCount: ${redirectCount}`);
    
    const checkAdminStatus = async () => {
      try {
        if (!isAuthenticated()) {
          console.log('[AdminRoute] User not authenticated');
          setLoading(false);
          return;
        }

        const adminStatus = await isAdmin();
        console.log('[AdminRoute] Admin status checked:', adminStatus);
        setIsUserAdmin(adminStatus);
      } catch (error) {
        console.error("[AdminRoute] Error checking admin status:", error);
      } finally {
        setLoading(false);
      }
    };

    // Only run check if we're not already loading from auth context
    if (!authLoading) {
      checkAdminStatus();
    }

    return () => {
      console.log(`[AdminRoute] Unmounting from path: ${location.pathname}`);
    };
  }, [location.pathname, authLoading, user?.type, redirectCount]);

  // Use auth context loading state or our local loading state
  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (redirectCount >= MAX_REDIRECTS) {
    console.error('[AdminRoute] Too many redirects detected. Stopping to prevent infinite loop.');
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

  if (!isAuthenticated()) {
    incrementRedirectCount();
    console.log('[AdminRoute] Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check admin status from both the auth context and our API check
  const isAdminUser = hasRole('admin') || isUserAdmin;
  
  if (!isAdminUser) {
    incrementRedirectCount();
    const userType = getUserType();
    const redirectPath = `/dashboard/${userType || 'client'}`;
    console.log(`[AdminRoute] User is not admin, redirecting to ${redirectPath}`);
    return <Navigate to={redirectPath} replace />;
  }

  // User is admin, reset redirect count and show children
  resetRedirectCount();
  return children;
}
