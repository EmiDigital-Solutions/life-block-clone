/**
 * AskAtlasBar — Live AI copilot for the audit report
 * Streams answers from Atlas AI via Lovable AI Gateway
 */

import { useState, useRef, useCallback, useEffect } from "react";
import { Sparkles, Send, X, Loader2, ChevronUp, ChevronDown } from "lucide-react";
const SW = 1.5;
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

const stripEmoji = (text: string) =>
  text.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1FA00}-\u{1FAFF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}\u{2700}-\u{27BF}\u{2B50}\u{2B55}\u{231A}-\u{23F3}\u{23E9}-\u{23EF}\u{25AA}-\u{25FE}\u{2934}-\u{2935}\u{2194}-\u{21AA}\u{3030}\u{303D}\u{3297}\u{3299}]/gu, '').replace(/\s{2,}/g, ' ').trim();

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ATLAS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/atlas-copilot`;

const suggestedQuestions = [
  "What are the top 3 risks in this audit?",
  "Explain the Cpk issue and its BMW impact",
  "What CAPA actions should be prioritized?",
  "Compare this supplier to industry benchmarks",
  "Summarize findings for procurement",
];

interface AskAtlasBarProps {
  activeStation: number;
}

export default function AskAtlasBar({ activeStation }: AskAtlasBarProps) {
  const { reportMeta, allNCRs, kpis, stations, iatfWeightedScore } = useAuditReportContext();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Auto-scroll to bottom on new content
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Build audit context for the AI
  const buildAuditContext = useCallback(() => {
    const stationSummary = stations
      .filter(s => s.index >= 2 && s.index <= 9)
      .map(s => `- Station ${s.index} (${s.name}): ${s.health.toUpperCase()} — ${s.ncrs.length} NCRs. ${s.observation || ''}`)
      .join('\n');

    const ncrSummary = allNCRs
      .map(n => `- ${n.id} [${n.severity.toUpperCase()}]: ${n.title} (Station ${n.stationIndex}, ${n.status})${n.isoClause ? ` — ${n.isoClause}` : ''}`)
      .join('\n');

    const kpiSummary = kpis
      .map(k => `- ${k.label}: ${k.value}${k.unit || ''} (${k.trend} ${k.trendValue} vs. prior)`)
      .join('\n');

    return {
      supplier: reportMeta.supplier,
      client: reportMeta.client,
      verdict: reportMeta.verdict,
      verdictLabel: reportMeta.verdictLabel,
      vdaScore: Math.round(iatfWeightedScore),
      ncrCount: allNCRs.length,
      majorNCRs: allNCRs.filter(n => n.severity === 'major').length,
      minorNCRs: allNCRs.filter(n => n.severity === 'minor').length,
      costExposure: reportMeta.totalCostExposure,
      activeStation,
      stationSummary,
      ncrSummary,
      kpiSummary,
    };
  }, [reportMeta, allNCRs, kpis, stations, iatfWeightedScore, activeStation]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isStreaming) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsStreaming(true);
    setExpanded(true);

    const controller = new AbortController();
    abortRef.current = controller;

    let assistantSoFar = "";

    try {
      const resp = await fetch(ATLAS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          auditContext: buildAuditContext(),
        }),
        signal: controller.signal,
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        if (resp.status === 429) {
          toast.error("Rate limited — please wait a moment and try again.");
        } else if (resp.status === 402) {
          toast.error("AI credits exhausted. Add funds in Settings → Workspace → Usage.");
        } else {
          toast.error(errorData.error || "Atlas AI is temporarily unavailable.");
        }
        setIsStreaming(false);
        return;
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch { /* ignore partial leftovers */ }
        }
      }
    } catch (e: any) {
      if (e.name !== "AbortError") {
        console.error("Atlas AI error:", e);
        toast.error("Failed to connect to Atlas AI.");
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, [messages, isStreaming, buildAuditContext]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
    if (e.key === "Escape") {
      if (isStreaming) {
        abortRef.current?.abort();
      } else {
        setExpanded(false);
      }
    }
  };

  const clearChat = () => {
    setMessages([]);
    setExpanded(false);
  };

  return (
    <div className="sticky bottom-4 z-30 mb-8">
      <div className="max-w-[720px] mx-auto">
        {/* Expanded chat panel */}
        {expanded && messages.length > 0 && (
          <div className="bg-card border border-border rounded-t-lg shadow-lg mb-0 overflow-hidden">
            {/* Chat header */}
            <div className="flex items-center justify-between px-4 py-2 bg-primary/5 border-b border-border/30">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-[12px] font-bold uppercase tracking-wider text-primary">Atlas AI Copilot</span>
                <span className="text-[11px] text-muted-foreground">· {messages.filter(m => m.role === 'user').length} questions</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setExpanded(false)}
                  className="p-1 hover:bg-muted rounded transition-colors cursor-pointer"
                >
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <button
                  onClick={clearChat}
                  className="p-1 hover:bg-muted rounded transition-colors cursor-pointer"
                  title="Clear conversation"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="max-h-[400px] overflow-y-auto px-4 py-3 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 rounded">
                      <Sparkles className="w-3 h-3 text-primary" />
                    </div>
                  )}
                  <div className={`${msg.role === 'user'
                    ? 'bg-primary text-white px-3 py-2 rounded-lg max-w-[80%]'
                    : 'flex-1 min-w-0'
                  }`}>
                    {msg.role === 'user' ? (
                      <p className="text-[14px]">{msg.content}</p>
                    ) : (
                      <div className="prose prose-sm max-w-none text-foreground/90 [&_p]:text-[14px] [&_p]:leading-relaxed [&_li]:text-[14px] [&_strong]:text-foreground [&_h1]:text-[16px] [&_h2]:text-[15px] [&_h3]:text-[14px] [&_code]:text-[12px] [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5">
                        <ReactMarkdown>{stripEmoji(msg.content)}</ReactMarkdown>
                        {isStreaming && i === messages.length - 1 && (
                          <span className="inline-block w-1.5 h-4 bg-primary animate-pulse ml-0.5" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Collapsed indicator */}
        {!expanded && messages.length > 0 && (
          <button
            onClick={() => setExpanded(true)}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 bg-primary/5 border border-border border-b-0 rounded-t-lg cursor-pointer hover:bg-primary/10 transition-colors"
          >
            <ChevronUp className="w-3 h-3 text-primary" />
            <span className="text-[11px] font-medium text-primary">
              {messages.filter(m => m.role === 'user').length} Atlas AI conversation{messages.filter(m => m.role === 'user').length > 1 ? 's' : ''} — click to expand
            </span>
          </button>
        )}

        {/* Input bar */}
        <div className={`flex items-center gap-2 px-3 py-2 bg-card border border-border shadow-sm ${
          expanded && messages.length > 0 ? 'rounded-b-lg border-t-0' : messages.length > 0 ? 'rounded-b-lg' : 'rounded-lg'
        }`}>
          <Sparkles className="w-4 h-4 text-primary shrink-0" />
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isStreaming ? "Atlas is thinking..." : "Ask Atlas about this audit..."}
            disabled={isStreaming}
            className="flex-1 bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground outline-none disabled:opacity-50"
          />
          {isStreaming ? (
            <button
              onClick={() => abortRef.current?.abort()}
              className="px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider bg-destructive/10 text-destructive cursor-pointer hover:bg-destructive/20 transition-colors rounded"
            >
              <Loader2 className="w-3 h-3 animate-spin inline mr-1" />
              Stop
            </button>
          ) : (
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider bg-primary text-white cursor-pointer hover:bg-primary/90 transition-colors rounded disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              Ask
            </button>
          )}
        </div>

        {/* Suggested questions — only when no messages yet */}
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2 justify-center">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="px-2.5 py-1 text-[11px] text-muted-foreground bg-muted/50 hover:bg-muted hover:text-foreground border border-border/30 rounded-full transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
