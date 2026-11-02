"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  Clock,
  ShieldCheck,
  Calendar,
  MapPin,
  User,
  Phone,
  Search,
  X,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import BookingModal from "@/components/BookingModal";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export interface Booking {
  id: string;
  serviceName: string;
  price: string;
  customerName: string;
  phone: string;
  address: string;
  date: string;
  status: string;
  bookedAt: string;
  technicianName?: string;
  technicianPhone?: string;
  timeSlot?: string;
}

export default function BookingsClient() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"ALL" | "ACTIVE" | "COMPLETED">("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Initialize or load bookings
  useEffect(() => {
    try {
      const stored = localStorage.getItem("rs_bookings");
      if (stored) {
        setBookings(JSON.parse(stored));
      } else {
        const todayStr = new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });

        const initial: Booking[] = [
          {
            id: "RS-982410",
            serviceName: "AC Repair & Deep Jet Wash Service in Patna",
            price: "₹199.00",
            customerName: "Harsh Raj",
            phone: "+91-9304415657",
            address: "Flat 302, Balaji Nagar, Near Hi-Tech Hospital, Saguna More, Danapur, Patna",
            date: todayStr,
            status: "Technician Assigned",
            bookedAt: "Today, 10:30 AM",
            technicianName: "Mukesh Sharma (Senior AC Specialist)",
            technicianPhone: "+91-9304415657",
            timeSlot: "Today, 02:00 PM - 04:00 PM",
          },
          {
            id: "RS-874219",
            serviceName: "Washing Machine Motor & Drainage Repair",
            price: "₹199.00",
            customerName: "Harsh Raj",
            phone: "+91-9304415657",
            address: "Bailey Road, Near Rupaspur Overbridge, Patna",
            date: "Oct 5, 2026",
            status: "Completed",
            bookedAt: "Oct 5, 2026",
            technicianName: "Rakesh Kumar (Verified Tech)",
            technicianPhone: "+91-9304415657",
            timeSlot: "Completed with 90-Day Warranty",
          },
        ];
        setBookings(initial);
        localStorage.setItem("rs_bookings", JSON.stringify(initial));
      }
    } catch {
      // fallback
    }
  }, []);

  // Sync when storage updates (e.g. from modal booking)
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem("rs_bookings");
        if (stored) {
          setBookings(JSON.parse(stored));
        }
      } catch {}
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Filter logic
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        b.id.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.serviceName.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q);

      const isActive =
        b.status === "Technician Assigned" ||
        b.status === "Confirmed" ||
        b.status === "In Progress" ||
        b.status === "Pending";

      const isCompleted = b.status === "Completed";

      let matchesTab = true;
      if (activeTab === "ACTIVE") matchesTab = isActive;
      if (activeTab === "COMPLETED") matchesTab = isCompleted;

      return matchesSearch && matchesTab;
    });
  }, [bookings, searchQuery, activeTab]);

  const activeCount = useMemo(() => {
    return bookings.filter(
      (b) =>
        b.status === "Technician Assigned" ||
        b.status === "Confirmed" ||
        b.status === "In Progress" ||
        b.status === "Pending"
    ).length;
  }, [bookings]);

  const completedCount = useMemo(() => {
    return bookings.filter((b) => b.status === "Completed").length;
  }, [bookings]);

  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Stepper helper
  const getStepState = (status: string, stepIndex: number) => {
    // 0: Booked, 1: Tech Assigned, 2: In Transit / Reaching, 3: Completed
    if (status === "Completed") return "completed";

    if (status === "Technician Assigned") {
      if (stepIndex <= 1) return "completed";
      if (stepIndex === 2) return "active";
      return "pending";
    }

    if (status === "In Progress") {
      if (stepIndex <= 2) return "completed";
      return "active";
    }

    // Confirmed
    if (stepIndex === 0) return "completed";
    if (stepIndex === 1) return "active";
    return "pending";
  };

  return (
    <div className="bookings-page-wrapper">
      <div className="container">
        {/* HEADER SECTION */}
        <section className="bookings-hero-header">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bookings-hero-badge"
          >
            <Sparkles size={14} className="sparkle-icon" />
            <span>Real-Time Service Tracker</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bookings-hero-title"
          >
            My Bookings Dashboard
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bookings-hero-desc"
          >
            Track your doorstep technician arrival in Patna, check service status, download warranty estimates, or request instant assistance.
          </motion.p>
        </section>

        {/* METRICS SUMMARY STATS */}
        <div className="bookings-stats-grid">
          <div className="booking-stat-card">
            <div className="stat-icon-wrap amber">
              <Wrench size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Total Bookings</span>
              <span className="stat-value">{bookings.length}</span>
            </div>
          </div>

          <div className="booking-stat-card">
            <div className="stat-icon-wrap indigo">
              <Clock size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Active / In-Transit</span>
              <span className="stat-value">{activeCount}</span>
            </div>
          </div>

          <div className="booking-stat-card">
            <div className="stat-icon-wrap emerald">
              <ShieldCheck size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Completed &amp; Warranty</span>
              <span className="stat-value">{completedCount}</span>
            </div>
          </div>

          <div className="booking-stat-card helpline-card">
            <div className="stat-icon-wrap green">
              <Phone size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Patna Helpline (30 Mins)</span>
              <a href="tel:+919304415657" className="stat-link-btn">
                +91-9304415657
              </a>
            </div>
          </div>
        </div>

        {/* CONTROLS: SEARCH & TABS */}
        <div className="bookings-controls-card">
          <div className="bookings-search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="bookings-search-input"
              placeholder="Search by Booking ID (e.g. RS-982410), phone number, or service name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="bookings-filter-tabs">
            <button
              type="button"
              onClick={() => setActiveTab("ALL")}
              className={`booking-tab-btn ${activeTab === "ALL" ? "active" : ""}`}
            >
              All ({bookings.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ACTIVE")}
              className={`booking-tab-btn ${activeTab === "ACTIVE" ? "active" : ""}`}
            >
              Active ({activeCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("COMPLETED")}
              className={`booking-tab-btn ${activeTab === "COMPLETED" ? "active" : ""}`}
            >
              Completed ({completedCount})
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bookings-new-cta-btn"
            >
              ⚡ Book New Service
            </button>
          </div>
        </div>

        {/* BOOKINGS LIST */}
        <div className="bookings-list-container">
          {filteredBookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bookings-empty-state"
            >
              <div className="empty-icon-circle">
                <AlertCircle size={38} />
              </div>
              <h3>No bookings found</h3>
              <p>
                {searchQuery
                  ? `No service visits found matching "${searchQuery}". Please check your booking ID or phone number.`
                  : "You do not have any bookings in this category right now."}
              </p>
              <div className="empty-actions">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="empty-clear-btn"
                  >
                    Clear Search Query
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="empty-book-btn"
                >
                  ⚡ Book a New Service Now
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="bookings-cards-stack">
              {filteredBookings.map((item, index) => {
                const isExpanded = expandedId === item.id;
                const isCompleted = item.status === "Completed";
                const isAssigned = item.status === "Technician Assigned";

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    className={`booking-card-item ${isCompleted ? "is-completed" : "is-active"}`}
                  >
                    {/* Top Row: IDs, Badge & Date */}
                    <div className="booking-card-top-row">
                      <div className="booking-id-group">
                        <div className="id-pill">
                          <span>{item.id}</span>
                          <button
                            type="button"
                            onClick={(e) => handleCopyId(item.id, e)}
                            className="id-copy-btn"
                            title="Copy Booking ID"
                          >
                            {copiedId === item.id ? (
                              <Check size={13} className="text-emerald" />
                            ) : (
                              <Copy size={13} />
                            )}
                          </button>
                          {copiedId === item.id && (
                            <span className="copied-tag">Copied!</span>
                          )}
                        </div>

                        <span
                          className={`status-pill ${
                            isCompleted
                              ? "status-completed"
                              : isAssigned
                              ? "status-assigned"
                              : "status-confirmed"
                          }`}
                        >
                          <span className="status-dot" />
                          {item.status}
                        </span>
                      </div>

                      <div className="booking-date-stamp">
                        <Calendar size={13} />
                        <span>Booked: {item.bookedAt}</span>
                      </div>
                    </div>

                    {/* Middle Main Content */}
                    <div className="booking-card-main-content">
                      <div className="service-details-col">
                        <h2 className="booking-service-title">{item.serviceName}</h2>

                        <div className="booking-info-meta-list">
                          <div className="info-meta-item">
                            <Clock size={14} className="meta-icon" />
                            <span>
                              <strong>Scheduled Slot:</strong>{" "}
                              {item.timeSlot || `${item.date} (Today)`}
                            </span>
                          </div>

                          <div className="info-meta-item">
                            <MapPin size={14} className="meta-icon" />
                            <span>
                              <strong>Service Address:</strong> {item.address}
                            </span>
                          </div>

                          <div className="info-meta-item">
                            <User size={14} className="meta-icon" />
                            <span>
                              <strong>Customer:</strong> {item.customerName} ({item.phone})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Action / Summary Box */}
                      <div className="booking-action-box">
                        <div className="price-tag-wrap">
                          <span className="price-label">Inspection &amp; Rate</span>
                          <span className="price-amount">{item.price}</span>
                          <span className="price-warranty-note">
                            ✓ 90-Day Repair Warranty
                          </span>
                        </div>

                        <div className="booking-action-buttons">
                          <a
                            href={`https://wa.me/919304415657?text=Hi%20Repair%20Saathi,%20checking%20live%20status%20for%20Booking%20ID%20${item.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wa-track-btn"
                          >
                            <WhatsAppIcon size={16} />
                            <span>WhatsApp Status</span>
                          </a>

                          <a
                            href="tel:+919304415657"
                            className="call-tech-btn"
                          >
                            <Phone size={14} />
                            <span>Call Technician</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* LIVE TRACKING TIMELINE / STEPPER */}
                    <div className="booking-stepper-wrap">
                      <div className="stepper-track">
                        {/* Step 1: Booking Received */}
                        <div className={`step-item ${getStepState(item.status, 0)}`}>
                          <div className="step-circle">
                            <CheckCircle2 size={16} />
                          </div>
                          <div className="step-text">
                            <span className="step-title">Order Confirmed</span>
                            <span className="step-sub">Details Verified</span>
                          </div>
                        </div>

                        <div className={`step-line ${getStepState(item.status, 1)}`} />

                        {/* Step 2: Technician Assigned */}
                        <div className={`step-item ${getStepState(item.status, 1)}`}>
                          <div className="step-circle">
                            <User size={16} />
                          </div>
                          <div className="step-text">
                            <span className="step-title">Tech Assigned</span>
                            <span className="step-sub">
                              {item.technicianName
                                ? item.technicianName.split(" ")[0]
                                : "Certified Tech"}
                            </span>
                          </div>
                        </div>

                        <div className={`step-line ${getStepState(item.status, 2)}`} />

                        {/* Step 3: Out For Delivery / Reaching */}
                        <div className={`step-item ${getStepState(item.status, 2)}`}>
                          <div className="step-circle">
                            <Truck size={16} />
                          </div>
                          <div className="step-text">
                            <span className="step-title">Doorstep Visit</span>
                            <span className="step-sub">30-Min Arrival</span>
                          </div>
                        </div>

                        <div className={`step-line ${getStepState(item.status, 3)}`} />

                        {/* Step 4: Repair Complete & Warranty */}
                        <div className={`step-item ${getStepState(item.status, 3)}`}>
                          <div className="step-circle">
                            <ShieldCheck size={16} />
                          </div>
                          <div className="step-text">
                            <span className="step-title">Repair Completed</span>
                            <span className="step-sub">90-Day Warranty</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Details Drawer Toggle */}
                    <div className="booking-card-footer">
                      <button
                        type="button"
                        onClick={() => toggleExpand(item.id)}
                        className="footer-toggle-btn"
                      >
                        <span>
                          {isExpanded ? "Hide Detailed Report" : "View Technician Details & Timeline"}
                        </span>
                        {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </button>

                      <div className="footer-right-tags">
                        <span className="safe-tag">🛡️ 100% Genuine Spares</span>
                        <span className="safe-tag">⚡ Same Day Doorstep</span>
                      </div>
                    </div>

                    {/* Expandable Content Body */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="expanded-drawer-content"
                        >
                          <div className="drawer-grid">
                            <div className="drawer-box">
                              <h4>Assigned Technician</h4>
                              <p className="tech-name">
                                <strong>{item.technicianName || "Mukesh Sharma (Master Technician)"}</strong>
                              </p>
                              <p className="tech-desc">
                                Background verified, technical leadership certified from AtoZ Smart Technical Training Center.
                              </p>
                              <a
                                href="tel:+919304415657"
                                className="drawer-call-link"
                              >
                                <Phone size={13} /> Call Direct: +91-9304415657
                              </a>
                            </div>

                            <div className="drawer-box">
                              <h4>Inspection &amp; Estimate Policy</h4>
                              <ul className="drawer-checklist">
                                <li>Transparent inspection rate of ₹199 adjusted in final repair bill.</li>
                                <li>Full written estimate provided before any part replacement.</li>
                                <li>Up to 90-day warranty coverage on replaced components.</li>
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* BOTTOM HELP BANNER */}
        <div className="bookings-help-banner">
          <div className="help-text-wrap">
            <span className="help-tag">PATNA DOORSTEP SERVICE ASSURANCE</span>
            <h3>Need to reschedule or speak with technical support?</h3>
            <p>
              Our technician coordinators at Saguna More &amp; Danapur are active 8:00 AM – 9:00 PM every day to assist with any appliance emergency.
            </p>
          </div>

          <div className="help-buttons-wrap">
            <a href="tel:+919304415657" className="help-call-btn">
              <Phone size={16} /> Call +91-9304415657
            </a>
            <a
              href="https://wa.me/919304415657?text=Hi%20Repair%20Saathi,%20I%20need%20help%20with%20my%20service%20booking"
              target="_blank"
              rel="noopener noreferrer"
              className="help-wa-btn"
            >
              <WhatsAppIcon size={18} /> WhatsApp Support
            </a>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
