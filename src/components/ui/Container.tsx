// src/components/ui/Container.tsx
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center ${className}`}>
      {children}
    </div>
  );
}