import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Upload, Camera, FileText, TrendingUp, AlertCircle } from "lucide-react";

const InteractiveSoftwareDemo = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(timer);
  }, [autoPlay]);

  const screens = [
    // Screen 1: Order Audit
    <div key="screen1" className="w-full h-full bg-white p-8 flex flex-col">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Order New Audit</h3>
        <p className="text-gray-600">Enter supplier details to begin</p>
      </div>
      
      <div className="space-y-4 flex-1">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Supplier Name</label>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3"
          >
            <span className="text-gray-900">Precision Manufacturing GmbH</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3"
            >
              <span className="text-gray-900">Germany</span>
            </motion.div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3"
            >
              <span className="text-gray-900">Munich</span>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="bg-[hsl(160,25%,72%)]/20 border border-[hsl(160,25%,72%)] rounded-lg p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 border-2 border-[hsl(160,25%,72%)] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium text-gray-900">Loading supplier data...</span>
          </div>
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Check className="w-3 h-3 text-[hsl(160,25%,72%)]" />
              <span>Previous audits: 3 found</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3 h-3 text-[hsl(160,25%,72%)]" />
              <span>Certifications: ISO 9001, ISO 14001</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>,

    // Screen 2: Audit Type & Checklist
    <div key="screen2" className="w-full h-full bg-white p-8 flex flex-col">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Configure Audit</h3>
        <p className="text-gray-600">Select audit type and checklist</p>
      </div>
      
      <div className="space-y-4 flex-1">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Audit Type</label>
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-[hsl(160,25%,72%)] text-black rounded-lg p-4 border-2 border-[hsl(160,25%,72%)]"
            >
              <div className="font-semibold mb-1">Quality Audit</div>
              <div className="text-sm opacity-80">ISO 9001 compliance</div>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4"
            >
              <div className="font-semibold text-gray-900 mb-1">Safety Audit</div>
              <div className="text-sm text-gray-600">OHSAS 18001</div>
            </motion.div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Audit Checklist</label>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
          >
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <div className="text-sm text-gray-600 mb-1">Upload custom checklist</div>
            <div className="text-xs text-gray-400">or</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="bg-gray-50 border border-gray-200 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">ISO 9001 Standard Checklist</div>
              <div className="text-xs text-gray-600">127 checkpoints • Last updated 2024</div>
            </div>
            <Check className="w-5 h-5 text-[hsl(160,25%,72%)]" />
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="w-full bg-black text-white rounded-full py-4 font-semibold hover:bg-gray-800 transition-colors"
        >
          Order Audit
        </motion.button>
      </div>
    </div>,

    // Screen 3: AI Autopilot & Computer Vision
    <div key="screen3" className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 p-8 flex flex-col text-white">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-400">AI Autopilot Active</span>
        </div>
        <h3 className="text-2xl font-bold mb-2">Live Audit Session</h3>
        <p className="text-gray-400">AI-guided inspection with computer vision</p>
      </div>
      
      <div className="flex-1 space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20"
        >
          <div className="flex items-start gap-3">
            <Camera className="w-5 h-5 text-[hsl(160,25%,72%)] mt-1" />
            <div className="flex-1">
              <div className="font-semibold mb-1">Computer Vision Detection</div>
              <div className="text-sm text-gray-300">
                ✓ Safety equipment detected<br/>
                ✓ Fire extinguisher: Valid until 2025<br/>
                ✓ Emergency exit signs: Visible
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-1" />
            <div className="flex-1">
              <div className="font-semibold mb-1 text-yellow-400">AI Suggestion</div>
              <div className="text-sm text-gray-300">
                Consider capturing close-up photo of certification label for documentation
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="bg-[hsl(160,25%,72%)]/20 border border-[hsl(160,25%,72%)] rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-[hsl(160,25%,72%)]">87%</div>
            <div className="text-xs text-gray-300">Completion</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">43/127</div>
            <div className="text-xs text-gray-300">Checkpoints</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="bg-white/5 rounded-lg p-3 text-xs text-gray-400"
        >
          <div className="flex items-center justify-between mb-1">
            <span>Next checkpoint</span>
            <span className="text-[hsl(160,25%,72%)]">Quality Management System</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "87%" }}
              transition={{ delay: 2.2, duration: 1 }}
              className="bg-[hsl(160,25%,72%)] h-1 rounded-full"
            ></motion.div>
          </div>
        </motion.div>
      </div>
    </div>,

    // Screen 4: Digital Report
    <div key="screen4" className="w-full h-full bg-white p-8 flex flex-col">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Audit Report</h3>
        <p className="text-gray-600">Complete digital report with evidence</p>
      </div>
      
      <div className="flex-1 space-y-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-[hsl(160,25%,72%)]/20 to-[hsl(210,30%,72%)]/20 rounded-lg p-4 border border-[hsl(160,25%,72%)]/30"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-gray-600">Overall Score</div>
              <div className="text-3xl font-bold text-gray-900">94/100</div>
            </div>
            <TrendingUp className="w-8 h-8 text-[hsl(160,25%,72%)]" />
          </div>
          <div className="flex gap-2 text-xs">
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Compliant</span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">2 Recommendations</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-3 gap-3"
        >
          {[
            { label: "Safety", score: 96, color: "text-green-600" },
            { label: "Quality", score: 94, color: "text-green-600" },
            { label: "Environment", score: 92, color: "text-yellow-600" }
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
              <div className={`text-xl font-bold ${item.color}`}>{item.score}</div>
              <div className="text-xs text-gray-600">{item.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
        >
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-gray-600" />
            <div className="text-sm font-semibold text-gray-900">Evidence & Photos</div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5 + i * 0.1 }}
                className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded"
              ></motion.div>
            ))}
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="w-full bg-black text-white rounded-full py-3 text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          Download Full Report PDF
        </motion.button>
      </div>
    </div>
  ];

  return (
    <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
      {/* Browser Chrome */}
      <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-white rounded px-3 py-1 text-xs text-gray-500">
            connectimus.com/platform
          </div>
        </div>
      </div>
      
      {/* Interactive Demo Area */}
      <div className="aspect-video bg-gray-50 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {screens[currentScreen]}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {screens.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentScreen(index);
                setAutoPlay(false);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentScreen
                  ? "bg-black w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveSoftwareDemo;
