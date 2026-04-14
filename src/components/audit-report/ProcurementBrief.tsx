/**
 * Procurement Brief Generator
 * One-click AI-generated brief: cost exposure, delivery risk, go/no-go
 */
import { useState, useCallback } from "react";
import { X, FileText, Sparkles, Loader2, Copy, Check } from "lucide-react";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

interface ProcurementBriefProps {
  open: boolean;
  onClose: () => void;
}

const ATLAS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/atlas-copilot`;

export default function ProcurementBrief({ open, onClose }: ProcurementBriefProps) {
  const { reportMeta, allNCRs, kpis, stations, iatfWeightedScore } = useAuditReportContext();
  const [brief, setBrief] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateBrief = useCallback(async () => {
    setLoading(true);
    setBrief("");

    const stationSummary = stations
      .filter(s => s.index >= 2 && s.index <= 9)
      .map(s => `- Station ${s.index} (${s.name}): ${s.health.toUpperCase()} — ${s.ncrs.length} NCRs`)
      .join('\n');

    const ncrSummary = allNCRs
      .map(n => `- ${n.id} [${n.severity.toUpperCase()}]: ${n.title} (${n.status})`)
      .join('\n');

    const prompt = `You are a procurement intelligence analyst. Generate a concise procurement brief for this supplier audit. Format with markdown headings.

AUDIT DATA:
- Supplier: ${reportMeta.supplier}
- Client: ${reportMeta.client}
- Verdict: ${reportMeta.verdictLabel}
- VDA Score: ${Math.round(iatfWeightedScore)}%
- Total NCRs: ${allNCRs.length} (${allNCRs.filter(n => n.severity === 'major').length} major, ${allNCRs.filter(n => n.severity === 'minor').length} minor)
- Cost Exposure: ${reportMeta.totalCostExposure}

STATIONS:
${stationSummary}

NCRs:
${ncrSummary}

REQUIRED SECTIONS:
1. **VERDICT** — Go / Conditional / No-Go with one-line rationale
2. **COST EXPOSURE** — Breakdown of financial risk in €
3. **DELIVERY RISK** — Impact on supply chain timelines
4. **TOP 3 CONDITIONS** — What must be resolved before approval
5. **RECOMMENDATION** — Clear next steps for procurement team

Keep it under 400 words. Be direct, no filler.`;

    try {
      const resp = await fetch(ATLAS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
          auditContext: { supplier: reportMeta.supplier, verdict: reportMeta.verdict },
        }),
      });

      if (!resp.ok) {
        toast.error("Failed to generate brief");
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
              setBrief(accumulated);
            }
          } catch { break; }
        }
      }
    } catch (e) {
      console.error("Brief generation error:", e);
      toast.error("Failed to connect to Atlas AI");
    } finally {
      setLoading(false);
    }
  }, [reportMeta, allNCRs, kpis, stations, iatfWeightedScore]);

  const copyBrief = () => {
    navigator.clipboard.writeText(brief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Brief copied to clipboard");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-[680px] max-h-[85vh] flex flex-col mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-[14px] font-bold uppercase tracking-wider text-primary">Procurement Brief</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded transition-colors cursor-pointer">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!brief && !loading && (
            <div className="text-center py-12">
              <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
              <p className="text-[14px] text-muted-foreground mb-4">
                Atlas AI will generate a procurement-ready brief with verdict, cost exposure, delivery risk, and required conditions.
              </p>
              <button
                onClick={generateBrief}
                className="px-6 py-3 bg-primary text-white text-[13px] font-bold uppercase tracking-wider rounded hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Generate Brief for Procurement
              </button>
            </div>
          )}

          {loading && !brief && (
            <div className="flex items-center justify-center py-12 gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="text-[14px] text-muted-foreground">Generating procurement brief...</span>
            </div>
          )}

          {brief && (
            <div className="prose prose-sm max-w-none text-foreground/90 [&_p]:text-[14px] [&_p]:leading-relaxed [&_li]:text-[14px] [&_strong]:text-foreground [&_h1]:text-[18px] [&_h2]:text-[16px] [&_h3]:text-[14px]">
              <ReactMarkdown>{brief}</ReactMarkdown>
              {loading && <span className="inline-block w-1.5 h-4 bg-primary animate-pulse ml-0.5" />}
            </div>
          )}
        </div>

        {brief && !loading && (
          <div className="px-6 py-3 border-t border-border flex gap-2 shrink-0">
            <button
              onClick={copyBrief}
              className="flex items-center gap-2 px-4 py-2 bg-muted text-[12px] font-medium uppercase tracking-wider rounded hover:bg-muted/80 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Brief'}
            </button>
            <button
              onClick={generateBrief}
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-[12px] font-medium uppercase tracking-wider rounded hover:bg-primary/20 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" /> Regenerate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
