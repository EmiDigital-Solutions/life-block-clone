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

    // From NCRs
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

    // From station findings that aren't already NCRs
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-[720px] max-h-[85vh] flex flex-col mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[14px] font-bold uppercase tracking-wider text-primary">AI Action Checklist</span>
            <span className="text-[12px] text-muted-foreground">· {totalCount} actions</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded transition-colors cursor-pointer">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 py-3 border-b border-border/50 shrink-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[12px] font-medium text-muted-foreground">Completion</span>
            <span className="text-[12px] font-bold text-foreground">{completedCount}/{totalCount} ({progress}%)</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 py-2 flex gap-1.5 border-b border-border/30 shrink-0">
          {['all', 'major', 'minor', 'observation'].map(f => (
            <button
              key={f}
              onClick={() => setFilterSeverity(f)}
              className={`px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider rounded transition-colors cursor-pointer ${
                filterSeverity === f ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {f} {f !== 'all' && `(${actions.filter(a => a.severity === f).length})`}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-6 py-3 space-y-1.5">
          {filtered.map(action => (
            <div key={action.id} className={`border rounded transition-colors ${
              checkedItems.has(action.id) ? 'bg-muted/30 border-border/30' : 'bg-card border-border'
            }`}>
              <div className="flex items-start gap-3 p-3">
                <button onClick={() => toggleCheck(action.id)} className="mt-0.5 cursor-pointer shrink-0">
                  {checkedItems.has(action.id) ? (
                    <CheckSquare className="w-4 h-4 text-primary" />
                  ) : (
                    <Square className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      action.severity === 'major' ? 'bg-red-500/10 text-red-600' :
                      action.severity === 'minor' ? 'bg-amber-500/10 text-amber-600' :
                      'bg-blue-500/10 text-blue-600'
                    }`}>{action.severity}</span>
                    <span className="text-[11px] text-muted-foreground">{action.source}</span>
                  </div>
                  <div className={`text-[13px] font-medium mt-1 ${checkedItems.has(action.id) ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {action.title}
                  </div>
                  <div className="flex items-center gap-4 mt-1.5">
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <User className="w-3 h-3" /> {action.owner}
                    </span>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {action.deadline}
                    </span>
                    {action.isoClause && (
                      <span className="text-[11px] text-primary font-mono">{action.isoClause}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setExpandedItem(expandedItem === action.id ? null : action.id)}
                  className="p-1 hover:bg-muted rounded cursor-pointer"
                >
                  {expandedItem === action.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
              {expandedItem === action.id && (
                <div className="px-10 pb-3 text-[12px] text-muted-foreground">
                  Station: {action.station} · Status: {action.status}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
