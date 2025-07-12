import { useState } from "react";
import { Heart, Eye, MessageCircle, Play, Crown } from "lucide-react";
import type { Project } from "@/types/project";
interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'square';
  size?: 'small' | 'medium' | 'large' | 'xl';
}
export const ProjectCard = ({
  project,
  variant = 'default',
  size = 'medium'
}: ProjectCardProps) => {
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
  const getSizeClasses = () => {
    if (variant === 'square') {
      switch (size) {
        case 'small':
          return 'col-span-1 row-span-1';
        case 'medium':
          return 'col-span-2 row-span-1';
        case 'large':
          return 'col-span-2 row-span-2';
        case 'xl':
          return 'col-span-4 row-span-2';
        default:
          return 'col-span-1 row-span-1';
      }
    }
    return '';
  };
  return <div className={`group relative bg-gradient-card rounded-xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-card-hover animate-scale-in cursor-pointer ${getSizeClasses()}`}>

      {/* Full Image Container */}
      <div className={`relative overflow-hidden bg-muted ${variant === 'square' ? 'aspect-square' : 'aspect-video'}`}>
        {!imageLoaded && <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary animate-pulse" />}
        
        {!imageError && thumbnailUrl ? <img src={thumbnailUrl} alt={project.project_title} className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} onLoad={handleImageLoad} onError={handleImageError} /> : <div className="w-full h-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
            <div className="text-muted-foreground text-sm">No Preview</div>
          </div>}

        {/* Video Indicator */}
        {project.is_video && <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <div className="bg-primary/90 rounded-full p-3 backdrop-blur-sm">
              <Play className="w-6 h-6 text-primary-foreground fill-current" />
            </div>
          </div>}

        {/* Stats Icons - Top Left - Only on hover */}
        <div className="absolute top-3 left-3 flex items-center gap-3 text-white text-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
            <Heart className="w-4 h-4" />
            <span>{project.total_likes}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
            <Eye className="w-4 h-4" />
            <span>{project.project_views}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
            <MessageCircle className="w-4 h-4" />
            <span>{project.project_comment_count}</span>
          </div>
        </div>

        {/* Format Badge */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white z-10">
          {project.project_format}
        </div>

        {/* Overlay Content - Hidden by default, shown on hover/tap */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 z-10">

          {/* Title */}
          <div className="mb-3">
            <h4 className="text-white text-base line-clamp-2 font-normal">
              {project.project_title}
            </h4>
          </div>

          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
              <img src={project.user_profile_picture} alt={project.name} className="w-full h-full object-cover" onError={e => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.style.background = 'var(--gradient-creative)';
            }} />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{project.name}</p>
              <p className="text-xs text-gray-300">@{project.username}</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};