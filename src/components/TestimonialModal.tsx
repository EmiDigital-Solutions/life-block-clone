import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronDown, ArrowLeft, ArrowRight, Check } from "lucide-react";

interface UseCase {
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  image: string;
  icon: string;
  useCases: UseCase[];
  challenge: string;
  solution: string;
  results: string[];
}

interface TestimonialModalProps {
  testimonial: Testimonial | null;
  onClose: () => void;
}

export const TestimonialModal = ({ testimonial, onClose }: TestimonialModalProps) => {
  if (!testimonial) return null;

  return (
    <Dialog open={!!testimonial} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-none w-screen h-screen sm:rounded-none p-0 bg-white border-none overflow-hidden [&>button]:hidden">
        {/* Navigation bar with back button */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Testimonials</span>
              <span className="sm:hidden">Back</span>
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="h-full overflow-y-auto pt-16">
          {/* Hero Section */}
          <section className="relative min-h-[60vh] lg:min-h-[70vh] bg-gradient-to-br from-[#e8f4f8] via-white to-[#e8f4f8]">
            {/* Left side image - clipped circle */}
            <div className="absolute left-0 top-0 bottom-0 w-[40%] hidden lg:block overflow-hidden">
              <div 
                className="absolute inset-0"
                style={{
                  clipPath: 'ellipse(100% 100% at 0% 50%)',
                }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
              <div className="lg:ml-[40%] lg:pl-16 space-y-6">
                <DialogHeader className="space-y-4 text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg mb-2">
                    <span className="text-sm font-semibold text-primary">Success Story</span>
                  </div>
                  <DialogTitle className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    {testimonial.company}
                  </DialogTitle>
                  <DialogDescription className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
                    How {testimonial.name} transformed supplier quality management with YVOO
                  </DialogDescription>
                </DialogHeader>

                <div className="flex items-center gap-4 pt-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border-4 border-white shadow-lg lg:hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
              <div className="w-14 h-14 rounded-lg bg-primary flex items-center justify-center animate-bounce">
                <ChevronDown className="w-6 h-6 text-white" />
              </div>
            </div>
          </section>

          {/* Challenge & Solution Section */}
          <section className="py-20 lg:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Challenge */}
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-lg">
                    <span className="text-sm font-semibold text-red-600">The Challenge</span>
                  </div>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    {testimonial.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
                    <span className="text-sm font-semibold text-green-600">The Solution</span>
                  </div>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    {testimonial.solution}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quote Section */}
          <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <blockquote 
                className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: `"${testimonial.quote}"` }}
              />
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.title}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Use Cases Section */}
          <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center">
                Key Use Cases
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {testimonial.useCases.map((useCase, idx) => (
                  <div 
                    key={idx} 
                    className="bg-[#f8fafb] rounded-lg p-6 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Check className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-gray-900">{useCase.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{useCase.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="py-16 lg:py-24 bg-primary text-white">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center">
                Measurable Results
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {testimonial.results.map((result, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                    <p className="text-lg font-medium">{result}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Ready to transform your supplier quality?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join {testimonial.company} and hundreds of other enterprises achieving breakthrough results with YVOO.
              </p>
              <Button size="lg">
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialModal;
