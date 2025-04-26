
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from '@/hooks/useUserManagement';

interface UserTableProps {
  users: User[];
  onPromoteToAdmin: (userId: string) => void;
  onSetActiveStatus: (userId: string, isActive: boolean) => void;
}

export function UserTable({ users, onPromoteToAdmin, onSetActiveStatus }: UserTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                Nenhum usuário encontrado com os filtros atuais.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name || 'N/A'}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={
                    user.role === 'admin' 
                      ? 'destructive' 
                      : user.role === 'photographer' 
                        ? 'default' 
                        : 'secondary'
                  }>
                    {user.role === 'admin' 
                      ? 'Admin' 
                      : user.role === 'photographer' 
                        ? 'Fotógrafo' 
                        : 'Cliente'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.is_active ? 'outline' : 'destructive'}>
                    {user.is_active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(user.created_at), 'dd/MM/yyyy')}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Ações
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {user.role !== 'admin' && (
                        <DropdownMenuItem 
                          onClick={() => onPromoteToAdmin(user.id)}
                        >
                          Promover a Admin
                        </DropdownMenuItem>
                      )}
                      
                      {user.is_active ? (
                        <DropdownMenuItem 
                          onClick={() => onSetActiveStatus(user.id, false)}
                          className="text-destructive"
                        >
                          Desativar
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem 
                          onClick={() => onSetActiveStatus(user.id, true)}
                        >
                          Ativar
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
