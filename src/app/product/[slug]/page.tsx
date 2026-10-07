import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicesData, ServiceItem } from "@/data/servicesData";
import ProductBookingClient from "./ProductBookingClient";

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

  return {
    title: `${service.title} | Doorstep Service | Repair Saathi`,
    description: service.description,
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
        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-md)",
            padding: "36px",
            display: "grid",
            gridTemplateColumns: "1.1fr 1.3fr",
            gap: "40px",
            alignItems: "start",
            marginBottom: "48px",
          }}
        >
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

        {/* What is Included & What is Excluded */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "28px",
            marginBottom: "40px",
          }}
        >
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

          {/* Exclusions */}
          <div
            style={{
              background: "#ffffff",
              padding: "28px",
              borderRadius: "16px",
              border: "1px solid var(--border-color)",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#b91c1c", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>✕</span> What&apos;s Excluded / Extra
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {service.exclusions.map((exc, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "#475569", lineHeight: "1.5" }}>
                  <span style={{ color: "#ef4444", fontWeight: "900" }}>•</span>
                  <span>{exc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
