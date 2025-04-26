import { UserGrowthChart } from '../charts/UserGrowthChart';
import { RecentPhotographersList } from '../RecentPhotographersList';
import type { DashboardStats, UserGrowthData } from '@/hooks/useAdminStats';

interface DataSectionProps {
  stats: DashboardStats | null;
  growthData: UserGrowthData[];
}

export function DataSection({ stats, growthData }: DataSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <UserGrowthChart data={growthData} />
      <RecentPhotographersList photographers={stats?.recent_photographers || []} />
    </div>
  );
}
