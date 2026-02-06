import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhyYVOOSection from "@/components/WhyYVOOSection";
import BuyerPainPointsSection from "@/components/BuyerPainPointsSection";
import EmailComparisonSection from "@/components/EmailComparisonSection";
import TestimonialSection from "@/components/TestimonialSection";


import { HowItWorksSection } from "@/components/HowItWorksSection";
import GlobalNetworkSection from "@/components/GlobalNetworkSection";
import StatsWithQuoteSection from "@/components/StatsWithQuoteSection";
import TestimonialsCarouselSection from "@/components/TestimonialsCarouselSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      {/* 1. ATTENTION: Bold promise, visual impact */}
      <HeroSection />
      
      {/* 2. HOOK: Provocative statement with modal ("Tell me more") */}
      <WhyYVOOSection />
      
      {/* 3. PROBLEM: Empathy - show you understand their pain */}
      <BuyerPainPointsSection />
      
      {/* 5. CONTRAST: Before/After - visualize the stakes */}
      <EmailComparisonSection />
      
      
      {/* 6. SOLUTION DEMO: Show capability after stakes are clear */}
      <TestimonialSection />
      
      
      {/* 7. GUIDE: Simple path forward */}
      <HowItWorksSection />
      
      {/* 8. CREDIBILITY: Prove capability */}
      <GlobalNetworkSection />
      
      {/* 9. AUTHORITY: Stats + third-party validation */}
      <StatsWithQuoteSection />
      
      {/* 10. PROOF: Customer testimonials + use cases */}
      <TestimonialsCarouselSection />
      
      {/* 11. OBJECTIONS: Remove friction */}
      <FAQSection />
      
      {/* 12. ACTION: Aspirational close */}
      <FinalCTASection />
      
      <Footer />
    </div>
  );
};

export default Index;
