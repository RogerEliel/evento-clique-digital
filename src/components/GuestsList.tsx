
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit, Trash2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { guestsService } from '@/services/guests';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface GuestsListProps {
  eventId: string;
}

export function GuestsList({ eventId }: GuestsListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedGuest, setSelectedGuest] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data: guests = [], isLoading } = useQuery({
    queryKey: ['guests', eventId],
    queryFn: () => guestsService.listGuestsByEvent(eventId),
  });

  const deleteGuestMutation = useMutation({
    mutationFn: (guestId: string) => guestsService.deleteGuest(guestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests', eventId] });
      setDeleteDialogOpen(false);
      toast({
        title: "Convidado removido",
        description: "O convidado foi removido com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao remover convidado",
        description: "Não foi possível remover o convidado.",
        variant: "destructive",
      });
    }
  });

  const handleDeleteGuest = (guest: any) => {
    setSelectedGuest(guest);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedGuest) {
      deleteGuestMutation.mutate(selectedGuest.id);
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Data do Convite</TableHead>
            <TableHead className="w-[100px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map((guest) => (
            <TableRow key={guest.id}>
              <TableCell>{guest.name}</TableCell>
              <TableCell>{guest.email}</TableCell>
              <TableCell>
                {guest.invited_at 
                  ? format(new Date(guest.invited_at), 'dd/MM/yyyy HH:mm') 
                  : '-'}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteGuest(guest)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o convidado "{selectedGuest?.name}"?
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={deleteGuestMutation.isPending}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
