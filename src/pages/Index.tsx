import { EditorsPick } from "@/components/EditorsPick";
const Index = () => {
  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-hero border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              Editor's
              <span className="bg-gradient-creative bg-clip-text text-[#f26522]"> Pick</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover exceptional 3D art, animation, and digital creativity from talented artists around the world.
            </p>
            
            <div className="flex items-center justify-center gap-4">
              
              
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-creative rounded-full opacity-20 animate-float" />
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-creative rounded-full opacity-30 animate-float" style={{
        animationDelay: '1s'
      }} />
      </section>

      {/* Editor's Pick Section */}
      <EditorsPick />
    </div>;
};
export default Index;