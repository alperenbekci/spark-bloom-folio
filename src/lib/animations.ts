
import gsap from "gsap";

interface AnimateElementsOptions {
  selector: string;
  stagger?: number;
  duration?: number;
  y?: number;
  opacity?: number;
  delay?: number;
  ease?: string;
}

// Animate elements on page load or on scroll
export function animateElements({
  selector,
  stagger = 0.1,
  duration = 0.8,
  y = 20,
  opacity = 0,
  delay = 0,
  ease = "power2.out",
}: AnimateElementsOptions): gsap.core.Timeline {
  const elements = document.querySelectorAll(selector);
  
  const tl = gsap.timeline({ delay });
  
  if (elements.length) {
    tl.fromTo(
      elements,
      { y, opacity },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease,
      }
    );
  }
  
  return tl;
}

// Hero section animation
export function animateHero(containerSelector: string): void {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  
  tl.fromTo(
    `${containerSelector} h1`,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1 }
  )
    .fromTo(
      `${containerSelector} p`,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    )
    .fromTo(
      `${containerSelector} .cta-button`,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.4"
    )
    .fromTo(
      `${containerSelector} .decoration`,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, stagger: 0.1 },
      "-=0.8"
    );
}

// Animated scroll sections
export function initScrollAnimations(): void {
  const sections = document.querySelectorAll(".scroll-animate");
  
  sections.forEach((section) => {
    gsap.fromTo(
      section,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );
  });
}

// Mouse follower animation
export function initMouseFollower(element: HTMLElement): () => void {
  const follower = document.createElement("div");
  follower.className = 
    "fixed w-8 h-8 bg-primary/20 rounded-full pointer-events-none z-50 blur-sm";
  document.body.appendChild(follower);
  
  const onMouseMove = (e: MouseEvent) => {
    gsap.to(follower, {
      x: e.clientX - 16,
      y: e.clientY - 16,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  
  window.addEventListener("mousemove", onMouseMove);
  
  // Return cleanup function
  return () => {
    window.removeEventListener("mousemove", onMouseMove);
    document.body.removeChild(follower);
  };
}
