import { cn } from "@/lib/utils";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import type { StationHealth } from "@/data/auditReportData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const healthColor: Record<StationHealth, string> = {
  green: 'hsl(155, 24%, 55%)',
  amber: 'hsl(24, 72%, 63%)',
  red: 'hsl(0, 48%, 46%)',
  grey: 'hsl(0, 0%, 65%)',
};

interface StationHeatmapProps {
  activeStation: number;
  onStationClick: (index: number) => void;
}

export default function StationHeatmap({ activeStation, onStationClick }: StationHeatmapProps) {
  const { stations } = useAuditReportContext();
  const displayStations = stations.filter(s => s.index >= 2 && s.index <= 9);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex items-center gap-1">
        {displayStations.map(s => (
          <Tooltip key={s.index}>
            <TooltipTrigger asChild>
              <button
                onClick={() => onStationClick(s.index)}
                className="w-4 h-4 transition-all"
                style={{
                  background: healthColor[s.health],
                  opacity: activeStation === s.index ? 1 : 0.6,
                  outline: activeStation === s.index ? '2px solid hsl(0,0%,30%)' : 'none',
                  outlineOffset: '1px',
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-[11px]">
              <span className="font-mono">{String(s.index).padStart(2, '0')}</span> {s.name}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
