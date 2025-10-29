import ProjectCard from "./ProjectCard";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const ProjectsSection = () => {
  const projects = [
    {
      number: "01",
      title: "Making of Swedish Barn House",
      description: "We aimed at making both exterior and interiors for this project, and the first thing I did we visiting Swedish countryside to understand the authentic barn architecture and its integration with nature.",
      image: project1,
    },
    {
      number: "02",
      title: "Architectural Design Studio Zero",
      description: "We aimed at making both exterior and interiors for this project, and the first thing I did we visiting Swedish contemporary studios to explore minimalist workspace design principles and natural light optimization.",
      image: project2,
    },
    {
      number: "03",
      title: "Pink Scandinavian Design Office",
      description: "We aimed at making both exterior and interiors for this project, and the first thing I did we visiting Swedish design firms to study how color psychology enhances creative productivity in professional environments.",
      image: project3,
    },
    {
      number: "04",
      title: "Whisky Cellar Work Office Brown",
      description: "We aimed at making both exterior and interiors for this project, and the first thing I did we visiting Swedish luxury spaces to understand how traditional craftsmanship meets modern workspace requirements.",
      image: project4,
    },
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        <div className="text-center mt-16">
          <h3 className="text-3xl font-serif text-foreground mb-4">More content goes here</h3>
          <p className="text-muted-foreground font-sans max-w-2xl mx-auto">
            Discover more of our architectural projects and design philosophy. 
            Each project tells a unique story of innovation, craftsmanship, and timeless design.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
