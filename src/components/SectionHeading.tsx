
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
    <div className={cn("space-y-4 mb-12", center && "text-center", className)}>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-foreground/70 max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
