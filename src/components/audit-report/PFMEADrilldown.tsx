/**
 * PFMEA Drill-down Modal
 * Click any NCR → see FMEA chain → control plan gap → root cause prediction
 */
import { useState, useCallback } from "react";
import { X, Sparkles, Loader2, ArrowRight, AlertTriangle, Crosshair, Settings, FileCheck } from "lucide-react";

const SW = 1.5;
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import type { NCR } from "@/data/auditReportData";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

interface PFMEADrilldownProps {
  ncr: NCR | null;
  onClose: () => void;
}

const ATLAS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/atlas-copilot`;

const proseClasses = [
  "prose prose-base max-w-none text-foreground/90",
  "[&_h2]:text-[17px] [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:pb-2.5 [&_h2]:border-b [&_h2]:border-border/40",
  "[&_h2:first-child]:mt-0",
  "[&_h3]:text-[15px] [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-3",
  "[&_ul]:space-y-2 [&_ul]:mt-3 [&_ul]:mb-5 [&_ul]:pl-0 [&_ul]:list-none",
  "[&_ol]:space-y-2 [&_ol]:mt-3 [&_ol]:mb-5 [&_ol]:pl-5",
  "[&_li]:text-[14px] [&_li]:leading-[1.75] [&_li]:pl-5 [&_li]:relative",
  "[&_ul>li]:before:content-[''] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[10px] [&_ul>li]:before:w-1.5 [&_ul>li]:before:h-1.5 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-primary/40",
  "[&_p]:text-[14px] [&_p]:leading-[1.8] [&_p]:mb-3",
  "[&_strong]:text-foreground [&_strong]:font-semibold",
  "[&_table]:w-full [&_table]:text-[13px] [&_table]:mt-3 [&_table]:mb-5",
  "[&_th]:text-left [&_th]:p-3 [&_th]:bg-muted/40 [&_th]:font-semibold [&_th]:text-foreground [&_th]:border-b [&_th]:border-border",
  "[&_td]:p-3 [&_td]:border-b [&_td]:border-border/30 [&_td]:text-muted-foreground",
].join(" ");

export default function PFMEADrilldown({ ncr, onClose }: PFMEADrilldownProps) {
  const { reportMeta } = useAuditReportContext();
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generate = useCallback(async () => {
    if (!ncr) return;
    setLoading(true);
    setAnalysis("");
    setGenerated(true);

    const prompt = `You are an IATF 16949 PFMEA expert. For this NCR, generate a PFMEA drill-down.

NCR: ${ncr.id} — ${ncr.title}
Severity: ${ncr.severity.toUpperCase()}
Station: ${ncr.station}
Observation: ${ncr.observation}
Root Cause: ${ncr.rootCause}
ISO Clause: ${ncr.isoClause || 'N/A'}
Supplier: ${reportMeta.supplier}

FORMAT RULES — STRICT. Use ONLY ## headings and bullet points. NO paragraphs. NO emoji or icons anywhere. Every piece of info MUST be a bullet.

## Failure Mode
- **Mode:** [specific failure mode name]
- **Process Step:** [where in the process]
- **Detection Point:** [where it should have been caught]

## Effect Analysis
- **Local Effect:** [impact at station level]
- **System Effect:** [impact on assembly/product]
- **End User Effect:** [impact on BMW/customer]
- **Regulatory Impact:** [any compliance implications]

## Risk Priority Number

| Factor | Rating (1-10) | Justification |
|--------|--------------|---------------|
| Severity | X | [reason] |
| Occurrence | X | [reason] |
| Detection | X | [reason] |
| **RPN** | **XXX** | **[risk level]** |

## Control Plan Gap
- **Expected Control:** [what should have prevented this]
- **Failure Reason:** [why the control failed]
- **Gap:** [specific gap identified]
- **Standard Reference:** [IATF/ISO clause]

## Root Cause Chain (5-Why)
1. **Why 1:** [first why]
2. **Why 2:** [second why]
3. **Why 3:** [third why]
4. **Why 4:** [fourth why]
5. **Why 5 (Root):** [root cause]

## AI Prediction
- **Related Risk 1:** [potential cascading failure]
- **Related Risk 2:** [potential cascading failure]
- **Recommended Prevention:** [specific action]

CRITICAL: Do NOT use any emoji, icons, or special characters in headings or text. Plain text only. Be specific and technical. Max 400 words. Every line MUST be a bullet or table row.`;

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

      if (!resp.ok) {
        toast.error("Failed to generate PFMEA analysis");
        setLoading(false);
        return;
      }

      const reader = resp.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let accumulated = "";

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
            if (content) {
              accumulated += content;
              setAnalysis(accumulated);
            }
          } catch { break; }
        }
      }
    } catch (e) {
      toast.error("Failed to connect to Atlas AI");
    } finally {
      setLoading(false);
    }
  }, [ncr, reportMeta]);

  if (!ncr) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-[1000px] max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-10 py-6 border-b border-border shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Crosshair className="w-5 h-5 text-primary" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-[22px] font-bold text-foreground tracking-tight">PFMEA Drill-down</h2>
              <p className="text-[14px] text-muted-foreground mt-0.5">Failure mode and effect analysis</p>
            </div>
            <span className={`text-[12px] font-bold uppercase px-3 py-1 rounded-full ml-2 ${
              ncr.severity === 'major' ? 'bg-destructive/10 text-destructive' : 'bg-warning/10 text-warning'
            }`}>{ncr.severity}</span>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-muted rounded-lg transition-colors cursor-pointer">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* NCR Summary */}
        <div className="px-10 py-6 bg-muted/20 border-b border-border/30 shrink-0">
          <div className="flex items-start justify-between gap-6 mb-5">
            <div>
              <div className="text-[18px] font-semibold text-foreground">{ncr.id}: {ncr.title}</div>
              <div className="text-[14px] text-muted-foreground mt-1.5">{ncr.station} · {ncr.isoClause || 'No clause'}</div>
            </div>
          </div>

          {/* FMEA Chain visualization */}
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { icon: AlertTriangle, label: 'Finding', color: 'text-destructive', bg: 'bg-destructive/5 border-destructive/20' },
              { icon: Settings, label: 'Root Cause', color: 'text-warning', bg: 'bg-warning/5 border-warning/20' },
              { icon: FileCheck, label: 'Control Gap', color: 'text-primary', bg: 'bg-primary/5 border-primary/20' },
              { icon: Crosshair, label: 'CAPA', color: 'text-accent', bg: 'bg-accent/5 border-accent/20' },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                {i > 0 && <ArrowRight className="w-4 h-4 text-muted-foreground/40" />}
                <div className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg ${step.bg}`}>
                  <step.icon className={`w-4 h-4 ${step.color}`} />
                  <span className="text-[13px] font-medium text-foreground">{step.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-10 py-8">
          {!generated && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-[20px] font-bold text-foreground mb-3">Generate PFMEA Analysis</h3>
              <p className="text-[15px] text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
                Atlas AI will perform a full PFMEA analysis including failure mode identification, severity rating, control plan gap analysis, and 5-Why root cause chain.
              </p>
              <button
                onClick={generate}
                className="px-10 py-4 bg-primary text-primary-foreground text-[14px] font-bold uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Generate PFMEA Analysis
              </button>
            </div>
          )}

          {loading && !analysis && (
            <div className="flex items-center justify-center py-20 gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-[15px] text-muted-foreground">Analyzing failure mode…</span>
            </div>
          )}

          {analysis && (
            <div className={proseClasses}>
              <ReactMarkdown>{analysis}</ReactMarkdown>
              {loading && <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-0.5" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
