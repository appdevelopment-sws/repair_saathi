"use client";

import React, { useState } from "react";
import { servicesData } from "@/data/servicesData";
import WhatsAppIcon from "./WhatsAppIcon";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  defaultService = "ac-repair",
}: BookingModalProps) {
  const [service, setService] = useState(defaultService);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;

    const newBookingId = "RS-" + Math.floor(100000 + Math.random() * 900000);
    const selectedServiceObj = servicesData.find((s) => s.id === service) || servicesData[0];

    const bookingItem = {
      id: newBookingId,
      serviceName: selectedServiceObj.title,
      price: selectedServiceObj.price,
      customerName: name,
      phone,
      address,
      date: date || new Date().toISOString().split("T")[0],
      status: "Confirmed",
      bookedAt: new Date().toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    // Store in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem("rs_bookings") || "[]");
      existing.unshift(bookingItem);
      localStorage.setItem("rs_bookings", JSON.stringify(existing));
    } catch {
      // fallback
    }

    setBookingId(newBookingId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setPhone("");
    setAddress("");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        {!submitted ? (
          <>
            <h3 className="modal-title">⚡ Quick Doorstep Service Booking</h3>
            <p className="modal-subtitle">
              Expert technicians at your doorstep in Patna within 60–90 minutes.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div className="form-group">
                <label className="form-label">Select Appliance Service</label>
                <select
                  className="form-select"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  required
                >
                  {servicesData.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="e.g. 9304415657"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Service Address (Patna & nearby)</label>
                <textarea
                  className="form-textarea"
                  style={{ minHeight: "65px" }}
                  placeholder="Flat/House No, Colony, Landmark, Area in Patna"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-submit-query"
                style={{ width: "100%", marginTop: "8px" }}
              >
                Confirm Doorstep Booking
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                background: "#dcfce7",
                color: "#16a34a",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                margin: "0 auto 16px auto",
              }}
            >
              ✓
            </div>
            <h3 className="modal-title" style={{ color: "#16a34a" }}>
              Booking Confirmed!
            </h3>
            <p style={{ fontSize: "14px", color: "#475569", margin: "8px 0 16px 0" }}>
              Thank you, <strong>{name}</strong>! Your technician will reach out to{" "}
              <strong>{phone}</strong> shortly.
            </p>

            <div
              style={{
                background: "#f8fafc",
                padding: "12px",
                borderRadius: "10px",
                border: "1px dashed #cbd5e1",
                marginBottom: "20px",
              }}
            >
              <span style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase" }}>
                Booking Reference ID
              </span>
              <div style={{ fontSize: "20px", fontWeight: "900", color: "#1e293b", marginTop: "2px" }}>
                {bookingId}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleReset}
                className="btn-submit-query"
                style={{ flex: 1, padding: "10px" }}
              >
                Done
              </button>
              <a
                href={`https://wa.me/919304415657?text=Hi%20Repair%20Saathi%2C%20I%20booked%20service%20${bookingId}%20for%20${encodeURIComponent(name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#25d366",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  fontSize: "14px",
                }}
              >
                <WhatsAppIcon size={18} color="#fff" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
