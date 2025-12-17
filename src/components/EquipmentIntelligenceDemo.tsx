import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, Target, Ruler, GitCompare, Cpu, Activity, Zap, Eye, Settings, ChevronRight } from "lucide-react";
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
  color: string;
  details?: {
    model?: string;
    assetId?: string;
    condition?: string;
    lastService?: string;
    compliance?: string;
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
    color: "#1391BF",
    details: {
      model: "DMG MORI NLX 2500",
      assetId: "MCH-2024-0847",
      condition: "Good",
      lastService: "Oct 15, 2024",
      compliance: "ISO 9001 Certified"
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
    color: "#1391BF"
  },
  {
    id: "spindle",
    label: "Spindle Unit",
    confidence: 88,
    x: 55,
    y: 30,
    width: 30,
    height: 35,
    color: "#1391BF"
  },
  {
    id: "safety",
    label: "Safety Guard",
    confidence: 96,
    x: 35,
    y: 10,
    width: 35,
    height: 20,
    color: "#1391BF"
  }
];

const measurementData = [
  { label: "Width", value: "3,200 mm", icon: Ruler },
  { label: "Height", value: "2,150 mm", icon: Ruler },
  { label: "Depth", value: "1,850 mm", icon: Ruler },
  { label: "Weight", value: "8,500 kg", icon: Activity }
];

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
    { id: "detect" as const, label: "Detect", icon: Target },
    { id: "measure" as const, label: "Measure", icon: Ruler },
    { id: "compare" as const, label: "Compare", icon: GitCompare }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative w-full"
    >
      {/* AI Computer Vision Badge - Desktop */}
      <div className="hidden lg:flex items-center gap-3 mb-4">
        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full flex items-center gap-2 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-[#7CC2A7]" />
          <span className="text-sm text-white/90 font-medium">AI Computer Vision</span>
        </div>
      </div>

      {/* Mobile Badge */}
      <div className="lg:hidden flex items-center gap-2 mb-4">
        <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#7CC2A7]" />
          <span className="text-xs text-white/90 font-medium">AI Computer Vision</span>
        </div>
      </div>
      
      <div className="w-full">
        {/* Clean Toolbar - Floating Style */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 mb-4">
          <div className="flex gap-1 bg-white/5 backdrop-blur-sm p-1 rounded-xl border border-white/10">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`px-3 lg:px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all duration-200 ${
                  mode === m.id 
                    ? 'bg-[#1391BF] text-white' 
                    : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                }`}
              >
                <m.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{m.label}</span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <div className={`w-2 h-2 rounded-full ${isScanning ? 'bg-[#7CC2A7] animate-pulse' : 'bg-[#7CC2A7]'}`} />
              <span className="text-white/70 text-xs font-medium">
                {isScanning ? 'Analyzing...' : 'Complete'}
              </span>
            </div>
            {!isScanning && (
              <span className="text-[#7CC2A7] text-xs font-semibold">94%</span>
            )}
          </div>
        </div>
        
        {/* Progress Bar */}
        {isScanning && (
          <div className="h-0.5 bg-white/5 rounded-full mb-4 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#7CC2A7] to-[#1391BF]"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        )}
        
        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Image Area - Frameless with subtle shadow */}
          <div className="relative flex-1 h-[280px] sm:h-[340px] lg:h-[440px] rounded-2xl overflow-hidden shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]">
            <img 
              src={equipmentImage} 
              alt="DMG MORI CNC Machine" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Scanning Overlay */}
            {isScanning && (
              <>
                  <div className="absolute inset-0 bg-gradient-to-b from-[#7CC2A7]/5 to-transparent" />
                  <motion.div
                    initial={{ top: 0 }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#7CC2A7] to-transparent shadow-[0_0_20px_rgba(124,194,167,0.5)]"
                  />
                  <motion.div
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(124, 194, 167, 0.03) 2px, rgba(124, 194, 167, 0.03) 4px)'
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
                      className={`absolute inset-0 border-2 rounded-lg transition-all duration-200 ${
                        hoveredObject === obj.id || selectedObject === obj.id 
                          ? 'bg-opacity-10' 
                          : 'bg-opacity-0'
                      }`}
                      style={{ 
                        borderColor: obj.color,
                        backgroundColor: hoveredObject === obj.id || selectedObject === obj.id ? `${obj.color}20` : 'transparent'
                      }}
                    >
                      {/* Corner Indicators */}
                      <div className="absolute -top-0.5 -left-0.5 w-3 h-3 border-t-2 border-l-2 rounded-tl-sm" style={{ borderColor: obj.color }} />
                      <div className="absolute -top-0.5 -right-0.5 w-3 h-3 border-t-2 border-r-2 rounded-tr-sm" style={{ borderColor: obj.color }} />
                      <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 border-b-2 border-l-2 rounded-bl-sm" style={{ borderColor: obj.color }} />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-b-2 border-r-2 rounded-br-sm" style={{ borderColor: obj.color }} />
                    </div>
                    
                    {/* Label */}
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-7 left-0 px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-lg"
                      style={{ backgroundColor: obj.color }}
                    >
                      <CheckCircle2 className="w-3 h-3 text-white" />
                      <span className="text-white text-[11px] font-semibold whitespace-nowrap">{obj.label}</span>
                      <span className="text-white/80 text-[10px]">{obj.confidence}%</span>
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
                    {/* Horizontal Measurement */}
                    <div className="absolute top-[90%] left-[5%] right-[5%] flex items-center">
                      <div className="h-px flex-1 bg-[#1391BF]" />
                      <div className="px-2 py-1 bg-[#1391BF] rounded text-[10px] text-white font-bold mx-1">3,200 mm</div>
                      <div className="h-px flex-1 bg-[#1391BF]" />
                    </div>
                    {/* Vertical Measurement */}
                    <div className="absolute left-[95%] top-[8%] bottom-[8%] flex flex-col items-center">
                      <div className="w-px flex-1 bg-[#7CC2A7]" />
                      <div className="px-2 py-1 bg-[#7CC2A7] rounded text-[10px] text-white font-bold my-1 -rotate-90 origin-center whitespace-nowrap">2,150 mm</div>
                      <div className="w-px flex-1 bg-[#7CC2A7]" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Stats Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                <div className="flex gap-2">
                  <div className="px-2.5 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 flex items-center gap-2">
                    <Eye className="w-3.5 h-3.5 text-[#7CC2A7]" />
                    <span className="text-[11px] text-white/90 font-medium">{detectedObjects.length} Objects</span>
                  </div>
                  <div className="px-2.5 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-[#D8A860]" />
                    <span className="text-[11px] text-white/90 font-medium">0.8s</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Side Panel - Desktop Only */}
            <div className="hidden lg:flex w-[240px] flex-col gap-3">
              {/* Detection Effects */}
              <div className="bg-[#141414] rounded-xl p-3 border border-[#C0C0C0]/5">
                <div className="text-[10px] text-[#C0C0C0]/50 uppercase tracking-wider font-semibold mb-3">Detection Process</div>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-[#1391BF]/5 border border-[#1391BF]/10">
                    <div className="w-6 h-6 rounded-md bg-[#1391BF]/10 flex items-center justify-center">
                      <Eye className="w-3.5 h-3.5 text-[#1391BF]" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[11px] text-[#F5F5F5]/80 block">Image Analysis</span>
                      <span className="text-[9px] text-[#C0C0C0]/50">Neural network scan</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-[#7CC2A7]/5 border border-[#7CC2A7]/10">
                    <div className="w-6 h-6 rounded-md bg-[#7CC2A7]/10 flex items-center justify-center">
                      <Target className="w-3.5 h-3.5 text-[#7CC2A7]" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[11px] text-[#F5F5F5]/80 block">Object Detection</span>
                      <span className="text-[9px] text-[#C0C0C0]/50">Boundary extraction</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-[#1391BF]/5 border border-[#1391BF]/10">
                    <div className="w-6 h-6 rounded-md bg-[#1391BF]/10 flex items-center justify-center">
                      <Cpu className="w-3.5 h-3.5 text-[#1391BF]" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[11px] text-[#F5F5F5]/80 block">Classification</span>
                      <span className="text-[9px] text-[#C0C0C0]/50">Asset identification</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-[#7CC2A7]/5 border border-[#7CC2A7]/10">
                    <div className="w-6 h-6 rounded-md bg-[#7CC2A7]/10 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7CC2A7]" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[11px] text-[#F5F5F5]/80 block">Verification</span>
                      <span className="text-[9px] text-[#C0C0C0]/50">Compliance check</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="bg-[#141414] rounded-xl p-3 border border-[#C0C0C0]/5 flex-1">
                <div className="text-[10px] text-[#C0C0C0]/50 uppercase tracking-wider font-semibold mb-2">Analysis</div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-[#C0C0C0]/60">Accuracy</span>
                    <span className="text-[11px] text-[#7CC2A7] font-semibold">94%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-[#C0C0C0]/60">Objects</span>
                    <span className="text-[11px] text-[#F5F5F5]/80 font-semibold">{detectedObjects.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-[#C0C0C0]/60">Status</span>
                    <span className="text-[11px] text-[#7CC2A7] font-semibold">Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results Panel - Desktop Only */}
          <AnimatePresence>
            {showResults && selectedDetails && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="hidden lg:block mt-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#7CC2A7]/10 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-[#7CC2A7]" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{selectedDetails.model}</div>
                      <div className="text-[11px] text-white/60">{selectedDetails.compliance}</div>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-[#1391BF] hover:bg-[#1391BF]/90 rounded-lg text-xs text-white font-medium flex items-center gap-1.5 transition-colors">
                    View Report
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-black/20 rounded-lg p-2.5">
                    <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Asset ID</div>
                    <div className="text-xs text-white/90 font-medium">{selectedDetails.assetId}</div>
                  </div>
                  <div className="bg-black/20 rounded-lg p-2.5">
                    <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Condition</div>
                    <div className="text-xs text-[#7CC2A7] font-medium">{selectedDetails.condition}</div>
                  </div>
                  <div className="bg-black/20 rounded-lg p-2.5">
                    <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Last Service</div>
                    <div className="text-xs text-white/90 font-medium">{selectedDetails.lastService}</div>
                  </div>
                  <div className="bg-black/20 rounded-lg p-2.5">
                    <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Compliance</div>
                    <div className="text-xs text-[#1391BF] font-medium">ISO 9001</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      
      {/* Description */}
      <p className="mt-4 text-sm text-white/60 max-w-[600px] leading-relaxed">
        Identify machines and assets from photos. Assess condition, compliance status, and maintenance needs instantly.
      </p>
    </motion.div>
  );
}
