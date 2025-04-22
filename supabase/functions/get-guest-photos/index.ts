
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8"

const supabaseUrl = "https://dnhdqhvvsefxzcejlkrq.supabase.co"
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

interface PhotosResponse {
  photos: Array<{
    id: string
    url: string
    created_at: string
  }>
  event: {
    name: string
    date: string
    location: string | null
    description: string | null
  } | null
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { token } = await req.json()
    
    if (!token) {
      return new Response(
        JSON.stringify({ error: "Token is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      )
    }

    // Get guest information by token
    const { data: guest, error: guestError } = await supabase
      .from("guests")
      .select("event_id, name")
      .eq("access_token", token)
      .single()

    if (guestError || !guest) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired invitation" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      )
    }

    // Get event details
    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("name, date, location, description")
      .eq("id", guest.event_id)
      .single()

    if (eventError) {
      console.error("Error fetching event:", eventError)
    }

    // Get photos from the event
    const { data: photos, error: photosError } = await supabase
      .from("photos")
      .select("id, url, created_at")
      .eq("event_id", guest.event_id)
      .order("created_at", { ascending: false })

    if (photosError) {
      return new Response(
        JSON.stringify({ error: "Error fetching photos" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      )
    }

    const response: PhotosResponse = {
      photos: photos || [],
      event: event
    }

    return new Response(
      JSON.stringify(response),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    )
  } catch (error) {
    console.error("Error in get-guest-photos function:", error)
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    )
  }
})
