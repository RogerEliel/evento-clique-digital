
import { format } from 'date-fns';
import type { Locale } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export interface BaseLineChartProps<T> {
  data: T[];
  title: string;
  description: string;
  dataKey: keyof T;
  dateKey: keyof T;
  lineColor?: string;
  tooltipLabel?: string;
  dateFormat?: string;
  locale?: Locale;
}

export function BaseLineChart<T>({ 
  data, 
  title, 
  description, 
  dataKey, 
  dateKey,
  lineColor = '#8884d8',
  tooltipLabel,
  dateFormat = 'dd MMM',
  locale
}: BaseLineChartProps<T>) {
  const formattedData = data.map(item => ({
    ...item,
    [dateKey]: format(new Date(item[dateKey] as string), dateFormat, { locale })
  }));

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dateKey as string} />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey={dataKey as string} 
              stroke={lineColor}
              name={tooltipLabel}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
