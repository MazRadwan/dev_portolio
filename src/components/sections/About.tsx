import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { BookOpen, Code2, Globe, Laptop } from "lucide-react";

interface ExperienceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ExperienceCard({ icon, title, description }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex gap-4 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50"
    >
      <div className="flex-shrink-0">
        <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function About() {
  const experiences = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Full Stack Development",
      description:
        "Experienced in both frontend and backend development with modern technologies.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "AWS Cloud Services",
      description:
        "Proficient in cloud architecture and AWS services implementation.",
    },
    {
      icon: <Laptop className="w-6 h-6" />,
      title: "Quality Assurance",
      description: "Certified in QA/QC methodologies and testing practices.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Continuous Learning",
      description:
        "Passionate about learning new technologies and best practices.",
    },
  ];

  return (
    <Section id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              About Me
            </h2>
            <p className="text-lg text-primary-600 dark:text-primary-400">
              Software Developer & AWS Cloud Practitioner
            </p>
          </div>

          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              I'm a software developer, with a strong foundation in full-stack development and
              cloud technologies. I am a certified Quality Assurance/Quality Tester, and 
              a certified AWS Cloud Practicioner / AWS Cloud Developer.
              I am curently enrolled in a Data Science/Machine Learning program.
            </p>
            <p>
              My journey in tech is driven by a passion for creating efficient,
              user-friendly solutions. I combine my technical skills with my
              background in art and design to build applications that are both
              functional and visually appealing.
            </p>
            <p>Currently focusing on expanding my expertise in:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Advanced React patterns and best practices</li>
              <li>Cloud architecture and AWS services</li>
              <li>Data structures and algorithms</li>
              <li>Data Science and Machine Learning</li>
              <li>Cybersecurity fundamentals</li>
            </ul>
          </div>

          {/* Tech Stack Section */}
          <div className="pt-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Current Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "React",
                "Node.js",
                "JavaScript",
                "AWS",
                "PostgreSQL",
                "ExpressJS",
                "Next.js",
                "MongoDB",
                "MySQL",
                "Docker",
                "Tailwind CSS",
                "HTML/CSS",
                "Python",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Experience Cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.title} {...experience} />
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
