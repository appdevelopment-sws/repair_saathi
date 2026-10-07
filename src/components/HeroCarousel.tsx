"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface BannerItem {
  id: string;
  title: string;
  image: string;
  link: string;
}

const bannerItems: BannerItem[] = [
  {
    id: "fridge",
    title: "Fridge / Refrigerator Services",
    image: "/images/freeze-repair-dark.webp",
    link: "/product/refrigerator-service-in-patna/",
  },
  {
    id: "washing",
    title: "Washing Machine Services",
    image: "/images/washing-dark.webp",
    link: "/product/washing-machine-repair-service-in-patna/",
  },
  {
    id: "split-ac",
    title: "AC Repair Services",
    image: "/images/ac-repair-dark.webp",
    link: "/product/ac-repair-in-patna/",
  },
  {
    id: "window-ac",
    title: "Window AC Services",
    image: "/images/window-ac-dark.webp",
    link: "/product/window-ac-service-in-patna/",
  },
];

export default function HeroCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = Math.max(340, container.clientWidth * 0.7);

    if (direction === "right") {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 20) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    } else {
      if (container.scrollLeft <= 20) {
        container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 20) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: 360, behavior: "smooth" });
        }
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="hero-slider-section">
      <div
        className="container"
        style={{ position: "relative" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Left Arrow Button with Double Chevron << */}
        <button
          className="slider-nav-btn slider-nav-prev"
          onClick={() => handleScroll("left")}
          aria-label="Previous Slide"
          title="Previous"
          type="button"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="13 18 7 12 13 6" />
            <polyline points="18 18 12 12 18 6" />
          </svg>
        </button>

        {/* Carousel Scroll Container */}
        <div className="hero-slider-track" ref={scrollContainerRef}>
          {bannerItems.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="hero-slider-card"
              title={item.title}
            >
              <div className="slider-card-media">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="slider-banner-img"
                  priority
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow Button with Double Chevron >> */}
        <button
          className="slider-nav-btn slider-nav-next"
          onClick={() => handleScroll("right")}
          aria-label="Next Slide"
          title="Next"
          type="button"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="11 6 17 12 11 18" />
            <polyline points="6 6 12 12 6 18" />
          </svg>
        </button>
      </div>
    </section>
  );
}
