import { useState, useEffect } from 'react';
import type { Project } from '@/types/project';

const MOCK_DATA: Project[] = Array.from({ length: 29 }, (_, i) => ({
  id: 16675 + i,
  user: 8799 + i,
  name: `Artist ${i + 1}`,
  username: `artist_${i + 1}`,
  user_profile_picture: `https://images.unsplash.com/photo-${1507003211169 + i}?w=150&h=150&fit=crop&crop=face`,
  project_title: `Creative Project ${i + 1}`,
  project_slug: `creative-project-${i + 1}`,
  project_description: `Amazing creative work showcasing artistic vision ${i + 1}`,
  project_format: i % 3 === 0 ? "Video" : i % 2 === 0 ? "2D" : "3D",
  project_editor_pick: 30 - i,
  project_views: 50 + (i * 10),
  project_comment_count: Math.floor(Math.random() * 8) + 1,
  is_video: i % 4 === 0,
  is_active: true,
  is_draft: false,
  is_published: true,
  is_deleted: false,
  created_at: `2025-0${3 + (i % 3)}-${10 + (i % 20)}T${10 + (i % 12)}:${15 + (i % 45)}:00.000000Z`,
  updated_at: `2025-06-${10 + (i % 20)}T${12 + (i % 10)}:${20 + (i % 40)}:00.000000Z`,
  project_thumbnail: [
    {
      id: 4709 + i,
      project_thumbnail: `https://images.unsplash.com/photo-${1618005182384 + (i * 1000)}?w=800&h=600&fit=crop`,
      created_at: `2025-0${3 + (i % 3)}-${10 + (i % 20)}T${10 + (i % 12)}:${15 + (i % 45)}:00.000000Z`,
      updated_at: `2025-0${3 + (i % 3)}-${10 + (i % 20)}T${10 + (i % 12)}:${15 + (i % 45)}:00.000000Z`,
      user: 8799 + i,
      project: 16675 + i
    }
  ],
  softwares: [],
  medium: [
    {
      id: 10336 + i,
      medium_name: "digital_3d",
      medium_slug: "digital_3d",
      created_at: `2025-0${3 + (i % 3)}-${10 + (i % 20)}T${10 + (i % 12)}:${15 + (i % 45)}:00.000000Z`,
      updated_at: `2025-0${3 + (i % 3)}-${10 + (i % 20)}T${10 + (i % 12)}:${15 + (i % 45)}:00.000000Z`,
      user: 8799 + i,
      project: 16675 + i
    }
  ],
  categories: [
    {
      id: 515 + i,
      project: 16675 + i,
      category_name: ["Character Design", "Environment Art", "VFX", "Animation", "Concept Art"][i % 5],
      category_image: ""
    }
  ],
  total_likes: Math.floor(Math.random() * 50) + 5,
  likes: [],
  tags: [],
  artworks: [],
  comments: []
}));

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          'https://cga-devbox.cgafrica.com/project_filtering/projects/latest/?limit=30&offset=0'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const data: Project[] = await response.json();
        setProjects(data);
      } catch (err) {
        console.warn('API failed, using mock data:', err);
        // Fallback to mock data if API fails
        setProjects(MOCK_DATA);
        setError(null); // Don't show error to user when using fallback
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter for editor's picks (projects where project_editor_pick > 0)
  const editorsPicks = projects.filter(project => project.project_editor_pick > 0);

  return {
    projects,
    editorsPicks,
    loading,
    error,
  };
};