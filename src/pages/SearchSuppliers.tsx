import { motion, useInView } from "framer-motion";
import { Check, Search, Save, FileText, Globe, Cpu, TrendingUp, Users, Clock, Target, Zap, Shield, CheckCircle2, ArrowRight, Sparkles, MapPin, Award, Factory, X, Settings, ShoppingCart, Lightbulb, MessageSquare } from "lucide-react";
import { PixelIcon } from "@/components/PixelIcon";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";

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
  const [selectedAIFeature, setSelectedAIFeature] = useState<number | null>(null);

  // Three different search scenarios - rotating industries
  const scenarios = [
    {
      steps: [
        {
          step: 1,
          aiPrompt: "What type of product or service are you looking for?",
          userResponse: "CNC machining",
          aiFollowUp: "I understand you're looking for CNC machining. Let me help you refine this. Are you specifically interested in: • Precision CNC machining • Multi-axis CNC operations • High-volume CNC production • Or general CNC machining services?"
        },
        {
          step: 2,
          aiPrompt: "Great! For precision CNC machining, what industry standards or certifications are important for your project?",
          userResponse: "ISO 9001 for automotive",
          aiFollowUp: "Perfect! For automotive applications with ISO 9001, I also recommend considering: • IATF 16949 (automotive quality standard) • TS 16949 (technical specification) • AS9100 (if aerospace crossover) Would you like suppliers with any of these additional certifications?"
        },
        {
          step: 3,
          aiPrompt: "Excellent! Now let me find suppliers matching your requirements: Precision CNC machining + ISO 9001 + Automotive sector + Optional IATF 16949",
          userResponse: "Yes, show me the results",
          aiFollowUp: ""
        }
      ]
    },
    {
      steps: [
        {
          step: 1,
          aiPrompt: "What type of product or service are you looking for?",
          userResponse: "Medical device components",
          aiFollowUp: "I see you need medical device components. Let me help narrow this down. Are you looking for: • Surgical instruments • Implantable components • Diagnostic equipment parts • Or general medical-grade components?"
        },
        {
          step: 2,
          aiPrompt: "Perfect! For implantable components, what certifications and regulatory requirements do you need?",
          userResponse: "ISO 13485 and FDA registered",
          aiFollowUp: "Excellent choice! For medical implants, I also suggest: • GMP compliance • Cleanroom manufacturing (Class 7 or better) • Biocompatibility testing • Material traceability Would you like suppliers with these capabilities?"
        },
        {
          step: 3,
          aiPrompt: "Great! Let me find suppliers with: Implantable medical components + ISO 13485 + FDA registered + Cleanroom facilities",
          userResponse: "Show me the options",
          aiFollowUp: ""
        }
      ]
    },
    {
      steps: [
        {
          step: 1,
          aiPrompt: "What type of product or service are you looking for?",
          userResponse: "Electronics assembly",
          aiFollowUp: "I understand you need electronics assembly. Let me help specify this. Are you interested in: • PCB assembly (SMT/THT) • Box build assembly • Cable & wire harness • Or complete system integration?"
        },
        {
          step: 2,
          aiPrompt: "Excellent! For PCB assembly, what quality standards and capabilities do you require?",
          userResponse: "IPC-A-610 Class 3 for aerospace",
          aiFollowUp: "Perfect for aerospace! For IPC-A-610 Class 3, I recommend also considering: • AS9100 certification • Conformal coating • X-ray inspection • ESD protected environment Would these additional capabilities be valuable?"
        },
        {
          step: 3,
          aiPrompt: "Outstanding! Searching for suppliers with: PCB Assembly + IPC-A-610 Class 3 + AS9100 + Aerospace capabilities",
          userResponse: "Yes, find them",
          aiFollowUp: ""
        }
      ]
    }
  ];

  useEffect(() => {
    const runConversation = () => {
      const steps = scenarios[currentScenario].steps;
      
      setTimeout(() => {
        typeAiMessage(steps[0].aiPrompt, () => {
          setTimeout(() => {
            typeUserMessage(steps[0].userResponse, () => {
              setTimeout(() => {
                typeAiMessage(steps[0].aiFollowUp, () => {
                  setTimeout(() => {
                    setCurrentStep(2);
                    typeAiMessage(steps[1].aiPrompt, () => {
                      setTimeout(() => {
                        typeUserMessage(steps[1].userResponse, () => {
                          setTimeout(() => {
                            typeAiMessage(steps[1].aiFollowUp, () => {
                              setTimeout(() => {
                                setCurrentStep(3);
                                typeAiMessage(steps[2].aiPrompt, () => {
                                  setTimeout(() => {
                                    setShowResults(true);
                                    // Wait 5 seconds after results, then fade out and restart
                                    setTimeout(() => {
                                      setIsFading(true);
                                      setTimeout(() => {
                                        setShowResults(false);
                                        setConversationHistory([]);
                                        setCurrentStep(1);
                                        setIsFading(false);
                                        setCurrentScenario((prev) => (prev + 1) % scenarios.length);
                                      }, 500);
                                    }, 5000);
                                  }, 1000);
                                });
                              }, 1500);
                            });
                          }, 1000);
                        });
                      }, 1500);
                    });
                  }, 1000);
                });
              }, 1500);
            });
          }, 1000);
        });
      }, 500);
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

  const suppliers = [
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
      description: "Advanced manufacturing facility specializing in precision injection molding and CNC machining",
      certifications: ["IATF 16949:2016", "ISO 9001:2015", "ISO 13485"],
      capabilities: ["CNC machining", "Injection molding", "Tool & die making", "Assembly services", "Quality control"],
      experience: "18+ years in automotive and medical sectors",
      capacity: "High-volume production (100,000+ units/month)",
      equipment: ["Haas CNC machines", "Injection molding presses", "Automated inspection"],
      founded: 2005,
      employees: 720,
      revenue: "¥280-300M annually"
    },
    {
      id: 3,
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
      id: 4,
      name: "AeroTech Components",
      location: "Toulouse, France",
      size: "500-1000",
      specialties: "Aerospace, AS9100, NADCAP",
      description: "Aerospace components manufacturer with advanced materials expertise",
      certifications: ["AS9100D", "NADCAP", "ISO 9001:2015", "EN 9100"],
      capabilities: ["5-axis CNC machining", "Titanium & exotic materials", "Heat treatment", "Non-destructive testing", "Special processes"],
      experience: "30+ years in aerospace industry",
      capacity: "Low to medium-volume production (2,000-25,000 units/month)",
      equipment: ["Advanced 5-axis machines", "Aerospace-grade inspection", "Heat treatment facilities"],
      founded: 1993,
      employees: 650,
      revenue: "€85-95M annually"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section - Green Background */}
      <section 
        data-nav-theme="primary"
        className="relative pt-32 md:pt-40 pb-20 md:pb-32 overflow-visible bg-primary"
        style={{ 
          minHeight: "70vh"
        }}
      >
        <div className="container mx-auto px-6 md:px-4 sm:px-6 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-start">
            {/* Left Content - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-8 border border-white/20 backdrop-blur-sm"
              >
                <Cpu className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white tracking-wide uppercase">AI-Powered Discovery</span>
              </motion.div>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-white mb-10" style={{ fontWeight: 800 }}>
                <span className="block">Find suppliers</span>
                <span className="block">worldwide.</span>
              </h1>
              
              <div className="space-y-5 mb-10">
                {[
                  "25M+ global suppliers",
                  "Real-time verification",
                  "Instant export"
                ].map((text, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3 text-white/90"
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-lg md:text-xl font-medium">{text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Interactive Demo Search - Takes 3 columns - Desktop Only */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block lg:col-span-3 relative"
              style={{ 
                transform: 'translateY(calc(40% + 4cm))',
                zIndex: 10
              }}
            >
              {/* Modern white card matching YVOO design */}
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                
                {/* Black Navigation Bar - SearchPro+ */}
                <div className="bg-gray-900 px-6 py-4 rounded-t-3xl flex items-center justify-between">
                  <h2 className="text-white text-xl font-bold">SearchPro+</h2>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-[#A8C5B8]" />
                    <span className="text-white text-sm">AI-Powered</span>
                  </div>
                </div>

                <div className="p-6">
                
                {/* Teal label */}
                <div className="mb-3 flex-shrink-0">
                  <span className="text-[#A8C5B8] text-sm font-semibold">
                    Interactive Demo
                  </span>
                </div>
                {/* Bold title/description */}
                <h3 className="text-gray-900 text-xl font-bold mb-6 leading-tight">
                  AI-Powered Conversational Search
                  <span className="block text-sm font-normal text-gray-600 mt-2">
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
                          ? 'bg-[#A8C5B8] text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {step}
                    </div>
                  ))}
                </div>

                {/* Conversation Thread - Enhanced rounded corners */}
                <motion.div 
                  ref={chatContainerRef}
                  className="space-y-4 mb-6 max-h-96 overflow-y-auto bg-white p-4 scroll-smooth"
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
                            <div className="w-5 h-5 rounded bg-gradient-to-br from-[#A8C5B8] to-[#96B8AD] flex items-center justify-center">
                              <Cpu className="w-3 h-3 text-white" />
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
                          <div className="w-5 h-5 rounded bg-gradient-to-br from-[#A8C5B8] to-[#96B8AD] flex items-center justify-center">
                            <Cpu className="w-3 h-3 text-white" />
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
                      <CheckCircle2 className="w-5 h-5 text-[#A8C5B8]" />
                      <span className="font-semibold text-gray-900">4 Matching Suppliers Found</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {suppliers.map((supplier) => (
                        <button
                          key={supplier.id}
                          onClick={() => setSelectedSupplier(supplier)}
                          className="text-left p-4 bg-white border border-gray-200 rounded-2xl hover:border-[#A8C5B8] hover:shadow-md transition-all group"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-bold text-gray-900 group-hover:text-[#A8C5B8] transition-colors">
                              {supplier.name}
                            </h4>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#A8C5B8] group-hover:translate-x-1 transition-all" />
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>{supplier.location}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {supplier.certifications.slice(0, 2).map((cert, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-[#A8C5B8]/10 text-[#A8C5B8] text-xs rounded-full font-medium"
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
          
          {/* Left side text overlay - removed to prevent overlap */}
        </div>
      </section>

      {/* Interactive Demo Chat Section - Mobile & Tablet Only */}
      <section className="lg:hidden py-12 bg-white" data-nav-theme="light">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#A8C5B8]"></div>
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Interactive Demo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-[#A8C5B8]">Try SearchPro+</span>
              <br />
              <span className="text-gray-900">in Action</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Experience AI-powered conversational search
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* Modern white card matching YVOO design */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              
              {/* Black Navigation Bar - SearchPro+ */}
              <div className="bg-gray-900 px-6 py-4 rounded-t-3xl flex items-center justify-between">
                <h2 className="text-white text-xl font-bold">SearchPro+</h2>
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#A8C5B8]" />
                  <span className="text-white text-sm">AI-Powered</span>
                </div>
              </div>

              <div className="p-6">
              
              {/* Teal label */}
              <div className="mb-3 flex-shrink-0">
                <span className="text-[#A8C5B8] text-sm font-semibold">
                  Interactive Demo
                </span>
              </div>
              {/* Bold title/description */}
              <h3 className="text-gray-900 text-xl font-bold mb-6 leading-tight">
                AI-Powered Conversational Search
                <span className="block text-sm font-normal text-gray-600 mt-2">
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
                        ? 'bg-[#A8C5B8] text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>

              {/* Conversation Thread - Enhanced rounded corners */}
              <motion.div 
                ref={chatContainerRef}
                className="space-y-4 mb-6 max-h-96 overflow-y-auto bg-white p-4 scroll-smooth"
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
                          <div className="w-5 h-5 rounded bg-gradient-to-br from-[#A8C5B8] to-[#96B8AD] flex items-center justify-center">
                            <Cpu className="w-3 h-3 text-white" />
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
                        <div className="w-5 h-5 rounded bg-gradient-to-br from-[#A8C5B8] to-[#96B8AD] flex items-center justify-center">
                          <Cpu className="w-3 h-3 text-white" />
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
                    <CheckCircle2 className="w-5 h-5 text-[#A8C5B8]" />
                    <span className="font-semibold text-gray-900">4 Matching Suppliers Found</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {suppliers.map((supplier) => (
                      <button
                        key={supplier.id}
                        onClick={() => setSelectedSupplier(supplier)}
                        className="text-left p-4 bg-white border border-gray-200 rounded-2xl hover:border-[#A8C5B8] hover:shadow-md transition-all group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-gray-900 group-hover:text-[#A8C5B8] transition-colors">
                            {supplier.name}
                          </h4>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#A8C5B8] group-hover:translate-x-1 transition-all" />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{supplier.location}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {supplier.certifications.slice(0, 2).map((cert, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-[#A8C5B8]/10 text-[#A8C5B8] text-xs rounded-full font-medium"
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

      {/* Stats Section - Extra padding to prevent overlap */}
      <section className="pt-16 md:pt-96 pb-8 md:pb-20 bg-white" data-nav-theme="light">
        <div className="container mx-auto px-4 md:px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#A8C5B8]"></div>
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Benefits</span>
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 px-4">
              <span className="text-[#A8C5B8]">Your next supplier,</span>
              <br />
              <span className="text-black">just a click away.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                stat: "10x",
                title: "faster supplier research",
                features: ["Filtered results", "AI-based ranking systems", "Always up-to-date"],
                gradient: "from-[#A8BFC5] to-[#96ADB8]"
              },
              {
                stat: "25M+",
                title: "supplier profiles",
                features: ["Global transparency", "Niche technologies", "Cross-sector searches"],
                gradient: "from-[#A8C5B8] to-[#96B8AD]"
              },
              {
                stat: "100x",
                title: "more results per query with SearchPro+",
                features: ["Greater variety in supplier profiles", "Better comparison opportunities", "Higher match rate"],
                gradient: "from-[#A8BFC5] to-[#96ADB8]"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all h-full border-0 overflow-hidden relative">
                  {/* Gradient accent bar on top */}
                  <div className={`h-1.5 md:h-2 bg-gradient-to-r ${item.gradient}`}></div>
                  
                  <CardHeader className="relative p-4 md:p-6">
                    {/* Background gradient glow */}
                    <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${item.gradient} rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                    
                    <CardTitle className="text-[#A8C5B8] text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 relative z-10">{item.stat}</CardTitle>
                    <CardDescription className="text-black text-base md:text-lg lg:text-xl font-semibold relative z-10">{item.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    <ul className="space-y-2 md:space-y-3">
                      {item.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          className="flex items-center gap-2 md:gap-3 text-gray-600 text-sm md:text-base"
                        >
                          <div className="w-4 h-4 md:w-5 md:h-5 bg-[#A8C5B8]/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#A8C5B8]" />
                          </div>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Overview Section */}
      <section 
        className="py-8 md:py-20 bg-white"
        data-nav-theme="light"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-12"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#A8C5B8]"></div>
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Process</span>
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">
              <span className="text-[#A8C5B8]">Product</span>
              <br />
              <span className="text-black">Overview.</span>
            </h2>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 md:gap-4 mb-6 md:mb-8 flex-wrap">
            {[
              { id: "search", label: "1 Search", icon: Search },
              { id: "save", label: "2 Save", icon: Save },
              { id: "export", label: "3 Export", icon: FileText }
            ].map((tab, index) => (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-2xl text-sm md:text-base font-semibold transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-white text-[#A8C5B8] shadow-lg border-2 border-[#A8C5B8]/20 scale-105"
                    : "bg-white/50 text-gray-600 hover:bg-white hover:shadow-md"
                }`}
              >
                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                  activeTab === tab.id ? "bg-[#A8C5B8]/10" : "bg-gray-100"
                }`}>
                  <tab.icon className={`w-3 h-3 md:w-4 md:h-4 ${activeTab === tab.id ? "text-[#A8C5B8]" : "text-gray-500"}`} />
                </div>
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl border border-gray-100"
            >
              {activeTab === "search" && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    {[
                      { name: "Kenna Metal Inc.", location: "Chicago, USA", year: "1973" },
                      { name: "DuPont SARL", location: "Paris, France", year: "1896" },
                      { name: "CRH Automotive", location: "Munich, Germany", year: "2005" }
                    ].map((company, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#A8C5B8]/5 to-transparent rounded-2xl hover:from-[#A8C5B8]/10 transition-all group"
                      >
                        <div className="w-10 h-10 bg-[#A8C5B8]/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <CheckCircle2 className="w-5 h-5 text-[#A8C5B8]" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{company.name}</p>
                          <p className="text-sm text-gray-500">{company.location} • {company.year}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <Button className="bg-gradient-to-r from-[#A8C5B8] to-[#96B8AD] text-white hover:from-[#96B8AD] hover:to-[#8AA7A0] rounded-full w-full py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    Save to list
                  </Button>
                </div>
              )}
              {activeTab === "save" && (
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-br from-[#A8C5B8]/5 to-gray-50 rounded-2xl border border-[#A8C5B8]/20">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#A8C5B8]/20 rounded-full flex items-center justify-center">
                        <Save className="w-5 h-5 text-[#A8C5B8]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-2">Local List - Automotive Supplier EMEA</p>
                        <p className="text-sm text-gray-600">Contains all contacts gathered during the Automotive Sector for Europe.</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="rounded-full text-[#A8C5B8] border-[#A8C5B8]/30 hover:bg-[#A8C5B8]/10">Share</Button>
                      <Button variant="outline" size="sm" className="rounded-full text-[#A8C5B8] border-[#A8C5B8]/30 hover:bg-[#A8C5B8]/10">Edit</Button>
                      <Button variant="outline" size="sm" className="rounded-full text-red-500 border-red-300 hover:bg-red-50">Delete</Button>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "export" && (
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed">Export your supplier lists in multiple formats for seamless integration with your existing systems.</p>
                  <div className="flex gap-3 flex-wrap">
                    {["CSV", "Excel", "PDF", "JSON"].map((format, index) => (
                      <motion.div
                        key={format}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button variant="outline" className="rounded-full border-[#A8C5B8]/30 text-[#A8C5B8] hover:bg-[#A8C5B8]/10 px-6 py-3">
                          <FileText className="w-4 h-4 mr-2" />
                          {format}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Key suppliers always in sight</h3>
              <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
                You can easily create lists of suppliers tailored to your business needs and continuously add new ones as you discover them. Your entire team can access the platform and collaborate effortlessly – keeping everyone on the same page and fully aligned.
              </p>
              <Button className="bg-gradient-to-r from-[#A8C5B8] to-[#96B8AD] hover:from-[#96B8AD] hover:to-[#8AA7A0] text-white rounded-full px-6 md:px-8 py-4 md:py-6 text-sm md:text-base shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
                Get Started
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Section - Minimalist Design */}
      <section className="py-16 md:py-32 bg-white relative" data-nav-theme="light">
        <div className="container mx-auto px-4 md:px-6 lg:px-20">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-16 md:mb-24"
          >
            <p className="text-sm font-medium text-[#A8C5B8] mb-4 tracking-wide uppercase">Technology Stack</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Built for precision, <br />powered by AI
            </h2>
          </motion.div>

          {/* Technology Flow */}
          <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8 lg:gap-12">
            
            {/* Feature 1 - AI Conversational Workflow */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative"
            >
              {/* Number Badge */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-900 font-bold text-lg mb-6 group-hover:bg-[#A8C5B8] group-hover:text-white transition-colors duration-300">
                01
              </div>
              
              {/* Icon */}
              <div className="mb-6">
                <MessageSquare className="w-10 h-10 md:w-12 md:h-12 text-gray-900" strokeWidth={1.5} />
              </div>
              
              {/* Content */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                AI Conversational Workflow
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                7-step intelligent dialogue that transforms vague requirements into precise technical specifications with materials and certifications.
              </p>
              
              {/* Hover Arrow */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 0 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="hidden md:block absolute -right-6 top-20 text-gray-300"
              >
                <ArrowRight className="w-6 h-6" strokeWidth={1.5} />
              </motion.div>
            </motion.div>

            {/* Feature 2 - Triple-Source Search */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative"
            >
              {/* Number Badge */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-900 font-bold text-lg mb-6 group-hover:bg-[#A8C5B8] group-hover:text-white transition-colors duration-300">
                02
              </div>
              
              {/* Icon */}
              <div className="mb-6">
                <Globe className="w-10 h-10 md:w-12 md:h-12 text-gray-900" strokeWidth={1.5} />
              </div>
              
              {/* Content */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Triple-Source Architecture
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Simultaneous search across verified databases, research platforms, and real-time web discovery for comprehensive market coverage.
              </p>
              
              {/* Hover Arrow */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 0 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="hidden md:block absolute -right-6 top-20 text-gray-300"
              >
                <ArrowRight className="w-6 h-6" strokeWidth={1.5} />
              </motion.div>
            </motion.div>

            {/* Feature 3 - Smart Preference Engine */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group"
            >
              {/* Number Badge */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-900 font-bold text-lg mb-6 group-hover:bg-[#A8C5B8] group-hover:text-white transition-colors duration-300">
                03
              </div>
              
              {/* Icon */}
              <div className="mb-6">
                <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-gray-900" strokeWidth={1.5} />
              </div>
              
              {/* Content */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Smart Preference Engine
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                AI learns your industry requirements and automatically prioritizes suppliers with relevant certifications and experience.
              </p>
            </motion.div>
          </div>

          {/* Bottom Accent Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 md:mt-24 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent origin-left"
          />
        </div>
      </section>

      {/* 7 AI Features Section - Minimalist Design */}
      <section className="py-16 md:py-32 bg-gradient-to-b from-gray-50 to-white" data-nav-theme="light">
        <div className="container mx-auto px-4 md:px-6 lg:px-20">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16 md:mb-24"
          >
            <p className="text-sm font-medium text-[#A8C5B8] mb-4 tracking-wide uppercase">AI Capabilities</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Eight features that transform <br />procurement intelligence
            </h2>
            <p className="text-lg text-gray-600">
              Built to eliminate manual work and deliver precision matching across global supplier networks.
            </p>
          </motion.div>

          {/* Features List */}
          <div className="space-y-4 md:space-y-6">
            {[
              {
                number: "01",
                title: "AI Preference Engine",
                description: "Automatically recognizes your requirements and preferences based on your profile, prioritizing certified suppliers for your industry.",
                detailedExplanation: {
                  overview: "The AI Preference Engine learns from your search history, industry focus, and organizational requirements to intelligently prioritize supplier recommendations.",
                  forEngineers: "Advanced machine learning algorithms analyze technical specifications, material requirements, and process capabilities from your past searches to predict ideal supplier matches. The system maintains a technical profile that evolves with each interaction, ensuring increasingly accurate recommendations.",
                  forBuyers: "The engine automatically filters suppliers based on your company's preferred certifications, geographic preferences, and volume requirements. This eliminates manual screening and accelerates qualified supplier identification.",
                  forAuditors: "Compliance-first filtering ensures recommended suppliers meet your industry's mandatory certifications before presentation. The system tracks which quality standards your organization typically requires (ISO 9001, IATF 16949, AS9100, etc.) and prioritizes accordingly.",
                  example: "Example: Automotive procurement teams searching for precision components will automatically see TS16949-certified suppliers ranked higher, while pharmaceutical buyers will see GMP-certified manufacturers prioritized—without manual filter configuration."
                }
              },
              {
                number: "02",
                title: "Intelligent Requirement Capture",
                description: "Extracts specifications from natural language or uploaded documents, converting CAD drawings into searchable requirements.",
                detailedExplanation: {
                  overview: "Transform unstructured information—whether typed descriptions, uploaded PDFs, or technical drawings—into precise, searchable supplier requirements automatically.",
                  forEngineers: "Upload technical drawings (PDF, DWG, STEP files) and the AI extracts tolerances, material specifications (e.g., 'AISI 316L stainless steel'), surface finish requirements (Ra values), and geometric tolerances (GD&T symbols). Natural language processing converts phrases like 'high-strength aluminum alloy' into specific standards (e.g., 6061-T6, 7075-T651).",
                  forBuyers: "Eliminate hours of manual RFQ preparation. Simply describe what you need in plain language or forward a technical email from engineering, and the system structures all requirements automatically. This accelerates your RFQ cycles significantly.",
                  forAuditors: "Automatically identify compliance requirements embedded in technical documents. The system flags certifications, testing standards (e.g., 'ASTM E8 tensile testing'), and regulatory references (e.g., 'FDA 21 CFR Part 820'), ensuring nothing is overlooked in supplier qualification.",
                  example: "Example: An engineer uploads a valve assembly drawing with technical annotations. The AI extracts: '316L stainless steel, pressure rating PN40, DIN EN 12516-2 compliance, helium leak test to 1×10⁻⁹ mbar·l/s' and immediately searches for suppliers with these exact capabilities."
                }
              },
              {
                number: "03",
                title: "Multi-Factor Matching",
                description: "Evaluates suppliers across 20+ criteria including industry, location, certifications, capacity, and experience simultaneously.",
                detailedExplanation: {
                  overview: "Simultaneous evaluation across 20+ criteria including technical capabilities, certifications, geographic proximity, production capacity, and industry experience to identify optimal supplier matches.",
                  forEngineers: "Technical matching evaluates: material processing capabilities (e.g., 'titanium machining'), tolerance capabilities (±0.005mm), surface treatments (anodizing, passivation), testing equipment (CMM, X-ray, ultrasonic), and process certifications (welding qualifications, heat treatment procedures). Weight factors can be adjusted for critical vs. desirable capabilities.",
                  forBuyers: "Strategic sourcing criteria include: minimum order quantities (MOQs), payment terms, Incoterms preferences, and multi-site production capacity. Location-based matching considers logistics costs, trade compliance, and supply chain risk diversification (e.g., 'two qualified suppliers minimum 500km apart').",
                  forAuditors: "Compliance matching cross-references: industry certifications (automotive, aerospace, medical device), environmental standards (ISO 14001, RoHS, REACH), social responsibility audits (SMETA, SA8000), and customer-specific approvals. The system flags suppliers with recent certification renewals and clean audit histories.",
                  example: "Example: Sourcing a complex stamped part requiring: automotive steel (HSLA), 8,000 tons press capacity, TS16949 + ISO 14001, within 300km of assembly plant, capable of 50,000 units/month. The system returns only 3 suppliers meeting ALL criteria, not 200 partial matches."
                }
              },
              {
                number: "04",
                title: "Explainable AI",
                description: "Transparent reasoning for every recommendation, showing exactly why suppliers match your requirements.",
                detailedExplanation: {
                  overview: "Every supplier recommendation includes a detailed justification showing exactly why the AI selected that supplier, with transparency into matching scores, strengths, and potential gaps.",
                  forEngineers: "See technical match percentages for each requirement: '95% capability match—has 5-axis CNC (required), titanium experience (required), but lacks NADCAP heat treatment (optional)'. This allows informed decisions about whether gaps are acceptable or deal-breakers. No black box recommendations.",
                  forBuyers: "Understand trade-offs clearly: 'Supplier A: 95% match vs. Supplier B: 85% match'. Explanations highlight which requirements are not met in lower-scored options, enabling strategic sourcing decisions rather than just picking the top score.",
                  forAuditors: "Compliance transparency shows certification status, audit dates, and gaps: 'ISO 9001 valid until 2026, IATF audit passed March 2024 with zero major findings, ISO 14001 pending renewal (expires June 2025)'. This enables risk assessment and pre-qualification prioritization.",
                  example: "Example: Why Supplier X recommended for brake component: Technical match 94% (has required friction testing per ECE R90), Location +15 points (within regional proximity), Certification +20 points (IATF 16949:2016 current), Experience +10 points (5 years automotive brake systems), Capacity verified for required volume. Gap: No in-house coating, uses qualified subcontractor."
                }
              },
              {
                number: "05",
                title: "Smart Deduplication",
                description: "Automatically recognizes and merges identical suppliers listed under different names or variations.",
                detailedExplanation: {
                  overview: "Advanced entity resolution technology identifies when different company names, addresses, or records refer to the same supplier, preventing duplicate outreach and consolidating supplier information.",
                  forEngineers: "Consolidates technical data from multiple sources: if 'Müller GmbH' appears in your ERP, 'Mueller Precision Engineering' in a certification database, and 'Müller Group' on their website, the system merges all capability data into one complete profile. This ensures you see all equipment, certifications, and technical capabilities in a single view.",
                  forBuyers: "Prevents embarrassing duplicate RFQs to the same supplier under different names. Consolidates past performance data and contract terms across all name variations. Also identifies subsidiary relationships—knowing that 'ABC Components' is owned by 'XYZ Corporation' helps with spend consolidation and strategic sourcing decisions.",
                  forAuditors: "Links certification records across name variations, ensuring audit histories aren't fragmented. Identifies when a supplier operates multiple facilities under different names, allowing proper audit planning for all locations. Also flags company name changes due to acquisitions or restructuring that might affect certification validity.",
                  example: "Example: A procurement team has interacted with: 'Müller GmbH' (2019 contract), 'J. Müller Metallverarbeitung' (2021 quote), and 'Mueller Group' (2023 capability inquiry). The system recognizes these as the same entity, merges all interaction history, and shows: one consolidated supplier profile with complete history, avoiding duplicate outreach."
                }
              },
              {
                number: "06",
                title: "Dynamic Results",
                description: "Returns only genuinely relevant matches—no filler. If 7 suppliers meet criteria, you see 7, not 50 with poor matches.",
                detailedExplanation: {
                  overview: "Quality over quantity: the system returns only suppliers that genuinely meet your requirements, even if that's just 3 suppliers instead of padding results to 50 with poor matches.",
                  forEngineers: "No more sifting through 100+ irrelevant suppliers to find 5 qualified ones. If you need 'titanium investment casting with NADCAP approval', and only 8 suppliers globally meet this, you get those 8—not 92 steel casting companies to hit a 100-result quota. This respects your technical judgment and time.",
                  forBuyers: "Dramatically reduces qualification effort. Instead of reviewing 50+ suppliers to shortlist 5, you receive a pre-qualified list of 5-12 that actually meet requirements. For highly specialized needs (e.g., 'aerospace honeycomb panel fabrication'), seeing '4 suppliers match your criteria' is more valuable than artificially inflating to 40 poor matches.",
                  forAuditors: "Only audit-ready suppliers appear in results. If you require ISO 13485 + FDA registration + cleanroom manufacturing, and only 6 suppliers meet this, you audit 6 qualified candidates—not waste resources pre-qualifying 30 companies missing critical certifications. This optimizes audit scheduling and resource allocation.",
                  example: "Search: 'LNG cryogenic valves, -196°C rated, EN 1626 certified, ASME VIII Div 1, minimum DN50, European manufacturing'. Result: 3 suppliers shown. Because only 3 suppliers globally meet ALL criteria. Not 47 results with footnotes like '*DN25 maximum' or '*ASME certification pending' just to show more names."
                }
              },
              {
                number: "07",
                title: "Real-Time Data Enrichment",
                description: "Continuous updating of supplier profiles with verified capabilities, certifications, and ground truth data from audits.",
                detailedExplanation: {
                  overview: "YVOO maintains a continuously updated database of supplier capabilities, certifications, and performance metrics. After audits and site visits, supplier profiles are enriched with verified ground truth data.",
                  forEngineers: "Engineers need confidence that supplier certifications and capabilities are current. YVOO updates supplier profiles after site visits with verified equipment details, actual production capabilities, and real facility observations. When capabilities are verified through on-site inspection, this validated information is reflected in search results.",
                  forBuyers: "Procurement teams can access supplier data that has been verified through actual site visits and audits. YVOO enriches profiles with real-world observations about capacity, financial stability indicators, and facility conditions. This reduces supplier qualification time and minimizes the risk of engaging with suppliers whose claimed capabilities don't match reality.",
                  forAuditors: "Quality assurance teams contribute to and benefit from a growing database of verified supplier information. After completing audits, findings are used to update supplier profiles with actual compliance status, facility conditions, and quality system maturity. Full audit reports are only available after audits are completed. This creates a knowledge base of verified supplier intelligence that improves over time.",
                  example: "Example: After completing a facility audit, YVOO updates the supplier profile to reflect the actual production equipment observed, verified certifications seen on-site, and real facility conditions. Future searches benefit from this ground truth data rather than relying solely on supplier-provided claims."
                }
              },
              {
                number: "08",
                title: "Alternative Term Discovery",
                description: "Identifies related terms for complete market coverage. 'Die casting' automatically expands to 'Pressure Die Casting', 'Permanent Mold Casting', etc.",
                detailedExplanation: {
                  overview: "Manufacturing processes and materials are described differently across regions, industries, and languages. The AI automatically searches all equivalent terms to ensure no qualified suppliers are missed due to terminology differences.",
                  forEngineers: "Technical synonym expansion ensures comprehensive results: 'CNC milling' also searches 'machining center', 'Fraesen' (German), 'fraisage' (French). Material variations: 'aluminum' finds 'aluminium' (UK/EU), '6061-T6' also searches 'AlMgSi1 T6' (European designation). Process equivalents: 'anodizing' includes 'anodising', 'eloxal' (German), 'sulfuric anodize Type II', ensuring global supplier coverage.",
                  forBuyers: "Prevents missed sourcing opportunities due to regional naming: 'sheet metal fabrication' automatically includes 'metal stamping', 'presswork', 'panel beating'. Industry-specific terms: 'aerospace machining' also searches 'aviation components', 'flight hardware manufacturing'. This maximizes competitive bidding and finds niche specialists using non-standard terminology.",
                  forAuditors: "Certification name variations: 'ISO 9001' search includes 'ISO 9001:2015', 'ISO 9001:2008 (transition)', 'EN ISO 9001', ensuring suppliers with equivalent certifications aren't excluded. Process audit coverage: 'welding qualification' includes 'EN 1090', 'AWS D1.1', 'ISO 3834', capturing all relevant welding certification schemes.",
                  example: "Search: 'investment casting'. System automatically expands to search: 'Investment casting', 'Lost wax casting', 'Precision casting', 'Feinguss' (German), 'Microfusione' (Italian), 'Cire perdue' (French), 'Vacuum casting', 'Ceramic mold casting'. Result: finds 47 qualified suppliers globally instead of 12 using only 'investment casting', including a specialized foundry listing services as '精密鋳造' (precision casting)."
                }
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedAIFeature(index)}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-10 transition-all duration-300 hover:shadow-lg border-b-4 border-gray-100 hover:border-[#A8C5B8]">
                  <div className="flex items-start gap-6">
                    {/* 8-bit Pixel Arrow */}
                    <div className="flex-shrink-0">
                      <PixelIcon 
                        name="arrow-right" 
                        className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      <div className="inline-flex items-center gap-2 text-[#A8C5B8] text-sm font-semibold group-hover:gap-3 transition-all">
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 md:py-20 bg-white" data-nav-theme="light">
        <div className="container mx-auto px-4 md:px-6 lg:px-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 md:mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#A8C5B8]"></div>
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">FAQ</span>
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-4">
              <span className="text-[#A8C5B8]">We answer all questions</span>
              <br />
              <span className="text-black">about SearchPro+.</span>
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "How does YVOO's search engine work?",
                a: "YVOO SearchPro+ uses a triple-source architecture combining verified supplier databases, company research databases, and real-time web searches. Our AI agent guides you through a conversational workflow to understand your exact requirements."
              },
              {
                q: "Do I need a subscription to use YVOO's search engine?",
                a: "Yes, YVOO SearchPro+ is available through subscription plans tailored to your company size and needs. Contact us for a demo and custom pricing."
              },
              {
                q: "Who can use SearchPro+?",
                a: "SearchPro+ is designed for procurement professionals, supply chain managers, and sourcing teams across all industries looking to streamline their supplier discovery process."
              },
              {
                q: "How can I use SearchPro+'s export files?",
                a: "You can export supplier lists in CSV, Excel, or PDF formats for seamless integration with your existing procurement systems or ERP platforms."
              },
              {
                q: "Is my data treated confidentially?",
                a: "Absolutely. We maintain strict data privacy standards and comply with GDPR regulations. Your searches and supplier lists remain completely confidential."
              },
              {
                q: "What makes SearchPro+ different from traditional search engines?",
                a: "Unlike traditional search engines, SearchPro+ uses AI to understand procurement-specific requirements, searches multiple verified databases simultaneously, and provides explainable recommendations with quality scores."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem value={`item-${index}`} className="bg-gradient-to-r from-gray-50 to-white rounded-2xl px-4 md:px-6 border-0 shadow-sm hover:shadow-md transition-all">
                  <AccordionTrigger className="text-left text-sm md:text-base font-semibold hover:no-underline text-gray-900 py-4 md:py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base text-gray-600 leading-relaxed pb-4 md:pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section - Compromise Design */}
      <section 
        data-nav-theme="light"
        className="relative py-20 md:py-32 overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#A8C5B8]/10 rounded-full mb-6 border border-[#A8C5B8]/20">
                <Sparkles className="w-4 h-4 text-[#A8C5B8]" />
                <span className="text-sm font-medium text-[#A8C5B8]">Start Your Search</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Find your next <span style={{ color: '#A8C5B8' }}>supplier partner</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Join thousands of procurement professionals discovering and verifying suppliers with AI
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200 p-3 flex flex-col md:flex-row items-stretch md:items-center gap-3 max-w-3xl mx-auto mb-8"
            >
              <div className="flex items-center gap-3 flex-1 px-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="What are you looking for? (e.g., CNC machining, ISO 9001...)"
                  className="flex-1 outline-none text-base text-gray-900 bg-transparent py-3 placeholder:text-gray-400"
                />
              </div>
              <Button 
                className="bg-white hover:bg-white/95 text-gray-900 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:shadow-lg"
              >
                Start Search
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex gap-2 justify-center flex-wrap text-sm text-gray-500"
            >
              <span>Popular:</span>
              {["CNC Machining", "Injection Molding", "PCB Assembly", "Metal Stamping"].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-full transition-all"
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />

      {/* AI Feature Detail Modal - Clean Modern Design */}
      <Dialog open={selectedAIFeature !== null} onOpenChange={() => setSelectedAIFeature(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border-0 shadow-2xl mx-4 md:mx-auto p-8 md:p-12">
          {selectedAIFeature !== null && (() => {
            const features = [
              {
                title: "AI Preference Engine",
                detailedExplanation: {
                  overview: "The AI Preference Engine learns from your search history, industry focus, and organizational requirements to intelligently prioritize supplier recommendations.",
                  forEngineers: "Advanced machine learning algorithms analyze technical specifications, material requirements, and process capabilities from your past searches to predict ideal supplier matches. The system maintains a technical profile that evolves with each interaction, ensuring increasingly accurate recommendations.",
                  forBuyers: "The engine automatically filters suppliers based on your company's preferred certifications, geographic preferences, and volume requirements. This eliminates manual screening and accelerates qualified supplier identification.",
                  forAuditors: "Compliance-first filtering ensures recommended suppliers meet your industry's mandatory certifications before presentation. The system tracks which quality standards your organization typically requires (ISO 9001, IATF 16949, AS9100, etc.) and prioritizes accordingly.",
                  example: "Example: Automotive procurement teams searching for precision components will automatically see TS16949-certified suppliers ranked higher, while pharmaceutical buyers will see GMP-certified manufacturers prioritized—without manual filter configuration."
                }
              },
              {
                title: "Intelligent Requirement Capture",
                detailedExplanation: {
                  overview: "Transform unstructured information—whether typed descriptions, uploaded PDFs, or technical drawings—into precise, searchable supplier requirements automatically.",
                  forEngineers: "Upload technical drawings (PDF, DWG, STEP files) and the AI extracts tolerances, material specifications (e.g., 'AISI 316L stainless steel'), surface finish requirements (Ra values), and geometric tolerances (GD&T symbols). Natural language processing converts phrases like 'high-strength aluminum alloy' into specific standards (e.g., 6061-T6, 7075-T651).",
                  forBuyers: "Eliminate hours of manual RFQ preparation. Simply describe what you need in plain language or forward a technical email from engineering, and the system structures all requirements automatically. This accelerates your RFQ cycles significantly.",
                  forAuditors: "Automatically identify compliance requirements embedded in technical documents. The system flags certifications, testing standards (e.g., 'ASTM E8 tensile testing'), and regulatory references (e.g., 'FDA 21 CFR Part 820'), ensuring nothing is overlooked in supplier qualification.",
                  example: "Example: An engineer uploads a valve assembly drawing with technical annotations. The AI extracts: '316L stainless steel, pressure rating PN40, DIN EN 12516-2 compliance, helium leak test to 1×10⁻⁹ mbar·l/s' and immediately searches for suppliers with these exact capabilities."
                }
              },
              {
                title: "Multi-Factor Matching",
                detailedExplanation: {
                  overview: "Simultaneous evaluation across 20+ criteria including technical capabilities, certifications, geographic proximity, production capacity, and industry experience to identify optimal supplier matches.",
                  forEngineers: "Technical matching evaluates: material processing capabilities (e.g., 'titanium machining'), tolerance capabilities (±0.005mm), surface treatments (anodizing, passivation), testing equipment (CMM, X-ray, ultrasonic), and process certifications (welding qualifications, heat treatment procedures). Weight factors can be adjusted for critical vs. desirable capabilities.",
                  forBuyers: "Strategic sourcing criteria include: minimum order quantities (MOQs), payment terms, Incoterms preferences, and multi-site production capacity. Location-based matching considers logistics costs, trade compliance, and supply chain risk diversification (e.g., 'two qualified suppliers minimum 500km apart').",
                  forAuditors: "Compliance matching cross-references: industry certifications (automotive, aerospace, medical device), environmental standards (ISO 14001, RoHS, REACH), social responsibility audits (SMETA, SA8000), and customer-specific approvals. The system flags suppliers with recent certification renewals and clean audit histories.",
                  example: "Example: Sourcing a complex stamped part requiring: automotive steel (HSLA), 8,000 tons press capacity, TS16949 + ISO 14001, within 300km of assembly plant, capable of 50,000 units/month. The system returns only 3 suppliers meeting ALL criteria, not 200 partial matches."
                }
              },
              {
                title: "Explainable AI",
                detailedExplanation: {
                  overview: "Every supplier recommendation includes a detailed justification showing exactly why the AI selected that supplier, with transparency into matching scores, strengths, and potential gaps.",
                  forEngineers: "See technical match percentages for each requirement: '95% capability match—has 5-axis CNC (required), titanium experience (required), but lacks NADCAP heat treatment (optional)'. This allows informed decisions about whether gaps are acceptable or deal-breakers. No black box recommendations.",
                  forBuyers: "Understand trade-offs clearly: 'Supplier A: 95% match vs. Supplier B: 85% match'. Explanations highlight which requirements are not met in lower-scored options, enabling strategic sourcing decisions rather than just picking the top score.",
                  forAuditors: "Compliance transparency shows certification status, audit dates, and gaps: 'ISO 9001 valid until 2026, IATF audit passed March 2024 with zero major findings, ISO 14001 pending renewal (expires June 2025)'. This enables risk assessment and pre-qualification prioritization.",
                  example: "Example: Why Supplier X recommended for brake component: Technical match 94% (has required friction testing per ECE R90), Location +15 points (within regional proximity), Certification +20 points (IATF 16949:2016 current), Experience +10 points (5 years automotive brake systems), Capacity verified for required volume. Gap: No in-house coating, uses qualified subcontractor."
                }
              },
              {
                title: "Smart Deduplication",
                detailedExplanation: {
                  overview: "Advanced entity resolution technology identifies when different company names, addresses, or records refer to the same supplier, preventing duplicate outreach and consolidating supplier information.",
                  forEngineers: "Consolidates technical data from multiple sources: if 'Müller GmbH' appears in your ERP, 'Mueller Precision Engineering' in a certification database, and 'Müller Group' on their website, the system merges all capability data into one complete profile. This ensures you see all equipment, certifications, and technical capabilities in a single view.",
                  forBuyers: "Prevents embarrassing duplicate RFQs to the same supplier under different names. Consolidates past performance data and contract terms across all name variations. Also identifies subsidiary relationships—knowing that 'ABC Components' is owned by 'XYZ Corporation' helps with spend consolidation and strategic sourcing decisions.",
                  forAuditors: "Links certification records across name variations, ensuring audit histories aren't fragmented. Identifies when a supplier operates multiple facilities under different names, allowing proper audit planning for all locations. Also flags company name changes due to acquisitions or restructuring that might affect certification validity.",
                  example: "Example: A procurement team has interacted with: 'Müller GmbH' (2019 contract), 'J. Müller Metallverarbeitung' (2021 quote), and 'Mueller Group' (2023 capability inquiry). The system recognizes these as the same entity, merges all interaction history, and shows: one consolidated supplier profile with complete history, avoiding duplicate outreach."
                }
              },
              {
                title: "Dynamic Results",
                detailedExplanation: {
                  overview: "Quality over quantity: the system returns only suppliers that genuinely meet your requirements, even if that's just 3 suppliers instead of padding results to 50 with poor matches.",
                  forEngineers: "No more sifting through 100+ irrelevant suppliers to find 5 qualified ones. If you need 'titanium investment casting with NADCAP approval', and only 8 suppliers globally meet this, you get those 8—not 92 steel casting companies to hit a 100-result quota. This respects your technical judgment and time.",
                  forBuyers: "Dramatically reduces qualification effort. Instead of reviewing 50+ suppliers to shortlist 5, you receive a pre-qualified list of 5-12 that actually meet requirements. For highly specialized needs (e.g., 'aerospace honeycomb panel fabrication'), seeing '4 suppliers match your criteria' is more valuable than artificially inflating to 40 poor matches.",
                  forAuditors: "Only audit-ready suppliers appear in results. If you require ISO 13485 + FDA registration + cleanroom manufacturing, and only 6 suppliers meet this, you audit 6 qualified candidates—not waste resources pre-qualifying 30 companies missing critical certifications. This optimizes audit scheduling and resource allocation.",
                  example: "Search: 'LNG cryogenic valves, -196°C rated, EN 1626 certified, ASME VIII Div 1, minimum DN50, European manufacturing'. Result: 3 suppliers shown. Because only 3 suppliers globally meet ALL criteria. Not 47 results with footnotes like '*DN25 maximum' or '*ASME certification pending' just to show more names."
                }
              },
              {
                title: "Real-Time Data Enrichment",
                detailedExplanation: {
                  overview: "YVOO maintains a continuously updated database of supplier capabilities, certifications, and performance metrics. After audits and site visits, supplier profiles are enriched with verified ground truth data.",
                  forEngineers: "Engineers need confidence that supplier certifications and capabilities are current. YVOO updates supplier profiles after site visits with verified equipment details, actual production capabilities, and real facility observations. When capabilities are verified through on-site inspection, this validated information is reflected in search results.",
                  forBuyers: "Procurement teams can access supplier data that has been verified through actual site visits and audits. YVOO enriches profiles with real-world observations about capacity, financial stability indicators, and facility conditions. This reduces supplier qualification time and minimizes the risk of engaging with suppliers whose claimed capabilities don't match reality.",
                  forAuditors: "Quality assurance teams contribute to and benefit from a growing database of verified supplier information. After completing audits, findings are used to update supplier profiles with actual compliance status, facility conditions, and quality system maturity. Full audit reports are only available after audits are completed. This creates a knowledge base of verified supplier intelligence that improves over time.",
                  example: "Example: After completing a facility audit, YVOO updates the supplier profile to reflect the actual production equipment observed, verified certifications seen on-site, and real facility conditions. Future searches benefit from this ground truth data rather than relying solely on supplier-provided claims."
                }
              },
              {
                title: "Alternative Term Discovery",
                detailedExplanation: {
                  overview: "Manufacturing processes and materials are described differently across regions, industries, and languages. The AI automatically searches all equivalent terms to ensure no qualified suppliers are missed due to terminology differences.",
                  forEngineers: "Technical synonym expansion ensures comprehensive results: 'CNC milling' also searches 'machining center', 'Fraesen' (German), 'fraisage' (French). Material variations: 'aluminum' finds 'aluminium' (UK/EU), '6061-T6' also searches 'AlMgSi1 T6' (European designation). Process equivalents: 'anodizing' includes 'anodising', 'eloxal' (German), 'sulfuric anodize Type II', ensuring global supplier coverage.",
                  forBuyers: "Prevents missed sourcing opportunities due to regional naming: 'sheet metal fabrication' automatically includes 'metal stamping', 'presswork', 'panel beating'. Industry-specific terms: 'aerospace machining' also searches 'aviation components', 'flight hardware manufacturing'. This maximizes competitive bidding and finds niche specialists using non-standard terminology.",
                  forAuditors: "Certification name variations: 'ISO 9001' search includes 'ISO 9001:2015', 'ISO 9001:2008 (transition)', 'EN ISO 9001', ensuring suppliers with equivalent certifications aren't excluded. Process audit coverage: 'welding qualification' includes 'EN 1090', 'AWS D1.1', 'ISO 3834', capturing all relevant welding certification schemes.",
                  example: "Search: 'investment casting'. System automatically expands to search: 'Investment casting', 'Lost wax casting', 'Precision casting', 'Feinguss' (German), 'Microfusione' (Italian), 'Cire perdue' (French), 'Vacuum casting', 'Ceramic mold casting'. Result: finds 47 qualified suppliers globally instead of 12 using only 'investment casting', including a specialized foundry listing services as '精密鋳造' (precision casting)."
                }
              }
            ];
            const feature = features[selectedAIFeature];
            
            return (
              <div className="space-y-8">
                {/* Header */}
                <div className="pb-6">
                  <DialogTitle className="text-3xl md:text-5xl font-bold mb-4" style={{ color: '#A8C5B8' }}>
                    {feature.title}
                  </DialogTitle>
                  <p className="text-lg md:text-xl text-gray-900 leading-relaxed">
                    {feature.detailedExplanation.overview}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* For Engineers */}
                  <div className="border-l-4 border-gray-900 pl-6 py-4">
                    <h4 className="text-sm font-bold uppercase tracking-wide text-gray-900 mb-3">Engineers</h4>
                    <p className="text-base text-gray-700 leading-relaxed">
                      {feature.detailedExplanation.forEngineers}
                    </p>
                  </div>

                  {/* For Procurement & Buyers */}
                  <div className="border-l-4 border-[#A8C5B8] pl-6 py-4">
                    <h4 className="text-sm font-bold uppercase tracking-wide text-[#A8C5B8] mb-3">Procurement</h4>
                    <p className="text-base text-gray-700 leading-relaxed">
                      {feature.detailedExplanation.forBuyers}
                    </p>
                  </div>

                  {/* For Quality & Auditors */}
                  <div className="border-l-4 border-[#A8B8CA] pl-6 py-4">
                    <h4 className="text-sm font-bold uppercase tracking-wide text-[#A8B8CA] mb-3">Quality</h4>
                    <p className="text-base text-gray-700 leading-relaxed">
                      {feature.detailedExplanation.forAuditors}
                    </p>
                  </div>

                  {/* Real-World Application */}
                  <div className="bg-gray-50 rounded-2xl p-6 mt-8">
                    <h4 className="text-sm font-bold uppercase tracking-wide text-gray-900 mb-3">Example</h4>
                    <p className="text-base text-gray-700 leading-relaxed">
                      {feature.detailedExplanation.example}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <Button 
                    onClick={() => setSelectedAIFeature(null)}
                    className="bg-white hover:bg-white/95 text-gray-900 rounded-full px-8 py-3"
                  >
                    Close
                  </Button>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

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
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 md:w-4 md:h-4 text-[#A8C5B8]" />
                        <span>{selectedSupplier.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 md:w-4 md:h-4 text-[#A8C5B8]" />
                        <span>{selectedSupplier.employees} employees</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Factory className="w-3 h-3 md:w-4 md:h-4 text-[#A8C5B8]" />
                        <span>Founded {selectedSupplier.founded}</span>
                      </div>
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
                <Card className="rounded-2xl border-[#A8C5B8]/20">
                  <CardContent className="p-4">
                    <p className="text-xs text-gray-600 mb-1">Experience</p>
                    <p className="text-lg font-bold text-[#A8C5B8]">{selectedSupplier.experience}</p>
                  </CardContent>
                </Card>
                <Card className="rounded-2xl border-[#A8BFC5]/20">
                  <CardContent className="p-4">
                    <p className="text-xs text-gray-600 mb-1">Production Capacity</p>
                    <p className="text-sm font-semibold text-gray-700">{selectedSupplier.capacity}</p>
                  </CardContent>
                </Card>
                <Card className="rounded-2xl border-gray-500/20">
                  <CardContent className="p-4">
                    <p className="text-xs text-gray-600 mb-1">Annual Revenue</p>
                    <p className="text-lg font-bold text-gray-700">{selectedSupplier.revenue}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#A8C5B8]" />
                  Certifications & Standards
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSupplier.certifications.map((cert: string) => (
                    <Badge key={cert} className="bg-[#A8C5B8]/10 text-[#A8C5B8] hover:bg-[#A8C5B8]/20 border-[#A8C5B8]/30">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Capabilities */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#A8C5B8]" />
                  Core Capabilities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedSupplier.capabilities.map((capability: string) => (
                    <div key={capability} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#14B8A6] flex-shrink-0" />
                      <span>{capability}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#14B8A6]" />
                  Equipment & Technology
                </h3>
                <div className="space-y-2">
                  {selectedSupplier.equipment.map((equip: string) => (
                    <div key={equip} className="flex items-center gap-2 text-sm text-gray-700 p-2 bg-gray-50 rounded-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]"></div>
                      <span>{equip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button className="flex-1 bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:from-[#0F9B8E] hover:to-[#0A7A6E] text-white rounded-full">
                  Request Quote
                </Button>
                <Button variant="outline" className="flex-1 border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6]/10 rounded-full">
                  Schedule Audit
                </Button>
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full">
                  <Save className="w-4 h-4" />
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
