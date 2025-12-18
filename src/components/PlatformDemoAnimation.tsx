import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import equipmentImage from "@/assets/cnc-machine-dmg-nlx.jpg";

interface DemoStep {
  id: number;
  title: string;
  label: string;
}

const demoSteps: DemoStep[] = [
  { id: 1, title: "Supplier Search", label: "Search" },
  { id: 2, title: "Order Audit", label: "Order" },
  { id: 3, title: "Audit Execution", label: "Audit" },
  { id: 4, title: "Report Generation", label: "Report" },
  { id: 5, title: "Follow-up Manager", label: "Follow-up" },
];

// Step 1: Supplier Search
const SupplierSearchDemo = () => (
  <div className="h-full flex flex-col text-xs bg-[#0A0A0A] p-4">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-6 rounded-full bg-[#1391BF] flex items-center justify-center text-white text-sm font-bold">1</div>
      <span className="text-white/90 font-medium">Find Supplier</span>
    </div>
    
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#161616] rounded-xl p-4 mb-3"
    >
      <div className="grid grid-cols-3 gap-3 mb-3">
        {[
          { label: "Company", value: "Müller GmbH" },
          { label: "City", value: "Stuttgart" },
          { label: "Country", value: "Germany" },
        ].map((field, i) => (
          <motion.div 
            key={field.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.2 }}
          >
            <label className="text-[#C0C0C0]/60 text-[10px] block mb-1">{field.label}</label>
            <div className="h-8 bg-[#0A0A0A] rounded border border-[#C0C0C0]/20 px-2 flex items-center">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.2 }}
                className="text-white/80"
              >
                {field.value}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.button
        initial={{ scale: 0.95 }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ delay: 1.2, duration: 0.3 }}
        className="w-full py-2 bg-[#1391BF] text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Search Supplier
      </motion.button>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="flex-1 bg-[#161616] rounded-xl p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-5 h-5 border-2 border-[#1391BF] border-t-transparent rounded-full"
        />
        <span className="text-[#1391BF] text-sm font-medium">Generating AI Report...</span>
      </div>
      
      <div className="space-y-2">
        {[
          { label: "Company Profile", progress: 100 },
          { label: "Risk Assessment", progress: 75 },
          { label: "Certifications", progress: 50 },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8 + i * 0.2 }}
            className="flex items-center gap-2"
          >
            <span className="text-[#C0C0C0]/80 text-[10px] w-24">{item.label}</span>
            <div className="flex-1 h-2 bg-[#C0C0C0]/15 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.progress}%` }}
                transition={{ delay: 2 + i * 0.2, duration: 0.6 }}
                className="h-full bg-[#1391BF] rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

// Step 2: Order Audit
const OrderAuditDemo = () => (
  <div className="h-full flex flex-col text-xs bg-[#0A0A0A] p-4">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-6 rounded-full bg-[#7CC2A7] flex items-center justify-center text-white text-sm">✓</div>
      <div className="h-0.5 flex-1 bg-[#7CC2A7]" />
      <div className="w-6 h-6 rounded-full bg-[#1391BF] flex items-center justify-center text-white text-sm font-bold">2</div>
      <span className="text-white/90 font-medium">Order Audit</span>
    </div>
    
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#161616] rounded-xl p-4 mb-3"
    >
      <div className="flex items-center gap-3 mb-3 p-3 bg-[#0A0A0A] rounded-lg border border-[#1391BF]/30">
        <div className="w-3 h-3 rounded-sm bg-[#1391BF] flex items-center justify-center">
          <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-white/90 font-medium">Müller GmbH</div>
          <div className="text-[#C0C0C0]/60 text-[10px]">Stuttgart, Germany • ISO 9001</div>
        </div>
        <div className="px-2 py-0.5 bg-[#7CC2A7]/20 text-[#7CC2A7] rounded text-[10px]">Low Risk</div>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-[#161616] rounded-xl p-4 mb-3"
    >
      <div className="text-[#C0C0C0]/80 text-[10px] mb-2">Audit Configuration</div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Standard", value: "ISO 9001:2015" },
          { label: "Duration", value: "2 Days" },
          { label: "Date", value: "Dec 28, 2025" },
          { label: "Price", value: "€1,400" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            className="bg-[#0A0A0A] p-2 rounded-lg"
          >
            <div className="text-[#C0C0C0]/50 text-[9px]">{item.label}</div>
            <div className="text-white/90 font-medium">{item.value}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>

    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="mt-auto py-3 bg-[#1391BF] text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      Confirm & Order Audit
    </motion.button>
  </div>
);

// Step 3: Audit Execution
const AuditExecutionDemo = () => (
  <div className="h-full flex text-xs bg-[#0A0A0A]">
    <div className="flex-1 relative">
      <img 
        src={equipmentImage} 
        alt="Equipment" 
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute inset-4"
      >
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="absolute top-4 left-4 right-4 h-24 border-2 border-[#7CC2A7] rounded-lg"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -top-2 left-2 px-2 py-0.5 bg-[#7CC2A7] text-white text-[10px] font-medium rounded"
          >
            CNC Lathe DMG MORI NLX 2500
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3"
        >
          <div className="text-[#7CC2A7] text-[10px] font-medium mb-1">AI Detection</div>
          <div className="text-white/80 text-[10px]">Model: NLX 2500/700</div>
          <div className="text-white/60 text-[9px]">Condition: Good • 94% confidence</div>
        </motion.div>
      </motion.div>
    </div>
    
    <div className="w-32 bg-[#161616] p-3 flex flex-col">
      <div className="text-[#C0C0C0]/60 text-[9px] uppercase tracking-wide mb-2">Progress</div>
      {[
        { name: "Opening", status: "complete" },
        { name: "Documents", status: "complete" },
        { name: "Process A", status: "complete" },
        { name: "Process B", status: "active" },
        { name: "Interviews", status: "pending" },
      ].map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.1 }}
          className="flex items-center gap-2 py-1.5"
        >
          <div className={`w-2.5 h-2.5 rounded-full ${
            item.status === 'complete' ? 'bg-[#7CC2A7]' : 
            item.status === 'active' ? 'bg-[#1391BF]' : 'bg-[#C0C0C0]/20'
          }`} />
          <span className={`text-[9px] ${
            item.status === 'active' ? 'text-[#1391BF] font-medium' : 
            item.status === 'complete' ? 'text-white/70' : 'text-[#C0C0C0]/40'
          }`}>{item.name}</span>
        </motion.div>
      ))}
      
      <div className="mt-auto space-y-2">
        <div className="bg-[#D8A860]/15 rounded p-2">
          <div className="text-[#D8A860] text-[9px] font-medium">1 Minor</div>
        </div>
        <div className="bg-[#1391BF]/15 rounded p-2">
          <div className="text-[#1391BF] text-[9px] font-medium">1 OFI</div>
        </div>
      </div>
    </div>
  </div>
);

// Step 4: Report Generation
const ReportDemo = () => (
  <div className="h-full flex flex-col text-xs bg-[#0A0A0A] p-4">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-6 rounded-full bg-[#7CC2A7] flex items-center justify-center text-white text-sm">✓</div>
      <div className="h-0.5 flex-1 bg-[#7CC2A7]" />
      <div className="w-6 h-6 rounded-full bg-[#1391BF] flex items-center justify-center text-white text-sm font-bold">4</div>
      <span className="text-white/90 font-medium">Report</span>
    </div>
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 bg-[#161616] rounded-xl p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-white font-medium">Audit Report</div>
          <div className="text-[#C0C0C0]/60 text-[10px]">Müller GmbH • ISO 9001:2015</div>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="px-3 py-1 bg-[#7CC2A7] text-white rounded-full text-[10px] font-medium"
        >
          Passed
        </motion.div>
      </div>
      
      <div className="space-y-3">
        {[
          { section: "Executive Summary", pages: "2 pages" },
          { section: "Audit Findings", pages: "8 pages" },
          { section: "Evidence Gallery", pages: "47 photos" },
          { section: "Corrective Actions", pages: "3 items" },
        ].map((item, i) => (
          <motion.div
            key={item.section}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.15 }}
            className="flex items-center gap-3 p-3 bg-[#0A0A0A] rounded-lg"
          >
            <svg className="w-5 h-5 text-[#1391BF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div className="flex-1">
              <div className="text-white/90">{item.section}</div>
              <div className="text-[#C0C0C0]/50 text-[9px]">{item.pages}</div>
            </div>
            <svg className="w-4 h-4 text-[#C0C0C0]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        ))}
      </div>
      
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-4 w-full py-2.5 bg-[#1391BF] text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download PDF Report
      </motion.button>
    </motion.div>
  </div>
);

// Step 5: Follow-up Manager
const FollowUpDemo = () => (
  <div className="h-full flex flex-col text-xs bg-[#0A0A0A] p-4">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-6 rounded-full bg-[#7CC2A7] flex items-center justify-center text-white text-sm">✓</div>
      <div className="h-0.5 flex-1 bg-[#7CC2A7]" />
      <div className="w-6 h-6 rounded-full bg-[#1391BF] flex items-center justify-center text-white text-sm font-bold">5</div>
      <span className="text-white/90 font-medium">Follow-up</span>
    </div>
    
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 bg-[#161616] rounded-xl p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-white font-medium">Action Items</div>
        <div className="flex items-center gap-2">
          <div className="px-2 py-0.5 bg-[#D8A860]/20 text-[#D8A860] rounded text-[9px]">1 Open</div>
          <div className="px-2 py-0.5 bg-[#7CC2A7]/20 text-[#7CC2A7] rounded text-[9px]">2 Closed</div>
        </div>
      </div>
      
      <div className="space-y-2">
        {[
          { title: "Update calibration records", status: "open", due: "Jan 15", assignee: "MS" },
          { title: "Document control procedure", status: "closed", due: "Dec 20", assignee: "JD" },
          { title: "Training matrix update", status: "closed", due: "Dec 18", assignee: "AK" },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className={`p-3 rounded-lg ${
              item.status === 'open' ? 'bg-[#D8A860]/10 border border-[#D8A860]/30' : 'bg-[#0A0A0A]'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded flex items-center justify-center ${
                item.status === 'closed' ? 'bg-[#7CC2A7]' : 'border border-[#D8A860]'
              }`}>
                {item.status === 'closed' && (
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <div className={`${item.status === 'closed' ? 'text-white/50 line-through' : 'text-white/90'}`}>
                  {item.title}
                </div>
                <div className="text-[#C0C0C0]/50 text-[9px] flex items-center gap-2">
                  <span>Due: {item.due}</span>
                  <span>•</span>
                  <span>{item.assignee}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 p-3 bg-[#1391BF]/10 border border-[#1391BF]/30 rounded-lg"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#1391BF] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <div className="text-white/90 font-medium">Re-audit Scheduled</div>
            <div className="text-[#1391BF] text-[10px]">March 15, 2026 • Follow-up verification</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </div>
);

const PlatformDemoAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % demoSteps.length);
    }, 4000); // Change step every 4 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  const renderDemo = () => {
    switch (currentStep) {
      case 0: return <SupplierSearchDemo />;
      case 1: return <OrderAuditDemo />;
      case 2: return <AuditExecutionDemo />;
      case 3: return <ReportDemo />;
      case 4: return <FollowUpDemo />;
      default: return <SupplierSearchDemo />;
    }
  };
  
  return (
    <div className="w-full">
      {/* Step Indicators */}
      <div className="flex items-center justify-center gap-1 mb-4">
        {demoSteps.map((step, i) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              i === currentStep 
                ? 'bg-[#1391BF] text-white' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {step.label}
          </button>
        ))}
      </div>
      
      {/* Demo Window */}
      <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
        {/* Browser Chrome */}
        <div className="bg-gray-50 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-white rounded px-3 py-1 text-xs text-gray-500 border border-gray-200">
              yvoo.com/platform/{demoSteps[currentStep].title.toLowerCase().replace(' ', '-')}
            </div>
          </div>
        </div>
        
        {/* Demo Content */}
        <div className="aspect-video bg-[#0A0A0A] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {renderDemo()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Current Step Title */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          Step {currentStep + 1} of {demoSteps.length}: <span className="font-medium text-gray-700">{demoSteps[currentStep].title}</span>
        </p>
      </div>
    </div>
  );
};

export default PlatformDemoAnimation;
