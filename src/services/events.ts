
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Event = Database["public"]["Tables"]["events"]["Row"];
type Photo = Database["public"]["Tables"]["photos"]["Row"];

export const eventsService = {
  async listEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;
    return data;
  },

  async createEvent(event: Omit<Event, "id" | "photographer_id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("events")
      .insert(event)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async uploadPhotos(eventId: string, files: File[]) {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error("Not authenticated");

    const uploadPromises = files.map(async (file) => {
      const path = `${user.id}/${eventId}/${file.name}`;
      const { error: uploadError, data } = await supabase.storage
        .from("events")
        .upload(path, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("events")
        .getPublicUrl(path);

      const { error: dbError } = await supabase
        .from("photos")
        .insert({
          event_id: eventId,
          url: publicUrl,
          storage_path: path,
        });

      if (dbError) throw dbError;
      return publicUrl;
    });

    return Promise.all(uploadPromises);
  }
};
