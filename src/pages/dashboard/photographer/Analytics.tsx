
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  BarChart, 
  CalendarDays, 
  Download, 
  Info, 
  Users, 
  CreditCard 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

interface DashboardStats {
  events: number;
  revenue: number;
  clients: number;
  subscription: {
    hasSubscription: boolean;
    subscription: {
      status: string;
      current_period_end: string;
      price_id: string;
      stripe_subscription_id: string;
    } | null;
  };
}

interface SalesTrend {
  date: string;
  sales: number;
  events: number;
}

const AnalyticsPage = () => {
  const { toast } = useToast();
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  
  // Fetch dashboard stats
  const { data: stats, isLoading: isLoadingStats, error: statsError } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async (): Promise<DashboardStats> => {
      const { data, error } = await supabase.functions.invoke('get-dashboard-stats');
      
      if (error) {
        console.error("Error fetching dashboard stats:", error);
        throw new Error('Falha ao carregar estatísticas');
      }
      
      return data;
    },
  });
  
  // Fetch sales trends
  const { data: salesTrends, isLoading: isLoadingTrends, error: trendsError } = useQuery({
    queryKey: ['sales-trends', period],
    queryFn: async (): Promise<SalesTrend[]> => {
      const { data, error } = await supabase.functions.invoke('get-sales-trends', {
        body: { period },
      });
      
      if (error) {
        console.error("Error fetching sales trends:", error);
        throw new Error('Falha ao carregar tendências de vendas');
      }
      
      // Format dates to be readable
      return (data || []).map((item: any) => ({
        ...item,
        date: format(new Date(item.date), 'dd/MM'),
      }));
    },
  });
  
  // Handle period change
  const handlePeriodChange = (value: '7d' | '30d' | '90d') => {
    setPeriod(value);
  };
  
  // Export CSV function
  const exportCSV = () => {
    if (!salesTrends) return;
    
    // Convert data to CSV
    const headers = ['Data', 'Vendas (R$)', 'Eventos'];
    const dataRows = salesTrends.map(row => [
      row.date, 
      (row.sales / 100).toFixed(2).replace('.', ','), 
      row.events
    ]);
    
    // Create CSV content
    const csvContent = [
      headers.join(';'),
      ...dataRows.map(row => row.join(';'))
    ].join('\n');
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `vendas-${period}-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Relatório exportado",
      description: "Seu relatório CSV foi baixado com sucesso."
    });
  };
  
  // Show error if any
  if (statsError || trendsError) {
    toast({
      title: "Erro ao carregar dados",
      description: "Não foi possível carregar os dados de análise. Por favor, tente novamente.",
      variant: "destructive",
    });
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value / 100);
  };

  // Subscription status card content
  const renderSubscriptionStatus = () => {
    if (isLoadingStats) {
      return <Skeleton className="h-6 w-24" />;
    }
    
    if (!stats?.subscription?.hasSubscription) {
      return <span className="text-amber-500 font-medium">Sem assinatura</span>;
    }
    
    const status = stats.subscription.subscription?.status;
    const endDate = stats.subscription.subscription?.current_period_end;
    
    if (status === 'active') {
      return (
        <div>
          <span className="text-green-500 font-medium">Ativa</span>
          {endDate && (
            <p className="text-sm text-muted-foreground mt-1">
              Próxima cobrança: {format(new Date(endDate), 'dd/MM/yyyy')}
            </p>
          )}
        </div>
      );
    }
    
    if (status === 'canceled') {
      return <span className="text-destructive font-medium">Cancelada</span>;
    }
    
    return <span className="text-muted-foreground">{status || 'Desconhecido'}</span>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Análise e Relatórios</h1>
        <p className="text-muted-foreground">
          Acompanhe o desempenho do seu trabalho com estatísticas detalhadas.
        </p>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Events Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Eventos</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingStats ? (
              <Skeleton className="h-10 w-16" />
            ) : (
              <div className="text-2xl font-bold">{stats?.events || 0}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Total de eventos cadastrados
            </p>
          </CardContent>
        </Card>
        
        {/* Revenue Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Receita</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingStats ? (
              <Skeleton className="h-10 w-28" />
            ) : (
              <div className="text-2xl font-bold">{formatCurrency(stats?.revenue || 0)}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Valor total em vendas
            </p>
          </CardContent>
        </Card>
        
        {/* Clients Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingStats ? (
              <Skeleton className="h-10 w-16" />
            ) : (
              <div className="text-2xl font-bold">{stats?.clients || 0}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Clientes únicos
            </p>
          </CardContent>
        </Card>
        
        {/* Subscription Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Assinatura</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {renderSubscriptionStatus()}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" size="sm" className="w-full">
              <a href="/dashboard/photographer/subscription">
                Gerenciar assinatura
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Sales Trends Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tendências de Vendas</CardTitle>
              <CardDescription>
                Visualize suas vendas e eventos ao longo do tempo
              </CardDescription>
            </div>
            <Tabs value={period} onValueChange={handlePeriodChange as any}>
              <TabsList>
                <TabsTrigger value="7d">7 dias</TabsTrigger>
                <TabsTrigger value="30d">30 dias</TabsTrigger>
                <TabsTrigger value="90d">90 dias</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {isLoadingTrends ? (
            <div className="w-full aspect-[4/2]">
              <Skeleton className="w-full h-full" />
            </div>
          ) : salesTrends && salesTrends.length > 0 ? (
            <ChartContainer 
              config={{ 
                sales: { color: "#0ea5e9", label: "Vendas" }, 
                events: { color: "#8b5cf6", label: "Eventos" } 
              }}
              className="aspect-[4/2] h-full w-full"
            >
              <LineChart data={salesTrends}>
                <XAxis 
                  dataKey="date" 
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                />
                <YAxis 
                  yAxisId="left"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `R$${value/100}`}
                  fontSize={12}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="var(--color-sales)"
                  strokeWidth={2}
                  yAxisId="left"
                  name="Vendas"
                  formatter={(value) => `R$${(value/100).toFixed(2)}`}
                />
                <Line
                  type="monotone"
                  dataKey="events"
                  stroke="var(--color-events)"
                  strokeWidth={2}
                  yAxisId="right"
                  name="Eventos"
                />
              </LineChart>
            </ChartContainer>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2 py-12">
              <Info className="h-10 w-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Não há dados suficientes para exibir um gráfico neste período.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            variant="outline" 
            onClick={exportCSV}
            disabled={!salesTrends || salesTrends.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
