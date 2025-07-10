import { useState, useEffect } from 'react';
import type { Project } from '@/types/project';

const MOCK_DATA: Project[] = [
  {
    "id": 16691,
    "user": 8429,
    "name": "Tkclef Theonel",
    "username": "Tkclef Kwesi",
    "user_profile_picture": "https://cgafrica-image.s3.eu-west-2.amazonaws.com/static/user-media/user-profile/Tkclef%20Kwesi/profile-picture/DP_1080X1080.jpeg",
    "project_title": "URTENe Robotics",
    "project_slug": "urtene-robotics",
    "project_description": "A commissioned project delivered via Fiverr",
    "project_format": "3D",
    "project_editor_pick": 25,
    "project_views": 10,
    "project_comment_count": 2,
    "is_video": true,
    "is_active": true,
    "is_draft": false,
    "is_published": true,
    "is_deleted": false,
    "created_at": "2025-07-01T08:58:08.973547Z",
    "updated_at": "2025-07-03T20:49:15.676097Z",
    "project_thumbnail": [
      {
        "id": 4725,
        "project_thumbnail": "https://cgafrica-image.s3.eu-west-2.amazonaws.com/static/user-media/project-gallery/Tkclef%20Kwesi/project/image_1koAY1K.jepg",
        "created_at": "2025-07-01T08:58:10.006026Z",
        "updated_at": "2025-07-01T08:58:10.006060Z",
        "user": 8429,
        "project": 16691
      }
    ],
    "softwares": [],
    "medium": [
      {
        "id": 10361,
        "medium_name": "digital_3d",
        "medium_slug": "digital_3d",
        "created_at": "2025-07-01T08:58:12.999352Z",
        "updated_at": "2025-07-01T08:58:12.999377Z",
        "user": 8429,
        "project": 16691
      }
    ],
    "categories": [
      {
        "id": 538,
        "project": 16691,
        "category_name": "Hard Surface",
        "category_image": "https://cgafrica-image.s3.eu-west-2.amazonaws.com/static/cgafrica-asset/category-logo/Hard%2520Surface/extraB_African_hard_surface_1a69281e-e0d5-4a35-898d-46a35b6642cf.jpg"
      }
    ],
    "total_likes": 2,
    "likes": [],
    "tags": [],
    "artworks": [],
    "comments": []
  },
  {
    "id": 16675,
    "user": 8799,
    "name": "Olawunmi Adetomiwa",
    "username": "Tomiwa",
    "user_profile_picture": "https://cgafrica-image.s3.eu-west-2.amazonaws.com/static/user-media/user-profile/Tomiwa/profile-picture/20210817223932__MG_62299.jpeg",
    "project_title": "STOCKTON",
    "project_slug": "stockton",
    "project_description": "My latest project created during the Jhill character course. Sculpted in ZBrush, modeled in Maya, textured in Substance Painter, and rendered in Unreal Engine. It was an awesome experience!",
    "project_format": "3D",
    "project_editor_pick": 30,
    "project_views": 86,
    "project_comment_count": 1,
    "is_video": false,
    "is_active": true,
    "is_draft": false,
    "is_published": true,
    "is_deleted": false,
    "created_at": "2025-04-16T13:41:04.987633Z",
    "updated_at": "2025-07-04T09:53:18.886655Z",
    "project_thumbnail": [
      {
        "id": 4709,
        "project_thumbnail": "https://cgafrica-image.s3.eu-west-2.amazonaws.com/static/user-media/project-gallery/Tomiwa/project/image_piHfRst.jepg",
        "created_at": "2025-04-16T13:41:07.169528Z",
        "updated_at": "2025-04-16T13:41:07.169564Z",
        "user": 8799,
        "project": 16675
      }
    ],
    "softwares": [
      {
        "id": 828,
        "project": 16675,
        "software_name": "zBrush",
        "software_logo": "https://cgafrica-image.s3.eu-west-2.amazonaws.com/static/https%3A/cgafrica-image.s3.eu-west-2.amazonaws.com/static/cgafrica-asset/software-logo/zBrush/zBrush.png"
      }
    ],
    "medium": [
      {
        "id": 10336,
        "medium_name": "digital_3d",
        "medium_slug": "digital_3d",
        "created_at": "2025-04-16T13:45:11.309842Z",
        "updated_at": "2025-04-16T13:45:11.309889Z",
        "user": 8799,
        "project": 16675
      }
    ],
    "categories": [
      {
        "id": 515,
        "project": 16675,
        "category_name": "Character Design",
        "category_image": "https://cgafrica-image.s3.eu-west-2.amazonaws.com/static/https%3A/cgafrica-image.s3.eu-west-2.amazonaws.com/static/cgafrica-asset/category-logo/Character%2520Design/extraB_african_character_design_with_some_wireframe_a328c63d-b432-4509-a993-b02994ff6771.jpg"
      }
    ],
    "total_likes": 2,
    "likes": [],
    "tags": [],
    "artworks": [],
    "comments": []
  }
];

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