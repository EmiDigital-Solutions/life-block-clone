import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { motion } from "framer-motion";

interface Capability {
  title: string;
  description: string;
  detailedDescription: string;
  mockupType: 'template' | 'ai' | 'equipment' | 'scoring' | 'evidence' | 'progress';
}

const capabilities: Capability[] = [
  { 
    title: "Flexible Templates", 
    description: "Create custom frameworks per industry, standard or customer requirement.",
    detailedDescription: "Build audit templates tailored to specific industries, international standards (ISO 9001, IATF 16949, AS9100), or customer-specific requirements.",
    mockupType: 'template'
  },
  { 
    title: "AI Guidance", 
    description: "Contextual hints during audits to ensure completeness and objectivity.",
    detailedDescription: "AI-powered contextual assistance guides auditors through complex assessments in real-time.",
    mockupType: 'ai'
  },
  { 
    title: "Equipment Intelligence", 
    description: "Identify machines and assets from photos; assess condition and compliance.",
    detailedDescription: "Advanced computer vision automatically identifies machinery, equipment, and assets from photos taken during audits.",
    mockupType: 'equipment'
  },
  { 
    title: "Dynamic Scoring", 
    description: "Configurable weightings and 1–5 scoring for transparent results.",
    detailedDescription: "Flexible scoring engine supports multiple methodologies including weighted scoring, pass/fail criteria, and numeric scales.",
    mockupType: 'scoring'
  },
  { 
    title: "Evidence Handling", 
    description: "Auto-categorize photos & files (quality, safety, environment) for traceability.",
    detailedDescription: "Intelligent document management system automatically categorizes photos, videos, and documents by topic.",
    mockupType: 'evidence'
  },
  { 
    title: "Real-Time Progress", 
    description: "Live milestones and alerts during audits for fast course-corrections.",
    detailedDescription: "Live dashboard provides real-time visibility into audit progress, completion rates, and emerging issues.",
    mockupType: 'progress'
  },
];

// Template Builder UI
const TemplateMockup = () => (
  <div className="w-full h-full bg-[#1a1a2e] p-3 flex flex-col text-[10px]">
    {/* Header */}
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded bg-primary" />
        <span className="text-white/80 font-medium">ISO 9001 Template</span>
      </div>
      <div className="flex gap-1">
        <div className="px-2 py-0.5 bg-primary/20 text-primary rounded text-[8px]">Draft</div>
      </div>
    </div>
    
    {/* Sections */}
    <div className="flex-1 space-y-2 overflow-hidden">
      {[
        { name: "Quality Management", items: ["Policy", "Objectives", "Resources"] },
        { name: "Documentation", items: ["Procedures", "Records", "Control"] },
        { name: "Performance", items: ["Monitoring", "Analysis", "Improvement"] },
      ].map((section, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.4, duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
          className="bg-white/5 rounded-lg p-2"
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <motion.svg
              animate={{ rotate: [0, 90] }}
              transition={{ delay: i * 0.4 + 0.3, duration: 0.3, repeat: Infinity, repeatDelay: 5 }}
              className="w-2.5 h-2.5 text-white/60" viewBox="0 0 24 24" fill="currentColor"
            >
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </motion.svg>
            <span className="text-white/90 font-medium">{section.name}</span>
          </div>
          <div className="pl-4 space-y-1">
            {section.items.map((item, j) => (
              <motion.div
                key={j}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.4 + j * 0.15 + 0.5, duration: 0.3, repeat: Infinity, repeatDelay: 5 }}
                className="flex items-center gap-1.5"
              >
                <div className="w-3 h-3 rounded border border-accent/50 flex items-center justify-center">
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.4 + j * 0.15 + 0.7, duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
                    className="w-2 h-2 text-accent" viewBox="0 0 24 24" fill="currentColor"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </motion.svg>
                </div>
                <span className="text-white/60">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// AI Assistant Chat UI
const AIMockup = () => (
  <div className="w-full h-full bg-[#1a1a2e] p-3 flex flex-col text-[10px]">
    {/* Header */}
    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
        <span className="text-white text-[8px] font-bold">AI</span>
      </div>
      <div>
        <div className="text-white/90 font-medium">YVOO Copilot</div>
        <div className="text-white/40 text-[8px]">Audit Assistant</div>
      </div>
      <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
    </div>
    
    {/* Chat */}
    <div className="flex-1 space-y-2 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 6 }}
        className="bg-white/10 rounded-lg rounded-bl-sm p-2 max-w-[85%]"
      >
        <p className="text-white/80">Missing evidence for clause 7.1.5 - Monitoring resources</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4, repeat: Infinity, repeatDelay: 6 }}
        className="bg-primary/20 rounded-lg rounded-br-sm p-2 max-w-[85%] ml-auto"
      >
        <p className="text-white/80">What should I collect?</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.4, repeat: Infinity, repeatDelay: 6 }}
        className="bg-white/10 rounded-lg rounded-bl-sm p-2 max-w-[90%]"
      >
        <p className="text-white/80 mb-1.5">Recommended evidence:</p>
        <div className="space-y-1">
          {["Calibration certificates", "Equipment list", "Maintenance logs"].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.8 + i * 0.2, duration: 0.3, repeat: Infinity, repeatDelay: 6 }}
              className="flex items-center gap-1"
            >
              <div className="w-1 h-1 rounded-full bg-accent" />
              <span className="text-white/60">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

// Equipment Recognition UI
const EquipmentMockup = () => (
  <div className="w-full h-full bg-[#1a1a2e] p-3 flex flex-col text-[10px]">
    {/* Image area with detection */}
    <div className="flex-1 bg-white/5 rounded-lg relative overflow-hidden mb-2">
      {/* Simulated machine image */}
      <div className="absolute inset-4 flex items-center justify-center">
        <div className="w-20 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-lg relative">
          <div className="absolute top-1 left-1 w-4 h-4 bg-white/20 rounded" />
          <div className="absolute bottom-1 right-1 w-6 h-3 bg-white/15 rounded-sm" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/10" />
        </div>
      </div>
      
      {/* Detection box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
        className="absolute inset-3 border-2 border-accent rounded-lg"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatDelay: 5 }}
          className="absolute -top-0.5 left-0 h-0.5 bg-accent"
        />
      </motion.div>
      
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.3, repeat: Infinity, repeatDelay: 5 }}
        className="absolute top-1 left-1 bg-accent px-1.5 py-0.5 rounded text-[8px] text-white font-medium"
      >
        CNC Machine • 94%
      </motion.div>
    </div>
    
    {/* Details */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.4, repeat: Infinity, repeatDelay: 5 }}
      className="bg-white/5 rounded-lg p-2 space-y-1.5"
    >
      <div className="flex justify-between">
        <span className="text-white/60">Model</span>
        <span className="text-white/90">DMG MORI NLX</span>
      </div>
      <div className="flex justify-between">
        <span className="text-white/60">Condition</span>
        <span className="text-green-400">Good</span>
      </div>
      <div className="flex justify-between">
        <span className="text-white/60">Last Service</span>
        <span className="text-white/90">2024-10-15</span>
      </div>
    </motion.div>
  </div>
);

