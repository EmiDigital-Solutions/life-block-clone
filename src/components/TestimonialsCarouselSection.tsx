import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="bg-white rounded-[24px] p-7 hover:bg-[#fafafa] transition-colors duration-300 h-full flex flex-col"
                  >
                    {/* Quote */}
                    <blockquote className="text-foreground text-base leading-relaxed mb-6 flex-grow">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author - offmenu style with avatar and inline text */}
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#ebebeb]">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground text-sm">
                          {testimonial.name}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {testimonial.title}, {testimonial.company}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0 bg-white hover:bg-[#fafafa] border-none shadow-sm" />
              <CarouselNext className="static translate-y-0 bg-white hover:bg-[#fafafa] border-none shadow-sm" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarouselSection;
