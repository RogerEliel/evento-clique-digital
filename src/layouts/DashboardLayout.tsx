
import { ReactNode } from "react";

// We'll create simple placeholder components for the missing components
// Later you can implement proper components with the desired functionality
const Sidebar = ({ userType }: { userType: 'photographer' | 'client' }) => (
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

const savedUser = localStorage.getItem("user");
let userType: 'photographer' | 'client' = 'photographer'; // valor padrão

if (savedUser) {
  try {
    const parsed = JSON.parse(savedUser);
    if (parsed.type === 'client' || parsed.type === 'photographer') {
      userType = parsed.type;
    }
  } catch (e) {
    console.error("Erro ao ler o tipo de usuário do localStorage", e);
  }
}

export interface DashboardLayoutProps {
  children?: ReactNode;
  userType?: 'photographer' | 'client';
}

export function DashboardLayout({ children, userType: userTypeProp }: DashboardLayoutProps) {
  // Use the prop if provided, otherwise use the value from localStorage
  const currentUserType = userTypeProp || userType;
  
  return (
    <div className="flex min-h-screen flex-col">
      {/* Cabeçalho */}
      {currentUserType === "photographer" ? (
        <PhotographerHeader />
      ) : (
        <ClientHeader />
      )}

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <Sidebar userType={currentUserType} />

        {/* Conteúdo principal */}
        <main className="flex-1 p-4">{children}</main>
      </div>

      {/* Rodapé */}
      {currentUserType === "photographer" ? (
        <PhotographerFooter />
      ) : (
        <ClientFooter />
      )}
    </div>
  );
}
