
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardIndex() {
  const { user, isLoading, incrementRedirectCount } = useAuth();
  const location = useLocation();
  
  console.log('[DashboardIndex] Rendering with user type:', user?.type);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log('[DashboardIndex] No user found, redirecting to login');
    incrementRedirectCount();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Handle redirect based on user type
  if (user.type === "photographer") {
    console.log('[DashboardIndex] Redirecting to photographer dashboard');
    return <Navigate to="/dashboard/photographer" replace />;
  } else if (user.type === "client") {
    console.log('[DashboardIndex] Redirecting to client dashboard');
    return <Navigate to="/dashboard/client" replace />;
  } else if (user.type === "admin") {
    console.log('[DashboardIndex] Redirecting to admin dashboard');
    return <Navigate to="/admin" replace />;
  }

  console.log('[DashboardIndex] Unknown user type, redirecting to login');
  incrementRedirectCount();
  return <Navigate to="/login" replace />;
}
