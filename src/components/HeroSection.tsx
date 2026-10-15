"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
} from "lucide-react";
import HeroCarousel from "./HeroCarousel";
import BookingModal from "./BookingModal";
import WhatsAppIcon from "./WhatsAppIcon";

export default function HeroSection() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("ac-repair");

  const openBooking = (serviceId = "ac-repair") => {
    setSelectedService(serviceId);
    setBookingModalOpen(true);
  };

  const featureCards = [
    {
      icon: Clock,
      label: "Fast Response",
      title: "30-Min Arrival",
      desc: "Doorstep technician in Patna",
      color: "#f59e0b",
      bgColor: "rgba(245, 158, 11, 0.1)",
    },
    {
      icon: ShieldCheck,
      label: "Guaranteed",
      title: "90-Day Warranty",
      desc: "100% genuine spare parts",
      color: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.1)",
    },
    {
      icon: Wrench,
      label: "Certified",
      title: "Expert Pros",
      desc: "5,000+ satisfied families",
      color: "#0284c7",
      bgColor: "rgba(2, 132, 199, 0.1)",
    },
    {
      icon: Zap,
      label: "Upfront",
      title: "Starts @ ₹199",
      desc: "Fixed upfront pricing",
      color: "#8b5cf6",
      bgColor: "rgba(139, 92, 246, 0.1)",
    },
  ];

  return (
    <>
      <section className="yoga-hero-section">
        {/* Subtle Ambient Background Gradients */}
        <div className="yoga-hero-ambient-glow" />
        <div className="yoga-hero-ambient-pattern" />

        <div className="container relative z-10">
          <div className="yoga-hero-content">
            {/* Top Offer / Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="yoga-hero-badge"
            >
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
            </motion.div>

            {/* Giant High-Impact Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="yoga-hero-heading"
            >
              Fast, Reliable Doorstep <br className="hero-desktop-br" />
              <span className="heading-highlight">
                Home Appliance Repair
                <svg
                  className="heading-curve-svg"
                  viewBox="0 0 200 9"
                  fill="none"
                >
                  <path
                    d="M2.00018 7.37072C50.2989 -0.669527 122.956 -1.68412 198.057 7.37072"
                    stroke="#fbbc34"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              in Patna
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="yoga-hero-subtitle"
            >
              Expert doorstep service for <strong>AC, Refrigerator, Washing Machine, RO & Microwave</strong>.
              Certified technicians arrive within 30 minutes with genuine spare parts, clear upfront pricing & a 90-day warranty.
            </motion.p>

            {/* 4 Feature Highlights Grid (Yoga Website Style) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="yoga-highlights-grid"
            >
              {featureCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="yoga-highlight-card">
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
                      <h3 className="highlight-title">{card.title}</h3>
                      <p className="highlight-desc">{card.desc}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="yoga-hero-ctas"
            >
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
            </motion.div>

            {/* Micro Trust Points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="yoga-hero-trust-bar"
            >
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
            </motion.div>
          </div>
        </div>

        {/* Hero Interactive Carousel Slider (with blue << >> buttons) */}
        <div className="yoga-hero-carousel-wrapper">
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
