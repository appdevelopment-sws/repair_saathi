"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { CategoryDto, DEFAULT_CATEGORIES } from "@/app/api/categories/route";
import { gsap, apply3DTilt, applyMagnetic } from "@/lib/gsap";

interface FeaturedCategoriesProps {
  onOpenBooking?: (category: CategoryDto) => void;
  onLoadedCategories?: (categories: CategoryDto[]) => void;
}

// High-fidelity custom SVGs meticulously matching Screenshot 1 with micro-mechanic physics
function AcIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="category-svg">
      {/* AC Unit Body */}
      <rect x="8" y="14" width="48" height="22" rx="4" fill="#A7F3D0" stroke="#0F172A" strokeWidth="2.5" />
      {/* Front bottom air vent slat */}
      <line x1="14" y1="30" x2="50" y2="30" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" className="ac-vent-slat" />
      {/* Status indicator display */}
      <rect x="42" y="18" width="8" height="4" rx="1.5" fill="#065F46" className="ac-status-led" />
      {/* Cooling airflow breeze lines with stagger wave animations */}
      <path d="M20 40 C20 46, 17 50, 16 56" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" className="ac-breeze-line ac-breeze-1" />
      <path d="M32 40 C32 47, 32 50, 32 58" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" className="ac-breeze-line ac-breeze-2" />
      <path d="M44 40 C44 46, 47 50, 48 56" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" className="ac-breeze-line ac-breeze-3" />
    </svg>
  );
}

function FridgeIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="category-svg">
      {/* Vibrant Orange Circle Badge */}
      <circle cx="32" cy="32" r="26" fill="#F97316" />
      {/* Fridge Box Outline */}
      <rect x="20" y="14" width="24" height="36" rx="3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.2" />
      {/* Split Freezer & Fridge divider */}
      <line x1="20" y1="27" x2="44" y2="27" stroke="#0F172A" strokeWidth="2.2" />
      {/* Blue shelves inside freezer / fridge window */}
      <rect x="23" y="17" width="8" height="7" rx="1" fill="#93C5FD" className="fridge-shelf fridge-shelf-1" />
      <rect x="23" y="30" width="8" height="8" rx="1" fill="#93C5FD" className="fridge-shelf fridge-shelf-2" />
      <rect x="23" y="40" width="8" height="6" rx="1" fill="#93C5FD" className="fridge-shelf fridge-shelf-3" />
      {/* Handles on the right edge */}
      <line x1="41" y1="18" x2="41" y2="24" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" className="fridge-handle" />
      <line x1="41" y1="31" x2="41" y2="43" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" className="fridge-handle" />
    </svg>
  );
}

function WashingMachineIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="category-svg">
      {/* Deep Blue Circle Badge */}
      <circle cx="32" cy="32" r="26" fill="#2563EB" />
      {/* Washing machine white body */}
      <rect x="20" y="14" width="24" height="36" rx="3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.2" />
      {/* Control panel buttons & dispenser */}
      <rect x="23" y="17" width="6" height="3.5" rx="1" fill="#CBD5E1" />
      <circle cx="38" cy="19" r="1.5" fill="#0F172A" />
      <circle cx="33" cy="19" r="1.5" fill="#0F172A" />
      {/* Large circular front-load window with rotating drum mechanic */}
      <g className="washing-drum-group" style={{ transformOrigin: "32px 35px" }}>
        <circle cx="32" cy="35" r="9" fill="#60A5FA" stroke="#0F172A" strokeWidth="2.2" />
        {/* Inner water bubbles & drum ribs */}
        <circle cx="30" cy="33" r="3" fill="#EFF6FF" />
        <circle cx="34" cy="37" r="1.8" fill="#DBEAFE" />
        <path d="M28 35 A4 4 0 0 1 35 32" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
      </g>
    </svg>
  );
}

function WaterPurifierIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="category-svg">
      {/* Main vibrant blue water drop */}
      <g className="water-drop-primary" style={{ transformOrigin: "27px 39px" }}>
        <path
          d="M26 14 C26 14, 14 30, 14 39 C14 46 20 51 27 51 C34 51 40 46 40 39 C40 30 26 14 26 14 Z"
          fill="#0284C7"
        />
        {/* Blue drop light reflection */}
        <path
          d="M21 34 C19 37, 19 42, 22 45"
          stroke="#BAE6FD"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>
      {/* Overlapping warm red/coral drop */}
      <g className="water-drop-warm" style={{ transformOrigin: "42px 40px" }}>
        <path
          d="M40 20 C40 20, 31 32, 31 40 C31 46 36 50 42 50 C48 50 53 46 53 40 C53 32 40 20 40 20 Z"
          fill="#EF4444"
        />
        <path
          d="M37 36 C35 39, 36 43, 38 45"
          stroke="#FECACA"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>
      {/* Water ripple base lines */}
      <path d="M12 55 C18 53, 24 57, 30 55 C36 53, 44 57, 52 55" stroke="#0284C7" strokeWidth="2.2" strokeLinecap="round" className="water-ripple-wave" />
    </svg>
  );
}

function GeyserIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="category-svg">
      {/* Warm Golden Yellow Geyser Tank */}
      <rect x="20" y="12" width="24" height="34" rx="8" fill="#FDE047" stroke="#0F172A" strokeWidth="2.5" />
      {/* Top cap line */}
      <path d="M22 17 C28 15, 36 15, 42 17" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />
      {/* Round temperature indicator dial with swinging gauge needle */}
      <g className="geyser-dial-group" style={{ transformOrigin: "32px 27px" }}>
        <circle cx="32" cy="27" r="5" fill="#38BDF8" stroke="#0F172A" strokeWidth="2" />
        <line x1="32" y1="27" x2="35" y2="24" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" className="geyser-gauge-needle" />
      </g>
      {/* Heating indicator LED */}
      <circle cx="32" cy="38" r="1.8" fill="#EF4444" className="geyser-led-pulse" />
      {/* Inlet & Outlet curved water pipes */}
      <path d="M26 46 L26 53 C26 56, 21 56, 20 52" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M38 46 L38 53 C38 56, 43 56, 44 52" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function MicrowaveIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="category-svg">
      {/* Microwave Box */}
      <rect x="10" y="16" width="44" height="32" rx="4" fill="#F1F5F9" stroke="#0F172A" strokeWidth="2.5" />
      {/* Glass Door window with warm microwave glow */}
      <rect x="15" y="21" width="24" height="22" rx="2" fill="#334155" stroke="#0F172A" strokeWidth="1.8" className="microwave-window-glass" />
      {/* Door handle */}
      <line x1="41" y1="22" x2="41" y2="42" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Keypad & buttons */}
      <rect x="44" y="22" width="6" height="4" rx="1" fill="#0284C7" className="microwave-display-screen" />
      <circle cx="47" cy="30" r="1.5" fill="#0F172A" />
      <circle cx="47" cy="35" r="1.5" fill="#0F172A" />
      <circle cx="47" cy="40" r="1.5" fill="#0F172A" />
    </svg>
  );
}

function ChimneyIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="category-svg">
      {/* Vertical Duct Chimney Pipe */}
      <rect x="24" y="12" width="16" height="18" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2.2" />
      {/* Slanted Hood Canopy */}
      <path d="M12 44 L20 30 L44 30 L52 44 Z" fill="#94A3B8" stroke="#0F172A" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Bottom Baffle Filter Bar */}
      <rect x="12" y="44" width="40" height="5" rx="1.5" fill="#334155" stroke="#0F172A" strokeWidth="2" />
      {/* Air suction vents with animated suction breeze */}
      <line x1="20" y1="46.5" x2="26" y2="46.5" stroke="#F8FAFC" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="38" y1="46.5" x2="44" y2="46.5" stroke="#F8FAFC" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 50 C32 46, 32 44, 32 38" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2 2" className="chimney-draft-line" />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="category-svg">
      {/* Laptop Screen Body */}
      <rect x="14" y="16" width="36" height="24" rx="3" fill="#38BDF8" stroke="#0F172A" strokeWidth="2.5" />
      {/* Screen Display inside */}
      <rect x="18" y="20" width="28" height="16" rx="1" fill="#0F172A" />
      {/* Code / repair pulse on screen */}
      <path d="M24 28 L27 26 L29 30 L32 28" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="laptop-ecg-pulse" />
      {/* Keyboard Base */}
      <path d="M8 44 L12 40 L52 40 L56 44 L8 44 Z" fill="#CBD5E1" stroke="#0F172A" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Trackpad notch */}
      <line x1="28" y1="44" x2="36" y2="44" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DecoratorIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="category-svg">
      {/* Paint Roller / Home Interior */}
      <rect x="16" y="16" width="28" height="12" rx="3" fill="#F43F5E" stroke="#0F172A" strokeWidth="2.5" className="paint-roller-cylinder" />
      <path d="M44 22 L50 22 L50 34 L34 34 L34 40" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="31" y="40" width="6" height="14" rx="2" fill="#F59E0B" stroke="#0F172A" strokeWidth="2.2" />
      {/* Sparkles */}
      <path d="M14 36 L16 33 L18 36 L16 39 Z" fill="#FBBF24" className="roller-sparkle sparkle-1" />
      <path d="M22 46 L23 44 L25 46 L24 48 Z" fill="#FBBF24" className="roller-sparkle sparkle-2" />
    </svg>
  );
}

function TvIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="category-svg">
      <circle cx="32" cy="32" r="26" fill="#6366F1" />
      <rect x="16" y="18" width="32" height="22" rx="2.5" fill="#1E1B4B" stroke="#FFFFFF" strokeWidth="2" />
      <rect x="19" y="21" width="26" height="16" rx="1" fill="#818CF8" className="tv-inner-screen" />
      <line x1="32" y1="40" x2="32" y2="46" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="24" y1="46" x2="40" y2="46" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M26 14 L30 18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <path d="M38 14 L34 18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="category-svg">
      <circle cx="32" cy="32" r="26" fill="#F59E0B" />
      <g className="wrench-tool-group" style={{ transformOrigin: "32px 32px" }}>
        <path
          d="M38 18 C35 15, 30 15, 27 18 C25 20, 24 23, 25 26 L17 34 C15 36, 15 39, 17 41 L23 47 C25 49, 28 49, 30 47 L38 39 C41 40, 44 39, 46 37 C49 34, 49 29, 46 26 L41 31 L33 31 L33 23 L38 18 Z"
          fill="#FFFFFF"
          stroke="#78350F"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="category-svg">
      <circle cx="32" cy="32" r="26" fill="#10B981" />
      <path d="M32 16 L34 26 L44 28 L34 30 L32 40 L30 30 L20 28 L30 26 Z" fill="#FFFFFF" className="star-sparkle-main" />
      <path d="M42 36 L43 41 L48 42 L43 43 L42 48 L41 43 L36 42 L41 41 Z" fill="#D1FAE5" className="star-sparkle-side star-1" />
      <path d="M22 36 L23 39 L26 40 L23 41 L22 44 L21 41 L18 40 L21 39 Z" fill="#D1FAE5" className="star-sparkle-side star-2" />
    </svg>
  );
}

function AllServicesIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="category-svg all-services-svg">
      {/* Soft coral pink circular outline ring with rotating orbit */}
      <circle cx="32" cy="32" r="26" fill="#FFF1F2" stroke="#FB7185" strokeWidth="2.5" strokeDasharray="5 3" className="all-services-orbit" style={{ transformOrigin: "32px 32px" }} />
      {/* Inner clean ring */}
      <circle cx="32" cy="32" r="20" fill="#FFFFFF" stroke="#FDA4AF" strokeWidth="1.5" />
      {/* Plus (+) symbol in coral pink with spring bounce */}
      <g className="all-services-plus" style={{ transformOrigin: "32px 32px" }}>
        <line x1="32" y1="23" x2="32" y2="41" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" />
        <line x1="23" y1="32" x2="41" y2="32" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// Function to pick the right custom appliance illustration
