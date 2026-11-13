"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Search, ShieldCheck, Phone } from "lucide-react";

interface LocationItem {
  id?: number | string;
  name: string;
  slug: string;
  state?: string;
  description?: string;
  serviceCount?: number;
  services?: string[];
}

const THEME_CLASSES = [
  "theme-blue",
  "theme-emerald",
  "theme-purple",
  "theme-pink",
  "theme-amber",
  "theme-cyan",
  "theme-indigo",
  "theme-teal",
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  }),
};

export default function LocationsClient() {
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchLocations() {
      setLoading(true);
      try {
        const res = await fetch("/api/seo-pages/locations-summary", {
          cache: "no-store",
        });
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.success && Array.isArray(json.data)) {
            setLocations(json.data);
          }
        }
      } catch (err) {
        console.error("Error fetching locations:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchLocations();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredLocations = useMemo(() => {
    if (!search.trim()) return locations;
    const query = search.toLowerCase().trim();
    return locations.filter(
      (l) =>
        l.name.toLowerCase().includes(query) ||
        (l.state && l.state.toLowerCase().includes(query)) ||
        (l.description && l.description.toLowerCase().includes(query))
    );
  }, [locations, search]);

  return (
    <div className="locations-page-wrapper">
      <div className="locations-container">
        {/* Header (Screenshot 2 styling) */}
        <div className="locations-hero-header">
          <div className="locations-hero-badge badge-blue">
            <MapPin size={14} /> Doorstep Coverage Network
          </div>

          <h1 className="locations-hero-title">Locations We Serve</h1>

          <p className="locations-hero-desc">
            We deliver enterprise-grade digital and certified doorstep repair solutions to clients across Patna, Bihar, and expanding regions.
          </p>

          {/* Search bar */}
          <div className="locations-search-wrap">
            <Search size={17} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your locality or city..."
              className="locations-search-input"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="locations-grid">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="location-card theme-blue"
                style={{ opacity: 0.6, pointerEvents: "none" }}
              >
                <div>
                  <div className="location-card-icon" style={{ background: "#f1f5f9" }} />
                  <div
                    style={{
                      height: "22px",
                      background: "#f1f5f9",
                      borderRadius: "6px",
                      marginBottom: "12px",
                      width: "60%",
                    }}
                  />
                  <div
                    style={{
                      height: "14px",
                      background: "#f1f5f9",
                      borderRadius: "4px",
                      width: "80%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Location Cards Grid (ONLY DB locations) */}
        {!loading && filteredLocations.length > 0 && (
          <div className="locations-grid">
            {filteredLocations.map((loc, idx) => {
              const themeClass = THEME_CLASSES[idx % THEME_CLASSES.length];

              return (
                <motion.div
                  key={loc.slug || loc.id || idx}
                  custom={idx}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className={`location-card ${themeClass}`}
                >
                  <div>
                    {/* Location Icon Badge */}
                    <div className="location-card-icon">
                      <MapPin size={22} />
                    </div>

                    {/* Location Title */}
                    <h2 className="location-card-title">{loc.name}</h2>

                    {/* Subtitle / Region */}
                    <p className="location-card-state">{loc.state || "India"}</p>

                    {/* Description */}
                    <p className="location-card-desc">
                      {loc.description || `Certified doorstep repair and appliance maintenance across ${loc.name}.`}
                    </p>

                    {loc.serviceCount !== undefined && loc.serviceCount > 0 && (
                      <div className="service-dir-highlight-item" style={{ marginTop: "14px" }}>
                        <ShieldCheck size={14} />
                        <span style={{ fontSize: "12px", color: "#475569" }}>
                          {loc.serviceCount} Services Available
                        </span>
                      </div>
                    )}
                  </div>

                  {/* View Services Link (Screenshot 2 styling) */}
                  <div className="location-card-footer">
                    <Link href={`/locations/${loc.slug}`} className="location-card-link">
                      <span>View Services</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {!loading && filteredLocations.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "48px 24px",
              background: "#ffffff",
              borderRadius: "18px",
              border: "1px solid #e2e8f0",
              maxWidth: "460px",
              margin: "32px auto 0 auto",
            }}
          >
            <MapPin size={32} color="#94a3b8" style={{ margin: "0 auto 12px auto" }} />
            <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginBottom: "6px" }}>
              No Locations Found
            </h3>
            <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6", marginBottom: "16px" }}>
              We are constantly expanding our service radius. Contact our team to request doorstep service in your area.
            </p>
            <a
              href="tel:+919304415657"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 20px",
                borderRadius: "10px",
                background: "#0f172a",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: "700",
                textDecoration: "none",
              }}
            >
              <Phone size={14} /> Call Helpline
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
