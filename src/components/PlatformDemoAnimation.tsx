import { useState, useEffect, useRef } from "react";
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
  { id: 1, title: "AI-Powered Discovery", label: "Discover" },
  { id: 2, title: "Order On-Site Audit", label: "Verify" },
  { id: 3, title: "Auditor Dispatch", label: "Dispatch" },
  { id: 4, title: "Audit Execution", label: "Audit" },
  { id: 5, title: "Ground Truth Report", label: "Intelligence" },
  { id: 6, title: "Supplier Development", label: "Develop" },
];

// Clean Window Chrome Component - No dark title bar
const WindowChrome = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="w-full h-full bg-white overflow-hidden flex flex-col shadow-lg">
    <div className="flex-1 overflow-hidden">
      {children}
    </div>
  </div>
);

// Step 0: AI Chat Guided Search - Conversational Interface (like SearchSuppliers page)
const AIChatSearchDemo = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{role: 'user' | 'ai', message: string}>>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isRunningRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const scenario = {
    steps: [
      {
        step: 1,
        aiPrompt: "What type of product or service are you looking for?",
        userResponse: "CNC machining for automotive",
        aiFollowUp: "Great! For automotive CNC machining, what certifications and production volume do you need?"
      },
      {
        step: 2,
        aiPrompt: "",
        userResponse: "ISO 9001, IATF 16949, medium to high volume production",
        aiFollowUp: "Perfect! Let me find suppliers matching: Precision CNC machining + ISO 9001 + IATF 16949 + High-volume capacity"
      }
    ]
  };

  const suppliers = [
    { name: "Precision CNC Solutions", location: "Stuttgart, Germany", certs: ["ISO 9001", "IATF 16949"] },
    { name: "TechMold Industries", location: "Shanghai, China", certs: ["IATF 16949", "TS16949"] },
    { name: "AutoPrecision GmbH", location: "Munich, Germany", certs: ["VDA 6.3", "ISO 9001"] },
    { name: "DriveComponents Ltd", location: "Birmingham, UK", certs: ["IATF 16949", "ISO 14001"] },
  ];

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
      isRunningRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (isRunningRef.current) return;
    
    isRunningRef.current = true;
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];

    const typeAiMessage = (message: string, onComplete: () => void) => {
      setIsTyping(true);
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex <= message.length) {
          setAiResponse(message.slice(0, currentIndex));
          currentIndex++;
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setConversationHistory(prev => [...prev, { role: 'ai', message }]);
          setAiResponse("");
          onComplete();
        }
      }, 20);
    };

    const typeUserMessage = (message: string, onComplete: () => void) => {
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex <= message.length) {
          setUserInput(message.slice(0, currentIndex));
          currentIndex++;
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        } else {
          clearInterval(typingInterval);
          setConversationHistory(prev => [...prev, { role: 'user', message }]);
          setUserInput("");
          onComplete();
        }
      }, 40);
    };

    const runConversation = () => {
      const steps = scenario.steps;
      
      const t1 = setTimeout(() => {
        typeAiMessage(steps[0].aiPrompt, () => {
          const t2 = setTimeout(() => {
            typeUserMessage(steps[0].userResponse, () => {
              const t3 = setTimeout(() => {
                typeAiMessage(steps[0].aiFollowUp, () => {
                  const t4 = setTimeout(() => {
                    setCurrentStep(2);
                    typeUserMessage(steps[1].userResponse, () => {
                      const t5 = setTimeout(() => {
                        typeAiMessage(steps[1].aiFollowUp, () => {
                          const t6 = setTimeout(() => {
                            setShowResults(true);
                            const t7 = setTimeout(() => {
                              setShowResults(false);
                              setConversationHistory([]);
                              setCurrentStep(1);
                              isRunningRef.current = false;
                            }, 5000);
                            timeoutsRef.current.push(t7);
                          }, 1000);
                          timeoutsRef.current.push(t6);
                        });
                      }, 1500);
                      timeoutsRef.current.push(t5);
                    });
                  }, 1000);
                  timeoutsRef.current.push(t4);
                });
              }, 1500);
              timeoutsRef.current.push(t3);
            });
          }, 1000);
          timeoutsRef.current.push(t2);
        });
      }, 500);
      timeoutsRef.current.push(t1);
    };

    runConversation();
  }, []);

  return (
    <WindowChrome title="ScanPro+ — AI Search Assistant">
      <div className="h-full flex flex-col bg-gradient-to-b from-[#fafafa] to-white">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1391BF] to-[#0e7ba3] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-900">AI Search Assistant</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-emerald-600">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Step {currentStep} of 2</span>
          </div>
        </div>
        
        {/* Chat Area */}
        <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-3">
            {/* Conversation History */}
            {conversationHistory.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}
              >
                {msg.role === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1391BF] to-[#0e7ba3] flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                )}
                <div className={`rounded-2xl px-3 py-2 max-w-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#1391BF] text-white rounded-tr-md' 
                    : 'bg-gray-100 text-gray-700 rounded-tl-md'
                }`}>
                  <p className="text-sm">{msg.message}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Currently Typing AI */}
            {isTyping && aiResponse && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1391BF] to-[#0e7ba3] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-md px-3 py-2 max-w-sm">
                  <p className="text-sm text-gray-700">{aiResponse}<span className="inline-block w-0.5 h-3 bg-[#1391BF] ml-0.5 animate-pulse" /></p>
                </div>
              </motion.div>
            )}

            {/* Currently Typing User */}
            {userInput && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 justify-end">
                <div className="bg-[#1391BF] text-white rounded-2xl rounded-tr-md px-3 py-2 max-w-sm">
                  <p className="text-sm">{userInput}<span className="inline-block w-0.5 h-3 bg-white ml-0.5 animate-pulse" /></p>
                </div>
                <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </motion.div>
            )}

            {/* Results */}
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <div className="flex gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1391BF] to-[#0e7ba3] flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-md px-3 py-2">
                    <p className="text-sm text-gray-700 mb-2">Found <span className="font-semibold text-[#1391BF]">4 suppliers</span> matching your requirements:</p>
                  </div>
                </div>
                <div className="ml-9 grid grid-cols-2 gap-2">
                  {suppliers.map((supplier, i) => (
                    <motion.div
                      key={supplier.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-3 border border-gray-200 shadow-sm"
                    >
                      <div className="text-sm font-medium text-gray-900 mb-0.5">{supplier.name}</div>
                      <div className="text-xs text-gray-500 mb-2">{supplier.location}</div>
                      <div className="flex gap-1 flex-wrap">
                        {supplier.certs.map((cert) => (
                          <span key={cert} className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] rounded font-medium">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Input Area */}
        <div className="p-3 bg-white border-t border-gray-200">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <input
                type="text"
                placeholder="Describe what you are looking for..."
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                readOnly
              />
                <button className="w-7 h-7 bg-[#1391BF] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};

// Step 1.5: Refine Search - Filter Adjustments and Supplier Profiles
const RefineSearchDemo = () => {
  const [phase, setPhase] = useState<'adjusting' | 'filtering' | 'results'>('adjusting');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null);
  
  const filters = [
    { id: 'cert', label: 'IATF 16949', category: 'Certification', active: true },
    { id: 'region', label: 'Europe', category: 'Region', active: true },
    { id: 'capacity', label: '50K+ parts/year', category: 'Capacity', active: true },
    { id: 'material', label: 'Aluminum & Steel', category: 'Materials', active: false },
    { id: 'leadtime', label: '< 4 weeks', category: 'Lead Time', active: false },
    { id: 'vda', label: 'VDA 6.3 Certified', category: 'Process Audit', active: false },
  ];

  const suppliers = [
    { 
      name: "DMG MORI AG", 
      location: "Bielefeld, Germany", 
      match: 98,
      certs: ["IATF 16949", "ISO 14001"],
      capacity: "80,000 parts/yr",
      leadTime: "3 weeks",
      image: "🏭",
      rating: 4.9,
      audits: 12
    },
    { 
      name: "Precision CNC Solutions", 
      location: "Stuttgart, Germany", 
      match: 94,
      certs: ["IATF 16949", "VDA 6.3"],
      capacity: "65,000 parts/yr",
      leadTime: "2 weeks",
      image: "🔧",
      rating: 4.8,
      audits: 8
    },
    { 
      name: "AutoPrecision GmbH", 
      location: "Munich, Germany", 
      match: 91,
      certs: ["IATF 16949"],
      capacity: "55,000 parts/yr",
      leadTime: "4 weeks",
      image: "⚙️",
      rating: 4.7,
      audits: 6
    },
    { 
      name: "EuroMach Industries", 
      location: "Vienna, Austria", 
      match: 89,
      certs: ["ISO 9001", "IATF 16949"],
      capacity: "52,000 parts/yr",
      leadTime: "3 weeks",
      image: "🛠️",
      rating: 4.6,
      audits: 5
    },
  ];

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    // Animate filters appearing
    filters.forEach((filter, i) => {
      if (filter.active) {
        timers.push(setTimeout(() => {
          setActiveFilters(prev => [...prev, filter.id]);
        }, 300 + i * 200));
      }
    });
    
    timers.push(setTimeout(() => setPhase('filtering'), 2000));
    timers.push(setTimeout(() => setPhase('results'), 3500));
    timers.push(setTimeout(() => setSelectedSupplier(0), 5000));
    
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <WindowChrome title="ScanPro+ — Refine Search">
      <div className="h-full flex flex-col bg-[#fafafa]">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#1391BF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="text-sm font-medium text-gray-900">Refine Results</span>
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <span className="text-sm text-gray-500">Based on AI conversation</span>
          </div>
          {phase === 'results' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-sm text-emerald-600 font-medium">{suppliers.length} suppliers match</span>
            </motion.div>
          )}
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Filters Panel */}
          <div className="w-72 bg-white border-r border-gray-100 flex flex-col">
            <div className="p-4 border-b border-gray-100">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Applied Filters</div>
              <p className="text-xs text-gray-500">Extracted from your conversation</p>
            </div>
            
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {filters.map((filter, i) => (
                <motion.div
                  key={filter.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: activeFilters.includes(filter.id) || !filter.active ? 1 : 0.3, 
                    x: 0 
                  }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-3 rounded-xl border transition-all ${
                    activeFilters.includes(filter.id)
                      ? 'bg-[#1391BF]/5 border-[#1391BF]/30'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400 mb-0.5">{filter.category}</div>
                      <div className="text-sm font-medium text-gray-900">{filter.label}</div>
                    </div>
                    <div className={`w-5 h-5 rounded flex items-center justify-center ${
                      activeFilters.includes(filter.id) ? 'bg-[#1391BF]' : 'bg-gray-200'
                    }`}>
                      {activeFilters.includes(filter.id) && (
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Add More Filters */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="w-full p-3 border border-dashed border-gray-300 text-sm text-gray-500 hover:border-[#1391BF] hover:text-[#1391BF] transition-colors"
              >
                + Add more filters
              </motion.button>
            </div>
            
            {/* Filter Summary */}
            {phase !== 'adjusting' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border-t border-gray-100 bg-gray-50"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Active filters:</span>
                  <span className="font-medium text-[#1391BF]">{activeFilters.length}</span>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Right: Supplier Results */}
          <div className="flex-1 flex flex-col">
            {phase === 'adjusting' && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-12 h-12 rounded-full bg-[#1391BF]/10 flex items-center justify-center mx-auto mb-4"
                  >
                    <svg className="w-6 h-6 text-[#1391BF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </motion.div>
                  <p className="text-gray-900 font-medium">Extracting search criteria...</p>
                  <p className="text-gray-500 text-sm mt-1">Analyzing your conversation</p>
                </div>
              </div>
            )}
            
            {phase === 'filtering' && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 rounded-full border-3 border-[#1391BF] border-t-transparent mx-auto mb-4"
                    style={{ borderWidth: 3 }}
                  />
                  <p className="text-gray-900 font-medium">Filtering suppliers...</p>
                  <p className="text-gray-500 text-sm mt-1">Matching 47 candidates</p>
                </div>
              </div>
            )}
            
            {phase === 'results' && (
              <div className="flex-1 flex overflow-hidden">
                {/* Supplier List */}
                <div className="w-1/2 border-r border-gray-100 flex flex-col">
                  <div className="p-4 border-b border-gray-100 bg-white">
                    <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Matched Suppliers</div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {suppliers.map((supplier, i) => (
                      <motion.div
                        key={supplier.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15 }}
                        className={`p-4 border-b border-gray-100 cursor-pointer transition-all ${
                          selectedSupplier === i 
                            ? 'bg-[#1391BF]/5 border-l-2 border-l-[#1391BF]' 
                            : 'hover:bg-gray-50 bg-white'
                        }`}
                        onClick={() => setSelectedSupplier(i)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xl">
                            {supplier.image}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900 truncate">{supplier.name}</span>
                              <span className={`text-sm font-bold ${supplier.match >= 95 ? 'text-emerald-600' : 'text-[#1391BF]'}`}>
                                {supplier.match}%
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 mb-2">{supplier.location}</div>
                            <div className="flex gap-1.5 flex-wrap">
                              {supplier.certs.slice(0, 2).map((cert) => (
                                <span key={cert} className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] rounded font-medium">
                                  {cert}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Supplier Profile */}
                <div className="w-1/2 p-5 overflow-y-auto bg-white">
                  {selectedSupplier !== null && (
                    <motion.div 
                      key={selectedSupplier}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      {/* Profile Header */}
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#1391BF]/20 to-[#1391BF]/5 flex items-center justify-center text-2xl">
                          {suppliers[selectedSupplier].image}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{suppliers[selectedSupplier].name}</h3>
                          <p className="text-sm text-gray-500">{suppliers[selectedSupplier].location}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-amber-500">★</span>
                            <span className="text-sm font-medium text-gray-900">{suppliers[selectedSupplier].rating}</span>
                            <span className="text-xs text-gray-400">({suppliers[selectedSupplier].audits} audits)</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Match Score */}
                      <div className="bg-gradient-to-r from-[#1391BF]/10 to-emerald-500/10 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Match Score</span>
                          <span className={`text-xl font-bold ${suppliers[selectedSupplier].match >= 95 ? 'text-emerald-600' : 'text-[#1391BF]'}`}>
                            {suppliers[selectedSupplier].match}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${suppliers[selectedSupplier].match}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className={`h-full rounded-full ${suppliers[selectedSupplier].match >= 95 ? 'bg-emerald-500' : 'bg-[#1391BF]'}`}
                          />
                        </div>
                      </div>
                      
                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3">
                          <div className="text-xs text-gray-400 mb-0.5">Capacity</div>
                          <div className="text-sm font-medium text-gray-900">{suppliers[selectedSupplier].capacity}</div>
                        </div>
                        <div className="bg-gray-50 p-3">
                          <div className="text-xs text-gray-400 mb-0.5">Lead Time</div>
                          <div className="text-sm font-medium text-gray-900">{suppliers[selectedSupplier].leadTime}</div>
                        </div>
                      </div>
                      
                      {/* Certifications */}
                      <div>
                        <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Certifications</div>
                        <div className="flex gap-2 flex-wrap">
                          {suppliers[selectedSupplier].certs.map((cert) => (
                          <span key={cert} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-2.5 bg-[#1391BF] text-white text-sm font-medium"
                        >
                          Add to Order
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium"
                        >
                          View Profile
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};

// Step 1: Combined AI Chat + Supplier Discovery
const SupplierSearchDemo = () => {
  const [phase, setPhase] = useState<'chat' | 'searching' | 'results' | 'profile'>('chat');
  const [selectedSupplier, setSelectedSupplier] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{role: 'user' | 'ai', message: string}>>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isRunningRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const scenario = {
    steps: [
      {
        step: 1,
        aiPrompt: "What type of product or service are you looking for?",
        userResponse: "CNC machining for automotive",
        aiFollowUp: "Great! For automotive CNC machining, what certifications do you need?"
      },
      {
        step: 2,
        aiPrompt: "",
        userResponse: "ISO 9001, IATF 16949",
        aiFollowUp: "Perfect! Let me find matching suppliers..."
      }
    ]
  };

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
  ];

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
      isRunningRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (isRunningRef.current) return;
    
    isRunningRef.current = true;
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];

    const typeAiMessage = (message: string, onComplete: () => void) => {
      setIsTyping(true);
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex <= message.length) {
          setAiResponse(message.slice(0, currentIndex));
          currentIndex++;
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setConversationHistory(prev => [...prev, { role: 'ai', message }]);
          setAiResponse("");
          onComplete();
        }
      }, 25);
    };

    const typeUserMessage = (message: string, onComplete: () => void) => {
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex <= message.length) {
          setUserInput(message.slice(0, currentIndex));
          currentIndex++;
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        } else {
          clearInterval(typingInterval);
          setConversationHistory(prev => [...prev, { role: 'user', message }]);
          setUserInput("");
          onComplete();
        }
      }, 50);
    };

    const runConversation = () => {
      const steps = scenario.steps;
      
      const t1 = setTimeout(() => {
        typeAiMessage(steps[0].aiPrompt, () => {
          const t2 = setTimeout(() => {
            typeUserMessage(steps[0].userResponse, () => {
              const t3 = setTimeout(() => {
                typeAiMessage(steps[0].aiFollowUp, () => {
                  const t4 = setTimeout(() => {
                    setCurrentStep(2);
                    typeUserMessage(steps[1].userResponse, () => {
                      const t5 = setTimeout(() => {
                        typeAiMessage(steps[1].aiFollowUp, () => {
                          const t6 = setTimeout(() => {
                            setPhase('searching');
                            const t7 = setTimeout(() => {
                              setPhase('results');
                              const t8 = setTimeout(() => {
                                setPhase('profile');
                              }, 3000);
                              timeoutsRef.current.push(t8);
                            }, 1500);
                            timeoutsRef.current.push(t7);
                          }, 800);
                          timeoutsRef.current.push(t6);
                        });
                      }, 1000);
                      timeoutsRef.current.push(t5);
                    });
                  }, 800);
                  timeoutsRef.current.push(t4);
                });
              }, 1200);
              timeoutsRef.current.push(t3);
            });
          }, 800);
          timeoutsRef.current.push(t2);
        });
      }, 400);
      timeoutsRef.current.push(t1);
    };

    runConversation();
  }, []);

  return (
    <WindowChrome title="ScanPro+ — AI Supplier Discovery">
      <div className="h-full flex flex-col bg-[#fafafa]">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#1391BF] to-[#0e7ba3] flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">AI-Powered Search</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-emerald-600">Online</span>
              </div>
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <span className="text-sm text-gray-500">25M+ suppliers</span>
          </div>
          {(phase === 'results' || phase === 'profile') && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-sm text-emerald-600 font-medium">{suppliers.length} matches</span>
            </motion.div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chat Phase */}
          {phase === 'chat' && (
            <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto">
              <div className="max-w-2xl mx-auto space-y-3">
                {/* Conversation History */}
                {conversationHistory.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}
                  >
                    {msg.role === 'ai' && (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1391BF] to-[#0e7ba3] flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                    )}
                    <div className={`rounded-2xl px-3 py-2 max-w-sm ${
                      msg.role === 'user' 
                        ? 'bg-[#1391BF] text-white rounded-tr-md' 
                        : 'bg-gray-100 text-gray-700 rounded-tl-md'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Currently Typing AI */}
                {isTyping && aiResponse && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1391BF] to-[#0e7ba3] flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-md px-3 py-2 max-w-sm">
                      <p className="text-sm text-gray-700">{aiResponse}<span className="inline-block w-0.5 h-3 bg-[#1391BF] ml-0.5 animate-pulse" /></p>
                    </div>
                  </motion.div>
                )}

                {/* Currently Typing User */}
                {userInput && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 justify-end">
                    <div className="bg-[#1391BF] text-white rounded-2xl rounded-tr-md px-3 py-2 max-w-sm">
                      <p className="text-sm">{userInput}<span className="inline-block w-0.5 h-3 bg-white ml-0.5 animate-pulse" /></p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* Searching Phase */}
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

          {/* Results Phase */}
          {(phase === 'results' || phase === 'profile') && (
            <>
              {/* Search Criteria Pills */}
              <div className="absolute top-16 left-0 right-0 px-6 py-2 bg-white border-b border-gray-100 z-10">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-gray-400">Filters:</span>
                  {searchCriteria.map((criteria, i) => (
                    <motion.span 
                      key={criteria.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
                    >
                      {criteria.label}: <span className="text-gray-900">{criteria.value}</span>
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Supplier List */}
              <div className="w-2/5 bg-white border-r border-gray-100 flex flex-col pt-10">
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
              <div className="flex-1 p-6 overflow-y-auto pt-16">
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
                      <div key={stat.label} className="bg-gray-50 p-3 text-center">
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
                        <span key={cert} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
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
                    className="w-full py-3 bg-[#1391BF] text-white text-sm font-medium hover:bg-[#0e7ba3] transition-colors"
                  >
                    Add to Audit Order
                  </motion.button>
                </motion.div>
              </div>
            </>
          )}
        </div>

        {/* Input Area - only show during chat */}
        {phase === 'chat' && (
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
                <input
                  type="text"
                  placeholder="Describe what you are looking for..."
                  className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                  readOnly
                />
                <button className="w-7 h-7 bg-[#1391BF] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
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
                    className="flex items-center gap-3 p-2 bg-gray-50"
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
              <div className="bg-white p-4 border border-gray-200">
                <div className="text-xs text-gray-400 mb-1">Start Date</div>
                <div className="text-gray-900 font-medium">Feb 15, 2025</div>
              </div>
              <div className="bg-white p-4 border border-gray-200">
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
                    className="flex items-center gap-3 p-3 bg-white border border-gray-200"
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
            <div className="bg-white p-4 border border-gray-200 mb-5">
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
              className={`w-full py-3 text-sm font-medium transition-all ${
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
            <div className="bg-white border border-gray-200 overflow-hidden">
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
            className={`px-5 py-2 text-sm font-medium transition-all ${
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
                    className={`p-3 border transition-all ${
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
                <div className="w-8 h-8 bg-[#1391BF] flex items-center justify-center flex-shrink-0">
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

// Step 5: Professional Audit Report Generation - Light Enterprise Dashboard
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
    { id: 'NC-001', element: 'P6.3.2', finding: 'Calibration records for CMM Zeiss Contura incomplete', severity: 'major', category: 'Process Control' },
    { id: 'NC-002', element: 'P6.2.1', finding: 'Operator qualification matrix not updated for 2 new CNC operators', severity: 'minor', category: 'Personnel' },
    { id: 'NC-003', element: 'P4.6', finding: 'Process FMEA not revised after design change ECN-2024-047', severity: 'major', category: 'Risk Management' },
    { id: 'OFI-001', element: 'P6.4.3', finding: 'SPC charts for critical dimension CTQ-012 show Cpk trending toward limit', severity: 'observation', category: 'Quality Control' },
  ];
  
  const historicalScores = [
    { year: '2021', score: 78, client: 'BMW' },
    { year: '2022', score: 82, client: 'Mercedes' },
    { year: '2023', score: 79, client: 'Audi' },
    { year: '2024', score: 85, client: 'Porsche' },
    { year: '2025', score: 88, client: 'YVOO' },
  ];
  
  const benchmarkData = [
    { category: 'Industry Avg', score: 76 },
    { category: 'Top 10%', score: 92 },
    { category: 'This Supplier', score: 84.2 },
  ];
  
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
      <div className="h-full flex flex-col bg-[#fafafa]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                <span className="text-gray-700 font-bold text-sm">TM</span>
              </div>
              <div>
                <div className="text-gray-900 font-semibold text-sm">TechMold Industries Co., Ltd.</div>
                <div className="text-gray-500 text-xs">Shanghai, China • DUNS: 54-128-9047</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  <span className={`text-2xl font-bold ${certificationStatus === 'A' ? 'text-emerald-600' : certificationStatus === 'B' ? 'text-[#1391BF]' : 'text-amber-500'}`}>
                    {overallScore.toFixed(1)}%
                  </span>
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs ${
                    certificationStatus === 'A' ? 'bg-emerald-100 text-emerald-700' : 
                    certificationStatus === 'B' ? 'bg-[#1391BF]/10 text-[#1391BF]' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {certificationStatus}
                  </div>
                </div>
                <div className="text-gray-400 text-[10px]">Audit: Feb 14-15, 2025</div>
              </div>
              <div className="flex gap-1.5">
                <span className="px-2 py-1 bg-[#1391BF]/10 text-[#1391BF] rounded text-[10px] font-medium">VDA 6.3</span>
                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-[10px] font-medium">Process Audit</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="px-5 py-2 border-b border-gray-200 bg-white flex items-center gap-1">
          <button
            onClick={() => setViewMode('overview')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === 'overview' 
                ? 'bg-gray-900 text-white' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setViewMode('analytics')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === 'analytics' 
                ? 'bg-gray-900 text-white' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Analytics
          </button>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            {viewMode === 'overview' ? (
              <div className="p-5 space-y-4">
                {/* Process Elements Grid */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">Process Element Scores</h3>
                    <div className="flex gap-3 text-[10px] text-gray-500">
                      <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" />≥90% (A)</span>
                      <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#1391BF]" />≥80% (B)</span>
                      <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500" />≥60% (C)</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {processElements.map((el, i) => {
                      const color = el.score >= 90 ? 'text-emerald-600' : el.score >= 80 ? 'text-[#1391BF]' : 'text-amber-600';
                      const bgColor = el.score >= 90 ? 'bg-emerald-50' : el.score >= 80 ? 'bg-[#1391BF]/5' : 'bg-amber-50';
                      return (
                        <motion.div 
                          key={el.code}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          className={`p-3 text-center border border-gray-100 ${bgColor}`}
                        >
                          <div className="text-gray-400 text-[10px] font-medium mb-1">{el.code}</div>
                          <div className={`text-lg font-bold ${color}`}>{el.score}%</div>
                          <div className="text-gray-500 text-[9px] leading-tight mt-1 line-clamp-2">{el.name}</div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Non-Conformances Table */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">Non-Conformances & Observations</h3>
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-[10px] font-medium">2 Major</span>
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded text-[10px] font-medium">1 Minor</span>
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-medium">1 OFI</span>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 overflow-hidden">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">
                          <th className="text-left py-2 px-3 font-medium text-gray-500">ID</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-500">Element</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-500">Finding</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-500">Severity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {nonConformances.map((nc, i) => (
                          <motion.tr 
                            key={nc.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 + i * 0.08 }}
                            className="border-b border-gray-50 last:border-0"
                          >
                            <td className="py-2.5 px-3 font-mono text-gray-400">{nc.id}</td>
                            <td className="py-2.5 px-3 text-[#1391BF] font-medium">{nc.element}</td>
                            <td className="py-2.5 px-3 text-gray-700">{nc.finding}</td>
                            <td className="py-2.5 px-3">
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium uppercase ${
                                nc.severity === 'major' ? 'bg-red-50 text-red-600' : 
                                nc.severity === 'minor' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                              }`}>
                                {nc.severity === 'observation' ? 'OFI' : nc.severity}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-5 space-y-4">
                {/* Score History Chart */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Audit Score History</h3>
                  <div className="bg-white border border-gray-200 p-4">
                    <div className="flex items-end justify-around h-32">
                      {historicalScores.map((item, i) => {
                        const heightPx = ((item.score - 50) / 50) * 100;
                        return (
                          <div key={item.year} className="flex flex-col items-center">
                            <span className="text-xs font-bold text-gray-900 mb-1">{item.score}%</span>
                            <motion.div 
                              className="w-10 rounded-t bg-[#1391BF]"
                              initial={{ height: 0 }}
                              animate={{ height: heightPx }}
                              transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                            />
                            <div className="mt-2 text-center">
                              <div className="text-gray-500 text-[10px]">{item.year}</div>
                              <div className="text-gray-400 text-[9px]">{item.client}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Process Element Analysis */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Process Element Analysis</h3>
                  <div className="bg-white border border-gray-200 p-4 space-y-2">
                    {processElements.map((el, i) => {
                      const color = el.score >= 90 ? '#10b981' : el.score >= 80 ? '#1391BF' : '#f59e0b';
                      return (
                        <motion.div 
                          key={el.code}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.05 }}
                          className="flex items-center gap-3"
                        >
                          <span className="text-gray-400 text-[10px] font-mono w-6">{el.code}</span>
                          <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full rounded-full"
                              style={{ backgroundColor: color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${el.score}%` }}
                              transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
                            />
                          </div>
                          <span className="text-gray-900 font-bold text-xs w-10 text-right">{el.score}%</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Industry Benchmark */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Industry Benchmark</h3>
                  <div className="bg-white border border-gray-200 p-4">
                    <div className="flex items-end justify-around h-24">
                      {benchmarkData.map((item, i) => {
                        const isThisSupplier = item.category === 'This Supplier';
                        const color = isThisSupplier ? '#1391BF' : item.category === 'Top 10%' ? '#10b981' : '#9ca3af';
                        return (
                          <motion.div 
                            key={item.category}
                            className="flex flex-col items-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                          >
                            <motion.div 
                              className={`w-14 rounded-t ${isThisSupplier ? 'ring-2 ring-[#1391BF]/30' : ''}`}
                              style={{ backgroundColor: color }}
                              initial={{ height: 0 }}
                              animate={{ height: `${(item.score / 100) * 70}px` }}
                              transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
                            />
                            <span className={`text-xs font-bold mt-2 ${isThisSupplier ? 'text-[#1391BF]' : 'text-gray-500'}`}>{item.score}%</span>
                            <span className="text-gray-400 text-[9px] text-center mt-0.5">{item.category}</span>
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
          <div className="w-[220px] border-l border-gray-200 bg-white flex flex-col overflow-hidden">
            {/* Evidence Gallery */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-gray-900">Evidence Gallery</h4>
                <span className="text-gray-400 text-[10px]">247 items</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {evidenceItems.map((item, i) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="aspect-square relative overflow-hidden"
                  >
                    <img 
                      src={evidenceImages[i]} 
                      alt={item.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-1 left-1 right-1">
                      <div className="text-white text-[7px] font-medium truncate">{item.label}</div>
                    </div>
                    {item.verified && (
                      <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Lead Auditor */}
            <div className="p-4 border-b border-gray-100">
              <h4 className="text-xs font-semibold text-gray-900 mb-2">Lead Auditor</h4>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#1391BF] flex items-center justify-center text-white font-bold text-[10px]">
                  WL
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-900 font-medium text-xs">Wei Liu</div>
                  <div className="text-gray-400 text-[10px]">VDA 6.3 Licensed</div>
                </div>
                <div className="text-emerald-600 text-[10px] font-medium">✓</div>
              </div>
            </div>
            
            {/* Export Buttons */}
            <div className="p-4 mt-auto">
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="w-full py-2 bg-gray-900 text-white text-xs font-medium flex items-center justify-center gap-1.5 mb-2"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export PDF
              </motion.button>
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="w-full py-2 bg-white text-gray-600 text-xs font-medium flex items-center justify-center gap-1.5 border border-gray-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share Report
              </motion.button>
              <div className="mt-2 text-center">
                <span className="text-gray-400 text-[9px]">ID: YVOO-VDA63-2025-00847</span>
              </div>
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
                  className={`p-4 border ${
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
              className="bg-[#1391BF]/5 border border-[#1391BF]/20 p-4 mb-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1391BF] flex items-center justify-center">
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
              <div className="bg-white border border-gray-200 p-4">
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
              className="mt-5 w-full py-3 bg-[#1391BF] text-white text-sm font-medium hover:bg-[#0e7ba3] transition-colors"
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
  
  // Custom durations per step (ms) - slower timing for better viewing
  const stepDurations = [25000, 15000, 15000, 15000, 15000, 15000]; // Search (with AI chat), Order, Dispatch, Audit, Report, Follow-up
  
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
      {/* Step Navigation with Progress Connectors */}
      <div className="relative flex items-center justify-center mb-6">
        {/* Background Progress Track */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-0.5 bg-gray-200 rounded-full" 
          style={{ width: `calc(${(demoSteps.length - 1) * 120}px)` }} 
        />
        
        {/* Animated Progress Fill */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-full origin-left"
          style={{ 
            marginLeft: `-${((demoSteps.length - 1) * 120) / 2}px`,
          }}
          initial={{ width: 0 }}
          animate={{ 
            width: `${(currentStep / (demoSteps.length - 1)) * ((demoSteps.length - 1) * 120)}px`
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
        
        {/* Step Buttons */}
        <div className="relative flex items-center gap-0">
          {demoSteps.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => setCurrentStep(i)}
                className={`relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  i === currentStep 
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105' 
                    : i < currentStep
                      ? 'bg-secondary text-white'
                      : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {i < currentStep && (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {step.label}
                </span>
              </button>
              
              {/* Arrow Connector */}
              {i < demoSteps.length - 1 && (
                <div className="flex items-center mx-1">
                  <motion.svg 
                    className={`w-5 h-5 transition-colors duration-300 ${
                      i < currentStep ? 'text-secondary' : 'text-gray-300'
                    }`}
                    viewBox="0 0 24 24" 
                    fill="none"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: i < currentStep ? 1 : 0.5 }}
                  >
                    <path 
                      d="M9 5l7 7-7 7" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative bg-[#0A0A0A] shadow-2xl overflow-hidden">
        <div className="aspect-video relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0"
            >
              {renderDemo()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Step Progress with End-to-End Messaging */}
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-primary">{String(currentStep + 1).padStart(2, '0')}</span>
          <span className="mx-2 text-gray-300">/</span>
          <span className="font-mono text-gray-400">{String(demoSteps.length).padStart(2, '0')}</span>
          <span className="mx-3 text-gray-300">—</span>
          <span className="font-medium text-foreground">{demoSteps[currentStep].title}</span>
        </p>
        {currentStep === demoSteps.length - 1 && (
          <motion.p 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-secondary mt-2 font-medium"
          >
            ✓ From search to verified partnership — the complete journey
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default PlatformDemoAnimation;
