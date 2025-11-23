import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import BuyerPainPointsSection from "@/components/BuyerPainPointsSection";
import TestimonialSection from "@/components/TestimonialSection";
import EmailComparisonSection from "@/components/EmailComparisonSection";
import FullScreenProjects from "@/components/FullScreenProjects";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <TestimonialSection />
      <EmailComparisonSection />
      <BuyerPainPointsSection />
      <FullScreenProjects />
      <Footer />
    </div>
  );
};

export default Index;
