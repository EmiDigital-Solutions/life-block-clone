import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Check, ArrowRight, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect, useMemo } from "react";
import { FeatureModal } from "@/components/FeatureModal";
import SearchSuppliersFAQ from "@/components/SearchSuppliersFAQ";

// Generate static funnel-shaped particles (wide on left, converging to right)
const generateFunnelParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    // X position: 0% to 55% (left side to laser point)
    const xProgress = Math.random();
    const x = xProgress * 55;
    
    // Y spread: wide on left (0), narrow at laser point (1)
    const maxYSpread = 50 - (xProgress * 42);
    const yOffset = (Math.random() - 0.5) * 2 * maxYSpread;
    const y = 50 + yOffset;
    
    // Larger particles, varying size based on position
    const baseSize = 2 + Math.random() * 4;
    const size = xProgress > 0.7 ? baseSize * 0.7 : baseSize;
    
    // More green particles throughout - higher probability
    const isGreen = xProgress > 0.3 ? Math.random() > 0.2 : Math.random() > 0.4;
    
    // Higher opacity for visibility
    const opacity = 0.5 + Math.random() * 0.5;
    
    return {
      id: i,
      x,
      y,
      size,
      isGreen,
      opacity,
      delay: Math.random() * 4,
    };
  });
};

// Import procurement images for hero carousel background
import procurementFemaleAfrican from "@/assets/procurement-female-african.jpg";
import procurementFemaleAsian from "@/assets/procurement-female-asian.jpg";
import procurementFemaleBlonde from "@/assets/procurement-female-blonde.jpg";
import procurementFemaleEuropean from "@/assets/procurement-female-european.jpg";
import procurementMaleAsian from "@/assets/procurement-male-asian.jpg";
import procurementMaleEuropean from "@/assets/procurement-male-european.jpg";
import procurementMaleLatin from "@/assets/procurement-male-latin.jpg";
import procurementMaleSouthAsian from "@/assets/procurement-male-south-asian.jpg";

// Window Chrome Component for mockups
const WindowChrome = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="w-full h-full bg-[#fafafa] overflow-hidden flex flex-col shadow-xl border border-gray-200">
    <div className="h-8 bg-white flex items-center px-3 border-b border-gray-200 flex-shrink-0">
      <div className="flex gap-1.5 mr-3">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <span className="text-[10px] text-gray-500 font-medium">{title}</span>
    </div>
    <div className="flex-1 overflow-hidden">
      {children}
    </div>
  </div>
);

// AI Search Mockup Component
const AISearchMockup = () => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const messages = [
    { role: 'ai', text: "What type of product or service are you looking for?" },
    { role: 'user', text: "CNC machining for automotive brake components" },
    { role: 'ai', text: "For automotive brake components, what certifications do you require?" },
    { role: 'user', text: "IATF 16949, ISO 9001, capacity for 50,000 units/month" },
  ];

  return (
    <WindowChrome title="SearchPro+ — AI Discovery">
      <div className="h-full bg-white p-4 flex flex-col">
        <div className="flex-1 space-y-3 overflow-hidden">
          {messages.slice(0, step + 1).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 text-sm ${
                msg.role === 'user' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                {msg.role === 'ai' && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-4 h-4 bg-primary/20 flex items-center justify-center">
                      <span className="text-[6px] text-primary font-bold">AI</span>
                    </div>
                    <span className="text-[10px] font-medium text-primary">YVOO</span>
                  </div>
                )}
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            </motion.div>
          ))}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-3 bg-primary/5 border border-primary/20"
            >
              <p className="text-xs font-medium text-primary mb-2">Found 47 matching suppliers</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-white text-[10px] border">IATF 16949</span>
                <span className="px-2 py-1 bg-white text-[10px] border">50K units</span>
                <span className="px-2 py-1 bg-white text-[10px] border">Verified ✓</span>
              </div>
            </motion.div>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <div className="flex-1 h-10 bg-gray-50 border border-gray-200 flex items-center px-3">
            <span className="text-gray-400 text-sm">Type your requirements...</span>
          </div>
          <div className="w-10 h-10 bg-primary flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};

