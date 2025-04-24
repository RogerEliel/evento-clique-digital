import { Sidebar } from "@/components/sidebar";
import { ClientHeader } from "@/components/dashboard/client/header";
import { ClientFooter } from "@/components/dashboard/client/footer";
import { PhotographerHeader } from "@/components/dashboard/photographer/header";
import { PhotographerFooter } from "@/components/dashboard/photographer/footer";
import { ReactNode } from "react";

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

export function DashboardLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Cabeçalho */}
      {userType === "photographer" ? (
        <PhotographerHeader />
      ) : (
        <ClientHeader />
      )}

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <Sidebar userType={userType} />

        {/* Conteúdo principal */}
        <main className="flex-1 p-4">{children}</main>
      </div>

      {/* Rodapé */}
      {userType === "photographer" ? (
        <PhotographerFooter />
      ) : (
        <ClientFooter />
      )}
    </div>
  );
}
