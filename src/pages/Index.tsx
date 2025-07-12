import { EditorsPick } from "@/components/EditorsPick";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, TrendingUp } from "lucide-react";

const Index = () => {
  const scrollToContent = () => {
    document.querySelector('#editors-pick')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-hero border-b border-border overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Curated Excellence</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Editor's
              <span className="bg-gradient-creative bg-clip-text text-transparent"> Pick</span>
            </h1>

            {/* Enhanced Description */}
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover exceptional <span className="text-primary font-semibold">3D art</span>, 
              <span className="text-primary font-semibold"> animation</span>, and 
              <span className="text-primary font-semibold"> digital creativity</span> from talented artists around the world.
            </p>
            
            {/* Call to Action Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button 
                asChild
                size="lg" 
                className="px-8 py-4 text-lg font-semibold bg-gradient-creative hover:shadow-creative transition-all duration-300 hover:scale-105"
              >
                <a href="https://cgafrica.com/upload" target="_blank" rel="noopener noreferrer">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Submit your Artwork
                </a>
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="animate-bounce">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={scrollToContent}
                className="rounded-full hover:bg-primary/10 transition-colors"
              >
                <ArrowDown className="w-6 h-6 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Enhanced Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-creative rounded-full opacity-20 animate-float blur-sm" />
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-creative rounded-full opacity-30 animate-float blur-sm" style={{
          animationDelay: '1s'
        }} />
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-primary/20 rounded-full opacity-40 animate-float" style={{
          animationDelay: '2s'
        }} />
        <div className="absolute bottom-1/3 right-20 w-14 h-14 bg-primary/15 rounded-full opacity-50 animate-float" style={{
          animationDelay: '0.5s'
        }} />
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
      </section>

      {/* Editor's Pick Section */}
      <div id="editors-pick">
        <EditorsPick />
      </div>
    </div>;
};
export default Index;