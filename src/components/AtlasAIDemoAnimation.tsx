import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── AUDITOR VIEW DEMO ── */
const AtlasAIDemoAnimation = () => {
  const [showFinding, setShowFinding] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [photoFlash, setPhotoFlash] = useState(false);

  const questions = [
    "Is the fire suppression system compliant with local regulations?",
    "Are calibration certificates current for all measurement equipment?",
    "Is the document control procedure implemented effectively?",
  ];

  // Cycle mic pulse
  useEffect(() => {
    const t1 = setTimeout(() => setMicActive(true), 1500);
    const t2 = setTimeout(() => setMicActive(false), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Show AI finding after delay
  useEffect(() => {
    const t = setTimeout(() => setShowFinding(true), 2200);
    return () => clearTimeout(t);
  }, []);

  // Auto-select answer
  useEffect(() => {
    const t = setTimeout(() => setSelectedAnswer("NO"), 3000);
    return () => clearTimeout(t);
  }, []);

  // Photo flash
  useEffect(() => {
    const t = setTimeout(() => {
      setPhotoFlash(true);
      setTimeout(() => setPhotoFlash(false), 300);
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-[hsl(215,25%,12%)] overflow-hidden relative">
      {/* Photo flash overlay */}
      <AnimatePresence>
        {photoFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white z-50"
          />
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#3DC88E] rounded-full" />
          <span className="text-[11px] text-white/40 font-medium tracking-wide">IATF 16949 · Clause 4.2.3</span>
        </div>
        <span className="text-[13px] font-bold text-white tracking-wide">Auditor View</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/30">45%</span>
          <div className="w-16 h-1.5 bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "45%" }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="h-full bg-primary"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden min-h-0 p-4 gap-4">

        {/* LEFT COLUMN — Question + Evidence */}
        <div className="flex-[55] flex flex-col gap-4 min-w-0">

          {/* Question Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[hsl(215,20%,18%)] border border-white/8 p-5 flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Question</span>
              <div className="flex gap-1.5">
                <button className="w-6 h-6 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
                  <svg className="w-3.5 h-3.5 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728" />
                    <circle cx="8" cy="12" r="2" />
                    <path d="M4 12H6" />
                  </svg>
                </button>
                <button className="w-6 h-6 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
                  <svg className="w-3.5 h-3.5 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </button>
                <button className="w-6 h-6 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
                  <svg className="w-3.5 h-3.5 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-[15px] md:text-[17px] text-white font-medium leading-relaxed mb-5">
              {questions[questionIndex]}
            </p>

            {/* YES / NO / N/A Buttons */}
            <div className="flex gap-3">
              {["YES", "NO", "N/A"].map((label) => {
                const isSelected = selectedAnswer === label;
                const color = label === "YES"
                  ? "bg-[#3DC88E] border-[#3DC88E]"
                  : label === "NO"
                  ? "bg-primary border-primary"
                  : "bg-white/10 border-white/20";
                const selectedStyle = isSelected
                  ? label === "YES"
                    ? "bg-[#3DC88E] border-[#3DC88E] text-white scale-105 shadow-lg shadow-[#3DC88E]/20"
                    : label === "NO"
                    ? "bg-primary border-primary text-white scale-105 shadow-lg shadow-primary/20"
                    : "bg-white/20 border-white/30 text-white scale-105"
                  : `${color} text-white/80 hover:opacity-80`;
                return (
                  <motion.button
                    key={label}
                    animate={isSelected ? { scale: 1.05 } : { scale: 1 }}
                    className={`flex-1 py-3 text-[14px] md:text-[16px] font-bold border-2 transition-all duration-300 ${selectedStyle}`}
                  >
                    {label}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Evidence Upload */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[hsl(215,20%,18%)] border border-white/8 p-4 flex-1 flex flex-col"
          >
            <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-3">Evidence Upload</span>
            <div className="flex gap-3 flex-1">
              {/* Take Photo */}
              <button className="flex-1 flex flex-col items-center justify-center gap-2 bg-[hsl(215,20%,14%)] border border-white/8 hover:border-primary/30 transition-colors group">
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/5 group-hover:bg-primary/10 transition-colors">
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-white/40 group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
                <span className="text-[11px] text-white/40 group-hover:text-white/60 font-medium transition-colors">Take Photo</span>
              </button>

              {/* Upload File */}
              <button className="flex-1 flex flex-col items-center justify-center gap-2 bg-[hsl(215,20%,14%)] border border-white/8 hover:border-primary/30 transition-colors group">
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/5 group-hover:bg-primary/10 transition-colors">
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-white/40 group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <span className="text-[11px] text-white/40 group-hover:text-white/60 font-medium transition-colors">Upload File</span>
              </button>

              {/* Recent Evidence */}
              <div className="flex-1 flex flex-col gap-1.5 overflow-hidden">
                <span className="text-[9px] text-white/30 uppercase tracking-wider">Recent</span>
                {[
                  { name: "IMG_2847.jpg", status: "✓", statusColor: "text-[#3DC88E]" },
                  { name: "calibration.pdf", status: "⏳", statusColor: "text-[#F5A623]" },
                  { name: "nameplate.jpg", status: "✓", statusColor: "text-[#3DC88E]" },
                ].map((f, i) => (
                  <motion.div
                    key={f.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                    className="flex items-center gap-1.5 bg-white/5 px-2 py-1.5"
                  >
                    <span className={`text-[10px] ${f.statusColor}`}>{f.status}</span>
                    <span className="text-[9px] text-white/40 truncate">{f.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN — Atlas Copilot + AI Finding */}
        <div className="flex-[45] flex flex-col gap-4 min-w-0">

          {/* Atlas Copilot */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[hsl(215,20%,18%)] border border-white/8 p-5 flex flex-col items-center flex-1"
          >
            <span className="text-[13px] font-bold text-white tracking-wide mb-4">Atlas Copilot</span>

            {/* Microphone Circle */}
            <div className="relative flex items-center justify-center my-auto">
              {/* Outer pulse rings */}
              <AnimatePresence>
                {micActive && (
                  <>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: 1.8, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full border border-primary/30"
                    />
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0.4 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                      className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full border border-primary/20"
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Main mic button */}
              <motion.div
                animate={micActive ? {
                  boxShadow: ["0 0 20px hsl(var(--primary) / 0.3)", "0 0 40px hsl(var(--primary) / 0.5)", "0 0 20px hsl(var(--primary) / 0.3)"]
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
                  micActive
                    ? "bg-primary/20 border-2 border-primary"
                    : "bg-white/5 border-2 border-white/20 hover:border-primary/50"
                }`}
              >
                <svg
                  className={`w-7 h-7 md:w-8 md:h-8 transition-colors duration-300 ${micActive ? "text-primary" : "text-white/50"}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <rect x="9" y="1" width="6" height="12" rx="3" />
                  <path d="M5 10a7 7 0 0014 0" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                </svg>
              </motion.div>
            </div>

            {/* Status text */}
            <motion.span
              animate={{ opacity: micActive ? [0.5, 1, 0.5] : 0.4 }}
              transition={{ duration: 1.5, repeat: micActive ? Infinity : 0 }}
              className={`text-[11px] font-medium mt-4 ${micActive ? "text-primary" : "text-white/40"}`}
            >
              {micActive ? "Listening..." : "Tap to speak"}
            </motion.span>

            {/* Voice waveform */}
            <AnimatePresence>
              {micActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-0.5 mt-3"
                >
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-primary"
                      animate={{ height: [3, Math.random() * 16 + 4, 3] }}
                      transition={{
                        duration: 0.3 + Math.random() * 0.4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.03,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* AI Finding */}
          <AnimatePresence>
            {showFinding && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                className="bg-[hsl(215,20%,18%)] border border-[#F5A623]/30 p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[13px] font-bold text-white">AI Finding:</span>
                  <span className="text-[#F5A623] text-[16px]">⚠</span>
                </div>
                <p className="text-[13px] text-white/60 leading-relaxed">
                  Check pressure gauge on adjacent unit. Calibration sticker expired 2024-11.
                </p>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 py-1.5 text-[10px] font-bold text-[#3DC88E] border border-[#3DC88E]/30 bg-[#3DC88E]/5 hover:bg-[#3DC88E]/10 transition-colors uppercase tracking-wider">
                    Accept
                  </button>
                  <button className="flex-1 py-1.5 text-[10px] font-bold text-white/40 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors uppercase tracking-wider">
                    Dismiss
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AtlasAIDemoAnimation;
