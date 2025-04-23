
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ReportSelector } from "@/components/reports/ReportSelector";
import { ExportButton } from "@/components/reports/ExportButton";
import { PreviewTable } from "@/components/reports/PreviewTable";

type Period = "7d" | "30d" | "90d" | "all";
type ReportType = "sales" | "events";

const periodLabels: Record<Period, string> = {
  "7d": "Últimos 7 dias",
  "30d": "Últimos 30 dias",
  "90d": "Últimos 90 dias",
  "all": "Todo o período",
};

export default function ReportsPage() {
  const [reportType, setReportType] = useState<ReportType>("sales");
  const [period, setPeriod] = useState<Period>("30d");
  const [loading, setLoading] = useState(false);
  const [dataPreview, setDataPreview] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Preview API (fetches as JSON for table)
  const fetchPreview = async () => {
    setError(null);
    setDataPreview(null);
    setLoading(true);
    try {
      // We'll call the edge function, requesting the CSV, then parse as JSON for preview
      // However, since the export returns CSV, let's create a preview endpoint locally (simulate)
      const session = JSON.parse(localStorage.getItem("supabase.auth.token") || "{}");
      const token = session?.currentSession?.access_token;
      const url = `https://dnhdqhvvsefxzcejlkrq.functions.supabase.co/export-reports`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: reportType, period }),
      });
      if (!res.ok) throw new Error("Falha ao obter prévia dos dados.");
      const text = await res.text();
      // Simple CSV to array (for small table)
      const [header, ...rows] = text
        .replace(/\r\n/g, "\n")
        .split("\n")
        .filter(Boolean);
      const columns = header.split(",");
      const data = rows.map((row) => {
        const vals = row.split(",");
        const o: any = {};
        columns.forEach((col, i) => (o[col] = vals[i]));
        return o;
      });
      setDataPreview(data);
    } catch (e: any) {
      setError(e?.message || "Erro ao buscar prévia dos dados.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPreview();
    // eslint-disable-next-line
  }, [reportType, period]);

  // Download CSV
  const handleExport = async () => {
    setError(null);
    setLoading(true);
    try {
      const session = JSON.parse(localStorage.getItem("supabase.auth.token") || "{}");
      const token = session?.currentSession?.access_token;
      const url = `https://dnhdqhvvsefxzcejlkrq.functions.supabase.co/export-reports`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: reportType, period }),
      });
      if (!response.ok) throw new Error("Não foi possível gerar o relatório.");
      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      // Download file
      const link = document.createElement("a");
      link.href = urlBlob;
      link.setAttribute(
        "download",
        `relatorio-${reportType}-${period}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => window.URL.revokeObjectURL(urlBlob), 2000);
      toast({ title: "Relatório exportado!", description: "Download iniciado com sucesso." });
    } catch (e: any) {
      setError(e?.message || "Erro ao exportar relatório.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Relatórios</h2>
      <p className="mb-6 text-muted-foreground">Gere e exporte relatórios de vendas ou eventos para análise detalhada.</p>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:gap-4 gap-2">
        <ReportSelector
          type={reportType}
          period={period}
          onTypeChange={setReportType}
          onPeriodChange={setPeriod}
        />
        <div>
          <ExportButton loading={loading} onClick={handleExport} />
        </div>
      </div>
      <div className="mb-2 text-muted-foreground text-xs">
        Visualização de dados ({periodLabels[period]})
      </div>
      <div className="rounded border bg-white dark:bg-muted">
        <PreviewTable type={reportType} data={dataPreview} loading={loading} error={error} />
      </div>
    </div>
  );
}
