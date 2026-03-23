import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Loader2, Volume2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AtlasCopilot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm Atlas AI Copilot. I can help you analyze audit data, identify quality risks, recommend CAPA actions, and answer questions about your supplier portfolio. What would you like to know?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("atlas-copilot", {
        body: { messages: newMessages },
      });

      if (error) throw error;

      const assistantContent = data?.response || "I'm sorry, I couldn't process that request. Please try again.";
      setMessages(prev => [...prev, { role: "assistant", content: assistantContent }]);
    } catch (err) {
      console.error("Copilot error:", err);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "The AI Copilot edge function is not deployed yet. Deploy the `atlas-copilot` function to enable this feature."
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl">
      <div className="mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" /> Atlas AI Copilot
        </h1>
        <p className="text-muted-foreground">Your intelligent audit assistant</p>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        <CardContent className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
                {msg.role === "assistant" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-1 h-6 px-2 text-xs"
                    onClick={() => speak(msg.content)}
                  >
                    <Volume2 className="h-3 w-3 mr-1" /> Listen
                  </Button>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg px-4 py-3">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </CardContent>

        <div className="p-4 border-t flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about audit data, quality risks, suppliers..."
            disabled={loading}
          />
          <Button onClick={sendMessage} disabled={loading || !input.trim()} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AtlasCopilot;
