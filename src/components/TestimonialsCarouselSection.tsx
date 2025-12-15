import { useState } from "react";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PixelIcon } from "@/components/PixelIcon";
import TestimonialModal from "@/components/TestimonialModal";

import auditor1 from "@/assets/procurement-male-european.jpg";
import auditor2 from "@/assets/procurement-female-asian.jpg";
import auditor3 from "@/assets/procurement-male-latin.jpg";
import auditor4 from "@/assets/procurement-female-european.jpg";
import auditor5 from "@/assets/procurement-male-asian.jpg";
import auditor6 from "@/assets/procurement-female-blonde.jpg";

const testimonials = [
  {
    quote: "YVOO reduced our audit lead time from <strong>3 weeks to 3 days</strong>. The quality is <strong>consistent</strong> across all our global suppliers.",
    name: "Marcus Weber",
    title: "Head of Supplier Quality",
    company: "Siemens Energy",
    image: auditor1,
    icon: "clock",
    challenge: "With over 2,000 global suppliers across 45 countries, Siemens Energy struggled with audit lead times averaging 3 weeks. Coordinating schedules, finding qualified local auditors, and ensuring consistent quality standards was consuming enormous resources.",
    solution: "YVOO's on-demand auditor network provided instant access to certified local auditors in every region. The AI-powered report standardization ensured consistent quality regardless of auditor location.",
    useCases: [
      { title: "Rapid Supplier Onboarding", description: "New suppliers verified and approved within 72 hours instead of 4-6 weeks." },
      { title: "Emergency Quality Audits", description: "Ad-hoc audits deployed within 48 hours for critical supply chain issues." },
      { title: "Multi-Site Coordination", description: "Simultaneous audits across multiple supplier locations in different countries." },
      { title: "Standardized Reporting", description: "AI-generated reports following consistent format across all auditors." },
    ],
    results: ["87% faster audit deployment", "€2.4M annual cost savings", "100% audit consistency score"],
  },
  {
    quote: "We've cut our <strong>audit costs by 65%</strong> while actually <strong>improving coverage</strong>.",
    name: "Dr. Lin Chen",
    title: "VP Procurement",
    company: "Continental AG",
    image: auditor2,
    icon: "coin",
    challenge: "Continental's traditional audit approach involved flying auditors to supplier locations worldwide, resulting in costs of €8,000-15,000 per audit. Budget constraints meant only 30% of suppliers could be audited annually.",
    solution: "YVOO's local auditor network eliminated travel costs entirely. The platform's efficiency enabled auditing 85% of suppliers within the same budget previously allocated for 30%.",
    useCases: [
      { title: "Cost-Optimized Auditing", description: "Local auditors reduce per-audit costs from €12,000 to €700 average." },
      { title: "Expanded Coverage", description: "Audit 3x more suppliers with the same budget allocation." },
      { title: "Risk-Based Prioritization", description: "AI scoring helps focus resources on highest-risk suppliers." },
      { title: "Budget Forecasting", description: "Predictable pricing enables accurate annual audit budget planning." },
    ],
    results: ["65% cost reduction", "183% increase in coverage", "€4.2M budget reallocation"],
  },
  {
    quote: "Finding <strong>certified auditors</strong> in Southeast Asia was always a challenge. YVOO solved that problem <strong>overnight</strong>.",
    name: "Carlos Martinez",
    title: "Global Quality Director",
    company: "ZF Group",
    image: auditor3,
    icon: "globe",
    challenge: "ZF Group's expansion into Southeast Asian manufacturing markets was hindered by the inability to find qualified auditors in Vietnam, Thailand, and Indonesia. Traditional audit firms quoted 4-6 week lead times for these regions.",
    solution: "YVOO's pre-vetted network of 12,000+ auditors includes specialists in every major manufacturing region. ZF gained immediate access to certified auditors across all Southeast Asian countries.",
    useCases: [
      { title: "Emerging Market Entry", description: "Rapid supplier qualification in new manufacturing regions." },
      { title: "Local Expertise", description: "Auditors with native language skills and regional regulatory knowledge." },
      { title: "Certification Matching", description: "Auditors matched to specific industry certification requirements." },
      { title: "Cultural Navigation", description: "Local auditors navigate cultural nuances for better supplier relationships." },
    ],
    results: ["48-hour auditor availability", "15 new regions covered", "Zero language barriers"],
  },
  {
    quote: "The platform's <strong>ease of use</strong> is remarkable. Our team was <strong>fully onboarded in less than a day</strong>.",
    name: "Anna Bergström",
    title: "Supplier Development Manager",
    company: "Volvo Cars",
    image: auditor4,
    icon: "user",
    challenge: "Previous audit management systems required weeks of training and IT implementation. Volvo Cars needed a solution their distributed team could adopt immediately without disrupting ongoing operations.",
    solution: "YVOO's intuitive interface required no formal training. The team was creating audit requests and managing suppliers within hours of account creation.",
    useCases: [
      { title: "Self-Service Onboarding", description: "New team members productive within 2 hours of account creation." },
      { title: "Mobile Accessibility", description: "Full platform functionality available on mobile devices for field teams." },
      { title: "Integration Simplicity", description: "API connections to existing ERP systems completed in days, not months." },
      { title: "Role-Based Access", description: "Customizable permissions for different team functions and regions." },
    ],
    results: ["4-hour average onboarding", "95% user adoption rate", "Zero IT support tickets"],
  },
  {
    quote: "<strong>Real-time visibility</strong> into audit progress has <strong>transformed</strong> how we manage supplier risk.",
    name: "Takeshi Yamamoto",
    title: "Chief Procurement Officer",
    company: "Denso Corporation",
    image: auditor5,
    icon: "eye",
    challenge: "Denso lacked visibility into audit status across their 3,500+ supplier base. Audit reports arrived weeks after completion, leaving critical quality issues unaddressed during the gap.",
    solution: "YVOO's real-time dashboard provides instant visibility into every audit's status. Preliminary findings are available within hours, enabling immediate corrective action.",
    useCases: [
      { title: "Live Progress Tracking", description: "Monitor audit status from scheduling through report delivery in real-time." },
      { title: "Instant Alerts", description: "Immediate notification of critical findings requiring urgent attention." },
      { title: "Risk Dashboard", description: "Consolidated view of supplier risk scores across the entire supply base." },
      { title: "Trend Analysis", description: "Historical data visualization for identifying systemic quality patterns." },
    ],
    results: ["Real-time visibility achieved", "72% faster issue resolution", "40% risk reduction"],
  },
  {
    quote: "The <strong>AI-powered reports</strong> are incredibly <strong>thorough and consistent</strong>.",
    name: "Sophie Laurent",
    title: "Quality Assurance Lead",
    company: "Airbus",
    image: auditor6,
    icon: "document",
    challenge: "Airbus aerospace audits required exhaustive documentation meeting strict regulatory requirements. Report quality varied significantly between auditors, creating compliance risks.",
    solution: "YVOO's AI copilot guides auditors through comprehensive checklists and automatically structures reports to meet AS9100 and other aerospace standards.",
    useCases: [
      { title: "Regulatory Compliance", description: "Reports automatically structured to meet AS9100, NADCAP requirements." },
      { title: "Evidence Management", description: "AI-organized photo and document evidence with automatic categorization." },
      { title: "Finding Classification", description: "Consistent severity classification across all auditors and locations." },
      { title: "Audit Trail", description: "Complete digital record for regulatory inspections and certifications." },
    ],
    results: ["100% regulatory compliance", "50% report preparation time saved", "Zero audit inconsistencies"],
  },
];

