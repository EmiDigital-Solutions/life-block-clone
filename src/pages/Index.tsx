import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FounderMissionSection from "@/components/FounderMissionSection";
import FullScreenProjects from "@/components/FullScreenProjects";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FounderMissionSection />
      <FullScreenProjects />
      <Footer />
    </div>
  );
};

export default Index;
