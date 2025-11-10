import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureShowcase from "@/components/FeatureShowcase";
import FullScreenProjects from "@/components/FullScreenProjects";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeatureShowcase />
      <FullScreenProjects />
      <Footer />
    </div>
  );
};

export default Index;
