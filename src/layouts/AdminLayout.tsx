
import { ReactNode } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { navigationConfig } from "@/config/navigation";

export interface AdminLayoutProps {
  children?: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header title="Painel de Administração" />

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <Navigation items={navigationConfig.admin.items} userType="admin" />

        {/* Main content */}
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer additionalText="Painel Admin" />
    </div>
  );
}
