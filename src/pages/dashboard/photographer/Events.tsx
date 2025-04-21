
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CalendarPlus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { eventsService } from '@/services/events';
import { EventForm } from '@/components/events/EventForm';
import { DeleteEventDialog } from '@/components/events/DeleteEventDialog';
import { EventsTable } from '@/components/events/EventsTable';
import { supabase } from "@/integrations/supabase/client";

export default function EventsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: eventsService.listEvents,
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      setDeleteDialogOpen(false);
      setSelectedEvent(null);
      toast({
        title: "Evento excluído",
        description: "O evento foi excluído com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao excluir evento",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(event.date).toLocaleDateString('pt-BR').includes(searchTerm)
  );

  const handleDeleteClick = (event: any) => {
    setSelectedEvent(event);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (selectedEvent) {
      deleteEventMutation.mutate(selectedEvent.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Eventos</h1>
          <p className="text-muted-foreground">Gerencie todos seus eventos fotográficos</p>
        </div>
        <Button 
          className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90"
          onClick={() => setCreateDialogOpen(true)}
        >
          <CalendarPlus className="mr-2 h-4 w-4" /> Novo evento
        </Button>
      </div>
      
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar eventos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="rounded-md border">
        <EventsTable 
          events={filteredEvents}
          onDeleteClick={handleDeleteClick}
        />
      </div>
      
      <EventForm
        isOpen={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      <DeleteEventDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        eventName={selectedEvent?.name}
        isDeleting={deleteEventMutation.isPending}
      />
    </div>
  );
}
