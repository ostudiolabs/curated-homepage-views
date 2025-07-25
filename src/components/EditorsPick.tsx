import { useMemo } from "react";
import { Sparkles, TrendingUp, Crown, Grid, ArrowLeft, ArrowRight } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { useProjects } from "@/hooks/useProjects";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, useCarousel } from "@/components/ui/carousel";
import { shuffle } from "@/lib/shuffle";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Custom navigation components with conditional styling
const CustomCarouselPrevious = () => {
  const { scrollPrev, canScrollPrev, canScrollNext } = useCarousel();
  
  const getButtonStyle = () => {
    if (canScrollPrev && canScrollNext) {
      // Both directions available - orange
      return "bg-primary border-primary text-white hover:bg-primary/90";
    } else if (!canScrollPrev && canScrollNext) {
      // Only right available - default style  
      return "bg-white/10 border-white/20 text-white hover:bg-white/20";
    } else if (canScrollPrev && !canScrollNext) {
      // Only left available - orange
      return "bg-primary border-primary text-white hover:bg-primary/90";
    } else {
      // No data available - default style
      return "bg-white/10 border-white/20 text-white hover:bg-white/20";
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "relative left-0 translate-y-0 h-8 w-8 rounded-full backdrop-blur-sm transition-all duration-300",
        getButtonStyle()
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
};

const CustomCarouselNext = () => {
  const { scrollNext, canScrollPrev, canScrollNext } = useCarousel();
  
  const getButtonStyle = () => {
    if (canScrollPrev && canScrollNext) {
      // Both directions available - orange
      return "bg-primary border-primary text-white hover:bg-primary/90";
    } else if (!canScrollPrev && canScrollNext) {
      // Only right available - orange
      return "bg-primary border-primary text-white hover:bg-primary/90";
    } else if (canScrollPrev && !canScrollNext) {
      // Only left available - default style
      return "bg-white/10 border-white/20 text-white hover:bg-white/20";
    } else {
      // No data available - default style
      return "bg-white/10 border-white/20 text-white hover:bg-white/20";
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "relative right-0 translate-y-0 h-8 w-8 rounded-full backdrop-blur-sm transition-all duration-300",
        getButtonStyle()
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
};
export const EditorsPick = () => {
  const {
    editorsPicks,
    loading,
    error
  } = useProjects();

  // Create shuffled grid data with exactly 2 cards at 4x size
  const gridData = useMemo(() => {
    const shuffledProjects = shuffle(editorsPicks);
    return shuffledProjects.map((project, index) => ({
      ...project,
      gridSize: index < 2 ? 'xl' as const : 'small' as const
    }));
  }, [editorsPicks]);
  if (loading) {
    return <section className="py-16 px-4 bg-gradient-hero">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-32 h-8 bg-gradient-creative rounded-lg animate-pulse mx-auto mb-4" />
            <div className="w-96 h-12 bg-muted rounded-lg animate-pulse mx-auto mb-4" />
            <div className="w-64 h-6 bg-muted rounded-lg animate-pulse mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => <div key={i} className="bg-gradient-card rounded-xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-16 bg-muted rounded" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-muted rounded w-16" />
                    <div className="h-6 bg-muted rounded w-16" />
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </section>;
  }
  if (error) {
    return <section className="py-16 px-4 bg-gradient-hero">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-destructive mb-2">Unable to Load Projects</h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </section>;
  }
  if (editorsPicks.length === 0) {
    return <section className="py-16 px-4 bg-gradient-hero">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-muted/10 border border-muted/20 rounded-lg p-8">
            <Crown className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">No Editor's Picks Yet</h2>
            <p className="text-muted-foreground">Check back soon for our curated selection of outstanding projects!</p>
          </div>
        </div>
      </section>;
  }
  return <section className="py-16 px-4 bg-gradient-hero">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in max-w-4xl mx-auto">
          
          
          
          
          

        </div>

        {/* Netflix-style Carousel */}
        <div className="relative">
          <Carousel opts={{
          align: "start",
          loop: false
        }} className="w-full">
            {/* Navigation positioned above carousel */}
            <div className="flex justify-center gap-4 mb-8">
              <CustomCarouselPrevious />
              <CustomCarouselNext />
            </div>
            
            <CarouselContent className="-ml-2 md:-ml-4">
              {editorsPicks.map((project, index) => <CarouselItem key={project.id} className="pl-2 md:pl-4 basis-[320px] sm:basis-[380px] md:basis-[450px] lg:basis-[520px] xl:basis-[600px]">
                  <div className="animate-scale-in" style={{
                animationDelay: `${index * 0.05}s`,
                animationFillMode: 'both'
              }}>
                    <ProjectCard project={project} variant="square" />
                  </div>
                </CarouselItem>)}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Grid Section */}
        {gridData.length > 0 && <div className="mt-20 p-8 bg-background/50 backdrop-blur-sm rounded-2xl border border-border/20">
            {/* Grid Header */}
            <div className="text-center mb-12 animate-fade-in max-w-4xl mx-auto">
              
              
              
              
              
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 auto-rows-fr">
              {gridData.map((project, index) => <div key={`grid-${project.id}`} className="animate-scale-in" style={{
            animationDelay: `${index * 0.02}s`,
            animationFillMode: 'both'
          }}>
                  <ProjectCard project={project} variant="square" size={project.gridSize} />
                </div>)}
            </div>
          </div>}
      </div>
    </section>;
};