
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@14.21.0"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { token, photos } = await req.json()

    if (!token || !photos || !Array.isArray(photos) || photos.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid request parameters" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      )
    }

    // Initialize Supabase client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    )

    // Get guest information
    const { data: guest, error: guestError } = await supabaseAdmin
      .from("guests")
      .select("id, event_id")
      .eq("access_token", token)
      .single()

    if (guestError || !guest) {
      return new Response(
        JSON.stringify({ error: "Invalid guest token" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      )
    }

    // Get event and photographer information
    const { data: event, error: eventError } = await supabaseAdmin
      .from("events")
      .select("photographer_id")
      .eq("id", guest.event_id)
      .single()

    if (eventError || !event) {
      return new Response(
        JSON.stringify({ error: "Event not found" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      )
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
      apiVersion: "2023-10-16",
    })

    // Create line items for Stripe checkout
    const lineItems = photos.map(photoId => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: `Foto ${photoId}`,
        },
        unit_amount: 5000, // R$50,00 em centavos
      },
      quantity: 1,
    }))

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/gallery/${token}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/gallery/${token}?canceled=true`,
    })

    // Create order in database
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        guest_id: guest.id,
        photographer_id: event.photographer_id,
        stripe_session_id: session.id,
        total_amount: session.amount_total ?? 0,
        status: "pending"
      })
      .select()
      .single()

    if (orderError) {
      console.error("Error creating order:", orderError)
      return new Response(
        JSON.stringify({ error: "Failed to create order" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      )
    }

    // Create order items
    const orderItems = photos.map(photoId => ({
      order_id: order.id,
      photo_id: photoId,
      unit_price: 5000, // R$50,00 em centavos
    }))

    const { error: orderItemsError } = await supabaseAdmin
      .from("order_items")
      .insert(orderItems)

    if (orderItemsError) {
      console.error("Error creating order items:", orderItemsError)
    }

    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    )
  } catch (error) {
    console.error("Error in create-checkout-session function:", error)
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    )
  }
})
