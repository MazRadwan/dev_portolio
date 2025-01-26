import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <a
      href={href}
      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

function SocialLinks() {
  return (
    <div className="flex items-center space-x-6">
      <FooterLink href="https://github.com/MazRadwan">
        <span className="sr-only">GitHub</span>
        <Github className="w-6 h-6" />
      </FooterLink>
      <FooterLink href="https://linkedin.com/in/maz-radwan">
        <span className="sr-only">LinkedIn</span>
        <Linkedin className="w-6 h-6" />
      </FooterLink>
  
      <FooterLink href="mazradwan@icloud.com">
        <span className="sr-only">Email</span>
        <Mail className="w-6 h-6" />
      </FooterLink>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerNavItems = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    // { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="mt-32 bg-white dark:bg-gray-900">
      <Container>
        <div className="py-16">
          {/* Main footer content */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Brand and description */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Maz Radwan
              </h2>
              <p className="max-w-xs text-gray-600 dark:text-gray-400">
                Full-stack developer passionate about creating innovative and
                user-friendly web applications.
              </p>
              <SocialLinks />
            </div>

            {/* Navigation */}
            <nav className="lg:col-span-2 grid grid-cols-2 gap-8">
              {/* Site Links */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  Navigation
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerNavItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  Contact
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="mailto:mazradwan@icloud.com"
                      className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      mazradwan@icloud.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      View Resume
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 mt-12 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © {currentYear} Maz Radwan. All rights reserved.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Built with{" "}
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Next.js
                </a>{" "}
                and{" "}
                <a
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Tailwind CSS
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
