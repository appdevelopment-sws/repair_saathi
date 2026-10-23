"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { initGlobalScrollTriggers, ScrollTrigger } from "@/lib/gsap";
import GsapProgressBar from "./GsapProgressBar";
import MagicButtonEnhancer from "./MagicButtonEnhancer";

export default function GsapProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanupFn: (() => void) | null = null;
    const schedule =
      typeof window !== "undefined" && typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 200);

    const handle = schedule(() => {
      cleanupFn = initGlobalScrollTriggers(containerRef.current || undefined);
      ScrollTrigger.refresh();
    });

    return () => {
      if (typeof window !== "undefined" && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(handle);
      } else {
        clearTimeout(handle);
      }
      if (cleanupFn) cleanupFn();
    };
  }, [pathname]);

  return (
    <div ref={containerRef} className="gsap-page-root">
      <GsapProgressBar />
      <MagicButtonEnhancer />
      {children}
    </div>
  );
}
