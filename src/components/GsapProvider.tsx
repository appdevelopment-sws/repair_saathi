"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { initGlobalScrollTriggers, ScrollTrigger } from "@/lib/gsap";
import GsapProgressBar from "./GsapProgressBar";
export default function GsapProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const cleanup = initGlobalScrollTriggers(containerRef.current || undefined);
      ScrollTrigger.refresh();

      return () => {
        cleanup();
      };
    }, 120);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div ref={containerRef} className="gsap-page-root">
      <GsapProgressBar />
      {children}
    </div>
  );
}
