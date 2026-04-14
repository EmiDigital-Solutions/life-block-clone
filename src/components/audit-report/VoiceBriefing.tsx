/**
 * Voice Briefing — AI-powered executive audio summary
 * Narrates the audit verdict, key risks, and required actions
 */
import { useState, useCallback } from "react";
import { Volume2, Square, Sparkles } from "lucide-react";
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
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold uppercase tracking-wider transition-all cursor-pointer border",
        speaking
          ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
          : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:border-primary/30"
      )}
    >
      {speaking ? (
        <>
          <Square className="w-3.5 h-3.5 fill-current" />
          <span>Stop Briefing</span>
        </>
      ) : (
        <>
          <Sparkles className="w-3.5 h-3.5" />
          <Volume2 className="w-3.5 h-3.5" />
          <span>AI Voice Summary</span>
        </>
      )}
    </button>
  );
}
