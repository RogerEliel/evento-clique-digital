
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { guestsService } from '@/services/guests';
import { useToast } from '@/hooks/use-toast';
import { Guest, GuestInsert } from '@/services/guests'; // Import the types

// Update the zod schema to ensure non-empty strings
const guestFormSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
});

type GuestFormValues = z.infer<typeof guestFormSchema>;

interface GuestFormProps {
  eventId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  guest?: Guest; // Use the Guest type from the service
}

export function GuestForm({ eventId, isOpen, onOpenChange, guest }: GuestFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<GuestFormValues>({
    resolver: zodResolver(guestFormSchema),
    defaultValues: {
      name: guest?.name || '',
      email: guest?.email || '',
    },
  });

  const guestMutation = useMutation({
    mutationFn: guest 
      ? (data: GuestFormValues) => guestsService.updateGuest(guest.id, { 
          ...data, 
          event_id: eventId 
        } as GuestInsert)
      : (data: GuestFormValues) => guestsService.createGuest({ 
          ...data, 
          event_id: eventId 
        } as GuestInsert),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests', eventId] });
      onOpenChange(false);
      form.reset();
      toast({
        title: guest ? "Convidado atualizado" : "Convidado adicionado",
        description: guest 
          ? "As informações do convidado foram atualizadas." 
          : "Um novo convidado foi adicionado ao evento.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: guest 
          ? "Não foi possível atualizar o convidado." 
          : "Não foi possível adicionar o convidado.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: GuestFormValues) => {
    guestMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{guest ? 'Editar Convidado' : 'Adicionar Convidado'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do convidado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="E-mail do convidado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={guestMutation.isPending}
              >
                {guest ? 'Atualizar' : 'Adicionar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
