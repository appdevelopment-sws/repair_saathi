"use client";

import React, { useState } from "react";
import BookingModal from "@/components/BookingModal";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface Props {
  serviceId: string;
  serviceTitle: string;
}

export default function ProductBookingClient({ serviceId }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
        <button
          onClick={() => setModalOpen(true)}
          className="btn-book-now"
          style={{ fontSize: "15px", padding: "12px 28px" }}
        >
          ⚡ Book This Service Now
        </button>
        <a
          href="tel:+919304415657"
          className="btn-call-header"
          style={{ fontSize: "14px", padding: "11px 22px" }}
        >
          📞 Call +91-9304415657
        </a>
        <a
          href={`https://wa.me/919304415657?text=Hi%20Repair%20Saathi%2C%20I%20want%20to%20inquire%20about%20${serviceId}.`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#25d366",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "800",
            padding: "11px 20px",
            borderRadius: "9999px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
          }}
        >
          <WhatsAppIcon size={18} color="#ffffff" />
          <span>WhatsApp</span>
        </a>
      </div>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={serviceId}
      />
    </>
  );
}
