import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ClientLogosSection from "@/components/ClientLogosSection";
import BuyerPainPointsSection from "@/components/BuyerPainPointsSection";
import TestimonialSection from "@/components/TestimonialSection";
import EmailComparisonSection from "@/components/EmailComparisonSection";
import ResultsBenefitsSection from "@/components/ResultsBenefitsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import ROICalculatorSection from "@/components/ROICalculatorSection";
import GlobalNetworkSection from "@/components/GlobalNetworkSection";
import TestimonialsCarouselSection from "@/components/TestimonialsCarouselSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import FullScreenProjects from "@/components/FullScreenProjects";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ClientLogosSection />
      <TestimonialSection />
      <EmailComparisonSection />
      <BuyerPainPointsSection />
      <ResultsBenefitsSection />
      <HowItWorksSection />
      <ROICalculatorSection />
      <GlobalNetworkSection />
      <TestimonialsCarouselSection />
      <FAQSection />
      <FinalCTASection />
      <FullScreenProjects />
      <Footer />
    </div>
  );
};

export default Index;
