import { useMemo } from "react";
import { Sparkles, TrendingUp, Crown, Grid, ArrowLeft, ArrowRight } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { useProjects } from "@/hooks/useProjects";
import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { shuffle } from "@/lib/shuffle";

// Custom navigation component that uses carousel context
const CarouselNavigation = () => {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();
  
  // Determine button colors based on scroll availability
  const getPrevButtonClass = () => {
    if (!canScrollPrev && canScrollNext) {
      // Can only go forward, previous button should be muted
      return "bg-white/5 border-white/10 text-white/50";
    }
    // Can go back or can go both ways - use orange
    return "bg-[#f26522] border-[#f26522] text-white";
  };
  
  const getNextButtonClass = () => {
    if (!canScrollNext && canScrollPrev) {
      // Can only go back, next button should be muted
      return "bg-white/5 border-white/10 text-white/50";
    }
    // Can go forward or can go both ways - use orange
    return "bg-[#f26522] border-[#f26522] text-white";
  };

  return (
    <div className="flex justify-center gap-4 mb-6">
      <Button
        variant="outline"
        size="icon"
        className={`h-8 w-8 rounded-full transition-all duration-300 hover:bg-[#f26522] hover:border-[#f26522] hover:text-white ${getPrevButtonClass()}`}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={`h-8 w-8 rounded-full transition-all duration-300 hover:bg-[#f26522] hover:border-[#f26522] hover:text-white ${getNextButtonClass()}`}
        disabled={!canScrollNext}
        onClick={scrollNext}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    </div>
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
          
          
          
          
          

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Hand Selected</span>
            </div>
          </div>
        </div>

        {/* Netflix-style Carousel */}
        <div className="relative">
          <Carousel opts={{
          align: "start",
          loop: false
        }} className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {/* Navigation Controls Above Carousel - moved inside content */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10">
                <CarouselNavigation />
              </div>
              
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
        {gridData.length > 0 && <div className="mt-20">
            {/* Grid Header */}
            <div className="text-center mb-12 animate-fade-in max-w-4xl mx-auto">
              
              
              
              
              
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 auto-rows-fr">
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