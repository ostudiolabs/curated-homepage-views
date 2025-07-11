import { Sparkles, TrendingUp, Crown, Play } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { useProjects } from "@/hooks/useProjects";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const EditorsPick = () => {
  const { editorsPicks, loading, error } = useProjects();

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gradient-hero">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-32 h-8 bg-gradient-creative rounded-lg animate-pulse mx-auto mb-4" />
            <div className="w-96 h-12 bg-muted rounded-lg animate-pulse mx-auto mb-4" />
            <div className="w-64 h-6 bg-muted rounded-lg animate-pulse mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gradient-card rounded-xl overflow-hidden animate-pulse">
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
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-gradient-hero">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-destructive mb-2">Unable to Load Projects</h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (editorsPicks.length === 0) {
    return (
      <section className="py-16 px-4 bg-gradient-hero">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-muted/10 border border-muted/20 rounded-lg p-8">
            <Crown className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">No Editor's Picks Yet</h2>
            <p className="text-muted-foreground">Check back soon for our curated selection of outstanding projects!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-hero">
      <div className="w-full">
        {/* Mobile Hero Section */}
        <div className="block md:hidden">
          {editorsPicks.length > 0 && (
            <div className="relative h-[60vh] overflow-hidden">
              <img
                src={editorsPicks[0].project_thumbnail?.[0]?.project_thumbnail || `https://picsum.photos/800/600?random=${editorsPicks[0].id}`}
                alt={editorsPicks[0].project_title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-gradient-creative p-1.5 rounded-lg">
                    <Crown className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="bg-gradient-creative bg-clip-text text-transparent font-semibold text-sm">
                    Editor's Pick
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-white mb-2 line-clamp-2">
                  {editorsPicks[0].project_title}
                </h1>
                <p className="text-gray-300 text-sm mb-4">
                  by {editorsPicks[0].name}
                </p>
                <div className="flex gap-3">
                  <button className="bg-white text-black px-6 py-2 rounded font-semibold text-sm flex items-center gap-2">
                    <Play className="w-4 h-4 fill-current" />
                    View
                  </button>
                  <button className="bg-gray-600/80 text-white px-6 py-2 rounded font-semibold text-sm">
                    Info
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block text-center py-16 px-4">
          <div className="text-center mb-12 animate-fade-in max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="bg-gradient-creative p-2 rounded-lg shadow-glow">
                <Crown className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="bg-gradient-creative bg-clip-text text-transparent font-semibold text-lg">
                Editor's Pick
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Curated Excellence
            </h2>
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Discover handpicked projects that showcase exceptional creativity, technical mastery, 
              and artistic vision from our talented community.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">
                  {editorsPicks.length} Featured Project{editorsPicks.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Hand Selected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Section Title */}
        <div className="block md:hidden px-4 py-6">
          <h2 className="text-xl font-bold text-foreground mb-2">Continue Watching</h2>
          <p className="text-muted-foreground text-sm">Curated projects from our community</p>
        </div>

        {/* Netflix-style Carousel */}
        <div className="relative px-4 pb-8">
          <Carousel
            opts={{
              align: "start",
              loop: false,
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {editorsPicks.map((project, index) => (
                <CarouselItem key={project.id} className="pl-2 md:pl-4 basis-[140px] sm:basis-[160px] md:basis-[280px] lg:basis-[320px] xl:basis-[360px]">
                  <div
                    className="animate-scale-in"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    <ProjectCard project={project} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 md:left-4 hidden sm:flex" />
            <CarouselNext className="right-2 md:right-4 hidden sm:flex" />
          </Carousel>
        </div>

        {/* View All Link - Desktop Only */}
        {editorsPicks.length > 0 && (
          <div className="hidden md:block text-center pb-16">
            <button className="group bg-gradient-creative hover:shadow-glow text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105">
              <span className="flex items-center gap-2">
                Explore All Projects
                <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};