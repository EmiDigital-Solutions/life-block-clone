/**
 * Voice Briefing — AI-powered executive audio summary
 * Round button with animated green pulse when speaking
 */
import { useState, useCallback } from "react";
import { Speech, Square } from "lucide-react";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import { cn } from "@/lib/utils";

export default function VoiceBriefing() {
  const { reportMeta, allNCRs, kpis, iatfWeightedScore, stations } = useAuditReportContext();
  const [speaking, setSpeaking] = useState(false);

  const toggle = useCallback(() => {
    if (speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const majorNCRs = allNCRs.filter(n => n.severity === 'major');
    const worstStation = stations
      .filter(s => s.index >= 2 && s.index <= 9)
      .sort((a, b) => (a.health === 'red' ? 0 : 1) - (b.health === 'red' ? 0 : 1))[0];

    const text = [
      `Atlas AI Executive Briefing for ${reportMeta.supplier}.`,
      `Audit verdict: ${reportMeta.verdictLabel}.`,
      `VDA 6.3 weighted score: ${Math.round(iatfWeightedScore)} percent.`,
      `Total non-conformity reports: ${allNCRs.length}, of which ${majorNCRs.length} are major.`,
      worstStation ? `Highest risk area: ${worstStation.name}, rated ${worstStation.health}.` : '',
      reportMeta.totalCostExposure ? `Total cost exposure: ${reportMeta.totalCostExposure}.` : '',
      majorNCRs.length > 0 ? `Key action required: Close ${majorNCRs.length} major NCRs before approval.` : 'No major NCRs outstanding.',
      `This concludes the executive briefing.`,
    ].filter(Boolean).join(' ');

    const utterance = new SpeechSynthesisUtterance(text);
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
  }, [speaking, reportMeta, allNCRs, kpis, iatfWeightedScore, stations]);

  return (
    <button
      onClick={toggle}
      title={speaking ? "Stop listening" : "Listen to audit result"}
      className="relative flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-all ml-2"
    >
      {/* Animated green pulse rings when speaking */}
      {speaking && (
        <>
          <span className="absolute inset-0 rounded-full bg-[hsl(155,24%,55%)]/30 animate-ping" />
          <span className="absolute inset-[-3px] rounded-full border-2 border-[hsl(155,24%,55%)]/25 animate-pulse" />
        </>
      )}

      {/* Core circle */}
      <span
        className={cn(
          "relative z-10 flex items-center justify-center w-8 h-8 rounded-full transition-colors",
          speaking
            ? "bg-[hsl(155,24%,55%)] text-white"
            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
        )}
      >
        {speaking ? (
          <Square className="w-3 h-3 fill-current" />
        ) : (
          <Speech className="w-3.5 h-3.5" />
        )}
      </span>
    </button>
  );
}
