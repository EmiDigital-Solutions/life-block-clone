import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import equipmentImage from "@/assets/cnc-machine-dmg-nlx.jpg";
import factoryImage from "@/assets/factory-hero-background.jpg";
import worldMap from "@/assets/dotted-world-map.png";
// Custom AI-generated VDA 6.3 audit evidence images
import evidenceCNC from "@/assets/evidence-cnc-machine.jpg";
import evidenceCMM from "@/assets/evidence-cmm-measurement.jpg";
import evidenceControlPlan from "@/assets/evidence-control-plan.jpg";
import evidenceAssembly from "@/assets/evidence-assembly-station.jpg";
import evidenceCertification from "@/assets/evidence-certification.jpg";
import evidenceInspector from "@/assets/evidence-inspector.jpg";
// Auditor images for dispatch step
import auditorGen7 from "@/assets/auditor-gen-7.jpg";
import auditorGen2 from "@/assets/auditor-gen-2.jpg";
import auditorGen3 from "@/assets/auditor-gen-3.jpg";
import auditorGen4 from "@/assets/auditor-gen-4.jpg";
import auditorGen5 from "@/assets/auditor-gen-5.jpg";
import auditorGen6 from "@/assets/auditor-gen-6.jpg";

interface DemoStep {
  id: number;
  title: string;
  label: string;
}

const demoSteps: DemoStep[] = [
  { id: 1, title: "Supplier Discovery", label: "Search" },
  { id: 2, title: "Order Audit", label: "Order" },
  { id: 3, title: "Auditor Dispatch", label: "Dispatch" },
  { id: 4, title: "Audit Execution", label: "Audit" },
  { id: 5, title: "Report Generation", label: "Report" },
  { id: 6, title: "Follow-up Manager", label: "Follow-up" },
];

// Clean Window Chrome Component
const WindowChrome = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="w-full h-full bg-[#0A0A0A] rounded-xl overflow-hidden flex flex-col">
    <div className="h-8 bg-[#161616] flex items-center px-4 border-b border-[#C0C0C0]/10 flex-shrink-0">
      <span className="text-xs text-[#C0C0C0]/80 font-medium">{title}</span>
    </div>
    <div className="flex-1 overflow-hidden">
      {children}
    </div>
  </div>
);

