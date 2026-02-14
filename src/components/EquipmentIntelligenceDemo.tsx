import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import equipmentImage from "@/assets/cnc-machine-dmg-nlx.jpg";

type DetectionMode = "detect" | "measure" | "compare";

interface DetectedObject {
  id: string;
  label: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
  details?: {
    model?: string;
    assetId?: string;
    condition?: string;
    lastService?: string;
    nextService?: string;
    compliance?: string;
    specs?: {
      spindleSpeed?: string;
      maxDiameter?: string;
      axisTravel?: string;
      power?: string;
    };
  };
}

const detectedObjects: DetectedObject[] = [
  {
    id: "main",
    label: "CNC Lathe",
    confidence: 94,
    x: 5,
    y: 8,
    width: 90,
    height: 84,
    details: {
      model: "DMG MORI NLX 2500",
      assetId: "MCH-2024-0847",
      condition: "Good",
      lastService: "Oct 15, 2024",
      nextService: "Jan 2026",
      compliance: "CE · ISO 12100 · EN 12417",
      specs: {
        spindleSpeed: "4,000 rpm",
        maxDiameter: "366 mm",
        axisTravel: "X: 260 / Z: 1,280 mm",
        power: "22 kW"
      }
    }
  },
  {
    id: "control",
    label: "Control Panel",
    confidence: 91,
    x: 8,
    y: 15,
    width: 22,
    height: 25,
  },
  {
    id: "spindle",
    label: "Spindle Unit",
    confidence: 88,
    x: 55,
    y: 30,
    width: 30,
    height: 35,
  },
  {
    id: "safety",
    label: "Safety Guard",
    confidence: 96,
    x: 35,
    y: 10,
    width: 35,
    height: 20,
  }
];

/* ── Design system matching PlatformDemoAnimation ── */
const GlassCard = ({ children, className = "", highlight = false, layer = 1 }: { children: React.ReactNode; className?: string; highlight?: boolean; layer?: number }) => {
  const layerBg = layer === 1
    ? 'bg-white/90 border-white'
    : layer === 2
    ? 'bg-white/92 border-white'
    : 'bg-white/95 border-white';
  return (
    <div className={`border backdrop-blur-md ${highlight ? 'border-accent/40 bg-white/95' : layerBg} ${className}`}>
      {children}
    </div>
  );
};

