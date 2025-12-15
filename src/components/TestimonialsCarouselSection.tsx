import { motion } from "framer-motion";

import auditor1 from "@/assets/procurement-male-european.jpg";
import auditor2 from "@/assets/procurement-female-asian.jpg";
import auditor3 from "@/assets/procurement-male-latin.jpg";
import auditor4 from "@/assets/procurement-female-european.jpg";
import auditor5 from "@/assets/procurement-male-asian.jpg";
import auditor6 from "@/assets/procurement-female-blonde.jpg";

const testimonials = [
  {
    quote: "YVOO reduced our audit lead time from 3 weeks to 3 days. The quality is consistent across all our global suppliers.",
    name: "Marcus Weber",
    title: "Head of Supplier Quality",
    company: "Siemens Energy",
    image: auditor1,
  },
  {
    quote: "We've cut our audit costs by 65% while actually improving coverage.",
    name: "Dr. Lin Chen",
    title: "VP Procurement",
    company: "Continental AG",
    image: auditor2,
  },
  {
    quote: "Finding certified auditors in Southeast Asia was always a challenge. YVOO solved that problem overnight.",
    name: "Carlos Martinez",
    title: "Global Quality Director",
    company: "ZF Group",
    image: auditor3,
  },
  {
    quote: "The platform's ease of use is remarkable. Our team was fully onboarded in less than a day.",
    name: "Anna Bergström",
    title: "Supplier Development Manager",
    company: "Volvo Cars",
    image: auditor4,
  },
  {
    quote: "Real-time visibility into audit progress has transformed how we manage supplier risk.",
    name: "Takeshi Yamamoto",
    title: "Chief Procurement Officer",
    company: "Denso Corporation",
    image: auditor5,
  },
  {
    quote: "The AI-powered reports are incredibly thorough and consistent.",
    name: "Sophie Laurent",
    title: "Quality Assurance Lead",
    company: "Airbus",
    image: auditor6,
  },
];

const TestimonialsCarouselSection = () => {
  return (
    <section className="py-24 md:py-32 bg-[#f5f5f5]">
      <div className="container mx-auto px-6">
        {/* Header - offmenu style with mixed weight typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
            <span className="font-semibold text-foreground">What our</span>{" "}
            <span className="text-muted-foreground font-normal">customers</span>
            <br />
            <span className="text-muted-foreground font-normal">say about</span>{" "}
            <span className="font-semibold text-foreground">YVOO.</span>
          </h2>
        </motion.div>

        {/* Grid - offmenu style cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-[#ebebeb] rounded-[28px] p-8 hover:bg-[#e3e3e3] transition-colors duration-300"
            >
              {/* Quote */}
              <blockquote className="text-foreground text-lg leading-relaxed mb-8">
                "{testimonial.quote}"
              </blockquote>

              {/* Author - offmenu style with avatar and inline text */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="font-medium text-foreground">
                    {testimonial.name}
                  </span>
                  <span className="text-muted-foreground">—</span>
                  <span className="text-muted-foreground">
                    {testimonial.title}, {testimonial.company}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarouselSection;
