
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingShapes from "@/components/FloatingShapes";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard, { Project } from "@/components/ProjectCard";
import gsap from "gsap";
import { animateHero } from "@/lib/animations";
import { useStore } from "@/store/useStore";
import { getText } from "@/lib/i18n";
import Layout from "@/components/Layout";

// Sample project data
const featuredProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform built with React, Node.js, and MongoDB, featuring real-time inventory and payment processing.",
    image: "https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/example/repo",
  },
  {
    id: "2",
    title: "AI-Powered Analytics Dashboard",
    description: "A dashboard for visualizing complex data with AI-driven insights, helping businesses make data-driven decisions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    tags: ["TypeScript", "Next.js", "Python", "TensorFlow"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/example/repo",
  },
  {
    id: "3",
    title: "Social Media Mobile App",
    description: "A cross-platform mobile application for sharing photos and stories with friends, featuring real-time notifications.",
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&auto=format&fit=crop&w=1506&q=80",
    tags: ["React Native", "Firebase", "Redux", "Expo"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/example/repo",
  },
];

export default function Index() {
  const { language } = useStore();
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Run hero animations on component mount
    if (heroRef.current) {
      animateHero(".hero-section");
    }
    
    // Animate skills on scroll
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".skill-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: ".skills-section",
              start: "top 80%",
            },
          }
        );
      });
      
      gsap.fromTo(
        ".featured-project",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".projects-section",
            start: "top 75%",
          },
        }
      );
    });
    
    return () => ctx.revert();
  }, []);
  
  const handleProjectClick = (project: Project) => {
    console.log("Project clicked:", project);
    // In a real app, you might navigate to a project details page
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <section ref={heroRef} className="hero-section relative min-h-[90vh] flex items-center">
        <FloatingShapes />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              {getText("home.title", language)}
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8">
              {getText("home.subtitle", language)}
            </p>
            <div className="flex flex-wrap justify-center gap-4 cta-button">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/projects">
                  {getText("home.cta", language)}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/contact">
                  {getText("home.contact", language)}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="skills-section section-padding bg-muted/30">
        <div className="container-custom">
          <SectionHeading
            title={getText("about.skills", language)}
            subtitle={language === "en"
              ? "I work with various technologies to create amazing digital experiences"
              : "Harika dijital deneyimler yaratmak için çeşitli teknolojilerle çalışıyorum"}
            center
          />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
            {[
              { name: "React", icon: "📱" },
              { name: "TypeScript", icon: "🔷" },
              { name: "Node.js", icon: "🟢" },
              { name: "Next.js", icon: "⚡" },
              { name: "Tailwind CSS", icon: "🎨" },
              { name: "UX/UI Design", icon: "🎯" },
              { name: "GraphQL", icon: "🔺" },
              { name: "MongoDB", icon: "🍃" },
              { name: "Firebase", icon: "🔥" },
              { name: "AWS", icon: "☁️" },
              { name: "Docker", icon: "🐳" },
              { name: "Git", icon: "🔄" },
            ].map((skill, index) => (
              <div
                key={index}
                className="skill-item p-6 rounded-lg bg-background border border-border hover:border-primary/50 transition-all"
              >
                <div className="text-3xl mb-2">{skill.icon}</div>
                <h3 className="text-base font-medium">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="projects-section section-padding">
        <div className="container-custom">
          <SectionHeading
            title={getText("projects.title", language)}
            subtitle={language === "en"
              ? "Check out some of my recent work"
              : "Son çalışmalarımdan bazılarına göz atın"}
            className="mb-12"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {featuredProjects.map((project) => (
              <div key={project.id} className="featured-project">
                <ProjectCard project={project} onClick={handleProjectClick} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/projects">
                {getText("projects.viewAll", language)}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {language === "en"
              ? "Ready to start your next project?"
              : "Bir sonraki projenize başlamaya hazır mısınız?"}
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/90">
            {language === "en"
              ? "I'm currently available for freelance work. Let's build something amazing together!"
              : "Şu anda freelance çalışmalar için müsaitim. Birlikte harika bir şeyler inşa edelim!"}
          </p>
          <Button asChild variant="secondary" size="lg" className="rounded-full">
            <Link to="/contact">
              {language === "en" ? "Get in Touch" : "İletişime Geç"}
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
