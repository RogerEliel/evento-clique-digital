
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Calendar, 
  Image, 
  UserCircle, 
  ShoppingCart, 
  BarChart, 
  FileText, 
  CreditCard 
} from "lucide-react";
import { ReactNode } from "react";

export interface NavigationConfig {
  [key: string]: {
    title: string;
    items: Array<{
      title: string;
      href: string;
      icon: ReactNode;
    }>;
  };
}

export const navigationConfig: NavigationConfig = {
  admin: {
    title: "Painel de Administração",
    items: [
      {
        title: "Dashboard",
        href: "/admin",
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
      {
        title: "Usuários",
        href: "/admin/users",
        icon: <Users className="w-5 h-5" />,
      },
      {
        title: "Configurações",
        href: "/admin/settings",
        icon: <Settings className="w-5 h-5" />,
      },
    ],
  },
  photographer: {
    title: "Painel do Fotógrafo",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard/photographer",
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
      {
        title: "Eventos",
        href: "/dashboard/photographer/events",
        icon: <Calendar className="w-5 h-5" />,
      },
      {
        title: "Galeria",
        href: "/dashboard/photographer/gallery",
        icon: <Image className="w-5 h-5" />,
      },
      {
        title: "Clientes",
        href: "/dashboard/photographer/clients",
        icon: <Users className="w-5 h-5" />,
      },
      {
        title: "Analytics",
        href: "/dashboard/photographer/analytics",
        icon: <BarChart className="w-5 h-5" />,
      },
      {
        title: "Assinatura",
        href: "/dashboard/photographer/subscription",
        icon: <CreditCard className="w-5 h-5" />,
      },
      {
        title: "Perfil",
        href: "/dashboard/photographer/profile",
        icon: <UserCircle className="w-5 h-5" />,
      },
      {
        title: "Pedidos",
        href: "/dashboard/photographer/orders",
        icon: <ShoppingCart className="w-5 h-5" />,
      },
      {
        title: "Relatórios",
        href: "/dashboard/photographer/reports",
        icon: <FileText className="w-5 h-5" />,
      },
      {
        title: "Configurações",
        href: "/dashboard/photographer/settings",
        icon: <Settings className="w-5 h-5" />,
      },
    ],
  },
  client: {
    title: "Painel do Cliente",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard/client",
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
      {
        title: "Meus Eventos",
        href: "/dashboard/client/my-events",
        icon: <Calendar className="w-5 h-5" />,
      },
      {
        title: "Minha Galeria",
        href: "/dashboard/client/my-gallery",
        icon: <Image className="w-5 h-5" />,
      },
      {
        title: "Perfil",
        href: "/dashboard/client/profile",
        icon: <UserCircle className="w-5 h-5" />,
      },
    ],
  },
};
