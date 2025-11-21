import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ValuePropositionSection from "@/components/ValuePropositionSection";
import FullScreenProjects from "@/components/FullScreenProjects";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ValuePropositionSection />
      <FullScreenProjects />
      <Footer />
    </div>
  );
};

export default Index;
