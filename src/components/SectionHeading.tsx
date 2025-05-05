
import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  center = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-4 mb-12 relative", center && "text-center", className)}>
      {center && (
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-24 h-1.5 bg-gradient-to-r from-blue-300 via-primary to-purple-300 rounded-full blur-sm" />
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent pb-1">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
