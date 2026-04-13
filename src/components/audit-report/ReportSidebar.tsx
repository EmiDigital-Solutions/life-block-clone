import { cn } from "@/lib/utils";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import type { StationHealth } from "@/data/auditReportData";

const healthDotColor: Record<StationHealth, string> = {
  green: 'bg-[#6EA996]',
  amber: 'bg-[#E39B5C]',
  red: 'bg-[#AD3D3D]',
  grey: 'bg-[#C0C0C0]',
};

// Mock sparkline data for cross-audit score trajectory per station
const stationSparklines: Record<number, number[]> = {
  1: [82, 78, 76, 74, 72],
  2: [80, 82, 85, 84, 86],
  3: [78, 80, 82, 83, 85],
  4: [72, 68, 65, 62, 58],
  5: [65, 60, 55, 48, 42],
  6: [88, 87, 89, 90, 91],
  7: [70, 62, 55, 48, 38],
  8: [82, 84, 85, 86, 88],
  9: [68, 65, 60, 58, 55],
};

function SidebarSparkline({ data }: { data: number[] }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 12;
  const w = 32;
  const step = w / (data.length - 1);
  const points = data.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(' ');
  const lastVal = data[data.length - 1];
  const color = lastVal >= 70 ? 'hsl(155, 24%, 55%)' : lastVal >= 50 ? 'hsl(24, 72%, 63%)' : 'hsl(0, 48%, 46%)';

  return (
    <svg width={w} height={h} className="shrink-0 opacity-60">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

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

// Map sidebar items to actual scroll targets (stations)
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

function SectionGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-2">
      <div className="px-4 pt-5 pb-2">
        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

export default function ReportSidebar({ activeStation, onStationClick, onScrollToId, className }: ReportSidebarProps) {
  const { stations, allNCRs } = useAuditReportContext();
  const totalSections = stations.filter(s => s.observation || s.index <= 1).length + 6;
  const ncrCount = allNCRs.length;

  const frontItems = sidebarStructure.filter(s => s.section === 'front');
  const findingsItems = sidebarStructure.filter(s => s.section === 'findings');
  const backItems = sidebarStructure.filter(s => s.section === 'back');

  const renderItem = (item: SidebarItem) => {
    const targetStation = scrollMap[item.index] || 1;
    const isActive = activeStation === targetStation;
    const isCustomId = !item.id.startsWith('station-') && item.id !== 'signatures' && item.id !== 'revision';

    return (
      <div key={item.index}>
        <button
          onClick={() => {
            if (isCustomId && onScrollToId) {
              onScrollToId(item.id);
            } else {
              onStationClick(targetStation);
            }
          }}
          className={cn(
            "flex items-center gap-3 w-full px-4 py-2 text-left transition-all duration-150 group",
            isActive
              ? "bg-primary/5 text-primary border-l-2 border-[#0A7FA5]"
              : "text-charcoal hover:bg-muted border-l-2 border-transparent"
          )}
        >
          <span className="text-[13px] font-medium tabular-nums text-grey-mid w-6 shrink-0">
            {item.index <= 4
              ? `${item.index}.0`
              : item.index <= 11
              ? `5.${item.index - 4}`
              : `${item.index - 6}.0`}
          </span>
          <span className={cn(
            "text-[13px] flex-1 truncate",
            isActive ? "font-semibold text-primary" : "font-normal"
          )}>
            {item.label}
          </span>
          {item.health && (
            <div className="flex items-center gap-1 shrink-0">
              {stationSparklines[item.index] && (
                <SidebarSparkline data={stationSparklines[item.index]} />
              )}
              <div className={cn("w-2 h-2 rounded-full", healthDotColor[item.health])} />
            </div>
          )}
        </button>

        {/* Sub-items */}
        {item.children && isActive && (
          <div className="ml-10 border-l border-border">
            {item.children.map((child, ci) => (
              <button
                key={child.id}
                className={cn(
                  "flex items-center gap-2 w-full px-4 py-1.5 text-left text-[12px] transition-colors",
                  ci === 0
                    ? "text-primary font-medium bg-primary/5"
                    : "text-muted-foreground hover:text-charcoal"
                )}
              >
                <span className="tabular-nums text-grey-mid w-8">5.3.{ci + 1}</span>
                <span>{child.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={cn("flex flex-col overflow-y-auto", className)}>
      {/* Document outline header */}
      <div className="px-4 py-5 border-b border-border">
        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">
          Document Outline
        </span>
        <h3 className="text-[15px] font-semibold text-foreground mt-1">Process audit report</h3>
        <p className="text-[12px] text-muted-foreground mt-0.5">
          47 pages · {totalSections} sections · {ncrCount} ncrs
        </p>
      </div>

      <SectionGroup label="Front Matter">
        {frontItems.map(renderItem)}
      </SectionGroup>

      <SectionGroup label="Process Audit Findings">
        {findingsItems.map(renderItem)}
      </SectionGroup>

      <SectionGroup label="Back Matter">
        {backItems.map(renderItem)}
      </SectionGroup>
    </aside>
  );
}
