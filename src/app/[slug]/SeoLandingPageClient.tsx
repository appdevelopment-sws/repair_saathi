"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  ShieldCheck,
  CheckCircle,
  Phone,
  ChevronDown,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Clock,
  Award,
  Tag,
  CheckCircle2,
} from "lucide-react";
import BookingModal from "@/components/BookingModal";

interface ContentSection {
  title: string;
  badge?: string;
  content: string;
  bulletPoints?: string[];
  image?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface PageData {
  slug: string;
  serviceName: string;
  locationName: string;
  h1Heading: string;
  heroDescription?: string;
  template?: "grid" | "timeline" | "card" | "split" | "article" | "blog" | string;
  contentSections?: ContentSection[];
  faqs?: FaqItem[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogImage?: string;
}

export default function SeoLandingPageClient({ page }: { page: PageData }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const {
    serviceName = "Service",
    locationName = "Patna",
    h1Heading = "",
    heroDescription = "",
    template = "grid",
    contentSections = [],
    faqs = [],
  } = page;

  // Resolve best featured hero image
  const resolveHeroImage = () => {
    if (page.ogImage && page.ogImage.trim()) {
      return page.ogImage.trim();
    }
    const s = (serviceName || "").toLowerCase();
    if (s.includes("television") || s.includes("tv") || s.includes("led")) {
      return "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80";
    }
    if (s.includes("ac") || s.includes("air conditioner")) return "/images/ac-repair-sec.webp";
    if (s.includes("refrigerator") || s.includes("fridge")) return "/images/freeze-repair-dark.webp";
    if (s.includes("wash")) return "/images/washing-machine-sec.webp";
    if (s.includes("geyser")) return "/images/geyser-repair.webp";
    if (s.includes("chimney")) return "/images/chimney-repair.webp";
    if (s.includes("microwave")) return "/images/microwave-repair.webp";
    if (s.includes("purifier") || s.includes("ro")) return "/images/water-purifier.webp";
    return "/images/ac-repair-sec.webp";
  };

  const featuredHeroImage = resolveHeroImage();

  const metaKeywordsList = page.metaKeywords
    ? page.metaKeywords.split(",").map((k) => k.trim()).filter(Boolean)
    : [
        `${serviceName} in ${locationName}`,
        `best ${serviceName.toLowerCase()} in ${locationName}`,
        `doorstep ${serviceName.toLowerCase()} ${locationName}`,
        `verified ${serviceName.toLowerCase()} technician`,
      ];

  // JSON-LD structured data for Google Search SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        name: "Repair Saathi",
        url: `https://repairsaathi.in/${page.slug}`,
        description: heroDescription,
        telephone: "+91-9304415657",
        image: featuredHeroImage,
        areaServed: {
          "@type": "AdministrativeArea",
          name: locationName,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: locationName,
          addressRegion: "Bihar",
          addressCountry: "IN",
        },
        priceRange: "₹₹",
      },
      ...(faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: f.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="locations-page-wrapper">
        <div className="locations-container">
          {/* Breadcrumb Navigation */}
          <div className="locations-breadcrumb-wrap" style={{ justifyContent: "flex-start", marginBottom: "20px" }}>
            <nav className="locations-breadcrumb">
              <Link href="/">Home</Link>
              <span className="locations-breadcrumb-sep">/</span>
              <Link href="/locations">Locations</Link>
              <span className="locations-breadcrumb-sep">/</span>
              <Link href={`/locations/${locationName.toLowerCase().replace(/\s+/g, "-")}`}>
                {locationName}
              </Link>
              <span className="locations-breadcrumb-sep">/</span>
              <span className="locations-breadcrumb-current">{serviceName}</span>
            </nav>
          </div>

          {/* Hero Section - Comprehensive 2-Column Banner with Featured Image */}
          <header className="seo-landing-hero">
            <div className="seo-hero-layout-grid">
              <div className="seo-hero-text-col">
                <div className="seo-landing-hero-badge">
                  <MapPin size={14} /> Doorstep Service in {locationName}
                </div>

                <h1 className="seo-landing-hero-title">
                  {h1Heading || `Best ${serviceName} in ${locationName}`}
                </h1>

                <p className="seo-landing-hero-desc">{heroDescription}</p>

                {/* Badges row */}
                <div className="seo-landing-pills-row">
                  <div className="seo-landing-pill">
                    <ShieldCheck size={16} color="#10b981" />
                    <span>30-Day Warranty</span>
                  </div>
                  <div className="seo-landing-pill">
                    <Clock size={16} color="#3b82f6" />
                    <span>60-Min Doorstep Arrival</span>
                  </div>
                  <div className="seo-landing-pill">
                    <Award size={16} color="#f59e0b" />
                    <span>Verified Experts</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="seo-landing-btn-row">
                  <button
                    type="button"
                    onClick={() => setBookingOpen(true)}
                    className="seo-btn-primary"
                  >
                    <Sparkles size={16} /> Book Technician Now
                  </button>

                  <a href="tel:+919304415657" className="seo-btn-secondary">
                    <Phone size={15} color="#10b981" /> Call Helpline
                  </a>
                </div>
              </div>

              {/* Hero Featured Media Banner */}
              <div className="seo-hero-media-col">
                <div className="seo-hero-image-card">
                  <img
                    src={featuredHeroImage}
                    alt={h1Heading || `${serviceName} in ${locationName}`}
                    className="seo-hero-featured-img"
                    loading="eager"
                  />
                  <div className="seo-hero-image-badge">
                    <ShieldCheck size={14} color="#10b981" />
                    <span>Verified Technician • 100% Genuine Spare Parts</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Search Keywords Highlight Bar */}
          {metaKeywordsList.length > 0 && (
            <div className="seo-tags-bar">
              <span className="seo-tags-label">Popular Searches in {locationName}:</span>
              <div className="seo-tags-list">
                {metaKeywordsList.map((kw, ki) => (
                  <span key={ki} className="seo-tag-item">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Content Sections - Rich Editorial Long-Form Article */}
          <div>
            {/* 1. ARTICLE / GRID TEMPLATE (Full In-Depth Blog Guide Flow) */}
            {(template === "grid" || template === "article" || template === "blog" || !template) && (
              <div className="seo-article-guide">
                {contentSections.map((sec, idx) => (
                  <React.Fragment key={idx}>
                    <article className="seo-article-block">
                      <div className="seo-article-header">
                        {sec.badge && (
                          <span className="seo-section-badge">{sec.badge}</span>
                        )}
                        <h2 className="seo-article-heading">{sec.title}</h2>
                      </div>

                      {/* Optional Section Media Image */}
                      {sec.image && (
                        <div className="seo-section-media-wrap">
                          <img
                            src={sec.image}
                            alt={sec.title}
                            className="seo-section-media-img"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Rich Multi-Paragraph Body Text */}
                      <div className="seo-article-content-body">
                        {String(sec.content || "")
                          .split(/\n\n+/)
                          .map((para, pi) => (
                            <p key={pi} className="seo-article-body">
                              {para}
                            </p>
                          ))}
                      </div>

                      {/* Highlighted Checklist Bullets */}
                      {Array.isArray(sec.bulletPoints) && sec.bulletPoints.length > 0 && (
                        <div className="seo-article-bullets-card">
                          <h4>Key Highlights &amp; Quality Assurances</h4>
                          <ul className="seo-article-bullets-list">
                            {sec.bulletPoints.map((bp, bi) => (
                              <li key={bi}>
                                <CheckCircle size={18} />
                                <span>{bp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Pro Tip Callout Box for Advice/Tips Sections */}
                      {(sec.badge?.includes("TIP") || sec.title?.toLowerCase().includes("tip") || idx === 4) && (
                        <div className="seo-article-protip">
                          <Sparkles size={20} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
                          <div className="seo-article-protip-content">
                            <strong>Expert Recommendation for {locationName}:</strong> Routine maintenance every 6 months prevents major component failure and extends appliance lifespan by up to 40%. Always ensure an authorized invoice is provided with warranty details.
                          </div>
                        </div>
                      )}
                    </article>

                    {/* Mid-Article Conversion CTA Card between sections */}
                    {idx === 2 && (
                      <div className="seo-mid-article-cta">
                        <div>
                          <h3>Need Fast {serviceName} in {locationName}?</h3>
                          <p>Our background-verified technician is nearby and ready to reach your doorstep within 60 minutes.</p>
                        </div>
                        <div className="seo-landing-btn-row">
                          <button
                            type="button"
                            onClick={() => setBookingOpen(true)}
                            className="seo-btn-primary"
                          >
                            <Sparkles size={16} /> Book Online Now
                          </button>
                          <a
                            href="tel:+919304415657"
                            className="seo-btn-secondary"
                            style={{ background: "#ffffff", borderColor: "#e2e8f0" }}
                          >
                            <Phone size={15} color="#10b981" /> Call Helpline
                          </a>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* 2. TIMELINE TEMPLATE */}
            {template === "timeline" && (
              <div className="seo-timeline-wrap">
                {contentSections.map((sec, idx) => (
                  <div key={idx} className="seo-timeline-item">
                    <span className="seo-timeline-dot" />
                    <div className="seo-section-card">
                      {sec.badge && (
                        <span className="seo-section-badge">{sec.badge}</span>
                      )}
                      <h2 className="seo-section-title">{sec.title}</h2>
                      {sec.image && (
                        <div className="seo-section-media-wrap" style={{ margin: "14px 0" }}>
                          <img src={sec.image} alt={sec.title} className="seo-section-media-img" loading="lazy" />
                        </div>
                      )}
                      <div className="seo-article-content-body">
                        {String(sec.content || "")
                          .split(/\n\n+/)
                          .map((para, pi) => (
                            <p key={pi} className="seo-article-body" style={{ fontSize: "14px", lineHeight: "1.7" }}>
                              {para}
                            </p>
                          ))}
                      </div>
                      {Array.isArray(sec.bulletPoints) && (
                        <ul className="seo-section-bullets">
                          {sec.bulletPoints.map((bp, bi) => (
                            <li key={bi}>
                              <CheckCircle size={16} />
                              <span>{bp}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3. CARD TEMPLATE */}
            {template === "card" && (
              <div className="seo-card-template-grid">
                {contentSections.map((sec, idx) => (
                  <div key={idx} className="seo-card-template-item">
                    {sec.badge && (
                      <span className="seo-section-badge">{sec.badge}</span>
                    )}
                    <h2 className="seo-section-title">{sec.title}</h2>
                    {sec.image && (
                      <div className="seo-section-media-wrap" style={{ margin: "14px 0" }}>
                        <img src={sec.image} alt={sec.title} className="seo-section-media-img" loading="lazy" />
                      </div>
                    )}
                    <div className="seo-article-content-body">
                      {String(sec.content || "")
                        .split(/\n\n+/)
                        .map((para, pi) => (
                          <p key={pi} className="seo-article-body" style={{ fontSize: "14px", lineHeight: "1.7" }}>
                            {para}
                          </p>
                        ))}
                    </div>
                    {Array.isArray(sec.bulletPoints) && (
                      <ul className="seo-section-bullets">
                        {sec.bulletPoints.map((bp, bi) => (
                          <li key={bi}>
                            <Sparkles size={15} color="#a855f7" />
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 4. SPLIT TEMPLATE */}
            {template === "split" && (
              <div style={{ marginBottom: "40px" }}>
                {contentSections.map((sec, idx) => (
                  <div key={idx} className="seo-split-row">
                    <div>
                      {sec.badge && (
                        <span className="seo-section-badge">{sec.badge}</span>
                      )}
                      <h2 className="seo-section-title">{sec.title}</h2>
                      {sec.image && (
                        <div className="seo-section-media-wrap" style={{ margin: "14px 0" }}>
                          <img src={sec.image} alt={sec.title} className="seo-section-media-img" loading="lazy" />
                        </div>
                      )}
                      <div className="seo-article-content-body">
                        {String(sec.content || "")
                          .split(/\n\n+/)
                          .map((para, pi) => (
                            <p key={pi} className="seo-article-body" style={{ fontSize: "14px", lineHeight: "1.7" }}>
                              {para}
                            </p>
                          ))}
                      </div>
                    </div>
                    <div>
                      {Array.isArray(sec.bulletPoints) && (
                        <ul className="seo-section-bullets" style={{ borderTop: "none" }}>
                          {sec.bulletPoints.map((bp, bi) => (
                            <li key={bi}>
                              <CheckCircle size={16} />
                              <span>{bp}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Fallback if no content sections */}
            {contentSections.length === 0 && (
              <div className="seo-section-card" style={{ textAlign: "center", padding: "48px 24px", marginBottom: "40px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
                  Verified Doorstep Repair in {locationName}
                </h3>
                <p style={{ fontSize: "14px", color: "#64748b", maxWidth: "600px", margin: "0 auto 20px auto" }}>
                  Book professional {serviceName} experts for doorstep service with guaranteed genuine parts and 30-day post-service warranty.
                </p>
                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="seo-btn-primary"
                >
                  <Sparkles size={16} /> Book Doorstep Service
                </button>
              </div>
            )}
          </div>

          {/* FAQ Accordion */}
          {faqs.length > 0 && (
            <section className="seo-faq-card">
              <div className="seo-faq-header">
                <HelpCircle size={24} />
                <h3>Frequently Asked Questions</h3>
              </div>

              <div className="seo-faq-list">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="seo-faq-item">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className={`seo-faq-trigger ${isOpen ? "is-open" : ""}`}
                      >
                        <span>{faq.question}</span>
                        <ChevronDown size={18} />
                      </button>

                      {isOpen && (
                        <p className="seo-faq-answer">{faq.answer}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Bottom Banner */}
          <div className="seo-promo-banner">
            <div>
              <h3>Need Emergency Appliance Repair in {locationName}?</h3>
              <p>Our background-verified technician is nearby and can reach your doorstep within 60 minutes.</p>
            </div>

            <div className="seo-landing-btn-row">
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="seo-btn-primary"
              >
                <Sparkles size={16} /> Book Online
              </button>
              <a href="tel:+919304415657" className="seo-btn-secondary">
                <Phone size={15} color="#10b981" /> Call Helpline
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultService={serviceName}
      />
    </>
  );
}
