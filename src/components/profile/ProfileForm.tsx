
import { Save, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ProfileAvatar } from "./ProfileAvatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Profile } from "@/hooks/useProfile";

interface ProfileFormProps {
  profile: Profile | null;
  isLoading: boolean;
  isPending: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onFieldChange: (field: keyof Profile, value: string) => void;
  showBio?: boolean;
}

export function ProfileForm({ profile, isLoading, isPending, onSubmit, onFieldChange, showBio = false }: ProfileFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações do perfil</CardTitle>
        <CardDescription>
          Atualize suas informações pessoais
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <ProfileAvatar avatarUrl={profile?.avatar_url} name={profile?.name} />
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input 
                id="name"
                name="name"
                value={profile?.name || ''}
                onChange={(e) => onFieldChange('name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input 
                id="phone"
                name="phone"
                value={profile?.phone || ''}
                onChange={(e) => onFieldChange('phone', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Empresa/Studio</Label>
              <Input 
                id="company"
                name="company"
                value={profile?.company || ''}
                onChange={(e) => onFieldChange('company', e.target.value)}
              />
            </div>

            {showBio && (
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profile?.bio || ''}
                  onChange={(e) => onFieldChange('bio', e.target.value)}
                  className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit"
            className="bg-[#52E0A1] hover:bg-[#52E0A1]/90 text-[#1E2D3D]"
            disabled={isLoading || isPending}
          >
            {isLoading || isPending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" /> Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Salvar alterações
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
