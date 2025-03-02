import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '../../../utils/types';
import { containerVariants, itemVariants } from '../../../utils/animations';

const getEmbedUrl = (url: string) => {
  const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&]+)/)?.[1];
  if (!videoId) return '';
  return `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&color=white`;
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
      github: "https://github.com/MazRadwan/Aerotraq_backend", 
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
      github: "https://github.com/MazRadwan/LyonsDen", 
      live: "https://alyonsdentherapy.com",
      video: "https://www.youtube.com/watch?v=7WMzEy-0_0k"
    },
    date: "2024-12"
  },
  {
    id: "4",
    title: "Artist Portfolio Website",
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
  const [playing, setPlaying] = useState<string | null>(null);

  // Enhanced animation variants specific for projects
  const projectContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const projectItemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12, 
        duration: 0.5 
      }
    }
  };

  const videoPlayerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 20 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section id="projects" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
      <Container>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and passion for web development.
            </p>
          </div>
          
          <motion.div 
            className="grid gap-8 md:grid-cols-2"
            variants={projectContainerVariants}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={projectItemVariants}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                {project.links.video ? (
                  <motion.div 
                    className="aspect-video relative group cursor-pointer" 
                    onClick={() => setPlaying(playing === project.id ? null : project.id)}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {playing === project.id ? (
                        <motion.iframe
                          key="video-player"
                          variants={videoPlayerVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          src={`${getEmbedUrl(project.links.video)}&autoplay=1`}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <motion.div
                          key="video-thumbnail"
                          variants={videoPlayerVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="w-full h-full"
                        >
                          <img 
                            src={`https://img.youtube.com/vi/${project.links.video.split('v=')[1]?.split('&')[0]}/mqdefault.jpg`}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                          <motion.div 
                            className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                          >
                            <motion.div 
                              className="w-16 h-16 flex items-center justify-center rounded-full bg-white/90 group-hover:bg-white transition-colors"
                              whileHover={{ 
                                scale: 1.1,
                                boxShadow: "0 0 20px rgba(255,255,255,0.5)"
                              }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="aspect-[16/9] overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
                
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <motion.span 
                        key={tech}
                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full"
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: "rgba(59, 130, 246, 0.1)" 
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    {project.links.github && (
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-5 h-5" />
                        <span>Code</span>
                      </motion.a>
                    )}
                    {project.links.live && (
                      <motion.a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>Live Demo</span>
                      </motion.a>
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
