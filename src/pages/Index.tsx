import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FullScreenProjects from "@/components/FullScreenProjects";
import AuditorsSection from "@/components/AuditorsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FullScreenProjects />
      <AuditorsSection />
      <Footer />
    </div>
  );
};

export default Index;
