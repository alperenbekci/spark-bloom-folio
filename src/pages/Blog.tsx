
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import BlogPostCard, { BlogPost } from "@/components/BlogPostCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Layout as LayoutIcon } from "lucide-react";
import gsap from "gsap";
import { useStore } from "@/store/useStore";
import { getText } from "@/lib/i18n";
import FloatingShapes from "@/components/FloatingShapes";

// Sample blog post data
const blogPostsData: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Development in 2025",
    excerpt: "Exploring emerging technologies and trends that will shape the future of web development in the coming year.",
    date: "May 10, 2025",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    slug: "future-web-development-2025",
  },
  {
    id: "2",
    title: "Mastering UI Animation with GSAP",
    excerpt: "Learn how to create stunning animations that enhance user experience and bring your web applications to life.",
    date: "April 25, 2025",
    category: "Animation",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    slug: "mastering-ui-animation-gsap",
  },
  {
    id: "3",
    title: "Building Accessible Web Applications",
    excerpt: "Best practices for creating inclusive web experiences for all users, including those with disabilities.",
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
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  
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
          ease: "back.out(1.2)",
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
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-background to-blue-50/50 dark:from-background dark:to-blue-950/10">
        <FloatingShapes />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
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
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-10">
            <div className="flex flex-col sm:flex-row gap-4">
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
            
            {/* Layout Toggle */}
            <div className="flex gap-2">
              <Button
                variant={layout === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setLayout("grid")}
                className="rounded-full"
              >
                <LayoutIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={layout === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setLayout("list")}
                className="rounded-full"
              >
                <BookOpen className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Posts Grid or List */}
          {layout === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div key={post.id} className="blog-post-card">
                  <BlogPostCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <div key={post.id} className="blog-post-card flex flex-col sm:flex-row gap-6 bg-card hover:bg-card/80 border border-border/50 rounded-xl p-6 transition-colors">
                  <div className="sm:w-1/3 aspect-video rounded-lg overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="sm:w-2/3 flex flex-col">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-xl font-medium mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>
                    <Button asChild variant="ghost" className="self-start">
                      <Link to={`/blog/${post.slug}`}>
                        {language === "en" ? "Read More" : "Devamını Oku"}
                        <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
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
              <Button variant="outline" className="rounded-full">
                {language === "en" ? "Load More" : "Daha Fazla Yükle"}
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
