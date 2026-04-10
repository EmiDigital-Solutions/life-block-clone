import { cn } from "@/lib/utils";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import type { StationHealth } from "@/data/auditReportData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const healthColor: Record<StationHealth, string> = {
  green: 'bg-[#6EA996]',
  amber: 'bg-[#E39B5C]',
  red: 'bg-[#AD3D3D]',
  grey: 'bg-[#C0C0C0]',
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
      <div className="flex items-center gap-px">
        {displayStations.map(s => (
          <Tooltip key={s.index}>
            <TooltipTrigger asChild>
              <button
                onClick={() => onStationClick(s.index)}
                className={cn(
                  "w-3 h-3 transition-all",
                  healthColor[s.health],
                  activeStation === s.index && "ring-1 ring-white ring-offset-1 ring-offset-[#0A0A0A]"
                )}
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
