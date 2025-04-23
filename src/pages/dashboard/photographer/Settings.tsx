import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useToast } from "@/hooks/use-toast";

interface UserSettings {
  language: string;
  notifications_enabled: boolean;
  branding: { 
    logo_url?: string; 
    color_palette?: string; 
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    language: 'pt-BR',
    notifications_enabled: true,
    branding: {}
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('get-settings');
      
      if (error) throw error;
      
      if (data) {
        setSettings(data);
      }
      setLoading(false);
    } catch (error) {
      toast({
        title: "Erro ao carregar configurações",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase.functions.invoke('update-settings', {
        body: JSON.stringify(settings)
      });
      
      if (error) throw error;
      
      toast({
        title: "Configurações atualizadas",
        description: "Suas configurações foram salvas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar configurações",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Configurações</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Idioma</Label>
          <Select 
            value={settings.language} 
            onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o idioma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
              <SelectItem value="en-US">English (US)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="notifications"
            checked={settings.notifications_enabled}
            onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifications_enabled: checked }))}
          />
          <Label htmlFor="notifications">Habilitar notificações</Label>
        </div>

        <div>
          <Label>Logo URL</Label>
          <Input 
            placeholder="URL da logo" 
            value={settings.branding?.logo_url || ''} 
            onChange={(e) => setSettings(prev => ({ 
              ...prev, 
              branding: { 
                ...prev.branding, 
                logo_url: e.target.value 
              } 
            }))}
          />
        </div>

        <div>
          <Label>Paleta de Cores (JSON)</Label>
          <Input 
            placeholder='{"primary": "#000000", "secondary": "#FFFFFF"}' 
            value={typeof settings.branding?.color_palette === 'string' 
              ? settings.branding.color_palette 
              : JSON.stringify(settings.branding?.color_palette || {})} 
            onChange={(e) => setSettings(prev => ({ 
              ...prev, 
              branding: { 
                ...prev.branding, 
                color_palette: e.target.value 
              } 
            }))}
          />
        </div>

        <Button type="submit" className="w-full">Salvar Configurações</Button>
      </form>
    </div>
  );
}