// Audit Order Mockup Component
const AuditOrderMockup = () => {
  const [orderStep, setOrderStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setOrderStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const suppliers = [
    { name: "Precision Metalworks GmbH", location: "Munich, Germany", selected: true },
    { name: "AutoParts Bavaria", location: "Stuttgart, Germany", selected: orderStep >= 1 },
    { name: "CNC Masters Ltd", location: "Birmingham, UK", selected: orderStep >= 2 },
  ];

  return (
    <WindowChrome title="ScanPro+ — Order Audit">
      <div className="h-full bg-white p-4">
        {/* Header */}
        <div className="mb-4 pb-3 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-sm">Schedule On-Site Audit</h3>
          <p className="text-[10px] text-gray-500 mt-1">Select suppliers for ground truth verification</p>
        </div>

        {/* Supplier Selection */}
        <div className="space-y-2 mb-4">
          {suppliers.map((supplier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-3 border ${supplier.selected ? 'border-primary bg-primary/5' : 'border-gray-100'} transition-all`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-900">{supplier.name}</p>
                  <p className="text-[10px] text-gray-500">{supplier.location}</p>
                </div>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  supplier.selected ? 'bg-primary border-primary' : 'border-gray-200'
                }`}>
                  {supplier.selected && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Audit Options */}
        <div className="bg-gray-50 p-3 mb-4">
          <p className="text-[10px] text-gray-500 mb-2">Audit Type</p>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-primary text-white text-[10px] font-medium">Process Audit</span>
            <span className="px-2 py-1 bg-white border text-[10px]">Quality Audit</span>
            <span className="px-2 py-1 bg-white border text-[10px]">Full Assessment</span>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full py-2.5 bg-primary text-white text-xs font-medium flex items-center justify-center gap-2">
          Order Audit for {suppliers.filter(s => s.selected).length} Suppliers
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </WindowChrome>
  );
};

// Ground Truth Intelligence Mockup Component  
const GroundTruthMockup = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <WindowChrome title="YVOO — Ground Truth Intelligence">
      <div className="h-full bg-white p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4 pb-3 border-b border-gray-100">
          <div className="w-10 h-10 bg-secondary/20 flex items-center justify-center">
            <Check className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Verified Ground Truth</h3>
            <p className="text-[10px] text-gray-500">Last audit: 3 days ago • Auditor: M. Schmidt</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-4 border-b border-gray-100">
          {['Equipment', 'Certificates', 'Capacity'].map((tab, i) => (
            <button
              key={tab}
              className={`pb-2 text-xs font-medium transition-colors ${
                activeTab === i ? 'text-primary border-b-2 border-primary' : 'text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-2"
        >
          {activeTab === 0 && (
            <>
              {['DMG MORI NLX 2500 • Verified ✓', 'Zeiss CMM Contura • Verified ✓', 'TRUMPF TruLaser • Verified ✓'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-secondary/10">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="text-xs text-gray-900">{item}</span>
                </div>
              ))}
            </>
          )}
          {activeTab === 1 && (
            <>
              {[
                { cert: 'IATF 16949:2016', status: 'Valid', date: '2026' },
                { cert: 'ISO 9001:2015', status: 'Valid', date: '2025' },
                { cert: 'ISO 14001', status: 'Valid', date: '2025' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-gray-50">
                  <span className="text-xs font-medium">{item.cert}</span>
                  <span className="text-[10px] text-secondary font-medium">Verified until {item.date}</span>
                </div>
              ))}
            </>
          )}
          {activeTab === 2 && (
            <div className="space-y-3">
              <div className="p-3 bg-gray-50">
                <p className="text-[10px] text-gray-500 mb-1">Production Capacity</p>
                <p className="text-lg font-bold text-gray-900">60,000 <span className="text-sm font-normal">units/month</span></p>
                <p className="text-[10px] text-secondary mt-1">✓ Verified on-site</p>
              </div>
              <div className="p-3 bg-gray-50">
                <p className="text-[10px] text-gray-500 mb-1">Current Utilization</p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-[72%] bg-primary rounded-full" />
                </div>
                <p className="text-[10px] text-gray-600 mt-1">72% — Available capacity confirmed</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </WindowChrome>
  );
};

// Supplier Development Mockup Component
const SupplierDevelopmentMockup = () => {
  const [progress, setProgress] = useState(65);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev >= 95 ? 65 : prev + 10);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const actions = [
    { task: "Implement 5S methodology", status: "completed", due: "Completed" },
    { task: "Update quality control procedure", status: "in-progress", due: "Due in 5 days" },
    { task: "Add CMM inspection station", status: "pending", due: "Due in 2 weeks" },
  ];

  return (
    <WindowChrome title="YVOO — Supplier Development">
      <div className="h-full bg-white p-4">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-900 text-sm">Development Progress</h3>
            <motion.span 
              key={progress}
              className="text-lg font-bold text-primary"
            >
              {progress}%
            </motion.span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Improvement Actions */}
        <div className="space-y-2 mb-4">
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Improvement Actions</p>
          {actions.map((action, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-3 border border-gray-100"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center ${
                    action.status === 'completed' ? 'bg-secondary' :
                    action.status === 'in-progress' ? 'bg-primary' : 'bg-gray-200'
                  }`}>
                    {action.status === 'completed' && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">{action.task}</p>
                    <p className="text-[10px] text-gray-500">{action.due}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Next Audit */}
        <div className="bg-primary/5 border border-primary/20 p-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-[10px] text-primary font-bold">📋</span>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-900">Follow-up Audit Scheduled</p>
              <p className="text-[10px] text-primary">Feb 15, 2026 • Verify improvements</p>
            </div>
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};

// Supplier Profile Mockup Component (kept for reference)
const SupplierProfileMockup = () => {
  const [activeProfileTab, setActiveProfileTab] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProfileTab((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <WindowChrome title="SearchPro+ — Supplier Profile">
      <div className="h-full bg-white p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-100">
          <div className="w-12 h-12 bg-gray-100 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-600">PM</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900">Precision Metalworks GmbH</h3>
              <span className="px-1.5 py-0.5 bg-secondary/20 text-secondary text-[10px] font-medium">94% Match</span>
            </div>
            <p className="text-xs text-gray-500">Munich, Germany • Est. 1987</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-4 border-b border-gray-100">
          {['Capabilities', 'Certifications', 'Equipment'].map((tab, i) => (
            <button
              key={tab}
              className={`pb-2 text-xs font-medium transition-colors ${
                activeProfileTab === i ? 'text-primary border-b-2 border-primary' : 'text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeProfileTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-2"
        >
          {activeProfileTab === 0 && (
            <>
              <div className="flex items-center gap-2 p-2 bg-gray-50">
                <Check className="w-3 h-3 text-primary" />
                <span className="text-xs">5-Axis CNC Machining</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50">
                <Check className="w-3 h-3 text-primary" />
                <span className="text-xs">Precision Grinding (±0.005mm)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50">
                <Check className="w-3 h-3 text-primary" />
                <span className="text-xs">Brake Component Expertise</span>
              </div>
            </>
          )}
          {activeProfileTab === 1 && (
            <>
              <div className="flex items-center justify-between p-2 bg-gray-50">
                <span className="text-xs font-medium">IATF 16949:2016</span>
                <span className="text-[10px] text-secondary">Valid until 2026</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50">
                <span className="text-xs font-medium">ISO 9001:2015</span>
                <span className="text-[10px] text-secondary">Valid until 2025</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50">
                <span className="text-xs font-medium">ISO 14001</span>
                <span className="text-[10px] text-secondary">Valid until 2025</span>
              </div>
            </>
          )}
          {activeProfileTab === 2 && (
            <>
              <div className="p-2 bg-gray-50">
                <p className="text-xs font-medium">DMG MORI NLX 2500</p>
                <p className="text-[10px] text-gray-500">5-Axis CNC • 2021</p>
              </div>
              <div className="p-2 bg-gray-50">
                <p className="text-xs font-medium">Zeiss CMM Contura</p>
                <p className="text-[10px] text-gray-500">Quality Measurement • 2022</p>
              </div>
              <div className="p-2 bg-gray-50">
                <p className="text-xs font-medium">Surface Grinder Okamoto</p>
                <p className="text-[10px] text-gray-500">Precision Grinding • 2019</p>
              </div>
            </>
          )}
        </motion.div>

        {/* CTA */}
        <div className="mt-4 flex gap-2">
          <button className="flex-1 py-2 bg-primary text-white text-xs font-medium">
            Request Quote
          </button>
          <button className="flex-1 py-2 border border-gray-200 text-xs font-medium">
            Order Audit
          </button>
        </div>
      </div>
    </WindowChrome>
  );
};

// Comparison Mockup Component
const ComparisonMockup = () => {
  const [selectedCount, setSelectedCount] = useState(2);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedCount((prev) => prev === 2 ? 3 : 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const suppliers = [
    { name: "Precision Metalworks", match: 94, cert: "IATF 16949", capacity: "60K/mo" },
    { name: "AutoParts Bavaria", match: 89, cert: "IATF 16949", capacity: "45K/mo" },
    { name: "CNC Masters", match: 82, cert: "ISO 9001", capacity: "80K/mo" },
  ];

  return (
    <WindowChrome title="SearchPro+ — Compare Suppliers">
      <div className="h-full bg-white p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Comparison Table</h3>
            <p className="text-[10px] text-gray-500">{selectedCount} suppliers selected</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-primary text-white text-[10px] font-medium flex items-center gap-1">
              Export
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-medium text-gray-500">Criteria</th>
                {suppliers.slice(0, selectedCount).map((s, i) => (
                  <th key={i} className="text-left py-2 font-medium text-gray-900">{s.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-50">
                <td className="py-2 text-gray-500">Match Score</td>
                {suppliers.slice(0, selectedCount).map((s, i) => (
                  <td key={i} className="py-2">
                    <span className={`font-bold ${s.match >= 90 ? 'text-secondary' : 'text-primary'}`}>
                      {s.match}%
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-50">
                <td className="py-2 text-gray-500">Certification</td>
                {suppliers.slice(0, selectedCount).map((s, i) => (
                  <td key={i} className="py-2">{s.cert}</td>
                ))}
              </tr>
              <tr className="border-b border-gray-50">
                <td className="py-2 text-gray-500">Capacity</td>
                {suppliers.slice(0, selectedCount).map((s, i) => (
                  <td key={i} className="py-2">{s.capacity}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button className="flex-1 py-2 bg-gray-100 text-xs font-medium">Add to List</button>
          <button className="flex-1 py-2 bg-primary text-white text-xs font-medium">Order Audits</button>
        </div>
      </div>
    </WindowChrome>
  );
};

const SearchSuppliers = () => {
  const [activeTab, setActiveTab] = useState<"search" | "save" | "export">("search");
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{role: 'user' | 'ai', message: string}>>([]);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [selectedAIFeature, setSelectedAIFeature] = useState<{
    number: string;
    title: string;
    description: string;
    detailedExplanation: {
      overview: string;
      forEngineers: string;
      forBuyers: string;
      forAuditors: string;
      example: string;
    };
  } | null>(null);
  const isRunningRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  
  // Generate particles for hero section
  const particles = useMemo(() => generateFunnelParticles(1200), []);

  // Three different search scenarios - rotating industries
  const scenarios = [
    {
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
    },
    {
      steps: [
        {
          step: 1,
          aiPrompt: "What type of product or service are you looking for?",
          userResponse: "Implantable medical device components",
          aiFollowUp: "Perfect! For implantable medical components, what certifications and materials do you require?"
        },
        {
          step: 2,
          aiPrompt: "",
          userResponse: "ISO 13485, FDA registered, titanium and medical-grade steel",
          aiFollowUp: "Excellent! Searching for suppliers with: Implantable components + ISO 13485 + FDA + Cleanroom + Titanium/Steel expertise"
        }
      ]
    },
    {
      steps: [
        {
          step: 1,
          aiPrompt: "What type of product or service are you looking for?",
          userResponse: "PCB assembly for aerospace applications",
          aiFollowUp: "Great! For aerospace PCB assembly, what quality standards and testing capabilities do you need?"
        },
        {
          step: 2,
          aiPrompt: "",
          userResponse: "IPC-A-610 Class 3, AS9100, with full AOI and X-ray inspection",
          aiFollowUp: "Perfect! Searching for suppliers with: PCB Assembly + IPC-A-610 Class 3 + AS9100 + Full testing capabilities"
        }
      ]
    }
  ];

  // Hero carousel images
  const heroImages = [
    { src: procurementFemaleEuropean, alt: 'Procurement Specialist - Europe' },
    { src: procurementMaleAsian, alt: 'Supply Chain Manager - Asia' },
    { src: procurementFemaleBlonde, alt: 'Sourcing Manager - Germany' },
    { src: procurementMaleLatin, alt: 'Procurement Director - Latin America' },
    { src: procurementFemaleAfrican, alt: 'Strategic Buyer - Africa' },
    { src: procurementMaleSouthAsian, alt: 'Category Manager - South Asia' },
    { src: procurementFemaleAsian, alt: 'Global Sourcing Lead - Asia Pacific' },
    { src: procurementMaleEuropean, alt: 'Purchasing Manager - Europe' },
  ];

  // Auto-advance hero carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    // Cleanup function
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
      isRunningRef.current = false;
    };
  }, []);

  useEffect(() => {
    // Prevent multiple conversations from running
    if (isRunningRef.current) return;
    
    isRunningRef.current = true;
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];

    const runConversation = () => {
      const steps = scenarios[currentScenario].steps;
      
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
                            // Wait 5 seconds after results, then fade out and restart
                            const t7 = setTimeout(() => {
                              setIsFading(true);
                              const t8 = setTimeout(() => {
                                setShowResults(false);
                                setConversationHistory([]);
                                setCurrentStep(1);
                                setIsFading(false);
                                isRunningRef.current = false;
                                setCurrentScenario((prev) => (prev + 1) % scenarios.length);
                              }, 500);
                              timeoutsRef.current.push(t8);
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
  }, [currentScenario]);

  const typeAiMessage = (message: string, onComplete: () => void) => {
    setIsTyping(true);
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= message.length) {
        setAiResponse(message.slice(0, currentIndex));
        currentIndex++;
        // Auto-scroll to bottom
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
        // Auto-scroll to bottom
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

// Window Chrome Component for mockups
const WindowChrome = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="w-full h-full bg-[#fafafa] overflow-hidden flex flex-col shadow-xl border border-gray-200">
    <div className="h-8 bg-white flex items-center px-3 border-b border-gray-200 flex-shrink-0">
      <div className="flex gap-1.5 mr-3">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <span className="text-[10px] text-gray-500 font-medium">{title}</span>
    </div>
    <div className="flex-1 overflow-hidden">
      {children}
    </div>
  </div>
);

// AI Search Mockup Component
const AISearchMockup = () => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const messages = [
    { role: 'ai', text: "What type of product or service are you looking for?" },
    { role: 'user', text: "CNC machining for automotive brake components" },
    { role: 'ai', text: "For automotive brake components, what certifications do you require?" },
    { role: 'user', text: "IATF 16949, ISO 9001, capacity for 50,000 units/month" },
  ];

  return (
    <WindowChrome title="SearchPro+ — AI Assistant">
      <div className="h-full bg-white p-4 flex flex-col">
        <div className="flex-1 space-y-3 overflow-hidden">
          {messages.slice(0, step + 1).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 text-sm ${
                msg.role === 'user' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                {msg.role === 'ai' && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-4 h-4 bg-primary/20 flex items-center justify-center">
                      <span className="text-[6px] text-primary font-bold">AI</span>
                    </div>
                    <span className="text-[10px] font-medium text-primary">YVOO</span>
                  </div>
                )}
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            </motion.div>
          ))}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-3 bg-primary/5 border border-primary/20"
            >
              <p className="text-xs font-medium text-primary mb-2">Searching 25M+ suppliers...</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-white text-[10px] border">IATF 16949</span>
                <span className="px-2 py-1 bg-white text-[10px] border">50K units</span>
                <span className="px-2 py-1 bg-white text-[10px] border">Automotive</span>
              </div>
            </motion.div>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <div className="flex-1 h-10 bg-gray-50 border border-gray-200 flex items-center px-3">
            <span className="text-gray-400 text-sm">Type your requirements...</span>
          </div>
          <div className="w-10 h-10 bg-primary flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};

// Supplier Profile Mockup Component
const SupplierProfileMockup = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <WindowChrome title="SearchPro+ — Supplier Profile">
      <div className="h-full bg-white p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-100">
          <div className="w-12 h-12 bg-gray-100 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-600">PM</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900">Precision Metalworks GmbH</h3>
              <span className="px-1.5 py-0.5 bg-secondary/20 text-secondary text-[10px] font-medium">94% Match</span>
            </div>
            <p className="text-xs text-gray-500">Munich, Germany • Est. 1987</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-4 border-b border-gray-100">
          {['Capabilities', 'Certifications', 'Equipment'].map((tab, i) => (
            <button
              key={tab}
              className={`pb-2 text-xs font-medium transition-colors ${
                activeTab === i ? 'text-primary border-b-2 border-primary' : 'text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-2"
        >
          {activeTab === 0 && (
            <>
              <div className="flex items-center gap-2 p-2 bg-gray-50">
                <Check className="w-3 h-3 text-primary" />
                <span className="text-xs">5-Axis CNC Machining</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50">
                <Check className="w-3 h-3 text-primary" />
                <span className="text-xs">Precision Grinding (±0.005mm)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50">
                <Check className="w-3 h-3 text-primary" />
                <span className="text-xs">Brake Component Expertise</span>
              </div>
            </>
          )}
          {activeTab === 1 && (
            <>
              <div className="flex items-center justify-between p-2 bg-gray-50">
                <span className="text-xs font-medium">IATF 16949:2016</span>
                <span className="text-[10px] text-secondary">Valid until 2026</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50">
                <span className="text-xs font-medium">ISO 9001:2015</span>
                <span className="text-[10px] text-secondary">Valid until 2025</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50">
                <span className="text-xs font-medium">ISO 14001</span>
                <span className="text-[10px] text-secondary">Valid until 2025</span>
              </div>
            </>
          )}
          {activeTab === 2 && (
            <>
              <div className="p-2 bg-gray-50">
                <p className="text-xs font-medium">DMG MORI NLX 2500</p>
                <p className="text-[10px] text-gray-500">5-Axis CNC • 2021</p>
              </div>
              <div className="p-2 bg-gray-50">
                <p className="text-xs font-medium">Zeiss CMM Contura</p>
                <p className="text-[10px] text-gray-500">Quality Measurement • 2022</p>
              </div>
              <div className="p-2 bg-gray-50">
                <p className="text-xs font-medium">Surface Grinder Okamoto</p>
                <p className="text-[10px] text-gray-500">Precision Grinding • 2019</p>
              </div>
            </>
          )}
        </motion.div>

        {/* CTA */}
        <div className="mt-4 flex gap-2">
          <button className="flex-1 py-2 bg-primary text-white text-xs font-medium">
            Request Quote
          </button>
          <button className="flex-1 py-2 border border-gray-200 text-xs font-medium">
            Order Audit
          </button>
        </div>
      </div>
    </WindowChrome>
  );
};

// Comparison Mockup Component
const ComparisonMockup = () => {
  const [selectedCount, setSelectedCount] = useState(2);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedCount((prev) => prev === 2 ? 3 : 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const suppliers = [
    { name: "Precision Metalworks", match: 94, cert: "IATF 16949", capacity: "60K/mo" },
    { name: "AutoParts Bavaria", match: 89, cert: "IATF 16949", capacity: "45K/mo" },
    { name: "CNC Masters", match: 82, cert: "ISO 9001", capacity: "80K/mo" },
  ];

  return (
    <WindowChrome title="SearchPro+ — Compare Suppliers">
      <div className="h-full bg-white p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Comparison Table</h3>
            <p className="text-[10px] text-gray-500">{selectedCount} suppliers selected</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-primary text-white text-[10px] font-medium flex items-center gap-1">
              Export
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-medium text-gray-500">Criteria</th>
                {suppliers.slice(0, selectedCount).map((s, i) => (
                  <th key={i} className="text-left py-2 font-medium text-gray-900">{s.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-50">
                <td className="py-2 text-gray-500">Match Score</td>
                {suppliers.slice(0, selectedCount).map((s, i) => (
                  <td key={i} className="py-2">
                    <span className={`font-bold ${s.match >= 90 ? 'text-secondary' : 'text-primary'}`}>
                      {s.match}%
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-50">
                <td className="py-2 text-gray-500">Certification</td>
                {suppliers.slice(0, selectedCount).map((s, i) => (
                  <td key={i} className="py-2">{s.cert}</td>
                ))}
              </tr>
              <tr className="border-b border-gray-50">
                <td className="py-2 text-gray-500">Capacity</td>
                {suppliers.slice(0, selectedCount).map((s, i) => (
                  <td key={i} className="py-2">{s.capacity}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button className="flex-1 py-2 bg-gray-100 text-xs font-medium">Add to List</button>
          <button className="flex-1 py-2 bg-primary text-white text-xs font-medium">Send RFQ</button>
        </div>

        {/* Export formats */}
        <div className="mt-3 flex gap-2">
          {['CSV', 'Excel', 'PDF'].map((fmt) => (
            <span key={fmt} className="px-2 py-1 bg-gray-50 text-[10px] text-gray-600">{fmt}</span>
          ))}
        </div>
      </div>
    </WindowChrome>
  );
};

  // Supplier database organized by industry/scenario
  const allSuppliers = {
    // Scenario 0: CNC Machining / Automotive
    cnc_automotive: [
      {
        id: 1,
        name: "Precision CNC Solutions",
        location: "Stuttgart, Germany",
        size: "250-500",
        specialties: "Automotive, ISO 9001, TS16949",
        description: "Leading CNC machining specialist with 25+ years experience in automotive precision components",
        certifications: ["ISO 9001:2015", "IATF 16949:2016", "ISO 14001"],
        capabilities: ["5-axis CNC machining", "Aluminum & Steel processing", "Medium to high-volume production", "Quality inspection", "Surface treatment"],
        experience: "25+ years in automotive sector",
        capacity: "Medium to high-volume production (10,000-100,000 units/month)",
        equipment: ["DMG Mori 5-axis machines", "Mazak CNC centers", "CMM inspection systems"],
        founded: 1998,
        employees: 380,
        revenue: "€45-50M annually"
      },
      {
        id: 2,
        name: "TechMold Industries",
        location: "Shanghai, China",
        size: "500-1000",
        specialties: "Injection Molding, IATF 16949",
        description: "Advanced manufacturing facility specializing in precision CNC and automotive components",
        certifications: ["IATF 16949:2016", "ISO 9001:2015", "TS 16949"],
        capabilities: ["CNC machining", "Injection molding", "Tool & die making", "Assembly services", "Quality control"],
        experience: "18+ years in automotive sector",
        capacity: "High-volume production (100,000+ units/month)",
        equipment: ["Haas CNC machines", "Injection molding presses", "Automated inspection"],
        founded: 2005,
        employees: 720,
        revenue: "¥280-300M annually"
      },
      {
        id: 3,
        name: "AutoPrecision GmbH",
        location: "Munich, Germany",
        size: "150-300",
        specialties: "Automotive CNC, ISO 9001",
        description: "Specialized in high-precision automotive CNC machining with advanced quality systems",
        certifications: ["ISO 9001:2015", "IATF 16949:2016", "VDA 6.3"],
        capabilities: ["Multi-axis CNC", "Automotive components", "In-process inspection", "Heat treatment", "Prototype to production"],
        experience: "20+ years in automotive manufacturing",
        capacity: "Medium-volume production (25,000-75,000 units/month)",
        equipment: ["Fanuc CNC machines", "Coordinate measuring machines", "Quality labs"],
        founded: 2003,
        employees: 215,
        revenue: "€28-32M annually"
      },
      {
        id: 4,
        name: "DriveComponents Ltd",
        location: "Birmingham, UK",
        size: "200-400",
        specialties: "Automotive, IATF 16949",
        description: "UK-based automotive component specialist with strong quality management",
        certifications: ["IATF 16949:2016", "ISO 9001:2015", "ISO 14001"],
        capabilities: ["CNC turning & milling", "Automotive assembly", "Supply chain management", "JIT delivery", "Engineering support"],
        experience: "22+ years serving automotive OEMs",
        capacity: "High-volume production (50,000-150,000 units/month)",
        equipment: ["Mazak multi-tasking machines", "Robotic automation", "Vision inspection systems"],
        founded: 2001,
        employees: 340,
        revenue: "£35-40M annually"
      }
    ],
    // Scenario 1: Medical Device Components
    medical_devices: [
      {
        id: 11,
        name: "MediParts GmbH",
        location: "Munich, Germany",
        size: "100-250",
        specialties: "Medical Devices, GMP, ISO 13485",
        description: "Specialized in medical-grade precision components with cleanroom manufacturing",
        certifications: ["ISO 13485:2016", "ISO 9001:2015", "GMP", "FDA Registered"],
        capabilities: ["Precision CNC machining", "Medical-grade materials", "Cleanroom production", "Validation services", "Regulatory compliance"],
        experience: "15+ years in medical device manufacturing",
        capacity: "Low to medium-volume production (5,000-50,000 units/month)",
        equipment: ["5-axis CNC machines", "Cleanroom facilities Class 7", "Validation equipment"],
        founded: 2008,
        employees: 185,
        revenue: "€18-22M annually"
      },
      {
        id: 12,
        name: "BioTech Precision SA",
        location: "Geneva, Switzerland",
        size: "80-150",
        specialties: "Implantable devices, ISO 13485, FDA",
        description: "Swiss precision manufacturer specializing in implantable medical components",
        certifications: ["ISO 13485:2016", "FDA Registered", "CE Mark", "GMP"],
        capabilities: ["Micro-machining", "Implant-grade materials", "Cleanroom Class 5", "Biocompatibility testing", "Full traceability"],
        experience: "18+ years in implantable devices",
        capacity: "Low-volume high-precision (2,000-15,000 units/month)",
        equipment: ["Swiss-type lathes", "Cleanroom production", "Advanced metrology"],
        founded: 2006,
        employees: 125,
        revenue: "CHF 22-26M annually"
      },
      {
        id: 13,
        name: "MedTech Components Inc",
        location: "Boston, MA, USA",
        size: "150-300",
        specialties: "Medical devices, FDA, cleanroom",
        description: "US-based medical component manufacturer with extensive FDA experience",
        certifications: ["ISO 13485:2016", "FDA Registered", "ISO 9001:2015", "ISO 14971"],
        capabilities: ["Medical machining", "Cleanroom assembly", "Sterilization validation", "Design transfer", "Quality systems"],
        experience: "20+ years FDA-regulated manufacturing",
        capacity: "Medium-volume production (10,000-40,000 units/month)",
        equipment: ["Medical-grade CNC", "Class 7 cleanrooms", "Automated inspection"],
        founded: 2003,
        employees: 245,
        revenue: "$32-38M annually"
      },
      {
        id: 14,
        name: "SurgiPrecision Ltd",
        location: "Dublin, Ireland",
        size: "90-180",
        specialties: "Surgical instruments, ISO 13485",
        description: "European leader in surgical instrument and implant component manufacturing",
        certifications: ["ISO 13485:2016", "CE Mark", "FDA Registered", "ISO 9001:2015"],
        capabilities: ["Surgical components", "Implantable parts", "Cleanroom manufacturing", "Material certification", "Regulatory support"],
        experience: "12+ years in surgical devices",
        capacity: "Low to medium-volume (8,000-35,000 units/month)",
        equipment: ["Precision CNC centers", "Cleanroom Class 7", "Surface finishing"],
        founded: 2012,
        employees: 160,
        revenue: "€15-19M annually"
      }
    ],
    // Scenario 2: Electronics Assembly / PCB
    electronics_pcb: [
      {
        id: 21,
        name: "CircuitPro Manufacturing",
        location: "Shenzhen, China",
        size: "800-1500",
        specialties: "PCB Assembly, IPC-A-610 Class 3",
        description: "Leading electronics manufacturer specializing in high-reliability PCB assembly for aerospace",
        certifications: ["IPC-A-610 Class 3", "AS9100D", "ISO 9001:2015", "ITAR Registered"],
        capabilities: ["SMT assembly", "Through-hole assembly", "X-ray inspection", "Conformal coating", "Aerospace PCBs"],
        experience: "15+ years in aerospace electronics",
        capacity: "High-volume production (500,000+ boards/month)",
        equipment: ["Fuji SMT lines", "AOI systems", "X-ray inspection", "Wave soldering"],
        founded: 2008,
        employees: 1200,
        revenue: "¥450-500M annually"
      },
      {
        id: 22,
        name: "AeroElectronics GmbH",
        location: "Hamburg, Germany",
        size: "300-600",
        specialties: "Aerospace PCB, AS9100, IPC Class 3",
        description: "German precision electronics for aerospace with stringent quality standards",
        certifications: ["AS9100D", "IPC-A-610 Class 3", "EN 9100", "ISO 9001:2015"],
        capabilities: ["Complex PCB assembly", "Box build", "Environmental testing", "DO-254 compliance", "Aerospace certification"],
        experience: "22+ years in aerospace electronics",
        capacity: "Medium-volume (50,000-200,000 boards/month)",
        equipment: ["High-precision SMT", "Flying probe test", "Environmental chambers"],
        founded: 2001,
        employees: 485,
        revenue: "€58-65M annually"
      },
      {
        id: 23,
        name: "Precision Electronics Ltd",
        location: "San Jose, CA, USA",
        size: "400-800",
        specialties: "IPC Class 3, aerospace PCB",
        description: "Silicon Valley electronics manufacturer with aerospace and defense expertise",
        certifications: ["IPC-A-610 Class 3", "AS9100D", "ITAR", "J-STD-001"],
        capabilities: ["High-reliability PCB", "Conformal coating", "Potting services", "Rework & repair", "Full traceability"],
        experience: "18+ years aerospace & defense",
        capacity: "Medium to high-volume (100,000-400,000 boards/month)",
        equipment: ["Mycronic SMT", "3D AOI", "X-ray systems", "ESD protected"],
        founded: 2006,
        employees: 620,
        revenue: "$72-82M annually"
      },
      {
        id: 24,
        name: "SkyCircuits International",
        location: "Toulouse, France",
        size: "250-500",
        specialties: "Aerospace electronics, AS9100",
        description: "French aerospace electronics specialist with European certification expertise",
        certifications: ["AS9100D", "IPC-A-610 Class 3", "EN 9100", "NADCAP Electronics"],
        capabilities: ["Aerospace PCB assembly", "Cable harness", "System integration", "Qualification testing", "Design support"],
        experience: "25+ years in aerospace",
        capacity: "Low to medium-volume (30,000-120,000 boards/month)",
        equipment: ["Advanced SMT lines", "Flying probe", "Boundary scan", "Climate testing"],
        founded: 1998,
        employees: 410,
        revenue: "€48-55M annually"
      }
    ]
  };

  // Get suppliers for current scenario
  const getRelevantSuppliers = () => {
    switch(currentScenario) {
      case 0: return allSuppliers.cnc_automotive;
      case 1: return allSuppliers.medical_devices;
      case 2: return allSuppliers.electronics_pcb;
      default: return allSuppliers.cnc_automotive;
    }
  };

  const suppliers = getRelevantSuppliers();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section - Particle Funnel with AI Wheel */}
      <section 
        data-nav-theme="dark"
        className="relative min-h-screen flex flex-col overflow-hidden bg-hero-background"
      >
        {/* Static Particle Background - Funnel Shape */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{ 
                opacity: [0.15, 1, 0.2, 0.9, 0.15],
              }}
              transition={{
                duration: 1.5 + Math.random() * 1.5,
                delay: particle.delay,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              <div 
                className={`w-full h-full rounded-full ${
                  particle.isGreen 
                    ? "bg-primary" 
                    : "bg-white"
                }`}
              />
            </motion.div>
          ))}


          {/* Red particles pushed away backwards from focal point */}
          {Array.from({ length: 120 }, (_, i) => {
            const angle = Math.PI + (Math.random() - 0.5) * Math.PI * 0.9;
            const startRadius = 15;
            const endRadius = 100 + Math.random() * 80;
            const size = 2 + Math.random() * 4;
            const duration = 1.5 + Math.random() * 2;
            const delay = Math.random() * 4;
            
            return (
              <motion.div
                key={`red-${i}`}
                className="absolute rounded-full bg-destructive"
                style={{
                  width: size,
                  height: size,
                }}
                initial={{
                  left: `calc(55% + ${Math.cos(angle) * startRadius}px)`,
                  top: `calc(50% + ${Math.sin(angle) * startRadius}px)`,
                  opacity: 0,
                }}
                animate={{
                  left: [
                    `calc(55% + ${Math.cos(angle) * startRadius}px)`,
                    `calc(55% + ${Math.cos(angle) * endRadius}px)`,
                  ],
                  top: [
                    `calc(50% + ${Math.sin(angle) * startRadius}px)`,
                    `calc(50% + ${Math.sin(angle) * endRadius}px)`,
                  ],
                  opacity: [0, 1, 0.8, 0],
                  scale: [0.5, 1, 0.8, 0.3],
                }}
                transition={{
                  duration: duration,
                  delay: delay,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeOut",
                }}
              />
            );
          })}

          {/* Particles passing through the iris wheel to the laser line */}
          {Array.from({ length: 30 }, (_, i) => {
            const isGreen = i % 2 === 0; // Alternate green and blue
            const startX = 55; // Start at iris wheel center
            const endX = 75 + Math.random() * 20; // End along the laser line
            const yOffset = (Math.random() - 0.5) * 6; // Slight vertical variation
            const size = 3 + Math.random() * 3;
            const duration = 2 + Math.random() * 1.5;
            const delay = Math.random() * 5;
            
            return (
              <motion.div
                key={`through-${i}`}
                className={`absolute rounded-full ${isGreen ? 'bg-primary' : 'bg-accent'}`}
                style={{
                  width: size,
                  height: size,
                  backgroundColor: isGreen ? '#6EA996' : '#0A7FA5',
                }}
                initial={{
                  left: `${startX}%`,
                  top: `calc(50% + ${yOffset}px)`,
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  left: [`${startX}%`, `${endX}%`],
                  opacity: [0, 1, 1, 0.8, 0],
                  scale: [0.5, 1.2, 1, 0.8, 0.3],
                }}
                transition={{
                  duration: duration,
                  delay: delay,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeOut",
                }}
              />
            );
          })}

          {/* Laser beam with label */}
          <div className="absolute top-1/2 -translate-y-1/2 right-0" style={{ left: "55%" }}>
            {/* Approved Suppliers label */}
            <motion.span
              className="absolute -top-7 left-[11vw] text-sm font-medium tracking-wider uppercase text-white/60 whitespace-nowrap"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              Approved Suppliers
            </motion.span>
            
            {/* The laser beam */}
            <motion.div
              className="h-[3px] w-full"
              style={{
                background: "linear-gradient(90deg, #0A7FA5 0%, #0A7FA5 10%, #6EA996 20%, #6EA996 85%, transparent 100%)",
                boxShadow: "0 0 20px rgba(110, 169, 150, 0.5), 0 0 40px rgba(110, 169, 150, 0.3)",
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "45vw", opacity: 1 }}
              transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
            />
          </div>

          {/* AI Iris Wheel at Focal Point - 2x size */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center"
            style={{ left: "55%", width: 200, height: 200 }}
          >
            {/* Subtle outer glow - 2x size */}
            <div
              className="absolute rounded-full"
              style={{
                width: 280,
                height: 280,
                background: "radial-gradient(circle, rgba(10, 127, 165, 0.15) 0%, transparent 70%)",
              }}
            />
            
            {/* Rotating iris wheel with outward bars - 2x size */}
            <motion.div
              className="absolute"
              style={{ width: 200, height: 200 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {Array.from({ length: 48 }, (_, i) => {
                const angle = (i / 48) * 360;
                const radians = (angle * Math.PI) / 180;
                const innerRadius = 20; // Reduced: Distance from center to bar start
                const barLength = 70; // Longer bars
                
                // Brand colors: 25% each (12 bars per color)
                // Blue (#0A7FA5): 0-11, Amber (#E39B5C): 12-23, Green (#6EA996): 24-35, Red (#AD3D3D): 36-47
                const brandColors = {
                  blue: "#0A7FA5",
                  amber: "#E39B5C",
                  green: "#6EA996",
                  red: "#AD3D3D",
                };
                
                let barColor: string;
                if (i < 12) {
                  barColor = brandColors.blue;
                } else if (i < 24) {
                  barColor = brandColors.amber;
                } else if (i < 36) {
                  barColor = brandColors.green;
                } else {
                  barColor = brandColors.red;
                }
                
                const barWidth = 6; // 2x width
                const barHeight = barLength;
                
                // Position bar at center, then translate outward and rotate
                const x = Math.sin(radians) * (innerRadius + barHeight / 2);
                const y = -Math.cos(radians) * (innerRadius + barHeight / 2);
                
                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      width: barWidth,
                      height: barHeight,
                      backgroundColor: barColor,
                      borderRadius: 3,
                      left: "50%",
                      top: "50%",
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
                      opacity: 1,
                    }}
                  />
                );
              })}
            </motion.div>
            
            {/* Smaller center point */}
            <div
              className="absolute rounded-full"
              style={{
                width: 24,
                height: 24,
                background: "radial-gradient(circle, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.8) 100%)",
                boxShadow: "inset 0 0 10px rgba(10, 127, 165, 0.3)",
              }}
            />
          </div>
        </div>

        {/* Main Content - Archlet Style: Centered vertically, left-aligned */}
        <div className="flex-1 flex items-center relative z-10 pt-32 lg:pt-40">
          <div className="px-6 lg:pl-6 lg:pr-12 xl:pl-12 xl:pr-24 w-full max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-20"
            >
              {/* Eyebrow Text - Archlet Style */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-white/50 text-sm tracking-widest uppercase mb-6"
              >
                Conversational Search
              </motion.p>

              {/* Main Headline - Archlet Style, 2 rows only */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-white max-w-5xl"
              >
                AI-guided<br />
                supplier discovery.
              </motion.h1>

              {/* Subtitle + CTA Container - Right aligned below headline like Archlet */}
              <div className="mt-12 lg:mt-16 lg:ml-[50%] max-w-xl">
                {/* Subtitle with checkmarks */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex flex-wrap gap-4 mb-8"
                >
                  {["25+ million profiles", "Verified data", "Export ready"].map((text, index) => (
                    <div key={index} className="flex items-center gap-2 text-white/70">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm font-medium">{text}</span>
                    </div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Button asChild size="lg">
                    <a href="#">
                      Get Started
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scrolling Client Band */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="bg-black/40 backdrop-blur-sm py-8 overflow-hidden mt-auto relative z-10 border-t border-white/10"
        >
          <div className="relative flex">
            <motion.div
              className="flex gap-16 whitespace-nowrap"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 60,
                  ease: "linear",
                },
              }}
            >
              {[...Array(3)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-16 items-center">
                  {["Siemens", "Bosch", "Schneider Electric", "ABB", "Honeywell", "Emerson"].map((company, idx) => (
                    <span
                      key={idx}
                      className="text-xl font-semibold text-white/40 tracking-wide hover:text-white/60 transition-colors"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

        {/* Interactive Demo Section - White Background */}
        <section className="py-24 bg-white" data-nav-theme="light">
          <div className="container mx-auto px-6 lg:px-20">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="section-headline text-foreground mb-4 max-w-xl">
              Try SearchPro+ in Action
            </h2>
            <p className="text-muted-foreground text-lg">
              Experience AI-powered conversational search
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* Frosted Glass Card */}
            <div className="bg-[#ebebeb] overflow-hidden">
              
              {/* Card Header */}
              <div className="bg-foreground px-6 py-4 flex items-center justify-between">
                <h2 className="text-white text-xl font-bold">SearchPro+</h2>
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">AI-Powered</span>
                </div>
              </div>

              <div className="p-6">
              
              {/* Label */}
              <div className="mb-3 flex-shrink-0">
                <span className="text-primary text-sm font-semibold">
                  Interactive Demo
                </span>
              </div>
              {/* Bold title/description */}
              <h3 className="text-foreground text-xl font-bold mb-6 leading-tight">
                AI-Powered Conversational Search
                <span className="block text-sm font-normal text-muted-foreground mt-2">
                  Step-by-step guidance to find your perfect supplier
                </span>
              </h3>

              {/* Step indicators */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      step <= currentStep
                        ? 'bg-foreground text-white'
                        : 'bg-[#d5d5d5] text-muted-foreground'
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>

              {/* Conversation Thread - Auto-scrolling with dynamic height */}
              <motion.div 
                ref={chatContainerRef}
                className="space-y-4 mb-6 overflow-y-auto bg-white p-4"
                style={{ maxHeight: '600px' }}
                animate={{ opacity: isFading ? 0 : 1 }}
                transition={{ duration: 0.5 }}
              >
                {conversationHistory.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-[#A8C5B8] text-white rounded-br-none'
                          : 'bg-white text-gray-900 rounded-bl-none shadow-sm border border-gray-200'
                      }`}
                    >
                      {msg.role === 'ai' && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 rounded bg-gradient-to-br from-[#B2CDBC] to-[#A0B9A9] flex items-center justify-center">
                            <span className="text-[8px] text-white font-bold">AI</span>
                          </div>
                          <span className="text-xs font-bold text-[#A8C5B8]">YVOO</span>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-line font-medium">{msg.message}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Active AI Response (Typing) */}
                {aiResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[80%] p-4 rounded-2xl bg-white text-gray-900 rounded-bl-none shadow-sm border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded bg-gradient-to-br from-[#B2CDBC] to-[#A0B9A9] flex items-center justify-center">
                          <span className="text-[8px] text-white font-bold">AI</span>
                        </div>
                        <span className="text-xs font-bold text-[#A8C5B8]">YVOO</span>
                        {isTyping && (
                          <div className="flex gap-1 ml-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#A8C5B8] animate-bounce" style={{ animationDelay: '0s' }}></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#A8C5B8] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#A8C5B8] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        )}
                      </div>
                      <p className="text-sm whitespace-pre-line font-medium">{aiResponse}</p>
                    </div>
                  </motion.div>
                )}

                {/* Active User Input (Typing) */}
                {userInput && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end"
                  >
                    <div className="max-w-[80%] p-4 rounded-2xl bg-[#A8C5B8] text-white rounded-br-none">
                      <p className="text-sm font-medium">{userInput}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Results section that overlays next page */}
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isFading ? 0 : 1, y: isFading ? 20 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Check className="w-5 h-5 text-primary" strokeWidth={3} />
                    <span className="font-semibold text-gray-900">4 Matching Suppliers Found</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {suppliers.map((supplier) => (
                      <button
                        key={supplier.id}
                        onClick={() => setSelectedSupplier(supplier)}
                        className="text-left p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-primary hover:shadow-md transition-all group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-black text-gray-900 group-hover:text-primary transition-colors drop-shadow-sm">
                            {supplier.name}
                          </h4>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" strokeWidth={3} />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <span>{supplier.location}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {supplier.certifications.slice(0, 2).map((cert, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full font-bold shadow-sm"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - BeFound KPI Style */}
      <section className="pt-16 md:pt-96 pb-8 md:pb-20 bg-white" data-nav-theme="light">
        <div className="container mx-auto px-4 md:px-6 lg:px-20 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-16"
          >
            <h2 className="section-headline text-foreground mb-3 max-w-3xl">
              Your next supplier, just a click away
            </h2>
          </motion.div>

          {/* KPI Grid 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12">
            {[
              {
                category: "Research efficiency",
                stat: "10x",
                description: "Faster supplier research with AI-based ranking and always up-to-date data"
              },
              {
                category: "Global coverage",
                stat: "25M+",
                description: "Supplier profiles across industries and niche technologies worldwide"
              },
              {
                category: "Search depth",
                stat: "100x",
                description: "More results per query with SearchPro+ for greater variety and higher match rates"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="pb-12"
              >
                <p className="text-sm text-foreground/50 font-mono tracking-wide uppercase mb-2">
                  {item.category}
                </p>
                <div className="border-t border-foreground/20 pt-4">
                  <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-3 tracking-[-0.02em]">
                    {item.stat}
                  </p>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Overview Section - Beyond Discovery */}
      <section className="py-24 px-6 bg-white" data-nav-theme="light">
        <div className="container mx-auto max-w-7xl">
          {/* Section Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-headline text-foreground mb-6 max-w-3xl"
          >
            Beyond discovery: from search to verified partnership
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground mb-20 max-w-2xl"
          >
            Other platforms stop at search results. We take you from discovery through on-site verification to continuous supplier development.
          </motion.p>
          
          {/* Step 1 - AI Discovery */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-primary text-white text-sm font-bold flex items-center justify-center">01</span>
                <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Discovery</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                AI-powered supplier discovery
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Describe your requirements in plain language. Our AI extracts technical specifications, certifications, and capacity needs to find matching suppliers from 25M+ profiles.
              </p>
              <ul className="space-y-3">
                {[
                  "Conversational search understands complex requirements",
                  "Multi-factor matching across 20+ criteria",
                  "Real-time results from verified databases"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/70">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <AISearchMockup />
            </motion.div>
          </div>

          {/* Step 2 - On-Site Audits */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <AuditOrderMockup />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 order-1 lg:order-2"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-primary text-white text-sm font-bold flex items-center justify-center">02</span>
                <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Verification</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Order on-site audits instantly
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Don't rely on self-reported data. Order professional on-site audits directly from the platform. Our certified auditors verify equipment, certifications, and capabilities in person.
              </p>
              <ul className="space-y-3">
                {[
                  "2,500+ certified auditors in 95+ countries",
                  "Process, quality, and full assessment options",
                  "Reports delivered within 5 business days"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/70">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Step 3 - Ground Truth Intelligence */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-primary text-white text-sm font-bold flex items-center justify-center">03</span>
                <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Intelligence</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Ground truth data you can trust
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every audit generates verified intelligence: confirmed equipment, validated certifications, actual production capacity. No more guessing—know exactly what your suppliers can deliver.
              </p>
              <ul className="space-y-3">
                {[
                  "Equipment verified through on-site inspection",
                  "Certificates validated for authenticity and scope",
                  "Capacity confirmed with production evidence"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/70">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <GroundTruthMockup />
            </motion.div>
          </div>

          {/* Step 4 - Supplier Development */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <SupplierDevelopmentMockup />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 order-1 lg:order-2"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-primary text-white text-sm font-bold flex items-center justify-center">04</span>
                <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Development</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Continuous supplier development
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Turn audit findings into improvement actions. Track progress, schedule follow-ups, and monitor supplier development over time. Build partnerships, not just transactions.
              </p>
              <ul className="space-y-3">
                {[
                  "Structured improvement action tracking",
                  "Automated follow-up audit scheduling",
                  "Performance trending and risk monitoring"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/70">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Section - BeFound Style Benefits Cards */}
      <section className="py-16 px-6 bg-white" data-nav-theme="light">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "AI Conversational Workflow",
                description: "7-step intelligent dialogue that transforms vague requirements into precise technical specifications with materials and certifications."
              },
              {
                title: "Triple-Source Architecture",
                description: "Simultaneous search across verified databases, research platforms, and real-time web discovery for comprehensive market coverage."
              },
              {
                title: "Smart Preference Engine",
                description: "AI learns your industry requirements and automatically prioritizes suppliers with relevant certifications and experience."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden"
              >
                <div className="h-2 bg-primary w-full mb-6" />
                <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 AI Features Section - BeFound Style */}
      <section className="py-24 md:py-32 bg-white" data-nav-theme="light">
        <div className="container mx-auto max-w-7xl px-6">
          
          {/* Section Header */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-headline text-foreground mb-6 max-w-3xl"
          >
            Eight features that transform procurement
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground mb-16 max-w-2xl"
          >
            Built to eliminate manual work and deliver precision matching across global supplier networks.
          </motion.p>

          {/* Features Grid - 2x4 Layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                number: "01",
                title: "AI Preference Engine",
                description: "Automatically recognizes your requirements and preferences based on your profile, prioritizing certified suppliers for your industry.",
                detailedExplanation: {
                  overview: "The AI Preference Engine learns from your search history, industry focus, and organizational requirements to intelligently prioritize supplier recommendations.",
                  forEngineers: "Advanced machine learning algorithms analyze technical specifications, material requirements, and process capabilities from your past searches to predict ideal supplier matches.",
                  forBuyers: "The engine automatically filters suppliers based on your company's preferred certifications, geographic preferences, and volume requirements.",
                  forAuditors: "Compliance-first filtering ensures recommended suppliers meet your industry's mandatory certifications before presentation.",
                  example: "Automotive procurement teams searching for precision components will automatically see TS16949-certified suppliers ranked higher."
                }
              },
              {
                number: "02",
                title: "Intelligent Requirement Capture",
                description: "Extracts specifications from natural language or uploaded documents, converting CAD drawings into searchable requirements.",
                detailedExplanation: {
                  overview: "Transform unstructured information into precise, searchable supplier requirements automatically.",
                  forEngineers: "Upload technical drawings and the AI extracts tolerances, material specifications, and geometric tolerances.",
                  forBuyers: "Eliminate hours of manual RFQ preparation. Simply describe what you need in plain language.",
                  forAuditors: "Automatically identify compliance requirements embedded in technical documents.",
                  example: "Upload a valve assembly drawing and the AI extracts material specs, compliance requirements, and testing standards."
                }
              },
              {
                number: "03",
                title: "Multi-Factor Matching",
                description: "Evaluates suppliers across 20+ criteria including industry, location, certifications, capacity, and experience simultaneously.",
                detailedExplanation: {
                  overview: "Simultaneous evaluation across 20+ criteria to identify optimal supplier matches.",
                  forEngineers: "Technical matching evaluates material processing capabilities, tolerance capabilities, and testing equipment.",
                  forBuyers: "Strategic sourcing criteria include MOQs, payment terms, Incoterms, and multi-site capacity.",
                  forAuditors: "Compliance matching cross-references industry certifications and environmental standards.",
                  example: "Sourcing a complex part returns only suppliers meeting ALL criteria, not partial matches."
                }
              },
              {
                number: "04",
                title: "Explainable AI",
                description: "Transparent reasoning for every recommendation, showing exactly why suppliers match your requirements.",
                detailedExplanation: {
                  overview: "Every recommendation includes detailed justification with matching scores and potential gaps.",
                  forEngineers: "See technical match percentages for each requirement with clear gap analysis.",
                  forBuyers: "Understand trade-offs clearly with explanations of why lower-scored options differ.",
                  forAuditors: "Compliance transparency shows certification status, audit dates, and gaps.",
                  example: "Why Supplier X recommended: Technical match 94%, Location +15 points, Certification +20 points."
                }
              },
              {
                number: "05",
                title: "Smart Deduplication",
                description: "Automatically recognizes and merges identical suppliers listed under different names or variations.",
                detailedExplanation: {
                  overview: "Entity resolution identifies when different records refer to the same supplier.",
                  forEngineers: "Consolidates technical data from multiple sources into one complete profile.",
                  forBuyers: "Prevents duplicate RFQs and consolidates past performance data.",
                  forAuditors: "Links certification records across name variations for complete audit histories.",
                  example: "System recognizes 'Müller GmbH' and 'Mueller Group' as the same entity."
                }
              },
              {
                number: "06",
                title: "Dynamic Results",
                description: "Returns only genuinely relevant matches—no filler. If 7 suppliers meet criteria, you see 7, not 50 with poor matches.",
                detailedExplanation: {
                  overview: "Quality over quantity: returns only suppliers that genuinely meet requirements.",
                  forEngineers: "No more sifting through irrelevant suppliers to find qualified ones.",
                  forBuyers: "Receive a pre-qualified list instead of reviewing 50+ suppliers to shortlist 5.",
                  forAuditors: "Only audit-ready suppliers appear, optimizing resource allocation.",
                  example: "Search for specialized valves returns 3 suppliers because only 3 meet ALL criteria."
                }
              },
              {
                number: "07",
                title: "Real-Time Data Enrichment",
                description: "Continuous updating of supplier profiles with verified capabilities, certifications, and ground truth data from audits.",
                detailedExplanation: {
                  overview: "Continuously updated database with verified ground truth from audits.",
                  forEngineers: "Supplier profiles updated after site visits with verified equipment details.",
                  forBuyers: "Access supplier data verified through actual site visits and audits.",
                  forAuditors: "Contribute to and benefit from a growing database of verified information.",
                  example: "After facility audit, profile reflects actual equipment and certifications observed."
                }
              },
              {
                number: "08",
                title: "Alternative Term Discovery",
                description: "Identifies related terms for complete market coverage. 'Die casting' expands to include global equivalents.",
                detailedExplanation: {
                  overview: "AI searches all equivalent terms across regions and languages.",
                  forEngineers: "'CNC milling' also searches 'machining center', 'Fraesen', 'fraisage'.",
                  forBuyers: "'Sheet metal fabrication' includes 'metal stamping', 'presswork'.",
                  forAuditors: "'ISO 9001' includes '2015', '2008 transition', 'EN ISO 9001' variants.",
                  example: "'Investment casting' finds 47 suppliers globally vs 12 with exact term only."
                }
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedAIFeature(feature)}
                className="group cursor-pointer border-t border-foreground/10 pt-6"
              >
                <div className="flex items-start gap-4">
                  <span className="text-sm font-mono text-muted-foreground">{feature.number}</span>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      {feature.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* End-to-End Differentiator Section */}
      <section className="py-20 px-6 bg-background" data-nav-theme="light">
        <div className="container mx-auto max-w-7xl">
          {/* Section Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-headline text-foreground mb-6 max-w-3xl"
          >
            Beyond discovery: the only end-to-end supplier platform
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground mb-16 max-w-2xl"
          >
            Competitors stop at search results. We deliver verified ground truth through audits, continuous intelligence, and supplier development.
          </motion.p>

          {/* End-to-End Pipeline Visual */}
          <div className="grid md:grid-cols-5 gap-4 mb-16">
            {[
              { step: "01", title: "Discovery", description: "AI-powered search across 25M+ suppliers", icon: "🔍" },
              { step: "02", title: "Audits", description: "On-site verification by certified auditors", icon: "✓" },
              { step: "03", title: "Intelligence", description: "Ground truth data from real facility visits", icon: "📊" },
              { step: "04", title: "Development", description: "Continuous supplier improvement tracking", icon: "📈" },
              { step: "05", title: "Control", description: "Ongoing compliance and performance monitoring", icon: "🛡️" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="h-2 bg-primary w-full mb-4" />
                <span className="text-xs font-mono text-muted-foreground">{item.step}</span>
                <h3 className="text-lg font-bold text-foreground mt-1 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section - BeFound 3-Column Style */}
      <section className="py-20 px-6 bg-white" data-nav-theme="light">
        <div className="container mx-auto max-w-7xl">
          {/* Section Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-headline text-foreground mb-12 max-w-3xl"
          >
            From database searches to verified partnerships
          </motion.h2>
          
          <div className="grid lg:grid-cols-3 gap-0 items-stretch">
            {/* Stat Card - Primary Color Background */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary p-8 flex flex-col justify-between aspect-square"
            >
              {/* Icon */}
              <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              
              {/* Stat */}
              <div>
                <p className="text-5xl md:text-6xl font-bold text-white tracking-[-0.02em]">
                  100%
                </p>
                <p className="text-xl text-white/90 font-medium mt-2">
                  verified ground truth data
                </p>
              </div>
            </motion.div>
            
            {/* Portrait Photo - Square */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="aspect-square bg-muted overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80" 
                alt="Michael Weber - VP of Procurement"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Quote Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 flex flex-col justify-center space-y-6 bg-white"
            >
              {/* Company Logo */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-foreground rounded flex items-center justify-center">
                  <span className="text-background text-xs font-bold">TI</span>
                </div>
                <span className="text-lg font-bold text-foreground tracking-wide">TECHNIK INDUSTRIES</span>
              </div>
              
              {/* Quote */}
              <blockquote className="text-lg text-foreground leading-relaxed">
                "Other platforms gave us lists. YVOO gave us verified partners. The on-site audits and continuous intelligence mean we're not just finding suppliers—we're building relationships based on real data, not claims."
              </blockquote>
              
              {/* Attribution */}
              <div>
                <p className="font-semibold text-foreground">Michael Weber,</p>
                <p className="text-sm text-primary">VP of Global Procurement</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - End-to-End Value KPIs */}
      <section className="py-32 px-6 bg-white" data-nav-theme="light">
        <div className="container mx-auto max-w-7xl">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-headline text-foreground max-w-3xl mb-16"
          >
            The complete supplier lifecycle in one platform
          </motion.h2>

          {/* KPI Grid 2x2 */}
          <div className="grid md:grid-cols-2 gap-x-12">
            {/* KPI 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pb-12"
            >
              <p className="text-sm text-foreground/50 font-mono tracking-wide mb-2">Discovery to verification</p>
              <div className="border-t border-foreground/20 pt-4">
                <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-[-0.02em]">
                  5 days
                </p>
                <p className="text-foreground/60 leading-relaxed text-sm">
                  From supplier search to on-site audit completion with verified ground truth
                </p>
              </div>
            </motion.div>

            {/* KPI 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="pb-12"
            >
              <p className="text-sm text-foreground/50 font-mono tracking-wide mb-2">Ground truth audits</p>
              <div className="border-t border-foreground/20 pt-4">
                <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-[-0.02em]">
                  12K+
                </p>
                <p className="text-foreground/60 leading-relaxed text-sm">
                  On-site audits completed with verified equipment, certifications, and capabilities
                </p>
              </div>
            </motion.div>

            {/* KPI 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="pb-12"
            >
              <p className="text-sm text-foreground/50 font-mono tracking-wide mb-2">Supplier development</p>
              <div className="border-t border-foreground/20 pt-4">
                <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-[-0.02em]">
                  35%
                </p>
                <p className="text-foreground/60 leading-relaxed text-sm">
                  Average improvement in supplier performance through continuous monitoring
                </p>
              </div>
            </motion.div>

            {/* KPI 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="pb-12"
            >
              <p className="text-sm text-foreground/50 font-mono tracking-wide mb-2">Risk reduction</p>
              <div className="border-t border-foreground/20 pt-4">
                <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-[-0.02em]">
                  60%
                </p>
                <p className="text-foreground/60 leading-relaxed text-sm">
                  Reduction in supplier quality incidents through proactive intelligence
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <a
              href="https://calendly.com/yvoo/demo-yvoo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 font-mono text-sm font-medium hover:bg-primary/90 transition-colors rounded-lg"
            >
              See the full platform
            </a>
          </motion.div>
        </div>
      </section>

      {/* How Procurement Teams Use YVOO Search - Industry Showcase Section */}
      <section 
        data-nav-theme="light" 
        className="py-24 md:py-32 bg-background"
      >
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          {/* Header - offmenu.design "Projects" Style */}
          <div className="relative">
            {/* Giant Background Text - positioned to sit just above the cards */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex items-end justify-center pointer-events-none overflow-visible mb-[-40px] sm:mb-[-60px] md:mb-[-100px] lg:mb-[-140px]"
            >
              <motion.span 
                style={{ y: useTransform(useScroll().scrollYProgress, [0, 1], [0, -60]) }}
                className="text-[120px] sm:text-[180px] md:text-[260px] lg:text-[340px] font-bold leading-[0.75] tracking-[-0.04em] select-none whitespace-nowrap bg-clip-text text-transparent"
              >
                <span
                  style={{ 
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 700,
                    backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.08) 30%, rgba(0, 0, 0, 0.03) 70%, rgba(0, 0, 0, 0) 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  Projects
                </span>
              </motion.span>
            </motion.div>
          </div>

          {/* Product Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
            {/* Large card - CNC Machined Parts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="md:col-span-2 md:row-span-2 group relative overflow-hidden cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/10]">
                <img 
                  src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80" 
                  alt="CNC Machined Parts"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
                  <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-[10px] font-medium text-white uppercase tracking-wider mb-3">
                    Precision Machining
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1.5 leading-tight">
                    CNC Machined Components
                  </h3>
                  <p className="text-white/70 text-sm line-clamp-2 mb-3">
                    Find IATF 16949 certified suppliers for precision automotive and aerospace parts with 5-axis capabilities.
                  </p>
                  <div className="flex items-center gap-1.5 text-white/80 group-hover:text-white transition-colors">
                    <span className="text-xs font-medium">2,400+ verified suppliers</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Top right - Medical Device Components */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative overflow-hidden cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80" 
                  alt="Medical Device Components"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
                  <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-[10px] font-medium text-white uppercase tracking-wider mb-3">
                    Medical Devices
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-white mb-1.5 leading-tight">
                    Implantable Components
                  </h3>
                  <p className="text-white/70 text-xs line-clamp-2 mb-3">
                    ISO 13485 certified cleanroom manufacturing for surgical instruments and implants.
                  </p>
                  <div className="flex items-center gap-1.5 text-white/80 group-hover:text-white transition-colors">
                    <span className="text-xs font-medium">680+ suppliers</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom right - Electronics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative overflow-hidden cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80" 
                  alt="PCB Assembly"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
                  <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-[10px] font-medium text-white uppercase tracking-wider mb-3">
                    Electronics
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-white mb-1.5 leading-tight">
                    PCB Assembly & EMS
                  </h3>
                  <p className="text-white/70 text-xs line-clamp-2 mb-3">
                    IPC Class 3 certified assembly with full AOI and X-ray inspection capabilities.
                  </p>
                  <div className="flex items-center gap-1.5 text-white/80 group-hover:text-white transition-colors">
                    <span className="text-xs font-medium">1,850+ suppliers</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Full width bottom card - Industrial Valves */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative w-full overflow-hidden cursor-pointer mt-4 md:mt-6 max-w-7xl mx-auto"
          >
            <div className="relative overflow-hidden aspect-[21/9] md:aspect-[3/1]">
              <img 
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80" 
                alt="Industrial Valves & Process Equipment"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 top-0 flex flex-col justify-center p-6 md:p-10 lg:p-12 max-w-xl z-10">
                <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-[10px] font-medium text-white uppercase tracking-wider mb-3 w-fit">
                  Process Industry
                </span>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
                  Industrial Valves & Flow Control
                </h3>
                <p className="text-white/70 text-sm md:text-base line-clamp-2 hidden md:block">
                  Source cryogenic valves, safety relief systems, and control valves from API 6D and EN certified manufacturers.
                </p>
                <div className="flex items-center gap-2 mt-4 text-white/80 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">920+ verified suppliers</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - Matching Homepage Style with Categories */}
      <SearchSuppliersFAQ />

      {/* CTA Section - Matching Homepage Style */}
      <section 
        data-nav-theme="light"
        className="relative py-20 md:py-32 overflow-hidden bg-white"
      >
        <div className="container mx-auto px-6 md:px-4 sm:px-6 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium text-foreground">Start Your Search</span>
              </div>
              
              <h2 className="section-headline text-foreground mb-6">
                Find your next supplier partner
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of procurement professionals discovering and verifying suppliers with AI
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-[#ebebeb] shadow-lg p-3 flex flex-col md:flex-row items-stretch md:items-center gap-3 max-w-3xl mx-auto mb-8"
            >
              <div className="flex items-center gap-3 flex-1 px-4">
                <input
                  type="text"
                  placeholder="What are you looking for? (e.g., CNC machining, ISO 9001...)"
                  className="flex-1 outline-none text-base text-foreground bg-transparent py-3 placeholder:text-muted-foreground"
                />
              </div>
              <Button size="lg" className="group">
                Start Search
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex gap-2 justify-center flex-wrap text-sm text-muted-foreground"
            >
              <span>Popular:</span>
              {["CNC Machining", "Injection Molding", "PCB Assembly", "Metal Stamping"].map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium text-foreground hover:bg-[#e5e5e5] transition-all"
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />

      {/* AI Feature Detail Modal */}
      <FeatureModal 
        feature={selectedAIFeature} 
        onClose={() => setSelectedAIFeature(null)} 
      />

      {/* Supplier Detail Modal */}
      <Dialog open={!!selectedSupplier} onOpenChange={() => setSelectedSupplier(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-4 md:mx-auto">
          {selectedSupplier && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {selectedSupplier.name}
                    </DialogTitle>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-600">
                      <span>{selectedSupplier.location}</span>
                      <span>{selectedSupplier.employees} employees</span>
                      <span>Founded {selectedSupplier.founded}</span>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              {/* Description */}
              <div>
                <p className="text-gray-700 leading-relaxed">{selectedSupplier.description}</p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#ebebeb] p-4">
                    <p className="text-xs text-gray-600 mb-1">Experience</p>
                    <p className="text-lg font-bold text-primary">{selectedSupplier.experience}</p>
                </div>
                <div className="bg-[#ebebeb] p-4">
                    <p className="text-xs text-gray-600 mb-1">Production Capacity</p>
                    <p className="text-sm font-semibold text-gray-700">{selectedSupplier.capacity}</p>
                </div>
                <div className="bg-[#ebebeb] p-4">
                    <p className="text-xs text-gray-600 mb-1">Annual Revenue</p>
                    <p className="text-lg font-bold text-gray-700">{selectedSupplier.revenue}</p>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Certifications & Standards
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSupplier.certifications.map((cert: string) => (
                    <Badge key={cert} className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/30">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Capabilities */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Core Capabilities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedSupplier.capabilities.map((capability: string) => (
                    <div key={capability} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{capability}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Equipment & Technology
                </h3>
                <div className="space-y-2">
                  {selectedSupplier.equipment.map((equip: string) => (
                    <div key={equip} className="flex items-center gap-2 text-sm text-gray-700 p-2 bg-gray-50 rounded-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>{equip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button className="flex-1" size="lg">
                  Request Quote
                </Button>
                <Button variant="outline" className="flex-1" size="lg">
                  Schedule Audit
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchSuppliers;
