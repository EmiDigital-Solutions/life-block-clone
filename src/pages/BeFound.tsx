import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Check, User, Building2, Award, Image, BarChart3, Eye, Users, TrendingUp, MessageSquare, Mail, FileText, Star, Clock, Plus, Minus } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import supplierPortraitHero from "@/assets/supplier-portrait-hero.png";

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

// Window Chrome Component for mockups
const WindowChrome = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="w-full h-full bg-[#fafafa] rounded-lg overflow-hidden flex flex-col shadow-xl border border-gray-200">
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

// Profile Builder Mockup
const ProfileBuilderMockup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completionPercent, setCompletionPercent] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
      setCompletionPercent((prev) => Math.min(100, prev + 15 > 100 ? 45 : prev + 15));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const profileSections = [
    { icon: Building2, label: "Company Info", completed: true },
    { icon: Award, label: "Certifications", completed: activeStep >= 1 },
    { icon: Image, label: "Product Gallery", completed: activeStep >= 2 },
    { icon: FileText, label: "Capabilities", completed: activeStep >= 3 },
  ];

  return (
    <WindowChrome title="YVOO — Profile Builder">
      <div className="h-full flex text-[10px] bg-[#f8f9fa]">
        {/* Sidebar */}
        <div className="w-36 bg-white border-r border-gray-100 p-3">
          <div className="mb-4">
            <div className="text-[8px] text-gray-400 uppercase tracking-wider mb-2">Profile Strength</div>
            <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary rounded-full"
                animate={{ width: `${completionPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <motion.div 
              className="text-right text-[9px] font-semibold text-primary mt-1"
              key={completionPercent}
            >
              {completionPercent}%
            </motion.div>
          </div>
          
          <div className="space-y-1">
            {profileSections.map((section, i) => (
              <motion.div
                key={i}
                className={`flex items-center gap-2 p-2 rounded ${activeStep === i ? 'bg-primary/10' : ''}`}
                animate={{ 
                  backgroundColor: activeStep === i ? 'rgba(10, 127, 165, 0.1)' : 'transparent'
                }}
              >
                <div className={`w-4 h-4 rounded flex items-center justify-center ${section.completed ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                  {section.completed ? <Check className="w-2.5 h-2.5" /> : <section.icon className="w-2.5 h-2.5 text-gray-400" />}
                </div>
                <span className={section.completed ? 'text-gray-900 font-medium' : 'text-gray-400'}>{section.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-gray-100 p-4 h-full"
          >
            <div className="font-semibold text-gray-900 mb-3">{profileSections[activeStep].label}</div>
            
            {activeStep === 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">TechManufacturing GmbH</div>
                    <div className="text-[9px] text-gray-400">Precision Engineering</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 rounded p-2">
                    <div className="text-[8px] text-gray-400">Location</div>
                    <div className="font-medium">Munich, Germany</div>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <div className="text-[8px] text-gray-400">Employees</div>
                    <div className="font-medium">250-500</div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="grid grid-cols-2 gap-2">
                {['ISO 9001:2015', 'ISO 14001', 'IATF 16949', 'AS9100D'].map((cert, i) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-green-50 border border-green-200 rounded p-2 flex items-center gap-2"
                  >
                    <Award className="w-3 h-3 text-green-600" />
                    <span className="text-green-700 font-medium">{cert}</span>
                  </motion.div>
                ))}
              </div>
            )}

            {activeStep === 2 && (
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center"
                  >
                    <Image className="w-4 h-4 text-gray-400" />
                  </motion.div>
                ))}
              </div>
            )}

            {activeStep === 3 && (
              <div className="space-y-2">
                {['CNC Machining', 'Sheet Metal', 'Injection Molding', 'Assembly'].map((cap, i) => (
                  <motion.div
                    key={cap}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 bg-gray-50 rounded p-2"
                  >
                    <Check className="w-3 h-3 text-primary" />
                    <span>{cap}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </WindowChrome>
  );
};

// Analytics Dashboard Mockup
const AnalyticsDashboardMockup = () => {
  const [viewCount, setViewCount] = useState(1247);
  const [activeDay, setActiveDay] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
      setActiveDay((prev) => (prev + 1) % 7);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const weekData = [65, 82, 45, 93, 78, 56, 89];
  const recentViewers = [
    { company: "Bosch Automotive", role: "Procurement Lead", time: "2 min ago" },
    { company: "Siemens Energy", role: "Quality Manager", time: "15 min ago" },
    { company: "BMW Group", role: "Supplier Dev.", time: "1 hour ago" },
  ];

  return (
    <WindowChrome title="YVOO — Profile Analytics">
      <div className="h-full p-4 text-[10px] bg-[#f8f9fa]">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Profile Views", value: viewCount.toLocaleString(), change: "+12%", icon: Eye },
            { label: "Unique Visitors", value: "892", change: "+8%", icon: Users },
            { label: "Search Appearances", value: "3.4K", change: "+24%", icon: TrendingUp },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-lg p-3 border border-gray-100">
              <div className="flex items-center gap-1 mb-1">
                <stat.icon className="w-3 h-3 text-primary" />
                <span className="text-gray-400 text-[8px]">{stat.label}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <motion.span 
                  className="text-lg font-bold text-gray-900"
                  key={stat.value}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-green-500 text-[9px] font-medium">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg p-3 border border-gray-100 mb-4">
          <div className="text-[9px] font-semibold text-gray-900 mb-3">Weekly Views</div>
          <div className="flex items-end justify-between h-16 gap-1">
            {weekData.map((value, i) => (
              <motion.div
                key={i}
                className={`flex-1 rounded-t ${activeDay === i ? 'bg-primary' : 'bg-gray-200'}`}
                animate={{ height: `${value}%` }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1 text-[8px] text-gray-400">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
        </div>

        {/* Recent Viewers */}
        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
            <span className="font-semibold text-gray-900">Recent Viewers</span>
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-green-500"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
          <div className="divide-y divide-gray-50">
            {recentViewers.map((viewer, i) => (
              <motion.div
                key={i}
                className="px-3 py-2 flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{viewer.company}</div>
                    <div className="text-[8px] text-gray-400">{viewer.role}</div>
                  </div>
                </div>
                <span className="text-[8px] text-gray-400">{viewer.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};

// Lead Management Mockup
const LeadManagementMockup = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [newLeadPulse, setNewLeadPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNewLeadPulse(true);
      setTimeout(() => setNewLeadPulse(false), 1000);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const leads = [
    { company: "Continental AG", type: "RFQ", status: "New", priority: "high", value: "€45K" },
    { company: "ZF Friedrichshafen", type: "Quote Request", status: "Responded", priority: "medium", value: "€28K" },
    { company: "Schaeffler Group", type: "Information", status: "In Progress", priority: "low", value: "€12K" },
  ];

  return (
    <WindowChrome title="YVOO — Lead Manager">
      <div className="h-full text-[10px] bg-[#f8f9fa]">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-white">
          {['Inbox', 'Active', 'Archived'].map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 font-medium relative ${activeTab === i ? 'text-primary' : 'text-gray-400'}`}
            >
              {tab}
              {i === 0 && (
                <motion.span 
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[8px] flex items-center justify-center"
                  animate={{ scale: newLeadPulse ? [1, 1.2, 1] : 1 }}
                >
                  3
                </motion.span>
              )}
              {activeTab === i && (
                <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="flex gap-4 p-3 bg-white border-b border-gray-100">
          {[
            { label: "New Leads", value: "12", color: "text-primary" },
            { label: "Response Rate", value: "94%", color: "text-green-500" },
            { label: "Avg. Response", value: "2.4h", color: "text-amber-500" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`font-bold ${stat.color}`}>{stat.value}</span>
              <span className="text-gray-400 text-[8px]">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Lead List */}
        <div className="p-3 space-y-2">
          {leads.map((lead, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-lg border border-gray-100 p-3"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    lead.priority === 'high' ? 'bg-red-500' : 
                    lead.priority === 'medium' ? 'bg-amber-500' : 'bg-gray-300'
                  }`} />
                  <div>
                    <div className="font-semibold text-gray-900">{lead.company}</div>
                    <div className="text-[8px] text-gray-400">{lead.type}</div>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[8px] font-medium ${
                  lead.status === 'New' ? 'bg-primary/10 text-primary' :
                  lead.status === 'Responded' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {lead.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Mail className="w-3 h-3" />
                    <span>2</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>24h</span>
                  </div>
                </div>
                <span className="font-semibold text-primary">{lead.value}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </WindowChrome>
  );
};

// FAQ Categories and Data for BeFound
const beFoundFaqCategories = [
  {
    id: "profiles",
    label: "Profiles",
    faqs: [
      {
        question: "Is creating a supplier profile free?",
        answer: "Yes, basic profiles are completely free forever. You can claim your company, add products, certifications, and capabilities at no cost. Premium features like priority placement and analytics require a subscription.",
      },
      {
        question: "How do I claim my company profile?",
        answer: "Search for your company name on YVOO. If it exists, click 'Claim This Profile' and verify ownership via email domain or documentation. If not found, create a new profile in under 5 minutes.",
      },
      {
        question: "What information should I include in my profile?",
        answer: "Complete profiles rank higher. Include company overview, certifications (ISO, IATF, etc.), product categories, manufacturing capabilities, equipment list, capacity, and high-quality images of your facility and products.",
      },
      {
        question: "Can I update my profile anytime?",
        answer: "Yes, you have full control. Update products, add new certifications, change images, and modify capabilities whenever needed. Changes go live immediately.",
      },
    ],
  },
  {
    id: "visibility",
    label: "Visibility",
    faqs: [
      {
        question: "How do buyers find my profile?",
        answer: "Buyers search by product category, capability, certification, location, and industry. Our AI matches their requirements to relevant suppliers. Complete profiles with verified certifications rank higher in search results.",
      },
      {
        question: "What is premium placement?",
        answer: "Premium suppliers appear at the top of search results, get featured in buyer newsletters, and receive priority visibility in relevant categories. This typically results in 5x more profile views.",
      },
      {
        question: "How can I improve my search ranking?",
        answer: "Complete all profile sections, verify certifications, add detailed product descriptions, upload quality images, respond quickly to inquiries, and maintain high response rates. Profile completeness directly impacts ranking.",
      },
      {
        question: "Can I see which buyers viewed my profile?",
        answer: "Premium accounts see detailed analytics: which companies viewed your profile, what they searched for, time spent on your profile, and geographic distribution of viewers.",
      },
    ],
  },
  {
    id: "leads",
    label: "Lead Generation",
    faqs: [
      {
        question: "How do I receive inquiries from buyers?",
        answer: "Buyers can contact you directly through the platform via RFQ forms, quote requests, or direct messages. You receive instant notifications via email and dashboard. Premium users get priority lead routing.",
      },
      {
        question: "What qualifies as a lead?",
        answer: "Leads include RFQ submissions, quote requests, capability inquiries, and direct contact requests from verified procurement professionals. All leads include buyer company info and specific requirements.",
      },
      {
        question: "How quickly should I respond to inquiries?",
        answer: "We recommend responding within 24 hours. Fast response rates improve your profile ranking and buyer satisfaction. Our analytics show suppliers with <4 hour response times win 3x more projects.",
      },
      {
        question: "Can I filter or qualify leads?",
        answer: "Yes, you can set preferences for lead types, minimum order values, geographic regions, and industries. Premium accounts can auto-decline leads that don't match your criteria.",
      },
    ],
  },
];

// BeFound FAQ Component
const BeFoundFAQ = () => {
  const [activeCategory, setActiveCategory] = useState("profiles");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const activeFaqs = beFoundFaqCategories.find((cat) => cat.id === activeCategory)?.faqs || [];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setOpenIndex(0);
  };

  return (
    <section className="py-24 md:py-32 px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="section-headline text-foreground">
            Questions suppliers ask
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {beFoundFaqCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? "bg-foreground text-white"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl"
        >
          {activeFaqs.map((faq, index) => (
            <div
              key={index}
              className="border-t border-border"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg md:text-xl text-foreground font-medium leading-snug">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center transition-colors duration-200 group-hover:bg-muted/80">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                  ) : (
                    <Plus className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                  )}
                </div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed pb-6 pr-16">
                  {faq.answer}
                </p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const BeFound = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section
        data-nav-theme="light"
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 sm:px-6 lg:px-12 xl:px-24 bg-background"
        id="hero"
      >
        <div className="container mx-auto max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-muted-foreground text-sm font-mono tracking-wider mb-6"
          >
            Be Found
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground mb-8"
          >
            Get discovered by global buyers
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10"
          >
            7 million+ B2B decision-makers are searching for suppliers like you. Claim your free profile and start getting found.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Button size="lg">
              Claim Your Profile
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background">
              See How It Works
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Cards */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Increase visibility",
                description: "Get discovered by 7M+ procurement professionals searching for suppliers like you."
              },
              {
                title: "Generate qualified leads",
                description: "Turn profile views into RFQs with optimized supplier profiles and premium placement."
              },
              {
                title: "Track buyer interest",
                description: "Real-time analytics show who's viewing your profile and what they're searching for."
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

      {/* First Testimonial - Archlet Side-by-Side Style */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Portrait Photo - Smaller, B&W, left-aligned */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-square max-w-sm bg-muted overflow-hidden justify-self-start"
            >
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80" 
                alt="Michael Weber"
                className="w-full h-full object-cover grayscale"
              />
            </motion.div>
            
            {/* Quote Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Company Logo */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-foreground rounded flex items-center justify-center">
                  <span className="text-background text-xs font-bold">TM</span>
                </div>
                <span className="text-lg font-bold text-foreground tracking-wide">TECHMANUFACTURING</span>
              </div>
              
              {/* Quote */}
              <blockquote className="text-lg md:text-xl text-foreground leading-relaxed">
                "YVOO's platform literally pays for itself with the quality of leads we receive. We now get discovered by buyers we never could have reached before."
              </blockquote>
              
              {/* Attribution */}
              <div>
                <p className="font-semibold text-foreground">Michael Weber</p>
                <p className="text-sm text-muted-foreground">VP Sales, TechManufacturing</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pain Points Section - Homepage Style */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 bg-background overflow-hidden">
        {/* Concentric squared background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className="absolute w-[1600px] h-[1600px] border border-secondary/10"
          />
          <div 
            className="absolute w-[1300px] h-[1300px] bg-secondary/5"
          />
          <div 
            className="absolute w-[1000px] h-[1000px] bg-secondary/10"
          />
          <div 
            className="absolute w-[700px] h-[700px] bg-secondary/15"
          />
          <div 
            className="absolute w-[400px] h-[400px] bg-secondary/20"
          />
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Headline */}
            <h2 className="section-headline text-foreground text-center px-4">
              Imagine if you didn't have to spend time...
            </h2>

            {/* Image with soft glowing gradient background and overlapping cards */}
            <div className="relative flex flex-col lg:flex-row items-center justify-center min-h-[800px] lg:min-h-[800px]">
              {/* Container for image - centered */}
              <div className="relative flex justify-center items-center lg:absolute lg:top-1/2 lg:-translate-y-1/2 mb-[-60px] sm:mb-[-80px] lg:mb-0 z-10">
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <img 
                    src={supplierPortraitHero} 
                    alt="Thoughtful supplier considering opportunities" 
                    className="max-w-[90vw] sm:max-w-[540px] w-full h-auto object-contain mx-auto drop-shadow-2xl"
                    style={{ filter: "grayscale(100%) contrast(1.1) drop-shadow(0 25px 50px rgba(0,0,0,0.25))" }}
                  />
                </motion.div>
              </div>

              {/* Pain Point Cards - stacked on mobile, scattered around image on desktop */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="relative z-20 w-full px-4 lg:absolute lg:inset-0 lg:px-0"
              >
                {/* Mobile: Stacked cards */}
                <div className="lg:hidden space-y-2 sm:space-y-3 md:space-y-4 max-w-2xl w-full mx-auto">
                  {[
                    { text: "Knowing when qualified buyers are actively searching for your exact product capabilities" },
                    { text: "Having buyers automatically discover your company profile without cold outreach" },
                    { text: "Getting visibility into which procurement teams viewed your products and services" },
                    { text: "Receiving pre-qualified RFQs from buyers who already match your ideal customer profile" },
                    { text: "Manually updating your company information across multiple platforms" },
                    { text: "Missing opportunities because buyers couldn't find your capabilities" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-lg p-3 sm:p-4 md:p-6 flex items-start gap-2 sm:gap-3 md:gap-4 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                    >
                      <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="sm:w-5 sm:h-5 md:w-6 md:h-6">
                          <rect x="8" y="0" width="4" height="4" fill="black"/>
                          <rect x="12" y="4" width="4" height="4" fill="black"/>
                          <rect x="16" y="8" width="4" height="4" fill="black"/>
                          <rect x="12" y="12" width="4" height="4" fill="black"/>
                          <rect x="8" y="16" width="4" height="4" fill="black"/>
                          <rect x="0" y="8" width="16" height="4" fill="black"/>
                        </svg>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                        {item.text}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Desktop: Scattered cards around image */}
                <div className="hidden lg:block">
                  {[
                    { text: "Knowing when qualified buyers are actively searching for your exact product capabilities" },
                    { text: "Having buyers automatically discover your company profile without cold outreach" },
                    { text: "Getting visibility into which procurement teams viewed your products and services" },
                    { text: "Receiving pre-qualified RFQs from buyers who already match your ideal customer profile" },
                    { text: "Manually updating your company information across multiple platforms" },
                    { text: "Missing opportunities because buyers couldn't find your capabilities" }
                  ].map((item, index) => {
                    const positions = [
                      { top: '32%', left: '2%' },
                      { top: '32%', right: '2%' },
                      { top: '50%', left: '0%', transform: 'translateY(-50%)' },
                      { top: '50%', right: '0%', transform: 'translateY(-50%)' },
                      { top: '68%', left: '2%' },
                      { top: '68%', right: '2%' }
                    ];

                    const position = positions[index] || positions[0];

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="absolute bg-white rounded-lg p-6 flex items-start gap-4 shadow-xl hover:shadow-2xl transition-all border border-gray-100 max-w-[360px] w-[360px]"
                        style={{
                          ...position,
                          transform: position.transform || 'none'
                        }}
                      >
                        <div className="flex-shrink-0 mt-1">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <rect x="8" y="0" width="4" height="4" fill="black"/>
                            <rect x="12" y="4" width="4" height="4" fill="black"/>
                            <rect x="16" y="8" width="4" height="4" fill="black"/>
                            <rect x="12" y="12" width="4" height="4" fill="black"/>
                            <rect x="8" y="16" width="4" height="4" fill="black"/>
                            <rect x="0" y="8" width="16" height="4" fill="black"/>
                          </svg>
                        </div>
                        <p className="text-base text-gray-700 leading-snug line-clamp-2">
                          {item.text}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Section 1 - Profile Builder */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="section-headline text-foreground">
                Claim and build your digital twin
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Search for your company and take control instantly. Create a comprehensive digital representation of your business — add products, certifications, media, and detailed capabilities. Your digital twin becomes the single source of truth that buyers trust and rely on.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="aspect-[4/3]"
            >
              <ProfileBuilderMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Section 2 - Analytics */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="aspect-[4/3] order-2 lg:order-1"
            >
              <AnalyticsDashboardMockup />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 order-1 lg:order-2"
            >
              <h2 className="section-headline text-foreground">
                Track who's viewing your profile
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                See exactly which procurement teams are viewing your products, what they're searching for, and when they're most active. Make data-driven decisions to optimize your visibility.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Section 3 - Lead Management */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="section-headline text-foreground">
                Convert views into qualified leads
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Buyers can contact you directly through the platform. With premium ads, get 5x more visibility and priority placement in search results.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="aspect-[4/3]"
            >
              <LeadManagementMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Second Testimonial - Archlet 3-Column Style */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          {/* Section Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-headline text-foreground mb-12"
          >
            Suppliers growing with YVOO
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
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              
              {/* Stat */}
              <div>
                <p className="text-5xl md:text-6xl font-bold text-white tracking-[-0.02em]">
                  3x
                </p>
                <p className="text-xl text-white/90 font-medium mt-2">
                  more qualified leads
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
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" 
                alt="Sarah Chen - Director of Operations"
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
                  <span className="text-background text-xs font-bold">PD</span>
                </div>
                <span className="text-lg font-bold text-foreground tracking-wide">PRECISION DYNAMICS</span>
              </div>
              
              {/* Quote */}
              <blockquote className="text-lg text-foreground leading-relaxed">
                "Within weeks of optimizing our YVOO profile, we started receiving inquiries from OEMs we had been trying to reach for years. The platform has become our primary channel for new business development."
              </blockquote>
              
              {/* Attribution */}
              <div>
                <p className="font-semibold text-foreground">Sarah Chen,</p>
                <p className="text-sm text-primary">Director of Operations & Business Development</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Archlet Style */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-headline text-foreground max-w-2xl mb-16"
          >
            Known for driving supplier visibility and qualified leads
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
              <p className="text-sm text-foreground/50 font-mono tracking-wide mb-2">Get discovered faster</p>
              <div className="border-t border-foreground/20 pt-4">
                <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-[-0.02em]">
                  5x
                </p>
                <p className="text-foreground/60 leading-relaxed text-sm">
                  More visibility with optimized digital twin profiles
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
              <p className="text-sm text-foreground/50 font-mono tracking-wide mb-2">Increase qualified leads</p>
              <div className="border-t border-foreground/20 pt-4">
                <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-[-0.02em]">
                  3x
                </p>
                <p className="text-foreground/60 leading-relaxed text-sm">
                  More RFQ submissions from verified buyers
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
              <p className="text-sm text-foreground/50 font-mono tracking-wide mb-2">Buyer searches annually</p>
              <div className="border-t border-foreground/20 pt-4">
                <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-[-0.02em]">
                  7M+
                </p>
                <p className="text-foreground/60 leading-relaxed text-sm">
                  Procurement professionals actively searching
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
              <p className="text-sm text-foreground/50 font-mono tracking-wide mb-2">Win more projects</p>
              <div className="border-t border-foreground/20 pt-4">
                <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-[-0.02em]">
                  40%
                </p>
                <p className="text-foreground/60 leading-relaxed text-sm">
                  Higher conversion rate from inquiry to contract
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
              Read more
            </a>
          </motion.div>
        </div>
      </section>

      {/* Industries Section - Auto-scrolling */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="section-headline text-foreground mb-4">
              Trusted by industry leaders
            </h2>
            <p className="text-muted-foreground">
              Suppliers from leading industries use YVOO to get discovered.
            </p>
          </motion.div>
        </div>
        
        {/* Auto-scrolling Industry Cards */}
        <div className="relative">
          <motion.div
            className="flex gap-4"
            animate={{ x: [0, -2000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              },
            }}
          >
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-4">
                {[
                  { name: "Automotive", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&h=500&fit=crop" },
                  { name: "Manufacturing", image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=500&h=500&fit=crop" },
                  { name: "Aerospace", image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=500&h=500&fit=crop" },
                  { name: "Healthcare & Pharma", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop" },
                  { name: "Chemicals", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&h=500&fit=crop" },
                  { name: "Electronics", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=500&fit=crop" },
                  { name: "Energy & Utilities", image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=500&h=500&fit=crop" },
                  { name: "Food & Beverage", image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&h=500&fit=crop" },
                ].map((industry) => (
                  <div
                    key={`${setIndex}-${industry.name}`}
                    className="flex-shrink-0 w-[240px] aspect-square relative overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={industry.image}
                      alt={industry.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-semibold text-sm">{industry.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Digital Twin Builder Features Section */}
      <section className="py-20 px-6 bg-white border-t border-foreground/10">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 mb-16"
          >
            <h2 className="section-headline text-foreground">
              Digital Twin Builder features
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Our AI guides you step-by-step to create a comprehensive digital twin of your manufacturing capabilities—making your company discoverable by global buyers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0"
          >
            {[
              {
                title: "AI-Guided Profile Creation",
                description: "Our AI assistant walks you through each step, suggesting content, extracting data from documents, and ensuring your digital twin is complete and optimized."
              },
              {
                title: "Equipment & Machine Registry",
                description: "Upload photos of your machines—AI identifies models, specs, and capabilities automatically. Build a verified inventory of your production assets."
              },
              {
                title: "Capability Mapping",
                description: "AI analyzes your equipment and certifications to generate a comprehensive capability matrix that matches buyer search queries."
              },
              {
                title: "Certification Verification",
                description: "Upload certificates and AI extracts validity dates, scope, and standards. Verified badges display automatically on your digital twin."
              },
              {
                title: "Capacity & Lead Time Intelligence",
                description: "Define production capacity, typical lead times, and availability. AI updates recommendations based on industry benchmarks."
              },
              {
                title: "Product Gallery Builder",
                description: "Upload product images and AI generates descriptions, specs, and searchable tags. Showcase your portfolio professionally."
              },
              {
                title: "Quality Process Documentation",
                description: "AI helps document your quality processes, inspection capabilities, and compliance workflows in buyer-friendly formats."
              },
              {
                title: "Multi-Language Auto-Translation",
                description: "Your digital twin automatically translates to 12+ languages, making you discoverable by buyers worldwide."
              },
              {
                title: "Completeness Scoring",
                description: "Real-time scoring shows profile strength. AI suggests improvements that increase visibility and buyer engagement."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * index }}
                className="py-8 pr-8 border-t border-foreground/10"
              >
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <BeFoundFAQ />

      {/* Final CTA */}
      <section className="py-32 px-6 bg-foreground">
        <div className="container mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="section-headline text-background">
              Start getting discovered today
            </h2>
            <p className="text-xl text-background/80 max-w-2xl mx-auto">
              Join thousands of suppliers connecting with buyers worldwide
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-background/90"
              >
                Claim Your Free Profile
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-background text-background hover:bg-background hover:text-foreground"
              >
                Request a Demo
              </Button>
            </div>
            <p className="text-background/60 text-sm">
              Free forever · No credit card · 3 minute setup
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BeFound;
