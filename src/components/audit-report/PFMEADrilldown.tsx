/**
 * PFMEA Drill-down Modal
 * Click any NCR → see FMEA chain → control plan gap → root cause prediction
 */
import { useState, useCallback } from "react";
import { X, Sparkles, Loader2, ArrowRight, AlertTriangle, Target, Cog, FileCheck } from "lucide-react";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import type { NCR } from "@/data/auditReportData";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

interface PFMEADrilldownProps {
  ncr: NCR | null;
  onClose: () => void;
}

const ATLAS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/atlas-copilot`;

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

    const prompt = `You are an IATF 16949 PFMEA expert. For this NCR, generate a PFMEA drill-down analysis.

NCR: ${ncr.id} — ${ncr.title}
Severity: ${ncr.severity.toUpperCase()}
Station: ${ncr.station}
Observation: ${ncr.observation}
Root Cause: ${ncr.rootCause}
ISO Clause: ${ncr.isoClause || 'N/A'}
Supplier: ${reportMeta.supplier}

Generate EXACTLY this structure using markdown:
## Failure Mode
What is the specific failure mode? Use bullet points.

## Effect Analysis
- **Local Effect**: Impact at the station
- **System Effect**: Impact on the assembly/product
- **End User Effect**: Impact on BMW/customer

## Severity × Occurrence × Detection
Rate each 1-10 and calculate RPN. Use a table format.

## Control Plan Gap
- What control was supposed to prevent this?
- Why did it fail?
- What is the gap?

## Root Cause Chain (5-Why)
Walk through the 5-Why analysis as numbered list.

## AI Prediction
Based on this pattern, what related failures might occur? Use bullet points.

Be specific and technical. Use real PFMEA methodology. Use bullet points and structured lists, not paragraphs.`;

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-6">
      <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-[960px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-[20px] font-bold text-foreground">PFMEA Drill-down</h2>
              <p className="text-[14px] text-muted-foreground mt-0.5">Failure mode and effect analysis</p>
            </div>
            <span className={`text-[12px] font-bold uppercase px-2.5 py-1 rounded ml-2 ${
              ncr.severity === 'major' ? 'bg-destructive/10 text-destructive' : 'bg-warning/10 text-warning'
            }`}>{ncr.severity}</span>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-muted rounded-lg transition-colors cursor-pointer">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* NCR Summary */}
        <div className="px-8 py-5 bg-muted/20 border-b border-border/30 shrink-0 space-y-4">
          <div>
            <div className="text-[16px] font-semibold text-foreground">{ncr.id}: {ncr.title}</div>
            <div className="text-[14px] text-muted-foreground mt-1">{ncr.station} · {ncr.isoClause || 'No clause'}</div>
          </div>

          {/* FMEA Chain visualization */}
          <div className="flex items-center gap-3 flex-wrap">
            {[
              { icon: AlertTriangle, label: 'Finding', color: 'text-destructive' },
              { icon: Cog, label: 'Root Cause', color: 'text-warning' },
              { icon: FileCheck, label: 'Control Gap', color: 'text-primary' },
              { icon: Target, label: 'CAPA', color: 'text-accent' },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                {i > 0 && <ArrowRight className="w-4 h-4 text-muted-foreground" />}
                <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border/40 rounded-lg">
                  <step.icon className={`w-4 h-4 ${step.color}`} />
                  <span className="text-[13px] font-medium text-foreground">{step.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          {!generated && (
            <div className="text-center py-16">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-5" />
              <h3 className="text-[18px] font-semibold text-foreground mb-2">Generate PFMEA Analysis</h3>
              <p className="text-[15px] text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
                Atlas AI will perform a full PFMEA analysis including failure mode identification, severity rating, control plan gap analysis, and 5-Why root cause chain.
              </p>
              <button
                onClick={generate}
                className="px-8 py-3.5 bg-primary text-primary-foreground text-[14px] font-bold uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Generate PFMEA Analysis
              </button>
            </div>
          )}

          {loading && !analysis && (
            <div className="flex items-center justify-center py-16 gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-[15px] text-muted-foreground">Analyzing failure mode...</span>
            </div>
          )}

          {analysis && (
            <div className="prose prose-base max-w-none text-foreground/90 [&_p]:text-[15px] [&_p]:leading-[1.8] [&_li]:text-[15px] [&_li]:leading-[1.7] [&_li]:mb-1 [&_strong]:text-foreground [&_h2]:text-[18px] [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-border/40 [&_h3]:text-[16px] [&_h3]:mb-2 [&_h3]:mt-5 [&_ul]:space-y-1.5 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-muted/30 [&_td]:p-3 [&_td]:border-t [&_td]:border-border/30">
              <ReactMarkdown>{analysis}</ReactMarkdown>
              {loading && <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-0.5" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
