
import { useState } from 'react';
import { Calendar, Clock, ExternalLink, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data for client events
const mockClientEvents = [
  { 
    id: '1', 
    name: 'Casamento João e Maria', 
    date: '2023-10-15', 
    time: '16:00', 
    location: 'Buffet Solar, São Paulo, SP',
    status: 'upcoming',
    totalPhotos: 236,
    photographer: 'Estúdio Fotográfico Demo'
  },
  { 
    id: '2', 
    name: 'Aniversário 15 Anos - Ana', 
    date: '2023-11-20', 
    time: '19:30',
    location: 'Casa de Festas Vale Verde, Rio de Janeiro, RJ',
    status: 'upcoming',
    totalPhotos: 158,
    photographer: 'Estúdio Fotográfico Demo'
  },
  { 
    id: '3', 
    name: 'Formatura Eng. Civil UFPR', 
    date: '2023-09-08', 
    time: '20:00',
    location: 'Centro de Eventos Barigui, Curitiba, PR',
    status: 'past',
    totalPhotos: 453,
    photographer: 'Estúdio Fotográfico Demo'
  }
];

export default function MyEventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState(mockClientEvents);

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(event.date).toLocaleDateString('pt-BR').includes(searchTerm)
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-[#52E0A1] hover:bg-[#52E0A1]/80 text-[#1E2D3D]">Próximo</Badge>;
      case 'past':
        return <Badge variant="secondary">Passado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Meus Eventos</h1>
        <p className="text-muted-foreground">Eventos que você foi convidado a participar</p>
      </div>
      
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar eventos..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{event.name}</CardTitle>
                    <CardDescription>{event.photographer}</CardDescription>
                  </div>
                  {getStatusBadge(event.status)}
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3 flex justify-between items-center">
                <div>
                  <span className="text-sm text-muted-foreground">
                    {event.totalPhotos} fotos disponíveis
                  </span>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-[#FF6B6B] hover:text-[#FF6B6B]/90 hover:bg-[#FF6B6B]/10 flex gap-1 items-center"
                >
                  Ver galeria <ExternalLink className="h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg p-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Calendar className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Nenhum evento encontrado</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Você não está associado a nenhum evento ou seus termos de busca não retornaram resultados.
          </p>
        </div>
      )}
    </div>
  );
}
