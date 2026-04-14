/**
 * AI Action Checklist
 * Extracts ALL required actions from NCRs/findings into interactive checklist
 */
import { useState, useMemo } from "react";
import { X, CheckSquare, Square, AlertTriangle, Clock, User, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { useAuditReportContext } from "@/contexts/AuditReportContext";

interface ActionChecklistProps {
  open: boolean;
  onClose: () => void;
}

interface ActionItem {
  id: string;
  source: string;
  severity: 'major' | 'minor' | 'observation';
  title: string;
  owner: string;
  deadline: string;
  status: 'open' | 'in-progress' | 'done';
  station: string;
  isoClause?: string;
}

export default function ActionChecklist({ open, onClose }: ActionChecklistProps) {
  const { allNCRs, stations } = useAuditReportContext();
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const actions = useMemo<ActionItem[]>(() => {
    const items: ActionItem[] = [];

    allNCRs.forEach(ncr => {
      items.push({
        id: ncr.id,
        source: `NCR ${ncr.id}`,
        severity: ncr.severity,
        title: ncr.recommendedAction || ncr.title,
        owner: ncr.owner || 'Unassigned',
        deadline: ncr.dueDate || 'TBD',
        status: ncr.status === 'closed' ? 'done' : ncr.status === 'in-progress' ? 'in-progress' : 'open',
        station: ncr.station,
        isoClause: ncr.isoClause,
      });
    });

    stations.filter(s => s.index >= 2 && s.index <= 9).forEach(station => {
      station.findings
        .filter(f => (f.type === 'concern' || f.type === 'observation') && !f.ncrId)
        .forEach((f, i) => {
          items.push({
            id: `${station.index}-obs-${i}`,
            source: `Station ${station.index}`,
            severity: 'observation',
            title: f.description || f.title,
            owner: 'Quality Manager',
            deadline: 'Next audit',
            status: 'open',
            station: station.name,
            isoClause: f.isoClause,
          });
        });
    });

    return items;
  }, [allNCRs, stations]);

  const filtered = filterSeverity === 'all' ? actions : actions.filter(a => a.severity === filterSeverity);
  const completedCount = checkedItems.size;
  const totalCount = actions.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-6">
      <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-[960px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-[20px] font-bold text-foreground">AI Action Checklist</h2>
              <p className="text-[14px] text-muted-foreground mt-0.5">{totalCount} actions extracted from audit findings</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-muted rounded-lg transition-colors cursor-pointer">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-8 py-4 border-b border-border/50 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[14px] font-medium text-foreground">Completion Progress</span>
            <span className="text-[14px] font-bold text-foreground">{completedCount} / {totalCount} completed ({progress}%)</span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Filters */}
        <div className="px-8 py-3 flex gap-2 border-b border-border/30 shrink-0">
          {['all', 'major', 'minor', 'observation'].map(f => (
            <button
              key={f}
              onClick={() => setFilterSeverity(f)}
              className={`px-4 py-2 text-[13px] font-medium uppercase tracking-wide rounded-lg transition-colors cursor-pointer ${
                filterSeverity === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {f} {f !== 'all' && `(${actions.filter(a => a.severity === f).length})`}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-8 py-5 space-y-3">
          {filtered.map(action => (
            <div key={action.id} className={`border rounded-lg transition-colors ${
              checkedItems.has(action.id) ? 'bg-muted/20 border-border/30' : 'bg-card border-border'
            }`}>
              <div className="flex items-start gap-4 p-5">
                <button onClick={() => toggleCheck(action.id)} className="mt-0.5 cursor-pointer shrink-0">
                  {checkedItems.has(action.id) ? (
                    <CheckSquare className="w-5 h-5 text-primary" />
                  ) : (
                    <Square className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded ${
                      action.severity === 'major' ? 'bg-destructive/10 text-destructive' :
                      action.severity === 'minor' ? 'bg-warning/10 text-warning' :
                      'bg-primary/10 text-primary'
                    }`}>{action.severity}</span>
                    <span className="text-[13px] text-muted-foreground font-medium">{action.source}</span>
                  </div>
                  <div className={`text-[15px] font-medium leading-relaxed ${checkedItems.has(action.id) ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {action.title}
                  </div>
                  <div className="flex items-center gap-6 mt-3">
                    <span className="text-[13px] text-muted-foreground flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> {action.owner}
                    </span>
                    <span className="text-[13px] text-muted-foreground flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {action.deadline}
                    </span>
                    {action.isoClause && (
                      <span className="text-[13px] text-primary font-mono">{action.isoClause}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setExpandedItem(expandedItem === action.id ? null : action.id)}
                  className="p-2 hover:bg-muted rounded-lg cursor-pointer"
                >
                  {expandedItem === action.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
              {expandedItem === action.id && (
                <div className="px-14 pb-4 space-y-1">
                  <div className="text-[14px] text-muted-foreground"><strong className="text-foreground">Station:</strong> {action.station}</div>
                  <div className="text-[14px] text-muted-foreground"><strong className="text-foreground">Status:</strong> {action.status}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
