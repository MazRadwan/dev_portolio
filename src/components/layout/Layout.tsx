import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-bg">
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
