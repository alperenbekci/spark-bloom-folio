
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

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

// Hero section animation with enhanced effects
export function animateHero(containerSelector: string): void {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  
  // More artistic animation sequence
  tl.fromTo(
    `${containerSelector} h1`,
    { y: 50, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 1 }
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
      { scale: 0.8, opacity: 0, rotation: -5 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1.2, stagger: 0.1 },
      "-=0.8"
    );
    
  // Add scroll-triggered animations if scroll triggers exist
  const scrollElements = container.querySelectorAll(".scroll-trigger");
  if (scrollElements.length) {
    gsap.utils.toArray(".scroll-trigger").forEach((element: HTMLElement) => {
      gsap.fromTo(
        element,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }
}

// Enhanced parallax effect for images and backgrounds
export function createParallaxEffect(selector: string, strength = 0.2): void {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    gsap.to(element, {
      yPercent: -strength * 100,
      ease: "none",
      scrollTrigger: {
        trigger: element.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  });
}

// Animated scroll sections with enhanced effects
export function initScrollAnimations(): void {
  const sections = document.querySelectorAll(".scroll-animate");
  
  sections.forEach((section, index) => {
    const isEven = index % 2 === 0;
    
    gsap.fromTo(
      section,
      {
        y: 40,
        opacity: 0,
        x: isEven ? -20 : 20,
      },
      {
        y: 0,
        x: 0,
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

// Staggered animation for grid items
export function animateGrid(selector: string): void {
  const items = document.querySelectorAll(selector);
  
  gsap.fromTo(
    items,
    {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: {
        amount: 0.8,
        grid: "auto",
        from: "center",
      },
      ease: "power3.out",
      scrollTrigger: {
        trigger: items[0]?.parentElement,
        start: "top 85%",
      }
    }
  );
}

// Create a text reveal animation
export function createTextReveal(selector: string): void {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach((element) => {
    gsap.fromTo(
      element,
      {
        backgroundSize: "0% 100%",
        backgroundPosition: "0% 100%",
      },
      {
        backgroundSize: "100% 100%",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
        },
      }
    );
  });
}

// Mouse follower animation with enhanced effects
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

// Create a magnetic effect for buttons
export function createMagneticEffect(elements: NodeListOf<Element>): void {
  elements.forEach((el) => {
    el.addEventListener("mousemove", (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      gsap.to(target, {
        x: (x - rect.width / 2) / rect.width * 15,
        y: (y - rect.height / 2) / rect.height * 15,
        duration: 0.3,
        ease: "power2.out",
      });
    });
    
    el.addEventListener("mouseleave", (e) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    });
  });
}
