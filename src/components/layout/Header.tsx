
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { clearUser } from "@/utils/auth";
import { toast } from "sonner";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
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
        <h1 className="text-xl font-bold">{title}</h1>
        <Button onClick={handleLogout} variant="ghost" size="sm">Logout</Button>
      </div>
    </header>
  );
}