export function EquipmentIntelligenceDemo() {
  const [mode, setMode] = useState<DetectionMode>("detect");
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);
  const [selectedObject, setSelectedObject] = useState<string | null>("main");
  const [isScanning, setIsScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setIsScanning(false);
            setShowResults(true);
            return 0;
          }
          return prev + 2;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsScanning(true);
      setShowResults(false);
      setScanProgress(0);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const selectedDetails = detectedObjects.find(obj => obj.id === selectedObject)?.details;

  const modes = [
    { id: "detect" as const, label: "Detect" },
    { id: "measure" as const, label: "Measure" },
    { id: "compare" as const, label: "Compare" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative w-full"
    >
      {/* AI Computer Vision Badge */}
      <div className="flex items-center gap-3 mb-4">
        <GlassCard layer={2} className="px-4 py-2 flex items-center gap-2">
          <span className="text-sm text-foreground font-medium">AI Computer Vision</span>
        </GlassCard>
      </div>
      
      <div className="w-full">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 mb-4">
          <GlassCard layer={2} className="flex gap-1 p-1">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`px-3 lg:px-4 py-2 text-xs font-medium flex items-center gap-2 transition-all duration-200 ${
                  mode === m.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/60'
                }`}
              >
                <span>{m.label}</span>
              </button>
            ))}
          </GlassCard>
          
          <div className="flex items-center gap-3">
            <GlassCard layer={2} className="flex items-center gap-2 px-3 py-1.5">
              <div className={`w-2 h-2 ${isScanning ? 'bg-primary animate-pulse' : 'bg-primary'}`} />
              <span className="text-muted-foreground text-xs font-medium">
                {isScanning ? 'Analyzing...' : 'Complete'}
              </span>
            </GlassCard>
            {!isScanning && (
              <span className="text-primary text-xs font-semibold">94%</span>
            )}
          </div>
        </div>
        
        {/* Progress Bar */}
        {isScanning && (
          <div className="h-0.5 bg-muted mb-4 overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        )}
        
        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Image Area */}
          <div className="relative flex-1 aspect-video overflow-hidden border border-white/80">
            <img 
              src={equipmentImage} 
              alt="DMG MORI CNC Machine" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Scanning Overlay */}
            {isScanning && (
              <>
                <div className="absolute inset-0 bg-primary/5" />
                <motion.div
                  initial={{ top: 0 }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-primary/60"
                />
                <motion.div
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsla(199,91%,64%,0.03) 2px, hsla(199,91%,64%,0.03) 4px)'
                  }}
                />
              </>
            )}
              
            {/* Detection Overlays */}
            <AnimatePresence>
              {showResults && mode === "detect" && detectedObjects.map((obj, index) => (
                <motion.div
                  key={obj.id}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className={`absolute cursor-pointer transition-all duration-200 ${
                    hoveredObject === obj.id || selectedObject === obj.id ? 'z-20' : 'z-10'
                  }`}
                  style={{
                    left: `${obj.x}%`,
                    top: `${obj.y}%`,
                    width: `${obj.width}%`,
                    height: `${obj.height}%`,
                  }}
                  onMouseEnter={() => setHoveredObject(obj.id)}
                  onMouseLeave={() => setHoveredObject(null)}
                  onClick={() => setSelectedObject(obj.id)}
                >
                  {/* Bounding Box */}
                  <div 
                    className={`absolute inset-0 border-2 border-primary transition-all duration-200 ${
                      hoveredObject === obj.id || selectedObject === obj.id 
                        ? 'bg-primary/10' 
                        : 'bg-transparent'
                    }`}
                  >
                    <div className="absolute -top-0.5 -left-0.5 w-3 h-3 border-t-2 border-l-2 border-primary" />
                    <div className="absolute -top-0.5 -right-0.5 w-3 h-3 border-t-2 border-r-2 border-primary" />
                    <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 border-b-2 border-l-2 border-primary" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-b-2 border-r-2 border-primary" />
                  </div>
                  
                  {/* Label */}
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-7 left-0 px-2.5 py-1 bg-primary flex items-center gap-1.5"
                  >
                    <svg className="w-3 h-3 text-background" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span className="text-background text-[11px] font-semibold whitespace-nowrap">{obj.label}</span>
                    <span className="text-background/80 text-[10px]">{obj.confidence}%</span>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Measure Mode Overlay */}
            <AnimatePresence>
              {showResults && mode === "measure" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="absolute top-[90%] left-[5%] right-[5%] flex items-center">
                    <div className="h-px flex-1 bg-primary" />
                    <div className="px-2 py-1 bg-primary text-[10px] text-background font-bold mx-1">3,200 mm</div>
                    <div className="h-px flex-1 bg-primary" />
                  </div>
                  <div className="absolute left-[95%] top-[8%] bottom-[8%] flex flex-col items-center">
                    <div className="w-px flex-1 bg-primary" />
                    <div className="px-2 py-1 bg-primary text-[10px] text-background font-bold my-1 -rotate-90 origin-center whitespace-nowrap">2,150 mm</div>
                    <div className="w-px flex-1 bg-primary" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Stats Overlay */}
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
              <div className="flex gap-2">
                <GlassCard layer={3} className="px-2.5 py-1.5 flex items-center gap-2">
                  <span className="text-[11px] text-foreground font-medium">{detectedObjects.length} Objects</span>
                </GlassCard>
                <GlassCard layer={3} className="px-2.5 py-1.5 flex items-center gap-2">
                  <span className="text-[11px] text-foreground font-medium">0.8s</span>
                </GlassCard>
              </div>
            </div>
          </div>
          
          {/* Side Panel - Desktop Only */}
          <div className="hidden lg:flex w-[240px] flex-col gap-3">
            <GlassCard layer={2} className="p-3">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-3">Detection Process</div>
              <div className="space-y-2.5">
                {[
                  { label: "Image Analysis", sub: "Neural network scan" },
                  { label: "Object Detection", sub: "Boundary extraction" },
                  { label: "Classification", sub: "Asset identification" },
                  { label: "Verification", sub: "Compliance check" },
                ].map((step, i) => (
                  <GlassCard key={i} layer={3} className="flex items-center gap-2.5 px-2.5 py-2">
                    <div className="w-6 h-6 bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[11px] text-foreground block">{step.label}</span>
                      <span className="text-[9px] text-muted-foreground">{step.sub}</span>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </GlassCard>
            
            <GlassCard layer={2} className="p-3 flex-1">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Analysis</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-muted-foreground">Accuracy</span>
                  <span className="text-[11px] text-primary font-semibold">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-muted-foreground">Objects</span>
                  <span className="text-[11px] text-foreground font-semibold">{detectedObjects.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-muted-foreground">Status</span>
                  <span className="text-[11px] text-primary font-semibold">Verified</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
        
        {/* Results Panel - Desktop Only */}
        <AnimatePresence>
          {showResults && selectedDetails && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="hidden lg:block mt-4"
            >
              <GlassCard layer={2} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-foreground font-semibold">{selectedDetails.model}</div>
                      <div className="text-[11px] text-muted-foreground">{selectedDetails.compliance}</div>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-primary hover:bg-primary/90 text-xs text-primary-foreground font-medium flex items-center gap-1.5 transition-colors">
                    View Report
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                {/* Maintenance Alert */}
                <GlassCard highlight className="flex items-center gap-2 px-3 py-2 mb-3 border-[hsl(37,91%,55%)]/30">
                  <div className="w-2 h-2 bg-[hsl(37,91%,55%)] animate-pulse" />
                  <span className="text-[11px] text-[hsl(37,91%,55%)] font-medium">Maintenance due: {selectedDetails.nextService}</span>
                </GlassCard>
                
                <div className="grid grid-cols-4 gap-4 mb-3">
                  {[
                    { label: "Asset ID", value: selectedDetails.assetId, color: "text-foreground" },
                    { label: "Condition", value: selectedDetails.condition, color: "text-primary" },
                    { label: "Last Service", value: selectedDetails.lastService, color: "text-foreground" },
                    { label: "Compliance", value: "CE · ISO 12100", color: "text-primary" },
                  ].map((item, i) => (
                    <GlassCard key={i} layer={3} className="p-2.5">
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{item.label}</div>
                      <div className={`text-xs ${item.color} font-medium`}>{item.value}</div>
                    </GlassCard>
                  ))}
                </div>
                
                {/* Machine Specifications */}
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "Spindle", value: selectedDetails.specs?.spindleSpeed },
                    { label: "Max Ø", value: selectedDetails.specs?.maxDiameter },
                    { label: "Axis Travel", value: selectedDetails.specs?.axisTravel },
                    { label: "Power", value: selectedDetails.specs?.power },
                  ].map((item, i) => (
                    <GlassCard key={i} layer={3} className="p-2.5">
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{item.label}</div>
                      <div className="text-xs text-foreground font-medium">{item.value}</div>
                    </GlassCard>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Description */}
      <p className="mt-4 text-sm text-foreground/60 max-w-[600px] leading-relaxed">
        Identify machines and assets from photos. Assess condition, compliance status, and maintenance needs instantly.
      </p>
    </motion.div>
  );
}