const TestimonialsCarouselSection = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<typeof testimonials[0] | null>(null);

  return (
    <section className="py-24 md:py-32 bg-[#f5f5f5]">
      <div className="container mx-auto px-6">
        {/* Outer container - offmenu style */}
        <div className="bg-[#ebebeb] rounded-[32px] p-8 md:p-12 lg:p-16">
          {/* Header - offmenu style with mixed weight typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
              <span className="font-semibold text-foreground">What our</span>{" "}
              <span className="text-muted-foreground font-light">customers</span>
              <br />
              <span className="text-muted-foreground font-light">say about</span>{" "}
              <span className="font-semibold text-foreground">YVOO.</span>
            </h2>
          </motion.div>

          {/* Carousel */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-6">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-6 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="bg-white rounded-[28px] p-8 hover:bg-[#fafafa] transition-colors duration-300 h-full flex flex-col min-h-[420px]"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <PixelIcon name={testimonial.icon as any} className="w-6 h-6" />
                    </div>

                    {/* Quote */}
                    <blockquote 
                      className="text-foreground text-xl leading-relaxed mb-8 flex-grow"
                      dangerouslySetInnerHTML={{ __html: `"${testimonial.quote}"` }}
                    />

                    {/* Author with large image */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-4 border-[#ebebeb] shadow-lg">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground text-lg">
                          {testimonial.name}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {testimonial.title}
                        </span>
                        <span className="text-primary font-medium text-sm">
                          {testimonial.company}
                        </span>
                      </div>
                    </div>

                    {/* See More Button */}
                    <button
                      onClick={() => setSelectedTestimonial(testimonial)}
                      className="flex items-center gap-2 text-primary font-medium hover:underline transition-all group"
                    >
                      See full case study
                      <PixelIcon name="arrow-right" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-10">
              <CarouselPrevious className="static translate-y-0 bg-white hover:bg-[#fafafa] border-none shadow-md w-12 h-12" />
              <CarouselNext className="static translate-y-0 bg-white hover:bg-[#fafafa] border-none shadow-md w-12 h-12" />
            </div>
          </Carousel>
        </div>
      </div>

      {/* Modal */}
      <TestimonialModal 
        testimonial={selectedTestimonial} 
        onClose={() => setSelectedTestimonial(null)} 
      />
    </section>
  );
};

export default TestimonialsCarouselSection;
