import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HeroROICalculator from "@/components/HeroROICalculator";
import FullScreenProjects from "@/components/FullScreenProjects";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      {/* ROI Calculator - Visible on Mobile */}
      <div className="lg:hidden px-4 py-8 bg-gray-50">
        <HeroROICalculator />
      </div>
      <FullScreenProjects />
      <Footer />
    </div>
  );
};

export default Index;
