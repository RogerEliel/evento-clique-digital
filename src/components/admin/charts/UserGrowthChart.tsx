
import { ptBR } from 'date-fns/locale';
import { BaseLineChart } from './BaseLineChart';
import type { UserGrowthData } from '@/hooks/useAdminStats';

interface UserGrowthChartProps {
  data: UserGrowthData[];
}

export function UserGrowthChart({ data }: UserGrowthChartProps) {
  return (
    <BaseLineChart
      data={data}
      title="Crescimento de Usuários"
      description="Usuários novos por semana"
      dataKey="new_users"
      dateKey="week_start"
      tooltipLabel="Novos Usuários"
      locale={ptBR}
    />
  );
}
