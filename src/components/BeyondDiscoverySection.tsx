import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, ArrowRight } from "lucide-react";

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

// AI Discovery Mockup
const AIDiscoveryMockup = () => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const messages = [
    { role: 'ai', text: "What are you looking for?" },
    { role: 'user', text: "CNC machining for automotive brake components" },
    { role: 'ai', text: "What certifications do you require?" },
    { role: 'user', text: "IATF 16949, 50,000 units/month capacity" },
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
                    <span className="text-[10px] font-medium text-primary">AIVOO</span>
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
                <span className="px-2 py-1 bg-white text-[10px] border">Verified ✓</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </WindowChrome>
  );
};

// Audit Order Mockup
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
        <div className="mb-4 pb-3 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-sm">Schedule On-Site Audit</h3>
          <p className="text-[10px] text-gray-500 mt-1">Select suppliers for verification</p>
        </div>

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

        <button className="w-full py-2.5 bg-primary text-white text-xs font-medium flex items-center justify-center gap-2">
          Order Audit for {suppliers.filter(s => s.selected).length} Suppliers
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </WindowChrome>
  );
};

// Ground Truth Mockup  
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
        <div className="flex items-start gap-3 mb-4 pb-3 border-b border-gray-100">
          <div className="w-10 h-10 bg-secondary/20 flex items-center justify-center">
            <Check className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Verified Ground Truth</h3>
            <p className="text-[10px] text-gray-500">Last audit: 3 days ago</p>
          </div>
        </div>

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
                { cert: 'IATF 16949:2016', date: '2026' },
                { cert: 'ISO 9001:2015', date: '2025' },
                { cert: 'ISO 14001', date: '2025' },
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
            </div>
          )}
        </motion.div>
      </div>
    </WindowChrome>
  );
};

// Supplier Development Mockup
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
            </motion.div>
          ))}
        </div>
      </div>
    </WindowChrome>
  );
};

const BeyondDiscoverySection = () => {
  const steps = [
    {
      number: "01",
      label: "Discovery",
      title: "AI-powered supplier discovery",
      description: "Describe requirements in plain language. Our AI finds matching suppliers from 25M+ verified profiles worldwide.",
      features: [
        "Conversational search understands complex requirements",
        "Multi-factor matching across 20+ criteria",
        "Real-time results from verified databases"
      ],
      Mockup: AIDiscoveryMockup
    },
    {
      number: "02",
      label: "Verification",
      title: "Order on-site audits instantly",
      description: "Don't rely on self-reported data. Order professional on-site audits directly. Our certified auditors verify everything in person.",
      features: [
        "2,500+ certified auditors in 95+ countries",
        "Process, quality, and full assessment options",
        "Reports delivered within 5 business days"
      ],
      Mockup: AuditOrderMockup
    },
    {
      number: "03",
      label: "Intelligence",
      title: "Ground truth data you can trust",
      description: "Every audit generates verified intelligence: confirmed equipment, validated certifications, actual production capacity.",
      features: [
        "Equipment verified through on-site inspection",
        "Certificates validated for authenticity",
        "Capacity confirmed with production evidence"
      ],
      Mockup: GroundTruthMockup
    },
    {
      number: "04",
      label: "Development",
      title: "Continuous supplier development",
      description: "Turn audit findings into improvement actions. Track progress, schedule follow-ups, and monitor development over time.",
      features: [
        "Structured improvement action tracking",
        "Automated follow-up audit scheduling",
        "Performance trending and risk monitoring"
      ],
      Mockup: SupplierDevelopmentMockup
    }
  ];

  return (
    <section className="py-24 px-6 bg-white" data-nav-theme="light">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="section-headline text-foreground mb-6 max-w-3xl">
            Beyond discovery: from search to verified partnership
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Other platforms stop at search results. We take you from discovery through on-site verification to continuous supplier development.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`grid lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-primary text-white text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                  <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                    {step.label}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                <ul className="space-y-3">
                  {step.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-foreground/70">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className={`aspect-[4/3] ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
              >
                <step.Mockup />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeyondDiscoverySection;
