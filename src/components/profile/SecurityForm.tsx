
import { Save, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface SecurityFormProps {
  isLoading: boolean;
  securityForm: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onSecurityFormChange: (field: string, value: string) => void;
}

export function SecurityForm({ isLoading, securityForm, onSubmit, onSecurityFormChange }: SecurityFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Segurança</CardTitle>
        <CardDescription>
          Gerencie sua senha e configurações de segurança
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Senha atual</Label>
            <Input 
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={securityForm.currentPassword}
              onChange={(e) => onSecurityFormChange('currentPassword', e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nova senha</Label>
            <Input 
              id="newPassword"
              name="newPassword"
              type="password"
              value={securityForm.newPassword}
              onChange={(e) => onSecurityFormChange('newPassword', e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
            <Input 
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={securityForm.confirmPassword}
              onChange={(e) => onSecurityFormChange('confirmPassword', e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit"
            className="bg-[#52E0A1] hover:bg-[#52E0A1]/90 text-[#1E2D3D]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" /> Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Atualizar senha
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
