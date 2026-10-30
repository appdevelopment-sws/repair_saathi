"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Clock,
  Calendar,
  User,
  ArrowRight,
  Phone,
  Sparkles,
  ShieldCheck,
  Wrench,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Share2,
} from "lucide-react";
import { blogsData, BlogPost } from "@/data/blogsData";
import BookingModal from "@/components/BookingModal";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function BlogClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingDefaultService, setBookingDefaultService] = useState("ac-repair");
  const [copiedSlug, setCopiedSlug] = useState(false);
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>(blogsData);

  // Fetch dynamic blogs from Backend API
  useEffect(() => {
    const fetchLiveBlogs = async () => {
      try {
        const backendBase =
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8008";
        const res = await fetch(`${backendBase}/api/blogs?status=published`, {
          cache: "no-store",
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            const apiPosts: BlogPost[] = json.data.map((item: any) => ({
              id: String(item.id),
              slug: item.slug,
              title: item.title,
              author: item.author || "Repair Saathi Technical Team",
              date: new Date(item.publishedAt || item.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }),
              readTime: item.readTime || "5 min read",
              category: item.category || "General",
              image: item.image || "/images/ac-repair-sec.webp",
              excerpt: item.excerpt || "",
              content: item.content,
              tags: Array.isArray(item.tags)
                ? item.tags
                : typeof item.tags === "string"
                ? JSON.parse(item.tags || "[]")
                : [],
              isFeatured: !!item.isFeatured,
            }));

            // Prioritize API blogs, keep unique slugs
            const apiSlugs = new Set(apiPosts.map((p) => p.slug));
            const staticRemain = blogsData.filter((p) => !apiSlugs.has(p.slug));
            setAllBlogs([...apiPosts, ...staticRemain]);
          }
        }
      } catch (err) {
        // Fallback silently to static blogsData
        console.warn("Could not fetch dynamic blogs from API, using static data:", err);
      }
    };

    fetchLiveBlogs();
  }, []);

  // Auto-open blog if ?slug= or #slug is provided in URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      const params = new URLSearchParams(window.location.search);
      const querySlug = params.get("slug") || hash;
      if (querySlug) {
        const found = allBlogs.find((b) => b.slug === querySlug);
        if (found) {
          setSelectedPost(found);
        }
      }
    }
  }, [allBlogs]);

  // Categories list with counts
  const categories = useMemo(() => {
    const list = ["All"];
    allBlogs.forEach((post) => {
      if (!list.includes(post.category)) {
        list.push(post.category);
      }
    });
    return list;
  }, [allBlogs]);

  const getCategoryCount = (cat: string) => {
    if (cat === "All") return allBlogs.length;
    return allBlogs.filter((p) => p.category === cat).length;
  };

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return allBlogs.filter((post) => {
      const contentMatches = Array.isArray(post.content)
        ? post.content.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()))
        : typeof post.content === "string"
        ? post.content.toLowerCase().includes(searchTerm.toLowerCase())
        : false;

      const matchesSearch =
        searchTerm === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contentMatches;

      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, allBlogs]);

  // Featured post (latest or first) when on "All" and no search
  const isDefaultView = selectedCategory === "All" && searchTerm.trim() === "";
  const featuredPost = isDefaultView ? filteredPosts[0] : null;
  const gridPosts = isDefaultView ? filteredPosts.slice(1) : filteredPosts;

  const handleOpenBooking = (categoryName?: string) => {
    let serviceKey = "ac-repair";
    if (categoryName?.includes("AC")) serviceKey = "ac-repair";
    else if (categoryName?.includes("Refrigerator")) serviceKey = "refrigerator-service";
    else if (categoryName?.includes("Washing")) serviceKey = "washing-machine-repair";
    else if (categoryName?.includes("Geyser")) serviceKey = "geyser-repair";
    else if (categoryName?.includes("Microwave")) serviceKey = "microwave-repair";

    setBookingDefaultService(serviceKey);
    setBookingModalOpen(true);
  };

  const handleShare = (post: BlogPost) => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}/home-appliance-repair-blog?slug=${post.slug}`;
      if (navigator.share) {
        navigator.share({
          title: post.title,
          text: post.excerpt,
          url: shareUrl,
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(shareUrl);
        setCopiedSlug(true);
        setTimeout(() => setCopiedSlug(false), 2000);
      }
    }
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case "AC Service":
        return { bg: "#e0f2fe", color: "#0369a1", border: "#bae6fd" };
      case "Refrigerator":
        return { bg: "#ecfeff", color: "#0e7490", border: "#a5f3fc" };
      case "Washing Machine":
        return { bg: "#eef2ff", color: "#4338ca", border: "#c7d2fe" };
      case "Geyser Service":
        return { bg: "#fff7ed", color: "#c2410c", border: "#ffedd5" };
      default:
        return { bg: "#fef3c7", color: "#b45309", border: "#fde68a" };
    }
  };

  return (
    <main className="blog-page-wrapper">
      <div className="container">
        {/* HERO HEADER */}
        <section className="blog-hero-header">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="blog-hero-title"
          >
            Home Appliance Repair &amp; Maintenance Guides
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="blog-hero-desc"
          >
            Expert diagnostic tips, cost-saving maintenance guides, and safety recommendations written by certified Repair Saathi technicians serving Danapur, Saguna More, and all of Patna.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="blog-hero-stats"
          >
            <div className="stat-pill">
              <BookOpen size={14} />
              <span>6+ Practical Guides</span>
            </div>
            <div className="stat-pill">
              <ShieldCheck size={14} />
              <span>100% Genuine Advice</span>
            </div>
            <div className="stat-pill">
              <Wrench size={14} />
              <span>Doorstep Fix in 30 Mins</span>
            </div>
          </motion.div>
        </section>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="blog-controls-section">
          {/* Search Bar */}
          <div className="blog-search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="blog-search-input"
              placeholder="Search articles (e.g. AC cooling, fridge gas, drum error)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Chips Scroll */}
          <div className="blog-categories-wrapper">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`blog-category-chip ${isActive ? "active" : ""}`}
                >
                  <span>{cat}</span>
                  <span className="count-badge">{getCategoryCount(cat)}</span>
                </button>
              );
            })}
          </div>

          {/* Active Search / Filter Status */}
          {(searchTerm || selectedCategory !== "All") && (
            <div className="blog-filter-status">
              <span>
                Showing <strong>{filteredPosts.length}</strong> {filteredPosts.length === 1 ? "article" : "articles"}
                {selectedCategory !== "All" && ` in "${selectedCategory}"`}
                {searchTerm && ` matching "${searchTerm}"`}
              </span>
              <button
                type="button"
                className="reset-filter-btn"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* FEATURED POST SPOTLIGHT (when default view) */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="blog-featured-card"
          >
            <div className="featured-media-wrap">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                className="featured-img"
              />
              <span className="featured-badge">⭐ FEATURED GUIDE</span>
              <span className="featured-read-time">
                <Clock size={12} /> {featuredPost.readTime}
              </span>
            </div>

            <div className="featured-content-wrap">
              <div className="featured-meta-row">
                <span
                  className="cat-chip"
                  style={{
                    backgroundColor: getCategoryTheme(featuredPost.category).bg,
                    color: getCategoryTheme(featuredPost.category).color,
                    borderColor: getCategoryTheme(featuredPost.category).border,
                  }}
                >
                  {featuredPost.category}
                </span>
                <span className="meta-separator">•</span>
                <span className="meta-date">
                  <Calendar size={13} /> {featuredPost.date}
                </span>
              </div>

              <h2 className="featured-title">{featuredPost.title}</h2>

              <p className="featured-excerpt">{featuredPost.excerpt}</p>

              <div className="featured-author-row">
                <div className="author-avatar">
                  <User size={15} />
                </div>
                <div className="author-text">
                  <span className="author-name">{featuredPost.author}</span>
                  <span className="author-role">Master Appliance Specialist</span>
                </div>
              </div>

              <div className="featured-actions-row">
                <button
                  type="button"
                  onClick={() => setSelectedPost(featuredPost)}
                  className="featured-read-btn"
                  data-gsap="magnetic"
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenBooking(featuredPost.category)}
                  className="featured-book-btn"
                  data-gsap="magnetic"
                >
                  ⚡ Book This Repair
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* POSTS GRID */}
        {gridPosts.length > 0 ? (
          <div className="blog-grid" data-gsap="stagger-cards">
            {gridPosts.map((post, idx) => {
              const theme = getCategoryTheme(post.category);
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="blog-card"
                  data-gsap="tilt"
                  onClick={() => setSelectedPost(post)}
                >
                  {/* Media */}
                  <div className="blog-card-media">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="blog-card-img"
                    />
                    <div className="blog-card-overlay" />
                    <span
                      className="card-category-tag"
                      style={{
                        backgroundColor: theme.bg,
                        color: theme.color,
                        borderColor: theme.border,
                      }}
                    >
                      {post.category}
                    </span>
                    <span className="card-read-time">
                      <Clock size={11} /> {post.readTime}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="blog-card-body">
                    <div className="card-meta-line">
                      <span className="card-author">
                        <User size={12} /> {post.author}
                      </span>
                      <span>•</span>
                      <span className="card-date">
                        <Calendar size={12} /> {post.date}
                      </span>
                    </div>

                    <h3 className="card-title">{post.title}</h3>

                    <p className="card-excerpt">{post.excerpt}</p>

                    <div className="card-footer">
                      <span className="card-read-link">
                        Read Guide <ArrowRight size={14} className="arrow-icon" />
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenBooking(post.category);
                        }}
                        className="card-quick-book-chip"
                        title="Book repair for this appliance"
                      >
                        ⚡ Book
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="blog-empty-state">
            <div className="empty-icon-wrap">
              <AlertCircle size={36} />
            </div>
            <h3>No guides found matching your search</h3>
            <p>
              We couldn&apos;t find any articles matching &ldquo;{searchTerm}&rdquo; in &ldquo;{selectedCategory}&rdquo;. Try another appliance keyword or reset the filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="empty-reset-btn"
            >
              Show All Guides
            </button>
          </div>
        )}

        {/* BOTTOM HELP & CONSULTATION BANNER */}
        <section className="blog-consultation-card">
          <div className="consultation-content">
            <span className="consultation-tag">
              <HelpCircle size={14} /> FREE EXPERT ADVICE IN PATNA
            </span>
            <h2 className="consultation-title">
              Can&apos;t diagnose what&apos;s wrong with your home appliance?
            </h2>
            <p className="consultation-desc">
              Speak directly with our senior technician for instant phone diagnosis. We reach your doorstep in 30-60 minutes across Danapur, Saguna More, Bailey Road, Kankarbagh &amp; all Patna areas with 100% genuine spare parts.
            </p>
            <div className="consultation-badges">
              <span className="c-badge">✓ Transparent Inspection (₹199 only)</span>
              <span className="c-badge">✓ 90-Day Repair Warranty</span>
              <span className="c-badge">✓ Verified &amp; Certified Technicians</span>
            </div>
          </div>

          <div className="consultation-actions">
            <button
              type="button"
              onClick={() => handleOpenBooking()}
              className="consultation-primary-btn"
            >
              ⚡ Book Doorstep Inspection
            </button>

            <a href="tel:+919304415657" className="consultation-call-btn">
              <Phone size={16} /> Call +91-9304415657
            </a>

            <a
              href="https://wa.me/919304415657?text=Hi%20Repair%20Saathi,%20I%20have%20an%20issue%20with%20my%20appliance"
              target="_blank"
              rel="noopener noreferrer"
              className="consultation-wa-btn"
            >
              <WhatsAppIcon size={18} /> Chat on WhatsApp
            </a>
          </div>
        </section>
      </div>

      {/* FULL ARTICLE READING MODAL */}
      <AnimatePresence>
        {selectedPost && (
          <div
            className="blog-modal-backdrop"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="blog-modal-sheet"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header Bar */}
              <div className="modal-header-bar">
                <div className="modal-tags-wrap">
                  <span
                    className="modal-category-tag"
                    style={{
                      backgroundColor: getCategoryTheme(selectedPost.category).bg,
                      color: getCategoryTheme(selectedPost.category).color,
                    }}
                  >
                    {selectedPost.category}
                  </span>
                  <span className="modal-time-tag">
                    <Clock size={12} /> {selectedPost.readTime}
                  </span>
                </div>

                <div className="modal-header-actions">
                  <button
                    type="button"
                    onClick={() => handleShare(selectedPost)}
                    className="modal-icon-btn"
                    title="Share this guide"
                  >
                    <Share2 size={16} />
                    {copiedSlug && <span className="copied-tooltip">Copied!</span>}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPost(null)}
                    className="modal-close-round-btn"
                    aria-label="Close article modal"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Modal Scrollable Content */}
              <div className="modal-article-body">
                <h2 className="modal-article-title">{selectedPost.title}</h2>

                <div className="modal-author-strip">
                  <div className="author-avatar-lg">
                    <User size={18} />
                  </div>
                  <div className="author-details">
                    <div className="author-name-line">
                      <strong>{selectedPost.author}</strong>
                      <span className="verified-badge">
                        <CheckCircle2 size={12} /> Verified Tech
                      </span>
                    </div>
                    <div className="author-subtext">
                      Published on {selectedPost.date} • Repair Saathi Patna
                    </div>
                  </div>
                </div>

                {/* Article Featured Image */}
                <div className="modal-featured-image-wrap">
                  <Image
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    fill
                    className="modal-image"
                  />
                </div>

                {/* Article Content with Rich Parsed Formatting */}
                {typeof selectedPost.content === "string" ? (
                  <div
                    className="modal-rich-html-content"
                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                  />
                ) : (
                  <div className="modal-paragraphs-wrap">
                    {Array.isArray(selectedPost.content) &&
                      selectedPost.content.map((paragraph, pIdx) => {
                        const isNumbered = /^[0-9]+\.\s/.test(paragraph);
                        const isBullet = paragraph.startsWith("- ");
                        const isHeading =
                          paragraph.endsWith(":") ||
                          paragraph.includes("Warning Signs") ||
                          paragraph.includes("Frequent Geyser Faults") ||
                          paragraph.includes("Top Reasons") ||
                          paragraph.includes("Why Scheduled") ||
                          paragraph.includes("Why Choose Doorstep") ||
                          paragraph.includes("Safety First");

                        if (isHeading) {
                          return (
                            <h3 key={pIdx} className="article-section-heading">
                              <Wrench size={16} className="heading-icon" />
                              <span>{paragraph}</span>
                            </h3>
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
                    <Sparkles size={16} />
                    <span>Repair Saathi Technician Pro Tip</span>
                  </div>
                  <p>
                    Never ignore small grinding noises, burning smells, or minor water dripping from home appliances. 85% of major compressor and motor failures in Patna could have been prevented with a quick timely checkup before total breakdown.
                  </p>
                </div>

                {/* Modal In-Article Booking Box */}
                <div className="modal-booking-banner">
                  <div className="banner-text">
                    <h4>Need expert doorstep repair for this appliance?</h4>
                    <p>
                      Our verified technicians in Patna arrive equipped with multi-meters, genuine spare parts, and provide a 90-day warranty.
                    </p>
                  </div>
                  <div className="banner-ctas">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPost(null);
                        handleOpenBooking(selectedPost.category);
                      }}
                      className="banner-book-btn"
                    >
                      ⚡ Instant Doorstep Booking
                    </button>
                    <a href="tel:+919304415657" className="banner-call-btn">
                      <Phone size={14} /> +91-9304415657
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultService={bookingDefaultService}
      />
    </main>
  );
}
