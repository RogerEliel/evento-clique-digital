
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { guest_id } = await req.json();

    if (!guest_id) {
      throw new Error("guest_id is required");
    }

    // Fetch guest and event data
    const { data: guest, error: guestError } = await supabase
      .from('guests')
      .select(`
        *,
        events (
          name,
          date,
          location
        )
      `)
      .eq('id', guest_id)
      .single();

    if (guestError || !guest) {
      throw new Error("Guest not found");
    }

    // Generate gallery link
    const galleryLink = `${req.headers.get('origin')}/gallery/${guest.event_id}`;

    // Send invitation email
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Convites <onboarding@resend.dev>",
        to: guest.email,
        subject: `Convite para o evento "${guest.events.name}"`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Olá ${guest.name}!</h2>
            <p>Você foi convidado para o evento "${guest.events.name}".</p>
            <p><strong>Data:</strong> ${new Date(guest.events.date).toLocaleDateString('pt-BR')}</p>
            ${guest.events.location ? `<p><strong>Local:</strong> ${guest.events.location}</p>` : ''}
            <p>Para acessar a galeria de fotos do evento, clique no link abaixo:</p>
            <p>
              <a href="${galleryLink}" 
                 style="display: inline-block; padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px;">
                Acessar Galeria
              </a>
            </p>
            <p style="color: #666; font-size: 0.9em; margin-top: 20px;">
              Este é um convite exclusivo enviado para ${guest.email}
            </p>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      throw new Error(`Failed to send email: ${JSON.stringify(errorData)}`);
    }

    // Update guest invited_at timestamp
    const { error: updateError } = await supabase
      .from('guests')
      .update({ invited_at: new Date().toISOString() })
      .eq('id', guest_id);

    if (updateError) {
      throw new Error(`Failed to update guest: ${updateError.message}`);
    }

    return new Response(
      JSON.stringify({ message: "Convite enviado com sucesso" }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in send-guest-invite function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
