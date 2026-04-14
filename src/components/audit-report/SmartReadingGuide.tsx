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
  procurement: { label: 'Procurement', icon: Briefcase, color: 'text-primary', description: 'Focus on cost, risk, and supplier verdict' },
  quality: { label: 'Quality Engineer', icon: Wrench, color: 'text-warning', description: 'Focus on technical findings, NCRs, and CAPA' },
  executive: { label: 'Executive / C-Suite', icon: User, color: 'text-accent', description: 'Focus on summary, trajectory, and decision' },
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
  const mustReadCount = sections.filter(s => s.priority === 'must-read').length;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-6">
      <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-[800px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-[20px] font-bold text-foreground">Smart Reading Guide</h2>
              <p className="text-[14px] text-muted-foreground mt-0.5">AI-recommended reading path based on your role</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-muted rounded-lg transition-colors cursor-pointer">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Role selector */}
        <div className="px-8 py-4 border-b border-border/30 shrink-0">
          <p className="text-[13px] text-muted-foreground mb-3 font-medium uppercase tracking-wide">Select your role</p>
          <div className="grid grid-cols-3 gap-3">
            {(Object.entries(roleConfig) as [Role, typeof roleConfig[Role]][]).map(([key, cfg]) => {
              const Icon = cfg.icon;
              return (
                <button
                  key={key}
                  onClick={() => setRole(key)}
                  className={`flex flex-col items-start gap-2 p-4 rounded-lg text-left transition-colors cursor-pointer border ${
                    role === key
                      ? 'bg-primary/5 border-primary/30 text-foreground'
                      : 'bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${role === key ? cfg.color : ''}`} />
                    <span className="text-[14px] font-semibold">{cfg.label}</span>
                  </div>
                  <span className="text-[13px] leading-relaxed">{cfg.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reading summary */}
        <div className="px-8 py-4 bg-primary/3 border-b border-border/30 shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-[15px] font-semibold text-foreground">
                {mustReadCount} must-read sections
              </span>
            </div>
            <div className="text-[14px] text-muted-foreground flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              ~{totalTime} min total reading time
            </div>
          </div>
        </div>

        {/* Section list */}
        <div className="flex-1 overflow-y-auto px-8 py-5 space-y-3">
          {sections.map((section, i) => (
            <button
              key={section.id}
              onClick={() => { onScrollToId(section.id); onClose(); }}
              className="w-full flex items-center gap-4 p-5 rounded-lg border border-border/40 hover:bg-muted/30 transition-colors cursor-pointer text-left group"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0 ${
                section.priority === 'must-read' ? 'bg-primary text-primary-foreground' :
                section.priority === 'recommended' ? 'bg-warning/15 text-warning' :
                'bg-muted text-muted-foreground'
              }`}>
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[15px] font-semibold text-foreground">{section.label}</span>
                  <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded ${
                    section.priority === 'must-read' ? 'bg-primary/10 text-primary' :
                    section.priority === 'recommended' ? 'bg-warning/10 text-warning' :
                    'bg-muted text-muted-foreground'
                  }`}>{section.priority.replace('-', ' ')}</span>
                </div>
                <span className="text-[14px] text-muted-foreground leading-relaxed">{section.reason}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[13px] text-muted-foreground flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {section.readingTime}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
