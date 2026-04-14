/**
 * Trend Comparison View
 * Side-by-side current vs previous audit with AI narrative
 */
import { useState, useCallback } from "react";
import { X, TrendingUp, TrendingDown, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

interface TrendComparisonProps {
  open: boolean;
  onClose: () => void;
}

const ATLAS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/atlas-copilot`;

const previousAudit = {
  date: '2025-03-15',
  vdaScore: 62,
  totalNCRs: 9,
  majorNCRs: 4,
  verdict: 'conditional',
  costExposure: '€340,000',
};

export default function TrendComparison({ open, onClose }: TrendComparisonProps) {
  const { reportMeta, allNCRs, iatfWeightedScore } = useAuditReportContext();
  const [narrative, setNarrative] = useState("");
  const [loading, setLoading] = useState(false);

  const currentScore = Math.round(iatfWeightedScore);
  const scoreDelta = currentScore - previousAudit.vdaScore;
  const ncrDelta = allNCRs.length - previousAudit.totalNCRs;
  const majorDelta = allNCRs.filter(n => n.severity === 'major').length - previousAudit.majorNCRs;

  const metrics = [
    { label: 'VDA Score', prev: `${previousAudit.vdaScore}%`, curr: `${currentScore}%`, delta: scoreDelta, unit: '%', better: scoreDelta > 0 },
    { label: 'Total NCRs', prev: String(previousAudit.totalNCRs), curr: String(allNCRs.length), delta: ncrDelta, unit: '', better: ncrDelta < 0 },
    { label: 'Major NCRs', prev: String(previousAudit.majorNCRs), curr: String(allNCRs.filter(n => n.severity === 'major').length), delta: majorDelta, unit: '', better: majorDelta < 0 },
    { label: 'Verdict', prev: 'Conditional', curr: reportMeta.verdictLabel, delta: 0, unit: '', better: reportMeta.verdict === 'go' },
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

Write a concise trajectory analysis using bullet points covering:
1. **Overall direction** — improving/declining/stagnant
2. **Key improvements** — what got better
3. **Persistent or new issues** — what remains problematic
4. **Prediction** — forecast for next audit cycle

Use markdown with bullet lists. No paragraphs — only structured points. Max 200 words.`;

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-6">
      <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-[900px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-[20px] font-bold text-foreground">Trend Comparison</h2>
              <p className="text-[14px] text-muted-foreground mt-0.5">Performance trajectory across audit cycles</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-muted rounded-lg transition-colors cursor-pointer">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
          {/* Timeline header */}
          <div className="flex items-center justify-between px-4">
            <div>
              <div className="text-[12px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Previous Audit</div>
              <div className="text-[18px] font-semibold text-foreground">{previousAudit.date}</div>
            </div>
            <ArrowRight className="w-6 h-6 text-muted-foreground" />
            <div className="text-right">
              <div className="text-[12px] font-bold uppercase tracking-wider text-primary mb-1">Current Audit</div>
              <div className="text-[18px] font-semibold text-foreground">{reportMeta.date}</div>
            </div>
          </div>

          {/* Metrics comparison grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map(m => (
              <div key={m.label} className="p-5 border border-border/40 rounded-lg bg-muted/20">
                <div className="text-[12px] font-bold uppercase tracking-wider text-muted-foreground mb-3">{m.label}</div>
                <div className="flex items-end justify-between mb-2">
                  <span className="text-[18px] text-muted-foreground">{m.prev}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground mx-2 mb-1" />
                  <span className="text-[22px] font-bold text-foreground">{m.curr}</span>
                </div>
                {m.delta !== 0 && (
                  <div className={`flex items-center gap-1.5 text-[13px] font-semibold ${m.better ? 'text-accent' : 'text-destructive'}`}>
                    {m.better ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {m.delta > 0 ? '+' : ''}{m.delta}{m.unit}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* AI Narrative */}
          <div className="pt-6 border-t border-border">
            <h3 className="text-[16px] font-bold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              AI Trajectory Analysis
            </h3>

            {!narrative && !loading && (
              <button
                onClick={generateNarrative}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-[15px] font-semibold text-primary">Generate AI Trajectory Analysis</span>
              </button>
            )}
            {loading && !narrative && (
              <div className="flex items-center justify-center py-8 gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-[15px] text-muted-foreground">Analyzing trend...</span>
              </div>
            )}
            {narrative && (
              <div className="prose prose-base max-w-none text-foreground/90 [&_p]:text-[15px] [&_p]:leading-[1.8] [&_li]:text-[15px] [&_li]:leading-[1.7] [&_li]:mb-1 [&_strong]:text-foreground [&_h2]:text-[18px] [&_h2]:mb-3 [&_h2]:mt-6 [&_h3]:text-[16px] [&_ul]:space-y-1.5 [&_ol]:space-y-1.5">
                <ReactMarkdown>{narrative}</ReactMarkdown>
                {loading && <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-0.5" />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