// Scoring Dashboard UI
const ScoringMockup = () => (
  <div className="w-full h-full bg-[#1a1a2e] p-3 flex flex-col text-[10px]">
    {/* Overall Score */}
    <div className="text-center mb-3">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 6 }}
        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 border-2 border-accent"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3, repeat: Infinity, repeatDelay: 6 }}
          className="text-2xl font-bold text-white"
        >
          4.2
        </motion.span>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3, repeat: Infinity, repeatDelay: 6 }}
        className="text-white/60 mt-1"
      >
        Overall Score
      </motion.p>
    </div>
    
    {/* Category Scores */}
    <div className="space-y-2">
      {[
        { name: "Quality", score: 4.5, color: "bg-green-400" },
        { name: "Safety", score: 4.0, color: "bg-accent" },
        { name: "Environment", score: 3.8, color: "bg-yellow-400" },
        { name: "Social", score: 4.5, color: "bg-primary" },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 + i * 0.3, duration: 0.4, repeat: Infinity, repeatDelay: 6 }}
          className="flex items-center gap-2"
        >
          <span className="text-white/60 w-16">{item.name}</span>
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.score / 5) * 100}%` }}
              transition={{ delay: 1.2 + i * 0.3, duration: 0.5, repeat: Infinity, repeatDelay: 6 }}
              className={`h-full ${item.color} rounded-full`}
            />
          </div>
          <span className="text-white/90 w-6 text-right">{item.score}</span>
        </motion.div>
      ))}
    </div>
  </div>
);

// Evidence Gallery UI
const EvidenceMockup = () => (
  <div className="w-full h-full bg-[#1a1a2e] p-3 flex flex-col text-[10px]">
    {/* Tabs */}
    <div className="flex gap-1 mb-2">
      {["All", "Quality", "Safety", "Env"].map((tab, i) => (
        <motion.div
          key={tab}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: i === 0 ? 1 : 0.5 }}
          className={`px-2 py-1 rounded-full text-[8px] ${i === 0 ? 'bg-primary text-white' : 'bg-white/10 text-white/60'}`}
        >
          {tab}
        </motion.div>
      ))}
    </div>
    
    {/* Grid */}
    <div className="flex-1 grid grid-cols-3 gap-1.5">
      {[
        { type: "img", tag: "Quality", color: "bg-green-400" },
        { type: "pdf", tag: "Safety", color: "bg-accent" },
        { type: "img", tag: "Env", color: "bg-yellow-400" },
        { type: "img", tag: "Quality", color: "bg-green-400" },
        { type: "doc", tag: "Safety", color: "bg-accent" },
        { type: "img", tag: "Quality", color: "bg-green-400" },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.15, duration: 0.3, repeat: Infinity, repeatDelay: 5 }}
          className="aspect-square bg-white/10 rounded-lg relative overflow-hidden"
        >
          {item.type === "img" ? (
            <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-white/5 rounded" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/40 text-[8px] font-bold uppercase">{item.type}</span>
            </div>
          )}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.15 + 0.3, duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
            className={`absolute bottom-0.5 right-0.5 px-1 py-0.5 rounded text-[6px] text-white ${item.color}`}
          >
            {item.tag}
          </motion.div>
        </motion.div>
      ))}
    </div>
    
    {/* Upload hint */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ delay: 2, duration: 2, repeat: Infinity, repeatDelay: 3 }}
      className="mt-2 text-center text-white/40 text-[8px]"
    >
      AI auto-categorizing 3 new files...
    </motion.div>
  </div>
);

// Progress Dashboard UI
const ProgressMockup = () => (
  <div className="w-full h-full bg-[#1a1a2e] p-3 flex flex-col text-[10px]">
    {/* Header */}
    <div className="flex justify-between items-center mb-3">
      <span className="text-white/90 font-medium">Audit Progress</span>
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-white/60 text-[8px]">Live</span>
      </div>
    </div>
    
    {/* Milestones */}
    <div className="flex-1 space-y-2">
      {[
        { name: "Opening Meeting", status: "complete", time: "09:00" },
        { name: "Document Review", status: "complete", time: "10:30" },
        { name: "Site Walkthrough", status: "active", time: "12:00" },
        { name: "Interviews", status: "pending", time: "14:00" },
        { name: "Closing Meeting", status: "pending", time: "16:00" },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.25, duration: 0.4, repeat: Infinity, repeatDelay: 6 }}
          className="flex items-center gap-2"
        >
          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
            item.status === 'complete' ? 'bg-green-400' : 
            item.status === 'active' ? 'bg-accent animate-pulse' : 'bg-white/20'
          }`}>
            {item.status === 'complete' && (
              <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            )}
          </div>
          <span className={`flex-1 ${item.status === 'pending' ? 'text-white/40' : 'text-white/80'}`}>
            {item.name}
          </span>
          <span className="text-white/40">{item.time}</span>
        </motion.div>
      ))}
    </div>
    
    {/* Alert */}
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.3, repeat: Infinity, repeatDelay: 6 }}
      className="mt-2 bg-yellow-400/20 border border-yellow-400/30 rounded-lg p-2 flex items-center gap-2"
    >
      <span className="text-yellow-400">⚠</span>
      <span className="text-white/80 text-[8px]">Finding detected in Section 4.2</span>
    </motion.div>
  </div>
);

