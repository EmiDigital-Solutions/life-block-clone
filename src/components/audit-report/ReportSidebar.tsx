import { cn } from "@/lib/utils";
import { stations } from "@/data/auditReportData";
import type { StationHealth } from "@/data/auditReportData";

const healthDotColor: Record<StationHealth, string> = {
  green: 'bg-[#10B981]',
  amber: 'bg-[#F59E0B]',
  red: 'bg-[#EF4444]',
  grey: 'bg-[#D1D5DB]',
};

interface ReportSidebarProps {
  activeStation: number;
  onStationClick: (index: number) => void;
  className?: string;
}

export default function ReportSidebar({ activeStation, onStationClick, className }: ReportSidebarProps) {
  return (
    <aside className={cn("flex flex-col py-6 px-3 gap-0.5 overflow-y-auto", className)}>
      <div className="px-3 pb-4 mb-2 border-b border-[#E5E7EB]">
        <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#9CA3AF]">
          // Factory Walkthrough
        </span>
      </div>
      {stations.map((station) => (
        <button
          key={station.index}
          onClick={() => onStationClick(station.index)}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group",
            activeStation === station.index
              ? "bg-[#0052FF]/5 text-[#0052FF]"
              : "text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]"
          )}
        >
          <div className={cn("w-2 h-2 rounded-full shrink-0 transition-transform", healthDotColor[station.health],
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
