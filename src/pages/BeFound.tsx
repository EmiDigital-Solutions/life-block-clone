import { Button } from "@/components/ui/button";
import { Check, Users, Eye, TrendingUp, ArrowRight, Building2, Globe2, BarChart3 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BeFound = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-[#1a1a3e] via-[#2a1a5e] to-[#0a4a3a]">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-left">
              <span className="text-primary">Get discovered</span>
              <br />
              <span className="text-white">by global buyers seeking audited suppliers.</span>
            </h1>
            
            <div className="flex flex-wrap gap-6 mb-10">
              <div className="flex items-center gap-2 text-white">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-lg">Free Profile</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-lg">Premium Visibility</span>
              </div>
            </div>

            <Button className="bg-primary text-white hover:bg-primary/90 text-lg px-8 py-6 rounded-full">
              Claim Your Profile
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <p className="mt-8 text-lg text-white/70 max-w-2xl">
              Create or claim your supplier profile in minutes. If your company is already listed on YVOO, take control of your profile for free and manage your content.
            </p>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <p className="text-center text-muted-foreground mb-12">
            Reach thousands of procurement professionals via YVOO
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
            {["REWE", "KNORR", "IFM", "ABUS", "AVL", "KRONUS"].map((name) => (
              <div key={name} className="flex items-center justify-center h-20 bg-white rounded-lg border border-gray-200 px-4">
                <span className="text-2xl font-bold text-gray-800">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-20">
            <span className="text-primary">Our Value</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-background rounded-2xl p-8 shadow-lg">
              <div className="text-6xl font-bold text-primary mb-4">5K+</div>
              <div className="text-2xl font-semibold mb-6 text-foreground">Active Buyers Annually</div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  Global Procurement Teams
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  B2B Focus
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  All Industries
                </li>
              </ul>
            </div>

            <div className="bg-background rounded-2xl p-8 shadow-lg">
              <div className="text-6xl font-bold text-primary mb-4">25K+</div>
              <div className="text-2xl font-semibold mb-6 text-foreground">Supplier Views Per Month</div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  Manage Profile Content
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  Track Your Analytics
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  Verified Status Boost
                </li>
              </ul>
            </div>

            <div className="bg-background rounded-2xl p-8 shadow-lg">
              <div className="text-6xl font-bold text-primary mb-4">8x</div>
              <div className="text-2xl font-semibold mb-6 text-foreground">More Visibility with Premium</div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  Precise Targeting
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  Advanced Analytics
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  Buyer Intent Data
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Product Overview Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">Product</span> <span className="text-foreground">Overview.</span>
          </h2>
          <p className="text-muted-foreground mb-20 max-w-2xl">
            Get started in three simple steps and begin connecting with global buyers
          </p>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-foreground text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Sign up and create your supplier profile with your company details, capabilities, certifications, and audit history. Make your profile stand out to potential buyers.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold border-b-4 border-primary">
                2
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Get Verified</h3>
              <p className="text-muted-foreground">
                Schedule an on-site audit with our verified auditors. Once completed, your profile receives the YVOO verified badge, significantly increasing buyer trust and visibility.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-foreground text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Connect with Buyers</h3>
              <p className="text-muted-foreground">
                Start receiving inquiries from global buyers searching for verified suppliers. Track your profile performance, manage leads, and grow your business opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
            <span className="text-foreground">Why Choose</span> <span className="text-primary">YVOO</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-semibold text-foreground">Maximum Visibility</h3>
              <p className="text-lg text-muted-foreground">
                Your verified profile appears in search results when buyers look for suppliers in your industry and region. Premium placement ensures you stand out from the competition.
              </p>
            </div>

            <div className="space-y-6">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-semibold text-foreground">Detailed Analytics</h3>
              <p className="text-lg text-muted-foreground">
                Track who views your profile, which products generate interest, and where your inquiries come from. Use data-driven insights to optimize your presence.
              </p>
            </div>

            <div className="space-y-6">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-semibold text-foreground">Quality Connections</h3>
              <p className="text-lg text-muted-foreground">
                Connect with serious buyers actively searching for suppliers. Our platform attracts procurement professionals and decision-makers, not casual browsers.
              </p>
            </div>

            <div className="space-y-6">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-semibold text-foreground">Grow Your Business</h3>
              <p className="text-lg text-muted-foreground">
                Verified suppliers on YVOO report an average 40% increase in qualified inquiries. Turn visibility into real business opportunities and partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Ready to Get</span> <span className="text-primary">Discovered?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of verified suppliers connecting with global buyers on YVOO
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-primary text-white hover:bg-primary/90 text-lg px-8 py-6 rounded-full">
              Create Free Profile
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" className="text-lg px-8 py-6 rounded-full border-2">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BeFound;
