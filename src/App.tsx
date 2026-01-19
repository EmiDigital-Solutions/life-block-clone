import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="overflow-x-hidden w-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
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
            <Route path="/bg-removal" element={<BackgroundRemoval />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
