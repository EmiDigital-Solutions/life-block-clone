import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhyYVOOSection from "@/components/WhyYVOOSection";
import BuyerPainPointsSection from "@/components/BuyerPainPointsSection";
import EmailComparisonSection from "@/components/EmailComparisonSection";
import TransformationPillarsSection from "@/components/TransformationPillarsSection";
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
      
      {/* 4. CONTRAST: Before/After - visualize the stakes */}
      <EmailComparisonSection />
      
      {/* 5. SOLUTION: 3 transformation pillars */}
      <TransformationPillarsSection />
      
      {/* 6. GUIDE: Simple path forward */}
      <HowItWorksSection />
      
      {/* 7. CREDIBILITY: Prove capability */}
      <GlobalNetworkSection />
      
      {/* 8. AUTHORITY: Stats + third-party validation */}
      <StatsWithQuoteSection />
      
      {/* 9. PROOF: Customer testimonials + use cases */}
      <TestimonialsCarouselSection />
      
      {/* 10. OBJECTIONS: Remove friction */}
      <FAQSection />
      
      {/* 11. ACTION: Aspirational close */}
      <FinalCTASection />
      
      <Footer />
    </div>
  );
};

export default Index;
