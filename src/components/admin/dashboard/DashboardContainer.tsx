
import { ReactNode } from 'react';

interface DashboardContainerProps {
  children: ReactNode;
}

export function DashboardContainer({ children }: DashboardContainerProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Painel Administrativo</h1>
      {children}
    </div>
  );
}
