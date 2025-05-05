
import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useStore } from "@/store/useStore";
import { animateHero } from "@/lib/animations";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useStore();

  // Apply theme class to document
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Initialize hero animation
    animateHero(".hero-section");
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-300">
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-300 via-primary to-purple-300 z-50" />
      <Header />
      <main className="flex-grow pt-16 overflow-hidden">{children}</main>
      <Footer />
    </div>
  );
}
