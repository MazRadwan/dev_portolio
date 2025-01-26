import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '../../../utils/types';
import { containerVariants, itemVariants } from '../../../utils/animations';

// Convert YouTube URL to embed format
const getEmbedUrl = (url: string) => {
  const videoId = url.split('v=')[1];
  return `https://www.youtube.com/embed/${videoId}`;
};

const projects: Project[] = [
  {
    id: "1",
    title: "React Ecommerce Site Demo",
    slug: "project-1", 
    description: "Group Project for building a React Ecommerce Site.",
    technologies: ["React"],
    image: "/api/placeholder/600/400",
    featured: true,
    links: {
      github: "https://github.com/MazRadwan/FinalSprintPCJS/tree/main/src",
      live: "https://steeleandstubble.netlify.app",
      video: "https://www.youtube.com/watch?v=kD9ln3EDJAc"
    },
    date: "2024-04"
  },
  {
    id: "2",
    title: "AeroTraq Flight Booking and Tracking System",
    slug: "project-2",
    description: "Group Project Spring Boot and React.",
    technologies: ["React", "Spring Boot", "MySQL", "Elastic Beanstalk"],
    image: "/api/placeholder/600/400",
    featured: true,
    links: {
      github: "https://github.com/MazRadwan/LyonsDen", 
      live: "http://aviation-react-frontend.s3-website.ca-central-1.amazonaws.com",
      video: "https://www.youtube.com/watch?v=LVRYLoyQnQc"
    },
    date: "2024-12"
  },
  {
    id: "3",
    title: "Therapist Office Website",
    slug: "project-3",
    description: "Client website create in react React.",
    technologies: ["React"],
    image: "/api/placeholder/600/400",
    featured: true,
    links: {
      github: "https://github.com/thisissomethingwow/SDAT_Sprint1_Sprint2_Server", 
      live: "https://alyonsdentherapy.com",
      video: "https://www.youtube.com/watch?v=7WMzEy-0_0k"
    },
    date: "2024-12"
  },
  {
    id: "4",
    title: "Therapist Office Website",
    slug: "project-4",
    description: "Artist Portfolio Website.",
    technologies: ["HTML", "CSS"],
    image: "/api/placeholder/600/400",
    featured: true,
    links: {
      github: "https://github.com/MazRadwan/art-porfolio", 
      live: "https://mazradwan.github.io/art-porfolio/",
      video: "https://www.youtube.com/watch?v=AFfIXC-zZrg"
    },
    date: "2023-09"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
      <Container>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and passion for web development.
            </p>
          </div>
          
          <motion.div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                {project.links.video ? (
  <div className="aspect-video">
    <iframe
      src={getEmbedUrl(project.links.video)}
      className="w-full h-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
) : (
  <div className="aspect-[16/9] overflow-hidden">
    <img
      src={project.image}
      alt={project.title}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  </div>
)}
                
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span 
                        key={tech}
                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        <Github className="w-5 h-5" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
