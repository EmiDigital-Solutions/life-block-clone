import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BeFound from "./pages/BeFound";
import GroundIntelligence from "./pages/GroundIntelligence";
import Auditors from "./pages/Auditors";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import AboutUs from "./pages/AboutUs";
import BackgroundRemoval from "./pages/BackgroundRemoval";
import ScanProPlus from "./pages/ScanProPlus";
import SearchSuppliers from "./pages/SearchSuppliers";
import Features from "./pages/Features";
import CustomerStories from "./pages/CustomerStories";
import CustomerStoryDetail from "./pages/CustomerStoryDetail";
import LNGInspection from "./pages/LNGInspection";
import NotFound from "./pages/NotFound";

// Atlas AI App
import AtlasLayout from "./pages/atlas/AtlasLayout";
import AtlasLogin from "./pages/atlas/AtlasLogin";
import AtlasDashboard from "./pages/atlas/AtlasDashboard";
import AtlasSuppliers from "./pages/atlas/AtlasSuppliers";
import AtlasAudits from "./pages/atlas/AtlasAudits";
import AtlasAuditDetail from "./pages/atlas/AtlasAuditDetail";
import AtlasFindings from "./pages/atlas/AtlasFindings";
import AtlasCapa from "./pages/atlas/AtlasCapa";
import AtlasEvidence from "./pages/atlas/AtlasEvidence";
import AtlasCopilot from "./pages/atlas/AtlasCopilot";
import AtlasLiveAudit from "./pages/atlas/AtlasLiveAudit";
import AtlasAuthGuard from "./components/atlas/AtlasAuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="overflow-x-hidden w-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/lng-inspection" element={<LNGInspection />} />
            <Route path="/be-found" element={<BeFound />} />
            <Route path="/ground-intelligence" element={<GroundIntelligence />} />
            <Route path="/scanpro-plus" element={<ScanProPlus />} />
            <Route path="/search-suppliers" element={<SearchSuppliers />} />
            <Route path="/features" element={<Features />} />
            <Route path="/auditors" element={<Auditors />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/customer-stories" element={<CustomerStories />} />
            <Route path="/customer-stories/:storyId" element={<CustomerStoryDetail />} />
            <Route path="/bg-removal" element={<BackgroundRemoval />} />

            {/* Atlas AI App */}
            <Route path="/atlas/login" element={<AtlasLogin />} />
            <Route path="/atlas" element={<AtlasLayout />}>
              <Route index element={<AtlasDashboard />} />
              <Route path="suppliers" element={<AtlasSuppliers />} />
              <Route path="audits" element={<AtlasAudits />} />
              <Route path="audits/:auditId" element={<AtlasAuditDetail />} />
              <Route path="findings" element={<AtlasFindings />} />
              <Route path="capa" element={<AtlasCapa />} />
              <Route path="evidence" element={<AtlasEvidence />} />
              <Route path="copilot" element={<AtlasCopilot />} />
              <Route path="live-audit" element={<AtlasLiveAudit />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
