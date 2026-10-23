"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function GsapProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current || typeof window === "undefined" || window.innerWidth < 768) return;

    const progressTween = gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.25,
      },
    });

    return () => {
      progressTween.scrollTrigger?.kill();
      progressTween.kill();
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "3.5px",
        zIndex: 9999,
        pointerEvents: "none",
        backgroundColor: "rgba(15, 23, 42, 0.05)",
      }}
    >
      <div
        ref={barRef}
        style={{
          width: "100%",
          height: "100%",
          transformOrigin: "left center",
          transform: "scaleX(0)",
          background: "linear-gradient(90deg, #f59e0b 0%, #fbbc34 50%, #10b981 100%)",
          boxShadow: "0 0 12px rgba(251, 188, 52, 0.75)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
