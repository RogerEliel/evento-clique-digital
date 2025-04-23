import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

// Tipos para eventos e fotos, baseados no Supabase
type Event = Database["public"]["Tables"]["events"]["Row"];
type Photo = Database["public"]["Tables"]["photos"]["Row"];

export const eventsService = {
  /**
   * Lista todos os eventos ordenados por data (mais recentes primeiro).
   * @returns {Promise<Event[]>} Lista de eventos
   */
  async listEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw new Error(`Erro ao listar eventos: ${error.message}`);
    return data;
  },

  /**
   * Cria um novo evento associado ao usuário autenticado.
   * @param event - Dados do evento: name, date, location, description
   * @returns {Promise<Event>} Evento criado
   */
  async createEvent(event: { name: string; date: string; location?: string; description?: string }): Promise<Event> {
    // Validações básicas
    if (!event.name) throw new Error("O nome do evento é obrigatório.");
    if (!event.date) throw new Error("A data do evento é obrigatória.");

    // Obtém o usuário autenticado
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error("Usuário não autenticado.");

    // Insere o evento no banco de dados
    const { data, error } = await supabase
      .from("events")
      .insert({
        ...event,
        photographer_id: user.id,
      })
      .select()
      .single();

    if (error) throw new Error(`Erro ao criar evento: ${error.message}`);
    return data;
  },

  /**
   * Faz upload de fotos para um evento no Supabase Storage e salva no banco de dados.
   * @param eventId - ID do evento
   * @param files - Array de arquivos a serem enviados
   * @returns {Promise<string[]>} URLs públicas das fotos enviadas
   */
  async uploadPhotos(eventId: string, files: File[]): Promise<string[]> {
    // Obtém o usuário autenticado
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error("Usuário não autenticado.");

    const uploadPromises = files.map(async (file) => {
      try {
        // Define um nome único para o arquivo
        const uniqueName = `${Date.now()}_${file.name}`;
        const path = `${user.id}/${eventId}/${uniqueName}`;

        // Faz upload para o Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from("events")
          .upload(path, file);

        if (uploadError) throw new Error(`Erro ao fazer upload de ${file.name}: ${uploadError.message}`);

        // Obtém a URL pública do arquivo
        const { data: { publicUrl } } = supabase.storage
          .from("events")
          .getPublicUrl(path);

        // Salva a informação no banco de dados
        const { error: dbError } = await supabase
          .from("photos")
          .insert({
            event_id: eventId,
            url: publicUrl,
            storage_path: path,
          });

        if (dbError) throw new Error(`Erro ao salvar foto no banco: ${dbError.message}`);
        return publicUrl;
      } catch (error) {
        console.error("Erro no upload de fotos:", error);
        throw error; // Propaga o erro para que o chamador saiba
      }
    });

    // Aguarda todos os uploads serem concluídos
    return Promise.all(uploadPromises);
  },
};