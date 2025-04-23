
import { Navigate } from 'react-router-dom';

export default function DashboardIndex() {
  const userType = localStorage.getItem("userType");

  if (userType === "photographer") {
    return <Navigate to="/dashboard/photographer/profile" replace />;
  } else if (userType === "client") {
    return <Navigate to="/dashboard/client/my-gallery" replace />;
  }

  return <Navigate to="/login" replace />;
}
