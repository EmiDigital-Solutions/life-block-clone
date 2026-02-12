import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhyYVOOSection from "@/components/WhyYVOOSection";
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
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <WhyYVOOSection />
      <CapabilityOverviewSection />
      <EmailComparisonSection />
      <GlobalNetworkSection />
      <TestimonialSection />
      <HowItWorksSection />
      <StatsWithQuoteSection />
      <TestimonialsCarouselSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default Index;
