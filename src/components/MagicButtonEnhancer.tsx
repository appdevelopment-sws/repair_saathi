"use client";

import { useEffect } from "react";

/**
 * MagicButtonEnhancer
 * Lightweight, zero-overhead global enhancer that:
 * 1. Tracks mouse coordinates on buttons to render dynamic radial glass spotlights (--magic-x, --magic-y).
 * 2. Spawns an ethereal radiant click ripple wave (.magic-ripple-wave) from the exact click point.
 */
export default function MagicButtonEnhancer() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const buttonSelector =
      'button, .btn, [class*="btn-"], [class*="-btn"], [class*="-cta"], a[role="button"]';

    // 1. Mousemove listener for dynamic interactive spotlight
    const handleMouseMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(buttonSelector) as HTMLElement | null;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      target.style.setProperty("--magic-x", `${x}px`);
      target.style.setProperty("--magic-y", `${y}px`);
    };

    // 2. Click listener for glowing shockwave ripple
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(buttonSelector) as HTMLElement | null;
      if (!target || target.hasAttribute("disabled") || target.getAttribute("aria-disabled") === "true") {
        return;
      }

      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.className = "magic-ripple-wave";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      // Set custom ripple tint if it's whatsapp button
      if (
        target.classList.contains("yoga-btn-whatsapp") ||
        target.classList.contains("whatsapp-float-btn") ||
        target.classList.contains("btn-wa-header")
      ) {
        ripple.style.background =
          "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(37, 211, 102, 0.5) 50%, transparent 80%)";
      }

      target.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("click", handleClick, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
