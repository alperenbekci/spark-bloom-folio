
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import BlogPostCard, { BlogPost } from "@/components/BlogPostCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import gsap from "gsap";
import { useStore } from "@/store/useStore";
import { getText } from "@/lib/i18n";
import FloatingShapes from "@/components/FloatingShapes";

// Sample blog post data
const blogPostsData: BlogPost[] = [
  {
    id: "1",
    title: "How to Build a Real-time Chat App with Socket.IO and React",
    excerpt: "Learn how to create a full-featured real-time chat application using Socket.IO, React, and Express.",
    date: "May 3, 2025",
    category: "Tutorial",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    slug: "real-time-chat-app",
  },
  {
    id: "2",
    title: "Understanding TypeScript Generics: A Beginner's Guide",
    excerpt: "TypeScript generics can be confusing at first. This guide breaks down the concept with practical examples.",
    date: "April 28, 2025",
    category: "TypeScript",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    slug: "typescript-generics-guide",
  },
  {
    id: "3",
    title: "Building Accessible Web Applications: Best Practices",
    excerpt: "Learn how to ensure your web applications are accessible to all users, including those with disabilities.",
    date: "April 15, 2025",
    category: "Accessibility",
    image: "https://images.unsplash.com/photo-1573496005828-adb7680bad53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    slug: "accessible-web-applications",
  },
  {
    id: "4",
    title: "Redux vs. Context API: When to Use Each",
    excerpt: "A comparison of two popular state management solutions for React applications and guidelines on when to use each one.",
    date: "April 5, 2025",
    category: "React",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    slug: "redux-vs-context-api",
  },
  {
    id: "5",
    title: "Introduction to Serverless Architecture",
    excerpt: "Discover the benefits and challenges of serverless architecture and how to get started with AWS Lambda.",
    date: "March 22, 2025",
    category: "Cloud",
    image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    slug: "serverless-architecture-intro",
  },
  {
    id: "6",
    title: "Optimizing React Performance: Advanced Techniques",
    excerpt: "Deep dive into strategies for optimizing the performance of React applications, from code splitting to memoization.",
    date: "March 10, 2025",
    category: "Performance",
    image: "https://images.unsplash.com/photo-1485856407642-7f9ba0268b51?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    slug: "react-performance-optimization",
  },
];

export default function Blog() {
  const { language } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPostsData);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Handle search and category filtering
  useEffect(() => {
    let filtered = blogPostsData;
    
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }
    
    setFilteredPosts(filtered);
    
    // Animate posts on filter change
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-post-card",
        { y: 30, opacity: 0 },
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
  }, [searchTerm, selectedCategory]);
  
  // Get unique categories
  const categories = Array.from(new Set(blogPostsData.map((post) => post.category)));
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20">
        <FloatingShapes />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {getText("blog.title", language)}
            </h1>
            <p className="text-xl text-foreground/80">
              {getText("blog.subtitle", language)}
            </p>
          </div>
        </div>
      </section>
      
      {/* Blog Posts Section */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60 h-4 w-4" />
              <Input
                type="text"
                placeholder={language === "en" ? "Search posts..." : "Yazıları ara..."}
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setSelectedCategory(null)}
              >
                {language === "en" ? "All" : "Tümü"}
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="blog-post-card">
                <BlogPostCard post={post} />
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl mb-2">
                {language === "en" ? "No posts found" : "Yazı bulunamadı"}
              </h3>
              <p className="text-foreground/70">
                {language === "en"
                  ? "Try a different search term or category."
                  : "Farklı bir arama terimi veya kategori deneyin."}
              </p>
            </div>
          )}
          
          {/* Load More (would be connected to pagination in a real app) */}
          {filteredPosts.length > 0 && filteredPosts.length < blogPostsData.length && (
            <div className="mt-10 text-center">
              <Button variant="outline">
                {language === "en" ? "Load More" : "Daha Fazla Yükle"}
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
