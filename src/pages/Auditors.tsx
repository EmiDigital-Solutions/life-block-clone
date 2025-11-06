import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  ChevronDown,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Auditors = () => {
  const [activeStep, setActiveStep] = useState(0);

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
      description: "Manage audits on the go with our intuitive app",
    },
    {
      icon: Bot,
      title: "AI-Powered Matching",
      description: "Get matched with relevant clients automatically",
    },
    {
      icon: BarChart3,
      title: "Digital Audit Tools",
      description: "Cloud-based audit software included",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Automated invoicing and payment processing",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Calendar integration and booking system",
    },
    {
      icon: LineChart,
      title: "Analytics Dashboard",
      description: "Track your earnings and performance",
    },
    {
      icon: Lock,
      title: "Data Security",
      description: "Bank-level encryption for client data",
    },
    {
      icon: MessageSquare,
      title: "Real-time Communication",
      description: "Chat directly with clients",
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
      solution: "We charge fair, transparent fees - keep more of what you earn",
    },
    {
      icon: Users,
      problem: "Inconsistent Client Flow",
      solution: "Steady stream of clients through our AI-powered matching",
    },
    {
      icon: Clock,
      problem: "Limited Flexibility",
      solution: "Choose your projects, set your schedule, work on your terms",
    },
    {
      icon: Target,
      problem: "Outdated Tools",
      solution: "Access modern, cloud-based audit software included free",
    },
    {
      icon: Globe,
      problem: "Geographic Limitations",
      solution: "Connect with clients nationwide, not just in your area",
    },
    {
      icon: Zap,
      problem: "Lack of Transparency",
      solution: "Clear pricing, instant notifications, full visibility",
    },
  ];

  const successStories = [
    {
      name: "Sarah Chen",
      role: "CPA, 8 years experience",
      image: "/placeholder.svg",
      earnings: "$180K+",
      audits: "127",
      rating: "4.9",
      testimonial:
        "YVOO transformed my career. I now work with diverse clients, earn 40% more, and have complete control over my schedule.",
    },
    {
      name: "Michael Roberts",
      role: "Forensic Auditor, 12 years",
      image: "/placeholder.svg",
      earnings: "$250K+",
      audits: "203",
      rating: "5.0",
      testimonial:
        "The platform's AI matching is incredible. I get clients that perfectly fit my expertise, and the digital tools save me hours on every audit.",
    },
    {
      name: "Aisha Patel",
      role: "IT Auditor, 6 years",
      image: "/placeholder.svg",
      earnings: "$165K+",
      audits: "94",
      rating: "4.8",
      testimonial:
        "From application to first client took just 5 days. The training resources and support team made everything seamless.",
    },
  ];

  const faqs = [
    {
      question: "What is YVOO's commission structure?",
      answer:
        "YVOO charges a competitive 15% platform fee on completed audits. This covers payment processing, insurance, platform maintenance, and customer support. No hidden fees - what you see is what you get.",
    },
    {
      question: "How quickly do I get paid?",
      answer:
        "Payments are processed within 3-5 business days after audit completion and client approval. You can track all payments in real-time through your dashboard.",
    },
    {
      question: "What insurance do I need?",
      answer:
        "You must maintain professional liability insurance (E&O insurance) with minimum coverage of $1M per occurrence. We can help connect you with insurance providers if needed.",
    },
    {
      question: "How does dispute resolution work?",
      answer:
        "YVOO provides mediation services for any client disputes. Our team reviews audit documentation and communications to ensure fair resolution. Most disputes are resolved within 7-10 days.",
    },
    {
      question: "Can I work with my existing clients?",
      answer:
        "Yes! You can bring existing clients onto the platform to benefit from our tools and payment processing. There's a reduced 10% fee for clients you bring to the platform.",
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 z-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6 px-6 py-2 bg-primary/10 rounded-full"
            >
              <span className="text-primary font-semibold text-sm tracking-wide">
                THE FUTURE OF AUDITING
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Join YVOO
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with clients seeking professional auditors. YVOO is the
              leading platform that brings auditors and businesses together,
              making auditing services accessible, transparent, and efficient.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                onClick={() => scrollToSection("registration")}
              >
                Register as an Auditor
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 rounded-full"
                onClick={() => scrollToSection("how-it-works")}
              >
                Learn More
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>5,000+ Auditors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>$50M+ Earned</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>4.9★ Rating</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </motion.div>
      </section>

      {/* What is YVOO Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Uberization of Auditing
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              YVOO is a revolutionary platform that connects qualified auditors
              with businesses needing audit services, similar to how Uber
              connects drivers with riders. We're transforming the auditing
              industry by making it more accessible, flexible, and efficient.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Clock,
                title: "Flexible Work",
                description: "Choose your own schedule and workload",
              },
              {
                icon: Users,
                title: "Choose Your Clients",
                description: "Select projects that match your expertise",
              },
              {
                icon: TrendingUp,
                title: "Transparent Pricing",
                description: "Clear rates with no hidden fees",
              },
              {
                icon: Shield,
                title: "Secure Payments",
                description: "Guaranteed payment for completed work",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all border-2 hover:border-primary/50">
                  <benefit.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start your journey with YVOO in five simple steps
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className={`relative flex items-center gap-8 mb-12 ${
                  index % 2 === 1 ? "flex-row-reverse" : ""
                }`}
              >
                <div className="flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold ${
                      activeStep === index
                        ? "bg-primary text-primary-foreground shadow-xl scale-110"
                        : "bg-muted text-muted-foreground"
                    } transition-all duration-300`}
                  >
                    {step.number}
                  </motion.div>
                </div>

                <Card
                  className={`flex-1 p-6 ${
                    activeStep === index
                      ? "border-primary shadow-lg scale-105"
                      : ""
                  } transition-all duration-300`}
                >
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </Card>

                {index < processSteps.length - 1 && (
                  <div
                    className={`absolute ${
                      index % 2 === 1 ? "right-12" : "left-12"
                    } top-full h-12 w-0.5 bg-gradient-to-b from-primary/50 to-transparent`}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualifications Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Qualifications Required
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ensure you meet these professional standards to join YVOO
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {qualifications.map((qual, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 h-full text-center hover:shadow-xl transition-all border-2 hover:border-primary/50">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <qual.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{qual.title}</h3>
                  <p className="text-muted-foreground">{qual.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Training Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              We Support Your Growth
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Continuous learning and professional development resources
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: GraduationCap,
                title: "Free Webinars",
                description: "Latest auditing standards and practices",
              },
              {
                icon: FileCheck,
                title: "CPE Resources",
                description: "Continuing education materials",
              },
              {
                icon: Award,
                title: "YVOO Academy",
                description: "Specialized certification courses",
              },
              {
                icon: Users,
                title: "Mentorship",
                description: "Connect with senior auditors",
              },
              {
                icon: TrendingUp,
                title: "Certification Support",
                description: "Renewal and upgrade assistance",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="p-6 text-center h-full hover:shadow-lg transition-all">
                  <item.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Technology Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful tools to streamline your auditing workflow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {techFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <Card className="p-6 h-full hover:shadow-xl transition-all group hover:border-primary/50 border-2">
                  <feature.icon className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems We Solve Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Problems We Solve
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Say goodbye to traditional auditing challenges
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {problems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-xl transition-all">
                  <item.icon className="h-12 w-12 text-destructive mb-4" />
                  <h3 className="text-lg font-bold mb-2 text-destructive">
                    ✗ {item.problem}
                  </h3>
                  <div className="h-px bg-gradient-to-r from-destructive/20 to-primary/20 my-4" />
                  <p className="text-muted-foreground">
                    <span className="text-primary font-semibold">✓</span>{" "}
                    {item.solution}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real auditors, real results on YVOO
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Card className="p-6 h-full hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/50" />
                    <div>
                      <h3 className="font-bold text-lg">{story.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {story.role}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {story.earnings}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Earned
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {story.audits}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Audits
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {story.rating}★
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Rating
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground italic">
                    "{story.testimonial}"
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Process Section */}
      <section id="registration" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Registration Process
              </h2>
              <p className="text-xl text-muted-foreground">
                Start your YVOO journey in just a few days
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Fill Out Application Form",
                  description:
                    "Complete our comprehensive online application with your professional details",
                  time: "15 minutes",
                },
                {
                  step: "2",
                  title: "Submit Credentials & Certifications",
                  description:
                    "Upload your CPA certificate, resume, and professional references",
                  time: "10 minutes",
                },
                {
                  step: "3",
                  title: "Background Check",
                  description:
                    "We verify your credentials and conduct a professional background screening",
                  time: "2-3 days",
                },
                {
                  step: "4",
                  title: "Platform Orientation",
                  description:
                    "Complete our online training to learn how to use YVOO effectively",
                  time: "1 hour",
                },
                {
                  step: "5",
                  title: "Profile Setup",
                  description:
                    "Create your professional profile and set your availability",
                  time: "20 minutes",
                },
                {
                  step: "6",
                  title: "Start Receiving Requests",
                  description:
                    "Go live and start getting matched with audit opportunities!",
                  time: "Immediate",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                            {item.time}
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button size="lg" className="text-lg px-12 py-6 rounded-full">
                Start Your Application
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Average approval time: 3-5 days
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know about joining YVOO
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
                  className="border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of auditors who have already discovered the freedom
              and flexibility of YVOO
            </p>
            <Button
              size="lg"
              className="text-lg px-12 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all"
            >
              Register Now
            </Button>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <span>✓ No setup fees</span>
              <span>✓ Flexible schedule</span>
              <span>✓ Instant approval</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Auditors;
