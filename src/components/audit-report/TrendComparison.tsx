/**
 * Trend Comparison View
 * Side-by-side current vs previous audit with AI narrative
 */
import { useState, useCallback } from "react";
import { X, TrendingUp, TrendingDown, Sparkles, Loader2, ArrowRight, BarChart3, AlertTriangle, CheckCircle2, Crosshair } from "lucide-react";

const SW = 1.5;
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

const stripEmoji = (text: string) =>
  text.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1FA00}-\u{1FAFF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}\u{2700}-\u{27BF}\u{2B50}\u{2B55}\u{231A}-\u{23F3}\u{23E9}-\u{23EF}\u{25AA}-\u{25FE}\u{2934}-\u{2935}\u{2194}-\u{21AA}\u{3030}\u{303D}\u{3297}\u{3299}]/gu, '').replace(/\s{2,}/g, ' ').trim();

export default function TrendComparison({ open, onClose }: TrendComparisonProps) {
  const { reportMeta, allNCRs, iatfWeightedScore } = useAuditReportContext();
  const [narrative, setNarrative] = useState("");
  const [loading, setLoading] = useState(false);

  const currentScore = Math.round(iatfWeightedScore);
  const scoreDelta = currentScore - previousAudit.vdaScore;
  const ncrDelta = allNCRs.length - previousAudit.totalNCRs;
  const majorCount = allNCRs.filter(n => n.severity === 'major').length;
  const majorDelta = majorCount - previousAudit.majorNCRs;

  const metrics = [
    { label: 'VDA Score', prev: `${previousAudit.vdaScore}%`, curr: `${currentScore}%`, delta: scoreDelta, unit: '%', better: scoreDelta > 0, icon: BarChart3 },
    { label: 'Total NCRs', prev: String(previousAudit.totalNCRs), curr: String(allNCRs.length), delta: ncrDelta, unit: '', better: ncrDelta < 0, icon: AlertTriangle },
    { label: 'Major NCRs', prev: String(previousAudit.majorNCRs), curr: String(majorCount), delta: majorDelta, unit: '', better: majorDelta < 0, icon: Crosshair },
    { label: 'Verdict', prev: 'Conditional', curr: reportMeta.verdictLabel, delta: 0, unit: '', better: reportMeta.verdict === 'go', icon: CheckCircle2 },
  ];

  const generateNarrative = useCallback(async () => {
    setLoading(true);
    setNarrative("");

    const prompt = `You are a senior automotive audit trajectory analyst. Compare these two audits.

PREVIOUS AUDIT (${previousAudit.date}):
- VDA Score: ${previousAudit.vdaScore}%
- NCRs: ${previousAudit.totalNCRs} (${previousAudit.majorNCRs} major)
- Verdict: ${previousAudit.verdict}
- Cost Exposure: ${previousAudit.costExposure}

CURRENT AUDIT (${reportMeta.date}):
- VDA Score: ${currentScore}%
- NCRs: ${allNCRs.length} (${majorCount} major)
- Verdict: ${reportMeta.verdictLabel}
- Cost Exposure: ${reportMeta.totalCostExposure}

FORMAT STRICTLY AS FOLLOWS — use ONLY markdown headers and bullet points. NO paragraphs. NO flowing text. NO emoji or icons anywhere. Every single piece of information must be a bullet point.

## Overall Direction
- **Status:** [Improving / Declining / Stagnant]
- **Score Change:** [describe delta]
- **Risk Trajectory:** [describe]

## Key Improvements
- **[Area 1]:** [one-line description]
- **[Area 2]:** [one-line description]
- **[Area 3]:** [one-line description]

## Persistent or New Issues
- **[Issue 1]:** [one-line description]
- **[Issue 2]:** [one-line description]

## Next Audit Prediction
- **Near-term:** [one-line prediction]
- **Long-term:** [one-line prediction]
- **Required Action:** [one-line action]

CRITICAL: Do NOT use any emoji, icons, or special characters in headings or text. Plain text only. Max 250 words. Every line MUST start with "- **". No exceptions.`;

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-[1000px] max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-10 py-6 border-b border-border shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-[22px] font-bold text-foreground tracking-tight">Trend Comparison</h2>
              <p className="text-[14px] text-muted-foreground mt-0.5">Performance trajectory across audit cycles</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-muted rounded-lg transition-colors cursor-pointer">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-10 py-8 space-y-10">
          {/* Timeline header */}
          <div className="flex items-center justify-between bg-muted/30 rounded-xl px-8 py-5">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">Previous Audit</div>
              <div className="text-[20px] font-semibold text-foreground tabular-nums">{previousAudit.date}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-border" />
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
              <div className="w-8 h-[1px] bg-border" />
            </div>
            <div className="text-right">
              <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary mb-1">Current Audit</div>
              <div className="text-[20px] font-semibold text-foreground tabular-nums">{reportMeta.date}</div>
            </div>
          </div>

          {/* Metrics comparison grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {metrics.map(m => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="p-6 border border-border/50 rounded-xl bg-card hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">{m.label}</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[16px] text-muted-foreground line-through decoration-muted-foreground/30">{m.prev}</span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" />
                      <span className="text-[24px] font-bold text-foreground leading-none">{m.curr}</span>
                    </div>
                    
                    {m.delta !== 0 && (
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold ${
                        m.better 
                          ? 'bg-accent/10 text-accent' 
                          : 'bg-destructive/10 text-destructive'
                      }`}>
                        {m.better ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        {m.delta > 0 ? '+' : ''}{m.delta}{m.unit}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Narrative */}
          <div className="border-t border-border pt-8">
            <h3 className="text-[18px] font-bold text-foreground mb-6 flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Trajectory Analysis
            </h3>

            {!narrative && !loading && (
              <button
                onClick={generateNarrative}
                className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-[15px] font-semibold text-primary">Generate AI Trajectory Analysis</span>
              </button>
            )}
            {loading && !narrative && (
              <div className="flex items-center justify-center py-10 gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-[15px] text-muted-foreground">Analyzing audit trajectory…</span>
              </div>
            )}
            {narrative && (
              <div className="prose prose-base max-w-none text-foreground/90
                [&_h2]:text-[16px] [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-border/50
                [&_h2:first-child]:mt-0
                [&_ul]:space-y-2.5 [&_ul]:mt-3 [&_ul]:mb-6 [&_ul]:pl-0 [&_ul]:list-none
                [&_li]:text-[14px] [&_li]:leading-[1.8] [&_li]:pl-5 [&_li]:relative [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[10px] [&_li]:before:w-2 [&_li]:before:h-2 [&_li]:before:rounded-full [&_li]:before:bg-primary/30
                [&_strong]:text-foreground [&_strong]:font-semibold
                [&_p]:text-[14px] [&_p]:leading-[1.8] [&_p]:mb-3
              ">
                <ReactMarkdown>{stripEmoji(narrative)}</ReactMarkdown>
                {loading && <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-0.5" />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
