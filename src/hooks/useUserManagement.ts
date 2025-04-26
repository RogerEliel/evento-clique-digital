
import { useState, useEffect, useMemo } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { promoteToAdmin, setUserActiveStatus } from '@/utils/auth';
import type { UserRole } from '@/utils/auth';

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
  role: UserRole;
  is_active: boolean;
}

export function useUserManagement() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredUsers = useMemo(() => {
    let result = [...users];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(query) || 
        user.email.toLowerCase().includes(query)
      );
    }
    
    // Apply role filter
    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active';
      result = result.filter(user => user.is_active === isActive);
    }
    
    return result;
  }, [users, searchQuery, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_all_users');
      
      if (error) throw error;
      
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar a lista de usuários.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePromoteToAdmin = async (userId: string) => {
    try {
      const success = await promoteToAdmin(userId);
      
      if (success) {
        toast({
          title: "Sucesso",
          description: "Usuário promovido a administrador.",
        });
        
        // Update local state
        setUsers(users.map(user => 
          user.id === userId 
            ? { ...user, role: 'admin' as UserRole } 
            : user
        ));
      } else {
        throw new Error('Failed to promote user');
      }
    } catch (error) {
      console.error('Error promoting user:', error);
      toast({
        title: "Erro",
        description: "Não foi possível promover o usuário.",
        variant: "destructive",
      });
    }
  };

  const handleSetActiveStatus = async (userId: string, isActive: boolean) => {
    try {
      const success = await setUserActiveStatus(userId, isActive);
      
      if (success) {
        toast({
          title: "Sucesso",
          description: isActive 
            ? "Usuário ativado com sucesso." 
            : "Usuário desativado com sucesso.",
        });
        
        // Update local state
        setUsers(users.map(user => 
          user.id === userId 
            ? { ...user, is_active: isActive } 
            : user
        ));
      } else {
        throw new Error('Failed to update user status');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status do usuário.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users: filteredUsers,
    loading,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    refreshUsers: fetchUsers,
    handlePromoteToAdmin,
    handleSetActiveStatus
  };
}
