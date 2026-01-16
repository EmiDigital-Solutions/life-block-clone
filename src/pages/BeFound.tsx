import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Check, User, Building2, Award, Image, BarChart3, Eye, Users, TrendingUp, MessageSquare, Mail, FileText, Star, Clock } from "lucide-react";
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
            Get discovered<br />
            by global buyers
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
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Portrait Photo - Smaller, B&W */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-[3/4] max-w-sm bg-muted overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80" 
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

      {/* Pain Points Section */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            {/* Role Toggle */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-0 p-1 rounded-lg border-2 border-primary">
                <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm uppercase tracking-wider">
                  Manufacturer
                </button>
                <button className="px-8 py-3 rounded-lg text-foreground font-medium text-sm uppercase tracking-wider hover:bg-muted transition-colors">
                  Distributor
                </button>
              </div>
            </div>

            {/* Headline */}
            <h2 className="section-headline text-foreground text-center">
              Imagine if you didn't have to spend time...
            </h2>

            {/* Image with gradient and cards */}
            <div className="relative flex flex-col items-center">
              <div className="relative flex justify-center items-center mb-[-80px] z-10">
                <div 
                  className="absolute w-[700px] h-[700px] md:w-[800px] md:h-[800px] max-[768px]:w-[450px] max-[768px]:h-[450px] rounded-full z-0"
                  style={{ 
                    background: "radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, hsl(var(--muted) / 0.3) 30%, hsl(var(--secondary) / 0.2) 60%, hsl(var(--primary) / 0.1) 80%, transparent 100%)"
                  }}
                ></div>
                <div className="relative z-10">
                  <img 
                    src={supplierPortraitHero} 
                    alt="Thoughtful supplier considering opportunities" 
                    className="max-w-[450px] w-full max-[768px]:max-w-[90vw] h-auto object-contain mx-auto"
                  />
                </div>
              </div>

              <div className="relative z-20 space-y-3 md:space-y-4 max-w-2xl w-full px-4">
                {[
                  { text: "Know when buyers search for your products", textFull: "Knowing when qualified buyers are actively searching for your exact product capabilities." },
                  { text: "Buyers discover you automatically", textFull: "Having buyers automatically discover your company profile without cold outreach." },
                  { text: "See which teams viewed your profile", textFull: "Getting visibility into which procurement teams viewed your products and services." },
                  { text: "Receive pre-qualified RFQs", textFull: "Receiving pre-qualified RFQs from buyers who already match your ideal customer profile." }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-4 md:p-6 flex items-start gap-3 md:gap-4 shadow-lg hover:shadow-xl transition-shadow border border-border"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <p className="text-base md:text-lg text-foreground leading-relaxed">
                      <span className="md:hidden">{item.text}</span>
                      <span className="hidden md:inline">{item.textFull}</span>
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Section 1 - Profile Builder */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="section-headline text-foreground">
                Claim and optimize your profile in minutes
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Search for your company and take control instantly. Add products, certifications, media, and detailed capabilities. The more complete your profile, the better you rank in buyer searches.
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
        <div className="container mx-auto max-w-6xl">
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
        <div className="container mx-auto max-w-6xl">
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

      {/* Second Testimonial - Archlet Side-by-Side Style */}
      <section className="py-20 px-6 bg-white border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Portrait Photo - Smaller, B&W */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-[3/4] max-w-sm bg-muted overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" 
                alt="Sarah Chen - Director of Operations"
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
                  <span className="text-background text-xs font-bold">PD</span>
                </div>
                <span className="text-lg font-bold text-foreground tracking-wide">PRECISION DYNAMICS</span>
              </div>
              
              {/* Quote */}
              <blockquote className="text-lg md:text-xl text-foreground leading-relaxed">
                "Within weeks of optimizing our YVOO profile, we started receiving inquiries from OEMs we had been trying to reach for years. The platform has become our primary channel for new business development."
              </blockquote>
              
              {/* Attribution */}
              <div>
                <p className="font-semibold text-foreground">Sarah Chen</p>
                <p className="text-sm text-muted-foreground">Director of Operations & Business Development</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Archlet Style */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="section-headline text-foreground max-w-2xl">
              Known for driving supplier visibility and qualified leads.
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-3xl">
            {/* Stat 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="border-t border-foreground pt-6">
                <p className="text-sm text-muted-foreground font-mono tracking-wide mb-4">Annual buyer searches</p>
                <p className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4 tracking-tight">
                  <AnimatedCounter value={7} suffix="M+" duration={1.5} />
                </p>
                <p className="text-muted-foreground leading-relaxed max-w-xs">
                  Procurement professionals actively searching for suppliers on YVOO
                </p>
              </div>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="border-t border-foreground pt-6">
                <p className="text-sm text-muted-foreground font-mono tracking-wide mb-4">Visibility boost</p>
                <p className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4 tracking-tight">
                  <AnimatedCounter value={5} suffix="x" duration={1.5} />
                </p>
                <p className="text-muted-foreground leading-relaxed max-w-xs">
                  With premium placement and fully optimized supplier profiles
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integration Logos */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-headline text-foreground mb-4">
              Trusted by industry leaders
            </h2>
            <p className="text-muted-foreground">
              Suppliers from leading manufacturing companies use YVOO to get discovered.
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {["REWE", "KNORR-BREMSE", "IFM", "ABUS", "AVL", "KROMBACHER"].map((name, index) => (
              <motion.span
                key={name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-xl font-bold text-foreground"
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 bg-foreground">
        <div className="container mx-auto max-w-4xl text-center">
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
