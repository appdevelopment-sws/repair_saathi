"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Clock,
  Award,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Phone,
  Target,
  Eye,
  Star,
  Users,
} from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import BookingModal from "@/components/BookingModal";

export default function AboutClient() {
  const [modalOpen, setModalOpen] = useState(false);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  const stagger: Variants = {
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const highlights = [
    {
      title: "7+ Years Experience",
      desc: "Technical leadership trained at AtoZ Smart Technical Training Center.",
      icon: Award,
      badge: "Expertise",
      color: "#f59e0b",
      bgColor: "rgba(245, 158, 11, 0.1)",
    },
    {
      title: "Doorstep in 60-90 Mins",
      desc: "Fast response across Patna, Danapur, Saguna More & nearby.",
      icon: Clock,
      badge: "Speed",
      color: "#0284c7",
      bgColor: "rgba(2, 132, 199, 0.1)",
    },
    {
      title: "Transparent Pricing",
      desc: "Zero hidden charges. Complete estimate before initiating repair.",
      icon: Sparkles,
      badge: "Honesty",
      color: "#8b5cf6",
      bgColor: "rgba(139, 92, 246, 0.1)",
    },
    {
      title: "Genuine Spare Parts",
      desc: "100% authentic manufacturer replacement components only.",
      icon: ShieldCheck,
      badge: "Genuine",
      color: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.1)",
    },
    {
      title: "Service Warranty",
      desc: "Up to 90-day warranty on replaced parts and workmanship.",
      icon: CheckCircle2,
      badge: "Assurance",
      color: "#ec4899",
      bgColor: "rgba(236, 72, 153, 0.1)",
    },
    {
      title: "Verified Technicians",
      desc: "Background-checked, polite, and certified electrical professionals.",
      icon: Users,
      badge: "Safety",
      color: "#06b6d4",
      bgColor: "rgba(6, 182, 212, 0.1)",
    },
  ];

  return (
    <div className="about-yoga-page">
      {/* 1. HERO BANNER WITH ANIMATED REPAIR PHOTO (MATCHING REFERENCE IMAGE 2) */}
      <section className="about-hero-section">
        {/* Animated Monochrome Repair Photo Background */}
        <div className="about-hero-bg-media">
          <motion.img
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.07, 1] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            src="/images/refrigerator-sec.webp"
            alt="Repair Saathi Home Appliance Service"
            className="about-hero-bg-img"
          />
        </div>

        {/* Cinematic Backdrop Overlay */}
        <div className="about-hero-overlay" />

        <div className="about-hero-content-wrap">
          {/* Breadcrumb (as in reference Image 2: "You are here: Home / About Us") */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="about-hero-breadcrumb"
          >
            <span className="breadcrumb-label">You are here:</span>
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">About Us</span>
          </motion.div>

          {/* Main Title matching reference Image 2 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="about-hero-title"
          >
            About Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="about-hero-title-sub"
          >
            The Heart &amp; Commitment Behind <span className="title-highlight">Repair Saathi</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="about-hero-subtitle"
          >
            &ldquo;Patna&apos;s most trusted home appliance repair and maintenance partner for AC, refrigerator, washing machine, geyser, microwave, and kitchen chimneys.&rdquo;
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="about-hero-ctas"
          >
            <button
              onClick={() => setModalOpen(true)}
              className="about-btn-primary"
              type="button"
              data-gsap="magnetic"
            >
              <span>⚡ Book Doorstep Service</span>
              <ArrowRight size={16} />
            </button>
            <a href="tel:+919304415657" className="about-btn-secondary" data-gsap="magnetic">
              <Phone size={15} />
              <span>Call +91-9304415657</span>
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="about-scroll-cue"
          >
            <div className="scroll-line" />
            <span className="scroll-text">Our Story &amp; Journey</span>
          </motion.div>
        </div>
      </section>

      {/* 2. THE ORIGIN & COMMITMENT SECTION (Yoga Style 2-Column) */}
      <section className="about-origin-section">
        <div className="container">
          <div className="about-origin-grid">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
              className="about-origin-content"
            >
              <motion.span variants={fadeInUp} className="origin-section-tag">
                OUR EXPERIENCE &amp; COMMITMENT
              </motion.span>

              <motion.h2 variants={fadeInUp} className="origin-main-heading">
                From Technical Rigor to <br />
                <span className="heading-accent">Patna&apos;s Trusted Partner.</span>
              </motion.h2>

              <motion.div variants={fadeInUp} className="origin-quote-box">
                &ldquo;We believe genuine service is not just replacing parts, but bringing peace of mind back to a family.&rdquo;
              </motion.div>

              <motion.div variants={fadeInUp} className="origin-paragraphs">
                <p>
                  <strong>Repair Saathi</strong> is a trusted home appliance repair service provider in <strong>Patna, Bihar</strong>, offering reliable, fast, and professional repair solutions for households and businesses. We are committed to delivering quality workmanship with complete customer satisfaction.
                </p>
                <p>
                  Backed by <strong>7+ years of industry experience</strong>, Repair Saathi operates under the guidance of skilled technical professionals trained at <strong>AtoZ Smart Technical Training Center</strong>, ensuring high service standards and continuous skill upgrades.
                </p>
              </motion.div>

              {/* Stats Row */}
              <motion.div variants={fadeInUp} className="origin-stats-grid">
                <div className="stat-card">
                  <h4 className="stat-number">7+</h4>
                  <p className="stat-label">Years Experience</p>
                </div>
                <div className="stat-card">
                  <h4 className="stat-number">5,000+</h4>
                  <p className="stat-label">Happy Patna Homes</p>
                </div>
                <div className="stat-card">
                  <h4 className="stat-number">90 Days</h4>
                  <p className="stat-label">Service Warranty</p>
                </div>
                <div className="stat-card">
                  <h4 className="stat-number">100%</h4>
                  <p className="stat-label">Verified Technicians</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Media Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="about-origin-media-wrap"
            >
              <div className="origin-image-card">
                <Image
                  src="/images/ac-repair-sec.webp"
                  alt="Repair Saathi Patna Doorstep Technicians"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="origin-banner-img"
                  priority
                />
                <div className="image-card-overlay" />
              </div>

              {/* Floating Quality Badge */}
              <div className="origin-floating-badge">
                <div className="badge-icon-box">
                  <ShieldCheck size={26} color="#ffffff" />
                </div>
                <div>
                  <div className="floating-badge-title">AtoZ Certified</div>
                  <div className="floating-badge-sub">Quality &amp; Skill Standards</div>
                </div>
              </div>

              {/* Background Accent Card */}
              <div className="origin-media-backdrop" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. PURPOSE & FUTURE: MISSION & VISION (Yoga Style Soft Sage Cards) */}
      <section className="about-pillars-section">
        <div className="container">
          <div className="about-pillars-header text-center">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="origin-section-tag"
            >
              OUR PURPOSE &amp; FUTURE
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="origin-main-heading"
            >
              The Core Pillars of Our Motive.
            </motion.h2>
          </div>

          <div className="pillars-grid-2">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="pillar-card mission-card"
            >
              <div className="pillar-icon-box mission-icon">
                <Target size={28} />
              </div>
              <span className="pillar-tag">OUR PURPOSE</span>
              <h3 className="pillar-title">Our Mission</h3>
              <p className="pillar-desc">
                Our mission at Repair Saathi is to provide fast, affordable, and reliable home appliance repair services by connecting customers with skilled and verified technicians. We are committed to transparent pricing, quality repairs, and excellent customer support while continuously improving through training, technology, and trust.
              </p>
              <div className="pillar-footer-list">
                <div className="pillar-check-item">
                  <CheckCircle2 size={16} className="check-icon" />
                  <span>Transparent upfront pricing without hidden surprises</span>
                </div>
                <div className="pillar-check-item">
                  <CheckCircle2 size={16} className="check-icon" />
                  <span>Rigorous technical standards via AtoZ Training Center</span>
                </div>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="pillar-card vision-card"
            >
              <div className="pillar-icon-box vision-icon">
                <Eye size={28} />
              </div>
              <span className="pillar-tag">OUR FUTURE</span>
              <h3 className="pillar-title">Our Vision</h3>
              <p className="pillar-desc">
                At Repair Saathi, our vision is to become the most trusted and reliable home appliance repair service in Patna by delivering quality workmanship, honest pricing, and prompt doorstep service. We aim to simplify appliance repair through skilled technicians, modern tools, and customer-first solutions.
              </p>
              <div className="pillar-footer-list">
                <div className="pillar-check-item">
                  <CheckCircle2 size={16} className="check-icon" />
                  <span>Prompt 30-60 minute doorstep arrival across Patna</span>
                </div>
                <div className="pillar-check-item">
                  <CheckCircle2 size={16} className="check-icon" />
                  <span>Customer-first support with genuine 90-day warranty</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE REPAIR SAATHI (6 Feature Highlights Grid) */}
      <section className="about-why-section">
        <div className="container">
          <div className="about-why-header text-center">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="origin-section-tag"
            >
              PROVEN STANDARDS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="origin-main-heading"
            >
              Why Choose Repair Saathi?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="origin-subtext"
            >
              Here is why over 5,000+ Patna families and businesses rely on our services every year.
            </motion.p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="why-highlights-grid"
          >
            {highlights.map((h, i) => {
              const IconComponent = h.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="why-highlight-card"
                >
                  <div
                    className="why-icon-box"
                    style={{ backgroundColor: h.bgColor, color: h.color }}
                  >
                    <IconComponent size={22} />
                  </div>
                  <span className="why-badge">{h.badge}</span>
                  <h4 className="why-card-title">{h.title}</h4>
                  <p className="why-card-desc">{h.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 5. CALL TO ACTION STRIP (Yoga Style CTA) */}
      <section className="about-cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="about-cta-card"
          >
            <div className="cta-content-col">
              <span className="cta-badge">
                <Star size={13} fill="#fbbc34" color="#fbbc34" />
                Same-Day Doorstep Service in Patna
              </span>
              <h3 className="cta-heading">
                Ready to Experience Hassle-Free Appliance Repair?
              </h3>
              <p className="cta-desc">
                Connect with our certified technicians today. Prompt arrival, upfront estimates &amp; 90-day warranty across all Patna locations.
              </p>
            </div>

            <div className="cta-actions-col">
              <button
                onClick={() => setModalOpen(true)}
                className="cta-book-btn"
                type="button"
              >
                <span>⚡ Book Repair Online</span>
                <ArrowRight size={16} />
              </button>

              <a href="tel:+919304415657" className="cta-call-btn">
                <Phone size={16} />
                <span>Call +91-9304415657</span>
              </a>

              <a
                href="https://wa.me/919304415657?text=Hi%20Repair%20Saathi%2C%20I%20need%20doorstep%20appliance%20repair"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-whatsapp-btn"
              >
                <WhatsAppIcon size={18} color="#ffffff" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
