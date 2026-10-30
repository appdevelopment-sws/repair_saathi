"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Send,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import BookingModal from "@/components/BookingModal";

export default function ContactClient() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [appliance, setAppliance] = useState("AC Repair & Service");
  const [locationArea, setLocationArea] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const appliancesList = [
    "AC Repair & Service",
    "Refrigerator / Fridge Repair",
    "Washing Machine Service",
    "Geyser Repair & Service",
    "Microwave Oven Repair",
    "Kitchen Chimney Cleaning & Repair",
    "Other Home Appliance",
  ];

  const coveredAreas = [
    "Saguna More",
    "Danapur Cantt",
    "Khagaul",
    "Bailey Road",
    "Phulwari Sharif",
    "Boring Road",
    "Kankarbagh",
    "Ashiana Nagar",
    "Rajendra Nagar",
    "Patliputra Colony",
    "Anisabad",
    "Digha",
    "Rupaspur",
    "Gola Road",
  ];

  const faqs = [
    {
      q: "How fast can a technician arrive at my doorstep in Patna?",
      a: "Our technicians are stationed locally across Saguna More, Danapur, Bailey Road, and Kankarbagh. Typically, our coordinator dispatches a verified technician to your home within 30 to 60 minutes of booking confirmation.",
    },
    {
      q: "What is your visiting & inspection charge?",
      a: "We have a transparent doorstep inspection charge of ₹199 only. If you approve the repair estimate and proceed with the service, this entire ₹199 inspection fee is adjusted/waived off in your final repair bill!",
    },
    {
      q: "Do you provide warranty on replaced spare parts?",
      a: "Yes! All genuine replacement parts and workmanship come with up to a 90-day service warranty. You receive a proper digital bill and receipt for complete peace of mind.",
    },
    {
      q: "Can I share photos or videos of the appliance error before booking?",
      a: "Absolutely! You can message us on WhatsApp at +91-9304415657 with a photo or audio/video of the issue. Our senior technician will diagnose the fault and provide an initial estimate before visiting.",
    },
    {
      q: "What are your customer service and technician operating hours?",
      a: "Our field technicians and phone support operate from 8:00 AM to 9:00 PM, 7 days a week (including Sundays and public holidays) for all emergency home appliance repairs.",
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquiryId, setInquiryId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const generatedId = "RS-" + Math.floor(100000 + Math.random() * 900000);

    const payload = {
      inquiryId: generatedId,
      customerName: name.trim(),
      phone: phone.trim(),
      email: email.trim() || null,
      serviceName: appliance,
      category: appliance.split(" ")[0] || "Home Appliance",
      city: "Patna",
      address: locationArea.trim() || "Patna",
      message: message.trim() || `Customer requested priority callback for ${appliance}`,
      preferredDate: "Today",
      preferredTime: "Within 15-30 mins (Priority Callback)",
      source: "Website Contact Page",
      status: "pending",
    };

    try {
      await fetch("/api/web-requests/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      try {
        await fetch("http://localhost:8008/api/web-requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch {}
    } finally {
      setIsSubmitting(false);
    }

    setInquiryId(generatedId);
    setSubmitted(true);
  };

  return (
    <div className="contact-page-wrapper">
      <div className="container">
        {/* HERO HEADER */}
        <section className="contact-hero-header">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="contact-hero-badge"
          >
            <Sparkles size={14} className="sparkle-icon" />
            <span>24/7 Doorstep Support &amp; Emergency Booking</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="contact-hero-title"
          >
            Get in Touch with Repair Saathi
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="contact-hero-desc"
          >
            Facing an appliance breakdown in Patna? Call our direct helpline, chat with a technician on WhatsApp, or send us a request for a 15-minute callback.
          </motion.p>
        </section>

        {/* 4 DIRECT CONTACT CHANNELS */}
        <div className="contact-channels-grid" data-gsap="stagger-cards">
          {/* Card 1: Direct Helpline */}
          <div className="contact-channel-card amber-accent" data-gsap="tilt">
            <div className="channel-icon-wrap amber">
              <Phone size={22} />
            </div>
            <div className="channel-info">
              <span className="channel-tag">Direct Call Helpline</span>
              <h3 className="channel-title">+91 93044 15657</h3>
              <p className="channel-desc">Instant phone diagnosis &amp; priority booking</p>
              <a href="tel:+919304415657" className="channel-action-btn amber">
                <span>Call Technician Now</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Card 2: WhatsApp Chat */}
          <div className="contact-channel-card green-accent">
            <div className="channel-icon-wrap green">
              <WhatsAppIcon size={24} color="#25d366" />
            </div>
            <div className="channel-info">
              <span className="channel-tag">WhatsApp Support</span>
              <h3 className="channel-title">+91 93044 15657</h3>
              <p className="channel-desc">Send issue photos/videos for quick quotes</p>
              <a
                href="https://wa.me/919304415657?text=Hi%20Repair%20Saathi,%20I%20need%20doorstep%20appliance%20repair%20service%20in%20Patna"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-action-btn green"
              >
                <span>Chat on WhatsApp</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Card 3: Saguna More Office */}
          <div className="contact-channel-card indigo-accent">
            <div className="channel-icon-wrap indigo">
              <MapPin size={22} />
            </div>
            <div className="channel-info">
              <span className="channel-tag">Headquarters &amp; Hub</span>
              <h3 className="channel-title">Saguna More, Patna</h3>
              <p className="channel-desc">Near Hi-Tech Hospital, Balaji Nagar, Danapur</p>
              <a
                href="https://www.google.com/maps/place/repair+sathi+A+To+Z+Ac+repair+Center+Patna/@25.6224743,85.0402694,17z/"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-action-btn indigo"
              >
                <span>Open Google Maps</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Card 4: Operating Hours */}
          <div className="contact-channel-card emerald-accent">
            <div className="channel-icon-wrap emerald">
              <Clock size={22} />
            </div>
            <div className="channel-info">
              <span className="channel-tag">Service Availability</span>
              <h3 className="channel-title">8:00 AM – 9:00 PM</h3>
              <p className="channel-desc">Monday – Sunday (All 7 Days Active)</p>
              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="channel-action-btn emerald"
              >
                <span>Book Service Visit</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* MAIN TWO-COLUMN SECTION: FORM & SERVICE HUB INFO */}
        <div className="contact-main-grid">
          {/* Left Column: Interactive Form */}
          <div className="contact-form-card">
            <div className="form-card-header">
              <span className="form-subtitle">15-MINUTE FAST CALLBACK</span>
              <h2 className="form-heading">Request a Doorstep Repair Visit</h2>
              <p className="form-intro">
                Tell us about your appliance issue and address in Patna. Our coordinator will call you back immediately to schedule a certified technician.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="contact-success-state"
              >
                <div className="success-icon-wrap">
                  <CheckCircle2 size={44} />
                </div>
                <h3>Thank You, {name}!</h3>
                <p>
                  Your service request for <strong>{appliance}</strong> has been received. Our coordinator will call you at <strong>{phone}</strong> within 15 minutes.
                </p>
                <div className="success-actions">
                  <a
                    href={`https://wa.me/919304415657?text=Hi%20Repair%20Saathi,%20I%20just%20submitted%20a%20request%20for%20${appliance}%20for%20${name}%20(${phone})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="success-wa-btn"
                  >
                    <WhatsAppIcon size={16} /> Confirm on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setPhone("");
                      setMessage("");
                    }}
                    className="success-reset-btn"
                  >
                    Send Another Request
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form-body">
                <div className="form-inputs-grid">
                  <div className="form-field">
                    <label className="field-label">
                      Your Full Name <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      className="field-input"
                      placeholder="e.g. Anand Prakash"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">
                      Mobile Number <span className="req">*</span>
                    </label>
                    <input
                      type="tel"
                      className="field-input"
                      placeholder="e.g. 9304415657"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Select Appliance</label>
                    <select
                      className="field-select"
                      value={appliance}
                      onChange={(e) => setAppliance(e.target.value)}
                    >
                      {appliancesList.map((app) => (
                        <option key={app} value={app}>
                          {app}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Patna Area / Landmark</label>
                    <input
                      type="text"
                      className="field-input"
                      placeholder="e.g. Saguna More, Bailey Road, Danapur"
                      value={locationArea}
                      onChange={(e) => setLocationArea(e.target.value)}
                    />
                  </div>

                  <div className="form-field full-width">
                    <label className="field-label">Describe the Issue (Optional)</label>
                    <textarea
                      className="field-textarea"
                      placeholder="What seems to be the problem? (e.g. AC not cooling, washing machine drum making noise, fridge gas leakage)..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="form-submit-row">
                  <button type="submit" className="form-submit-btn">
                    <span>Submit &amp; Get 15-Min Callback</span>
                    <ArrowRight size={16} />
                  </button>

                  <span className="form-security-note">
                    🔒 No spam. Your phone number is strictly used for technician dispatch.
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Office Hub, Coverage & Map Card */}
          <div className="contact-details-card">
            {/* Direct Contacts List */}
            <div className="office-info-section">
              <h3 className="section-title-sm">Patna Central Workshop</h3>

              <div className="office-contact-rows">
                <div className="office-row">
                  <div className="row-icon-box">
                    <MapPin size={18} />
                  </div>
                  <div className="row-details">
                    <span className="row-title">Office &amp; Workshop Address</span>
                    <p className="row-val">
                      RR Guest House, Ground Floor, Near Hi-Tech Hospital, Saguna More, Balaji Nagar, Danapur, Patna, Bihar – 801503
                    </p>
                  </div>
                </div>

                <div className="office-row">
                  <div className="row-icon-box">
                    <Mail size={18} />
                  </div>
                  <div className="row-details">
                    <span className="row-title">Official Email Support</span>
                    <a href="mailto:infohrepairsaathi@gmail.com" className="row-val-link">
                      infohrepairsaathi@gmail.com
                    </a>
                  </div>
                </div>

                <div className="office-row">
                  <div className="row-icon-box">
                    <ShieldCheck size={18} />
                  </div>
                  <div className="row-details">
                    <span className="row-title">Technician Assurance</span>
                    <p className="row-val">
                      Background verified &amp; technical leadership certified by AtoZ Smart Technical Training Center.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Covered Zones Chips */}
            <div className="covered-zones-section">
              <h4 className="zones-heading">
                <span>📍 Key Service Zones Covered Across Patna</span>
                <span className="zones-tag">30-Min Arrival</span>
              </h4>
              <div className="zones-chips-wrap">
                {coveredAreas.map((area) => (
                  <span key={area} className="zone-chip">
                    ✓ {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Google Map Box */}
            <div className="map-embed-wrapper">
              <iframe
                title="repair sathi A To Z Ac repair Center Patna"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.4714411347236!2d85.0402694!3d25.6224743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed57f9634b027d%3A0x3bad73abcefabe4c!2srepair%20sathi%20A%20To%20Z%20Ac%20repair%20Center%20Patna!5e0!3m2!1sen!2sin!4v1793355734466!5m2!1sen!2sin"
                width="100%"
                height="190"
                style={{ border: 0, borderRadius: "14px" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
              <div className="map-bottom-bar">
                <span>Saguna More Service Hub</span>
                <a
                  href="https://www.google.com/maps/place/repair+sathi+A+To+Z+Ac+repair+Center+Patna/@25.6224743,85.0402694,17z/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-nav-link"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION */}
        <section className="contact-faq-section">
          <div className="faq-header">
            <span className="faq-badge">
              <HelpCircle size={14} /> GOT QUESTIONS?
            </span>
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <p className="faq-subtitle">
              Common questions answered about our doorstep appliance repair visits in Patna.
            </p>
          </div>

          <div className="faq-accordion-container">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`faq-accordion-item ${isOpen ? "is-open" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="faq-question-btn"
                  >
                    <span>{faq.q}</span>
                    <span className="faq-arrow-icon">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="faq-answer-wrap"
                      >
                        <p className="faq-answer-text">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* BOTTOM EMERGENCY ACTION BANNER */}
        <div className="contact-bottom-banner">
          <div className="banner-text">
            <span className="banner-tag">EMERGENCY APPLIANCE REPAIR PATNA</span>
            <h3>Need an urgent technician visit today?</h3>
            <p>
              Same-day doorstep slots available across Danapur, Saguna More, Bailey Road &amp; all Patna areas. Up to 90-day repair warranty.
            </p>
          </div>

          <div className="banner-actions">
            <button
              type="button"
              onClick={() => setBookingModalOpen(true)}
              className="banner-primary-btn"
            >
              ⚡ Book Instant Inspection (₹199)
            </button>
            <a href="tel:+919304415657" className="banner-call-btn">
              <Phone size={15} /> +91-9304415657
            </a>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}
