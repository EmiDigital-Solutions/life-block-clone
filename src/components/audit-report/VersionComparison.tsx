import { GitCompare, Plus, Minus, Edit3 } from "lucide-react";

interface DiffItem {
  section: string;
  type: 'added' | 'removed' | 'changed';
  description: string;
}

const diffItems: DiffItem[] = [
  { section: 'Station 4 — Production', type: 'changed', description: 'Health upgraded amber → green after corrective action verified' },
  { section: 'NCR-0001', type: 'changed', description: 'Status changed open → in-progress, owner assigned: I. Kovač' },
  { section: 'NCR-0004', type: 'added', description: 'New minor NCR added: Missing traceability labels on Lot C packaging' },
  { section: 'Machine Park', type: 'changed', description: 'M-003 OEE updated 72% → 68% based on re-measurement' },
  { section: 'Executive Summary', type: 'changed', description: 'Verdict rationale updated to reflect NCR-0004 addition' },
];

const typeIcon = { added: Plus, removed: Minus, changed: Edit3 };
const typeColor = {
  added: 'text-[#6EA996] bg-[#6EA996]/10',
  removed: 'text-[#AD3D3D] bg-[#AD3D3D]/10',
  changed: 'text-[#E39B5C] bg-[#E39B5C]/10',
};

export default function VersionComparison() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <GitCompare className="w-4 h-4 text-[#0A7FA5]" />
        <h3 className="text-[14px] font-semibold text-[#0A0A0A]">Version Comparison</h3>
        <span className="text-[11px] font-mono text-[#7B8E80]">v1 → v2</span>
        <span className="text-[10px] text-[#C0C0C0]">· 5 changes</span>
      </div>

      <div className="border border-[#E5E7EB] bg-white divide-y divide-[#E5E7EB]">
        {diffItems.map((item, i) => {
          const Icon = typeIcon[item.type];
          return (
            <div key={i} className="flex items-start gap-3 p-4">
              <div className={`w-6 h-6 flex items-center justify-center shrink-0 ${typeColor[item.type]}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-[#0A0A0A]">{item.section}</span>
                <p className="text-[12px] text-[#7B8E80] mt-0.5">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
