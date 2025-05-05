
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface FloatingShape {
  id: number;
  color: string;
  size: string;
  position: string;
  animation: string;
}

interface FloatingShapesProps {
  shapes?: FloatingShape[];
}

const defaultShapes: FloatingShape[] = [
  {
    id: 1,
    color: "bg-blue-light",
    size: "w-16 h-16 md:w-24 md:h-24",
    position: "top-[20%] left-[10%]",
    animation: "animate-float",
  },
  {
    id: 2,
    color: "bg-pink-light",
    size: "w-12 h-12 md:w-20 md:h-20",
    position: "top-[60%] right-[15%]",
    animation: "animate-float animation-delay-2000",
  },
  {
    id: 3,
    color: "bg-green-light",
    size: "w-8 h-8 md:w-16 md:h-16",
    position: "bottom-[15%] left-[30%]",
    animation: "animate-float animation-delay-1000",
  },
  {
    id: 4,
    color: "bg-orange-light",
    size: "w-10 h-10 md:w-14 md:h-14",
    position: "top-[30%] right-[30%]",
    animation: "animate-float animation-delay-3000",
  },
];

export default function FloatingShapes({ shapes = defaultShapes }: FloatingShapesProps) {
  const shapesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each shape
      shapes.forEach((_shape, index) => {
        const shape = document.querySelector(`.shape-${index}`) as HTMLElement;
        if (!shape) return;
        
        gsap.to(shape, {
          y: "random(-30, 30)",
          x: "random(-20, 20)",
          rotation: "random(-15, 15)",
          duration: "random(4, 8)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.5
        });
      });
    }, shapesRef);
    
    return () => ctx.revert();
  }, [shapes]);
  
  return (
    <div ref={shapesRef} className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
      {shapes.map((shape, index) => (
        <div
          key={shape.id}
          className={`shape-${index} rounded-full opacity-70 blur-sm absolute ${shape.color} ${shape.size} ${shape.position}`}
        />
      ))}
      
      {/* Background blurs */}
      <div className="fancy-blur-1 w-[300px] h-[300px] md:w-[600px] md:h-[600px] left-[-100px] top-[15%]"></div>
      <div className="fancy-blur-2 w-[250px] h-[250px] md:w-[500px] md:h-[500px] right-[-100px] bottom-[10%]"></div>
      <div className="fancy-blur-3 w-[200px] h-[200px] md:w-[400px] md:h-[400px] right-[20%] top-[5%]"></div>
    </div>
  );
}