const MockupRenderer = ({ type }: { type: Capability['mockupType'] }) => {
  switch (type) {
    case 'template': return <TemplateMockup />;
    case 'ai': return <AIMockup />;
    case 'equipment': return <EquipmentMockup />;
    case 'scoring': return <ScoringMockup />;
    case 'evidence': return <EvidenceMockup />;
    case 'progress': return <ProgressMockup />;
    default: return <ProgressMockup />;
  }
};

const InfiniteScrollingGallery = () => {
  const [selectedCapability, setSelectedCapability] = useState<Capability | null>(null);

  const row1 = [capabilities[0], capabilities[1], capabilities[2]];
  const row2 = [capabilities[3], capabilities[4], capabilities[5]];

  const renderRow = (items: Capability[], direction: 'left' | 'right', rowIndex: number) => {
    const duplicatedItems = [...items, ...items, ...items];
    
    return (
      <div className="overflow-hidden">
        <div 
          className={`flex gap-6 ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'} hover:animation-pause`}
          style={{ width: 'fit-content' }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`${rowIndex}-${index}`}
              onClick={() => setSelectedCapability(item)}
              className="flex-shrink-0 cursor-pointer rounded-2xl overflow-hidden bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ width: '280px' }}
            >
              <div className="aspect-square overflow-hidden rounded-t-2xl">
                <MockupRenderer type={item.mockupType} />
              </div>
              <div className="p-4">
                <h4 className="text-base font-bold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-snug line-clamp-2">
                  {item.description}
                </p>
                <span className="text-xs font-medium text-primary mt-2 inline-block hover:underline">
                  Learn more →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="space-y-6 py-4">
        {renderRow(row1, 'left', 1)}
        {renderRow(row2, 'right', 2)}

        <style>{`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-304px * 3)); }
          }

          @keyframes scroll-right {
            0% { transform: translateX(calc(-304px * 3)); }
            100% { transform: translateX(0); }
          }

          .animate-scroll-left {
            animation: scroll-left 25s linear infinite;
          }

          .animate-scroll-right {
            animation: scroll-right 25s linear infinite;
          }

          .hover\\:animation-pause:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>

      <Dialog open={selectedCapability !== null} onOpenChange={() => setSelectedCapability(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold mb-4 text-primary">
              {selectedCapability?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {selectedCapability?.detailedDescription}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InfiniteScrollingGallery;
