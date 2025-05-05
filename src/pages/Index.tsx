
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Star, Palette, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingShapes from "@/components/FloatingShapes";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard, { Project } from "@/components/ProjectCard";
import BlogSection from "@/components/BlogSection";
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
      // Skills animation
      gsap.utils.toArray<HTMLElement>(".skill-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: ".skills-section",
              start: "top 80%",
            },
          }
        );
      });
      
      // Projects animation
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
      {/* Hero Section with enhanced design */}
      <section ref={heroRef} className="hero-section relative min-h-[90vh] flex items-center py-24">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/3 -left-40 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
          <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-green-200/30 rounded-full blur-3xl animate-pulse-slow animation-delay-4000" />
        </div>
        <FloatingShapes />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full mb-6 animate-fade-in">
              <span className="text-sm font-medium">
                {language === "en" ? "Creative Developer Portfolio" : "Yaratıcı Geliştirici Portfolyosu"}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {getText("home.title", language)}
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 animate-fade-in animation-delay-300">
              {getText("home.subtitle", language)}
            </p>
            <div className="flex flex-wrap justify-center gap-4 cta-button animate-fade-in animation-delay-600">
              <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all">
                <Link to="/projects">
                  {getText("home.cta", language)}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-primary/20 hover:border-primary">
                <Link to="/contact">
                  {getText("home.contact", language)}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills Section with creative layout */}
      <section className="skills-section section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-50/50 to-background dark:from-background dark:via-blue-950/5 dark:to-background -z-10"></div>
        <div className="container-custom">
          <SectionHeading
            title={getText("about.skills", language)}
            subtitle={language === "en"
              ? "I work with various technologies to create amazing digital experiences"
              : "Harika dijital deneyimler yaratmak için çeşitli teknolojilerle çalışıyorum"}
            center
          />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[
              { name: "React", icon: "📱", color: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-200 dark:border-blue-700/30", iconBg: "bg-blue-100 dark:bg-blue-800/40" },
              { name: "TypeScript", icon: "🔷", color: "bg-indigo-50 dark:bg-indigo-900/20", border: "border-indigo-200 dark:border-indigo-700/30", iconBg: "bg-indigo-100 dark:bg-indigo-800/40" },
              { name: "Node.js", icon: "🟢", color: "bg-green-50 dark:bg-green-900/20", border: "border-green-200 dark:border-green-700/30", iconBg: "bg-green-100 dark:bg-green-800/40" },
              { name: "Next.js", icon: "⚡", color: "bg-purple-50 dark:bg-purple-900/20", border: "border-purple-200 dark:border-purple-700/30", iconBg: "bg-purple-100 dark:bg-purple-800/40" },
              { name: "Tailwind CSS", icon: "🎨", color: "bg-cyan-50 dark:bg-cyan-900/20", border: "border-cyan-200 dark:border-cyan-700/30", iconBg: "bg-cyan-100 dark:bg-cyan-800/40" },
              { name: "UX/UI Design", icon: "🎯", color: "bg-pink-50 dark:bg-pink-900/20", border: "border-pink-200 dark:border-pink-700/30", iconBg: "bg-pink-100 dark:bg-pink-800/40" },
              { name: "GraphQL", icon: "🔺", color: "bg-rose-50 dark:bg-rose-900/20", border: "border-rose-200 dark:border-rose-700/30", iconBg: "bg-rose-100 dark:bg-rose-800/40" },
              { name: "MongoDB", icon: "🍃", color: "bg-emerald-50 dark:bg-emerald-900/20", border: "border-emerald-200 dark:border-emerald-700/30", iconBg: "bg-emerald-100 dark:bg-emerald-800/40" }
            ].map((skill, index) => (
              <div
                key={index}
                className={`skill-item p-6 rounded-2xl ${skill.color} border ${skill.border} backdrop-blur-sm hover:translate-y-[-5px] transition-all duration-300`}
              >
                <div className={`w-12 h-12 rounded-xl ${skill.iconBg} flex items-center justify-center mb-4 text-2xl`}>
                  {skill.icon}
                </div>
                <h3 className="text-lg font-medium">{skill.name}</h3>
              </div>
            ))}
          </div>
          
          <div className="mt-16 flex justify-center">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/about">
                <Star className="mr-2 h-4 w-4" />
                {language === "en" ? "See All Skills" : "Tüm Becerileri Gör"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="projects-section section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-50/50 to-background dark:from-background dark:via-purple-950/5 dark:to-background -z-10"></div>
        <div className="container-custom">
          <SectionHeading
            title={getText("projects.title", language)}
            subtitle={language === "en"
              ? "Check out some of my recent work"
              : "Son çalışmalarımdan bazılarına göz atın"}
            className="mb-16"
          />
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className={`featured-project transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                <ProjectCard project={project} onClick={handleProjectClick} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="rounded-full group">
              <Link to="/projects">
                <span>{getText("projects.viewAll", language)}</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Blog Section */}
      <BlogSection />
      
      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary/10 dark:to-accent/10 -z-10"></div>
        <div className="container-custom max-w-4xl text-center relative z-10">
          <div className="p-10 md:p-16 rounded-3xl bg-white/80 dark:bg-background/80 backdrop-blur-sm border border-border/50 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {language === "en"
                ? "Ready to start your next project?"
                : "Bir sonraki projenize başlamaya hazır mısınız?"}
            </h2>
            <p className="text-lg mb-8 text-foreground/80 max-w-2xl mx-auto">
              {language === "en"
                ? "I'm currently available for freelance work. Let's build something amazing together!"
                : "Şu anda freelance çalışmalar için müsaitim. Birlikte harika bir şeyler inşa edelim!"}
            </p>
            <Button asChild variant="default" size="lg" className="rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <Link to="/contact">
                <Rocket className="mr-2 h-4 w-4" />
                {language === "en" ? "Get in Touch" : "İletişime Geç"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
