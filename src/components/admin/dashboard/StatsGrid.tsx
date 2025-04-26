
import { StatCard } from '../StatCard';
import type { DashboardStats } from '@/hooks/useAdminStats';

interface StatsGridProps {
  stats: DashboardStats | null;
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Total de Usuários" 
        value={stats?.total_users || 0} 
        description="Usuários registrados na plataforma" 
      />
      <StatCard 
        title="Fotógrafos" 
        value={stats?.photographers_count || 0} 
        description="Fotógrafos ativos" 
      />
      <StatCard 
        title="Clientes" 
        value={stats?.clients_count || 0} 
        description="Clientes registrados" 
      />
      <StatCard 
        title="Eventos" 
        value={stats?.events_count || 0} 
        description="Eventos cadastrados" 
      />
    </div>
  );
}
