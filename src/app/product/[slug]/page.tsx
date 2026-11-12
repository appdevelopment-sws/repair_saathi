import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicesData, ServiceItem } from "@/data/servicesData";
import ProductBookingClient from "./ProductBookingClient";
import RefrigeratorSeoContent from "@/components/RefrigeratorSeoContent";
import WashingMachineSeoContent from "@/components/WashingMachineSeoContent";
import AcRepairSeoContent from "@/components/AcRepairSeoContent";
import WindowAcSeoContent from "@/components/WindowAcSeoContent";
import ChimneyRepairSeoContent from "@/components/ChimneyRepairSeoContent";
import MicrowaveRepairSeoContent from "@/components/MicrowaveRepairSeoContent";
import WaterCoolerSeoContent from "@/components/WaterCoolerSeoContent";
import GeyserRepairSeoContent from "@/components/GeyserRepairSeoContent";

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found | Repair Saathi" };

  const isFridge = slug === "refrigerator-service-in-patna";
  const isWashingMachine = slug === "washing-machine-repair-service-in-patna";
  const isAc = slug === "ac-repair-in-patna";
  const isWindowAc = slug === "window-ac-service-in-patna";
  const isChimney = slug === "kitchen-chimney-repair-in-patna";
  const isMicrowave = slug === "microwave-repair-in-patna";
  const isWaterCooler = slug === "water-cooler-services";
  const isGeyser = slug === "geyser-repair-in-patna";

  const title = isFridge
    ? "Fridge Repair in Patna | Fridge Technician Near Me | Repair Saathi"
    : isWashingMachine
    ? "Washing Machine Repair Patna | Washing Machine Repair Near Me | Repair Saathi"
    : isAc
    ? "Trusted AC Service in Patna | AC Servicing Near Me | Split & Window AC Repair"
    : isWindowAc
    ? "Fast & Reliable Window AC Repair Services in Patna | Repair Saathi"
    : isChimney
    ? "Kitchen Chimney Repair in Patna | Fast Service at Home"
    : isMicrowave
    ? "Microwave Repair in Patna | Fast & Affordable Doorstep Service | RepairSaathi"
    : isWaterCooler
    ? "Water Cooler Repair & Service in Patna | Repair Saathi"
    : isGeyser
    ? "Geyser Service and Repair in Patna | Doorstep Water Heater Repair Near You"
    : `${service.title} | Doorstep Service | Repair Saathi`;

  const description = isFridge
    ? "Top-rated fridge repair in Patna by skilled fridge technicians. Same-day doorstep refrigerator repair near me for LG, Samsung, Whirlpool with transparent pricing."
    : isWashingMachine
    ? "Expert doorstep washing machine repair in Patna for front-load, top-load & semi-automatic models. Fast same-day service by verified technicians across Patna."
    : isAc
    ? "Trusted AC service in Patna. Expert Split and Window AC repair, gas refilling, jet cleaning & installation near you. Same-day doorstep support across Patna."
    : isWindowAc
    ? "Professional window AC repair and service across Patna with trained technicians, transparent pricing, and fast doorstep support. Book same-day service."
    : isChimney
    ? "Looking for Kitchen Chimney Repair in Patna? Fast, reliable chimney repair, cleaning & service at your doorstep with expert technicians. Book today!"
    : isMicrowave
    ? "Microwave Repair in Patna by expert technicians. Fast and affordable doorstep microwave oven repair for solo, grill, convection models from all brands."
    : isWaterCooler
    ? "Expert Water Cooler Repair & Service in Patna for homes, offices, schools, and hospitals. Fast, reliable, and affordable doorstep service by Repair Saathi."
    : isGeyser
    ? "Looking for reliable geyser service and repair in Patna? We provide doorstep water heater repair, installation, and maintenance by expert technicians."
    : service.description;

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: `https://repairsaathi.in/product/${service.slug}/`,
    },
    openGraph: {
      title,
      description,
      url: `https://repairsaathi.in/product/${service.slug}/`,
      type: "website",
      images: [
        {
          url: service.image.startsWith("http")
            ? service.image
            : `https://repairsaathi.in${service.image}`,
          alt: title,
        },
        {
          url: "https://repairsaathi.in/images/og-repair-saathi.png",
          width: 1200,
          height: 630,
          type: "image/png",
          alt: "Repair Saathi - Home Appliance Repair in Patna",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        service.image.startsWith("http")
          ? service.image
          : `https://repairsaathi.in${service.image}`,
      ],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div style={{ padding: "40px 0 60px 0" }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "24px" }}>
          <Link href="/" style={{ color: "#0f172a", fontWeight: "700" }}>
            Home
          </Link>{" "}
          /{" "}
          <Link
            href="/home-appliance-repair-services-patna/"
            style={{ color: "#0f172a", fontWeight: "700" }}
          >
            All Services
          </Link>{" "}
          / <span style={{ color: "#d99b1a" }}>{service.title}</span>
        </div>

        {/* Product Card Overview */}
        <div className="product-detail-overview">
          {/* Image */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 3",
              borderRadius: "16px",
              overflow: "hidden",
              background: "#0f172a",
            }}
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              priority
              className="content-img"
            />
            {service.discountBadge && (
              <span className="service-card-badge" style={{ fontSize: "13px", padding: "4px 12px" }}>
                {service.discountBadge}
              </span>
            )}
          </div>

          {/* Details */}
          <div>
            <span className="section-tag">{service.category}</span>
            <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a", margin: "10px 0 12px 0" }}>
              {service.title}
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <span style={{ color: "#e5a820", fontWeight: "800" }}>
                {"★".repeat(Math.floor(service.rating))}
              </span>
              <span style={{ fontSize: "14px", color: "#64748b", fontWeight: "700" }}>
                {service.rating} ({service.reviewsCount} verified customer reviews in Patna)
              </span>
            </div>

            <div
              style={{
                background: "#f8fafc",
                padding: "16px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "baseline",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "700", textTransform: "uppercase" }}>
                Visiting &amp; Diagnosis:
              </span>
              <span style={{ fontSize: "28px", fontWeight: "900", color: "#1e293b" }}>
                {service.price}
              </span>
              {service.originalPrice && (
                <span
                  style={{
                    fontSize: "16px",
                    color: "#94a3b8",
                    textDecoration: "line-through",
                    fontWeight: "600",
                  }}
                >
                  {service.originalPrice}
                </span>
              )}
            </div>

            <p style={{ color: "#475569", lineHeight: "1.7", fontSize: "15px", marginBottom: "24px" }}>
              {service.description}
            </p>

            {/* Inclusions & Features */}
            <div style={{ marginBottom: "28px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", marginBottom: "10px" }}>
                Service Key Highlights:
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                {service.features.map((feat, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#334155" }}>
                    <span style={{ color: "#16a34a", fontWeight: "900" }}>✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Client interactive booking trigger */}
            <ProductBookingClient serviceId={service.id} serviceTitle={service.title} />
          </div>
        </div>

        {/* What is Included & Service Assurance */}
        <div className="product-detail-inc-exc">
          {/* Inclusions */}
          <div
            style={{
              background: "#ffffff",
              padding: "28px",
              borderRadius: "16px",
              border: "1px solid var(--border-color)",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#15803d", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>✓</span> What&apos;s Included in this Service
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {service.inclusions.map((inc, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "#334155", lineHeight: "1.5" }}>
                  <span style={{ color: "#16a34a", fontWeight: "900" }}>•</span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Assurance */}
          <div
            style={{
              background: "#ffffff",
              padding: "28px",
              borderRadius: "16px",
              border: "1px solid var(--border-color)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "15px", color: "#334155", lineHeight: "1.8", margin: 0, fontWeight: "500" }}>
              Expert doorstep service for AC, Refrigerator, Washing Machine, RO &amp; Microwave. Certified technicians arrive within 30 minutes with genuine spare parts, clear upfront pricing &amp; upto 90-day warranty.
            </p>
          </div>
        </div>

        {/* Detailed SEO Content Section for Refrigerator Repair in Patna */}
        {slug === "refrigerator-service-in-patna" && <RefrigeratorSeoContent />}

        {/* Detailed SEO Content Section for Washing Machine Repair in Patna */}
        {slug === "washing-machine-repair-service-in-patna" && <WashingMachineSeoContent />}

        {/* Detailed SEO Content Section for AC Repair & Service in Patna */}
        {slug === "ac-repair-in-patna" && <AcRepairSeoContent />}

        {/* Detailed SEO Content Section for Window AC Services in Patna */}
        {slug === "window-ac-service-in-patna" && <WindowAcSeoContent />}

        {/* Detailed SEO Content Section for Kitchen Chimney Repair in Patna */}
        {slug === "kitchen-chimney-repair-in-patna" && <ChimneyRepairSeoContent />}

        {/* Detailed SEO Content Section for Microwave Repair in Patna */}
        {slug === "microwave-repair-in-patna" && <MicrowaveRepairSeoContent />}

        {/* Detailed SEO Content Section for Water Cooler & RO Services in Patna */}
        {slug === "water-cooler-services" && <WaterCoolerSeoContent />}

        {/* Detailed SEO Content Section for Geyser Service and Repair in Patna */}
        {slug === "geyser-repair-in-patna" && <GeyserRepairSeoContent />}
      </div>
    </div>
  );
}
