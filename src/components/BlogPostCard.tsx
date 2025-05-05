
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { getText } from "@/lib/i18n";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  slug: string;
}

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const { language } = useStore();
  
  return (
    <Card className="overflow-hidden border border-border hover-card h-full flex flex-col">
      <div className="relative overflow-hidden aspect-video">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="outline">{post.category}</Badge>
          <div className="flex items-center text-sm text-foreground/60">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>{post.date}</span>
          </div>
        </div>
        <h3 className="text-xl font-medium mb-2">{post.title}</h3>
        <p className="text-sm text-foreground/70 mb-4 flex-grow">
          {post.excerpt}
        </p>
        <Link to={`/blog/${post.slug}`} className="mt-auto">
          <Button variant="ghost">
            {getText("blog.readMore", language)}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
