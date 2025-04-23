
-- Function to get total revenue for a photographer
CREATE OR REPLACE FUNCTION get_photographer_total_revenue(p_photographer_id UUID)
RETURNS TABLE (total_revenue BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT COALESCE(SUM(total_amount), 0)::BIGINT AS total_revenue
  FROM orders
  WHERE photographer_id = p_photographer_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get unique clients count for a photographer
CREATE OR REPLACE FUNCTION get_photographer_unique_clients(p_photographer_id UUID)
RETURNS TABLE (unique_clients BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT COUNT(DISTINCT guest_id)::BIGINT AS unique_clients
  FROM orders
  WHERE photographer_id = p_photographer_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get sales trends for a photographer
CREATE OR REPLACE FUNCTION get_photographer_sales_trends(p_photographer_id UUID, p_days INTEGER)
RETURNS TABLE (date DATE, sales BIGINT, events BIGINT) AS $$
BEGIN
  RETURN QUERY
  WITH days AS (
    SELECT generate_series(
      CURRENT_DATE - (p_days || ' days')::INTERVAL,
      CURRENT_DATE,
      '1 day'::INTERVAL
    )::DATE AS day
  ),
  daily_sales AS (
    SELECT 
      DATE(created_at) AS sale_date,
      SUM(total_amount)::BIGINT AS daily_sales
    FROM orders
    WHERE 
      photographer_id = p_photographer_id AND
      created_at >= CURRENT_DATE - (p_days || ' days')::INTERVAL
    GROUP BY DATE(created_at)
  ),
  daily_events AS (
    SELECT 
      DATE(created_at) AS event_date,
      COUNT(*)::BIGINT AS daily_events
    FROM events
    WHERE 
      photographer_id = p_photographer_id AND
      created_at >= CURRENT_DATE - (p_days || ' days')::INTERVAL
    GROUP BY DATE(created_at)
  )
  SELECT 
    days.day AS date,
    COALESCE(ds.daily_sales, 0)::BIGINT AS sales,
    COALESCE(de.daily_events, 0)::BIGINT AS events
  FROM days
  LEFT JOIN daily_sales ds ON days.day = ds.sale_date
  LEFT JOIN daily_events de ON days.day = de.event_date
  ORDER BY days.day;
END;
$$ LANGUAGE plpgsql;
