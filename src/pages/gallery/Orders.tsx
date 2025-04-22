
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { formatCurrency } from "@/lib/format";

interface OrdersPageProps {
  token: string;
}

interface Order {
  id: string;
  status: string;
  total_amount: number;
  created_at: string;
  items: { photo: { url: string } }[];
}

export function Orders({ token }: OrdersPageProps) {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["guest-orders", token],
    queryFn: async () => {
      // Set guest token for RLS
      await supabase.rpc('set_guest_token', { token });
      
      const { data, error } = await supabase
        .from("orders")
        .select(`
          id,
          status,
          total_amount,
          created_at,
          items:order_items (
            photo:photos (
              url
            )
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Meus Pedidos</h2>
        <p className="text-muted-foreground">
          Acompanhe seus pedidos e faça o download das fotos
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                {new Date(order.created_at).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>{formatCurrency(order.total_amount)}</TableCell>
              <TableCell>
                <span className={`capitalize ${
                  order.status === "paid" 
                    ? "text-green-600" 
                    : "text-yellow-600"
                }`}>
                  {order.status === "paid" ? "Pago" : "Pendente"}
                </span>
              </TableCell>
              <TableCell>
                {order.status === "paid" && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // Download all photos in the order
                      order.items.forEach(item => {
                        if (item.photo?.url) {
                          window.open(item.photo.url, '_blank');
                        }
                      });
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
