import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '../../../utils/types';
import { containerVariants, itemVariants } from '../../../utils/animations';

const projects: Project[] = [
  {
    id: "1",
    title: "Project 1",
    slug: "project-1", 
    description: "Description of project 1",
    technologies: ["React", "Next.js", "TypeScript"],
    image: "/api/placeholder/600/400",
    featured: true,
    links: {
      github: "https://github.com/yourusername/project1",
      live: "https://project1.com"
    },
    date: "2024-01"
  },
  {
    id: "2",
    title: "Project 2",
    slug: "project-2",
    description: "Description of project 2",
    technologies: ["React", "Node.js", "MongoDB"],
    image: "/api/placeholder/600/400",
    featured: true,
    links: {
      github: "https://github.com/yourusername/project2", 
      live: "https://project2.com"
    },
    date: "2024-01"
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
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
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
