"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  Clock,
  ShieldCheck,
  Wrench,
  Zap,
  Phone,
  ArrowRight,
  CheckCircle2,
  Star,
  Check,
} from "lucide-react";
import HeroCarousel from "./HeroCarousel";
import WhatsAppIcon from "./WhatsAppIcon";
import { gsap, applyMagnetic, apply3DTilt } from "@/lib/gsap";
import dynamic from "next/dynamic";

const BookingModal = dynamic(() => import("./BookingModal"), { ssr: false });

export default function HeroSection() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("ac-repair");

  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const curvePathRef = useRef<SVGPathElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const trustBarRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);
  const carouselWrapRef = useRef<HTMLDivElement>(null);

  // Counter values state with realistic defaults to eliminate Cumulative Layout Shift (CLS)
  const [counts] = useState({
    time: 30,
    warranty: 90,
    reviews: 5000,
    price: 199,
  });

  const openBooking = (serviceId = "ac-repair") => {
    setSelectedService(serviceId);
    setBookingModalOpen(true);
  };

  const featureCards = [
    {
      icon: Clock,
      label: "Fast Response",
      title: `${counts.time}-Min Arrival`,
      desc: "Doorstep technician in Patna",
      color: "#f59e0b",
      bgColor: "rgba(245, 158, 11, 0.1)",
    },
    {
      icon: ShieldCheck,
      label: "Guaranteed",
      title: `${counts.warranty}-Day Warranty`,
      desc: "100% genuine spare parts",
      color: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.1)",
    },
    {
      icon: Wrench,
      label: "Certified",
      title: `${counts.reviews.toLocaleString()}+ Expert Pros`,
      desc: "5,000+ satisfied families",
      color: "#0284c7",
      bgColor: "rgba(2, 132, 199, 0.1)",
    },
    {
      icon: Zap,
      label: "Upfront",
      title: `Starts @ ₹${counts.price}`,
      desc: "Fixed upfront pricing",
      color: "#8b5cf6",
      bgColor: "rgba(139, 92, 246, 0.1)",
    },
  ];

  // Performance-optimized GSAP enhancements (desktop only)
  // Keeps above-the-fold content immediately visible to guarantee fast Largest Contentful Paint (LCP)
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      // 1. Ambient Glow soft breathing pulsation
      if (ambientGlowRef.current) {
        gsap.to(ambientGlowRef.current, {
          scale: 1.15,
          opacity: 0.85,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 2. SVG curved highlight underline draw-in (static length to avoid forced reflow)
      if (curvePathRef.current) {
        const length = 200;
        gsap.set(curvePathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(curvePathRef.current, {
          strokeDashoffset: 0,
          duration: 0.85,
          delay: 0.2,
          ease: "power2.inOut",
        });
      }

      // 3. 3D tilt interaction on feature cards
      if (highlightsRef.current) {
        const cards = highlightsRef.current.querySelectorAll(".yoga-highlight-card");
        cards.forEach((card) => {
          apply3DTilt(card as HTMLElement, 8);
        });
      }

      // 4. Magnetic hover on CTA buttons
      if (ctasRef.current) {
        const primaryBtn = ctasRef.current.querySelector(".yoga-btn-primary") as HTMLElement;
        const secondaryBtn = ctasRef.current.querySelector(".yoga-btn-secondary") as HTMLElement;
        const waBtn = ctasRef.current.querySelector(".yoga-btn-whatsapp") as HTMLElement;

        if (primaryBtn) applyMagnetic(primaryBtn, 0.28);
        if (secondaryBtn) applyMagnetic(secondaryBtn, 0.28);
        if (waBtn) applyMagnetic(waBtn, 0.28);
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mousemove dynamic depth parallax for floating badges (desktop only)
  const handleHeroMouseMove = (e: React.MouseEvent) => {
    if (typeof window === "undefined" || window.innerWidth < 768 || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    if (ambientGlowRef.current) {
      gsap.to(ambientGlowRef.current, {
        x: x * 0.06,
        y: y * 0.06,
        duration: 1.2,
        ease: "power2.out",
      });
    }
  };

  return (
    <>
      <section
        ref={heroRef}
        className="yoga-hero-section"
        onMouseMove={handleHeroMouseMove}
      >
        {/* Subtle Ambient Background Gradients with GSAP breathing */}
        <div ref={ambientGlowRef} className="yoga-hero-ambient-glow" />
        <div className="yoga-hero-ambient-pattern" />


        <div className="container relative z-10">
          <div className="yoga-hero-content">
            {/* Top Offer / Trust Badge */}
            <div ref={badgeRef} className="yoga-hero-badge">
              <span className="badge-sparkle">
                <Sparkles size={13} />
              </span>
              <span className="badge-text">
                Patna&apos;s #1 Doorstep Repair
              </span>
              <span className="badge-rating">
                <Star size={11} fill="#f59e0b" color="#f59e0b" />
                4.9★ (5k+ Reviews)
              </span>
            </div>

            {/* Giant High-Impact Headline */}
            <h1 ref={headingRef} className="yoga-hero-heading">
              Fast, Reliable Doorstep <br className="hero-desktop-br" />
              <span className="heading-highlight">
                Home Appliance Repair
                <svg
                  className="heading-curve-svg"
                  viewBox="0 0 200 9"
                  fill="none"
                >
                  <path
                    ref={curvePathRef}
                    d="M2.00018 7.37072C50.2989 -0.669527 122.956 -1.68412 198.057 7.37072"
                    stroke="#fbbc34"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              in Patna
            </h1>

            {/* Subtitle */}
            <p ref={subtitleRef} className="yoga-hero-subtitle">
              Expert doorstep service for <strong>AC, Refrigerator, Washing Machine, RO & Microwave</strong>.
              Certified technicians arrive within 30 minutes with genuine spare parts, clear upfront pricing & a 90-day warranty.
            </p>

            {/* 4 Feature Highlights Grid with 3D Tilt & Animated Counters */}
            <div ref={highlightsRef} className="yoga-highlights-grid">
              {featureCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.label} className="yoga-highlight-card">
                    <div
                      className="highlight-icon-wrap"
                      style={{
                        backgroundColor: card.bgColor,
                        color: card.color,
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <div className="highlight-content">
                      <span className="highlight-tag">{card.label}</span>
                      <div className="highlight-title">{card.title}</div>
                      <p className="highlight-desc">{card.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div ref={ctasRef} className="yoga-hero-ctas">
              <button
                type="button"
                onClick={() => openBooking("ac-repair")}
                className="yoga-btn-primary"
              >
                <span>⚡ Book Doorstep Repair</span>
                <ArrowRight size={18} />
              </button>

              <div className="yoga-hero-sub-ctas">
                <a href="tel:+919304415657" className="yoga-btn-secondary">
                  <Phone size={17} style={{ color: "#f59e0b" }} />
                  <span>Call Us</span>
                </a>

                <a
                  href="https://wa.me/919304415657?text=Hi%20Repair%20Saathi%2C%20I%20need%20appliance%20repair%20service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="yoga-btn-whatsapp"
                >
                  <WhatsAppIcon size={18} color="#ffffff" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Micro Trust Points */}
            <div ref={trustBarRef} className="yoga-hero-trust-bar">
              <span className="trust-item">
                <CheckCircle2 size={15} style={{ color: "#16a34a" }} />
                Pay After Service
              </span>
              <span className="trust-divider">•</span>
              <span className="trust-item">
                <CheckCircle2 size={15} style={{ color: "#16a34a" }} />
                No Advance Charges
              </span>
              <span className="trust-divider">•</span>
              <span className="trust-item">
                <CheckCircle2 size={15} style={{ color: "#16a34a" }} />
                All Brands Covered
              </span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Carousel Slider */}
        <div ref={carouselWrapRef} className="yoga-hero-carousel-wrapper">
          <HeroCarousel />
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultService={selectedService}
      />
    </>
  );
}
