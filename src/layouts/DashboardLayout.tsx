import { ReactNode, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LogOut, User, CreditCard, BarChart } from 'lucide-react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarProvider, 
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  children?: ReactNode;
  userType: 'photographer' | 'client';
}

export function DashboardLayout({ children, userType = 'photographer' }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState({
    name: userType === 'photographer' ? 'Fotógrafo Demo' : 'Convidado Demo',
    email: userType === 'photographer' ? 'demo@seuclique.com' : 'convidado@example.com',
    avatar: null,
  });

  const handleLogout = () => {
    // For now, this is just a mock implementation
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate('/login');
  };

  const photographerMenuItems = [
    { title: 'Eventos', href: '/dashboard/photographer/events', icon: 'calendar' },
    { title: 'Galeria', href: '/dashboard/photographer/gallery', icon: 'gallery-horizontal' },
    { title: 'Clientes', href: '/dashboard/photographer/clients', icon: 'users' },
    { title: 'Análises', href: '/dashboard/photographer/analytics', icon: 'bar-chart' },
    { title: 'Assinatura', href: '/dashboard/photographer/subscription', icon: 'credit-card' },
    { title: 'Meu Perfil', href: '/dashboard/photographer/profile', icon: 'user' },
    { title: 'Configurações', href: '/dashboard/photographer/settings', icon: 'settings' }
  ];

  const clientMenuItems = [
    { title: 'Meus Eventos', href: '/dashboard/client/my-events', icon: 'calendar' },
    { title: 'Minha Galeria', href: '/dashboard/client/my-gallery', icon: 'gallery-horizontal' },
    { title: 'Meu Perfil', href: '/dashboard/client/profile', icon: 'user' },
    { title: 'Configurações', href: '/dashboard/client/settings', icon: 'settings' }
  ];

  const menuItems = userType === 'photographer' ? photographerMenuItems : clientMenuItems;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-center p-4">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-xl font-bold text-sidebar-foreground">SeuClique</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navegação</SidebarGroupLabel>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      tooltip={item.title}
                    >
                      <a href={item.href} className="flex items-center">
                        {item.icon === 'calendar' && <span className="mr-2"><Calendar /></span>}
                        {item.icon === 'gallery-horizontal' && <span className="mr-2"><GalleryHorizontal /></span>}
                        {item.icon === 'users' && <span className="mr-2"><Users /></span>}
                        {item.icon === 'user' && <span className="mr-2"><User /></span>}
                        {item.icon === 'credit-card' && <span className="mr-2"><CreditCard /></span>}
                        {item.icon === 'bar-chart' && <span className="mr-2"><BarChart /></span>}
                        {item.icon === 'settings' && <span className="mr-2"><Settings /></span>}
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={user.avatar || ''} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="group-data-[collapsible=icon]:hidden">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-sidebar-foreground/70">{user.email}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
                className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Sair</span>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar || ''} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </header>
          <main className="flex-1 p-6">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

const Calendar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const GalleryHorizontal = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 7v10c0 .6.4 1 1 1h3V6H3c-.6 0-1 .4-1 1Z" />
    <path d="M6 17h3V7H6v10Z" />
    <path d="M11 17h3V7h-3v10Z" />
    <path d="M16 17h3V7h-3v10Z" />
    <path d="M20 6h-1v12h1c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1Z" />
  </svg>
);

const Users = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 1 0 7.75" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const Settings = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
    <path d="M12 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
    <path d="M12 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
  </svg>
);
