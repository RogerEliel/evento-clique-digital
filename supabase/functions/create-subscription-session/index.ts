
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { price_id } = await req.json();
    
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
      apiVersion: "2023-10-16",
    });

    // Extract the auth token from headers
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing Authorization header");
    }
    
    const token = authHeader.replace("Bearer ", "");
    
    // Initialize Supabase client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get the user from the token
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    
    if (userError || !user) {
      console.error("User authentication error:", userError);
      throw new Error("User authentication failed");
    }

    console.log("Creating subscription session for user:", user.id);

    // Check if the user already has a Stripe customer ID
    const { data: photographer, error: photographerError } = await supabaseAdmin
      .from("photographers")
      .select("id, stripe_customer_id")
      .eq("email", user.email)
      .single();

    if (photographerError) {
      console.error("Error fetching photographer:", photographerError);
      throw new Error("Failed to fetch photographer data");
    }

    // Set up Stripe customer
    let customerId = photographer.stripe_customer_id;
    
    if (!customerId) {
      // Create a new customer in Stripe
      const customer = await stripe.customers.create({
        email: user.email,
        name: photographer.nome || user.email,
        metadata: {
          photographer_id: photographer.id,
          user_id: user.id
        }
      });
      
      customerId = customer.id;
      
      // Update the photographer record with the Stripe customer ID
      await supabaseAdmin
        .from("photographers")
        .update({ stripe_customer_id: customerId })
        .eq("id", photographer.id);
        
      console.log("Created new Stripe customer:", customerId);
    } else {
      console.log("Using existing Stripe customer:", customerId);
    }

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/dashboard/photographer/subscription?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/dashboard/photographer/subscription?canceled=true`,
      metadata: {
        photographer_id: photographer.id,
        user_id: user.id
      }
    });

    console.log("Created checkout session:", session.id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in create-subscription-session:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
