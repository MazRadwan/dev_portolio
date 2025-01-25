import React from "react";
import { Container } from "@/components/ui/Container";

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, className = "", children }: SectionProps) {
  return (
    <section id={id} className={`py-20 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
