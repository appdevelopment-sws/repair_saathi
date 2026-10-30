"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Calendar,
  User,
  CheckCircle2,
  Share2,
  Sparkles,
  Phone,
  Wrench,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
import { BlogPost, getCategoryTheme } from "@/data/blogsData";
import BookingModal from "@/components/BookingModal";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingDefaultService, setBookingDefaultService] = useState("ac-repair");
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(`https://repairsaathi.in/home-appliance-repair-blog/${post.slug}/`);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, [post.slug]);

  const mapCategoryToServiceId = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes("ac")) return "ac-repair";
    if (lower.includes("wash")) return "washing-machine-repair";
    if (lower.includes("fridge") || lower.includes("refrigerator")) return "refrigerator-repair";
    if (lower.includes("geyser")) return "geyser-repair";
    if (lower.includes("chimney")) return "kitchen-chimney-repair";
    if (lower.includes("microwave") || lower.includes("oven")) return "microwave-repair";
    return "ac-repair";
  };

  const handleOpenBooking = (category?: string) => {
    const srv = mapCategoryToServiceId(category || post.category);
    setBookingDefaultService(srv);
    setBookingModalOpen(true);
  };

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // fallback
    }
  };

  const theme = getCategoryTheme(post.category);

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(`${post.title} - Repair Saathi Patna`);
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;

  const patnaAreas = [
    "Danapur",
    "Saguna More",
    "Bailey Road",
    "Boring Road",
    "Kankarbagh",
    "Phulwari Sharif",
    "Khagaul",
    "Ashiana Nagar",
    "Raja Bazar",
    "Patliputra",
    "Rajendra Nagar",
  ];

  return (
    <main className="blog-detail-page-wrapper">
      <div className="blog-detail-container">
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="blog-detail-breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href="/home-appliance-repair-blog/">Appliance Repair Blog</Link>
          <span className="sep">/</span>
          <span className="current" title={post.title}>
            {post.title}
          </span>
        </nav>

        {/* HERO SECTION */}
        <header className="blog-detail-hero">
          <div className="blog-detail-pills-row">
            <span
              className="blog-detail-cat-pill"
              style={{
                backgroundColor: theme.bg,
                color: theme.color,
                borderColor: theme.border,
              }}
            >
              {post.category}
            </span>
            <span className="blog-detail-read-pill">
              <Clock size={13} /> {post.readTime}
            </span>
            <span className="blog-detail-date-pill">
              <Calendar size={13} /> {post.date}
            </span>
          </div>

          {/* SINGLE AUTHORITATIVE H1 FOR THIS PAGE */}
          <h1 className="blog-detail-title">{post.title}</h1>

          {/* AUTHOR & SOCIAL SHARE BAR */}
          <div className="blog-detail-meta-bar">
            <div className="blog-detail-author">
              <div className="blog-detail-author-avatar">
                <User size={20} />
              </div>
              <div className="blog-detail-author-info">
                <div className="blog-detail-author-name">
                  <span>{post.author}</span>
                  <span className="verified-badge">
                    <CheckCircle2 size={12} /> Verified Technician
                  </span>
                </div>
                <span className="blog-detail-author-sub">
                  Repair Saathi Technical Center • Serving Patna, Danapur &amp; Saguna More
                </span>
              </div>
            </div>

            {/* Share Group */}
            <div className="blog-detail-share-group">
              <span className="share-label">Share Guide:</span>
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="share-icon-btn whatsapp"
                title="Share on WhatsApp"
                aria-label="Share on WhatsApp"
              >
                <WhatsAppIcon size={16} />
              </a>
              <a
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="share-icon-btn facebook"
                title="Share on Facebook"
                aria-label="Share on Facebook"
              >
                <Share2 size={16} />
              </a>
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="share-icon-btn twitter"
                title="Share on X (Twitter)"
                aria-label="Share on X"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <button
                type="button"
                onClick={handleCopyLink}
                className="share-icon-btn copy"
                title="Copy Article Link"
                aria-label="Copy Article Link"
              >
                {copied ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* FEATURED HERO IMAGE */}
          <div className="blog-detail-featured-media">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="blog-detail-featured-img"
            />
          </div>
        </header>

        {/* 2-COLUMN MAIN CONTENT & STICKY SIDEBAR GRID */}
        <div className="blog-detail-grid">
          {/* LEFT: ARTICLE CONTENT */}
          <article className="blog-detail-article">
            {/* Excerpt Lead Paragraph */}
            {post.excerpt && (
              <p className="article-lead-paragraph">{post.excerpt}</p>
            )}

            {/* Rich Formatted Content */}
            {typeof post.content === "string" ? (
              <div
                className="modal-rich-html-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <div className="modal-paragraphs-wrap">
                {Array.isArray(post.content) &&
                  post.content.map((paragraph, pIdx) => {
                    const isNumbered = /^[0-9]+\.\s/.test(paragraph);
                    const isBullet = paragraph.startsWith("- ");
                    const isHeading =
                      paragraph.endsWith(":") ||
                      paragraph.includes("Warning Signs") ||
                      paragraph.includes("Frequent Geyser Faults") ||
                      paragraph.includes("Top Reasons") ||
                      paragraph.includes("Why Scheduled") ||
                      paragraph.includes("Why Choose Doorstep") ||
                      paragraph.includes("Key AC Issues") ||
                      paragraph.includes("Professional AC Jet Service") ||
                      paragraph.includes("Why Traditional Local") ||
                      paragraph.includes("The Repair Saathi Advantage") ||
                      paragraph.includes("Safety First");

                    if (isHeading) {
                      return (
                        <h2 key={pIdx} className="article-section-heading">
                          <Wrench size={18} className="heading-icon" />
                          <span>{paragraph}</span>
                        </h2>
                      );
                    }

                    if (isNumbered) {
                      const number = paragraph.match(/^[0-9]+/)?.[0] || "•";
                      const cleanText = paragraph.replace(/^[0-9]+\.\s*/, "");
                      return (
                        <div key={pIdx} className="article-step-card">
                          <div className="step-number">{number}</div>
                          <div className="step-text">{cleanText}</div>
                        </div>
                      );
                    }

                    if (isBullet) {
                      return (
                        <div key={pIdx} className="article-bullet-item">
                          <span className="bullet-dot">•</span>
                          <span>{paragraph.replace(/^-\s*/, "")}</span>
                        </div>
                      );
                    }

                    return (
                      <p key={pIdx} className="article-p">
                        {paragraph}
                      </p>
                    );
                  })}
              </div>
            )}

            {/* Expert Pro Tip Callout Box */}
            <div className="modal-expert-tip-box">
              <div className="tip-header">
                <Sparkles size={17} />
                <span>Repair Saathi Technician Pro Tip</span>
              </div>
              <p>
                Never ignore small grinding noises, burning smells, or minor water dripping from your appliances.
                Over 85% of major compressor and motor breakdowns in Patna could have been prevented with a quick timely checkup before total breakdown.
              </p>
            </div>

            {/* In-Article Doorstep Booking Banner */}
            <div className="modal-booking-banner">
              <div className="banner-text">
                <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginBottom: "6px" }}>
                  Need expert doorstep service for this appliance?
                </h3>
                <p>
                  Our verified Patna technicians arrive equipped with multi-meters, genuine spare parts, and offer a 90-day post-service warranty.
                </p>
              </div>
              <div className="banner-ctas">
                <button
                  type="button"
                  onClick={() => handleOpenBooking()}
                  className="banner-book-btn"
                >
                  ⚡ Instant Doorstep Booking
                </button>
                <a href="tel:+919304415657" className="banner-call-btn">
                  <Phone size={14} /> +91-9304415657
                </a>
              </div>
            </div>

            {/* Bottom Author Bio Card */}
            <div className="article-author-bio-card">
              <div className="author-bio-avatar">
                {post.author.charAt(0)}
              </div>
              <div className="author-bio-text">
                <h4>Written by {post.author}</h4>
                <p>
                  Senior Diagnostic Technician at Repair Saathi. Specializing in inverter ACs, frost-free refrigeration, and high-efficiency home appliances across Patna with over 7+ years of hands-on field experience.
                </p>
              </div>
            </div>
          </article>

          {/* RIGHT: STICKY SIDEBAR */}
          <aside className="blog-detail-sidebar">
            {/* Quick Booking Widget */}
            <div className="sidebar-card booking-highlight">
              <span className="sidebar-badge">⚡ SAME-DAY VISIT IN PATNA</span>
              <h3 className="sidebar-card-title">Book Doorstep Inspection</h3>
              <p className="sidebar-card-desc">
                Verified technician arrives at your doorstep in 30-45 minutes across all Patna areas.
              </p>

              <div className="sidebar-perks">
                <div className="sidebar-perk-item">
                  <span className="perk-icon">⏱️</span>
                  <span>30-45 Mins Arrival</span>
                </div>
                <div className="sidebar-perk-item">
                  <span className="perk-icon">🛡️</span>
                  <span>90-Day Service Warranty</span>
                </div>
                <div className="sidebar-perk-item">
                  <span className="perk-icon">👨‍🔧</span>
                  <span>Verified &amp; Background Checked</span>
                </div>
                <div className="sidebar-perk-item">
                  <span className="perk-icon">💰</span>
                  <span>Fixed Rates From ₹199</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenBooking()}
                className="sidebar-btn-book"
              >
                <span>⚡ Book Repair Online</span>
              </button>

              <a href="tel:+919304415657" className="sidebar-btn-call">
                <Phone size={15} />
                <span>Call +91-9304415657</span>
              </a>

              <a
                href={`https://wa.me/919304415657?text=Hi%20Repair%20Saathi,%20I%20read%20your%20article%20on%20${encodeURIComponent(post.title)}%20and%20need%20service`}
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-btn-wa"
              >
                <WhatsAppIcon size={16} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Service Locations Card */}
            <div className="sidebar-card">
              <h4 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                <MapPin size={16} color="#d97706" />
                <span>Doorstep Service Across Patna</span>
              </h4>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                Our technicians are stationed locally to reach you within minutes:
              </p>
              <div className="locations-grid">
                {patnaAreas.map((area) => (
                  <span key={area} className="location-tag">
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Guides Mini List */}
            {relatedPosts.length > 0 && (
              <div className="sidebar-card">
                <h4 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>
                  Related Diagnostic Guides
                </h4>
                <div className="sidebar-mini-list">
                  {relatedPosts.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/home-appliance-repair-blog/${r.slug}/`}
                      className="sidebar-mini-item"
                    >
                      <div className="sidebar-mini-thumb">
                        <Image
                          src={r.image}
                          alt={r.title}
                          fill
                          sizes="56px"
                        />
                      </div>
                      <div>
                        <div className="sidebar-mini-title">{r.title}</div>
                        <div className="sidebar-mini-meta">
                          <Clock size={10} /> {r.readTime}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* RELATED ARTICLES FULL GRID */}
        {relatedPosts.length > 0 && (
          <section className="blog-detail-related-section">
            <div className="related-section-header">
              <h2 className="related-section-title">More Appliance Repair Guides</h2>
              <Link href="/home-appliance-repair-blog/" className="related-view-all">
                <span>View All Articles</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="blog-detail-related-grid">
              {relatedPosts.map((r) => {
                const rTheme = getCategoryTheme(r.category);
                return (
                  <Link
                    key={r.slug}
                    href={`/home-appliance-repair-blog/${r.slug}/`}
                    className="blog-card"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="blog-card-media">
                      <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="blog-card-img"
                      />
                      <div className="blog-card-overlay" />
                      <span
                        className="card-category-tag"
                        style={{
                          backgroundColor: rTheme.bg,
                          color: rTheme.color,
                          borderColor: rTheme.border,
                        }}
                      >
                        {r.category}
                      </span>
                      <span className="card-read-time">
                        <Clock size={11} /> {r.readTime}
                      </span>
                    </div>

                    <div className="blog-card-body">
                      <div className="card-meta-line">
                        <span className="card-author">
                          <User size={12} /> {r.author}
                        </span>
                        <span>•</span>
                        <span className="card-date">
                          <Calendar size={12} /> {r.date}
                        </span>
                      </div>

                      <h3 className="card-title">{r.title}</h3>
                      <p className="card-excerpt">{r.excerpt}</p>

                      <div className="card-footer">
                        <span className="card-read-link">
                          Read Guide <ArrowRight size={14} className="arrow-icon" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultService={bookingDefaultService}
      />
    </main>
  );
}

