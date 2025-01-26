// src/utils/types.ts
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image: string;
  images?: string[];
  featured: boolean;
  links: {
    github?: string;
    live?: string;
    demo?: string;
    video?: string;
  };
  details?: {
    problem: string;
    solution: string;
    highlights: string[];
    technical_details: string[];
    learned: string[];
  };
  date: string;
}

export interface Skill {
  name: string;
  icon?: string;
  level: "beginner" | "intermediate" | "advanced";
  type: "language" | "framework" | "tool" | "platform";
  category: "frontend" | "backend" | "devops" | "database" | "other";
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string[];
  technologies: string[];
}
