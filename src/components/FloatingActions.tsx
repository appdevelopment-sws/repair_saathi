"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Home, Wrench, Calendar } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

export default function FloatingActions() {
  const pathname = usePathname();

  return (
    <>
      {/* Floating Action Buttons on Desktop & Tablet */}
      <div className="floating-actions">
        <a
          href="https://wa.me/919304415657?text=Hi%20Repair%20Saathi%2C%20I%20need%20repair%20service%20in%20Patna."
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float-btn"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
        >
          <span className="whatsapp-pulse" />
          <WhatsAppIcon size={28} color="#ffffff" />
        </a>

        <a
          href="tel:+919304415657"
          className="call-float-btn"
          aria-label="Call Repair Saathi"
          title="Call Now"
        >
          <Phone size={20} />
        </a>
      </div>

      {/* Sticky Bottom Navigation for Mobile Devices */}
      <div className="mobile-bottom-bar">
        <div className="mobile-bottom-grid">
          <Link
            href="/"
            className={`mobile-bottom-item ${pathname === "/" ? "active" : ""}`}
          >
            <span className="mobile-bottom-icon">
              <Home size={18} />
            </span>
            <span>Home</span>
          </Link>

          <Link
            href="/home-appliance-repair-services-patna/"
            className={`mobile-bottom-item ${
              pathname.includes("services") ? "active" : ""
            }`}
          >
            <span className="mobile-bottom-icon">
              <Wrench size={18} />
            </span>
            <span>Services</span>
          </Link>

          <Link
            href="/my-bookings/"
            className={`mobile-bottom-item ${
              pathname.includes("bookings") ? "active" : ""
            }`}
          >
            <span className="mobile-bottom-icon">
              <Calendar size={18} />
            </span>
            <span>Bookings</span>
          </Link>

          <a
            href="https://wa.me/919304415657?text=Hi%20Repair%20Saathi%2C%20I%20need%20appliance%20repair."
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-bottom-item"
            style={{ color: "#25d366" }}
          >
            <span className="mobile-bottom-icon">
              <WhatsAppIcon size={19} color="#25d366" />
            </span>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
}
