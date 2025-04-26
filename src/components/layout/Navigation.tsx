
import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/utils/auth";

interface NavigationItem {
  title: string;
  href: string;
  icon: ReactNode;
}

interface NavigationProps {
  items: NavigationItem[];
  userType: UserRole;
}

export function Navigation({ items, userType }: NavigationProps) {
  const location = useLocation();
  
  return (
    <aside className="w-64 bg-gray-100 p-4 hidden md:block">
      <nav>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link 
                to={item.href} 
                className={cn(
                  "block p-2 hover:bg-gray-200 rounded flex items-center gap-2",
                  location.pathname === item.href && "bg-gray-200 font-medium"
                )}
              >
                <span className="w-5 h-5">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
