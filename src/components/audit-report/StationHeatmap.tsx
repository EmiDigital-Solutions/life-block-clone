import { cn } from "@/lib/utils";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import type { StationHealth } from "@/data/auditReportData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const chicletClass: Record<StationHealth, string> = {
  green: 'ar-chiclet ar-chiclet-pass',
  amber: 'ar-chiclet ar-chiclet-warn',
  red: 'ar-chiclet ar-chiclet-fail',
  grey: 'ar-chiclet ar-chiclet-grey',
};

const statusLabel: Record<StationHealth, string> = {
  green: 'Pass',
  amber: 'Observation',
  red: 'Critical',
  grey: 'N/A',
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
      <div className="flex items-center gap-[3px]">
        {displayStations.map(s => (
          <Tooltip key={s.index}>
            <TooltipTrigger asChild>
              <button
                onClick={() => onStationClick(s.index)}
                className={cn(
                  chicletClass[s.health],
                  activeStation === s.index && 'active'
                )}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-[11px]">
              <span style={{ fontFamily: "'Space Mono', monospace" }}>§{s.index}</span> {s.name} — {statusLabel[s.health]}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
