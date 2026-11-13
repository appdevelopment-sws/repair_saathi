"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  ShieldCheck,
  Wrench,
  Snowflake,
  Flame,
  Droplets,
  Tv,
  Smartphone,
  Phone,
  Sparkles,
  Zap,
} from "lucide-react";

interface ServiceCard {
  id?: number | string;
  serviceName: string;
  locationName: string;
  slug: string;
  h1Heading?: string;
  heroDescription?: string;
  template?: string;
  status?: string;
}

function formatLocationName(slug: string) {
  if (!slug) return "Patna";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const THEME_PALETTE = [
  { className: "theme-blue", icon: Snowflake },
  { className: "theme-pink", icon: Smartphone },
  { className: "theme-emerald", icon: Wrench },
  { className: "theme-purple", icon: Tv },
  { className: "theme-amber", icon: Flame },
  { className: "theme-cyan", icon: Droplets },
  { className: "theme-indigo", icon: Zap },
  { className: "theme-teal", icon: Sparkles },
];

function getThemeByService(serviceName: string, index: number) {
  const lower = (serviceName || "").toLowerCase();
  if (lower.includes("tv") || lower.includes("television")) {
    return { className: "theme-purple", icon: Tv };
  }
  if (lower.includes("ac") || lower.includes("air") || lower.includes("cooling")) {
    return { className: "theme-blue", icon: Snowflake };
  }
  if (lower.includes("wash") || lower.includes("machine") || lower.includes("laundry")) {
    return { className: "theme-pink", icon: Smartphone };
  }
  if (lower.includes("fridge") || lower.includes("refrigerator") || lower.includes("iot")) {
    return { className: "theme-emerald", icon: Wrench };
  }
  if (lower.includes("ro") || lower.includes("water") || lower.includes("purifier")) {
    return { className: "theme-cyan", icon: Droplets };
  }
  if (lower.includes("geyser") || lower.includes("heater")) {
    return { className: "theme-amber", icon: Flame };
  }
  if (lower.includes("microwave") || lower.includes("oven")) {
    return { className: "theme-indigo", icon: Zap };
  }
  if (lower.includes("chimney") || lower.includes("hob") || lower.includes("kitchen")) {
    return { className: "theme-teal", icon: Sparkles };
  }
  return THEME_PALETTE[index % THEME_PALETTE.length];
}

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

export default function LocationServicesClient({
  locationSlug,
}: {
  locationSlug: string;
}) {
  const locationName = useMemo(() => formatLocationName(locationSlug), [locationSlug]);
  const [services, setServices] = useState<ServiceCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchLocationPages() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/seo-pages?status=published&locationSlug=${encodeURIComponent(locationSlug)}&limit=100`,
          { cache: "no-store" }
        );

        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.success && Array.isArray(json.data)) {
            setServices(json.data);
          }
        }
      } catch (err) {
        console.error("Error fetching location services:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchLocationPages();
    return () => {
      isMounted = false;
    };
  }, [locationSlug]);

  return (
    <div className="locations-page-wrapper">
      <div className="locations-container">
        {/* Centered Breadcrumb Pill */}
        <div className="locations-breadcrumb-wrap">
          <nav className="locations-breadcrumb">
            <Link href="/locations">Locations</Link>
            <span className="locations-breadcrumb-sep">/</span>
            <span className="locations-breadcrumb-current">{locationName}</span>
          </nav>
        </div>

        {/* Hero Header (Screenshot 3 styling: "IT Services in Amsterdam" -> "Repair Services in Patna") */}
        <div className="locations-hero-header">
          <div className="locations-hero-badge">
            <MapPin size={14} /> Doorstep Services in {locationName}
          </div>

          <h1 className="locations-hero-title">Repair Services in {locationName}</h1>

          <p className="locations-hero-desc">
            We deliver enterprise-grade, certified doorstep home appliance repair solutions to residents and businesses in {locationName}.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="service-cards-grid">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="service-dir-card theme-blue"
                style={{ opacity: 0.6, pointerEvents: "none" }}
              >
                <div>
                  <div className="service-dir-icon-wrap" style={{ background: "#f1f5f9" }} />
                  <div
                    style={{
                      height: "22px",
                      background: "#f1f5f9",
                      borderRadius: "6px",
                      marginBottom: "12px",
                      width: "70%",
                    }}
                  />
                  <div
                    style={{
                      height: "14px",
                      background: "#f1f5f9",
                      borderRadius: "4px",
                      marginBottom: "8px",
                      width: "100%",
                    }}
                  />
                  <div
                    style={{
                      height: "14px",
                      background: "#f1f5f9",
                      borderRadius: "4px",
                      width: "60%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Service Cards (ONLY published pages from DB) */}
        {!loading && services.length > 0 && (
          <div className="service-cards-grid">
            {services.map((item, idx) => {
              const theme = getThemeByService(item.serviceName, idx);
              const IconComponent = theme.icon;
              const cardTitle = `${item.serviceName} in ${item.locationName || locationName}`;

              return (
                <motion.div
                  key={item.slug || item.id || idx}
                  custom={idx}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className={`service-dir-card ${theme.className}`}
                >
                  <div>
                    {/* Service Icon Box (Screenshot 3 pastel icon box with glow) */}
                    <div className="service-dir-icon-wrap">
                      <IconComponent size={24} />
                    </div>

                    {/* Card Title (Clean 2-line title) */}
                    <h2 className="service-dir-title">{cardTitle}</h2>

                    {/* Excerpt / Description (Concise 2-line clamp) */}
                    <p className="service-dir-desc">
                      {item.heroDescription ||
                        `Professional doorstep repair and complete maintenance in ${locationName} with 30-day service warranty.`}
                    </p>
                  </div>

                  {/* Bottom CTA Link (Screenshot 3 matching) */}
                  <div className="service-dir-footer">
                    <Link href={`/${item.slug}`} className="service-dir-link">
                      <span>View Details & Pricing</span>
                      <ArrowRight size={15} />
                    </Link>

                    <a
                      href="tel:+919304415657"
                      className="service-dir-call-btn"
                      title="Call Helpline"
                    >
                      <Phone size={15} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Empty State when no services are published for this location */}
        {!loading && services.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "54px 24px",
              background: "#ffffff",
              borderRadius: "22px",
              border: "1px solid #e2e8f0",
              maxWidth: "520px",
              margin: "32px auto 0 auto",
              boxShadow: "0 4px 18px rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "#eff6ff",
                color: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px auto",
              }}
            >
              <Wrench size={26} />
            </div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "800",
                color: "#0f172a",
                marginBottom: "8px",
              }}
            >
              No Services Published Yet in {locationName}
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#64748b",
                lineHeight: "1.65",
                marginBottom: "24px",
              }}
            >
              We are actively adding new certified doorstep repair services in {locationName}. In the meantime, you can explore other locations or speak with our helpline team.
            </p>
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/locations"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 20px",
                  borderRadius: "12px",
                  background: "#2563eb",
                  color: "#ffffff",
                  fontSize: "13.5px",
                  fontWeight: "700",
                  textDecoration: "none",
                }}
              >
                View All Locations
              </Link>
              <a
                href="tel:+919304415657"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 20px",
                  borderRadius: "12px",
                  background: "#f1f5f9",
                  color: "#0f172a",
                  fontSize: "13.5px",
                  fontWeight: "700",
                  textDecoration: "none",
                }}
              >
                <Phone size={14} /> +91-9304415657
              </a>
            </div>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="seo-promo-banner" style={{ marginTop: "54px" }}>
          <div>
            <h3>Need Instant Repair Assistance in {locationName}?</h3>
            <p>Our background-verified technician is nearby and can reach your doorstep within 60 minutes.</p>
          </div>

          <div className="seo-landing-btn-row">
            <a href="tel:+919304415657" className="seo-btn-primary">
              <Phone size={15} /> +91-9304415657
            </a>
            <Link href="/locations" className="seo-btn-secondary">
              Other Locations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
