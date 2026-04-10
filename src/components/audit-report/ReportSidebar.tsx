import { cn } from "@/lib/utils";
import { stations, allNCRs, reportMeta } from "@/data/auditReportData";
import type { StationHealth } from "@/data/auditReportData";

const healthDotColor: Record<StationHealth, string> = {
  green: 'bg-[#6EA996]',
  amber: 'bg-[#E39B5C]',
  red: 'bg-[#AD3D3D]',
  grey: 'bg-[#C0C0C0]',
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
  { id: 'station-12', index: 14, label: 'Delay & risk forecast', health: 'amber', section: 'back' },
  { id: 'station-13', index: 15, label: 'Corrective actions', health: 'grey', section: 'back' },
  { id: 'station-14', index: 16, label: 'Evidence register', health: 'grey', section: 'back' },
  { id: 'signatures', index: 17, label: 'Signatures & approval', health: 'grey', section: 'back' },
  { id: 'revision', index: 18, label: 'Revision history', health: 'green', section: 'back' },
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
  className?: string;
}

function SectionGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-2">
      <div className="px-4 pt-5 pb-2">
        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#7B8E80]">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

export default function ReportSidebar({ activeStation, onStationClick, className }: ReportSidebarProps) {
  const totalSections = stations.filter(s => s.observation || s.index <= 1).length + 6;
  const ncrCount = allNCRs.length;

  const frontItems = sidebarStructure.filter(s => s.section === 'front');
  const findingsItems = sidebarStructure.filter(s => s.section === 'findings');
  const backItems = sidebarStructure.filter(s => s.section === 'back');

  const renderItem = (item: SidebarItem) => {
    const targetStation = scrollMap[item.index] || 1;
    const isActive = activeStation === targetStation;

    return (
      <div key={item.index}>
        <button
          onClick={() => onStationClick(targetStation)}
          className={cn(
            "flex items-center gap-3 w-full px-4 py-2 text-left transition-all duration-150 group",
            isActive
              ? "bg-[#0A7FA5]/5 text-[#0A7FA5] border-l-2 border-[#0A7FA5]"
              : "text-[#1A1A1A] hover:bg-[#F5F5F5] border-l-2 border-transparent"
          )}
        >
          <span className="text-[13px] font-medium tabular-nums text-[#C0C0C0] w-6 shrink-0">
            {item.index <= 4
              ? `${item.index}.0`
              : item.index <= 11
              ? `5.${item.index - 4}`
              : `${item.index - 6}.0`}
          </span>
          <span className={cn(
            "text-[13px] flex-1 truncate",
            isActive ? "font-semibold text-[#0A7FA5]" : "font-normal"
          )}>
            {item.label}
          </span>
          {item.health && (
            <div className={cn("w-2 h-2 rounded-full shrink-0", healthDotColor[item.health])} />
          )}
        </button>

        {/* Sub-items */}
        {item.children && isActive && (
          <div className="ml-10 border-l border-[#E5E7EB]">
            {item.children.map((child, ci) => (
              <button
                key={child.id}
                className={cn(
                  "flex items-center gap-2 w-full px-4 py-1.5 text-left text-[12px] transition-colors",
                  ci === 0
                    ? "text-[#0A7FA5] font-medium bg-[#0A7FA5]/5"
                    : "text-[#7B8E80] hover:text-[#1A1A1A]"
                )}
              >
                <span className="tabular-nums text-[#C0C0C0] w-8">5.3.{ci + 1}</span>
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
      <div className="px-4 py-5 border-b border-[#E5E7EB]">
        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#7B8E80]">
          Document Outline
        </span>
        <h3 className="text-[15px] font-semibold text-[#0A0A0A] mt-1">Process audit report</h3>
        <p className="text-[12px] text-[#7B8E80] mt-0.5">
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
