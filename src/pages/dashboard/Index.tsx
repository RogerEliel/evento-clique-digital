
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function DashboardIndex() {
  // In a real application, we would check authentication state
  // and user type to determine where to redirect
  
  // For now, just redirect to login page
  return <Navigate to="/dashboard/login" replace />;
}
