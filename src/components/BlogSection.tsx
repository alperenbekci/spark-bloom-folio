
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { useStore } from "@/store/useStore";
import { getText } from "@/lib/i18n";
import gsap from "gsap";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Development in 2025",
    excerpt: "Exploring emerging technologies and trends shaping the future of web development",
    date: "May 10, 2025",
    readTime: "5 min",
    category: "Web Development",
    slug: "future-web-development-2025",
  },
  {
    id: "2",
    title: "Mastering UI Animation with GSAP",
    excerpt: "Learn how to create stunning animations that enhance user experience",
    date: "April 25, 2025",
    readTime: "7 min",
    category: "Animation",
    slug: "mastering-ui-animation-gsap",
  },
  {
    id: "3",
    title: "Building Accessible Web Applications",
    excerpt: "Best practices for creating inclusive web experiences for all users",
    date: "April 12, 2025",
    readTime: "6 min",
    category: "Accessibility",
    slug: "building-accessible-web-applications",
  },
];

export default function BlogSection() {
  const { language } = useStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-card", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".blog-section",
          start: "top 80%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="blog-section section-padding bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
      <div className="container-custom">
        <SectionHeading
          title={getText("blog.title", language)}
          subtitle={getText("blog.subtitle", language)}
          center
          className="mb-16"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="blog-card group hover:shadow-lg transition-all duration-300 border border-border/50 bg-white dark:bg-background overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {post.date}
                    </span>
                    
                    <Button variant="ghost" size="sm" asChild className="gap-1">
                      <Link to={`/blog/${post.slug}`}>
                        <span>{language === "en" ? "Read" : "Oku"}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/blog">
              <BookOpen className="h-4 w-4 mr-2" />
              {language === "en" ? "View All Posts" : "Tüm Yazıları Görüntüle"}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
