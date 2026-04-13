import { cn } from "@/lib/utils";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import type { StationHealth } from "@/data/auditReportData";

const healthDotColor: Record<StationHealth, string> = {
  green: 'hsl(155, 24%, 50%)',
  amber: 'hsl(24, 72%, 58%)',
  red: 'hsl(0, 48%, 50%)',
  grey: 'hsl(220, 10%, 40%)',
};

interface SidebarItem {
  id: string;
  index: number;
  label: string;
  health?: StationHealth;
  children?: { id: string; label: string }[];
  section: 'front' | 'findings' | 'back';
}

const sidebarStructure: SidebarItem[] = [
  { id: 'station-1', index: 1, label: 'Document control', health: 'green', section: 'front' },
  { id: 'station-1', index: 2, label: 'Executive summary', health: 'amber', section: 'front' },
  { id: 'station-2', index: 3, label: 'Supplier snapshot', health: 'green', section: 'front' },
  { id: 'station-2', index: 4, label: 'Audit scope', health: 'green', section: 'front' },
  {
    id: 'station-3', index: 5, label: 'Reception & management', health: 'green', section: 'findings',
    children: [
      { id: 'personnel', label: 'Personnel & Leadership' },
      { id: 'system', label: 'QMS Structure' },
      { id: 'communication', label: 'Communication & Culture' },
    ],
  },
  {
    id: 'station-4', index: 6, label: 'Incoming goods', health: 'amber', section: 'findings',
    children: [
      { id: 'material', label: 'Material Verification' },
      { id: 'inspection', label: 'Inspection Process' },
      { id: 'supplier', label: 'Supplier Management' },
    ],
  },
  {
    id: 'station-5', index: 7, label: 'Production lines', health: 'red', section: 'findings',
    children: [
      { id: 'personnel', label: 'Personnel' },
      { id: 'material', label: 'Material' },
      { id: 'machine', label: 'Machine' },
      { id: 'method', label: 'Method' },
      { id: 'environment', label: 'Environment' },
    ],
  },
  {
    id: 'station-6', index: 8, label: 'Assembly', health: 'green', section: 'findings',
    children: [
      { id: 'personnel', label: 'Personnel' },
      { id: 'machine', label: 'Machine & Tooling' },
      { id: 'method', label: 'Method & Process' },
    ],
  },
  { id: 'station-7', index: 9, label: 'Final test', health: 'red', section: 'findings' },
  { id: 'station-8', index: 10, label: 'Packing & outgoing', health: 'green', section: 'findings' },
  { id: 'station-9', index: 11, label: 'Documentation & QMS', health: 'amber', section: 'findings' },
  { id: 'station-10', index: 12, label: 'NCR register', health: 'red', section: 'back' },
  { id: 'station-11', index: 13, label: 'Atlas Intelligence', health: 'grey', section: 'back' },
  { id: 'machine-park', index: 14, label: 'Machine Park Intelligence', health: 'amber', section: 'back' },
  { id: 'station-12', index: 15, label: 'Delay & risk forecast', health: 'amber', section: 'back' },
  { id: 'station-13', index: 16, label: 'Corrective actions', health: 'grey', section: 'back' },
  { id: 'station-14', index: 17, label: 'Evidence register', health: 'grey', section: 'back' },
  { id: 'signatures', index: 18, label: 'Signatures & approval', health: 'grey', section: 'back' },
  { id: 'revision', index: 19, label: 'Revision history', health: 'green', section: 'back' },
];

const scrollMap: Record<number, number> = {
  1: 1, 2: 1, 3: 2, 4: 2,
  5: 3, 6: 4, 7: 5, 8: 6, 9: 7, 10: 8, 11: 9,
  12: 10, 13: 11, 14: 12, 15: 13, 16: 14, 17: 14, 18: 14,
};

interface ReportSidebarProps {
  activeStation: number;
  onStationClick: (index: number) => void;
  onScrollToId?: (id: string) => void;
  className?: string;
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="px-5 pt-7 pb-2">
      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: 'hsl(220, 10%, 45%)' }}>
        {label}
      </span>
    </div>
  );
}

export default function ReportSidebar({ activeStation, onStationClick, onScrollToId, className }: ReportSidebarProps) {
  const { stations, allNCRs } = useAuditReportContext();
  const totalSections = stations.filter(s => s.observation || s.index <= 1).length + 6;

  const frontItems = sidebarStructure.filter(s => s.section === 'front');
  const findingsItems = sidebarStructure.filter(s => s.section === 'findings');
  const backItems = sidebarStructure.filter(s => s.section === 'back');

  const renderItem = (item: SidebarItem) => {
    const targetStation = scrollMap[item.index] || 1;
    const isActive = activeStation === targetStation;
    const isCustomId = !item.id.startsWith('station-') && item.id !== 'signatures' && item.id !== 'revision';
    const dotColor = item.health ? healthDotColor[item.health] : undefined;

    return (
      <div key={item.index}>
        <button
          onClick={() => {
            if (isCustomId && onScrollToId) onScrollToId(item.id);
            else onStationClick(targetStation);
          }}
          className={cn(
            "flex items-center gap-3 w-full px-5 py-2.5 text-left transition-all duration-150",
            isActive
              ? "text-white"
              : "text-white/50 hover:text-white/80 hover:bg-white/5"
          )}
          style={isActive ? { background: 'hsl(195, 89%, 34%, 0.12)' } : undefined}
        >
          {isActive && <div className="w-[3px] h-5 bg-primary absolute left-0" />}
          {dotColor && (
            <div className="w-2 h-2 shrink-0" style={{ background: dotColor }} />
          )}
          <span className={cn(
            "text-[13px] flex-1 truncate",
            isActive ? "font-medium" : "font-normal"
          )}>
            {item.label}
          </span>
        </button>

        {item.children && isActive && (
          <div className="ml-10 py-1">
            {item.children.map((child, ci) => (
              <button
                key={child.id}
                className={cn(
                  "block w-full px-4 py-1.5 text-left text-[12px] transition-colors",
                  ci === 0 ? "text-primary font-medium" : "text-white/40 hover:text-white/60"
                )}
              >
                {child.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={cn("flex flex-col overflow-y-auto relative", className)}
      style={{ background: 'hsl(220, 18%, 13%)', borderRight: '1px solid hsl(220, 14%, 18%)' }}
    >
      {/* Header */}
      <div className="px-5 py-5" style={{ borderBottom: '1px solid hsl(220, 14%, 20%)' }}>
        <h3 className="text-[14px] font-semibold text-white/90 mb-1">Process Audit Report</h3>
        <p className="text-[12px] text-white/40">
          {totalSections} sections · {allNCRs.length} NCRs
        </p>
      </div>

      <SectionLabel label="Front Matter" />
      {frontItems.map(renderItem)}

      <SectionLabel label="Process Findings" />
      {findingsItems.map(renderItem)}

      <SectionLabel label="Analysis & Actions" />
      {backItems.map(renderItem)}

      <div className="mt-auto px-5 py-4" style={{ borderTop: '1px solid hsl(220, 14%, 20%)' }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2 h-2" style={{ background: 'hsl(155, 24%, 50%)' }} />
            <div className="w-2 h-2" style={{ background: 'hsl(24, 72%, 58%)' }} />
            <div className="w-2 h-2" style={{ background: 'hsl(0, 48%, 50%)' }} />
          </div>
          <span className="text-[11px] text-white/30">Pass · Concern · Fail</span>
        </div>
      </div>
    </aside>
  );
}