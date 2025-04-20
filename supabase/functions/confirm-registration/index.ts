
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

    // Validate token
    const { data: tokenData, error: tokenError } = await supabase
      .from("confirmation_tokens")
      .select("*, photographers(*)")
      .eq("token", token)
      .eq("used", false)
      .single();

    if (tokenError || !tokenData) {
      throw new Error("Token inválido ou expirado");
    }

    if (new Date(tokenData.expires_at) < new Date()) {
      throw new Error("Token expirado");
    }

    // Mark token as used
    const { error: updateTokenError } = await supabase
      .from("confirmation_tokens")
      .update({ used: true })
      .eq("id", tokenData.id);

    if (updateTokenError) throw updateTokenError;

    // Activate photographer account
    const { error: activateError } = await supabase
      .from("photographers")
      .update({ is_active: true })
      .eq("id", tokenData.photographer_id);

    if (activateError) throw activateError;

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
    console.error("Error in confirmation process:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