function getCategoryIllustration(name: string, iconKey?: string | null) {
  const key = (iconKey || "").toLowerCase().trim();
  const lower = name.toLowerCase();

  // 1. Check explicit icon key (from admin selection/input)
  if (key === "wind" || key === "ac" || key === "air-conditioner") return <AcIcon />;
  if (key === "snowflake" || key === "fridge" || key === "refrigerator") return <FridgeIcon />;
  if (key === "shirt" || key === "washing-machine" || key === "washer") return <WashingMachineIcon />;
  if (key === "droplets" || key === "water-purifier" || key === "ro") return <WaterPurifierIcon />;
  if (key === "flame" || key === "geyser" || key === "heater") return <GeyserIcon />;
  if (key === "zap" || key === "microwave" || key === "oven") return <MicrowaveIcon />;
  if (key === "fan" || key === "chimney") return <ChimneyIcon />;
  if (key === "laptop" || key === "computer") return <LaptopIcon />;
  if (key === "home" || key === "decorator") return <DecoratorIcon />;
  if (key === "tv" || key === "television") return <TvIcon />;
  if (key === "wrench" || key === "tool" || key === "repair") return <WrenchIcon />;
  if (key === "sparkles" || key === "clean" || key === "service") return <SparklesIcon />;

  // 2. Name-based smart matching fallback
  if (lower.includes("window ac")) return <AcIcon />;
  if (lower.includes("air condition") || lower.includes("ac ") || lower === "ac") return <AcIcon />;
  if (lower.includes("fridge") || lower.includes("refrigerator")) return <FridgeIcon />;
  if (lower.includes("washing")) return <WashingMachineIcon />;
  if (lower.includes("water") || lower.includes("purifier") || lower.includes("cooler") || lower.includes("ro ")) return <WaterPurifierIcon />;
  if (lower.includes("geyser") || lower.includes("heater")) return <GeyserIcon />;
  if (lower.includes("microwave") || lower.includes("oven")) return <MicrowaveIcon />;
  if (lower.includes("chimney")) return <ChimneyIcon />;
  if (lower.includes("laptop") || lower.includes("computer")) return <LaptopIcon />;
  if (lower.includes("decor") || lower.includes("home") || lower.includes("paint")) return <DecoratorIcon />;
  if (lower.includes("tv") || lower.includes("television")) return <TvIcon />;

  // Default fallback icon
  return <WrenchIcon />;
}

export default function FeaturedCategories({
  onOpenBooking,
  onLoadedCategories,
}: FeaturedCategoriesProps) {
  // Initialize with DEFAULT_CATEGORIES so SSR has all content immediately, zero CLS
  const [categories, setCategories] = useState<CategoryDto[]>(DEFAULT_CATEGORIES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadDynamicCategories() {
      try {
        const res = await fetch("/api/categories", { cache: "default" });
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data) && json.data.length > 0 && isMounted) {
            setCategories(json.data);
            onLoadedCategories?.(json.data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        // Keep fallback categories without breaking UI
      }

      if (isMounted) {
        onLoadedCategories?.(DEFAULT_CATEGORIES);
        setLoading(false);
      }
    }

    loadDynamicCategories();

    return () => {
      isMounted = false;
    };
  }, [onLoadedCategories]);

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current || categories.length === 0 || typeof window === "undefined" || window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".category-item-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.08,
            duration: 0.7,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );

        // Apply 3D tilt & magnetic effect on desktop
        cards.forEach((card) => {
          apply3DTilt(card as HTMLElement, 10);
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [categories]);

  return (
    <section ref={sectionRef} className="featured-services-section" id="featured-services">
      <div className="container">
        {/* Section Heading - Clean & Modern matching Screenshot 1 */}
        <div className="featured-services-header">
          <h2 className="featured-services-title">Featured Services</h2>
        </div>

        {/* Categories Grid - Clicking opens Booking Modal for that Category */}
        <div ref={gridRef} className="featured-categories-grid">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.id}
              onClick={() => onOpenBooking?.(cat)}
              className="category-item-card"
              title={`Book ${cat.name}`}
            >
              <div className="category-icon-wrapper">
                {cat.icon ? (
                  getCategoryIllustration(cat.name, cat.icon)
                ) : cat.image ? (
                  <div className="category-uploaded-image">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      width={64}
                      height={64}
                      className="category-img-element"
                      unoptimized
                    />
                  </div>
                ) : (
                  getCategoryIllustration(cat.name)
                )}
              </div>
              <span className="category-item-name">{cat.name}</span>
            </button>
          ))}

          {/* Plus (+) "All Services" Icon Card - Exactly as in Screenshot 1 */}
          <Link
            href="/home-appliance-repair-services-patna/"
            className="category-item-card all-services-card"
            title="All Services"
          >
            <div className="category-icon-wrapper all-services-wrapper">
              <AllServicesIcon />
            </div>
            <span className="category-item-name all-services-text">All Services</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
