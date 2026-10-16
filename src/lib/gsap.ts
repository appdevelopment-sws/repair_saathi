"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Safely register ScrollTrigger on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Sensible default settings for ultra-smooth performance
  gsap.defaults({
    ease: "power3.out",
    duration: 0.8,
  });
}

export { gsap, ScrollTrigger };

/**
 * Apply a magnetic cursor pull effect to buttons & icons (Apple / Linear style)
 */
export function applyMagnetic(
  element: HTMLElement | null,
  strength: number = 0.35
): () => void {
  if (!element || typeof window === "undefined") return () => {};

  const xTo = gsap.quickTo(element, "x", { duration: 0.4, ease: "power3.out" });
  const yTo = gsap.quickTo(element, "y", { duration: 0.4, ease: "power3.out" });

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    xTo(distanceX * strength);
    yTo(distanceY * strength);
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1.1, 0.4)",
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
}

/**
 * Apply 3D Perspective Tilt on interactive cards
 */
export function apply3DTilt(
  element: HTMLElement | null,
  maxTilt: number = 10
): () => void {
  if (!element || typeof window === "undefined") return () => {};

  gsap.set(element, { transformPerspective: 1000, transformStyle: "preserve-3d" });

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    gsap.to(element, {
      rotateX,
      rotateY,
      scale: 1.025,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
}

/**
 * Infinite smooth floating physics (for trust badges, icons, decorative SVGs)
 */
export function applyFloating(
  element: HTMLElement | null,
  yOffset: number = 8,
  duration: number = 3.5,
  rotation: number = 2
): gsap.core.Tween | null {
  if (!element || typeof window === "undefined") return null;

  return gsap.to(element, {
    y: `+=${yOffset}`,
    rotation: `+=${rotation}`,
    duration,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
}

/**
 * Global ScrollTrigger scanner that activates professional scroll entrance animations
 */
export function initGlobalScrollTriggers(scope?: HTMLElement): () => void {
  if (typeof window === "undefined") return () => {};

  const ctx = gsap.context(() => {
    // 1. Generic fade-up elements
    const fadeUpElements = gsap.utils.toArray<HTMLElement>('[data-gsap="fade-up"]');
    fadeUpElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });

    // 2. Staggered card containers
    const staggerContainers = gsap.utils.toArray<HTMLElement>('[data-gsap="stagger-cards"]');
    staggerContainers.forEach((container) => {
      const cards = container.children;
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }
    });

    // 3. Cinematic image reveal (smooth scale & unclip)
    const revealImages = gsap.utils.toArray<HTMLElement>('[data-gsap="image-reveal"]');
    revealImages.forEach((imgWrap) => {
      gsap.fromTo(
        imgWrap,
        {
          opacity: 0,
          scale: 0.92,
          clipPath: "inset(12% 12% 12% 12% round 16px)",
        },
        {
          opacity: 1,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0% round 16px)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imgWrap,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });

    // 4. Slide-in from Left / Right
    const slideLeft = gsap.utils.toArray<HTMLElement>('[data-gsap="slide-left"]');
    slideLeft.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    const slideRight = gsap.utils.toArray<HTMLElement>('[data-gsap="slide-right"]');
    slideRight.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    // 5. Section Heading Wave Underline reveal
    const headings = gsap.utils.toArray<HTMLElement>(".content-block-heading, .categories-title");
    headings.forEach((heading) => {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 88%",
            once: true,
          },
        }
      );
    });

    // 6. Interactive 3D tilt on all cards with data-gsap="tilt"
    const tiltCards = gsap.utils.toArray<HTMLElement>('[data-gsap="tilt"], .yoga-highlight-card, .category-card-modern, .content-block-card');
    const cleanups: (() => void)[] = [];
    tiltCards.forEach((card) => {
      const cleanup = apply3DTilt(card, 6);
      cleanups.push(cleanup);
    });

    // 7. Magnetic buttons with data-gsap="magnetic"
    const magneticBtns = gsap.utils.toArray<HTMLElement>('[data-gsap="magnetic"], .yoga-btn-primary, .btn-book-service');
    magneticBtns.forEach((btn) => {
      const cleanup = applyMagnetic(btn, 0.25);
      cleanups.push(cleanup);
    });
  }, scope);

  return () => {
    ctx.revert();
  };
}
