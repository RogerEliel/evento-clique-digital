
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("No Stripe signature found");
    }

    const payload = await req.text();
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      throw new Error("Webhook secret not configured");
    }

    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret
    );

    // Initialize Supabase client with service role key for admin access
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log("Processing successful checkout session:", session.id);

      // Update order status to paid
      const { error: orderError } = await supabaseAdmin
        .from("orders")
        .update({ status: "paid" })
        .eq("stripe_session_id", session.id);

      if (orderError) {
        console.error("Error updating order status:", orderError);
        throw orderError;
      }

      // Get the order details
      const { data: orderData, error: orderFetchError } = await supabaseAdmin
        .from("orders")
        .select("id")
        .eq("stripe_session_id", session.id)
        .single();

      if (orderFetchError || !orderData) {
        console.error("Error fetching order:", orderFetchError);
        throw orderFetchError || new Error("Order not found");
      }

      // Fetch line items from Stripe
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      // Process each line item
      for (const item of lineItems.data) {
        if (!item.price?.unit_amount) continue;

        // Extract photo ID from the product name (format: "Photo {photoId}")
        const photoId = item.description?.split(" ")[1];
        if (!photoId) continue;

        // Check if order item already exists to avoid duplicates
        const { data: existingItem } = await supabaseAdmin
          .from("order_items")
          .select("id")
          .eq("order_id", orderData.id)
          .eq("photo_id", photoId)
          .maybeSingle();

        if (!existingItem) {
          const { error: itemError } = await supabaseAdmin
            .from("order_items")
            .insert({
              order_id: orderData.id,
              photo_id: photoId,
              unit_price: item.price.unit_amount,
              quantity: item.quantity || 1,
            });

          if (itemError) {
            console.error("Error inserting order item:", itemError);
            throw itemError;
          }
        }
      }

      console.log("Successfully processed order:", orderData.id);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("Error processing webhook:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
