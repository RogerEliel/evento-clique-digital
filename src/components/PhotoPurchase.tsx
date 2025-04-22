
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PhotoPurchaseProps {
  token: string;
  selectedPhotos: string[];
  onPurchaseComplete?: () => void;
}

export function PhotoPurchase({ token, selectedPhotos, onPurchaseComplete }: PhotoPurchaseProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    if (selectedPhotos.length === 0) {
      toast({
        title: "Nenhuma foto selecionada",
        description: "Por favor, selecione pelo menos uma foto para comprar.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { token, photos: selectedPhotos }
      });

      if (error) throw error;
      if (!data?.url) throw new Error('URL de checkout não encontrada');

      window.location.href = data.url;
      onPurchaseComplete?.();
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Erro ao processar compra",
        description: "Não foi possível iniciar o processo de compra. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePurchase}
      disabled={isLoading || selectedPhotos.length === 0}
      className="bg-[#52E0A1] hover:bg-[#52E0A1]/90 text-[#1E2D3D]"
    >
      <ShoppingCart className="w-4 h-4 mr-2" />
      {isLoading ? "Processando..." : `Comprar ${selectedPhotos.length} foto${selectedPhotos.length !== 1 ? 's' : ''}`}
    </Button>
  );
}
