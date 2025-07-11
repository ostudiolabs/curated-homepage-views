import { useState } from "react";
import { Heart, Eye, MessageCircle, Play, Crown } from "lucide-react";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const thumbnailUrl = project.project_thumbnail?.[0]?.project_thumbnail || "";
  const isEditorsPick = project.project_editor_pick > 0;

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div className="group relative bg-gradient-card rounded-xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-card-hover animate-scale-in">
      {/* Editor's Pick Badge */}
      {isEditorsPick && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-creative px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium text-primary-foreground shadow-glow">
          <Crown className="w-3 h-3" />
          Editor's Pick
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary animate-pulse" />
        )}
        
        {!imageError && thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={project.project_title}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
            <div className="text-muted-foreground text-sm">No Preview</div>
          </div>
        )}

        {/* Video Indicator */}
        {project.is_video && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-primary/90 rounded-full p-3 backdrop-blur-sm">
              <Play className="w-6 h-6 text-primary-foreground fill-current" />
            </div>
          </div>
        )}

        {/* Format Badge */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white">
          {project.project_format}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="font-semibold text-foreground text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {project.project_title}
        </h3>

        {/* Author */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
            <img
              src={project.user_profile_picture}
              alt={project.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.style.background = 'var(--gradient-creative)';
              }}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{project.name}</p>
            <p className="text-xs text-muted-foreground">@{project.username}</p>
          </div>
        </div>


        {/* Categories */}
        {project.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.categories.slice(0, 2).map((category) => (
              <span
                key={category.id}
                className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
              >
                {category.category_name}
              </span>
            ))}
            {project.categories.length > 2 && (
              <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
                +{project.categories.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-muted-foreground text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{project.total_likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{project.project_views}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{project.project_comment_count}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-creative opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};