
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function SettingsPage() {
  const handleSave = () => {
    toast.success("Configurações salvas com sucesso");
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Configurações</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Configurações do Sistema</CardTitle>
          <CardDescription>
            Gerenciamento das configurações gerais do sistema.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="site-name">Nome do Site</Label>
            <Input id="site-name" defaultValue="Photography Platform" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email de Contato</Label>
            <Input id="contact-email" defaultValue="contato@photography.com" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="language">Idioma Padrão</Label>
            <Select defaultValue="pt-BR">
              <SelectTrigger id="language">
                <SelectValue placeholder="Selecione um idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                <SelectItem value="en-US">English (United States)</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="maintenance-mode">Modo de Manutenção</Label>
            <Switch id="maintenance-mode" />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="user-registration">Permitir Novos Registros</Label>
            <Switch id="user-registration" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Notificações por Email</Label>
            <Switch id="email-notifications" defaultChecked />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSave}>Salvar Configurações</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
