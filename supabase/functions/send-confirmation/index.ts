import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = "https://dnhdqhvvsefxzcejlkrq.supabase.co";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RegisterRequest {
  nome: string;
  email: string;
  empresa?: string;
  consentimento_lgpd: boolean;
  ip_consentimento: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { nome, email, empresa, consentimento_lgpd, ip_consentimento }: RegisterRequest = await req.json();

    // Criação do fotógrafo
    const { data: photographer, error: insertError } = await supabase
      .from("photographers")
      .insert([
        {
          nome,
          email,
          empresa,
          consentimento_lgpd,
          ip_consentimento,
          timestamp_consentimento: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    // Verifica se houve erro ao inserir
    if (insertError) {
      // Se for erro de chave duplicada (email já cadastrado)
      if (insertError.code === "23505") {
        return new Response(
          JSON.stringify({ error: "Este e-mail já está cadastrado." }),
          {
            status: 409, // Conflict
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      console.error("Erro ao cadastrar fotógrafo:", insertError);
      throw insertError;
    }

    // Gerar token de confirmação
    const token = crypto.randomUUID();
    const expires = new Date();
    expires.setHours(expires.getHours() + 24);

    const { error: tokenError } = await supabase
      .from("confirmation_tokens")
      .insert([
        {
          photographer_id: photographer.id,
          token,
          expires_at: expires.toISOString(),
        },
      ]);

    if (tokenError) {
      console.error("Erro ao gerar token:", tokenError);
      throw tokenError;
    }

    // Enviar e-mail de confirmação
    const confirmationUrl = `${req.headers.get("origin")}/confirmar?token=${token}`;

    const emailResponse = await resend.emails.send({
      from: "Seu Clique <noreply@seuclique.com>",
      to: [email],
      subject: "Confirme seu cadastro no Seu Clique",
      html: `
        <h1>Olá ${nome}!</h1>
        <p>Obrigado por se cadastrar no Seu Clique. Para ativar sua conta, clique no link abaixo:</p>
        <p><a href="${confirmationUrl}">Confirmar minha conta</a></p>
        <p>Este link é válido por 24 horas.</p>
        <p>Se você não solicitou este cadastro, por favor ignore este email.</p>
      `,
    });

    console.log("Cadastro realizado, e-mail enviado:", emailResponse);

    return new Response(
      JSON.stringify({ message: "Cadastro realizado com sucesso! Verifique seu email para confirmar sua conta." }),
      {
        status: 201,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Erro geral no processo de cadastro:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno no servidor. Tente novamente mais tarde." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
