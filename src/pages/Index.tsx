import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import FullScreenProjects from "@/components/FullScreenProjects";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <VideoSection />
      <FullScreenProjects />
    </div>
  );
};

export default Index;
