
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import React from "react";

interface ExportButtonProps {
  loading: boolean;
  onClick: () => void;
}
export function ExportButton({ loading, onClick }: ExportButtonProps) {
  return (
    <Button onClick={onClick} disabled={loading} variant="default" className="flex items-center gap-2">
      <Download className="w-4 h-4" />
      {loading ? "Gerando CSV..." : "Exportar CSV"}
    </Button>
  );
}
