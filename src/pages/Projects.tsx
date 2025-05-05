
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard, { Project } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import FloatingShapes from "@/components/FloatingShapes";
import gsap from "gsap";
import { useStore } from "@/store/useStore";
import { getText } from "@/lib/i18n";

// Sample project data
const projectsData: Project[] = [
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
  {
    id: "4",
    title: "Personal Finance Tracker",
    description: "A web application for tracking personal finances, with budgeting tools, expense categorization, and visualization.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80",
    tags: ["Vue.js", "Express", "PostgreSQL", "Chart.js"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/example/repo",
  },
  {
    id: "5",
    title: "Real-time Chat Application",
    description: "A real-time chat application with private messaging, group chats, and file sharing capabilities.",
    image: "https://images.unsplash.com/photo-1557682250-61b3df427d45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1429&q=80",
    tags: ["React", "Socket.IO", "Express", "MongoDB"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/example/repo",
  },
  {
    id: "6",
    title: "Task Management System",
    description: "A collaborative task management system for teams with kanban boards, task assignments, and progress tracking.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    tags: ["React", "Redux", "Node.js", "MongoDB"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/example/repo",
  },
];

// Extended project details for modal
const projectDetails: Record<string, { challenge: string; solution: string; impact: string }> = {
  "1": {
    challenge: "Creating a scalable e-commerce platform with real-time inventory updates and secure payment processing.",
    solution: "Implemented a microservices architecture with separate services for product management, user authentication, inventory, and payments. Used WebSockets for real-time inventory updates and integrated Stripe for secure payments.",
    impact: "The platform handles thousands of transactions daily with 99.9% uptime and has reduced cart abandonment by 25% due to improved user experience.",
  },
  "2": {
    challenge: "Processing and visualizing complex data in a way that non-technical users can understand and make decisions from.",
    solution: "Developed an AI-driven system that analyzes data trends and presents insights in an intuitive dashboard. Used TensorFlow for predictive analytics and Chart.js for visualization.",
    impact: "Helped clients reduce decision-making time by 40% and improve accuracy of business forecasts by 30%.",
  },
  "3": {
    challenge: "Building a performant cross-platform mobile app that works smoothly on both iOS and Android.",
    solution: "Used React Native with Expo for rapid development and Firebase for backend services. Implemented optimized rendering techniques to ensure smooth performance even on older devices.",
    impact: "The app achieved a 4.8/5 star rating on both App Store and Google Play, with over 100,000 downloads in the first month.",
  },
  "4": {
    challenge: "Creating an intuitive interface for tracking finances while ensuring data privacy and security.",
    solution: "Implemented end-to-end encryption for sensitive financial data and used Vue.js with Vuex for a responsive, state-driven UI. Added interactive charts for visualizing spending patterns.",
    impact: "Users reported an average 20% increase in savings after using the app for 3 months due to better financial awareness.",
  },
  "5": {
    challenge: "Handling real-time communication at scale while ensuring messages are delivered reliably and quickly.",
    solution: "Used Socket.IO for real-time communication with a fallback mechanism for poor network conditions. Implemented message queuing to handle offline scenarios.",
    impact: "The system handles over 1 million messages per day with an average delivery time of less than 100ms.",
  },
  "6": {
    challenge: "Building a flexible task management system that adapts to different team workflows and methodologies.",
    solution: "Created a customizable kanban system where teams can define their own workflows. Implemented real-time collaboration features and automated notifications.",
    impact: "Teams using the system reported a 35% increase in productivity and 28% reduction in missed deadlines.",
  },
};

export default function Projects() {
  const { language } = useStore();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projectsData);
  
  useEffect(() => {
    // Filter projects based on selected tag
    if (selectedFilter === "all") {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(
        projectsData.filter((project) =>
          project.tags.some((tag) => tag.toLowerCase() === selectedFilter.toLowerCase())
        )
      );
    }
    
    // Animate projects on load and filter change
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    });
    
    return () => ctx.revert();
  }, [selectedFilter]);
  
  // Get unique tags from all projects
  const allTags = Array.from(
    new Set(projectsData.flatMap((project) => project.tags.map((tag) => tag.toLowerCase())))
  );
  
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20">
        <FloatingShapes />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {getText("projects.title", language)}
            </h1>
            <p className="text-xl text-foreground/80">
              {getText("projects.subtitle", language)}
            </p>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            <Button
              variant={selectedFilter === "all" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setSelectedFilter("all")}
            >
              {language === "en" ? "All Projects" : "Tüm Projeler"}
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedFilter === tag ? "default" : "outline"}
                className="rounded-full capitalize"
                onClick={() => setSelectedFilter(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-card">
                <ProjectCard project={project} onClick={handleProjectClick} />
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl mb-2">
                {language === "en" ? "No projects found" : "Proje bulunamadı"}
              </h3>
              <p className="text-foreground/70">
                {language === "en"
                  ? "No projects match the selected filter. Try another one!"
                  : "Seçilen filtreyle eşleşen proje yok. Başka bir tane deneyin!"}
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl mb-2">{selectedProject.title}</DialogTitle>
              <DialogDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Project Image */}
              <div className="overflow-hidden rounded-lg">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Project Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    {language === "en" ? "Description" : "Açıklama"}
                  </h3>
                  <p className="text-foreground/80">{selectedProject.description}</p>
                </div>
                
                {projectDetails[selectedProject.id] && (
                  <>
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        {language === "en" ? "Challenge" : "Zorluk"}
                      </h3>
                      <p className="text-foreground/80">
                        {projectDetails[selectedProject.id].challenge}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        {language === "en" ? "Solution" : "Çözüm"}
                      </h3>
                      <p className="text-foreground/80">
                        {projectDetails[selectedProject.id].solution}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        {language === "en" ? "Impact" : "Etki"}
                      </h3>
                      <p className="text-foreground/80">
                        {projectDetails[selectedProject.id].impact}
                      </p>
                    </div>
                  </>
                )}
                
                {/* Links */}
                <div className="flex gap-4 pt-4">
                  {selectedProject.demoUrl && (
                    <Button
                      onClick={() => window.open(selectedProject.demoUrl, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {language === "en" ? "Live Demo" : "Canlı Demo"}
                    </Button>
                  )}
                  {selectedProject.repoUrl && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(selectedProject.repoUrl, "_blank")}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      {language === "en" ? "Source Code" : "Kaynak Kod"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </Layout>
  );
}
