
import { useAdminStats } from '@/hooks/useAdminStats';
import { StatCard } from '@/components/admin/StatCard';
import { UserGrowthChart } from '@/components/admin/UserGrowthChart';
import { RecentPhotographersList } from '@/components/admin/RecentPhotographersList';
import { DashboardSkeleton } from '@/components/admin/DashboardSkeleton';

export default function AdminDashboard() {
  const { stats, growthData, loading } = useAdminStats();

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Painel Administrativo</h1>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UserGrowthChart data={growthData} />
        <RecentPhotographersList photographers={stats?.recent_photographers || []} />
      </div>
    </div>
  );
}
