
import React from "react";
import { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem, SelectLabel } from "@/components/ui/select";

interface ReportSelectorProps {
  type: "sales" | "events";
  period: "7d" | "30d" | "90d" | "all";
  onTypeChange: (val: "sales" | "events") => void;
  onPeriodChange: (val: "7d" | "30d" | "90d" | "all") => void;
}

export function ReportSelector({ type, period, onTypeChange, onPeriodChange }: ReportSelectorProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <div className="w-full sm:w-60">
        <Select value={type} onValueChange={(v) => onTypeChange(v as "sales" | "events")}>
          <SelectTrigger aria-label="Tipo de relatório">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipo</SelectLabel>
              <SelectItem value="sales">Vendas</SelectItem>
              <SelectItem value="events">Eventos</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full sm:w-60">
        <Select value={period} onValueChange={(v) => onPeriodChange(v as "7d" | "30d" | "90d" | "all")}>
          <SelectTrigger aria-label="Período">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Período</SelectLabel>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
              <SelectItem value="all">Todo o período</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
