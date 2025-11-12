import { motion, useInView } from "framer-motion";
import { Check, Search, Save, FileText, Globe, Cpu, TrendingUp, Users, Clock, Target, Zap, Shield, CheckCircle2, ArrowRight, Sparkles, MapPin, Award, Factory, X, Settings, ShoppingCart, Lightbulb } from "lucide-react";
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
                                    // Wait 3 seconds after results, then fade out and restart
                                    setTimeout(() => {
                                      setIsFading(true);
                                      setTimeout(() => {
                                        setShowResults(false);
                                        setConversationHistory([]);
                                        setCurrentStep(1);
                                        setIsFading(false);
                                        setCurrentScenario((prev) => (prev + 1) % scenarios.length);
                                      }, 500);
                                    }, 3000);
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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section - Fixed height, doesn't expand */}
      <section 
        className="relative pt-32 pb-20 overflow-visible"
        style={{ 
          background: "linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 50%, rgb(15, 23, 42) 100%)",
          height: "70vh"
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle, #14B8A6 0%, transparent 70%)" }}
            animate={{
              x: ["-10%", "10%", "-10%"],
              y: ["-10%", "10%", "-10%"],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-0 bottom-0 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ background: "radial-gradient(circle, #0D9488 0%, transparent 70%)" }}
            animate={{
              x: ["10%", "-10%", "10%"],
              y: ["10%", "-10%", "10%"],
              scale: [1.2, 1, 1.2]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Left Content - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#14B8A6]/10 rounded-full mb-6 border border-[#14B8A6]/20"
              >
                <Sparkles className="w-4 h-4 text-[#14B8A6]" />
                <span className="text-sm font-semibold text-[#14B8A6]">AI-Powered Supplier Discovery</span>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="text-[#14B8A6]">Find suppliers</span>
                <br />
                <span className="text-white">worldwide in real-time.</span>
              </h1>
              
              <div className="space-y-4 mb-8">
                {[
                  "25+ million supplier profiles",
                  "Relevant supplier data",
                  "Save and export options"
                ].map((text, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3 text-white group"
                  >
                    <div className="w-6 h-6 bg-[#14B8A6]/20 rounded-full flex items-center justify-center group-hover:bg-[#14B8A6]/30 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-[#14B8A6]" />
                    </div>
                    <span className="text-lg">{text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="hidden"
              >
                <Button className="bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:from-[#0F9B8E] hover:to-[#0A7A6E] text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Content - Interactive Demo Search - Takes 3 columns - YVOO Card Style */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-3 relative"
              style={{ 
                transform: 'translateY(calc(40% + 4cm))',
                zIndex: 10
              }}
            >
              {/* Modern white card matching YVOO design */}
              <div className="bg-white rounded-3xl shadow-lg overflow-visible">
                
                {/* Black Navigation Bar - SearchPro+ */}
                <div className="bg-gray-900 px-6 py-4 rounded-t-3xl flex items-center justify-between">
                  <h2 className="text-white text-xl font-bold">SearchPro+</h2>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-[#14B8A6]" />
                    <span className="text-white text-sm">AI-Powered</span>
                  </div>
                </div>

                <div className="p-6">
                
                {/* Teal label */}
                <div className="mb-3 flex-shrink-0">
                  <span className="text-[#14B8A6] text-sm font-semibold">
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
                          ? 'bg-[#14B8A6] text-white'
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
                  className="space-y-4 mb-6 max-h-96 overflow-y-auto rounded-3xl bg-gray-50 p-4 scroll-smooth"
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
                            ? 'bg-[#14B8A6] text-white rounded-br-none'
                            : 'bg-white text-gray-900 rounded-bl-none shadow-sm border border-gray-200'
                        }`}
                      >
                        {msg.role === 'ai' && (
                          <div className="flex items-center gap-2 mb-2">
                            <Cpu className="w-3 h-3 text-[#14B8A6]" />
                            <span className="text-xs font-semibold text-[#14B8A6]">YVOO</span>
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
                          <Cpu className="w-3 h-3 text-[#14B8A6]" />
                          <span className="text-xs font-semibold text-[#14B8A6]">YVOO</span>
                          {isTyping && (
                            <div className="flex gap-1 ml-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-bounce" style={{ animationDelay: '0s' }}></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
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
                      <div className="max-w-[80%] p-4 rounded-2xl bg-[#14B8A6] text-white rounded-br-none">
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
                      <CheckCircle2 className="w-5 h-5 text-[#14B8A6]" />
                      <span className="font-semibold text-gray-900">4 Matching Suppliers Found</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {suppliers.map((supplier) => (
                        <button
                          key={supplier.id}
                          onClick={() => setSelectedSupplier(supplier)}
                          className="text-left p-4 bg-white border border-gray-200 rounded-2xl hover:border-[#14B8A6] hover:shadow-md transition-all group"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-bold text-gray-900 group-hover:text-[#14B8A6] transition-colors">
                              {supplier.name}
                            </h4>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#14B8A6] group-hover:translate-x-1 transition-all" />
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>{supplier.location}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {supplier.certifications.slice(0, 2).map((cert, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-[#14B8A6]/10 text-[#14B8A6] text-xs rounded-full font-medium"
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

      {/* Curved Section Divider */}
      <div className="relative -mt-1">
        <svg className="w-full h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 0C480 80 960 80 1440 0V120H0V0Z" fill="rgb(249, 250, 251)"/>
        </svg>
      </div>

      {/* Stats Section */}
      <section className="py-20 bg-white" data-nav-theme="light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]"></div>
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Benefits</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-[#14B8A6]">Your next supplier,</span>
              <br />
              <span className="text-black">just a click away.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                stat: "10x",
                title: "faster supplier research",
                features: ["Filtered results", "AI-based ranking systems", "Always up-to-date"],
                gradient: "from-blue-500 to-blue-600"
              },
              {
                stat: "25M+",
                title: "supplier profiles",
                features: ["Global transparency", "Niche technologies", "Cross-sector searches"],
                gradient: "from-[#14B8A6] to-[#0D9488]"
              },
              {
                stat: "100x",
                title: "more results per query with SearchPro+",
                features: ["Greater variety in supplier profiles", "Better comparison opportunities", "Higher match rate"],
                gradient: "from-purple-500 to-purple-600"
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
                <Card className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all h-full border-0 overflow-hidden relative">
                  {/* Gradient accent bar on top */}
                  <div className={`h-2 bg-gradient-to-r ${item.gradient}`}></div>
                  
                  <CardHeader className="relative">
                    {/* Background gradient glow */}
                    <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${item.gradient} rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                    
                    <CardTitle className="text-[#14B8A6] text-6xl font-bold mb-4 relative z-10">{item.stat}</CardTitle>
                    <CardDescription className="text-black text-xl font-semibold relative z-10">{item.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {item.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          className="flex items-center gap-3 text-gray-600"
                        >
                          <div className="w-5 h-5 bg-[#14B8A6]/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-3 h-3 text-[#14B8A6]" />
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
        className="py-20"
        style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
        data-nav-theme="light"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]"></div>
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Process</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold">
              <span className="text-[#14B8A6]">Product</span>
              <br />
              <span className="text-black">Overview.</span>
            </h2>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 flex-wrap">
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
                className={`px-6 py-3 rounded-2xl font-semibold transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-white text-[#14B8A6] shadow-lg border-2 border-[#14B8A6]/20 scale-105"
                    : "bg-white/50 text-gray-600 hover:bg-white hover:shadow-md"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeTab === tab.id ? "bg-[#14B8A6]/10" : "bg-gray-100"
                }`}>
                  <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-[#14B8A6]" : "text-gray-500"}`} />
                </div>
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100"
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
                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#14B8A6]/5 to-transparent rounded-2xl hover:from-[#14B8A6]/10 transition-all group"
                      >
                        <div className="w-10 h-10 bg-[#14B8A6]/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <CheckCircle2 className="w-5 h-5 text-[#14B8A6]" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{company.name}</p>
                          <p className="text-sm text-gray-500">{company.location} • {company.year}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <Button className="bg-gradient-to-r from-[#14B8A6] to-[#0D9488] text-white hover:from-[#0F9B8E] hover:to-[#0A7A6E] rounded-full w-full py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    Save to list
                  </Button>
                </div>
              )}
              {activeTab === "save" && (
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-br from-[#14B8A6]/5 to-blue-50 rounded-2xl border border-[#14B8A6]/20">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#14B8A6]/20 rounded-full flex items-center justify-center">
                        <Save className="w-5 h-5 text-[#14B8A6]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-2">Local List - Automotive Supplier EMEA</p>
                        <p className="text-sm text-gray-600">Contains all contacts gathered during the Automotive Sector for Europe.</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="rounded-full text-[#14B8A6] border-[#14B8A6]/30 hover:bg-[#14B8A6]/10">Share</Button>
                      <Button variant="outline" size="sm" className="rounded-full text-[#14B8A6] border-[#14B8A6]/30 hover:bg-[#14B8A6]/10">Edit</Button>
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
                        <Button variant="outline" className="rounded-full border-[#14B8A6]/30 text-[#14B8A6] hover:bg-[#14B8A6]/10 px-6 py-3">
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
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Key suppliers always in sight</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                You can easily create lists of suppliers tailored to your business needs and continuously add new ones as you discover them. Your entire team can access the platform and collaborate effortlessly – keeping everyone on the same page and fully aligned.
              </p>
              <Button className="bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:from-[#0F9B8E] hover:to-[#0A7A6E] text-white rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white" data-nav-theme="light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]"></div>
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Technology</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold">
              <span className="text-[#14B8A6]">Our technology</span>
              <br />
              <span className="text-black">for global supplier identification.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Conversational Workflow",
                subtitle: "7-Step Intelligence",
                description: "Our AI agent guides you through a structured dialogue, converting vague requirements into precise specifications with technical details, materials, and certifications.",
                icon: Cpu,
                gradient: "from-[#14B8A6] to-[#0D9488]"
              },
              {
                title: "Triple-Source Search Architecture",
                subtitle: "Complete Market Coverage",
                description: "Simultaneous search across verified supplier database, company research database, and real-time web discovery to find both established suppliers and newest startups.",
                icon: Globe,
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                title: "Smart AI Preference Engine",
                subtitle: "Learns Your Requirements",
                description: "AI automatically recognizes your profile and preferences, prioritizing suppliers with relevant certifications and experience based on your industry and past searches.",
                icon: TrendingUp,
                gradient: "from-[#14B8A6] to-[#0D9488]"
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
                <Card className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all h-full border-0 overflow-hidden">
                  <div className={`h-56 bg-gradient-to-br ${item.gradient} flex items-center justify-center relative overflow-hidden`}>
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                      }}></div>
                    </div>
                    
                    {/* Icon with glow */}
                    <motion.div
                      className="relative z-10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <item.icon className="w-14 h-14 text-white" />
                      </div>
                    </motion.div>
                  </div>
                  <CardHeader>
                    <CardDescription className="text-[#14B8A6] text-sm font-bold uppercase tracking-wide mb-2">
                      {item.subtitle}
                    </CardDescription>
                    <CardTitle className="text-xl font-bold text-gray-900 leading-tight">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-[#14B8A6]">7 AI Features</span>
              <br />
              <span className="text-black">that will change your procurement forever</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Cpu,
                title: "AI Preference Engine",
                description: "AI automatically recognizes your requirements and preferences based on your profile. For example, if you mainly work in automotive, the system automatically prefers TS16949-certified suppliers.",
                detailedExplanation: {
                  overview: "The AI Preference Engine learns from your search history, industry focus, and organizational requirements to intelligently prioritize supplier recommendations.",
                  forEngineers: "Advanced machine learning algorithms analyze technical specifications, material requirements, and process capabilities from your past searches to predict ideal supplier matches. The system maintains a technical profile that evolves with each interaction, ensuring increasingly accurate recommendations.",
                  forBuyers: "Reduce sourcing time by 60-75%. The engine automatically filters suppliers based on your company's preferred certifications, geographic preferences, and volume requirements. This eliminates manual screening and accelerates qualified supplier identification.",
                  forAuditors: "Compliance-first filtering ensures recommended suppliers meet your industry's mandatory certifications before presentation. The system tracks which quality standards your organization typically requires (ISO 9001, IATF 16949, AS9100, etc.) and prioritizes accordingly.",
                  example: "A BMW procurement team searching for precision components will automatically see TS16949-certified suppliers ranked higher, while a pharmaceutical buyer will see GMP-certified manufacturers prioritized—without manual filter configuration."
                }
              },
              {
                icon: FileText,
                title: "Intelligent Requirement Capture",
                description: "AI automatically extracts specifications from natural language or uploaded documents. Upload CAD drawings or datasheets, and AI extracts dimensions, materials, and standards.",
                detailedExplanation: {
      overview: "Transform unstructured information—whether typed descriptions, uploaded PDFs, or technical drawings—into precise, searchable supplier requirements automatically.",
      forEngineers: "Upload technical drawings (PDF, DWG, STEP files) and the AI extracts tolerances, material specifications (e.g., 'AISI 316L stainless steel'), surface finish requirements (Ra values), and geometric tolerances (GD&T symbols). Natural language processing converts phrases like 'high-strength aluminum alloy' into specific standards (e.g., 6061-T6, 7075-T651).",
      forBuyers: "Eliminate hours of manual RFQ preparation. Simply describe what you need in plain language or forward a technical email from engineering, and the system structures all requirements automatically. This accelerates RFQ cycles significantly.",
      forAuditors: "Automatically identify compliance requirements embedded in technical documents. The system flags certifications, testing standards (e.g., 'ASTM E8 tensile testing'), and regulatory references (e.g., 'FDA 21 CFR Part 820'), ensuring nothing is overlooked in supplier qualification.",
      example: "Example: Uploading a valve assembly drawing with technical annotations, the AI extracts: '316L stainless steel, pressure rating PN40, DIN EN 12516-2 compliance, helium leak test to 1×10⁻⁹ mbar·l/s' and immediately searches for suppliers with these exact capabilities."
                }
              },
              {
                icon: Target,
                title: "Multi-Factor Matching",
                description: "Evaluation based on industry, location, certifications, and capacity. Example: LNG plant supplier with PED/ASME certification, max 200km to port, min 500 tons/year steel processing.",
                detailedExplanation: {
      overview: "Simultaneous evaluation across 20+ criteria including technical capabilities, certifications, geographic proximity, production capacity, and industry experience to identify optimal supplier matches.",
      forEngineers: "Technical matching evaluates: material processing capabilities (e.g., 'titanium machining'), tolerance capabilities (±0.005mm), surface treatments (anodizing, passivation), testing equipment (CMM, X-ray, ultrasonic), and process certifications (welding qualifications, heat treatment procedures). Weight factors can be adjusted for critical vs. desirable capabilities.",
      forBuyers: "Strategic sourcing criteria include: minimum order quantities (MOQs), payment terms, Incoterms preferences, and multi-site production capacity. Location-based matching considers logistics costs, trade compliance, and supply chain risk diversification (e.g., 'two qualified suppliers minimum 500km apart').",
      forAuditors: "Compliance matching cross-references: industry certifications (automotive, aerospace, medical device), environmental standards (ISO 14001, RoHS, REACH), social responsibility audits (SMETA, SA8000), and customer-specific approvals. The system flags suppliers with recent certification renewals and clean audit histories.",
      example: "Example: Sourcing a complex stamped part requiring: automotive steel (HSLA), 8,000 tons press capacity, TS16949 + ISO 14001, within 300km of assembly plant, capable of 50,000 units/month. The system returns only 3 suppliers meeting ALL criteria, not 200 partial matches."
                }
              },
              {
                icon: Shield,
                title: "Explainable AI",
                description: "Transparent reasoning for supplier recommendations. Example: 'Supplier A recommended because: ISO14001 certification (90% match), 2 years experience with similar projects, local presence.'",
                detailedExplanation: {
      overview: "Every supplier recommendation includes a detailed justification showing exactly why the AI selected that supplier, with transparency into matching scores, strengths, and potential gaps.",
      forEngineers: "See technical match percentages for each requirement: '95% capability match—has 5-axis CNC (required), titanium experience (required), but lacks NADCAP heat treatment (optional)'. This allows informed decisions about whether gaps are acceptable or deal-breakers. No black box recommendations.",
      forBuyers: "Understand trade-offs clearly: 'Supplier A: 95% match, 3-week delivery vs. Supplier B: 85% match, 5-week delivery'. Explanations highlight which requirements are not met in lower-scored options, enabling strategic sourcing decisions rather than just picking the top score.",
      forAuditors: "Compliance transparency shows certification status, audit dates, and gaps: 'ISO 9001 valid until 2026, IATF audit passed March 2024 with zero major findings, ISO 14001 pending renewal (expires June 2025)'. This enables risk assessment and pre-qualification prioritization.",
      example: "Example: Why Supplier X recommended for brake component: Technical match 94% (has required friction testing per ECE R90), Location +15 points (within 200km of assembly plant), Certification +20 points (IATF 16949:2016 current), Experience +10 points (5 years automotive brake systems), Capacity verified for 100K units/month. Gap: No in-house coating, uses qualified subcontractor."
                }
              },
              {
                icon: Users,
                title: "Smart Deduplication",
                description: "Automatic recognition and merging of identical suppliers. 'Müller GmbH', 'Mueller Group' and 'Müller Precision' are recognized as one company.",
                detailedExplanation: {
      overview: "Advanced entity resolution technology identifies when different company names, addresses, or records refer to the same supplier, preventing duplicate outreach and consolidating supplier information.",
      forEngineers: "Consolidates technical data from multiple sources: if 'Müller GmbH' appears in your ERP, 'Mueller Precision Engineering' in a certification database, and 'Müller Group' on their website, the system merges all capability data into one complete profile. This ensures you see all equipment, certifications, and technical capabilities in a single view.",
      forBuyers: "Prevents embarrassing duplicate RFQs to the same supplier under different names. Consolidates past performance data and contract terms across all name variations. Also identifies subsidiary relationships—knowing that 'ABC Components' is owned by 'XYZ Corporation' helps with spend consolidation and negotiating leverage.",
      forAuditors: "Links certification records across name variations, ensuring audit histories aren't fragmented. Identifies when a supplier operates multiple facilities under different names, allowing proper audit planning for all locations. Also flags company name changes due to acquisitions or restructuring that might affect certification validity.",
      example: "Example: A procurement team has interacted with: 'Müller GmbH' (2019 contract), 'J. Müller Metallverarbeitung' (2021 quote), and 'Mueller Group' (2023 capability inquiry). The system recognizes these as the same entity, merges all interaction history, and shows: one consolidated supplier profile with complete history, avoiding duplicate outreach."
                }
              },
              {
                icon: Zap,
                title: "Dynamic Results",
                description: "Delivers only truly relevant matches, no filler results. With specific queries, only the 7 actually matching suppliers are displayed instead of padding the list with less relevant ones.",
                detailedExplanation: {
      overview: "Quality over quantity: the system returns only suppliers that genuinely meet your requirements, even if that's just 3 suppliers instead of padding results to 50 with poor matches.",
      forEngineers: "No more sifting through 100+ irrelevant suppliers to find 5 qualified ones. If you need 'titanium investment casting with NADCAP approval', and only 8 suppliers globally meet this, you get those 8—not 92 steel casting companies to hit a 100-result quota. This respects your technical judgment and time.",
      forBuyers: "Dramatically reduces qualification effort. Instead of reviewing 50+ suppliers to shortlist 5, you receive a pre-qualified list of 5-12 that actually meet requirements. For highly specialized needs (e.g., 'aerospace honeycomb panel fabrication'), seeing '4 suppliers match your criteria' is more valuable than artificially inflating to 40 poor matches.",
      forAuditors: "Only audit-ready suppliers appear in results. If you require ISO 13485 + FDA registration + cleanroom manufacturing, and only 6 suppliers meet this, you audit 6 qualified candidates—not waste resources pre-qualifying 30 companies missing critical certifications. This optimizes audit scheduling and resource allocation.",
      example: "Example: Search 'LNG cryogenic valves, -196°C rated, EN 1626 certified, ASME VIII Div 1, minimum DN50, European manufacturing'. Result: 3 suppliers shown. Because only 3 suppliers globally meet ALL criteria. Not 47 results with footnotes like '*DN25 maximum' or '*ASME certification pending' just to show more names."
                }
              },
              {
                icon: Clock,
                title: "Real-Time Data Enrichment",
                description: "Continuous updating of supplier data. New certifications, location expansions, or insolvency proceedings are automatically detected and integrated.",
                detailedExplanation: {
      overview: "YVOO maintains a continuously updated database of supplier capabilities, certifications, and performance metrics. After audits and site visits, supplier profiles are enriched with verified ground truth data.",
      forEngineers: "Engineers need confidence that supplier certifications and capabilities are current. YVOO updates supplier profiles after site visits with verified equipment details, actual production capabilities, and real facility observations. When capabilities are verified through on-site inspection, this validated information is reflected in search results.",
      forBuyers: "Procurement teams can access supplier data that has been verified through actual site visits and audits. YVOO enriches profiles with real-world observations about capacity, financial stability indicators, and facility conditions. This reduces supplier qualification time and minimizes the risk of engaging with suppliers whose claimed capabilities don't match reality.",
      forAuditors: "Quality assurance teams contribute to and benefit from a growing database of verified supplier information. After completing audits, findings are used to update supplier profiles with actual compliance status, facility conditions, and quality system maturity. Full audit reports are only available after audits are completed. This creates a knowledge base of verified supplier intelligence that improves over time.",
      example: "Example: After completing a facility audit, YVOO updates the supplier profile to reflect the actual production equipment observed, verified certifications seen on-site, and real facility conditions. Future searches benefit from this ground truth data rather than relying solely on supplier-provided claims."
                }
              },
              {
                icon: Globe,
                title: "Alternative Term Discovery",
                description: "Identifies related terms for complete market coverage. 'Die casting' automatically expands to 'Pressure Die Casting', 'Permanent Mold Casting', etc.",
                detailedExplanation: {
      overview: "Manufacturing processes and materials are described differently across regions, industries, and languages. The AI automatically searches all equivalent terms to ensure no qualified suppliers are missed due to terminology differences.",
      forEngineers: "Technical synonym expansion ensures comprehensive results: 'CNC milling' also searches 'machining center', 'Fraesen' (German), 'fraisage' (French). Material variations: 'aluminum' finds 'aluminium' (UK/EU), '6061-T6' also searches 'AlMgSi1 T6' (European designation). Process equivalents: 'anodizing' includes 'anodising', 'eloxal' (German), 'sulfuric anodize Type II', ensuring global supplier coverage.",
      forBuyers: "Prevents missed sourcing opportunities due to regional naming: 'sheet metal fabrication' automatically includes 'metal stamping', 'presswork', 'panel beating'. Industry-specific terms: 'aerospace machining' also searches 'aviation components', 'flight hardware manufacturing'. This maximizes competitive bidding and finds niche specialists using non-standard terminology.",
      forAuditors: "Certification name variations: 'ISO 9001' search includes 'ISO 9001:2015', 'ISO 9001:2008 (transition)', 'EN ISO 9001', ensuring suppliers with equivalent certifications aren't excluded. Process audit coverage: 'welding qualification' includes 'EN 1090', 'AWS D1.1', 'ISO 3834', capturing all relevant welding certification schemes.",
      example: "Example: Search 'investment casting'. System automatically expands to search: 'Investment casting', 'Lost wax casting', 'Precision casting', 'Feinguss' (German), 'Microfusione' (Italian), 'Cire perdue' (French), 'Vacuum casting', 'Ceramic mold casting'. Result: finds 47 qualified suppliers globally instead of 12 using only 'investment casting', including a specialized foundry listing services as '精密鋳造' (precision casting)."
                }
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedAIFeature(index)}
                className="cursor-pointer"
              >
                <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all h-full border-0 p-6 hover:scale-105">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#0D9488] flex items-center justify-center shadow-lg">
                        <benefit.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{benefit.description}</p>
                      <button className="text-[#14B8A6] text-sm font-semibold hover:text-[#0D9488] flex items-center gap-1">
                        Click to learn more
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white" data-nav-theme="light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]"></div>
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">FAQ</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-[#14B8A6]">We answer all questions</span>
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
                <AccordionItem value={`item-${index}`} className="bg-gradient-to-r from-gray-50 to-white rounded-2xl px-6 border-0 shadow-sm hover:shadow-md transition-all">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline text-gray-900 py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 50%, rgb(15, 23, 42) 100%)" }}>
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, #14B8A6 0%, transparent 70%)", opacity: 0.2 }}
            animate={{
              x: ["0%", "100%", "0%"],
              y: ["0%", "100%", "0%"],
              scale: [1, 1.5, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-0 bottom-0 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, #0D9488 0%, transparent 70%)", opacity: 0.15 }}
            animate={{
              x: ["0%", "-100%", "0%"],
              y: ["0%", "-100%", "0%"],
              scale: [1.5, 1, 1.5]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#14B8A6]/10 rounded-full mb-6 border border-[#14B8A6]/20"
            >
              <Sparkles className="w-4 h-4 text-[#14B8A6]" />
              <span className="text-sm font-semibold text-[#14B8A6]">Find companies</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-8"
            >
              Start searching today
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-2 flex items-center gap-4 max-w-2xl mx-auto mb-8 shadow-2xl"
            >
              <Search className="w-6 h-6 text-gray-400 ml-4" />
              <input
                type="text"
                placeholder="Ask our AI to find the right companies"
                className="flex-1 outline-none text-gray-600 bg-transparent py-2"
              />
              <Button className="bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:from-[#0F9B8E] hover:to-[#0A7A6E] text-white rounded-full px-8 py-6 shadow-lg hover:scale-105 transition-all">
                Search
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex gap-3 justify-center flex-wrap"
            >
              <span className="text-gray-400 text-sm">Popular:</span>
              {["Quantum Chips", "Quantum Simulations", "Precision Farming", "3D Bin Picking"].map((tag, index) => (
                <motion.button
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-all border border-white/10 hover:border-[#14B8A6]/30"
                >
                  {tag}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />

      {/* AI Feature Detail Modal */}
      <Dialog open={selectedAIFeature !== null} onOpenChange={() => setSelectedAIFeature(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background via-background to-muted/20 backdrop-blur-xl border border-border/50">
          {selectedAIFeature !== null && (() => {
            const features = [
              {
                icon: Cpu,
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
                icon: FileText,
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
                icon: Target,
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
                icon: Shield,
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
                icon: Users,
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
                icon: Zap,
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
                icon: Clock,
                title: "Real-Time Data Enrichment",
                detailedExplanation: {
                  overview: "Supplier data is continuously updated through web monitoring, official registry checks, and certification database integration—ensuring you always have current information without manual research.",
                  forEngineers: "Automatically notified when suppliers gain new technical capabilities: 'Supplier X acquired new 5-axis machining center (installed March 2024)', 'New material certification added: PEEK machining'. Also alerts to capability losses: 'Heat treatment furnace decommissioned' or 'NADCAP special process approval suspended', preventing specification of unavailable processes.",
                  forBuyers: "Critical business intelligence updates: 'Supplier Y opened new facility (operational August 2024)', 'Credit rating downgraded', or 'Acquired by Competitor Z (potential IP exposure risk)'. Early warning of insolvency proceedings, major leadership changes, or facility closures enables proactive risk mitigation.",
                  forAuditors: "Real-time certification status tracking: 'ISO 9001 renewed June 2024 (valid to 2027)', 'IATF surveillance audit scheduled September 2024', or 'ISO 14001 expired—renewal pending'. Automatically flags suppliers requiring audit priority due to upcoming certification renewals or recent major non-conformances reported in certification databases.",
                  example: "Example: A stamped parts supplier: January 2024—system shows 'IATF 16949:2016 certified'. April 2024—automatic update detects facility expansion: '+5,000 sq meters, two new press lines'. June 2024—alert: 'Major fire in Building C reported, production capacity temporarily reduced'. October 2024—update: 'Production restored, ISO 14001 environmental certification renewed post-incident'."
                }
              },
              {
                icon: Globe,
                title: "Alternative Term Discovery",
                detailedExplanation: {
                  overview: "Manufacturing processes and materials are described differently across regions, industries, and languages. The AI automatically searches all equivalent terms to ensure no qualified suppliers are missed due to terminology differences.",
                  forEngineers: "Technical synonym expansion ensures comprehensive results: 'CNC milling' also searches 'machining center', 'Fraesen' (German), 'fraisage' (French). Material variations: 'aluminum' finds 'aluminium' (UK/EU), '6061-T6' also searches 'AlMgSi1 T6' (European designation). Process equivalents: 'anodizing' includes 'anodising', 'eloxal' (German), 'sulfuric anodize Type II', ensuring global supplier coverage.",
                  forBuyers: "Prevents missed sourcing opportunities due to regional naming: 'sheet metal fabrication' automatically includes 'metal stamping', 'presswork', 'panel beating'. Industry-specific terms: 'aerospace machining' also searches 'aviation components', 'flight hardware manufacturing'. This maximizes competitive bidding and finds niche specialists using non-standard terminology.",
                  forAuditors: "Certification name variations: 'ISO 9001' search includes 'ISO 9001:2015', 'ISO 9001:2008 (transition)', 'EN ISO 9001', ensuring suppliers with equivalent certifications aren't excluded. Process audit coverage: 'welding qualification' includes 'EN 1090', 'AWS D1.1', 'ISO 3834', capturing all relevant welding certification schemes.",
                  example: "Search: 'investment casting'. System automatically expands to search: 'Investment casting', 'Lost wax casting', 'Precision casting', 'Feinguss' (German), 'Microfusione' (Italian), 'Cire perdue' (French), 'Vacuum casting', 'Ceramic mold casting'. Result: finds 47 qualified suppliers globally instead of 12 using only 'investment casting', including a specialized Japanese foundry listing services as '精密鋳造' (precision casting)."
                }
              }
            ];
            const feature = features[selectedAIFeature];
            const FeatureIcon = feature.icon;
            
            return (
              <div className="space-y-6">
                <DialogHeader className="pb-6 border-b border-border/30">
                  <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-[#14B8A6] to-[#0D9488] bg-clip-text text-transparent">
                    {feature.title}
                  </DialogTitle>
                  <p className="text-base text-muted-foreground mt-2 leading-relaxed">
                    {feature.detailedExplanation.overview}
                  </p>
                </DialogHeader>

                <div className="space-y-4 mt-6">
                  {/* For Engineers */}
                  <div className="group relative bg-gradient-to-br from-blue-500/5 to-blue-600/5 p-6 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                        <Target className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-lg text-foreground">For Engineers</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.detailedExplanation.forEngineers}
                    </p>
                  </div>

                  {/* For Procurement & Buyers */}
                  <div className="group relative bg-gradient-to-br from-[#14B8A6]/5 to-[#0D9488]/5 p-6 rounded-2xl border border-[#14B8A6]/20 hover:border-[#14B8A6]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#14B8A6]/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[#14B8A6]/10 rounded-lg group-hover:bg-[#14B8A6]/20 transition-colors">
                        <TrendingUp className="w-5 h-5 text-[#14B8A6]" />
                      </div>
                      <h3 className="font-semibold text-lg text-foreground">For Procurement & Buyers</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.detailedExplanation.forBuyers}
                    </p>
                  </div>

                  {/* For Quality & Auditors */}
                  <div className="group relative bg-gradient-to-br from-gray-500/5 to-gray-600/5 p-6 rounded-2xl border border-gray-500/20 hover:border-gray-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gray-500/10 rounded-lg group-hover:bg-gray-500/20 transition-colors">
                        <Shield className="w-5 h-5 text-gray-600" />
                      </div>
                      <h3 className="font-semibold text-lg text-foreground">For Quality & Auditors</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.detailedExplanation.forAuditors}
                    </p>
                  </div>

                  {/* Real-World Application */}
                  <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 p-6 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                      </div>
                      <h3 className="font-semibold text-lg text-white">Real-World Application</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.detailedExplanation.example}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <Button 
                    onClick={() => setSelectedAIFeature(null)}
                    className="bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:from-[#0F9B8E] hover:to-[#0A7A6E] text-white rounded-xl px-8"
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedSupplier && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedSupplier.name}
                    </DialogTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-[#14B8A6]" />
                        <span>{selectedSupplier.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-[#14B8A6]" />
                        <span>{selectedSupplier.employees} employees</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Factory className="w-4 h-4 text-[#14B8A6]" />
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
              <div className="grid grid-cols-3 gap-4">
                <Card className="rounded-2xl border-[#14B8A6]/20">
                  <CardContent className="p-4">
                    <p className="text-xs text-gray-600 mb-1">Experience</p>
                    <p className="text-lg font-bold text-[#14B8A6]">{selectedSupplier.experience}</p>
                  </CardContent>
                </Card>
                <Card className="rounded-2xl border-blue-500/20">
                  <CardContent className="p-4">
                    <p className="text-xs text-gray-600 mb-1">Production Capacity</p>
                    <p className="text-sm font-semibold text-blue-600">{selectedSupplier.capacity}</p>
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
                  <Award className="w-5 h-5 text-[#14B8A6]" />
                  Certifications & Standards
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSupplier.certifications.map((cert: string) => (
                    <Badge key={cert} className="bg-[#14B8A6]/10 text-[#14B8A6] hover:bg-[#14B8A6]/20 border-[#14B8A6]/30">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Capabilities */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#14B8A6]" />
                  Core Capabilities
                </h3>
                <div className="grid grid-cols-2 gap-3">
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
                <Button className="flex-1 bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:from-[#0F9B8E] hover:to-[#0A7A6E] text-white rounded-xl">
                  Request Quote
                </Button>
                <Button variant="outline" className="flex-1 border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6]/10 rounded-xl">
                  Schedule Audit
                </Button>
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl">
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
