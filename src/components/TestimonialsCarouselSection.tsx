import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import auditor1 from "@/assets/procurement-male-european.jpg";
import auditor2 from "@/assets/procurement-female-asian.jpg";
import auditor3 from "@/assets/procurement-male-latin.jpg";
import auditor4 from "@/assets/procurement-female-european.jpg";
import auditor5 from "@/assets/procurement-male-asian.jpg";

const testimonials = [
  {
    quote: "YVOO reduced our audit lead time from 3 weeks to 3 days. The quality is consistent across all our global suppliers.",
    name: "Marcus Weber",
    title: "Head of Supplier Quality",
    company: "Siemens Energy",
    image: auditor1,
  },
  {
    quote: "We've cut our audit costs by 65% while actually improving coverage. The AI-powered reports are incredibly thorough.",
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
];

const TestimonialsCarouselSection = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const next = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goTo = (index: number) => {
    setIsAutoPlaying(false);
    setCurrent(index);
  };

  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden">
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

        {/* Carousel */}
        <div className="max-w-4xl mx-auto relative">
          {/* Main testimonial */}
          <div className="relative min-h-[400px] md:min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="bg-secondary/30 rounded-3xl p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Photo */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                      <img
                        src={testimonials[current].image}
                        alt={testimonials[current].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    {/* Quote */}
                    <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-6">
                      "{testimonials[current].quote}"
                    </blockquote>

                    {/* Author */}
                    <div>
                      <p className="font-semibold text-foreground text-lg">
                        {testimonials[current].name}
                      </p>
                      <p className="text-muted-foreground">
                        {testimonials[current].title}
                      </p>
                      <p className="text-primary font-medium">
                        {testimonials[current].company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full w-10 h-10 border-border hover:bg-secondary/50"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === current
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full w-10 h-10 border-border hover:bg-secondary/50"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarouselSection;
