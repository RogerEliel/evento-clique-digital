import { ReactNode, useState, useEffect } from "react";
import { getUserType } from "@/utils/auth";
import type { UserRole } from "@/utils/auth";

// Sidebar component with navigation links based on user type
const Sidebar = ({ userType }: { userType: UserRole }) => {
  // For admin users, they should be redirected to the admin panel
  if (userType === "admin") {
    return (
      <aside className="w-64 bg-gray-100 p-4 hidden md:block">
        <nav>
          <ul className="space-y-2">
            <li><a href="/admin" className="block p-2 hover:bg-gray-200 rounded">Admin Dashboard</a></li>
          </ul>
        </nav>
      </aside>
    );
  }
  
  return (
    <aside className="w-64 bg-gray-100 p-4 hidden md:block">
      <nav>
        <ul className="space-y-2">
          {userType === "photographer" ? (
            <>
              <li><a href="/dashboard/photographer" className="block p-2 hover:bg-gray-200 rounded">Dashboard</a></li>
              <li><a href="/dashboard/photographer/events" className="block p-2 hover:bg-gray-200 rounded">Events</a></li>
              <li><a href="/dashboard/photographer/gallery" className="block p-2 hover:bg-gray-200 rounded">Gallery</a></li>
              <li><a href="/dashboard/photographer/clients" className="block p-2 hover:bg-gray-200 rounded">Clients</a></li>
              <li><a href="/dashboard/photographer/analytics" className="block p-2 hover:bg-gray-200 rounded">Analytics</a></li>
              <li><a href="/dashboard/photographer/subscription" className="block p-2 hover:bg-gray-200 rounded">Subscription</a></li>
              <li><a href="/dashboard/photographer/profile" className="block p-2 hover:bg-gray-200 rounded">Profile</a></li>
              <li><a href="/dashboard/photographer/orders" className="block p-2 hover:bg-gray-200 rounded">Orders</a></li>
              <li><a href="/dashboard/photographer/reports" className="block p-2 hover:bg-gray-200 rounded">Reports</a></li>
              <li><a href="/dashboard/photographer/settings" className="block p-2 hover:bg-gray-200 rounded">Settings</a></li>
            </>
          ) : (
            <>
              <li><a href="/dashboard/client" className="block p-2 hover:bg-gray-200 rounded">Dashboard</a></li>
              <li><a href="/dashboard/client/my-events" className="block p-2 hover:bg-gray-200 rounded">My Events</a></li>
              <li><a href="/dashboard/client/my-gallery" className="block p-2 hover:bg-gray-200 rounded">My Gallery</a></li>
              <li><a href="/dashboard/client/profile" className="block p-2 hover:bg-gray-200 rounded">Profile</a></li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

const ClientHeader = () => (
  <header className="bg-white p-4 border-b">
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-bold">Client Dashboard</h1>
      <button className="text-gray-600">Logout</button>
    </div>
  </header>
);

const ClientFooter = () => (
  <footer className="bg-white p-4 border-t">
    <div className="text-center text-gray-600">
      &copy; {new Date().getFullYear()} Photography Platform
    </div>
  </footer>
);

const PhotographerHeader = () => (
  <header className="bg-white p-4 border-b">
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-bold">Photographer Dashboard</h1>
      <button className="text-gray-600">Logout</button>
    </div>
  </header>
);

const PhotographerFooter = () => (
  <footer className="bg-white p-4 border-t">
    <div className="text-center text-gray-600">
      &copy; {new Date().getFullYear()} Photography Platform
    </div>
  </footer>
);

export interface DashboardLayoutProps {
  children?: ReactNode;
  userType?: UserRole;
}

export function DashboardLayout({ children, userType: userTypeProp }: DashboardLayoutProps) {
  // Use useState for user type instead of directly accessing localStorage outside of component
  const [currentUserType, setCurrentUserType] = useState<UserRole>(userTypeProp || 'photographer');
  
  // Use useEffect to safely handle localStorage operations
  useEffect(() => {
    if (!userTypeProp) {
      const storedType = getUserType();
      if (storedType) {
        setCurrentUserType(storedType);
      }
    }
  }, [userTypeProp]);
  
  // If admin, redirect to admin panel
  if (currentUserType === "admin") {
    // Handle admin redirect case properly
    return (
      <div className="flex min-h-screen flex-col">
        <header className="bg-white p-4 border-b">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Redirecting to Admin...</h1>
          </div>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <p>Admin users should use the Admin Panel instead.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      {currentUserType === "photographer" ? (
        <PhotographerHeader />
      ) : (
        <ClientHeader />
      )}

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <Sidebar userType={currentUserType} />

        {/* Main content */}
        <main className="flex-1 p-4">{children}</main>
      </div>

      {/* Footer */}
      {currentUserType === "photographer" ? (
        <PhotographerFooter />
      ) : (
        <ClientFooter />
      )}
    </div>
  );
}
