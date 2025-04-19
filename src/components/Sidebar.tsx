
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Calendar, Image, Users, Settings, Home, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Eventos', path: '/dashboard/events' },
    { icon: Camera, label: 'Uploads', path: '/dashboard/uploads' },
    { icon: Image, label: 'Galerias', path: '/dashboard/galleries' },
    { icon: Users, label: 'Convidados', path: '/dashboard/guests' },
    { icon: Settings, label: 'Configurações', path: '/dashboard/settings' },
  ];

  return (
    <aside className={cn(
      "h-screen bg-white border-r border-border transition-all duration-300 flex flex-col",
      isCollapsed ? "w-[80px]" : "w-[250px]"
    )}>
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <Link to="/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-seuclique-darkslate">Seu<span className="text-seuclique-turquoise">Clique</span></span>
          </Link>
        )}
        {isCollapsed && (
          <Link to="/dashboard" className="mx-auto">
            <span className="text-xl font-bold text-seuclique-turquoise">SC</span>
          </Link>
        )}
        <Button variant="ghost" size="sm" onClick={onToggleCollapse} className="ml-auto">
          {isCollapsed ? "→" : "←"}
        </Button>
      </div>
      
      <nav className="flex-1 mt-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={cn(
                  "flex items-center py-2 px-3 rounded-md transition-colors",
                  location.pathname === item.path 
                    ? "bg-seuclique-lightcloud text-seuclique-turquoise" 
                    : "text-seuclique-darkslate hover:bg-gray-100"
                )}
              >
                <item.icon size={20} className="flex-shrink-0" />
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-border">
        <Link 
          to="/logout" 
          className="flex items-center py-2 px-3 text-seuclique-silver hover:text-seuclique-darkslate transition-colors"
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!isCollapsed && <span className="ml-3">Sair</span>}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
