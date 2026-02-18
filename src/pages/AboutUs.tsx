import PageSEO from "@/components/PageSEO";
import PageGridOverlay from "@/components/PageGridOverlay";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TechnicalAnnotation from "@/components/TechnicalAnnotation";
import DimensionLine from "@/components/DimensionLine";
import SectionCutMarker from "@/components/SectionCutMarker";
import ToleranceNotation from "@/components/ToleranceNotation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import HeroSquaresAnimation from "@/components/HeroSquaresAnimation";
import sustainabilityImage from "@/assets/about-sustainability.jpg";
import timelineImage from "@/assets/about-timeline-2019.jpg";
import leadershipTeamImage from "@/assets/about-leadership-team.jpg";

import auditorFemaleAfrican from "@/assets/auditor-female-african.jpg";
import auditorAsian from "@/assets/auditor-real-asian.jpg";
import auditorFemaleEuropean from "@/assets/auditor-female-european.jpg";
import auditorFemaleMiddleEast from "@/assets/auditor-female-middle-east.jpg";
import auditorFemaleLatin from "@/assets/auditor-female-latin.jpg";
import auditorFemaleSouthAsian from "@/assets/auditor-female-south-asian.jpg";
import auditorMaleNorthAmerica from "@/assets/auditor-male-north-america.jpg";
import auditorAfrican from "@/assets/auditor-real-african.jpg";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();
    if (!name || name.length > 100) { toast.error("Please enter a valid name"); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error("Please enter a valid email"); return; }
    if (formData.company.trim().length > 100) { toast.error("Company name too long"); return; }
    if (!message || message.length > 1000) { toast.error("Please enter a message (max 1000 chars)"); return; }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_submissions').insert({ name, email, company: formData.company.trim() || null, message, source: 'about-us' });
      if (error) throw error;
      setIsSubmitted(true);
      toast.success("Message sent successfully!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-background/5 border border-background/10 p-12 flex flex-col items-center justify-center text-center space-y-4 min-h-[380px]">
        <div className="w-12 h-12 bg-primary flex items-center justify-center"><Check className="w-6 h-6 text-primary-foreground" /></div>
        <h3 className="text-2xl font-semibold text-background">Thank you</h3>
        <p className="text-background/50">We'll get back to you within 24 hours.</p>
        <Button variant="outline" className="border-background/30 text-background hover:bg-background/10 mt-4" onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', company: '', message: '' }); }}>Send another message</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-background/5 border border-background/10 p-8 md:p-10 space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-medium text-background/40 tracking-[0.15em] uppercase">Name *</label>
          <input type="text" required maxLength={100} value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-transparent border-b border-background/20 pb-3 text-background placeholder:text-background/25 focus:border-primary focus:outline-none transition-colors" placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-background/40 tracking-[0.15em] uppercase">Email *</label>
          <input type="email" required maxLength={255} value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} className="w-full bg-transparent border-b border-background/20 pb-3 text-background placeholder:text-background/25 focus:border-primary focus:outline-none transition-colors" placeholder="work@company.com" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-medium text-background/40 tracking-[0.15em] uppercase">Company</label>
        <input type="text" maxLength={100} value={formData.company} onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))} className="w-full bg-transparent border-b border-background/20 pb-3 text-background placeholder:text-background/25 focus:border-primary focus:outline-none transition-colors" placeholder="Company name" />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-medium text-background/40 tracking-[0.15em] uppercase">Message *</label>
        <textarea required maxLength={1000} rows={4} value={formData.message} onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))} className="w-full bg-transparent border-b border-background/20 pb-3 text-background placeholder:text-background/25 focus:border-primary focus:outline-none transition-colors resize-none" placeholder="Tell us about your needs..." />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <Button type="submit" size="lg" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send Message"}<ArrowRight className="w-5 h-5" /></Button>
        <Button type="button" variant="outline" size="lg" className="border-background/30 text-background hover:bg-background/10" onClick={() => window.open('https://calendly.com/yvoo/demo-yvoo', '_blank')}>Book Expert Call</Button>
      </div>
    </form>
  );
};

