
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

export type Guest = Database['public']['Tables']['guests']['Row'];
export type GuestInsert = Database['public']['Tables']['guests']['Insert'];

export const guestsService = {
  async listGuestsByEvent(eventId: string) {
    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createGuest(guest: GuestInsert) {
    const { data, error } = await supabase
      .from('guests')
      .insert(guest)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateGuest(id: string, updates: Partial<GuestInsert>) {
    const { data, error } = await supabase
      .from('guests')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteGuest(id: string) {
    const { error } = await supabase
      .from('guests')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
