import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  number: string;
  title: string;
  description: string;
  image: string;
}

const ProjectCard = ({ number, title, description, image }: ProjectCardProps) => {
  return (
    <div className="group relative bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-500">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-navy-deep">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-4">
        {/* Project Number */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-navy-deep/10 border border-navy-deep/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-navy-deep">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-slate text-sm font-sans font-medium">{number} Project</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-serif text-foreground leading-tight group-hover:text-navy-deep transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground font-sans text-sm leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* CTA */}
        <Button
          variant="ghost"
          className="group/btn p-0 h-auto font-sans text-sm text-navy-deep hover:text-navy-light hover:bg-transparent"
        >
          <span className="relative inline-flex items-center gap-2">
            Our work
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            <span className="absolute bottom-0 left-0 w-0 h-px bg-navy-deep group-hover/btn:w-full transition-all duration-300"></span>
          </span>
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
