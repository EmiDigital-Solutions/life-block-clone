import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, Target, Ruler, GitCompare, Cpu, Zap, Eye, ChevronRight } from "lucide-react";
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
      {/* Strict 16:9 Container - Everything inside */}
      <div className="relative w-full aspect-video bg-[#0A0A0A] rounded-2xl overflow-hidden">
        {/* Inner content with padding */}
        <div className="absolute inset-0 p-3 flex flex-col">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between gap-2 mb-2 flex-shrink-0">
            {/* AI Badge */}
            <div className="px-2 py-1 bg-[#141414] border border-[#C0C0C0]/10 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#7CC2A7]" />
              <span className="text-[10px] text-white/90 font-medium">AI Computer Vision</span>
            </div>
            
            {/* Mode Toolbar */}
            <div className="flex gap-0.5 bg-[#141414] p-0.5 rounded-lg border border-[#C0C0C0]/10">
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`px-2 py-1 rounded-md text-[10px] font-medium flex items-center gap-1 transition-all duration-200 ${
                    mode === m.id 
                      ? 'bg-[#1391BF] text-white' 
                      : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                  }`}
                >
                  <m.icon className="w-2.5 h-2.5" />
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
            
            {/* Status */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 px-2 py-1 bg-[#141414] rounded-md border border-[#C0C0C0]/10">
                <div className={`w-1.5 h-1.5 rounded-full ${isScanning ? 'bg-[#7CC2A7] animate-pulse' : 'bg-[#7CC2A7]'}`} />
                <span className="text-white/70 text-[9px] font-medium">
                  {isScanning ? 'Analyzing...' : 'Complete'}
                </span>
              </div>
              {!isScanning && (
                <span className="text-[#7CC2A7] text-[10px] font-semibold">94%</span>
              )}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="h-0.5 bg-[#141414] rounded-full mb-2 overflow-hidden flex-shrink-0">
            {isScanning && (
              <motion.div 
                className="h-full bg-gradient-to-r from-[#7CC2A7] to-[#1391BF]"
                style={{ width: `${scanProgress}%` }}
              />
            )}
          </div>
          
          {/* Main Content - Fills remaining space */}
          <div className="flex-1 flex gap-2 min-h-0">
            
            {/* Image Area */}
            <div className="relative flex-1 rounded-xl overflow-hidden">
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
                    className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#7CC2A7] to-transparent shadow-[0_0_15px_rgba(124,194,167,0.5)]"
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
                      className="absolute inset-0 border rounded-md transition-all duration-200"
                      style={{ 
                        borderColor: obj.color,
                        borderWidth: '1.5px',
                        backgroundColor: hoveredObject === obj.id || selectedObject === obj.id ? `${obj.color}15` : 'transparent'
                      }}
                    >
                      {/* Corner Indicators */}
                      <div className="absolute -top-px -left-px w-2 h-2 border-t border-l rounded-tl-sm" style={{ borderColor: obj.color }} />
                      <div className="absolute -top-px -right-px w-2 h-2 border-t border-r rounded-tr-sm" style={{ borderColor: obj.color }} />
                      <div className="absolute -bottom-px -left-px w-2 h-2 border-b border-l rounded-bl-sm" style={{ borderColor: obj.color }} />
                      <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r rounded-br-sm" style={{ borderColor: obj.color }} />
                    </div>
                    
                    {/* Label */}
                    <motion.div
                      initial={{ opacity: 0, y: -3 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-5 left-0 px-1.5 py-0.5 rounded flex items-center gap-1 shadow-lg"
                      style={{ backgroundColor: obj.color }}
                    >
                      <CheckCircle2 className="w-2 h-2 text-white" />
                      <span className="text-white text-[8px] font-semibold whitespace-nowrap">{obj.label}</span>
                      <span className="text-white/80 text-[7px]">{obj.confidence}%</span>
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
                    <div className="absolute top-[88%] left-[5%] right-[5%] flex items-center">
                      <div className="h-px flex-1 bg-[#1391BF]" />
                      <div className="px-1.5 py-0.5 bg-[#1391BF] rounded text-[8px] text-white font-bold mx-1">3,200 mm</div>
                      <div className="h-px flex-1 bg-[#1391BF]" />
                    </div>
                    {/* Vertical Measurement */}
                    <div className="absolute left-[93%] top-[8%] bottom-[15%] flex flex-col items-center">
                      <div className="w-px flex-1 bg-[#7CC2A7]" />
                      <div className="px-1.5 py-0.5 bg-[#7CC2A7] rounded text-[8px] text-white font-bold my-1 -rotate-90 origin-center whitespace-nowrap">2,150 mm</div>
                      <div className="w-px flex-1 bg-[#7CC2A7]" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Stats Overlay */}
              <div className="absolute bottom-2 left-2 flex gap-1.5">
                <div className="px-1.5 py-1 bg-black/70 backdrop-blur-md rounded-md flex items-center gap-1">
                  <Eye className="w-2.5 h-2.5 text-[#7CC2A7]" />
                  <span className="text-[8px] text-white/90 font-medium">{detectedObjects.length} Objects</span>
                </div>
                <div className="px-1.5 py-1 bg-black/70 backdrop-blur-md rounded-md flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5 text-[#D8A860]" />
                  <span className="text-[8px] text-white/90 font-medium">0.8s</span>
                </div>
              </div>
            </div>
            
            {/* Side Panel - Desktop Only */}
            <div className="hidden lg:flex w-[180px] flex-col gap-2 flex-shrink-0">
              {/* Detection Effects */}
              <div className="bg-[#141414] rounded-lg p-2 border border-[#C0C0C0]/5 flex-1">
                <div className="text-[8px] text-[#C0C0C0]/50 uppercase tracking-wider font-semibold mb-2">Detection Process</div>
                <div className="space-y-1.5">
                  {[
                    { icon: Eye, label: "Image Analysis", sub: "Neural network scan", color: "#1391BF" },
                    { icon: Target, label: "Object Detection", sub: "Boundary extraction", color: "#7CC2A7" },
                    { icon: Cpu, label: "Classification", sub: "Asset identification", color: "#1391BF" },
                    { icon: CheckCircle2, label: "Verification", sub: "Compliance check", color: "#7CC2A7" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 px-1.5 py-1 rounded-md" style={{ backgroundColor: `${item.color}08`, border: `1px solid ${item.color}15` }}>
                      <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                        <item.icon className="w-2.5 h-2.5" style={{ color: item.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] text-[#F5F5F5]/80 block truncate">{item.label}</span>
                        <span className="text-[7px] text-[#C0C0C0]/50 block truncate">{item.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="bg-[#141414] rounded-lg p-2 border border-[#C0C0C0]/5">
                <div className="text-[8px] text-[#C0C0C0]/50 uppercase tracking-wider font-semibold mb-1.5">Analysis</div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-[#C0C0C0]/60">Accuracy</span>
                    <span className="text-[9px] text-[#7CC2A7] font-semibold">94%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-[#C0C0C0]/60">Objects</span>
                    <span className="text-[9px] text-[#F5F5F5]/80 font-semibold">{detectedObjects.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-[#C0C0C0]/60">Status</span>
                    <span className="text-[9px] text-[#7CC2A7] font-semibold">Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Results Bar - Inside 16:9 */}
          <AnimatePresence>
            {showResults && selectedDetails && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="hidden lg:flex mt-2 bg-[#141414] rounded-lg p-2 border border-[#C0C0C0]/5 items-center justify-between flex-shrink-0"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-[#7CC2A7]/10 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7CC2A7]" />
                  </div>
                  <div>
                    <div className="text-[10px] text-white font-semibold">{selectedDetails.model}</div>
                    <div className="text-[8px] text-white/60">{selectedDetails.compliance}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div>
                    <div className="text-[7px] text-white/50 uppercase">Asset ID</div>
                    <div className="text-[9px] text-white/90 font-medium">{selectedDetails.assetId}</div>
                  </div>
                  <div>
                    <div className="text-[7px] text-white/50 uppercase">Condition</div>
                    <div className="text-[9px] text-[#7CC2A7] font-medium">{selectedDetails.condition}</div>
                  </div>
                  <div>
                    <div className="text-[7px] text-white/50 uppercase">Last Service</div>
                    <div className="text-[9px] text-white/90 font-medium">{selectedDetails.lastService}</div>
                  </div>
                </div>
                <button className="px-2 py-1 bg-[#1391BF] hover:bg-[#1391BF]/90 rounded-md text-[9px] text-white font-medium flex items-center gap-1 transition-colors">
                  View Report
                  <ChevronRight className="w-2.5 h-2.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
