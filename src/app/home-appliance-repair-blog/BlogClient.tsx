"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { blogsData, BlogPost, getCategoryTheme } from "@/data/blogsData";
import BookingModal from "@/components/BookingModal";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function BlogClient() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingDefaultService, setBookingDefaultService] = useState("ac-repair");
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>(blogsData);

  // Fetch dynamic blogs from Backend API if available
  useEffect(() => {
    const fetchLiveBlogs = async () => {
      try {
        const res = await fetch(`/api/blogs?status=published`, {
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

            const apiSlugs = new Set(apiPosts.map((p) => p.slug));
            const staticRemain = blogsData.filter((p) => !apiSlugs.has(p.slug));
            setAllBlogs([...apiPosts, ...staticRemain]);
          }
        }
      } catch (err) {
        console.warn("Could not fetch dynamic blogs from API, using static data:", err);
      }
    };

    fetchLiveBlogs();
  }, []);

  // Backward compatibility: If visitor arrives with ?slug=, redirect to dedicated page
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      const params = new URLSearchParams(window.location.search);
      const querySlug = params.get("slug") || hash;
      if (querySlug) {
        router.replace(`/home-appliance-repair-blog/${querySlug}/`);
      }
    }
  }, [router]);

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

  // Filtered posts based on search & category chip
  const filteredPosts = useMemo(() => {
    return allBlogs.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        (Array.isArray(post.tags) && post.tags.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [allBlogs, searchTerm, selectedCategory]);

  // Featured post: first featured flag or first item
  const featuredPost = useMemo(() => {
    if (searchTerm || selectedCategory !== "All") return null;
    return allBlogs.find((p) => p.isFeatured) || allBlogs[0] || null;
  }, [allBlogs, searchTerm, selectedCategory]);

  // Rest of the posts for the grid
  const gridPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts;
    return filteredPosts.filter((p) => p.id !== featuredPost.id);
  }, [filteredPosts, featuredPost]);

  const handleOpenBooking = (category?: string) => {
    const cat = category || "ac-repair";
    const lower = cat.toLowerCase();
    if (lower.includes("ac")) setBookingDefaultService("ac-repair");
    else if (lower.includes("wash")) setBookingDefaultService("washing-machine-repair");
    else if (lower.includes("fridge") || lower.includes("refrigerator")) setBookingDefaultService("refrigerator-repair");
    else if (lower.includes("geyser")) setBookingDefaultService("geyser-repair");
    else if (lower.includes("chimney")) setBookingDefaultService("kitchen-chimney-repair");
    else if (lower.includes("microwave")) setBookingDefaultService("microwave-repair");
    else setBookingDefaultService("ac-repair");

    setBookingModalOpen(true);
  };

  const getCategoryCount = (category: string) => {
    if (category === "All") return allBlogs.length;
    return allBlogs.filter((p) => p.category === category).length;
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
                <Link
                  href={`/home-appliance-repair-blog/${featuredPost.slug}/`}
                  className="featured-read-btn"
                  data-gsap="magnetic"
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight size={16} />
                </Link>

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
                >
                  {/* Media */}
                  <Link
                    href={`/home-appliance-repair-blog/${post.slug}/`}
                    className="blog-card-media"
                    style={{ display: "block" }}
                  >
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
                  </Link>

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

                    <h3 className="card-title">
                      <Link
                        href={`/home-appliance-repair-blog/${post.slug}/`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="card-excerpt">{post.excerpt}</p>

                    <div className="card-footer">
                      <Link
                        href={`/home-appliance-repair-blog/${post.slug}/`}
                        className="card-read-link"
                      >
                        Read Guide <ArrowRight size={14} className="arrow-icon" />
                      </Link>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
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
              Try searching with different keywords like &quot;AC cooling&quot;, &quot;fridge noise&quot;, or &quot;washing machine drain&quot;.
            </p>
            <button
              type="button"
              className="empty-reset-btn"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Clear Search Filter
            </button>
          </div>
        )}

        {/* BOTTOM EXPERT CONSULTATION STRIP */}
        <section className="blog-consultation-strip">
          <div className="consultation-content">
            <span className="consultation-tag">
              <Sparkles size={13} /> Free Tele-Diagnostic Assistance
            </span>
            <h3 className="consultation-title">
              Still Unsure What&apos;s Wrong With Your Appliance?
            </h3>
            <p className="consultation-desc">
              Speak directly with our senior technician in Patna. Describe the sound, cooling drop, or error code and get honest guidance before booking.
            </p>
          </div>

          <div className="consultation-actions">
            <button
              type="button"
              onClick={() => handleOpenBooking("ac-repair")}
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

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultService={bookingDefaultService}
      />
    </main>
  );
}
