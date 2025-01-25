import { ReactNode } from "react";

// Types
export interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export interface NavItem {
  name: string;
  href: string;
}

// Constants
export const NAV_ITEMS: NavItem[] = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export const SITE_CONFIG = {
  title: "YourName - Software Developer",
  description: "Full-stack developer portfolio",
  author: "YourName",
  email: "your.email@example.com",
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
  },
};
