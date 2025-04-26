
import { Card, CardContent } from '@/components/ui/card';
import { useUserManagement } from '@/hooks/useUserManagement';
import { UserFilters } from '@/components/admin/UserFilters';
import { UserTable } from '@/components/admin/UserTable';
import { TableSkeleton } from '@/components/admin/TableSkeleton';

export default function UsersPage() {
  const {
    users,
    loading,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    handlePromoteToAdmin,
    handleSetActiveStatus
  } = useUserManagement();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>
      
      <UserFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      
      <Card>
        <CardContent className="pt-6">
          {loading ? (
            <TableSkeleton />
          ) : (
            <UserTable 
              users={users}
              onPromoteToAdmin={handlePromoteToAdmin}
              onSetActiveStatus={handleSetActiveStatus}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
