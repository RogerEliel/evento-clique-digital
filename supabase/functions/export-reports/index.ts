
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function toCSV(headers: string[], rows: any[]): string {
  const esc = (v: any) => 
    typeof v === 'string' && (v.includes(",") || v.includes('"') || v.includes("\n"))
      ? `"${v.replace(/"/g, '""')}"`
      : `${v}`;
  const csvRows = [headers.join(",")];
  for (const r of rows) csvRows.push(headers.map(h => esc(r[h])).join(","));
  return csvRows.join("\n");
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized", details: userError }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const photographerId = user.id;
    const { type, period } = await req.json();
    const validTypes = ['sales', 'events'];
    const validPeriods = ['7d','30d','90d','all'];
    if (!validTypes.includes(type) || !validPeriods.includes(period)) {
      return new Response(
        JSON.stringify({ error: "Invalid 'type' or 'period' param." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    let sql = '';
    let params = {};
    // Value for interval or null (for 'all')
    const intervalExpr = period === 'all' ? null : period.replace('d', ' days');
    if (type === 'sales') {
      sql = `
        SELECT to_char(created_at, 'YYYY-MM-DD') AS date, sum(total_amount) AS revenue
        FROM orders
        WHERE photographer_id = :photographer_id
        ${intervalExpr ? "AND created_at >= NOW() - INTERVAL :interval" : ""}
        GROUP BY 1
        ORDER BY 1
      `;
      params = { photographer_id: photographerId, ...(intervalExpr && {interval: intervalExpr}) }
    } else {
      sql = `
        SELECT to_char(created_at, 'YYYY-MM-DD') AS date, count(*) AS events
        FROM events
        WHERE photographer_id = :photographer_id
        ${intervalExpr ? "AND created_at >= NOW() - INTERVAL :interval" : ""}
        GROUP BY 1
        ORDER BY 1
      `;
      params = { photographer_id: photographerId, ...(intervalExpr && {interval: intervalExpr}) }
    }
    const { data, error } = await supabase.rpc('execute_sql', { 
        sql,
        params: JSON.stringify(params) 
      }, { head: false });
    if (error) {
      console.error("Error executing SQL for report:", error);
      return new Response(
        JSON.stringify({ error: "Error generating report", details: error }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    // Some Supabase setups may not have an execute_sql RPC; fallback to built-in select if needed
    // For now, we'll simulate with normal client queries if not available:
    let reportData: any[] = [];
    if (!data) {
      if (type === "sales") {
        let query = supabase
          .from("orders")
          .select("created_at,total_amount")
          .eq("photographer_id", photographerId);
        if (intervalExpr) {
          const since = new Date(Date.now() - parseInt(period) * 24 * 3600 * 1000);
          query = query.gte('created_at', since.toISOString());
        }
        const { data: salesData, error } = await query;
        if (error) throw error;
        // Group by day
        const salesMap: Record<string, number> = {};
        (salesData ?? []).forEach((row: any) => {
          const date = row.created_at.slice(0,10);
          salesMap[date] = (salesMap[date] || 0) + row.total_amount;
        });
        reportData = Object.entries(salesMap).map(([date, revenue]) => ({ date, revenue }));
      } else {
        let query = supabase
          .from("events")
          .select("created_at")
          .eq("photographer_id", photographerId);
        if (intervalExpr) {
          const since = new Date(Date.now() - parseInt(period) * 24 * 3600 * 1000);
          query = query.gte('created_at', since.toISOString());
        }
        const { data: eventData, error } = await query;
        if (error) throw error;
        // Group by day
        const eventMap: Record<string, number> = {};
        (eventData ?? []).forEach((row: any) => {
          const date = row.created_at.slice(0,10);
          eventMap[date] = (eventMap[date] || 0) + 1;
        });
        reportData = Object.entries(eventMap).map(([date, events]) => ({ date, events }));
      }
    } else {
      reportData = data;
    }
    // Shape CSV content
    let csvHeaders: string[] = [];
    if (type === "sales") {
      csvHeaders = ["date", "revenue"];
      // Format revenue as cents -> reais string
      reportData.forEach(r => r.revenue = (r.revenue / 100).toFixed(2).replace('.', ','));
    } else {
      csvHeaders = ["date", "events"];
    }
    const csv = toCSV(csvHeaders, reportData);
    return new Response(
      csv,
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "content-type": "text/csv; charset=utf-8",
          "content-disposition": `attachment; filename=relatorio-${type}-${period}.csv`
        }
      }
    );
  } catch (error) {
    console.error("Error in export-reports:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno", details: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
