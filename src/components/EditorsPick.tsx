import { Sparkles, TrendingUp, Crown } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { useProjects } from "@/hooks/useProjects";

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
    <section className="py-16 px-4 bg-gradient-hero">
      <div className="w-full">
        {/* Header */}
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 px-4">
          {editorsPicks.map((project, index) => (
            <div
              key={project.id}
              className="animate-scale-in"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* View All Link */}
        {editorsPicks.length > 0 && (
          <div className="text-center mt-12">
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