
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
import { useToast } from "@/hooks/use-toast";

interface OrdersPageProps {
  token: string;
}

interface Order {
  id: string;
  status: string;
  total_amount: number;
  created_at: string;
  items: { photo: { url: string; id: string } }[];
}

export function Orders({ token }: OrdersPageProps) {
  const { toast } = useToast();
  
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
              id,
              url
            )
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
  });

  const handleDownload = (order: Order) => {
    if (order.status !== "paid") {
      toast({
        title: "Pedido pendente",
        description: "Este pedido ainda não foi pago.",
        variant: "destructive",
      });
      return;
    }
    
    // Create a zip file name based on order id
    const zipFileName = `fotos-pedido-${order.id.substring(0, 8)}`;
    
    // Download each photo
    order.items.forEach((item, index) => {
      if (!item.photo?.url) return;
      
      // Create a download link
      const link = document.createElement('a');
      link.href = item.photo.url;
      link.setAttribute('download', `foto-${index + 1}-${item.photo.id.substring(0, 8)}.jpg`);
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    
    toast({
      title: "Download iniciado",
      description: `${order.items.length} foto(s) estão sendo baixadas.`,
    });
  };

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

  if (!orders || orders.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Meus Pedidos</h2>
          <p className="text-muted-foreground">
            Acompanhe seus pedidos e faça o download das fotos
          </p>
        </div>
        <div className="text-center py-10">
          <p className="text-muted-foreground">Você ainda não possui pedidos.</p>
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
          {orders.map((order) => (
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
                    onClick={() => handleDownload(order)}
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
