import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  DollarSign,
  Shield,
  Award,
  Briefcase,
  CheckCircle,
  ShieldCheck,
  Search,
  BookOpen,
  Smartphone,
  Zap,
  Laptop,
  CreditCard,
  BarChart,
  Lock,
  MessageCircle,
  X,
  ChevronDown,
  ArrowUp,
} from "lucide-react";

const Auditors = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll for back to top button
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setShowBackToTop(window.scrollY > 500);
    });
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* 1. HERO SECTION */}
      <section 
        className="min-h-screen flex items-center justify-center px-4 pt-20"
        style={{ background: "linear-gradient(135deg, rgb(21, 128, 61), rgb(34, 197, 94), rgb(16, 185, 129))" }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Partner with YVOO
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto"
          >
            Join a professional network where quality auditing meets fair compensation. 
            Build your practice with enterprise clients who value your expertise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              size="lg"
              className="px-8 py-6 text-lg bg-white text-green-600 hover:bg-white/90 hover:-translate-y-0.5 transition-all shadow-lg font-semibold"
            >
              Apply as Partner Auditor
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg hover:-translate-y-0.5 transition-all border-white text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="animate-count-up">
              <div className="text-4xl font-bold text-white mb-2">2,000+</div>
              <div className="text-white/90">Professional Auditors</div>
            </div>
            <div className="animate-count-up">
              <div className="text-4xl font-bold text-white mb-2">€850</div>
              <div className="text-white/90">Avg. Audit Value</div>
            </div>
            <div className="animate-count-up">
              <div className="text-4xl font-bold text-white mb-2">4.8★</div>
              <div className="text-white/90">Client Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. INFINITE MARQUEE TICKER */}
      <section 
        className="py-4 overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgb(21, 128, 61), rgb(34, 197, 94))" }}
      >
        <div className="flex whitespace-nowrap">
          <div className="flex animate-marquee">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center text-white text-xl font-semibold">
                <span className="mx-8">✦</span>
                <span className="text-white/90">Quality Over Quantity</span>
                <span className="mx-8">✦</span>
                <span className="text-white/90">Fair Compensation</span>
                <span className="mx-8">✦</span>
                <span className="text-white/90">Professional Growth</span>
                <span className="mx-8">✦</span>
                <span className="text-white/90">Work-Life Balance</span>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee" aria-hidden="true">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center text-white text-xl font-semibold">
                <span className="mx-8">✦</span>
                <span className="text-white/90">Quality Over Quantity</span>
                <span className="mx-8">✦</span>
                <span className="text-white/90">Fair Compensation</span>
                <span className="mx-8">✦</span>
                <span className="text-white/90">Professional Growth</span>
                <span className="mx-8">✦</span>
                <span className="text-white/90">Work-Life Balance</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VALUE PROPOSITION SECTION */}
      <ValuePropositionSection />

      {/* 4. HOW IT WORKS - TIMELINE */}
      <TimelineSection />

      {/* 5. QUALIFICATIONS SECTION */}
      <QualificationsSection />

      {/* 6. TECHNOLOGY FEATURES - BENTO GRID */}
      <TechnologyFeaturesSection />

      {/* 7. PROBLEMS WE SOLVE - SPLIT COMPARISON */}
      <ProblemsSection />

      {/* 8. SUCCESS STORIES - TESTIMONIALS */}
      <SuccessStoriesSection />

      {/* 9. FINAL CTA SECTION */}
      <section 
        className="py-20 px-4"
        style={{ background: "linear-gradient(135deg, rgb(21, 128, 61), rgb(34, 197, 94), rgb(16, 185, 129))" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Build Your Professional Practice?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 mb-10"
          >
            Join a network of certified auditors who prioritize quality, 
            professional growth, and sustainable client relationships
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              className="px-12 py-6 text-lg bg-white text-green-600 hover:bg-white/90 font-semibold"
            >
              Apply for Partnership
            </Button>
          </motion.div>
          <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center text-white">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-white" />
              <span>Premium compensation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-white" />
              <span>Sustainable workload</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-white" />
              <span>Professional development</span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ ACCORDION */}
      <FAQSection openFaq={openFaq} setOpenFaq={setOpenFaq} />

      {/* 11. FOOTER */}
      <Footer />

      {/* BACK TO TOP BUTTON */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all z-50"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
};

// VALUE PROPOSITION SECTION COMPONENT
const ValuePropositionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const features = [
    {
      icon: Shield,
      title: "Quality Standards",
      description: "Work with enterprise clients who value thoroughness over speed",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: Calendar,
      title: "Balanced Workload",
      description: "Manageable audit schedules that respect professional standards",
      gradient: "from-green-600 to-green-700",
    },
    {
      icon: DollarSign,
      title: "Fair Compensation",
      description: "Premium rates that reflect your expertise and certification",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      icon: Users,
      title: "Strategic Partnerships",
      description: "Build long-term client relationships, not one-off gigs",
      gradient: "from-teal-500 to-teal-600",
    },
  ];

  return (
    <section 
      ref={ref} 
      className="py-20 px-4"
      style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-green-600">Professional Partnership</span> Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            YVOO connects certified auditors with quality-focused enterprises. 
            We prioritize professional standards, sustainable workloads, and fair compensation—
            building careers, not just gigs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm transition-all"
            >
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// TIMELINE SECTION COMPONENT
const TimelineSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const steps = [
    {
      number: "01",
      title: "Register & Get Verified",
      description: "Submit your credentials and professional certifications",
    },
    {
      number: "02",
      title: "Complete Your Profile",
      description: "Showcase your expertise and experience",
    },
    {
      number: "03",
      title: "Receive Audit Requests",
      description: "Get matched with clients needing your services",
    },
    {
      number: "04",
      title: "Conduct Audits",
      description: "Use our platform tools to complete audits efficiently",
    },
    {
      number: "05",
      title: "Get Paid Securely",
      description: "Receive payments directly to your account",
    },
  ];

  return (
    <section 
      ref={ref} 
      className="py-20 px-4"
      style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-green-600">Partnership Journey</span>
          </h2>
          <p className="text-xl text-gray-600">
            Join YVOO's professional auditor network in five steps
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 2 }}
            className="absolute left-8 top-0 w-1 bg-green-300 hidden md:block"
          />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex items-start gap-6 mb-12 relative"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: index * 0.2,
                }}
                className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg z-10"
              >
                {step.number}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// QUALIFICATIONS SECTION COMPONENT
const QualificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const qualifications = [
    {
      icon: Award,
      title: "Professional Certification",
      description: "CPA or equivalent certification required",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Briefcase,
      title: "Experience",
      description: "Minimum 2-5 years of auditing experience",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: CheckCircle,
      title: "Clean Record",
      description: "Clean professional record with no violations",
      gradient: "from-amber-500 to-amber-600",
    },
    {
      icon: ShieldCheck,
      title: "Insurance",
      description: "Professional liability insurance coverage",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: Search,
      title: "Verification",
      description: "Background verification and screening",
      gradient: "from-pink-500 to-pink-600",
    },
    {
      icon: BookOpen,
      title: "CPE Credits",
      description: "Continuing professional education credits",
      gradient: "from-teal-500 to-teal-600",
    },
  ];

  return (
    <section 
      ref={ref} 
      className="py-20 px-4"
      style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-green-600">Professional Requirements</span>
          </h2>
          <p className="text-xl text-gray-600">
            Standards that ensure quality and client trust
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qualifications.map((qual, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={
                isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}
              }
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
              className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm transition-all"
            >
              <motion.div
                whileHover={{ rotate: 5 }}
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${qual.gradient} flex items-center justify-center mb-6`}
              >
                <qual.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {qual.title}
              </h3>
              <p className="text-gray-600">{qual.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// TECHNOLOGY FEATURES SECTION COMPONENT
const TechnologyFeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const features = [
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Manage audits on the go",
      gradient: "from-blue-500 to-purple-600",
      span: "md:col-span-1",
    },
    {
      icon: Zap,
      title: "AI Matching",
      description: "Smart client connections",
      gradient: "from-green-500 to-teal-600",
      span: "md:col-span-1",
    },
    {
      icon: Laptop,
      title: "Digital Tools",
      description: "Cloud-based software",
      gradient: "from-amber-500 to-orange-600",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Automated processing",
      gradient: "from-purple-500 to-pink-600",
      span: "md:col-span-1",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Calendar integration",
      gradient: "from-teal-500 to-cyan-600",
      span: "md:col-span-1",
    },
    {
      icon: BarChart,
      title: "Analytics",
      description: "Track performance",
      gradient: "from-pink-500 to-rose-600",
      span: "md:col-span-1",
    },
    {
      icon: Lock,
      title: "Data Security",
      description: "Bank-level encryption",
      gradient: "from-indigo-500 to-blue-600",
      span: "md:col-span-1",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Direct client messaging",
      gradient: "from-orange-500 to-red-600",
      span: "md:col-span-2",
    },
  ];

  return (
    <section 
      ref={ref} 
      className="py-20 px-4"
      style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-green-600">Professional Tools</span>
          </h2>
          <p className="text-xl text-gray-600">
            Technology that supports quality auditing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-fr">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 4 - 2 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, rotate: 0 }
                  : {}
              }
              transition={{
                duration: 0.5,
                delay: Math.random() * 0.5,
              }}
              whileHover={{
                scale: 1.05,
                backgroundPosition: "100% 50%",
              }}
              className={`${feature.span} bg-gradient-to-br ${feature.gradient} rounded-2xl p-8 text-white flex flex-col justify-between min-h-[200px] transition-all cursor-pointer`}
              style={{ backgroundSize: "200% 200%" }}
            >
              <feature.icon className="w-12 h-12 mb-4" />
              <div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/90">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// PROBLEMS SECTION COMPONENT
const ProblemsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const problems = [
    "Pressure to rush audits",
    "Race-to-bottom pricing",
    "Unpredictable income",
    "Limited professional development",
    "Transactional client relationships",
    "No quality over quantity focus",
  ];

  const solutions = [
    "Adequate time allocated for thorough audits",
    "Premium rates reflecting your expertise and certifications",
    "Stable project pipeline with recurring clients",
    "Access to training, certifications, and peer network",
    "Build long-term partnerships with enterprise clients",
    "Quality metrics that reward thoroughness, not speed",
  ];

  return (
    <section 
      ref={ref} 
      className="py-20 px-4"
      style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-green-600">Why Choose YVOO</span>
          </h2>
          <p className="text-xl text-gray-600">
            Moving beyond the gig economy model
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Problems Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-red-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Gig Economy Challenges
            </h3>
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.15 }}
                  className="flex items-start gap-3"
                >
                  <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{problem}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solutions Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-green-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Professional Partnership Approach
            </h3>
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.15 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{solution}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// SUCCESS STORIES SECTION COMPONENT
const SuccessStoriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const stories = [
    {
      name: "Sarah Chen",
      role: "CPA, 8 years experience",
      earned: "€180K+",
      audits: "89",
      rating: "4.9",
      quote:
        "With YVOO, I built a sustainable practice with enterprise clients who respect audit timelines and professional standards. No more rushed audits.",
    },
    {
      name: "Michael Roberts",
      role: "Forensic Auditor, 12 years",
      earned: "€195K+",
      audits: "76",
      rating: "5.0",
      quote:
        "Finally, a platform that values quality over quantity. My clients are willing to pay premium rates because they trust the thoroughness of my work.",
    },
    {
      name: "Aisha Patel",
      role: "IT Auditor, 6 years",
      earned: "€142K+",
      audits: "68",
      rating: "4.8",
      quote:
        "The professional development resources and peer network have been invaluable. This is true partnership, not just another gig platform.",
    },
  ];

  return (
    <section 
      ref={ref} 
      className="py-20 px-4"
      style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-green-600">Partner Success Stories</span>
          </h2>
          <p className="text-xl text-gray-600">Building sustainable audit practices</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              className="bg-white rounded-2xl p-8 shadow-lg transition-all"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {story.name}
              </h3>
              <p className="text-gray-600 mb-6">{story.role}</p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <div className="text-2xl font-bold text-gray-900 animate-count-up">
                    {story.earned}
                  </div>
                  <div className="text-sm text-gray-600">Earned</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 animate-count-up">
                    {story.audits}
                  </div>
                  <div className="text-sm text-gray-600">Audits</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 animate-count-up flex items-center gap-1">
                    {story.rating}
                    <span className="text-amber-500">★</span>
                  </div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>

              <p className="text-gray-600 italic">"{story.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ SECTION COMPONENT
const FAQSection = ({
  openFaq,
  setOpenFaq,
}: {
  openFaq: number | null;
  setOpenFaq: (val: number | null) => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const faqs = [
    {
      question: "How is YVOO different from typical gig platforms?",
      answer:
        "YVOO focuses on quality partnerships, not gig work. We prioritize sustainable workloads, premium compensation, long-term client relationships, and professional development. There's no race to the bottom on pricing or rushing through audits.",
    },
    {
      question: "What compensation can I expect?",
      answer:
        "Our partner auditors earn premium rates reflecting their certifications and expertise. Average audit fees range from €850-€2,500 depending on scope and complexity. We ensure adequate time is allocated for thorough work.",
    },
    {
      question: "How many audits will I be expected to complete?",
      answer:
        "We prioritize quality over quantity. Workload is balanced to maintain professional standards. Most partners complete 3-5 audits per month, allowing adequate time for thorough, high-quality work without burnout.",
    },
    {
      question: "What professional development is available?",
      answer:
        "Partners have access to continuing education resources, industry webinars, peer networking events, and mentorship programs. We invest in your growth as part of our commitment to long-term partnership.",
    },
    {
      question: "How does client matching work?",
      answer:
        "We match you with enterprise clients based on your expertise, certifications, and industry experience. Our focus is on building long-term relationships where clients value your specialized knowledge.",
    },
    {
      question: "What is the application process?",
      answer:
        "Submit your credentials and professional certifications for review. Our team conducts thorough verification (typically 5-7 business days) to maintain network quality. Once approved, you can start building your client portfolio.",
    },
  ];

  return (
    <section 
      ref={ref} 
      className="py-20 px-4"
      style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-green-600">Frequently Asked</span> Questions
          </h2>
          <p className="text-xl text-gray-600">Everything you need to know</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="border-b border-gray-200"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full py-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-gray-500 flex-shrink-0" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openFaq === index ? "auto" : 0,
                  opacity: openFaq === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="pb-6 text-gray-600">{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Auditors;
