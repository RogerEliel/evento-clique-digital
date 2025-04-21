import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const supabaseUrl = "https://dnhdqhvvsefxzcejlkrq.supabase.co";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token } = await req.json();

    // Buscar o token válido e ainda não usado
    const { data: tokenData, error: tokenError } = await supabase
      .from("confirmation_tokens")
      .select("*, photographers(*)")
      .eq("token", token)
      .eq("used", false)
      .single();

    if (tokenError || !tokenData) {
      return new Response(
        JSON.stringify({ error: "Token inválido ou já utilizado." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Verificar expiração
    if (new Date(tokenData.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: "Token expirado." }),
        { status: 410, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Marcar token como usado
    const { error: updateTokenError } = await supabase
      .from("confirmation_tokens")
      .update({ used: true })
      .eq("id", tokenData.id);

    if (updateTokenError) {
      console.error("Erro ao atualizar o token:", updateTokenError);
      throw new Error("Erro ao atualizar o token.");
    }

    // Ativar conta do fotógrafo
    const { error: activateError } = await supabase
      .from("photographers")
      .update({ is_active: true })
      .eq("id", tokenData.photographer_id);

    if (activateError) {
      console.error("Erro ao ativar conta:", activateError);
      throw new Error("Erro ao ativar a conta.");
    }

    return new Response(
      JSON.stringify({ message: "Conta ativada com sucesso!" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Erro no processo de confirmação:", error);

    const statusCode = error.code === "23505" ? 409 : 500;

    return new Response(
      JSON.stringify({ error: error.message || "Erro interno no servidor." }),
      {
        status: statusCode,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
