
import { useState } from 'react';
import { User, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProfile } from '@/hooks/useProfile';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { SecurityForm } from '@/components/profile/SecurityForm';

export default function ClientProfilePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { profile, updateProfile } = useProfile();
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateProfile.mutateAsync({
        name: profile?.name || '',
        phone: profile?.phone || '',
        company: profile?.company || '',
      });
      
      toast({
        title: "Perfil atualizado",
        description: "Seu perfil foi atualizado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar o perfil.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      toast({
        title: "Erro de validação",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Senha atualizada",
        description: "Sua senha foi atualizada com sucesso.",
      });
      
      setSecurityForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar a senha.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecurityFormChange = (field: string, value: string) => {
    setSecurityForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfileFieldChange = (field: keyof typeof profile, value: string) => {
    updateProfile.mutate({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <ProfileHeader 
        title="Meu Perfil" 
        description="Gerencie suas informações pessoais" 
      />
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Perfil
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Key className="h-4 w-4" /> Segurança
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <ProfileForm
            profile={profile}
            isLoading={isLoading}
            isPending={updateProfile.isPending}
            onSubmit={handleProfileSubmit}
            onFieldChange={handleProfileFieldChange}
          />
        </TabsContent>
        
        <TabsContent value="security">
          <SecurityForm
            isLoading={isLoading}
            securityForm={securityForm}
            onSubmit={handleSecuritySubmit}
            onSecurityFormChange={handleSecurityFormChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
