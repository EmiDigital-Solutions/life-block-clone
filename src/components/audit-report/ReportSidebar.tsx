import { cn } from "@/lib/utils";
import { stations } from "@/data/auditReportData";
import type { StationHealth } from "@/data/auditReportData";

const healthDotColor: Record<StationHealth, string> = {
  green: 'bg-[#22D3A5]',
  amber: 'bg-[#F5B544]',
  red: 'bg-[#F04464]',
  grey: 'bg-[#6B7085]',
};

interface ReportSidebarProps {
  activeStation: number;
  onStationClick: (index: number) => void;
  className?: string;
}

export default function ReportSidebar({ activeStation, onStationClick, className }: ReportSidebarProps) {
  return (
    <aside className={cn("flex flex-col py-6 px-3 gap-0.5 overflow-y-auto", className)}>
      <div className="px-3 pb-4 mb-2 border-b border-white/[0.08]">
        <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#6B7085]">
          Factory Walkthrough
        </span>
      </div>
      {stations.map((station) => (
        <button
          key={station.index}
          onClick={() => onStationClick(station.index)}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group",
            activeStation === station.index
              ? "bg-white/[0.08] text-[#F5F6FA]"
              : "text-[#A1A5B7] hover:bg-white/[0.04] hover:text-[#F5F6FA]"
          )}
        >
          <div className={cn("w-2.5 h-2.5 rounded-full shrink-0 transition-transform", healthDotColor[station.health],
            activeStation === station.index && "scale-125"
          )} />
          <span className="text-[13px] font-medium tabular-nums">
            {String(station.index).padStart(2, '0')}
          </span>
          <span className="text-[13px] truncate">{station.name}</span>
        </button>
      ))}
    </aside>
  );
}
