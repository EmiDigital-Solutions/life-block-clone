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
import { FeatureModal } from "@/components/FeatureModal";
import SearchSuppliersFAQ from "@/components/SearchSuppliersFAQ";

// Import procurement images for hero carousel background
import procurementFemaleAfrican from "@/assets/procurement-female-african.jpg";
import procurementFemaleAsian from "@/assets/procurement-female-asian.jpg";
import procurementFemaleBlonde from "@/assets/procurement-female-blonde.jpg";
import procurementFemaleEuropean from "@/assets/procurement-female-european.jpg";
import procurementMaleAsian from "@/assets/procurement-male-asian.jpg";
import procurementMaleEuropean from "@/assets/procurement-male-european.jpg";
import procurementMaleLatin from "@/assets/procurement-male-latin.jpg";
import procurementMaleSouthAsian from "@/assets/procurement-male-south-asian.jpg";

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
      
      {/* Hero Section - Full-screen Image Carousel Background */}
      <section 
        data-nav-theme="white"
        className="relative min-h-screen flex flex-col overflow-hidden"
      >
        {/* Full-screen Image Carousel Background */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: index === heroImageIndex ? 1 : 0,
                scale: index === heroImageIndex ? 1 : 1.1
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
        </div>

        {/* Main Content - Archlet Style: Centered vertically, left-aligned */}
        <div className="flex-1 flex items-center relative z-10 pt-32 lg:pt-40">
          <div className="px-6 lg:px-12 xl:px-24 w-full max-w-7xl mx-auto">
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
                Global Supplier Database
              </motion.p>

              {/* Main Headline - Archlet Style, 2 rows only */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-white max-w-5xl"
              >
                Find suppliers<br />
                worldwide in real-time.
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
            <div className="bg-[#ebebeb]/90 backdrop-blur-xl rounded-[32px] overflow-hidden">
              
              {/* Card Header */}
              <div className="bg-foreground px-6 py-4 flex items-center justify-between">
                <h2 className="text-white text-xl font-bold">SearchPro+</h2>
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-primary" />
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
                        <div className="w-5 h-5 rounded bg-gradient-to-br from-[#B2CDBC] to-[#A0B9A9] flex items-center justify-center">
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
                    <CheckCircle2 className="w-5 h-5 text-primary" strokeWidth={3} />
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
                          <MapPin className="w-4 h-4" />
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

      {/* Stats Section */}
      <section className="pt-16 md:pt-96 pb-8 md:pb-20 bg-white" data-nav-theme="light">
        <div className="container mx-auto px-4 md:px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-16"
          >
            <h2 className="section-headline text-foreground mb-3 px-4 max-w-3xl">
              Your next supplier, just a click away
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
                gradient: "from-[#B2CDBC] to-[#A0B9A9]"
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
                <Card className="bg-[#ebebeb]/90 backdrop-blur-xl rounded-[32px] shadow-lg hover:shadow-2xl transition-all h-full border-0 overflow-hidden relative">
                  <CardHeader className="relative p-6 md:p-8">
                    <CardTitle className="text-foreground text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 relative z-10">{item.stat}</CardTitle>
                    <CardDescription className="text-muted-foreground text-base md:text-lg lg:text-xl font-semibold relative z-10">{item.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8 pt-0">
                    <ul className="space-y-2 md:space-y-3">
                      {item.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          className="flex items-center gap-2 md:gap-3 text-muted-foreground text-sm md:text-base"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
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
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-primary"></div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Process</span>
            </div>
            <h2 className="section-headline text-foreground">
              Product Overview
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
                    ? "bg-white text-primary shadow-lg border-2 border-primary/20 scale-105"
                    : "bg-white/50 text-gray-600 hover:bg-white hover:shadow-md"
                }`}
              >
                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                  activeTab === tab.id ? "bg-primary/10" : "bg-gray-100"
                }`}>
                  <tab.icon className={`w-3 h-3 md:w-4 md:h-4 ${activeTab === tab.id ? "text-primary" : "text-gray-500"}`} />
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
                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl hover:from-primary/10 transition-all group"
                      >
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{company.name}</p>
                          <p className="text-sm text-gray-500">{company.location} • {company.year}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <Button className="bg-gradient-to-r from-[#B2CDBC] to-[#A0B9A9] text-white hover:from-[#A0B9A9] hover:to-[#8EA5A0] rounded-full w-full py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    Save to list
                  </Button>
                </div>
              )}
              {activeTab === "save" && (
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-br from-primary/5 to-gray-50 rounded-2xl border border-primary/20">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <Save className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-2">Local List - Automotive Supplier EMEA</p>
                        <p className="text-sm text-gray-600">Contains all contacts gathered during the Automotive Sector for Europe.</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="rounded-full text-primary border-primary/30 hover:bg-primary/10">Share</Button>
                      <Button variant="outline" size="sm" className="rounded-full text-primary border-primary/30 hover:bg-primary/10">Edit</Button>
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
                        <Button variant="outline" className="rounded-full border-primary/30 text-primary hover:bg-primary/10 px-6 py-3">
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
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Key suppliers always in sight</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
                You can easily create lists of suppliers tailored to your business needs and continuously add new ones as you discover them. Your entire team can access the platform and collaborate effortlessly – keeping everyone on the same page and fully aligned.
              </p>
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
            <p className="text-sm font-medium text-muted-foreground mb-4 tracking-wide uppercase">Technology Stack</p>
            <h2 className="section-headline text-foreground max-w-2xl">
              Built for precision, powered by AI
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
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-900 font-bold text-lg mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
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
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-900 font-bold text-lg mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
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
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-900 font-bold text-lg mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
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
            <p className="text-sm font-medium text-muted-foreground mb-4 tracking-wide uppercase">AI Capabilities</p>
            <h2 className="section-headline text-foreground mb-6 max-w-2xl">
              Eight features that transform procurement
            </h2>
            <p className="text-lg text-muted-foreground">
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
                onClick={() => setSelectedAIFeature(feature)}
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
                      <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
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

      {/* How Procurement Teams Use YVOO Search - Industry Showcase Section */}
      <section 
        data-nav-theme="light" 
        className="py-24 md:py-32 bg-background"
      >
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16 text-center"
          >
            <h2 className="section-headline text-foreground max-w-3xl mx-auto mb-4">
              How procurement teams use YVOO Search
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From precision components to complex assemblies—see what teams like yours are sourcing with AI.
            </p>
          </motion.div>

          {/* Product Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
            {/* Large card - CNC Machined Parts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="md:col-span-2 md:row-span-2 group relative overflow-hidden cursor-pointer rounded-2xl"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-[16/10]">
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
              className="group relative overflow-hidden cursor-pointer rounded-2xl"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
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
              className="group relative overflow-hidden cursor-pointer rounded-2xl"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
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
            className="group relative w-full overflow-hidden cursor-pointer mt-4 md:mt-6 max-w-7xl mx-auto rounded-2xl"
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[21/9] md:aspect-[3/1]">
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
              className="bg-[#ebebeb]/90 backdrop-blur-xl rounded-[32px] shadow-lg p-3 flex flex-col md:flex-row items-stretch md:items-center gap-3 max-w-3xl mx-auto mb-8"
            >
              <div className="flex items-center gap-3 flex-1 px-4">
                <Search className="w-5 h-5 text-muted-foreground" />
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
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                        <span>{selectedSupplier.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                        <span>{selectedSupplier.employees} employees</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Factory className="w-3 h-3 md:w-4 md:h-4 text-primary" />
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
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
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
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Core Capabilities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedSupplier.capabilities.map((capability: string) => (
                    <div key={capability} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{capability}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
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
                <Button variant="outline">
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
