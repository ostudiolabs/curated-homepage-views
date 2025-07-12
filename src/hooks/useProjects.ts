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

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch(
          'https://cga-devbox.cgafrica.com/project_filtering/projects/latest/?limit=30&offset=0',
          {
            signal: controller.signal,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            mode: 'cors',
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data: Project[] = await response.json();
        setProjects(data);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            console.error('API request timed out:', err);
            setError('Request timed out. Please check your internet connection and try again.');
          } else if (err.message.includes('Failed to fetch')) {
            console.error('Network error:', err);
            setError('Unable to connect to the server. Please check your internet connection or try again later.');
          } else {
            console.error('API failed:', err);
            setError(`Failed to fetch projects: ${err.message}`);
          }
        } else {
          console.error('Unknown error:', err);
          setError('An unexpected error occurred. Please try again.');
        }
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