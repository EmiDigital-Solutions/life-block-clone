/**
 * Trend Comparison View
 * Side-by-side current vs previous audit with AI narrative
 */
import { useState, useCallback } from "react";
import { X, TrendingUp, TrendingDown, Minus, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

interface TrendComparisonProps {
  open: boolean;
  onClose: () => void;
}

const ATLAS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/atlas-copilot`;

// Mock previous audit data for comparison
const previousAudit = {
  date: '2025-03-15',
  vdaScore: 62,
  totalNCRs: 9,
  majorNCRs: 4,
  verdict: 'conditional',
  costExposure: '€340,000',
  stations: {
    'Supplier Management': 'amber',
    'Incoming Inspection': 'red',
    'Production Line': 'amber',
    'Assembly': 'green',
    'Testing & QC': 'amber',
    'Packaging & Shipping': 'green',
    'Documentation': 'amber',
    'Management Review': 'green',
  } as Record<string, string>,
};

export default function TrendComparison({ open, onClose }: TrendComparisonProps) {
  const { reportMeta, allNCRs, iatfWeightedScore, stations } = useAuditReportContext();
  const [narrative, setNarrative] = useState("");
  const [loading, setLoading] = useState(false);

  const currentScore = Math.round(iatfWeightedScore);
  const scoreDelta = currentScore - previousAudit.vdaScore;
  const ncrDelta = allNCRs.length - previousAudit.totalNCRs;

  const metrics = [
    { label: 'VDA Score', prev: `${previousAudit.vdaScore}%`, curr: `${currentScore}%`, delta: scoreDelta, better: scoreDelta > 0 },
    { label: 'Total NCRs', prev: String(previousAudit.totalNCRs), curr: String(allNCRs.length), delta: ncrDelta, better: ncrDelta < 0 },
    { label: 'Major NCRs', prev: String(previousAudit.majorNCRs), curr: String(allNCRs.filter(n => n.severity === 'major').length), delta: allNCRs.filter(n => n.severity === 'major').length - previousAudit.majorNCRs, better: allNCRs.filter(n => n.severity === 'major').length < previousAudit.majorNCRs },
    { label: 'Verdict', prev: 'Conditional', curr: reportMeta.verdictLabel, delta: 0, better: reportMeta.verdict === 'go' },
  ];

  const generateNarrative = useCallback(async () => {
    setLoading(true);
    setNarrative("");

    const prompt = `You are a trend analyst for automotive supplier audits. Compare these two audits and explain the trajectory.

PREVIOUS AUDIT (${previousAudit.date}):
- VDA Score: ${previousAudit.vdaScore}%
- NCRs: ${previousAudit.totalNCRs} (${previousAudit.majorNCRs} major)
- Verdict: ${previousAudit.verdict}
- Cost Exposure: ${previousAudit.costExposure}

CURRENT AUDIT (${reportMeta.date}):
- VDA Score: ${currentScore}%
- NCRs: ${allNCRs.length} (${allNCRs.filter(n => n.severity === 'major').length} major)
- Verdict: ${reportMeta.verdictLabel}
- Cost Exposure: ${reportMeta.totalCostExposure}

Write a concise 150-word trajectory analysis covering:
1. Overall direction (improving/declining/stagnant)
2. Key improvements
3. Persistent or new issues
4. Prediction for next audit cycle
Use markdown formatting.`;

    try {
      const resp = await fetch(ATLAS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
          auditContext: { supplier: reportMeta.supplier },
        }),
      });

      if (!resp.ok) { toast.error("Failed to generate narrative"); setLoading(false); return; }

      const reader = resp.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "", accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") break;
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) { accumulated += content; setNarrative(accumulated); }
          } catch { break; }
        }
      }
    } catch { toast.error("Failed to connect"); } finally { setLoading(false); }
  }, [reportMeta, allNCRs, iatfWeightedScore]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-[640px] max-h-[85vh] flex flex-col mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-[14px] font-bold uppercase tracking-wider text-primary">Trend Comparison</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded transition-colors cursor-pointer">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Timeline */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Previous</div>
              <div className="text-[14px] font-semibold">{previousAudit.date}</div>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
            <div className="text-center">
              <div className="text-[11px] font-bold uppercase tracking-wider text-primary">Current</div>
              <div className="text-[14px] font-semibold">{reportMeta.date}</div>
            </div>
          </div>

          {/* Metrics comparison */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {metrics.map(m => (
              <div key={m.label} className="p-3 border border-border/30 rounded bg-muted/20">
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">{m.label}</div>
                <div className="flex items-center justify-between">
                  <span className="text-[16px] text-muted-foreground">{m.prev}</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[16px] font-bold text-foreground">{m.curr}</span>
                </div>
                {m.delta !== 0 && (
                  <div className={`flex items-center gap-1 mt-1 text-[11px] font-medium ${m.better ? 'text-emerald-600' : 'text-red-600'}`}>
                    {m.better ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {m.delta > 0 ? '+' : ''}{m.delta}{m.label.includes('Score') ? '%' : ''}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* AI Narrative */}
          <div className="border-t border-border/30 pt-4">
            {!narrative && !loading && (
              <button
                onClick={generateNarrative}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary/5 border border-primary/20 rounded hover:bg-primary/10 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-[13px] font-semibold text-primary">Generate AI Trajectory Analysis</span>
              </button>
            )}
            {loading && !narrative && (
              <div className="flex items-center justify-center py-4 gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-[13px] text-muted-foreground">Analyzing trend...</span>
              </div>
            )}
            {narrative && (
              <div className="prose prose-sm max-w-none text-foreground/90 [&_p]:text-[14px] [&_li]:text-[14px] [&_strong]:text-foreground">
                <ReactMarkdown>{narrative}</ReactMarkdown>
                {loading && <span className="inline-block w-1.5 h-4 bg-primary animate-pulse ml-0.5" />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
