import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  CheckCircle2,
  Shield,
  TrendingUp,
  Users,
  Award,
  Clock,
  DollarSign,
  Globe,
  Smartphone,
  Bot,
  BarChart3,
  CreditCard,
  Calendar,
  LineChart,
  Lock,
  MessageSquare,
  GraduationCap,
  FileCheck,
  Briefcase,
  Target,
  Zap,
  ArrowRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Auditors = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const qualifications = [
    {
      icon: Award,
      title: "Professional Certification",
      description: "CPA or equivalent certification required",
    },
    {
      icon: Briefcase,
      title: "Experience",
      description: "Minimum 2-5 years of auditing experience",
    },
    {
      icon: Shield,
      title: "Clean Record",
      description: "Clean professional record with no violations",
    },
    {
      icon: FileCheck,
      title: "Insurance",
      description: "Professional liability insurance coverage",
    },
    {
      icon: CheckCircle2,
      title: "Verification",
      description: "Background verification and screening",
    },
    {
      icon: GraduationCap,
      title: "CPE Credits",
      description: "Continuing professional education credits",
    },
  ];

  const techFeatures = [
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Manage audits on the go",
    },
    {
      icon: Bot,
      title: "AI Matching",
      description: "Smart client connections",
    },
    {
      icon: BarChart3,
      title: "Digital Tools",
      description: "Cloud-based software",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Automated processing",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Calendar integration",
    },
    {
      icon: LineChart,
      title: "Analytics",
      description: "Track performance",
    },
    {
      icon: Lock,
      title: "Data Security",
      description: "Bank-level encryption",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Direct client messaging",
    },
  ];

  const processSteps = [
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

  const problems = [
    {
      icon: DollarSign,
      problem: "High Commission Fees",
      solution: "Fair, transparent fees - keep more of what you earn",
    },
    {
      icon: Users,
      problem: "Inconsistent Client Flow",
      solution: "Steady stream of clients through AI-powered matching",
    },
    {
      icon: Clock,
      problem: "Limited Flexibility",
      solution: "Choose your projects, set your schedule",
    },
    {
      icon: Target,
      problem: "Outdated Tools",
      solution: "Modern, cloud-based audit software included",
    },
    {
      icon: Globe,
      problem: "Geographic Limitations",
      solution: "Connect with clients nationwide",
    },
    {
      icon: Zap,
      problem: "Lack of Transparency",
      solution: "Clear pricing and full visibility",
    },
  ];

  const successStories = [
    {
      name: "Sarah Chen",
      role: "CPA, 8 years experience",
      earnings: "$180K+",
      audits: "127",
      rating: "4.9",
      testimonial:
        "YVOO transformed my career. I now work with diverse clients, earn 40% more, and have complete control over my schedule.",
    },
    {
      name: "Michael Roberts",
      role: "Forensic Auditor, 12 years",
      earnings: "$250K+",
      audits: "203",
      rating: "5.0",
      testimonial:
        "The platform's AI matching is incredible. I get clients that perfectly fit my expertise.",
    },
    {
      name: "Aisha Patel",
      role: "IT Auditor, 6 years",
      earnings: "$165K+",
      audits: "94",
      rating: "4.8",
      testimonial:
        "From application to first client took just 5 days. The support team made everything seamless.",
    },
  ];

  const faqs = [
    {
      question: "What is YVOO's commission structure?",
      answer:
        "YVOO charges a competitive 15% platform fee on completed audits. This covers payment processing, insurance, platform maintenance, and customer support. No hidden fees.",
    },
    {
      question: "How quickly do I get paid?",
      answer:
        "Payments are processed within 3-5 business days after audit completion and client approval. Track all payments in real-time through your dashboard.",
    },
    {
      question: "What insurance do I need?",
      answer:
        "You must maintain professional liability insurance (E&O insurance) with minimum coverage of $1M per occurrence. We can help connect you with insurance providers.",
    },
    {
      question: "How does dispute resolution work?",
      answer:
        "YVOO provides mediation services for any client disputes. Our team reviews audit documentation and communications to ensure fair resolution within 7-10 days.",
    },
    {
      question: "Can I work with my existing clients?",
      answer:
        "Yes! Bring existing clients onto the platform to benefit from our tools and payment processing. There's a reduced 10% fee for clients you bring.",
    },
    {
      question: "What are the platform fees?",
      answer:
        "The 15% commission covers everything: payment processing, client acquisition, platform tools, support, and insurance. No monthly fees or hidden charges.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section - Bold & Minimal */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(142,76,45,0.03),transparent_50%)]" />
        
        <motion.div
          style={{ scale, opacity }}
          className="container mx-auto px-4 z-10"
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-block px-6 py-2 bg-foreground/5 rounded-full text-sm font-medium tracking-wide">
                THE FUTURE OF AUDITING
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tight"
            >
              Join YVOO
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-normal"
            >
              Connect with clients seeking professional auditors. The leading platform
              that brings auditors and businesses together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("registration")}
                className="text-base px-10 py-7 rounded-full text-white bg-foreground hover:bg-foreground/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Register as Auditor
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("how-it-works")}
                className="text-base px-10 py-7 rounded-full border-2 hover:bg-foreground/5 transition-all"
              >
                Learn More
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-foreground" />
                <span>5,000+ Auditors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-foreground" />
                <span>$50M+ Earned</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-foreground" />
                <span>4.9★ Rating</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Marquee Section */}
      <section className="py-8 border-y border-border bg-muted/30 overflow-hidden">
        <div className="flex whitespace-nowrap animate-[scroll_20s_linear_infinite]">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-8">
              <span className="text-2xl font-bold">✦</span>
              <span className="text-lg font-medium">Professional Auditors</span>
              <span className="text-2xl font-bold">✦</span>
              <span className="text-lg font-medium">AI-Powered Matching</span>
              <span className="text-2xl font-bold">✦</span>
              <span className="text-lg font-medium">Secure Payments</span>
              <span className="text-2xl font-bold">✦</span>
              <span className="text-lg font-medium">Flexible Schedule</span>
            </div>
          ))}
        </div>
      </section>

      {/* What is YVOO - Large Typography */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-12 leading-tight">
              The Uberization of Auditing
            </h2>
            <p className="text-2xl md:text-3xl text-muted-foreground font-normal leading-relaxed mb-16">
              YVOO is a revolutionary platform that connects qualified auditors
              with businesses needing audit services, transforming the industry
              by making it more accessible, flexible, and efficient.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Clock, title: "Flexible Work", description: "Choose your schedule" },
                { icon: Users, title: "Choose Clients", description: "Match your expertise" },
                { icon: TrendingUp, title: "Transparent Pricing", description: "No hidden fees" },
                { icon: Shield, title: "Secure Payments", description: "Guaranteed payment" },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="p-8 rounded-3xl border-2 border-border hover:border-foreground/20 transition-all hover:shadow-lg group"
                >
                  <benefit.icon className="h-10 w-10 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Minimal Design */}
      <section id="how-it-works" className="py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-normal">
              Start your journey with YVOO in five simple steps
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="flex items-start gap-6 p-8 rounded-3xl bg-background border-2 border-border hover:border-foreground/20 transition-all group"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-lg">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualifications - Grid Layout */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              Qualifications Required
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-normal">
              Professional standards to join YVOO
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {qualifications.map((qual, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="p-8 rounded-3xl border-2 border-border hover:border-foreground/20 transition-all group text-center"
              >
                <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-foreground group-hover:text-background transition-all">
                  <qual.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{qual.title}</h3>
                <p className="text-muted-foreground">{qual.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Features - Compact Grid */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              Technology Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-normal">
              Powerful tools to streamline your workflow
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {techFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="p-6 rounded-2xl bg-background border border-border hover:border-foreground/20 transition-all group text-center"
              >
                <feature.icon className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-1 text-sm">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              Problems We Solve
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-normal">
              Say goodbye to traditional challenges
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {problems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="p-8 rounded-3xl border-2 border-border hover:border-foreground/20 transition-all"
              >
                <item.icon className="h-10 w-10 mb-4 text-destructive" />
                <h3 className="text-lg font-bold mb-3 text-destructive">
                  {item.problem}
                </h3>
                <div className="w-full h-px bg-border my-4" />
                <p className="text-muted-foreground">{item.solution}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-normal">
              Real auditors, real results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="p-8 rounded-3xl bg-background border-2 border-border hover:border-foreground/20 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-foreground/10" />
                  <div>
                    <h3 className="font-bold text-lg">{story.name}</h3>
                    <p className="text-sm text-muted-foreground">{story.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <div className="text-2xl font-bold">{story.earnings}</div>
                    <div className="text-xs text-muted-foreground">Earned</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{story.audits}</div>
                    <div className="text-xs text-muted-foreground">Audits</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{story.rating}★</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                </div>

                <p className="text-muted-foreground italic text-sm">
                  "{story.testimonial}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section id="registration" className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              Ready to Transform Your Career?
            </h2>
            <p className="text-2xl text-muted-foreground mb-12 font-normal">
              Join thousands of auditors who have discovered the freedom and
              flexibility of YVOO
            </p>
            <Button
              size="lg"
              className="text-base px-12 py-7 rounded-full text-white bg-foreground hover:bg-foreground/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Register Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <span>✓ No setup fees</span>
              <span>✓ Flexible schedule</span>
              <span>✓ Instant approval</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              FAQ
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-normal">
              Everything you need to know
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-2 rounded-2xl px-6 bg-background"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-bold text-lg">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Auditors;
