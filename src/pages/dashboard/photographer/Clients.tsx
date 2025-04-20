
import { useState } from 'react';
import { Check, Edit, MailIcon, MoreHorizontal, Plus, Search, Trash2, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';

// Mock clients data
const mockClients = [
  { 
    id: '1', 
    name: 'João Silva', 
    email: 'joao.silva@example.com', 
    event: 'Casamento João e Maria',
    hasPhoto: true,
    access: 'full',
    avatarUrl: 'https://i.pravatar.cc/150?img=1'
  },
  { 
    id: '2', 
    name: 'Maria Oliveira', 
    email: 'maria.oliveira@example.com', 
    event: 'Casamento João e Maria',
    hasPhoto: true,
    access: 'full',
    avatarUrl: 'https://i.pravatar.cc/150?img=5'
  },
  { 
    id: '3', 
    name: 'Pedro Santos', 
    email: 'pedro.santos@example.com', 
    event: 'Casamento João e Maria',
    hasPhoto: false,
    access: 'view',
    avatarUrl: ''
  },
  { 
    id: '4', 
    name: 'Ana Clara', 
    email: 'ana.clara@example.com', 
    event: 'Aniversário 15 Anos - Ana',
    hasPhoto: true,
    access: 'full',
    avatarUrl: 'https://i.pravatar.cc/150?img=10'
  },
  { 
    id: '5', 
    name: 'Carlos Eduardo', 
    email: 'carlos.eduardo@example.com', 
    event: 'Aniversário 15 Anos - Ana',
    hasPhoto: false,
    access: 'view',
    avatarUrl: ''
  },
];

// Mock events for filter
const mockEvents = [
  { id: 'all', name: 'Todos os eventos' },
  { id: '1', name: 'Casamento João e Maria' },
  { id: '2', name: 'Aniversário 15 Anos - Ana' },
  { id: '3', name: 'Formatura Eng. Civil UFPR' },
  { id: '4', name: 'Corporate Meeting - Startup X' },
  { id: '5', name: 'Festival de Música Indie' },
];

export default function ClientsPage() {
  const { toast } = useToast();
  const [clients, setClients] = useState(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientName, setNewClientName] = useState('');
  const [newClientEvent, setNewClientEvent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesEvent = selectedEvent === 'all' || client.event === mockEvents.find(e => e.id === selectedEvent)?.name;
    
    return matchesSearch && matchesEvent;
  });

  const handleDeleteClick = (client: any) => {
    setSelectedClient(client);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    
    try {
      // Mock delete - to be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setClients(clients.filter(c => c.id !== selectedClient.id));
      toast({
        title: "Cliente removido",
        description: `${selectedClient.name} foi removido com sucesso.`,
      });
    } catch (error) {
      toast({
        title: "Erro ao remover",
        description: "Não foi possível remover o cliente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Mock API call - to be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newClient = {
        id: `${clients.length + 1}`,
        name: newClientName,
        email: newClientEmail,
        event: mockEvents.find(e => e.id === newClientEvent)?.name || '',
        hasPhoto: false,
        access: 'view',
        avatarUrl: ''
      };
      
      setClients([...clients, newClient]);
      
      toast({
        title: "Convite enviado",
        description: `Um convite foi enviado para ${newClientEmail}`,
      });
      
      setNewClientName('');
      setNewClientEmail('');
      setNewClientEvent('');
    } catch (error) {
      toast({
        title: "Erro ao enviar convite",
        description: "Não foi possível enviar o convite.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setInviteDialogOpen(false);
    }
  };

  const getAccessBadge = (access: string) => {
    switch (access) {
      case 'full':
        return <Badge className="bg-[#52E0A1] hover:bg-[#52E0A1]/80 text-[#1E2D3D]">Acesso completo</Badge>;
      case 'view':
        return <Badge variant="secondary">Somente visualização</Badge>;
      default:
        return <Badge variant="outline">{access}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Convidados</h1>
          <p className="text-muted-foreground">Gerencie convidados e seus acessos</p>
        </div>
        <Button 
          className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90"
          onClick={() => setInviteDialogOpen(true)}
        >
          <UserPlus className="mr-2 h-4 w-4" /> Novo convidado
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar convidados..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
        >
          {mockEvents.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Evento</TableHead>
              <TableHead>Foto Referência</TableHead>
              <TableHead>Acesso</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={client.avatarUrl} />
                      <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {client.name}
                  </TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.event}</TableCell>
                  <TableCell>
                    {client.hasPhoto ? (
                      <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                        <Check className="mr-1 h-3 w-3" /> Disponível
                      </span>
                    ) : (
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                        <Plus className="mr-1 h-3 w-3" /> Adicionar
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>{getAccessBadge(client.access)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuItem className="cursor-pointer flex items-center">
                          <Edit className="mr-2 h-4 w-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer flex items-center">
                          <MailIcon className="mr-2 h-4 w-4" /> Reenviar convite
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer text-red-600 flex items-center"
                          onClick={() => handleDeleteClick(client)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Remover
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Nenhum convidado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar remoção</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover o convidado "{selectedClient?.name}"?
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={isLoading}
            >
              {isLoading ? "Removendo..." : "Remover"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Invite Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar novo convidado</DialogTitle>
            <DialogDescription>
              Digite os dados do convidado para enviar um convite de acesso.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleInvite}>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Nome do convidado"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={newClientEmail}
                  onChange={(e) => setNewClientEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event">Evento</Label>
                <select
                  id="event"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={newClientEvent}
                  onChange={(e) => setNewClientEvent(e.target.value)}
                  required
                >
                  <option value="">Selecione um evento</option>
                  {mockEvents.filter(e => e.id !== 'all').map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setInviteDialogOpen(false)}
                type="button"
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                className="bg-[#52E0A1] hover:bg-[#52E0A1]/90 text-[#1E2D3D]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <MailIcon className="h-4 w-4" /> Enviar convite
                  </span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
