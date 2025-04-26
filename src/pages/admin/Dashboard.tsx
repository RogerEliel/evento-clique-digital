
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface RecentPhotographer {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

interface UserGrowthData {
  week_start: string;
  new_users: number;
}

interface DashboardStats {
  total_users: number;
  photographers_count: number;
  clients_count: number;
  events_count: number;
  recent_photographers: RecentPhotographer[];
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [growthData, setGrowthData] = useState<UserGrowthData[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data: statsData, error: statsError } = await supabase
          .rpc('get_admin_dashboard_stats');

        if (statsError) throw statsError;
        
        const { data: growthData, error: growthError } = await supabase
          .rpc('get_user_growth_by_week');

        if (growthError) throw growthError;

        // Parse the JSON response from the database function
        const parsedStatsData = typeof statsData === 'string' 
          ? JSON.parse(statsData) 
          : statsData;
        
        setStats(parsedStatsData as DashboardStats);
        setGrowthData(growthData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formattedGrowthData = growthData.map(item => ({
    ...item,
    week: format(new Date(item.week_start), 'dd MMM', { locale: ptBR })
  }));

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
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Crescimento de Usuários</CardTitle>
            <CardDescription>Usuários novos por semana</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={formattedGrowthData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="new_users" 
                  stroke="#8884d8" 
                  name="Novos Usuários"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fotógrafos Recentes</CardTitle>
            <CardDescription>Últimos 5 fotógrafos registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.recent_photographers?.map((photographer) => (
                <div key={photographer.id} className="flex flex-col">
                  <span className="font-medium">{photographer.name}</span>
                  <span className="text-sm text-muted-foreground">{photographer.email}</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(photographer.created_at), 'dd/MM/yyyy')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, description }: { title: string; value: number; description: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-80 w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
