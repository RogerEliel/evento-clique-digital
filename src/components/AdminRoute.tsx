
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserType, isAdmin } from '@/utils/auth';
import { Loader2 } from 'lucide-react';

interface AdminRouteProps {
  children: React.ReactElement;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const [loading, setLoading] = useState(true);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        if (!isAuthenticated()) {
          setLoading(false);
          return;
        }

        const adminStatus = await isAdmin();
        setIsUserAdmin(adminStatus);
      } catch (error) {
        console.error("Error checking admin status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!isUserAdmin) {
    const userType = getUserType();
    return <Navigate to={`/dashboard/${userType || 'client'}`} replace />;
  }

  return children;
}
