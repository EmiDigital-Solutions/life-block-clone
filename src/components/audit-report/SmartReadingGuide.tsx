/**
 * Smart Reading Guide
 * Role-based section recommendations with reading time estimates
 */
import { useState } from "react";
import { X, BookOpen, Sparkles, Clock, ChevronRight, User, Wrench, Briefcase } from "lucide-react";
import { useAuditReportContext } from "@/contexts/AuditReportContext";

interface SmartReadingGuideProps {
  open: boolean;
  onClose: () => void;
  onScrollToId: (id: string) => void;
}

type Role = 'procurement' | 'quality' | 'executive';

const roleConfig: Record<Role, { label: string; icon: typeof User; color: string; description: string }> = {
  procurement: { label: 'Procurement', icon: Briefcase, color: 'text-blue-600', description: 'Cost, risk, supplier verdict' },
  quality: { label: 'Quality Engineer', icon: Wrench, color: 'text-amber-600', description: 'Technical findings, NCRs, CAPA' },
  executive: { label: 'Executive / C-Suite', icon: User, color: 'text-emerald-600', description: 'Summary, trajectory, decision' },
};

interface Section {
  id: string;
  label: string;
  readingTime: string;
  reason: string;
  priority: 'must-read' | 'recommended' | 'optional';
}

export default function SmartReadingGuide({ open, onClose, onScrollToId }: SmartReadingGuideProps) {
  const { allNCRs, stations } = useAuditReportContext();
  const [role, setRole] = useState<Role>('procurement');

  const worstStations = stations
    .filter(s => s.index >= 2 && s.index <= 9 && s.health !== 'green')
    .sort((a, b) => (a.health === 'red' ? 0 : 1) - (b.health === 'red' ? 0 : 1));

  const roleSections: Record<Role, Section[]> = {
    procurement: [
      { id: 'report-hero', label: 'Executive Verdict', readingTime: '1 min', reason: 'Go/No-Go decision at a glance', priority: 'must-read' },
      { id: 'station-10', label: 'NCR Register', readingTime: '3 min', reason: `${allNCRs.length} NCRs affect supplier approval`, priority: 'must-read' },
      { id: 'station-11', label: 'Cost Waterfall', readingTime: '2 min', reason: 'Total € exposure and mitigation savings', priority: 'must-read' },
      { id: 'station-13', label: 'Delay Forecast', readingTime: '2 min', reason: 'Delivery timeline risk assessment', priority: 'recommended' },
      ...(worstStations.length > 0 ? [{ id: `station-${worstStations[0].index}`, label: worstStations[0].name, readingTime: '3 min', reason: 'Highest risk station — direct supply impact', priority: 'recommended' as const }] : []),
      { id: 'signatures', label: 'Sign-off', readingTime: '1 min', reason: 'Approval workflow status', priority: 'optional' },
    ],
    quality: [
      { id: 'report-hero', label: 'Audit Scope & VDA Scoring', readingTime: '2 min', reason: 'Standard compliance overview', priority: 'must-read' },
      ...worstStations.slice(0, 3).map(s => ({
        id: `station-${s.index}`,
        label: s.name,
        readingTime: '4 min',
        reason: `${s.health.toUpperCase()} — ${s.ncrs.length} NCRs, ${s.findings.length} findings`,
        priority: 'must-read' as const,
      })),
      { id: 'station-10', label: 'NCR Register', readingTime: '5 min', reason: 'Full NCR details with ISO clauses', priority: 'must-read' },
      { id: 'station-12', label: 'CAPA Actions', readingTime: '3 min', reason: 'Corrective action tracking', priority: 'must-read' },
      { id: 'machine-park', label: 'Machine Park Intelligence', readingTime: '3 min', reason: 'OEE and equipment condition', priority: 'recommended' },
      { id: 'evidence-matrix', label: 'Evidence Traceability', readingTime: '2 min', reason: 'Evidence chain verification', priority: 'recommended' },
    ],
    executive: [
      { id: 'report-hero', label: 'Executive Verdict', readingTime: '1 min', reason: 'Supplier status and recommendation', priority: 'must-read' },
      { id: 'station-11', label: 'Resolution Pipeline', readingTime: '2 min', reason: 'Finding-to-closure funnel', priority: 'must-read' },
      { id: 'station-10', label: 'NCR Summary', readingTime: '2 min', reason: `${allNCRs.filter(n => n.severity === 'major').length} major NCRs requiring attention`, priority: 'must-read' },
      { id: 'station-13', label: 'Delay Forecast', readingTime: '1 min', reason: 'Timeline risk to production', priority: 'recommended' },
      { id: 'signatures', label: 'Approval Status', readingTime: '1 min', reason: 'Sign-off workflow', priority: 'optional' },
    ],
  };

  const sections = roleSections[role];
  const totalTime = sections.reduce((sum, s) => sum + parseInt(s.readingTime), 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-[560px] max-h-[85vh] flex flex-col mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[14px] font-bold uppercase tracking-wider text-primary">Smart Reading Guide</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded transition-colors cursor-pointer">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Role selector */}
        <div className="px-6 py-3 flex gap-2 border-b border-border/30 shrink-0">
          {(Object.entries(roleConfig) as [Role, typeof roleConfig[Role]][]).map(([key, cfg]) => {
            const Icon = cfg.icon;
            return (
              <button
                key={key}
                onClick={() => setRole(key)}
                className={`flex items-center gap-2 px-3 py-2 rounded text-[12px] font-medium transition-colors cursor-pointer ${
                  role === key ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cfg.label}
              </button>
            );
          })}
        </div>

        {/* Reading summary */}
        <div className="px-6 py-3 bg-primary/5 border-b border-border/30 shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-[13px] font-semibold text-foreground">
              {sections.filter(s => s.priority === 'must-read').length} must-read sections
            </span>
            <span className="text-[12px] text-muted-foreground">· ~{totalTime} min total</span>
          </div>
          <p className="text-[12px] text-muted-foreground mt-1">{roleConfig[role].description}</p>
        </div>

        {/* Section list */}
        <div className="flex-1 overflow-y-auto px-6 py-3 space-y-1.5">
          {sections.map((section, i) => (
            <button
              key={section.id}
              onClick={() => { onScrollToId(section.id); onClose(); }}
              className="w-full flex items-center gap-3 p-3 rounded border border-border/30 hover:bg-muted/50 transition-colors cursor-pointer text-left group"
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                section.priority === 'must-read' ? 'bg-primary text-white' :
                section.priority === 'recommended' ? 'bg-amber-500/10 text-amber-600' :
                'bg-muted text-muted-foreground'
              }`}>
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-foreground">{section.label}</span>
                  <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                    section.priority === 'must-read' ? 'bg-primary/10 text-primary' :
                    section.priority === 'recommended' ? 'bg-amber-500/10 text-amber-600' :
                    'bg-muted text-muted-foreground'
                  }`}>{section.priority.replace('-', ' ')}</span>
                </div>
                <span className="text-[12px] text-muted-foreground">{section.reason}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {section.readingTime}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
