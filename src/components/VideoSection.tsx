import { Play } from "lucide-react";

const VideoSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Video Placeholder with vibrant gradient */}
          <div 
            className="relative aspect-video rounded-3xl overflow-hidden group cursor-pointer border-2 border-white/10"
            style={{
              background: "linear-gradient(135deg, rgb(139, 92, 246), rgb(124, 58, 237), rgb(109, 40, 217))",
              boxShadow: "0 30px 60px -15px rgba(139, 92, 246, 0.4), 0 0 40px rgba(255,255,255,0.1) inset",
            }}
          >
            {/* Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/5"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110 shadow-xl">
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white/90 text-sm font-sans mb-2">Featured Project Video</p>
              <h3 className="text-white text-2xl font-serif">Behind the Scenes</h3>
            </div>

            {/* Edge Highlight */}
            <div className="absolute inset-0 rounded-3xl border border-white/20"></div>
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground font-sans text-sm">
              Watch our creative process unfold from concept to completion
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
