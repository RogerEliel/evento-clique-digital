
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface RecentPhotographer {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface DashboardStats {
  total_users: number;
  photographers_count: number;
  clients_count: number;
  events_count: number;
  recent_photographers: RecentPhotographer[];
}

export interface UserGrowthData {
  week_start: string;
  new_users: number;
}

export function useAdminStats() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [growthData, setGrowthData] = useState<UserGrowthData[]>([]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const { data: statsData, error: statsError } = await supabase
        .rpc('get_admin_dashboard_stats');

      if (statsError) throw statsError;
      
      const { data: growthData, error: growthError } = await supabase
        .rpc('get_user_growth_by_week');

      if (growthError) throw growthError;

      // Parse the JSON response if it's a string
      const parsedStatsData = typeof statsData === 'string' 
        ? JSON.parse(statsData) 
        : statsData;
      
      setStats(parsedStatsData as DashboardStats);
      setGrowthData(growthData as UserGrowthData[]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Não foi possível carregar os dados do dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return { stats, growthData, loading, refreshData: fetchDashboardData };
}
