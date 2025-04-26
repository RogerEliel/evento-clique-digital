
import { useAdminStats } from './useAdminStats';
import type { DashboardStats, UserGrowthData } from './useAdminStats';

export interface AdminDashboardStats {
  stats: DashboardStats | null;
  growthData: UserGrowthData[];
  loading: boolean;
  refreshData: () => void;
}

export function useAdminDashboardStats(): AdminDashboardStats {
  return useAdminStats();
}
