/**
 * Procurement Brief Generator
 * One-click AI-generated brief: cost exposure, delivery risk, go/no-go
 */
import { useState, useCallback } from "react";
import { X, FileBarChart, Sparkles, Loader2, Copy, Check, Volume2, VolumeX } from "lucide-react";

const SW = 1.5;
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

interface ProcurementBriefProps {
  open: boolean;
  onClose: () => void;
}

const ATLAS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/atlas-copilot`;

/* ── Shared prose classes for all AI-rendered markdown ── */
const proseClasses = [
  "prose prose-base max-w-none text-foreground/90",
  // Headings
  "[&_h2]:text-[17px] [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:pb-2.5 [&_h2]:border-b [&_h2]:border-border/40",
  "[&_h2:first-child]:mt-0",
  "[&_h3]:text-[15px] [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-3",
  // Lists
  "[&_ul]:space-y-2 [&_ul]:mt-3 [&_ul]:mb-5 [&_ul]:pl-0 [&_ul]:list-none",
  "[&_ol]:space-y-2 [&_ol]:mt-3 [&_ol]:mb-5 [&_ol]:pl-5",
  "[&_li]:text-[14px] [&_li]:leading-[1.75] [&_li]:pl-5 [&_li]:relative",
  "[&_ul>li]:before:content-[''] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[10px] [&_ul>li]:before:w-1.5 [&_ul>li]:before:h-1.5 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-primary/40",
  // Text
  "[&_p]:text-[14px] [&_p]:leading-[1.8] [&_p]:mb-3",
  "[&_strong]:text-foreground [&_strong]:font-semibold",
  // Tables
  "[&_table]:w-full [&_table]:text-[13px] [&_table]:mt-3 [&_table]:mb-5",
  "[&_th]:text-left [&_th]:p-3 [&_th]:bg-muted/40 [&_th]:font-semibold [&_th]:text-foreground [&_th]:border-b [&_th]:border-border",
  "[&_td]:p-3 [&_td]:border-b [&_td]:border-border/30 [&_td]:text-muted-foreground",
].join(" ");

/* Strip emoji from AI output to keep headings clean and icon-free */
const stripEmoji = (text: string) =>
  text.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1FA00}-\u{1FAFF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}\u{2700}-\u{27BF}\u{2B50}\u{2B55}\u{231A}-\u{23F3}\u{23E9}-\u{23EF}\u{25AA}-\u{25FE}\u{2934}-\u{2935}\u{2194}-\u{21AA}\u{3030}\u{303D}\u{3297}\u{3299}]/gu, '').replace(/\s{2,}/g, ' ').trim();

export default function ProcurementBrief({ open, onClose }: ProcurementBriefProps) {
  const { reportMeta, allNCRs, kpis, stations, iatfWeightedScore } = useAuditReportContext();
  const [brief, setBrief] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const toggleVoice = useCallback(() => {
    if (speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    if (!brief) return;

    // Strip markdown formatting for cleaner speech
    const plainText = brief
      .replace(/#{1,3}\s/g, '')
      .replace(/\*\*/g, '')
      .replace(/- /g, '')
      .replace(/\n+/g, '. ')
      .replace(/\s{2,}/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.lang = 'en-US';
    const voices = speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang === 'en-US' && v.name.includes('Google'))
      || voices.find(v => v.lang === 'en-US')
      || voices.find(v => v.lang.startsWith('en'));
    if (enVoice) utterance.voice = enVoice;
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    speechSynthesis.speak(utterance);
  }, [speaking, brief]);

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

    const prompt = `You are a procurement intelligence analyst. Generate a procurement brief for this supplier audit.

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

FORMAT RULES — STRICT:
Use ONLY markdown ## headings and bullet points. NO paragraphs. NO flowing text. NO emoji or icons anywhere. Every piece of information MUST be a bullet point starting with "- **Label:** value".

## Verdict
- **Decision:** [Go / Conditional Go / No-Go]
- **Rationale:** [one line]
- **VDA Score:** [score] vs. threshold

## Cost Exposure
- **Total Exposure:** [amount]
- **Primary Driver:** [NCR ID and description]
- **Secondary Driver:** [NCR ID and description]
- **Mitigation Potential:** [amount if actions taken]

## Delivery Risk
- **Risk Level:** [Low / Medium / High / Critical]
- **Impact:** [one-line description]
- **Timeline Risk:** [one-line description]

## Top 3 Conditions for Approval
- **Condition 1:** [specific action with standard reference]
- **Condition 2:** [specific action with standard reference]
- **Condition 3:** [specific action with standard reference]

## Recommendation
- **Action:** [Approve / Reject / Conditional]
- **PO Volume Limit:** [recommendation]
- **Follow-up Required:** [specific action + timeline]
- **Owner:** [responsible role]
- **Timeline:** [days]

CRITICAL: Do NOT use any emoji, icons, or special characters in headings or text. Plain text only. Max 350 words. Every line MUST be a bullet point. No exceptions. No paragraphs.`;

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-[1000px] max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-10 py-6 border-b border-border shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileBarChart className="w-5 h-5 text-primary" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-[22px] font-bold text-foreground tracking-tight">Procurement Brief</h2>
              <p className="text-[14px] text-muted-foreground mt-0.5">AI-generated summary for procurement decision-making</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-muted rounded-lg transition-colors cursor-pointer">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-10 py-8">
          {!brief && !loading && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-[20px] font-bold text-foreground mb-3">Generate Procurement Brief</h3>
              <p className="text-[15px] text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
                Atlas AI will analyze the audit data and generate a structured brief covering verdict, cost exposure, delivery risk, and required conditions.
              </p>
              <button
                onClick={generateBrief}
                className="px-10 py-4 bg-primary text-primary-foreground text-[14px] font-bold uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Generate Brief for Procurement
              </button>
            </div>
          )}

          {loading && !brief && (
            <div className="flex items-center justify-center py-20 gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-[15px] text-muted-foreground">Generating procurement brief…</span>
            </div>
          )}

          {brief && (
            <div className={proseClasses}>
              <ReactMarkdown>{stripEmoji(brief)}</ReactMarkdown>
              {loading && <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-0.5" />}
            </div>
          )}
        </div>

        {/* Footer */}
        {brief && !loading && (
          <div className="px-10 py-5 border-t border-border flex gap-3 shrink-0">
            <button
              onClick={toggleVoice}
              className={`flex items-center gap-2 px-6 py-3 text-[13px] font-semibold uppercase tracking-wider rounded-lg cursor-pointer ${
                speaking ? 'bg-primary text-white' : 'bg-primary/10 text-primary hover:bg-primary/20'
              }`}
            >
              {speaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              {speaking ? 'Stop' : 'Read Aloud'}
            </button>
            <button
              onClick={copyBrief}
              className="flex items-center gap-2 px-6 py-3 bg-muted text-[13px] font-semibold uppercase tracking-wider rounded-lg hover:bg-muted/80 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy Brief'}
            </button>
            <button
              onClick={generateBrief}
              className="flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary text-[13px] font-semibold uppercase tracking-wider rounded-lg hover:bg-primary/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Regenerate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
