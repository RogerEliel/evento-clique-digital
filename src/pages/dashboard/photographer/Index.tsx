
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { CalendarPlus, GalleryThumbnails, Users, CreditCard, BarChart } from 'lucide-react';

interface DashboardStats {
  totalEvents: number;
  totalPhotos: number;
  totalGuests: number;
  totalRevenue: number;
  recentEvents: {
    id: string;
    name: string;
    date: string;
    location: string;
  }[];
  subscriptionStatus: {
    hasSubscription: boolean;
    subscription: {
      status: string;
      current_period_end: string;
      price_id: string;
    } | null;
  };
}

export default function PhotographerDashboard() {
  const { toast } = useToast();

  // Fetch dashboard data
  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async (): Promise<DashboardStats> => {
      // Get events count
      const { data: events, error: eventsError } = await supabase
        .from("events")
        .select("id, name, date, location")
        .order("date", { ascending: false })
        .limit(5);
      
      if (eventsError) throw new Error("Failed to fetch events");
      
      // Get total photos count
      const { count: photosCount, error: photosError } = await supabase
        .from("photos")
        .select("id", { count: 'exact', head: true });
      
      if (photosError) throw new Error("Failed to fetch photo count");
      
      // Get guests count
      const { count: guestsCount, error: guestsError } = await supabase
        .from("guests")
        .select("id", { count: 'exact', head: true });
      
      if (guestsError) throw new Error("Failed to fetch guest count");
      
      // Get total revenue (mock data for now as we'd need to sum from orders)
      // In real implementation, this should come from a proper database query
      const totalRevenue = 1250; // Mock value
      
      // Check subscription status
      const { data: subscriptionData, error: subscriptionError } = await supabase.functions.invoke('check-subscription-status');
      
      if (subscriptionError) {
        console.error("Error checking subscription:", subscriptionError);
      }
      
      return {
        totalEvents: events.length,
        totalPhotos: photosCount || 0,
        totalGuests: guestsCount || 0,
        totalRevenue: totalRevenue,
        recentEvents: events.map(event => ({
          id: event.id,
          name: event.name,
          date: event.date,
          location: event.location || ''
        })),
        subscriptionStatus: subscriptionData || { hasSubscription: false, subscription: null }
      };
    }
  });

  if (isError) {
    toast({
      title: "Erro ao carregar dados",
      description: "Não foi possível carregar os dados do dashboard. Por favor, tente novamente.",
      variant: "destructive",
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Painel de Controle</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao seu painel de controle. Aqui você pode gerenciar todos os aspectos do seu trabalho.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Eventos" 
          value={isLoading ? undefined : stats?.totalEvents || 0} 
          icon={<CalendarPlus className="h-5 w-5" />}
          linkTo="/dashboard/photographer/events"
        />
        <StatCard 
          title="Fotos" 
          value={isLoading ? undefined : stats?.totalPhotos || 0} 
          icon={<GalleryThumbnails className="h-5 w-5" />}
          linkTo="/dashboard/photographer/gallery"
        />
        <StatCard 
          title="Convidados" 
          value={isLoading ? undefined : stats?.totalGuests || 0} 
          icon={<Users className="h-5 w-5" />}
          linkTo="/dashboard/photographer/clients"
        />
        <StatCard 
          title="Faturamento" 
          value={isLoading ? undefined : `R$ ${stats?.totalRevenue.toFixed(2)}` || 'R$ 0,00'} 
          icon={<BarChart className="h-5 w-5" />}
          linkTo="/dashboard/photographer/orders"
          isMonetary
        />
      </div>

      {/* Subscription status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Status da Assinatura
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-5 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          ) : stats?.subscriptionStatus?.hasSubscription ? (
            <div>
              <p className="font-medium text-green-600">
                Assinatura ativa
              </p>
              <p className="text-sm text-muted-foreground">
                Próxima renovação em {new Date(stats.subscriptionStatus.subscription?.current_period_end || '').toLocaleDateString('pt-BR')}
              </p>
            </div>
          ) : (
            <p>Você ainda não possui uma assinatura ativa.</p>
          )}
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline">
            <Link to="/dashboard/photographer/subscription">Gerenciar Assinatura</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Recent events */}
      <Card>
        <CardHeader>
          <CardTitle>Eventos Recentes</CardTitle>
          <CardDescription>Os eventos mais recentes que você adicionou</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {Array(3).fill(null).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : stats?.recentEvents && stats.recentEvents.length > 0 ? (
            <div className="space-y-2">
              {stats.recentEvents.map(event => (
                <div key={event.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div>
                    <p className="font-medium">{event.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('pt-BR')} • {event.location}
                    </p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/dashboard/photographer/events?id=${event.id}`}>Ver</Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Nenhum evento encontrado. Crie seu primeiro evento.</p>
          )}
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link to="/dashboard/photographer/events">
              <CalendarPlus className="mr-2 h-4 w-4" />
              {stats?.recentEvents?.length ? "Ver todos os eventos" : "Criar evento"}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function StatCard({ title, value, icon, linkTo, isMonetary = false }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {value !== undefined ? (
          <p className="text-2xl font-bold">{value}</p>
        ) : (
          <Skeleton className="h-8 w-[100px]" />
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="px-0 text-sm text-muted-foreground hover:text-foreground">
          <Link to={linkTo}>Ver detalhes →</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export { PhotographerDashboard };
