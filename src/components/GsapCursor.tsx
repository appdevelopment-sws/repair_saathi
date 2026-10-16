"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function GsapCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Fast tracking for the central dot
    const dotXTo = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dotYTo = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });

    // Smooth momentum trailing for the soft glowing ambient ring
    const ringXTo = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringYTo = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
        isVisible = true;
      }
      dotXTo(e.clientX);
      dotYTo(e.clientY);
      ringXTo(e.clientX);
      ringYTo(e.clientY);
    };

    const handleMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.4 });
      isVisible = false;
    };

    // Magnetic interaction state when hovering buttons, links & interactive cards
    const handleElementEnter = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        'button, a, .category-item-card, .yoga-highlight-card, [data-gsap="tilt"], [data-gsap="magnetic"]'
      );
      if (target) {
        gsap.to(ring, {
          scale: 1.9,
          backgroundColor: "rgba(251, 188, 52, 0.14)",
          borderColor: "rgba(251, 188, 52, 0.65)",
          duration: 0.3,
          ease: "back.out(2)",
        });
        gsap.to(dot, {
          scale: 1.4,
          backgroundColor: "#f59e0b",
          duration: 0.2,
        });
      }
    };

    const handleElementLeave = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        'button, a, .category-item-card, .yoga-highlight-card, [data-gsap="tilt"], [data-gsap="magnetic"]'
      );
      if (target) {
        gsap.to(ring, {
          scale: 1,
          backgroundColor: "rgba(251, 188, 52, 0.05)",
          borderColor: "rgba(251, 188, 52, 0.3)",
          duration: 0.35,
          ease: "power2.out",
        });
        gsap.to(dot, {
          scale: 1,
          backgroundColor: "#fbbc34",
          duration: 0.2,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleElementEnter, { passive: true });
    document.addEventListener("mouseout", handleElementLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleElementEnter);
      document.removeEventListener("mouseout", handleElementLeave);
    };
  }, []);

  return (
    <>
      {/* Central Sharp Dot */}
      <div
        ref={cursorDotRef}
        className="gsap-cursor-dot"
        style={{
          position: "fixed",
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#fbbc34",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: 0,
          boxShadow: "0 0 10px rgba(251, 188, 52, 0.8)",
          willChange: "transform",
        }}
      />

      {/* Trailing Soft Ambient Glow Ring */}
      <div
        ref={cursorRingRef}
        className="gsap-cursor-ring"
        style={{
          position: "fixed",
          top: -20,
          left: -20,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid rgba(251, 188, 52, 0.35)",
          backgroundColor: "rgba(251, 188, 52, 0.05)",
          backdropFilter: "blur(0.5px)",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: 0,
          boxShadow: "0 0 20px rgba(251, 188, 52, 0.2)",
          willChange: "transform",
        }}
      />
    </>
  );
}
