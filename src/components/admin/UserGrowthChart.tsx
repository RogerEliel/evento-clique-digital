
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { UserGrowthData } from '@/hooks/useAdminStats';

interface UserGrowthChartProps {
  data: UserGrowthData[];
}

export function UserGrowthChart({ data }: UserGrowthChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    week: format(new Date(item.week_start), 'dd MMM', { locale: ptBR })
  }));

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Crescimento de Usuários</CardTitle>
        <CardDescription>Usuários novos por semana</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
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
  );
}
