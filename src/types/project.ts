export interface ProjectThumbnail {
  id: number;
  project_thumbnail: string;
  created_at: string;
  updated_at: string;
  user: number;
  project: number;
}

export interface Software {
  id: number;
  project: number;
  software_name: string;
  software_logo: string;
}

export interface Medium {
  id: number;
  medium_name: string;
  medium_slug: string;
  created_at: string;
  updated_at: string;
  user: number;
  project: number;
}

export interface Category {
  id: number;
  project: number;
  category_name: string;
  category_image: string;
}

export interface Like {
  id: number;
  user: number;
  project: number;
  likes: number;
  button_status: boolean;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: number;
  tag_name: string;
  tag_slug: string;
  created_at: string;
  updated_at: string;
  user: number;
}

export interface Artwork {
  project: number;
  id: number;
  user: number;
  artwork: string;
  artwork_type: string | null;
  artwork_status: string;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: number;
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  comment: string;
  project: number;
  project_comment_count: number;
  parent_comment_id: number | null;
  project_comment_likes_count: number;
  project_comment_reactions: Record<string, any>;
  likes_count: number;
  reaction: Record<string, any>;
  profile_picture: string;
  children: Comment[];
}

export interface Project {
  id: number;
  user: number;
  name: string;
  username: string;
  user_profile_picture: string;
  project_title: string;
  project_slug: string;
  project_description: string;
  project_format: string;
  project_editor_pick: number;
  project_views: number;
  project_comment_count: number;
  is_video: boolean;
  is_active: boolean;
  is_draft: boolean;
  is_published: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  project_thumbnail: ProjectThumbnail[];
  softwares: Software[];
  medium: Medium[];
  categories: Category[];
  total_likes: number;
  likes: Like[];
  tags: Tag[];
  artworks: Artwork[];
  comments: Comment[];
}