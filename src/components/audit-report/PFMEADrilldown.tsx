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
What is the specific failure mode?

## Effect Analysis
- **Local Effect**: Impact at the station
- **System Effect**: Impact on the assembly/product
- **End User Effect**: Impact on BMW/customer

## Severity × Occurrence × Detection
Rate each 1-10 and calculate RPN

## Control Plan Gap
What control was supposed to prevent this? Why did it fail?

## Root Cause Chain (5-Why)
Walk through the 5-Why analysis

## AI Prediction
Based on this pattern, what related failures might occur?

Be specific and technical. Use real PFMEA methodology.`;

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-[720px] max-h-[85vh] flex flex-col mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-[14px] font-bold uppercase tracking-wider text-primary">PFMEA Drill-down</span>
            <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
              ncr.severity === 'major' ? 'bg-red-500/10 text-red-600' : 'bg-amber-500/10 text-amber-600'
            }`}>{ncr.severity}</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded transition-colors cursor-pointer">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* NCR Summary */}
        <div className="px-6 py-3 bg-muted/30 border-b border-border/30 shrink-0">
          <div className="text-[13px] font-semibold text-foreground">{ncr.id}: {ncr.title}</div>
          <div className="text-[12px] text-muted-foreground mt-1">{ncr.station} · {ncr.isoClause || 'No clause'}</div>
          {/* FMEA Chain visualization */}
          <div className="flex items-center gap-2 mt-3">
            {[
              { icon: AlertTriangle, label: 'Finding', color: 'text-red-500' },
              { icon: Cog, label: 'Root Cause', color: 'text-amber-500' },
              { icon: FileCheck, label: 'Control Gap', color: 'text-blue-500' },
              { icon: Target, label: 'CAPA', color: 'text-emerald-500' },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                {i > 0 && <ArrowRight className="w-3 h-3 text-muted-foreground" />}
                <div className="flex items-center gap-1 px-2 py-1 bg-card border border-border/30 rounded">
                  <step.icon className={`w-3 h-3 ${step.color}`} />
                  <span className="text-[11px] font-medium">{step.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!generated && (
            <div className="text-center py-8">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-[13px] text-muted-foreground mb-4">
                Atlas AI will perform a full PFMEA analysis including failure mode, severity rating, control plan gaps, and root cause chain.
              </p>
              <button
                onClick={generate}
                className="px-5 py-2.5 bg-primary text-white text-[12px] font-bold uppercase tracking-wider rounded hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Generate PFMEA Analysis
              </button>
            </div>
          )}

          {loading && !analysis && (
            <div className="flex items-center justify-center py-8 gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="text-[13px] text-muted-foreground">Analyzing failure mode...</span>
            </div>
          )}

          {analysis && (
            <div className="prose prose-sm max-w-none text-foreground/90 [&_p]:text-[14px] [&_p]:leading-relaxed [&_li]:text-[14px] [&_strong]:text-foreground [&_h2]:text-[16px] [&_h3]:text-[14px]">
              <ReactMarkdown>{analysis}</ReactMarkdown>
              {loading && <span className="inline-block w-1.5 h-4 bg-primary animate-pulse ml-0.5" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
