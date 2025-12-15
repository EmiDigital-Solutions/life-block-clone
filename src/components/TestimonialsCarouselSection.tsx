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
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trusted by procurement leaders at world-class companies
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary/30 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Quote */}
              <blockquote className="text-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.title}
                  </p>
                  <p className="text-primary text-xs font-medium">
                    {testimonial.company}
                  </p>
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
