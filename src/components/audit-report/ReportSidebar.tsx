import { cn } from "@/lib/utils";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import type { StationHealth } from "@/data/auditReportData";

const healthDotClass: Record<StationHealth, string> = {
  green: 'ar-dot ar-dot-pass',
  amber: 'ar-dot ar-dot-warn',
  red: 'ar-dot ar-dot-fail',
  grey: 'ar-dot ar-dot-grey',
};

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
  const color = lastVal >= 70 ? 'var(--ar-pass)' : lastVal >= 50 ? 'var(--ar-warn)' : 'var(--ar-fail)';

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
  { id: 'evidence-matrix', index: 13, label: 'Evidence traceability', health: 'grey', section: 'back' },
  { id: 'csr-mapping', index: 14, label: 'CSR compliance (BMW)', health: 'amber', section: 'back' },
  { id: 'station-11', index: 15, label: 'Finding analysis', health: 'grey', section: 'back' },
  { id: 'machine-park', index: 16, label: 'Machine park', health: 'amber', section: 'back' },
  { id: 'station-12', index: 17, label: 'CAPA actions', health: 'grey', section: 'back' },
  { id: 'station-13', index: 18, label: 'Delay & risk forecast', health: 'amber', section: 'back' },
  { id: 'station-14', index: 19, label: 'Evidence vault', health: 'grey', section: 'back' },
  { id: 'signatures', index: 20, label: 'Approval & sign-off', health: 'grey', section: 'back' },
];

const scrollMap: Record<number, number> = {
  1: 1, 2: 1, 3: 2, 4: 2,
  5: 3, 6: 4, 7: 5, 8: 6, 9: 7, 10: 8, 11: 9,
  12: 10, 13: 10, 14: 10, 15: 11, 16: 12, 17: 12, 18: 13, 19: 14, 20: 14,
};

interface ReportSidebarProps {
  activeStation: number;
  onStationClick: (index: number) => void;
  onScrollToId?: (id: string) => void;
  className?: string;
}

function SectionGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-1">
      <div className="px-3 pt-5 pb-2" style={{ borderTop: '1px solid var(--ar-bd-hair)' }}>
        <span className="ar-mono-label">
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
    const isCustomId = !item.id.startsWith('station-');

    const sectionNum = item.index <= 4
      ? `${item.index}.0`
      : item.index <= 11
      ? `5.${item.index - 4}`
      : `${item.index - 6}.0`;

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
            "ar-sidebar-item flex items-center gap-2.5 w-full px-3 py-2 text-left border-l-2",
            isActive ? "active" : "border-transparent"
          )}
        >
          <span className="text-[12px] font-medium tabular-nums w-6 shrink-0" style={{ 
            fontFamily: "'Space Mono', monospace",
            color: isActive ? 'var(--ar-cta)' : 'var(--ar-tx-4)' 
          }}>
            {sectionNum}
          </span>
          <span className={cn(
            "text-[12px] flex-1 truncate",
            isActive ? "font-semibold" : "font-normal"
          )}>
            {item.label}
          </span>
          {item.health && (
            <div className={cn(
              healthDotClass[item.health],
              isActive && 'active'
            )} />
          )}
        </button>

        {/* Sub-items */}
        {item.children && isActive && (
          <div className="ml-9" style={{ borderLeft: '1px solid var(--ar-bd-hair)' }}>
            {item.children.map((child, ci) => (
              <button
                key={child.id}
                className={cn(
                  "flex items-center gap-2 w-full px-3 py-1.5 text-left text-[11px] transition-colors",
                  ci === 0
                    ? "font-medium"
                    : "hover:text-foreground"
                )}
                style={{
                  color: ci === 0 ? 'var(--ar-cta)' : 'var(--ar-tx-3)',
                  background: ci === 0 ? 'rgba(10,127,165,0.08)' : 'transparent',
                }}
              >
                <span className="tabular-nums w-8" style={{ fontFamily: "'Space Mono', monospace", color: 'var(--ar-tx-4)', fontSize: '10px' }}>
                  5.3.{ci + 1}
                </span>
                <span>{child.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={cn("ar-sidebar flex flex-col overflow-y-auto", className)}
    >

      <div className="mb-1">
        <div className="pt-8 pb-2" />
        {frontItems.map(renderItem)}
      </div>

      <SectionGroup label="Process audit findings">
        {findingsItems.map(renderItem)}
      </SectionGroup>

      <SectionGroup label="Back matter">
        {backItems.map(renderItem)}
      </SectionGroup>
    </aside>
  );
}