// Step 1: Professional AI Supplier Discovery - Enterprise Dashboard Style
const SupplierSearchDemo = () => {
  const [phase, setPhase] = useState<'chat' | 'searching' | 'results' | 'profile'>('chat');
  const [selectedSupplier, setSelectedSupplier] = useState(0);
  
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    setPhase('searching');
    timers.push(setTimeout(() => setPhase('results'), 1500));
    timers.push(setTimeout(() => setPhase('profile'), 6000));
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const suppliers = [
    { name: "DMG MORI AG", location: "Bielefeld, Germany", certs: ["ISO 9001", "IATF 16949"], employees: "12,000+", match: 98, revenue: "€2.5B", established: "1870" },
    { name: "Precision CNC Solutions", location: "Stuttgart, Germany", certs: ["ISO 9001", "ISO 14001"], employees: "850", match: 94, revenue: "€85M", established: "1998" },
    { name: "TechMold Industries", location: "Shanghai, China", certs: ["IATF 16949", "VDA 6.3"], employees: "2,400", match: 91, revenue: "€120M", established: "2005" },
    { name: "AutoPrecision GmbH", location: "Munich, Germany", certs: ["VDA 6.3", "IATF 16949"], employees: "1,200", match: 89, revenue: "€95M", established: "1992" },
  ];

  const searchCriteria = [
    { label: "Industry", value: "Automotive" },
    { label: "Process", value: "CNC Machining" },
    { label: "Certification", value: "IATF 16949" },
    { label: "Region", value: "Germany, China" },
    { label: "Capacity", value: "50K+ parts/year" },
  ];

  return (
    <WindowChrome title="ScanPro+ — Supplier Discovery">
      <div className="h-full flex flex-col bg-[#fafafa]">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#1391BF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-900">AI-Powered Search</span>
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <span className="text-sm text-gray-500">Analyzing 25M+ suppliers globally</span>
          </div>
          {phase !== 'searching' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-sm text-emerald-600 font-medium">{suppliers.length} matches found</span>
            </motion.div>
          )}
        </div>

        {/* Search Criteria Pills */}
        <div className="px-6 py-3 bg-white border-b border-gray-100">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400">Filters:</span>
            {searchCriteria.map((criteria, i) => (
              <motion.span 
                key={criteria.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
              >
                {criteria.label}: <span className="text-gray-900">{criteria.value}</span>
              </motion.span>
            ))}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {phase === 'searching' && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 rounded-full border-3 border-[#1391BF] border-t-transparent mx-auto mb-4"
                  style={{ borderWidth: 3 }}
                />
                <div className="text-gray-900 font-medium">Searching suppliers...</div>
                <div className="text-gray-500 text-sm mt-1">Analyzing 47 databases</div>
              </div>
            </div>
          )}

          {(phase === 'results' || phase === 'profile') && (
            <>
              {/* Supplier List */}
              <div className="w-2/5 bg-white border-r border-gray-100 flex flex-col">
                <div className="p-4 border-b border-gray-100">
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Search Results</div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {suppliers.map((supplier, i) => (
                    <motion.div
                      key={supplier.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className={`p-4 border-b border-gray-100 cursor-pointer transition-all ${
                        selectedSupplier === i 
                          ? 'bg-[#1391BF]/5 border-l-2 border-l-[#1391BF]' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedSupplier(i)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{supplier.location}</div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className={`text-sm font-bold ${supplier.match >= 95 ? 'text-emerald-600' : 'text-[#1391BF]'}`}>
                            {supplier.match}%
                          </div>
                          <span className="text-xs text-gray-400">match</span>
                        </div>
                      </div>
                      <div className="flex gap-1.5 flex-wrap">
                        {supplier.certs.map((cert) => (
                          <span key={cert} className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] rounded font-medium">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Supplier Detail */}
              <div className="flex-1 p-6 overflow-y-auto">
                <motion.div 
                  key={selectedSupplier}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-5"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{suppliers[selectedSupplier].name}</h2>
                      <p className="text-sm text-gray-500 mt-0.5">{suppliers[selectedSupplier].location}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${suppliers[selectedSupplier].match >= 95 ? 'text-emerald-600' : 'text-[#1391BF]'}`}>
                        {suppliers[selectedSupplier].match}%
                      </div>
                      <div className="text-xs text-gray-400">Match Score</div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Employees', value: suppliers[selectedSupplier].employees },
                      { label: 'Revenue', value: suppliers[selectedSupplier].revenue },
                      { label: 'Established', value: suppliers[selectedSupplier].established },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-gray-50 rounded-xl p-3 text-center">
                        <div className="text-gray-900 font-semibold">{stat.value}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Certifications */}
                  <div>
                    <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Certifications</div>
                    <div className="flex gap-2 flex-wrap">
                      {suppliers[selectedSupplier].certs.map((cert) => (
                        <span key={cert} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs rounded-lg font-medium border border-emerald-200">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="w-full py-3 bg-[#1391BF] text-white rounded-xl text-sm font-medium hover:bg-[#0e7ba3] transition-colors"
                  >
                    Add to Audit Order
                  </motion.button>
                </motion.div>
              </div>
            </>
          )}
        </div>
      </div>
    </WindowChrome>
  );
};

// Step 2: Order Audit - Enterprise Dashboard Style
const OrderAuditDemo = () => {
  const [orderPhase, setOrderPhase] = useState<'configuring' | 'confirmed'>('configuring');
  
  useEffect(() => {
    const timer = setTimeout(() => setOrderPhase('confirmed'), 6000);
    return () => clearTimeout(timer);
  }, []);

  const suppliers = [
    { name: "DMG MORI AG", location: "Bielefeld, Germany", standard: "IATF 16949", price: "€700", days: 2 },
    { name: "TechMold Industries", location: "Shanghai, China", standard: "VDA 6.3", price: "€700", days: 2 },
    { name: "Precision CNC Solutions", location: "Stuttgart, Germany", standard: "ISO 9001", price: "€700", days: 2 },
  ];

  return (
    <WindowChrome title="ScanPro+ — Order Configuration">
      <div className="h-full flex flex-col bg-[#fafafa]">
        {/* Top Navigation */}
        <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-900">Audit Order</span>
            <div className="h-4 w-px bg-gray-200" />
            <span className="px-2 py-1 bg-[#1391BF]/10 text-[#1391BF] text-xs font-medium rounded border border-[#1391BF]/20">
              {suppliers.length} Suppliers Selected
            </span>
          </div>
          <div className="text-sm text-gray-500">Order #ORD-2025-0847</div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Supplier List */}
          <div className="w-1/2 bg-white border-r border-gray-100 flex flex-col">
            <div className="p-4 border-b border-gray-100">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Selected Suppliers</div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {suppliers.map((supplier, i) => (
                <motion.div
                  key={supplier.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 border-b border-gray-100"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded bg-[#1391BF] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                        <div className="text-xs text-gray-500">{supplier.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">{supplier.price}</div>
                      <div className="text-xs text-gray-400">{supplier.days} days</div>
                    </div>
                  </div>
                  <div className="ml-8">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] rounded font-medium">
                      {supplier.standard}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Documents */}
            <div className="p-4 border-t border-gray-100">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Documents</div>
              <div className="space-y-2">
                {[
                  { name: "IATF_Checklist_v2.pdf", type: "PDF" },
                  { name: "Custom_Requirements.xlsx", type: "XLS" },
                ].map((doc, i) => (
                  <motion.div 
                    key={doc.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                  >
                    <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold ${
                      doc.type === 'PDF' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {doc.type}
                    </div>
                    <span className="text-xs text-gray-600 flex-1 truncate">{doc.name}</span>
                    <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right: Configuration */}
          <div className="w-1/2 p-5 flex flex-col">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Configuration</div>
            
            {/* Date & Duration */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="text-xs text-gray-400 mb-1">Start Date</div>
                <div className="text-gray-900 font-medium">Feb 15, 2025</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="text-xs text-gray-400 mb-1">Duration</div>
                <div className="text-gray-900 font-medium">2 Days / Audit</div>
              </div>
            </div>
            
            {/* Auditors */}
            <div className="mb-5">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Assigned Auditors</div>
              <div className="space-y-2">
                {[
                  { name: "Dr. Klaus Schmidt", role: "Lead Auditor · IATF", region: "Germany", image: auditorGen7 },
                  { name: "Wei Liu", role: "VDA 6.3 Specialist", region: "China", image: auditorGen2 },
                ].map((auditor, i) => (
                  <motion.div 
                    key={auditor.name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200"
                  >
                    <img src={auditor.image} alt={auditor.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{auditor.name}</div>
                      <div className="text-xs text-gray-500">{auditor.role}</div>
                    </div>
                    <span className="text-xs text-gray-400">{auditor.region}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Price Summary */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 mb-5">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Price Summary</div>
              <div className="space-y-2">
                {suppliers.map((s) => (
                  <div key={s.name} className="flex justify-between text-sm">
                    <span className="text-gray-600">{s.name}</span>
                    <span className="text-gray-900">{s.price}</span>
                  </div>
                ))}
                <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between">
                  <span className="text-gray-900 font-medium">Total</span>
                  <span className="text-[#1391BF] font-bold text-lg">€2,100</span>
                </div>
              </div>
            </div>
            
            {/* Action Button */}
            <motion.button
              className={`w-full py-3 rounded-xl text-sm font-medium transition-all ${
                orderPhase === 'confirmed'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#1391BF] text-white hover:bg-[#0e7ba3]'
              }`}
              animate={orderPhase === 'configuring' ? { scale: [1, 1.01, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {orderPhase === 'confirmed' ? '✓ Order Confirmed' : 'Confirm & Order Audits'}
            </motion.button>
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};

// Step 3: Auditor Dispatch - Professional Dashboard Style
const AuditorDispatchDemo = () => {
  const [selectedAuditor, setSelectedAuditor] = useState(1);
  const [dispatchPhase, setDispatchPhase] = useState<'matching' | 'reviewing' | 'confirmed'>('matching');
  const [matchProgress, setMatchProgress] = useState(0);
  
  useEffect(() => {
    // Progress animation for matching phase
    if (dispatchPhase === 'matching') {
      const interval = setInterval(() => {
        setMatchProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [dispatchPhase]);

  useEffect(() => {
    const timer1 = setTimeout(() => setDispatchPhase('reviewing'), 3500);
    const timer2 = setTimeout(() => setDispatchPhase('confirmed'), 7000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);
  
  const auditors = [
    { name: "Wei Liu", role: "Lead Auditor", location: "Shanghai, CN", specialty: "VDA 6.3", available: "Dec 21", rating: 4.8, audits: 623, matchScore: 98, image: auditorGen2 },
    { name: "Dr. Klaus Schmidt", role: "Senior Auditor", location: "Munich, DE", specialty: "IATF 16949", available: "Dec 22", rating: 4.9, audits: 847, matchScore: 94, image: auditorGen7 },
    { name: "Sarah Chen", role: "Auditor", location: "Singapore, SG", specialty: "ISO 45001", available: "Dec 23", rating: 4.8, audits: 456, matchScore: 89, image: auditorGen6 },
  ];
  
  const auditDetails = {
    supplier: "TechMold Industries Ltd.",
    location: "Shanghai, China",
    standard: "VDA 6.3",
    type: "Process Audit",
    priority: "High",
    requestDate: "Dec 20, 2024"
  };
  
  return (
    <WindowChrome title="ScanPro+ — Auditor Assignment">
      <div className="h-full flex flex-col bg-[#fafafa]">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-gray-900">Audit Request #AR-2024-1847</span>
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <span className="text-sm text-gray-500">{auditDetails.supplier}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded border border-amber-200">
              {auditDetails.priority} Priority
            </span>
          </div>
        </div>
        
        {/* Progress Steps */}
        <div className="px-6 py-4 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between max-w-xl">
            {['Matching', 'Review', 'Confirm'].map((step, i) => {
              const isActive = i === (dispatchPhase === 'matching' ? 0 : dispatchPhase === 'reviewing' ? 1 : 2);
              const isComplete = i < (dispatchPhase === 'matching' ? 0 : dispatchPhase === 'reviewing' ? 1 : 2);
              return (
                <div key={step} className="flex items-center gap-3">
                  <motion.div 
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                      isComplete ? 'bg-emerald-500 text-white' :
                      isActive ? 'bg-[#1391BF] text-white' : 
                      'bg-gray-100 text-gray-400'
                    }`}
                    animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {isComplete ? '✓' : i + 1}
                  </motion.div>
                  <span className={`text-sm ${isActive || isComplete ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>{step}</span>
                  {i < 2 && <div className={`w-16 h-px ${isComplete ? 'bg-emerald-500' : 'bg-gray-200'} ml-3`} />}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Audit Info */}
          <div className="w-72 bg-white border-r border-gray-100 p-5 flex flex-col">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Audit Details</div>
            
            <div className="space-y-4">
              {[
                { label: 'Supplier', value: auditDetails.supplier },
                { label: 'Location', value: auditDetails.location },
                { label: 'Standard', value: auditDetails.standard },
                { label: 'Type', value: auditDetails.type },
                { label: 'Requested', value: auditDetails.requestDate },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                  <div className="text-sm text-gray-900 font-medium">{item.value}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-auto pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-400 mb-2">AI Match Confidence</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#1391BF] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${matchProgress}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-[#1391BF]">{matchProgress}%</span>
              </div>
            </div>
          </div>
          
          {/* Right Panel - Auditor Selection */}
          <div className="flex-1 p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Recommended Auditors</div>
              <span className="text-xs text-gray-400">{auditors.length} matches found</span>
            </div>
            
            {/* Auditor Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="col-span-4">Auditor</div>
                <div className="col-span-2">Specialty</div>
                <div className="col-span-2">Available</div>
                <div className="col-span-2">Match</div>
                <div className="col-span-2"></div>
              </div>
              
              {/* Table Rows */}
              {auditors.map((auditor, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className={`grid grid-cols-12 gap-4 px-4 py-4 items-center border-b border-gray-100 last:border-0 cursor-pointer transition-all ${
                    selectedAuditor === i 
                      ? 'bg-[#1391BF]/5' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedAuditor(i)}
                >
                  {/* Auditor Info */}
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="relative">
                      <img 
                        src={auditor.image} 
                        alt={auditor.name} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {selectedAuditor === i && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#1391BF] rounded-full flex items-center justify-center"
                        >
                          <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        </motion.div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{auditor.name}</div>
                      <div className="text-xs text-gray-400">{auditor.role} · {auditor.location}</div>
                    </div>
                  </div>
                  
                  {/* Specialty */}
                  <div className="col-span-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">{auditor.specialty}</span>
                  </div>
                  
                  {/* Available */}
                  <div className="col-span-2 text-sm text-gray-600">{auditor.available}</div>
                  
                  {/* Match Score */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${auditor.matchScore >= 95 ? 'bg-emerald-500' : 'bg-[#1391BF]'}`} 
                          style={{ width: `${auditor.matchScore}%` }}
                        />
                      </div>
                      <span className={`text-xs font-semibold ${auditor.matchScore >= 95 ? 'text-emerald-600' : 'text-[#1391BF]'}`}>
                        {auditor.matchScore}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="col-span-2 flex items-center gap-1 text-xs text-gray-500">
                    <span className="text-amber-400">★</span>
                    <span>{auditor.rating}</span>
                    <span className="text-gray-300">·</span>
                    <span>{auditor.audits} audits</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Action Bar */}
        <div className="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {dispatchPhase === 'confirmed' ? (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-emerald-600"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium">Assignment confirmed — Wei Liu notified</span>
              </motion.div>
            ) : (
              <div className="text-sm text-gray-500">
                Selected: <span className="font-medium text-gray-900">{auditors[selectedAuditor].name}</span>
              </div>
            )}
          </div>
          
          <motion.button
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              dispatchPhase === 'confirmed'
                ? 'bg-emerald-500 text-white'
                : 'bg-[#1391BF] text-white hover:bg-[#0e7ba3]'
            }`}
            animate={dispatchPhase === 'reviewing' ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {dispatchPhase === 'matching' ? 'Finding Best Match...' :
             dispatchPhase === 'reviewing' ? 'Confirm Assignment' :
             '✓ Confirmed'}
          </motion.button>
        </div>
      </div>
    </WindowChrome>
  );
};

// Step 4: Audit Execution - Enterprise Dashboard Style
const AuditExecutionDemo = () => {
  const checklistItems = [
    { code: "P6.1.1", item: "Process inputs defined", status: 'done', score: 9 },
    { code: "P6.1.2", item: "Process sequence planned", status: 'done', score: 8 },
    { code: "P6.2.1", item: "Personnel qualified", status: 'done', score: 9 },
    { code: "P6.2.2", item: "Responsibility defined", status: 'current', score: null },
    { code: "P6.3.1", item: "Equipment suitable", status: 'pending', score: null },
    { code: "P6.3.2", item: "Measuring equipment", status: 'pending', score: null },
  ];

  return (
    <WindowChrome title="ScanPro+ — Live Audit">
      <div className="h-full flex flex-col bg-[#fafafa]">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-emerald-600">Live Audit</span>
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <span className="text-sm text-gray-900 font-medium">TechMold Industries</span>
            <span className="text-sm text-gray-500">Shanghai, China</span>
          </div>
          <span className="px-2.5 py-1 bg-[#1391BF]/10 text-[#1391BF] text-xs font-medium rounded border border-[#1391BF]/20">
            VDA 6.3
          </span>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Live Feed */}
          <div className="w-3/5 flex flex-col bg-gray-900">
            <div className="flex-1 relative">
              <img src={equipmentImage} alt="Equipment" className="w-full h-full object-cover" />
              
              {/* Detection Overlays */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="absolute inset-0 pointer-events-none"
              >
                <motion.div 
                  initial={{ scale: 1.1, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  transition={{ delay: 0.8 }}
                  className="absolute top-[10%] left-[5%] right-[45%] bottom-[35%] border-2 border-emerald-400 rounded-lg bg-emerald-400/5"
                >
                  <div className="absolute -top-7 left-0 px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded-md flex items-center gap-1.5">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    CNC Lathe NLX 2500
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ scale: 1.1, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  transition={{ delay: 1.0 }}
                  className="absolute top-[15%] right-[5%] w-28 h-20 border-2 border-[#1391BF] rounded-lg bg-[#1391BF]/5"
                >
                  <div className="absolute -bottom-7 right-0 px-2 py-1 bg-[#1391BF] text-white text-xs font-medium rounded-md">
                    Control Panel
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Stats Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">3/6</div>
                        <div className="text-[10px] text-gray-400">Completed</div>
                      </div>
                      <div className="h-8 w-px bg-gray-200" />
                      <div className="text-center">
                        <div className="text-lg font-bold text-emerald-600">26</div>
                        <div className="text-[10px] text-gray-400">Avg Score</div>
                      </div>
                      <div className="h-8 w-px bg-gray-200" />
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">47</div>
                        <div className="text-[10px] text-gray-400">Evidence</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={auditorGen2} alt="Auditor" className="w-8 h-8 rounded-full object-cover border-2 border-white" />
                      <div>
                        <div className="text-xs font-medium text-gray-900">Wei Liu</div>
                        <div className="text-[10px] text-gray-400">Lead Auditor</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Checklist */}
          <div className="w-2/5 bg-white flex flex-col">
            <div className="p-4 border-b border-gray-100">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">VDA 6.3 Checklist</div>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-2">
                {checklistItems.map((check, i) => (
                  <motion.div 
                    key={check.code}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-3 rounded-xl border transition-all ${
                      check.status === 'current' 
                        ? 'bg-[#1391BF]/5 border-[#1391BF]/30' 
                        : check.status === 'done'
                        ? 'bg-gray-50 border-gray-100'
                        : 'bg-white border-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {check.status === 'done' ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        </div>
                      ) : check.status === 'current' ? (
                        <div className="w-6 h-6 rounded-full bg-[#1391BF] flex items-center justify-center flex-shrink-0">
                          <motion.div 
                            animate={{ rotate: 360 }} 
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-3 h-3 border-2 border-white border-t-transparent rounded-full"
                          />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-gray-400">{check.code}</span>
                          <span className={`text-sm ${check.status === 'done' ? 'text-gray-500' : 'text-gray-900'}`}>
                            {check.item}
                          </span>
                        </div>
                      </div>
                      {check.score && (
                        <span className="text-sm font-bold text-emerald-600">{check.score}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* AI Assistant */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1391BF] flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-medium text-[#1391BF] mb-1">AI Assistant</div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-xs text-gray-600 leading-relaxed"
                  >
                    Equipment detected: DMG MORI NLX 2500. Check calibration certificate for this machine.
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};

// Step 5: Professional Audit Report Generation
const ReportDemo = () => {
  const [viewMode, setViewMode] = useState<'overview' | 'analytics'>('overview');
  
  // Auto-switch between Overview and Analytics every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setViewMode(prev => prev === 'overview' ? 'analytics' : 'overview');
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  const processElements = [
    { code: 'P2', name: 'Project Management', score: 88, weight: 12 },
    { code: 'P3', name: 'Product & Process Development Planning', score: 82, weight: 15 },
    { code: 'P4', name: 'Product & Process Development Realization', score: 85, weight: 18 },
    { code: 'P5', name: 'Supplier Management', score: 79, weight: 12 },
    { code: 'P6', name: 'Process Analysis / Production', score: 84, weight: 28 },
    { code: 'P7', name: 'Customer Care / Satisfaction', score: 91, weight: 15 },
  ];
  
  const nonConformances = [
    { id: 'NC-001', element: 'P6.3.2', finding: 'Calibration records for CMM Zeiss Contura incomplete - missing 3 measuring devices', severity: 'major', category: 'Process Control', rootCause: 'Documentation gap' },
    { id: 'NC-002', element: 'P6.2.1', finding: 'Operator qualification matrix not updated for 2 new CNC operators since Q3 2024', severity: 'minor', category: 'Personnel', rootCause: 'Training backlog' },
    { id: 'NC-003', element: 'P4.6', finding: 'Process FMEA (PFMEA-TM-2023-001) not revised after design change ECN-2024-047', severity: 'major', category: 'Risk Management', rootCause: 'Change management' },
    { id: 'OFI-001', element: 'P6.4.3', finding: 'SPC charts for critical dimension CTQ-012 show Cpk trending toward 1.33 limit', severity: 'observation', category: 'Quality Control', rootCause: 'Tool wear monitoring' },
  ];
  
  // Historical score data for trend chart - realistic non-linear trend with client names
  const historicalScores = [
    { year: '2021', score: 78, client: 'BMW' },
    { year: '2022', score: 82, client: 'Mercedes' },
    { year: '2023', score: 79, client: 'Audi' },
    { year: '2024', score: 85, client: 'Porsche' },
    { year: '2025', score: 88, client: 'YVOO' },
  ];
  
  // Benchmark data
  const benchmarkData = [
    { category: 'Industry Avg', score: 76 },
    { category: 'Top 10%', score: 92 },
    { category: 'This Supplier', score: 84.2 },
  ];
  
  // Custom AI-generated VDA 6.3 audit evidence images
  const evidenceImages = [evidenceCNC, evidenceCMM, evidenceControlPlan, evidenceAssembly, evidenceCertification, evidenceInspector];
  
  const evidenceItems = [
    { id: 1, type: 'Equipment', label: 'DMG MORI NLX 2500', ref: 'IMG-001', verified: true },
    { id: 2, type: 'Measurement', label: 'CMM Inspection', ref: 'IMG-012', verified: true },
    { id: 3, type: 'Document', label: 'IATF Control Plan', ref: 'DOC-023', verified: true },
    { id: 4, type: 'Process', label: 'Assembly Station', ref: 'IMG-034', verified: true },
    { id: 5, type: 'Certificate', label: 'ISO 9001 / IATF', ref: 'CRT-001', verified: true },
    { id: 6, type: 'Personnel', label: 'QC Inspector', ref: 'IMG-045', verified: true },
  ];

  const overallScore = 84.2;
  const certificationStatus = overallScore >= 90 ? 'A' : overallScore >= 80 ? 'B' : overallScore >= 60 ? 'C' : 'D';
  
  return (
    <WindowChrome title="ScanPro+ — VDA 6.3 Process Audit Report">
      <div className="h-full flex bg-[#0A0A0A]">
        {/* Main Report Content */}
        <div className="w-[65%] flex flex-col border-r border-[#C0C0C0]/10 overflow-hidden">
          {/* Report Header - Professional */}
          <div className="p-4 border-b border-[#C0C0C0]/10 bg-gradient-to-r from-[#0A0A0A] to-[#161616]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1391BF]/20 to-[#1391BF]/5 border border-[#1391BF]/30 flex items-center justify-center">
                  <span className="text-[#1391BF] font-bold text-sm">TM</span>
                </div>
                <div>
                  <div className="text-white font-semibold">TechMold Industries Co., Ltd.</div>
                  <div className="text-[#C0C0C0]/60 text-xs">Shanghai, China • DUNS: 54-128-9047</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-1.5 py-0.5 bg-[#1391BF]/15 text-[#1391BF] rounded text-[10px] font-medium">VDA 6.3:2023</span>
                    <span className="px-1.5 py-0.5 bg-[#7CC2A7]/15 text-[#7CC2A7] rounded text-[10px] font-medium">Process Audit</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-1">
                  <span className={`text-3xl font-bold ${certificationStatus === 'A' ? 'text-[#7CC2A7]' : certificationStatus === 'B' ? 'text-[#1391BF]' : 'text-[#D8A860]'}`}>
                    {overallScore.toFixed(1)}%
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                    certificationStatus === 'A' ? 'bg-[#7CC2A7]/20 text-[#7CC2A7]' : 
                    certificationStatus === 'B' ? 'bg-[#1391BF]/20 text-[#1391BF]' : 'bg-[#D8A860]/20 text-[#D8A860]'
                  }`}>
                    {certificationStatus}
                  </div>
                </div>
                <div className="text-[#C0C0C0]/50 text-[10px]">Grade {certificationStatus} Supplier</div>
                <div className="text-[#C0C0C0]/40 text-[10px]">Audit Date: Feb 14-15, 2025</div>
              </div>
            </div>
          </div>
          
          {/* View Mode Toggle */}
          <div className="px-4 py-2 border-b border-[#C0C0C0]/10 flex items-center gap-2">
            <button
              onClick={() => setViewMode('overview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'overview' 
                  ? 'bg-[#1391BF] text-white' 
                  : 'bg-[#161616] text-[#C0C0C0]/60 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Overview
              </span>
            </button>
            <button
              onClick={() => setViewMode('analytics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'analytics' 
                  ? 'bg-[#1391BF] text-white' 
                  : 'bg-[#161616] text-[#C0C0C0]/60 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Analytics
              </span>
            </button>
          </div>
          
          {viewMode === 'overview' ? (
          <>
          {/* Process Elements Grid - VDA 6.3 Standard */}
          <div className="p-4 border-b border-[#C0C0C0]/10">
            <div className="flex items-center justify-between mb-3">
              <div className="text-white/90 font-medium text-sm">Process Element Scores (VDA 6.3)</div>
              <div className="flex gap-3 text-[10px]">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#7CC2A7]" />≥90% (A)</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#1391BF]" />≥80% (B)</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#D8A860]" />≥60% (C)</span>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {processElements.map((el, i) => {
                const color = el.score >= 90 ? '#7CC2A7' : el.score >= 80 ? '#1391BF' : '#D8A860';
                return (
                  <motion.div 
                    key={el.code}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="bg-[#161616] rounded-xl p-3 text-center"
                  >
                    <div className="text-[#C0C0C0]/50 text-[10px] font-medium mb-1">{el.code}</div>
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.08, type: "spring" }}
                      className="text-lg font-bold mb-1"
                      style={{ color }}
                    >
                      {el.score}%
                    </motion.div>
                    <div className="text-[#C0C0C0]/40 text-[9px] leading-tight line-clamp-2">{el.name}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Non-Conformances Table - Professional */}
          <div className="flex-1 p-4 overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="text-white/90 font-medium text-sm">Non-Conformances & Observations</div>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 bg-[#C4564F]/15 text-[#C4564F] rounded text-[10px] font-medium">2 Major</span>
                <span className="px-2 py-0.5 bg-[#D8A860]/15 text-[#D8A860] rounded text-[10px] font-medium">1 Minor</span>
                <span className="px-2 py-0.5 bg-[#1391BF]/15 text-[#1391BF] rounded text-[10px] font-medium">1 OFI</span>
              </div>
            </div>
            
            <div className="space-y-2 overflow-hidden">
              {nonConformances.map((nc, i) => (
                <motion.div 
                  key={nc.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="bg-[#161616] rounded-xl p-3 border-l-2"
                  style={{ borderLeftColor: nc.severity === 'major' ? '#C4564F' : nc.severity === 'minor' ? '#D8A860' : '#1391BF' }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                      nc.severity === 'major' ? 'bg-[#C4564F]/20 text-[#C4564F]' : 
                      nc.severity === 'minor' ? 'bg-[#D8A860]/20 text-[#D8A860]' : 'bg-[#1391BF]/20 text-[#1391BF]'
                    }`}>
                      {nc.severity === 'observation' ? 'OFI' : nc.severity}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#C0C0C0]/50 text-[10px] font-mono">{nc.id}</span>
                        <span className="text-[#1391BF] text-[10px] font-medium">{nc.element}</span>
                        <span className="text-[#C0C0C0]/30 text-[10px]">•</span>
                        <span className="text-[#C0C0C0]/50 text-[10px]">{nc.category}</span>
                      </div>
                      <div className="text-white/80 text-xs leading-relaxed">{nc.finding}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          </>
          ) : (
          /* Analytics View */
          <div className="flex-1 p-4 overflow-hidden">
            {/* Score Trend Chart - Bars + Line */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-white/90 font-medium text-sm">Audit Score History</div>
                <div className="flex gap-3 text-[9px] text-[#C0C0C0]/60">
                  <span className="flex items-center gap-1"><div className="w-3 h-2 rounded bg-[#0A7FA5]" />Score</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-0.5 bg-[#0A7FA5]" />Trend</span>
                </div>
              </div>
              <div className="bg-[#161616] rounded-xl p-4">
                <div className="relative h-36">
                  {/* Bars - all blue, thicker */}
                  <div className="flex items-end justify-around h-28 px-2 relative z-10">
                    {historicalScores.map((item, i) => {
                      const heightPx = ((item.score - 50) / 50) * 112;
                      return (
                        <div 
                          key={item.year}
                          className="flex flex-col items-center h-full justify-end"
                        >
                          <span className="text-[10px] font-bold text-white mb-1">{item.score}%</span>
                          <motion.div 
                            className="w-8 rounded-t-md bg-[#0A7FA5]"
                            initial={{ height: 0 }}
                            animate={{ height: heightPx }}
                            transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Overlay lines removed (per request) */}
                  
                  {/* Year labels with client names */}
                  <div className="flex justify-between mt-2">
                    {historicalScores.map((item) => (
                      <div key={item.year} className="flex-1 text-center">
                        <span className="text-[#C0C0C0]/60 text-[9px]">{item.year}</span>
                        <div className="text-[#C0C0C0]/40 text-[8px] truncate">{item.client}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Process Elements Radar-style Comparison */}
            <div className="mb-4">
              <div className="text-white/90 font-medium text-sm mb-3">Process Element Analysis</div>
              <div className="bg-[#161616] rounded-xl p-4">
                <div className="space-y-2">
                  {processElements.map((el, i) => {
                    const color = el.score >= 90 ? '#7CC2A7' : el.score >= 80 ? '#1391BF' : '#D8A860';
                    return (
                      <motion.div 
                        key={el.code}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        className="flex items-center gap-3"
                      >
                        <span className="text-[#C0C0C0]/50 text-[10px] w-6">{el.code}</span>
                        <div className="flex-1 h-4 bg-[#0A0A0A] rounded-full overflow-hidden relative">
                          <motion.div 
                            className="h-full rounded-full"
                            style={{ backgroundColor: color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${el.score}%` }}
                            transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                          />
                          <div className="absolute inset-0 flex items-center px-2">
                            <span className="text-[8px] text-white/80 font-medium truncate">{el.name}</span>
                          </div>
                        </div>
                        <span className="text-white font-bold text-xs w-10 text-right">{el.score}%</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Benchmark Comparison */}
            <div>
              <div className="text-white/90 font-medium text-sm mb-3">Industry Benchmark</div>
              <div className="bg-[#161616] rounded-xl p-4">
                <div className="flex items-end justify-around h-24">
                  {benchmarkData.map((item, i) => {
                    const isThisSupplier = item.category === 'This Supplier';
                    const color = isThisSupplier ? '#1391BF' : item.category === 'Top 10%' ? '#7CC2A7' : '#C0C0C0';
                    return (
                      <motion.div 
                        key={item.category}
                        className="flex flex-col items-center gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + i * 0.15 }}
                      >
                        <motion.div 
                          className={`w-16 rounded-t-lg ${isThisSupplier ? 'ring-2 ring-[#1391BF]/50' : ''}`}
                          style={{ backgroundColor: color + (isThisSupplier ? '' : '40') }}
                          initial={{ height: 0 }}
                          animate={{ height: `${(item.score / 100) * 80}px` }}
                          transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                        />
                        <span className={`text-xs font-bold ${isThisSupplier ? 'text-[#1391BF]' : 'text-[#C0C0C0]/60'}`}>{item.score}%</span>
                        <span className="text-[#C0C0C0]/50 text-[9px] text-center">{item.category}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
        
        {/* Right Sidebar */}
        <div className="w-[35%] flex flex-col overflow-hidden">
          {/* Evidence Gallery - Unique Items */}
          <div className="p-4 border-b border-[#C0C0C0]/10">
            <div className="flex items-center justify-between mb-3">
              <div className="text-white/90 font-medium text-sm">Evidence Gallery</div>
              <span className="text-[#C0C0C0]/50 text-[10px]">247 items collected</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {evidenceItems.map((item, i) => {
                return (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="aspect-square rounded-xl relative overflow-hidden group"
                  >
                    <img 
                      src={evidenceImages[i]} 
                      alt={item.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-1 left-1 right-1">
                      <div className="text-white text-[8px] font-medium truncate">{item.label}</div>
                      <div className="text-white/60 text-[7px]">{item.ref}</div>
                    </div>
                    {item.verified && (
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#7CC2A7] flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-1 left-1 px-1 py-0.5 bg-black/60 rounded text-[7px] text-white/80">
                      {item.type}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Auditor Signature Block */}
          <div className="p-4 border-b border-[#C0C0C0]/10">
            <div className="text-white/90 font-medium text-sm mb-3">Lead Auditor</div>
            <div className="bg-[#161616] rounded-xl p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1391BF] to-[#0A7FA5] flex items-center justify-center text-white font-bold text-sm">
                  WL
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">Wei Liu</div>
                  <div className="text-[#C0C0C0]/60 text-[10px]">VDA 6.3 Licensed Auditor</div>
                  <div className="text-[#C0C0C0]/40 text-[9px]">Cert: VDA-QMC-2023-1847</div>
                </div>
                <div className="text-right">
                  <div className="text-[#7CC2A7] text-[10px] font-medium">Verified</div>
                  <div className="text-[#C0C0C0]/40 text-[9px]">847 audits</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Export Options */}
          <div className="p-4 mt-auto">
            <div className="space-y-2">
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="w-full py-2.5 bg-[#1391BF] text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export VDA 6.3 Report (PDF)
              </motion.button>
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="w-full py-2.5 bg-[#161616] text-white/80 rounded-xl text-sm font-medium flex items-center justify-center gap-2 border border-[#C0C0C0]/10"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share with BMW SQE Portal
              </motion.button>
            </div>
            <div className="mt-3 text-center">
              <span className="text-[#C0C0C0]/40 text-[9px]">Report ID: YVOO-VDA63-2025-00847</span>
            </div>
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};

// Step 6: Follow-up Manager - Enterprise Dashboard Style
const FollowUpDemo = () => {
  const tasks = [
    { title: "Update CMM calibration records", responsible: "Zhang Wei", deadline: "Feb 28, 2025", progress: 75, status: 'In Progress', priority: 'medium' },
    { title: "Conduct operator training", responsible: "Li Ming", deadline: "Mar 5, 2025", progress: 40, status: 'In Progress', priority: 'low' },
    { title: "Revise Process FMEA", responsible: "Chen Hui", deadline: "Feb 20, 2025", progress: 20, status: 'Overdue', priority: 'high' },
  ];

  return (
    <WindowChrome title="ScanPro+ — Follow-up Manager">
      <div className="h-full flex flex-col bg-[#fafafa]">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-900">Action Tracker</span>
            <div className="h-4 w-px bg-gray-200" />
            <span className="text-sm text-gray-500">TechMold Industries</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-medium rounded border border-red-200">1 Overdue</span>
            <span className="px-2 py-1 bg-amber-50 text-amber-600 text-xs font-medium rounded border border-amber-200">2 In Progress</span>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Task List */}
          <div className="w-3/5 bg-white border-r border-gray-100 flex flex-col">
            <div className="p-4 border-b border-gray-100">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Open Actions</div>
            </div>
            
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {tasks.map((task, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className={`p-4 rounded-xl border ${
                    task.status === 'Overdue' 
                      ? 'bg-red-50/50 border-red-200' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">{task.title}</span>
                        {task.priority === 'high' && (
                          <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-[10px] rounded font-medium">High</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#1391BF] flex items-center justify-center text-white text-[10px] font-bold">
                          {task.responsible.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs text-gray-500">{task.responsible}</span>
                        <span className="text-gray-300">·</span>
                        <span className={`text-xs ${task.status === 'Overdue' ? 'text-red-600' : 'text-gray-400'}`}>
                          Due: {task.deadline}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      task.status === 'Overdue' 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-amber-100 text-amber-600'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full rounded-full ${
                          task.status === 'Overdue' ? 'bg-red-400' : 'bg-amber-400'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${task.progress}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-500">{task.progress}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Right: Details */}
          <div className="w-2/5 p-5 flex flex-col">
            {/* Re-audit Card */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#1391BF]/5 border border-[#1391BF]/20 rounded-xl p-4 mb-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1391BF] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-900 font-medium text-sm">Re-audit Scheduled</div>
                  <div className="text-[#1391BF] text-sm font-semibold">May 15, 2025</div>
                </div>
              </div>
            </motion.div>
            
            {/* Activity Log */}
            <div className="flex-1">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Activity Log</div>
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="space-y-4">
                  {[
                    { user: "ZW", text: "Evidence photos uploaded", time: "2h ago", color: "bg-emerald-500" },
                    { user: "LM", text: "Calibration cert submitted", time: "5h ago", color: "bg-[#1391BF]" },
                    { user: "CH", text: "Training task completed", time: "1d ago", color: "bg-emerald-500" },
                    { user: "SYS", text: "Deadline reminder sent", time: "2d ago", color: "bg-amber-500" },
                  ].map((activity, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`w-6 h-6 rounded-full ${activity.color} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                        {activity.user}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-700">{activity.text}</div>
                        <div className="text-xs text-gray-400">{activity.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Export Button */}
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-5 w-full py-3 bg-[#1391BF] text-white rounded-xl text-sm font-medium hover:bg-[#0e7ba3] transition-colors"
            >
              Export Action Report
            </motion.button>
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};

const PlatformDemoAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Custom durations per step (ms) - search needs more time
  const stepDurations = [12000, 10000, 10000, 10000, 10000, 10000]; // Search, Order, Dispatch, Audit, Report, Follow-up
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % demoSteps.length);
    }, stepDurations[currentStep]);
    
    return () => clearTimeout(timeout);
  }, [currentStep]);
  
  const renderDemo = () => {
    switch (currentStep) {
      case 0: return <SupplierSearchDemo />;
      case 1: return <OrderAuditDemo />;
      case 2: return <AuditorDispatchDemo />;
      case 3: return <AuditExecutionDemo />;
      case 4: return <ReportDemo />;
      case 5: return <FollowUpDemo />;
      default: return <SupplierSearchDemo />;
    }
  };
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-2 mb-6">
        {demoSteps.map((step, i) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(i)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              i === currentStep 
                ? 'bg-[#1391BF] text-white' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {step.label}
          </button>
        ))}
      </div>
      
      <div className="relative bg-[#0A0A0A] rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
        <div className="aspect-video relative overflow-hidden">
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
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          Step {currentStep + 1} of {demoSteps.length}: <span className="font-medium text-gray-700">{demoSteps[currentStep].title}</span>
        </p>
      </div>
    </div>
  );
};

export default PlatformDemoAnimation;
