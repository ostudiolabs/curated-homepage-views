import { useState, useEffect } from 'react';
import type { Project } from '@/types/project';


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
        console.error('API failed:', err);
        setError('Failed to fetch projects');
        setProjects([]);
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