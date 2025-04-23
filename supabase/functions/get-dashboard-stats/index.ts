
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.2";

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
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get JWT token from the authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Extract the JWT token
    const token = authHeader.replace('Bearer ', '');
    
    // Get the authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token or user not found', details: userError }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const photographerId = user.id;
    
    // Get events count
    const { count: eventsCount, error: eventsError } = await supabase
      .from('events')
      .select('id', { count: 'exact', head: true })
      .eq('photographer_id', photographerId);
      
    if (eventsError) {
      console.error('Error fetching events:', eventsError);
    }
    
    // Get total revenue
    const { data: revenueData, error: revenueError } = await supabase
      .rpc('get_photographer_total_revenue', { p_photographer_id: photographerId });
    
    if (revenueError) {
      console.error('Error fetching revenue:', revenueError);
    }
    
    // Get unique clients
    const { data: clientsData, error: clientsError } = await supabase
      .rpc('get_photographer_unique_clients', { p_photographer_id: photographerId });
    
    if (clientsError) {
      console.error('Error fetching clients:', clientsError);
    }
    
    // Get subscription status
    const { data: subscriptionData, error: subscriptionError } = await supabase
      .functions.invoke('check-subscription-status', {
        body: { userId: photographerId },
      });
    
    if (subscriptionError) {
      console.error('Error fetching subscription:', subscriptionError);
    }
    
    // Prepare response
    const responseData = {
      events: eventsCount || 0,
      revenue: revenueData ? revenueData[0]?.total_revenue || 0 : 0,
      clients: clientsData ? clientsData[0]?.unique_clients || 0 : 0,
      subscription: subscriptionData || { hasSubscription: false, subscription: null },
    };
    
    return new Response(
      JSON.stringify(responseData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in get-dashboard-stats function:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
