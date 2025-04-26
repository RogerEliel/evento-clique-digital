
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { RecentPhotographer } from '@/hooks/useAdminStats';

interface RecentPhotographersListProps {
  photographers: RecentPhotographer[];
}

export function RecentPhotographersList({ photographers }: RecentPhotographersListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fotógrafos Recentes</CardTitle>
        <CardDescription>Últimos 5 fotógrafos registrados</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {photographers?.map((photographer) => (
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
  );
}
