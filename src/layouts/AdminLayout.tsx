
import { ReactNode } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Users, 
  BarChart, 
  Settings, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { clearUser } from "@/utils/auth";
import { toast } from "sonner";

const AdminSidebar = () => (
  <aside className="w-64 bg-gray-100 p-4 hidden md:block">
    <nav>
      <ul className="space-y-2">
        <li>
          <Link to="/admin" className="block p-2 hover:bg-gray-200 rounded flex items-center gap-2">
            <BarChart className="h-5 w-5" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="block p-2 hover:bg-gray-200 rounded flex items-center gap-2">
            <Users className="h-5 w-5" /> Usuários
          </Link>
        </li>
        <li>
          <Link to="/admin/settings" className="block p-2 hover:bg-gray-200 rounded flex items-center gap-2">
            <Settings className="h-5 w-5" /> Configurações
          </Link>
        </li>
      </ul>
    </nav>
  </aside>
);

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      clearUser();
      toast.success('Logout realizado com sucesso');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      toast.error('Erro ao fazer logout');
    }
  };

  return (
    <header className="bg-white p-4 border-b">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Painel de Administração</h1>
        <Button onClick={handleLogout} variant="ghost" size="sm">Logout</Button>
      </div>
    </header>
  );
};

const AdminFooter = () => (
  <footer className="bg-white p-4 border-t mt-auto">
    <div className="text-center text-gray-600">
      &copy; {new Date().getFullYear()} Photography Platform - Painel Admin
    </div>
  </footer>
);

export interface AdminLayoutProps {
  children?: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <AdminHeader />

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main content */}
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>

      {/* Footer */}
      <AdminFooter />
    </div>
  );
}
