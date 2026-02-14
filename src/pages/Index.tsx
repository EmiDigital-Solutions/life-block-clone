import PageGridOverlay from "@/components/PageGridOverlay";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhyYVOOSection from "@/components/WhyYVOOSection";
import AtlasAISection from "@/components/AtlasAISection";
import CapabilityOverviewSection from "@/components/CapabilityOverviewSection";
import EmailComparisonSection from "@/components/EmailComparisonSection";
import GlobalNetworkSection from "@/components/GlobalNetworkSection";
import TestimonialSection from "@/components/TestimonialSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import StatsWithQuoteSection from "@/components/StatsWithQuoteSection";
import TestimonialsCarouselSection from "@/components/TestimonialsCarouselSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <PageGridOverlay />
      {/* Content — no z-index wrapper so lines show through */}
      <div className="relative">
        <Navigation />
        <HeroSection />
        <CapabilityOverviewSection />
        <TestimonialSection />
        <WhyYVOOSection />
        <AtlasAISection />
        <EmailComparisonSection />
        <GlobalNetworkSection />
        <HowItWorksSection />
        <StatsWithQuoteSection />
        <TestimonialsCarouselSection />
        <FAQSection />
        <FinalCTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
