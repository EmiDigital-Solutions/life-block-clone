/**
 * AskAtlasBar — FAB-style AI copilot for the audit report
 * Floating button bottom-right, opens slide-up chat panel
 */

import { useState, useRef, useCallback, useEffect } from "react";
import { Sparkles, Send, X, Loader2, MessageCircle } from "lucide-react";
const SW = 1.5;
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const stripEmoji = (text: string) =>
  text.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1FA00}-\u{1FAFF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}\u{2700}-\u{27BF}\u{2B50}\u{2B55}\u{231A}-\u{23F3}\u{23E9}-\u{23EF}\u{25AA}-\u{25FE}\u{2934}-\u{2935}\u{2194}-\u{21AA}\u{3030}\u{303D}\u{3297}\u{3299}]/gu, '').replace(/\s{2,}/g, ' ').trim();

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ATLAS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/atlas-copilot`;

const suggestedQuestions = [
  "What are the top 3 risks?",
  "Explain the Cpk issue",
  "Priority CAPA actions?",
  "Summarize for procurement",
];

interface AskAtlasBarProps {
  activeStation: number;
}

export default function AskAtlasBar({ activeStation }: AskAtlasBarProps) {
  const { reportMeta, allNCRs, kpis, stations, iatfWeightedScore } = useAuditReportContext();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const buildAuditContext = useCallback(() => {
    const stationSummary = stations
      .filter(s => s.index >= 2 && s.index <= 9)
      .map(s => `- Station ${s.index} (${s.name}): ${s.health.toUpperCase()} — ${s.ncrs.length} NCRs. ${s.observation || ''}`)
      .join('\n');

    const ncrSummary = allNCRs
      .map(n => `- ${n.id} [${n.severity.toUpperCase()}]: ${n.title} (Station ${n.stationIndex}, ${n.status})${n.isoClause ? ` — ${n.isoClause}` : ''}`)
      .join('\n');

    return `AUDIT CONTEXT:
Supplier: ${reportMeta.supplier}
Client: ${reportMeta.client}
Standard: ${reportMeta.standard}
Verdict: ${reportMeta.verdictLabel}
VDA 6.3 Weighted Score: ${Math.round(iatfWeightedScore)}%
Total NCRs: ${allNCRs.length} (Major: ${allNCRs.filter(n => n.severity === 'major').length}, Minor: ${allNCRs.filter(n => n.severity === 'minor').length})
Currently viewing: Station ${activeStation}

STATIONS:
${stationSummary}

NCR REGISTER:
${ncrSummary}

KPIs: ${kpis.map((k: any) => `${k.label}: ${k.value}`).join(', ')}`;
  }, [reportMeta, allNCRs, stations, kpis, iatfWeightedScore, activeStation]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const newMessages = [...messages, userMessage];
    setMessages([...newMessages, { role: "assistant", content: "" }]);
    setInput("");
    setIsStreaming(true);
    setOpen(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(ATLAS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          auditContext: buildAuditContext(),
        }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') break;
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  accumulated += content;
                  setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { role: "assistant", content: accumulated };
                    return updated;
                  });
                }
              } catch { /* skip */ }
            }
          }
        }
      }

      if (!accumulated) {
        const fallback = await res.text();
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: fallback || "I couldn't generate a response." };
          return updated;
        });
      }
    } catch (e: any) {
      if (e.name === 'AbortError') {
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], content: updated[updated.length - 1].content + "\n\n*[Stopped]*" };
          return updated;
        });
      } else {
        setMessages(prev => prev.slice(0, -1));
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
        setOpen(false);
      }
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const msgCount = messages.filter(m => m.role === 'user').length;

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/10 z-40 transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Chat Panel */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center p-6 transition-all duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
      <div
        className={cn(
          "w-full max-w-[520px] max-h-[600px] flex flex-col bg-card border border-border rounded-2xl shadow-2xl transition-all duration-300",
          open ? "scale-100" : "scale-95"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </div>
            <div>
              <span className="text-[13px] font-semibold text-foreground">Atlas AI</span>
              {msgCount > 0 && (
                <span className="text-[11px] text-muted-foreground ml-1.5">· {msgCount} questions</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="p-1.5 hover:bg-muted rounded-lg transition-colors cursor-pointer"
                title="Clear conversation"
              >
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            )}
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 hover:bg-muted rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[200px] max-h-[360px]">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 py-6">
              <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary/40" />
              </div>
              <p className="text-[13px] text-muted-foreground text-center">Ask anything about this audit</p>
              <div className="flex flex-wrap gap-1.5 justify-center mt-1">
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
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 rounded-full">
                    <Sparkles className="w-3 h-3 text-primary" />
                  </div>
                )}
                <div className={msg.role === 'user'
                  ? 'bg-primary text-primary-foreground px-3 py-2 rounded-2xl rounded-br-md max-w-[80%]'
                  : 'flex-1 min-w-0'
                }>
                  {msg.role === 'user' ? (
                    <p className="text-[13px]">{msg.content}</p>
                  ) : (
                    <div className="prose prose-sm max-w-none text-foreground/90 [&_p]:text-[13px] [&_p]:leading-relaxed [&_li]:text-[13px] [&_strong]:text-foreground [&_h1]:text-[15px] [&_h2]:text-[14px] [&_h3]:text-[13px] [&_code]:text-[11px] [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5">
                      <ReactMarkdown>{stripEmoji(msg.content)}</ReactMarkdown>
                      {isStreaming && i === messages.length - 1 && (
                        <span className="inline-block w-1.5 h-4 bg-primary animate-pulse ml-0.5" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-3 py-2.5 border-t border-border/50">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isStreaming ? "Atlas is thinking..." : "Ask about this audit..."}
            disabled={isStreaming}
            className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground outline-none disabled:opacity-50"
          />
          {isStreaming ? (
            <button
              onClick={() => abortRef.current?.abort()}
              className="p-2 text-destructive cursor-pointer hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
            </button>
          ) : (
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="p-2 text-primary cursor-pointer hover:bg-primary/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      </div>

      {/* FAB Button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer",
          open
            ? "bg-muted text-muted-foreground hover:bg-muted/80 rotate-0"
            : "bg-primary text-primary-foreground hover:shadow-xl hover:scale-105"
        )}
        title="Ask Atlas AI"
      >
        {open ? (
          <X className="w-5 h-5" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-5 h-5" />
            {msgCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-[hsl(155,24%,55%)] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {msgCount}
              </span>
            )}
          </div>
        )}
      </button>
    </>
  );
}
