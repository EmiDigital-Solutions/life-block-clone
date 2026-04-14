/**
 * AI Anomaly Badge
 * Marks findings that are statistically unusual vs industry benchmarks
 */
import { Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AnomalyBadgeProps {
  type: 'anomaly' | 'outlier' | 'trend';
  detail: string;
  benchmarkValue?: string;
  actualValue?: string;
}

export default function AnomalyBadge({ type, detail, benchmarkValue, actualValue }: AnomalyBadgeProps) {
  const config = {
    anomaly: { bg: 'bg-purple-500/10', text: 'text-purple-600', border: 'border-purple-500/30', label: 'ANOMALY' },
    outlier: { bg: 'bg-red-500/10', text: 'text-red-600', border: 'border-red-500/30', label: 'OUTLIER' },
    trend: { bg: 'bg-blue-500/10', text: 'text-blue-600', border: 'border-blue-500/30', label: 'TREND' },
  }[type];

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${config.bg} ${config.text} ${config.border} cursor-help`}>
            <Sparkles className="w-2.5 h-2.5" />
            {config.label}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[280px]">
          <div className="text-[12px]">
            <div className="font-semibold mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-primary" /> Atlas AI Detection
            </div>
            <p className="text-muted-foreground">{detail}</p>
            {benchmarkValue && actualValue && (
              <div className="mt-1.5 flex gap-3 text-[11px]">
                <span>Benchmark: <strong>{benchmarkValue}</strong></span>
                <span>Actual: <strong className="text-destructive">{actualValue}</strong></span>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
