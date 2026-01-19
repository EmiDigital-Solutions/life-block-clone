import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import TestimonialModal from "@/components/TestimonialModal";
import { IndustryUseCaseModal, IndustryUseCase } from "@/components/IndustryUseCaseModal";

import procurementMaleEuropean from "@/assets/procurement-male-european.jpg";

// Use Case Card Component
const UseCaseCard = ({ 
  image, 
  badge, 
  title, 
  description, 
  isLarge = false,
  delay = 0,
  onClick
}: { 
  image: string; 
  badge: string; 
  title: string; 
  description: string;
  isLarge?: boolean;
  delay?: number;
  onClick?: () => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <div 
      ref={containerRef}
      className={`${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        onClick={onClick}
        className="group relative overflow-hidden cursor-pointer w-full h-full text-left"
      >
        {/* Full-bleed image container */}
        <div className={`relative overflow-hidden ${isLarge ? 'aspect-[4/3] md:aspect-[16/10]' : 'aspect-[4/3]'}`}>
          {/* Full-bleed image with parallax */}
          <motion.img 
            src={image} 
            alt={title}
            style={{ y, scale }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
          
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
            {/* Badge */}
            <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-sm text-[10px] font-medium text-white uppercase tracking-wider mb-3">
              {badge}
            </span>
            
            <h3 className={`font-bold text-white mb-1.5 leading-tight ${isLarge ? 'text-xl md:text-2xl' : 'text-base md:text-lg'}`}>
              {title}
            </h3>
            
            <p className={`text-white/70 line-clamp-2 mb-3 ${isLarge ? 'text-sm' : 'text-xs'}`}>
              {description}
            </p>
            
            <div className="flex items-center gap-1.5 text-white/80 group-hover:text-white transition-colors">
              <span className="text-xs font-medium">Learn more</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </motion.button>
    </div>
  );
};

const testimonialData = {
  quote: "YVOO reduced our audit lead time from 3 weeks to 3 days. The quality is consistent across all our global suppliers.",
  name: "Marcus Weber",
  title: "Head of Supplier Quality",
  company: "Siemens Energy",
  image: procurementMaleEuropean,
  icon: "clock",
  challenge: "With over 2,000 global suppliers across 45 countries, Siemens Energy struggled with audit lead times averaging 3 weeks.",
  solution: "YVOO's on-demand auditor network provided instant access to certified local auditors in every region.",
  useCases: [
    { title: "Rapid Supplier Onboarding", description: "New suppliers verified and approved within 72 hours." },
    { title: "Emergency Quality Audits", description: "Ad-hoc audits deployed within 48 hours." },
  ],
  results: ["87% faster deployment", "€2.4M annual savings", "100% consistency"],
};

const TestimonialsCarouselSection = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<typeof testimonialData | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<IndustryUseCase | null>(null);

  const useCases: IndustryUseCase[] = [
    {
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
      title: "Automotive: PPAP Validation & Tool Audits",
      useCase: "Qualify new Tier-2 suppliers for precision parts in days, not weeks.",
      solutions: [
        "Complete First Article Inspection with automatic document creation",
        "Supplier development according to IATF 16949",
        "Automatic release process with ERP integration",
        "VDA 6.3 compliant process assessment"
      ],
      result: "Result: Qualification in 3 days instead of 3 weeks, complete PPAP documentation digitally available."
    },
    {
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=600&fit=crop",
      title: "Aerospace: AS9100 Compliance & Critical Process Validation",
      useCase: "Validate critical processes at aerospace component suppliers.",
      solutions: [
        "Welding process qualification with complete documentation",
        "Material tracking and certificate tracking",
        "AS9100-compliant reporting",
        "Critical process parameter monitoring"
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=600&fit=crop",
      title: "Pharma: GMP Audits & Clean Room Assessments",
      useCase: "Ensure medical device and pharma suppliers meet regulatory requirements.",
      solutions: [
        "Sterilization process validation with FDA-compliant documentation",
        "Clean Room assessment with automatic classification",
        "Change Control and deviation management",
        "Validation processes fully documented"
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
      title: "Chemical & Process Industry: REACH Compliance & Process Safety",
      useCase: "Verify authenticity and quality of electronic components and chemical processes.",
      solutions: [
        "Plant safety inspection with automatic risk assessment",
        "Environmental audits and REACH compliance check",
        "Action tracking with deadline monitoring",
        "Process safety according to COMAH/Seveso"
      ]
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Testimonial - BeFound 3-Column Style */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-headline text-foreground mb-12"
        >
          What our customers say
        </motion.h2>
        
        <div className="grid lg:grid-cols-3 gap-0 items-stretch mb-24">
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
                87%
              </p>
              <p className="text-xl text-white/90 font-medium mt-2">
                faster audit deployment
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
              src={procurementMaleEuropean}
              alt="Marcus Weber - Head of Supplier Quality"
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
              <div className="w-8 h-8 bg-foreground flex items-center justify-center">
                <span className="text-background text-xs font-bold">SE</span>
              </div>
              <span className="text-lg font-bold text-foreground tracking-wide">SIEMENS ENERGY</span>
            </div>
            
            {/* Quote */}
            <blockquote className="text-lg text-foreground leading-relaxed">
              "YVOO reduced our audit lead time from 3 weeks to 3 days. The quality is consistent across all our global suppliers."
            </blockquote>
            
            {/* Attribution */}
            <div>
              <p className="font-semibold text-foreground">Marcus Weber,</p>
              <p className="text-sm text-primary">Head of Supplier Quality</p>
            </div>
            
            {/* See More Button */}
            <button
              onClick={() => setSelectedTestimonial(testimonialData)}
              className="flex items-center gap-2 text-primary font-medium hover:underline transition-all group w-fit"
            >
              See full case study
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Industry Use Cases Header */}

        {/* Industry Use Cases - ScanPro+ Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16 text-center"
        >
          <h2 className="section-headline text-foreground max-w-3xl mx-auto mb-4">
            How teams use YVOO
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real scenarios from automotive, aerospace, medical, and electronics industries.
          </p>
        </motion.div>

        {/* VanMoof-style Product Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Large card - Automotive */}
          <UseCaseCard
            image={useCases[0].image}
            badge="Automotive"
            title={useCases[0].title.split(':')[1]?.trim() || useCases[0].title}
            description={useCases[0].useCase}
            isLarge={true}
            delay={0}
            onClick={() => setSelectedUseCase(useCases[0])}
          />

          {/* Top right - Aerospace */}
          <UseCaseCard
            image={useCases[1].image}
            badge="Aerospace"
            title={useCases[1].title.split(':')[1]?.trim() || useCases[1].title}
            description={useCases[1].useCase}
            delay={0.1}
            onClick={() => setSelectedUseCase(useCases[1])}
          />

          {/* Bottom right - Pharma */}
          <UseCaseCard
            image={useCases[2].image}
            badge="Pharma"
            title={useCases[2].title.split(':')[1]?.trim() || useCases[2].title}
            description={useCases[2].useCase}
            delay={0.2}
            onClick={() => setSelectedUseCase(useCases[2])}
          />
        </div>

        {/* Full width bottom card - Chemical */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={() => setSelectedUseCase(useCases[3])}
          className="group relative w-full overflow-hidden cursor-pointer mt-4 md:mt-6 text-left"
        >
          {/* Full-bleed image container */}
          <div className="relative overflow-hidden aspect-[21/9] md:aspect-[3/1]">
            {/* Full-bleed image */}
            <img 
              src={useCases[3].image} 
              alt={useCases[3].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
            
            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 top-0 flex flex-col justify-center p-6 md:p-10 lg:p-12 max-w-xl z-10">
              {/* Badge */}
              <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-sm text-[10px] font-medium text-white uppercase tracking-wider mb-3 w-fit">
                Chemical & Process
              </span>
              
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
                {useCases[3].title.split(':')[1]?.trim() || useCases[3].title}
              </h3>
              
              <p className="text-white/70 text-sm md:text-base line-clamp-2 hidden md:block">
                {useCases[3].useCase}
              </p>
              
              <div className="flex items-center gap-2 mt-4 text-white/80 group-hover:text-white transition-colors">
                <span className="text-sm font-medium">Explore use case</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </motion.button>

      </div>

      {/* Testimonial Modal */}
      <TestimonialModal 
        testimonial={selectedTestimonial} 
        onClose={() => setSelectedTestimonial(null)} 
      />

      {/* Use Case Modal */}
      <IndustryUseCaseModal 
        useCase={selectedUseCase} 
        onClose={() => setSelectedUseCase(null)} 
      />
    </section>
  );
};

export default TestimonialsCarouselSection;
