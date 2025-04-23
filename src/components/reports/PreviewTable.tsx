
import React from "react";

interface PreviewTableProps {
  type: "sales" | "events";
  data: any[] | null;
  loading: boolean;
  error?: string | null;
}

export function PreviewTable({ type, data, loading, error }: PreviewTableProps) {
  if (loading) return (
    <div className="w-full text-center py-8 animate-pulse text-muted-foreground">Carregando prévia...</div>
  );
  if (error)
    return (
      <div className="w-full text-center py-4 text-red-600 font-semibold rounded bg-red-50">
        {error}
      </div>
    );
  if (!data || data.length === 0)
    return (
      <div className="w-full text-center py-8 text-muted-foreground">Nenhum dado encontrado.</div>
    );
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[320px] w-full border text-sm rounded">
        <thead>
          <tr className="bg-muted">
            <th className="p-2 text-left">Data</th>
            <th className="p-2 text-left">{type === "sales" ? "Receita (R$)" : "Eventos"}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b last:border-b-0">
              <td className="p-2">{row.date}</td>
              <td className="p-2">
                {type === "sales"
                  ? "revenue" in row
                    ? Number(row.revenue).toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                    : "-"
                  : row.events ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
