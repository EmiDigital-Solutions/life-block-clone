import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { motion } from "framer-motion";

interface Capability {
  title: string;
  description: string;
  detailedDescription: string;
  mockupType: 'template' | 'ai' | 'equipment' | 'scoring' | 'evidence' | 'progress' | 'risk' | 'tracking' | 'integration';
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

// Animated Mockup Components
const TemplateMockup = () => (
  <div className="w-full h-full p-4 flex flex-col gap-2">
    <div className="bg-white/20 rounded-lg p-2 flex items-center gap-2">
      <div className="w-3 h-3 rounded bg-primary/60" />
      <div className="h-2 bg-white/40 rounded flex-1" />
    </div>
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.3, duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
        className="bg-white/10 rounded-lg p-2 flex items-center gap-2"
      >
        <motion.div 
          className="w-4 h-4 rounded border-2 border-accent"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ delay: i * 0.3 + 0.5, duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
        />
        <div className="h-2 bg-white/30 rounded flex-1" />
      </motion.div>
    ))}
  </div>
);

const AIMockup = () => (
  <div className="w-full h-full p-4 flex flex-col gap-2">
    <div className="flex-1 flex flex-col justify-end gap-2">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4 }}
        className="bg-white/20 rounded-xl p-2 ml-auto max-w-[70%]"
      >
        <div className="h-2 bg-white/40 rounded w-full mb-1" />
        <div className="h-2 bg-white/30 rounded w-3/4" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatDelay: 4 }}
        className="bg-primary/30 rounded-xl p-2 mr-auto max-w-[80%] flex gap-2"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 rounded-full border-2 border-t-transparent border-white/60"
        />
        <div className="flex-1">
          <div className="h-2 bg-white/40 rounded w-full mb-1" />
          <div className="h-2 bg-white/30 rounded w-2/3" />
        </div>
      </motion.div>
    </div>
  </div>
);

const EquipmentMockup = () => (
  <div className="w-full h-full p-4 flex items-center justify-center">
    <div className="relative">
      <motion.div
        className="w-20 h-16 bg-white/20 rounded-lg"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
        className="absolute -top-2 -right-2 bg-accent rounded-full p-1"
      >
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ delay: 1, duration: 1, repeat: Infinity, repeatDelay: 2 }}
        className="absolute -bottom-4 left-0 h-1 bg-primary/60 rounded"
      />
    </div>
  </div>
);

const ScoringMockup = () => (
  <div className="w-full h-full p-4 flex items-end justify-center gap-2">
    {[60, 80, 45, 90, 70].map((height, i) => (
      <motion.div
        key={i}
        initial={{ height: 0 }}
        animate={{ height: `${height}%` }}
        transition={{ delay: i * 0.2, duration: 0.8, repeat: Infinity, repeatDelay: 3 }}
        className="w-6 bg-gradient-to-t from-primary/60 to-accent/60 rounded-t"
      />
    ))}
  </div>
);

const EvidenceMockup = () => (
  <div className="w-full h-full p-3 grid grid-cols-3 gap-2">
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.2, duration: 0.4, repeat: Infinity, repeatDelay: 4 }}
        className="bg-white/20 rounded-lg aspect-square flex items-center justify-center"
      >
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          className="w-4 h-4 rounded bg-accent/50"
        />
      </motion.div>
    ))}
  </div>
);

const ProgressMockup = () => (
  <div className="w-full h-full p-4 flex flex-col gap-3">
    {[85, 60, 40].map((progress, i) => (
      <div key={i} className="flex items-center gap-2">
        <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ delay: i * 0.3, duration: 1, repeat: Infinity, repeatDelay: 3 }}
            className="h-full bg-gradient-to-r from-primary/60 to-accent/60 rounded-full"
          />
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.3 + 0.5, duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
          className="text-xs text-white/60 font-medium"
        >
          {progress}%
        </motion.span>
      </div>
    ))}
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
              <div className="aspect-square bg-gradient-to-br from-charcoal to-foreground/90 flex items-center justify-center relative overflow-hidden">
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
