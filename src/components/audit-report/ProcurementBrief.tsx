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

Keep it under 400 words. Be direct, no filler. Use bullet points and structured lists, not paragraphs.`;

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-6">
      <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-[900px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-[20px] font-bold text-foreground">Procurement Brief</h2>
              <p className="text-[14px] text-muted-foreground mt-0.5">AI-generated summary for procurement decision-making</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-muted rounded-lg transition-colors cursor-pointer">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          {!brief && !loading && (
            <div className="text-center py-16">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-5" />
              <h3 className="text-[18px] font-semibold text-foreground mb-2">Generate Procurement Brief</h3>
              <p className="text-[15px] text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
                Atlas AI will analyze the audit data and generate a structured brief covering verdict, cost exposure, delivery risk, and required conditions.
              </p>
              <button
                onClick={generateBrief}
                className="px-8 py-3.5 bg-primary text-primary-foreground text-[14px] font-bold uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Generate Brief for Procurement
              </button>
            </div>
          )}

          {loading && !brief && (
            <div className="flex items-center justify-center py-16 gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-[15px] text-muted-foreground">Generating procurement brief...</span>
            </div>
          )}

          {brief && (
            <div className="prose prose-base max-w-none text-foreground/90 [&_p]:text-[15px] [&_p]:leading-[1.8] [&_li]:text-[15px] [&_li]:leading-[1.7] [&_li]:mb-1 [&_strong]:text-foreground [&_h1]:text-[22px] [&_h1]:mb-4 [&_h1]:mt-8 [&_h2]:text-[18px] [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-border/40 [&_h3]:text-[16px] [&_h3]:mb-2 [&_h3]:mt-5 [&_ul]:space-y-1.5 [&_ol]:space-y-1.5">
              <ReactMarkdown>{brief}</ReactMarkdown>
              {loading && <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-0.5" />}
            </div>
          )}
        </div>

        {/* Footer */}
        {brief && !loading && (
          <div className="px-8 py-4 border-t border-border flex gap-3 shrink-0">
            <button
              onClick={copyBrief}
              className="flex items-center gap-2 px-5 py-2.5 bg-muted text-[13px] font-medium uppercase tracking-wider rounded-lg hover:bg-muted/80 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy Brief'}
            </button>
            <button
              onClick={generateBrief}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary text-[13px] font-medium uppercase tracking-wider rounded-lg hover:bg-primary/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Regenerate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
