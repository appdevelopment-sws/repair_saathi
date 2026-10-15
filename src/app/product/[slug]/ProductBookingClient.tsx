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
      <div className="product-actions-group">
        <button
          onClick={() => setModalOpen(true)}
          className="btn-book-now"
        >
          ⚡ Book This Service Now
        </button>
        <a
          href="tel:+919304415657"
          className="btn-call-header"
        >
          📞 Call +91-9304415657
        </a>
        <a
          href={`https://wa.me/919304415657?text=Hi%20Repair%20Saathi%2C%20I%20want%20to%20inquire%20about%20${serviceId}.`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wa-header"
        >
          <WhatsAppIcon size={18} color="#ffffff" />
          <span>WhatsApp Us</span>
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
