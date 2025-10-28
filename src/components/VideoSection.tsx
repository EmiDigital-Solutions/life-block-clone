import { Play } from "lucide-react";

const VideoSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Video Placeholder */}
          <div className="relative aspect-video bg-navy-deep rounded-lg overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-navy-deep to-navy-light"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white/80 text-sm font-sans mb-2">Featured Project Video</p>
              <h3 className="text-white text-2xl font-serif">Behind the Scenes</h3>
            </div>
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
