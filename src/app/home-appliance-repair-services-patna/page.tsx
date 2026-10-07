"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/data/servicesData";
import BookingModal from "@/components/BookingModal";

export default function AllServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedService, setSelectedService] = useState("ac-repair");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    "All",
    "AC Services",
    "Fridge / Refrigerator Services",
    "Washing Machine Services",
    "Geyser Services",
    "Microwave Services",
    "Chimney Services",
    "Water Cooler Services",
  ];

  const filteredServices =
    activeCategory === "All"
      ? servicesData
      : servicesData.filter((s) => s.category.toLowerCase().includes(activeCategory.toLowerCase().slice(0, 5)));

  const handleBook = (id: string) => {
    setSelectedService(id);
    setIsModalOpen(true);
  };

  return (
    <div style={{ padding: "40px 0 60px 0" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <span className="section-tag">Complete Rate Card</span>
          <h1 className="section-title" style={{ fontSize: "34px" }}>
            Home Appliance Repair Services in Patna
          </h1>
          <p className="section-desc">
            Explore our transparent pricing for verified doorstep repair, routine maintenance, and genuine parts installation in Patna.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "36px",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? "#fbbc34" : "#ffffff",
                color: activeCategory === cat ? "#1a1a1a" : "#475569",
                border: "1px solid",
                borderColor: activeCategory === cat ? "#fbbc34" : "#e2e8f0",
                padding: "8px 16px",
                borderRadius: "9999px",
                fontWeight: activeCategory === cat ? "800" : "600",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {filteredServices.map((item) => (
            <div key={item.id} className="service-card">
              {item.discountBadge && (
                <span className="service-card-badge">{item.discountBadge}</span>
              )}
              <div className="service-card-img-wrap">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="service-card-img"
                />
              </div>
              <div className="service-card-content">
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  {item.category}
                </span>
                <h3 className="service-card-title">{item.title}</h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                    lineHeight: "1.5",
                    marginBottom: "12px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.description}
                </p>

                <div className="service-price-block">
                  <span className="service-price-label">Visiting &amp; Fix</span>
                  <div>
                    <span className="service-price-val">{item.price}</span>
                    {item.originalPrice && (
                      <span className="service-price-original">
                        {item.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="service-card-actions">
                  <button
                    onClick={() => handleBook(item.id)}
                    className="btn-book-card"
                  >
                    ⚡ Book Now
                  </button>
                  <Link href={`/product/${item.slug}/`} className="btn-view-card">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Need custom repair banner */}
        <div
          style={{
            marginTop: "48px",
            background: "#0f172a",
            color: "#ffffff",
            padding: "32px",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <h3 style={{ fontSize: "20px", fontWeight: "900", color: "#fbbc34", marginBottom: "6px" }}>
              Can&apos;t find your specific appliance issue?
            </h3>
            <p style={{ color: "#cbd5e1", fontSize: "14px" }}>
              Call our technician coordinator directly. We service TVs, induction cooktops, inverters, and heavy kitchen equipment as well.
            </p>
          </div>
          <a href="tel:+919304415657" className="btn-book-now" style={{ fontSize: "15px", padding: "12px 24px" }}>
            📞 Call Helpdesk: +91-9304415657
          </a>
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService={selectedService}
      />
    </div>
  );
}