const AboutUs = () => {
  const [selectedYear, setSelectedYear] = useState(2023);

  const heroImages = [
    { src: auditorFemaleAfrican, alt: 'Quality Inspector' },
    { src: auditorAsian, alt: 'Safety Manager' },
    { src: auditorFemaleEuropean, alt: 'Compliance Auditor' },
    { src: auditorFemaleMiddleEast, alt: 'Operations Director' },
    { src: auditorFemaleLatin, alt: 'Factory Inspector' },
    { src: auditorFemaleSouthAsian, alt: 'Procurement Manager' },
    { src: auditorMaleNorthAmerica, alt: 'Supply Chain Lead' },
    { src: auditorAfrican, alt: 'Vendor Relations' },
  ];

  const timelineData = [
    { year: 2023, title: "Foundation", desc: "YVOO Technologies founded in Zagreb with a vision to revolutionize B2B procurement through AI and human expertise." },
    { year: 2024, title: "Platform Innovation", desc: "Launched SalesPro+ supplier visibility platform, reaching 7M+ B2B decision-makers worldwide." },
    { year: 2025, title: "Market Leadership", desc: "Achieved 70% cost reduction and 80% time savings for enterprise clients across Europe." },
  ];

  const selectedTimeline = timelineData.find(item => item.year === selectedYear);

  return (
    <div className="min-h-screen bg-background relative">
      <PageSEO
        title="About YVOO — Transforming Supplier Audits with AI"
        description="Founded in 2023, YVOO combines AI technology with 850+ certified auditors to deliver on-site supplier verification across 45+ countries. 70% cost reduction, 80% time savings."
        canonical="/about-us"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Organization",
            "name": "YVOO",
            "foundingDate": "2023",
            "url": "https://www.yvoo.io",
            "description": "AI-powered supplier audit and verification platform."
          }
        }}
      />
      <PageGridOverlay />
      <div className="relative">
      <Navigation />
      
      {/* HERO SECTION */}
      <section data-nav-theme="light" className="relative bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <HeroSquaresAnimation className="top-24 right-8 md:top-28 md:right-20 lg:top-32 lg:right-24" />
        
        {/* Mobile/Tablet Image - Top */}
        <motion.div 
          className="lg:hidden w-full h-48 sm:h-64 md:h-80 overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-4 gap-0.5 h-full w-full">
            {heroImages.slice(0, 4).map((image, index) => (
              <div key={index} className="relative overflow-hidden group cursor-pointer">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Desktop - Left side image - clipped ellipse */}
        <div className="absolute left-0 top-0 bottom-0 w-[45%] hidden lg:block overflow-hidden z-[5]">
          <motion.div 
            className="absolute inset-0"
            style={{ clipPath: 'ellipse(100% 100% at 0% 50%)' }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-4 gap-0.5 h-full w-full">
              {heroImages.slice(0, 8).map((image, index) => (
                <div key={index} className="relative overflow-hidden group cursor-pointer">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 md:px-8 py-12 sm:py-16 lg:py-24 lg:min-h-[80vh] flex items-center pointer-events-none">
          <motion.div 
            className="lg:ml-[45%] lg:pl-16 space-y-4 sm:space-y-6 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground">
              Building the World's Largest<br />Auditor Marketplace
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Connecting clients, suppliers, and local experts through innovative technology and human expertise.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground/70 max-w-xl">
              Our team provides ongoing expertise and guidance to ensure your procurement process remains thorough, compliant and effective.
            </p>
            <Button size="lg">
              Get In Touch
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div 
            className="w-12 h-12 lg:w-14 lg:h-14 bg-primary flex items-center justify-center animate-bounce"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* DIN annotation — grid 4→6 */}
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
        <TechnicalAnnotation label="1200" from={4} to={6} />
      </div>

      {/* MISSION & VISION */}
      <section data-nav-theme="light" className="py-32 md:py-40 bg-background">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">

          {/* MISSION */}
          <motion.div 
            className="mb-32 md:mb-40"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              <div className="lg:col-span-4">
                <p className="text-xs font-medium text-muted-foreground tracking-[0.25em] uppercase mb-6">Mission</p>
                <div className="w-10 h-[2px] bg-primary" />
              </div>
              <div className="lg:col-span-8">
                <p className="text-2xl md:text-3xl lg:text-4xl text-foreground leading-[1.35] font-light">
                  Building exceptional supplier relationships through every interaction. 
                  We empower our customers, partners, and team to achieve continuous growth 
                  in a culture of mutual respect and trust.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="w-full h-px bg-border mb-32 md:mb-40" />

          {/* VISION */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              <div className="lg:col-span-4">
                <p className="text-xs font-medium text-muted-foreground tracking-[0.25em] uppercase mb-6">Vision</p>
                <div className="w-10 h-[2px] bg-primary" />
              </div>
              <div className="lg:col-span-8 space-y-10">
                <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] text-foreground font-semibold leading-[1.2] tracking-tight">
                  We're building the world's largest AI-powered auditor marketplace
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                  400,000 ISO/VDA/IATF certified auditors exist globally. They're fragmented, disconnected, inconsistent. YVOO connects them. Atlas AI standardizes them.
                </p>
                <p className="text-xl md:text-2xl text-foreground leading-relaxed font-medium">
                  The result: Any company can verify any supplier, anywhere in the world, in 3 days
                </p>
                <div className="border-l-2 border-foreground/15 pl-8 md:pl-10 space-y-4 py-2">
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    No employment overhead. No travel chaos. No geographic limitations.
                  </p>
                  <p className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                    Upload → Match → Verify → Decide
                  </p>
                </div>
                <p className="text-lg md:text-xl text-foreground/60 italic">
                  This is the future of supplier verification.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section cut marker A—A */}
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <SectionCutMarker section="A" from={0} to={6} />
      </div>

      {/* CORE PRINCIPLES — Clean grid, no icons */}
      <section data-nav-theme="light" className="py-32 bg-muted/30">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-20"
          >
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              <div className="lg:col-span-4">
                <p className="text-xs font-medium text-muted-foreground tracking-[0.25em] uppercase mb-6">What drives us</p>
                <h2 className="section-headline text-foreground">Core Principles</h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                  Four pillars that guide every decision we make — from product design to client partnerships.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-border">
              {[
                { title: "Innovation First", desc: "Leading the industry with AI-powered procurement solutions that transform how businesses source and verify suppliers." },
                { title: "Customer-Centric", desc: "Delivering outstanding experiences through technology designed around real procurement challenges and workflows." },
                { title: "Global Reach", desc: "Operating in 90+ countries with 2,000+ local experts providing personalized support worldwide." },
                { title: "Ethical Technology", desc: "Building trust through transparent AI systems, data privacy protection, and responsible innovation." }
              ].map((principle, index) => (
                <motion.div
                  key={index}
                  className="bg-background p-10 md:p-12 space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <span className="text-xs font-medium text-muted-foreground tracking-[0.2em]">0{index + 1}</span>
                  <h3 className="text-xl font-semibold text-foreground">{principle.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{principle.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* DIN annotation — grid 3→6 */}
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
        <TechnicalAnnotation label="700" from={3} to={6} />
      </div>

      {/* SUSTAINABILITY — Side-by-side grid (breaks ellipse repetition) */}
      <section data-nav-theme="light" className="py-32 bg-background">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-muted">
                <img 
                  src={sustainabilityImage} 
                  alt="Sustainable operations" 
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(100%)' }} 
                />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(110, 169, 150, 0.4) 0%, transparent 60%)',
                    mixBlendMode: 'multiply'
                  }}
                />
                {/* Top-right squares */}
                <div className="absolute top-[5%] right-[4%] w-[10%] aspect-square bg-primary" />
                <div className="absolute top-[5%] right-[16%] w-[10%] aspect-square bg-primary" />
                <div className="absolute top-[17%] right-[4%] w-[10%] aspect-square bg-primary" />
                {/* Bottom — long horizontal stripe */}
                <div className="absolute bottom-[5%] right-0 w-[50%] h-[10%] bg-primary" />
              </div>
              {/* Content */}
              <div className="flex flex-col justify-center p-8 md:p-12 lg:p-20 space-y-6">
                <p className="text-xs font-medium text-muted-foreground tracking-[0.25em] uppercase">Sustainability</p>
                <div className="w-10 h-[2px] bg-primary" />
                <h2 className="section-headline text-foreground">
                  Building a Sustainable Future
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  We're committed to minimizing our environmental impact through renewable energy adoption, 
                  waste reduction initiatives, and sustainable practices across all operations.
                </p>
                <p className="text-base text-muted-foreground/70">
                  Our team provides ongoing expertise and guidance to ensure your sustainability goals are achieved through continuous improvement in carbon footprint reduction and resource efficiency.
                </p>
                <div className="pt-2">
                  <Button size="lg" variant="outline">
                    Get In Touch
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tolerance notation — quality metric */}
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <ToleranceNotation nominal="99.7" tolerance="0.02" unit="%" label="Process Cpk" gridColumn={1} />
      </div>

      {/* TIMELINE — Vertical layout */}
      <section data-nav-theme="light" className="py-32 bg-muted/30">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-20"
          >
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              <div className="lg:col-span-4">
                <p className="text-xs font-medium text-muted-foreground tracking-[0.25em] uppercase mb-6">Timeline</p>
                <h2 className="section-headline text-foreground">Our Journey</h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                  From a bold idea in Zagreb to transforming supplier verification worldwide.
                </p>
              </div>
            </div>

            {/* Timeline entries */}
            <div className="space-y-0">
              {timelineData.map((item, index) => (
                <motion.div
                  key={item.year}
                  className="grid lg:grid-cols-12 gap-8 lg:gap-16 border-t border-border py-12 md:py-16 items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="lg:col-span-4">
                    <span className="text-5xl md:text-6xl font-bold text-foreground/10 tracking-tight">{item.year}</span>
                  </div>
                  <div className="lg:col-span-8 space-y-3">
                    <h3 className="text-2xl font-semibold text-foreground">{item.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* LEADERSHIP — Full-bleed image + overlay (different from hero ellipse) */}
      <section data-nav-theme="dark" className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={leadershipTeamImage} 
            alt="YVOO Leadership Team" 
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(100%)' }}
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 md:px-8 py-20">
          <motion.div
            className="max-w-2xl space-y-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-medium text-background/50 tracking-[0.25em] uppercase">Team</p>
            <div className="w-10 h-[2px] bg-primary" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-[1.1] tracking-tight">
              Leadership Team
            </h2>
            <p className="text-lg md:text-xl text-background/70 leading-relaxed">
              Our leadership brings together entrepreneurial expertise and deep industry knowledge — a combination 
              that drives innovation in AI-powered procurement and global supplier verification.
            </p>
            <p className="text-base text-background/50">
              Our team provides ongoing guidance and strategic direction to ensure YVOO remains at the forefront of procurement technology innovation.
            </p>
            <div className="pt-2">
              <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10">
                Get In Touch
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dimension line — cost savings */}
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <DimensionLine from="15.000" to="700" unit="€" gridFrom={0} gridTo={4} />
      </div>

      {/* LOCATIONS — Cleaner design with blue active state */}
      <section data-nav-theme="light" className="py-32 bg-background">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-20"
          >
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              <div className="lg:col-span-4">
                <p className="text-xs font-medium text-muted-foreground tracking-[0.25em] uppercase mb-6">Offices</p>
                <h2 className="section-headline text-foreground">Global Locations</h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                  Headquartered in Zagreb, with presence across Europe.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-border">
              {[
                { name: "Zagreb HQ", address: "Ulica grada Vukovara 271, 10000 Zagreb, Croatia", phone: "+385 1 234 5678", email: "info@yvoo.com" },
                { name: "Munich", address: "Leopoldstraße 244, 80807 Munich, Germany", phone: "+49 89 1234 5678", email: "munich@yvoo.com" }
              ].map((location, index) => (
                <motion.div
                  key={index}
                  className="bg-background p-10 md:p-12 space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <h3 className="text-2xl font-semibold text-foreground">{location.name}</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>{location.address}</p>
                    <p>{location.phone}</p>
                    <p className="text-primary">{location.email}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION WITH CONTACT FORM */}
      <section data-nav-theme="dark" className="py-32 bg-foreground">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left: Text */}
            <motion.div
              className="lg:col-span-5 space-y-6 flex flex-col justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-background leading-tight">
                Ready to Transform Your Procurement?
              </h2>
              <p className="text-xl text-background/50 leading-relaxed">
                Join leading enterprises achieving 70% cost reduction and 80% time savings.
              </p>
              <div className="space-y-3 pt-4">
                {["Response within 24 hours", "Personalized demo of the platform", "No commitment required"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-background/60 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
