
import { useAdminDashboardStats } from '@/hooks/useAdminDashboardStats';
import { DashboardContainer } from '@/components/admin/dashboard/DashboardContainer';
import { StatsGrid } from '@/components/admin/dashboard/StatsGrid';
import { DataSection } from '@/components/admin/dashboard/DataSection';
import { DashboardSkeleton } from '@/components/admin/DashboardSkeleton';

export default function AdminDashboard() {
  const { stats, growthData, loading } = useAdminDashboardStats();

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <DashboardContainer>
      <StatsGrid stats={stats} />
      <DataSection stats={stats} growthData={growthData} />
    </DashboardContainer>
  );
}
