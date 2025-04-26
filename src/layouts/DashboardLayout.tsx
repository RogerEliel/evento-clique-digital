
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserType } from "@/utils/auth";
import { Navigation } from "@/components/layout/Navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { navigationConfig } from "@/config/navigation";
import type { UserRole } from "@/utils/auth";

export interface DashboardLayoutProps {
  children?: ReactNode;
  userType?: UserRole;
}

export function DashboardLayout({ children, userType: userTypeProp }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const storedUserType = getUserType();
  const currentUserType = userTypeProp || storedUserType || 'client';
  
  // If admin, redirect to admin panel
  useEffect(() => {
    if (currentUserType === "admin") {
      navigate('/admin');
    }
  }, [currentUserType, navigate]);
  
  const navItems = navigationConfig[currentUserType].items;
  const headerTitle = currentUserType === "photographer" ? "Painel do Fotógrafo" : "Painel do Cliente";
  
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header title={headerTitle} />

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <Navigation items={navItems} userType={currentUserType} />

        {/* Main content */}
        <main className="flex-1 p-4">{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
