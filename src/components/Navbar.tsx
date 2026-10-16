"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  ChevronDown,
  Menu,
  X,
  Wrench,
  Wind,
  Snowflake,
  Flame,
  Waves,
  Zap,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import BookingModal from "./BookingModal";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const serviceDropdownItems = [
    {
      name: "AC Repair & Jet Wash",
      href: "/product/ac-repair-in-patna/",
      icon: Wind,
      desc: "Fast cooling fix, gas charging & deep wash",
      color: "#0284c7",
    },
    {
      name: "Refrigerator Repair",
      href: "/product/refrigerator-service-in-patna/",
      icon: Snowflake,
      desc: "Single/Double door defrost & compressor fix",
      color: "#0ea5e9",
    },
    {
      name: "Washing Machine Service",
      href: "/product/washing-machine-repair-service-in-patna/",
      icon: Waves,
      desc: "Front/Top load drum, motor & drainage repair",
      color: "#6366f1",
    },
    {
      name: "Geyser Service & Repair",
      href: "/product/geyser-repair-in-patna/",
      icon: Flame,
      desc: "Heating element, thermostat & wiring check",
      color: "#f97316",
    },
    {
      name: "Microwave Oven Repair",
      href: "/product/microwave-repair-in-patna/",
      icon: Zap,
      desc: "Magnetron, PCB board & heating resolution",
      color: "#eab308",
    },
    {
      name: "Kitchen Chimney Repair",
      href: "/product/kitchen-chimney-repair-in-patna/",
      icon: Wrench,
      desc: "Deep suction cleaning, filter & motor repair",
      color: "#10b981",
    },
  ];

  const navLinks = [
    { text: "Home", href: "/" },
    { text: "About Us", href: "/about-repair-saathi/" },
    { text: "Blogs", href: "/home-appliance-repair-blog/" },
    { text: "My Bookings", href: "/my-bookings/" },
    { text: "Contact", href: "/contact-repair-saathi/" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      {/* Floating Pill Navbar Wrapper (Yoga Style) */}
      <div className="floating-navbar-container">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`floating-navbar-pill ${isScrolled ? "is-scrolled" : ""}`}
        >
          {/* Logo & Brand */}
          <Link href="/" className="floating-brand">
            <div className="floating-logo-wrap">
              <Image
                src="/images/logo.webp"
                alt="Repair Saathi"
                width={42}
                height={42}
                className="floating-logo-img"
                priority
              />
            </div>
            <div className="floating-brand-text">
              <span className="brand-name">
                Repair <span className="brand-accent">Saathi</span>
              </span>
              <span className="brand-badge">Patna&apos;s #1 Appliance Care</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="floating-nav-links">
            <Link
              href="/"
              className={`pill-nav-link ${isActive("/") ? "active" : ""}`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="services-dropdown-anchor"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                className={`pill-nav-link dropdown-btn ${
                  pathname.includes("/product/") || pathname.includes("/home-appliance-repair-services-patna")
                    ? "active"
                    : ""
                }`}
                onClick={() => setServicesDropdownOpen((prev) => !prev)}
              >
                Services
                <ChevronDown
                  className={`chevron-icon ${servicesDropdownOpen ? "rotated" : ""}`}
                  size={14}
                />
              </button>

              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="services-dropdown-panel"
                  >
                    <div className="services-dropdown-card">
                      <div className="services-dropdown-header">
                        <span className="dropdown-label">
                          <Sparkles size={13} style={{ color: "#fbbc34" }} />
                          Instant Doorstep Services
                        </span>
                        <Link
                          href="/home-appliance-repair-services-patna/"
                          className="view-all-link"
                          onClick={() => setServicesDropdownOpen(false)}
                        >
                          View All 8+ <ArrowRight size={12} />
                        </Link>
                      </div>

                      <div className="services-dropdown-grid">
                        {serviceDropdownItems.map((item) => {
                          const IconComp = item.icon;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="service-dropdown-item group"
                              onClick={() => setServicesDropdownOpen(false)}
                            >
                              <div
                                className="item-icon-box"
                                style={{
                                  backgroundColor: `${item.color}15`,
                                  color: item.color,
                                }}
                              >
                                <IconComp size={18} />
                              </div>
                              <div className="item-info">
                                <div className="item-title">{item.name}</div>
                                <div className="item-desc">{item.desc}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      <div className="services-dropdown-footer">
                        <span>⚡ Technicians arrive in 30 minutes • 90-Day Warranty</span>
                        <span className="warranty-tag">
                          <ShieldCheck size={14} /> 100% Verified
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/about-repair-saathi/"
              className={`pill-nav-link ${isActive("/about-repair-saathi/") ? "active" : ""}`}
            >
              About Us
            </Link>

            <Link
              href="/home-appliance-repair-blog/"
              className={`pill-nav-link ${isActive("/home-appliance-repair-blog/") ? "active" : ""}`}
            >
              Blogs
            </Link>

            <Link
              href="/my-bookings/"
              className={`pill-nav-link ${isActive("/my-bookings/") ? "active" : ""}`}
            >
              My Bookings
            </Link>

            <Link
              href="/contact-repair-saathi/"
              className={`pill-nav-link ${isActive("/contact-repair-saathi/") ? "active" : ""}`}
            >
              Contact
            </Link>
          </div>

          {/* Right Action CTAs */}
          <div className="floating-actions-wrap">
            <a href="tel:+919304415657" className="pill-call-btn" title="Call Repair Saathi" data-gsap="magnetic">
              <Phone size={14} className="call-icon" />
              <span className="call-number">+91-9304415657</span>
              <span className="call-label-mobile">Call</span>
            </a>

            <button
              onClick={() => setBookingModalOpen(true)}
              className="pill-book-btn desktop-only-cta"
              type="button"
              data-gsap="magnetic"
            >
              <span>Book Service</span>
              <ArrowRight size={14} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              className="pill-mobile-hamburger"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              type="button"
            >
              <Menu size={20} />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Drawer Menu (Yoga Style Full Drawer) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobile-menu-backdrop"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="mobile-menu-drawer"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-drawer-header">
                <div className="drawer-brand">
                  <Image
                    src="/images/logo.webp"
                    alt="Logo"
                    width={38}
                    height={38}
                    className="drawer-logo"
                  />
                  <div>
                    <div className="brand-name">
                      Repair <span className="brand-accent">Saathi</span>
                    </div>
                    <div className="brand-badge">Patna Care</div>
                  </div>
                </div>

                <button
                  className="drawer-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="mobile-drawer-body">
                <div className="drawer-section-label">APPLIANCE SERVICES</div>
                <div className="mobile-services-grid">
                  {serviceDropdownItems.slice(0, 4).map((item) => {
                    const IconComp = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="mobile-service-chip"
                      >
                        <IconComp size={16} style={{ color: item.color }} />
                        <span>{item.name.split(" ")[0]} {item.name.split(" ")[1]}</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="drawer-divider" />

                <div className="drawer-nav-list">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`mobile-nav-item ${isActive(link.href) ? "active" : ""}`}
                    >
                      <span>{link.text}</span>
                      <ArrowRight size={15} className="mobile-arrow" />
                    </Link>
                  ))}
                  <Link
                    href="/home-appliance-repair-services-patna/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mobile-nav-item"
                  >
                    <span>All Appliance Services</span>
                    <ArrowRight size={15} className="mobile-arrow" />
                  </Link>
                </div>
              </div>

              {/* Drawer Footer Buttons */}
              <div className="mobile-drawer-bottom">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setBookingModalOpen(true);
                  }}
                  className="mobile-primary-book-btn"
                >
                  ⚡ Instant Doorstep Booking
                </button>

                <a href="tel:+919304415657" className="mobile-call-action-btn">
                  <Phone size={16} /> Call +91-9304415657
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </>
  );
}
