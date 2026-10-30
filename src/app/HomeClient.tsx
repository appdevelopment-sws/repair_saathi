"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { servicesData } from "@/data/servicesData";
import { CategoryDto } from "@/app/api/categories/route";
import HeroSection from "@/components/HeroSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import { gsap } from "@/lib/gsap";

const BookingModal = dynamic(() => import("@/components/BookingModal"), { ssr: false });

export default function HomeClient() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto | null>(null);
  const [selectedService, setSelectedService] = useState<string>("ac-repair");
  const [allCategories, setAllCategories] = useState<CategoryDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [queryName, setQueryName] = useState("");
  const [queryEmail, setQueryEmail] = useState("");
  const [queryMobile, setQueryMobile] = useState("");
  const [queryMessage, setQueryMessage] = useState("");
  const [querySent, setQuerySent] = useState(false);

  const homeRootRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger & Parallax effect for SEO content blocks (desktop only)
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      // Subtle image parallax scrub as visitor scrolls past sections
      const images = document.querySelectorAll<HTMLElement>(".content-block-img");
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { y: 25, scale: 1.04 },
          {
            y: -25,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });
    }, homeRootRef);

    return () => ctx.revert();
  }, []);

  const handleOpenBooking = (target: CategoryDto | string) => {
    if (typeof target === "string") {
      setSelectedService(target);
      const matched = allCategories.find(
        (c) =>
          c.serviceId === target ||
          c.slug === target ||
          (c.name && c.name.toLowerCase().includes(target.toLowerCase().split("-")[0]))
      );
      setSelectedCategory(matched || null);
    } else {
      setSelectedCategory(target);
      setSelectedService(target.serviceId || target.slug || "ac-repair");
    }
    setIsModalOpen(true);
  };

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryName || !queryMobile) return;
    setQuerySent(true);

    const generatedId = "RS-" + Math.floor(100000 + Math.random() * 900000);
    const payload = {
      inquiryId: generatedId,
      customerName: queryName.trim(),
      phone: queryMobile.trim(),
      email: queryEmail.trim() || null,
      serviceName: "Website Homepage Query",
      category: "General Inquiry",
      city: "Patna",
      address: "Patna",
      message: queryMessage.trim() || "Customer submitted query from homepage form.",
      preferredDate: "Today",
      preferredTime: "Flexible Callback",
      source: "Website Query Form",
      status: "pending",
    };

    try {
      await fetch("/api/web-requests/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      try {
        await fetch("http://localhost:8008/api/web-requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch {}
    }

    setTimeout(() => {
      setQueryName("");
      setQueryEmail("");
      setQueryMobile("");
      setQueryMessage("");
      setQuerySent(false);
    }, 4000);
  };

  return (
    <div ref={homeRootRef}>
      {/* 1. HERO SECTION WITH APPLIANCE CAROUSEL */}
      <HeroSection />

      {/* 2. DYNAMIC FEATURED SERVICES / CATEGORIES (MATCHING SCREENSHOT 1) */}
      <FeaturedCategories
        onOpenBooking={handleOpenBooking}
        onLoadedCategories={setAllCategories}
      />

      {/* 3. SEO SECTION 1: AC REPAIR IN PATNA */}
      <section className="content-block-section" data-gsap="fade-up">
        <div className="container">
          <div className="content-block-card">
            <div className="content-block-grid">
              <div>
                <h2 className="content-block-heading">
                  Affordable AC Repair in Patna – Same Day Service
                </h2>
                <p className="content-block-p">
                  When people look for <strong>AC Service in Patna</strong> they usually want their comfort back quickly without confusion. At <strong>Repair Sathi</strong> this service is planned exactly around that expectation and real daily usage conditions.
                </p>
                <p className="content-block-p">
                  From the moment you choose us the focus stays on proper checking, clear explanation and steady work so cooling returns to normal. During peak Patna summer many customers face issues like low cooling or uneven airflow and <strong>AC Servicing</strong> is handled calmly and professionally in such situations. The service follows a step by step method so the actual problem is found instead of guessing or rushing.
                </p>
                <p className="content-block-p">
                  With <strong>AC Service near me</strong> proper attention is given to cleaning, checking and balancing so overall performance improves and power consumption stays controlled. People often worry about the same issue coming back again. That is why we focus on careful handling rather than quick temporary fixes.
                </p>
                <p className="content-block-p">
                  Over time regular AC servicing helps maintain consistent cooling smooth airflow and avoids sudden breakdowns during extreme heat. Customers who depend on AC Service in Patna value the clear communication and predictable results delivered by Repair Sathi.
                </p>

                <div className="content-block-ctas">
                  <button
                    onClick={() => handleOpenBooking("ac-repair")}
                    className="btn-book-service"
                    style={{ padding: "10px 20px", fontSize: "13px" }}
                  >
                    ⚡ Book AC Service Now
                  </button>
                  <a
                    href="tel:+919304415657"
                    className="btn-details-service"
                    style={{ padding: "10px 18px", fontSize: "13px" }}
                  >
                    📞 Call +91-9304415657
                  </a>
                </div>
              </div>

              <div className="content-block-img-wrap" data-gsap="image-reveal">
                <Image
                  src="/images/ac-repair-sec.webp"
                  alt="Affordable AC Repair in Patna"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="content-block-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEO SECTION 2: WASHING MACHINE SERVICE IN PATNA */}
      <section className="content-block-section" data-gsap="fade-up">
        <div className="container">
          <div className="content-block-card">
            <div className="content-block-grid reverse">
              <div>
                <h2 className="content-block-heading">
                  Washing Machine Service in Patna
                </h2>
                <p className="content-block-p">
                  Choosing <strong>washing machine repair in Patna</strong> is usually about getting your daily routine back without any delay or disturbance. At Repair Sathi our aim is to help families return to a smooth and predictable routine.
                </p>
                <p className="content-block-p">
                  Laundry work depends a lot on proper machine performance and washing machine repair partner focuses on restoring that balance in a practical and sensible way. When any issue comes up, Repair Sathi follows a clear inspection process so the real cause is fixed instead of just handling surface level problems.
                </p>
                <p className="content-block-p">
                  Many households in Patna depend on <strong>washing machine repair near me</strong> to avoid delays repeat complaints and unnecessary inconvenience. The service is planned to handle common operational issues carefully and step by step while keeping long term use in mind.
                </p>
                <p className="content-block-p">
                  With our well trained technicians, the focus stays on stable performance and long term usability instead of short term relief. Customers often choose washing machine repair Patna because it avoids unnecessary replacements and concentrates only on what truly needs attention.
                </p>

                <div className="content-block-ctas">
                  <button
                    onClick={() => handleOpenBooking("washing-machine")}
                    className="btn-book-service"
                    style={{ padding: "10px 20px", fontSize: "13px" }}
                  >
                    ⚡ Book Washing Machine Repair
                  </button>
                  <a
                    href="tel:+919304415657"
                    className="btn-details-service"
                    style={{ padding: "10px 18px", fontSize: "13px" }}
                  >
                    📞 Call +91-9304415657
                  </a>
                </div>
              </div>

              <div className="content-block-img-wrap" data-gsap="image-reveal">
                <Image
                  src="/images/washing-machine-sec.webp"
                  alt="Washing Machine Service in Patna"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="content-block-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SEO SECTION 3: REFRIGERATOR REPAIR IN PATNA */}
      <section className="content-block-section" data-gsap="fade-up">
        <div className="container">
          <div className="content-block-card">
            <div className="content-block-grid">
              <div>
                <h2 className="content-block-heading">
                  Dependable Solutions Built Around refrigerator repair in Patna Needs
                </h2>
                <p className="content-block-p">
                  Food storage is part of everyday life which is why <strong>Refrigerator repair in Patna</strong> is so important for both families and small businesses. At Repair Sathi fridge repair is handled with full focus on stability, proper checking and long term usage.
                </p>
                <p className="content-block-p">
                  When cooling problems start affecting stored food refrigerator servicing is done through a planned and focused process. The aim is to bring temperature balance back so food items stay safe and usable.
                </p>
                <p className="content-block-p">
                  With Repair Sathi the work is done in a systematic way so the main issue is fixed instead of just managing symptoms. Many people in Patna depend on <strong>refrigerator repair in Patna</strong> to avoid food spoilage wastage and daily inconvenience.
                </p>
                <p className="content-block-p">
                  The service gives importance to steady performance and consistent cooling over time. Choosing <strong>fridge repair near me</strong> means choosing reliability especially when the fridge is used daily throughout the year.
                </p>

                <div className="content-block-ctas">
                  <button
                    onClick={() => handleOpenBooking("refrigerator-repair")}
                    className="btn-book-service"
                    style={{ padding: "10px 20px", fontSize: "13px" }}
                  >
                    ⚡ Book Fridge Repair
                  </button>
                  <a
                    href="tel:+919304415657"
                    className="btn-details-service"
                    style={{ padding: "10px 18px", fontSize: "13px" }}
                  >
                    📞 Call +91-9304415657
                  </a>
                </div>
              </div>

              <div className="content-block-img-wrap" data-gsap="image-reveal">
                <Image
                  src="/images/refrigerator-sec.webp"
                  alt="Refrigerator Repair in Patna"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="content-block-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SEO SECTION 4: GEYSER SERVICE IN PATNA */}
      <section className="content-block-section" data-gsap="fade-up">
        <div className="container">
          <div className="content-block-card">
            <div className="content-block-grid reverse">
              <div>
                <h2 className="content-block-heading">
                  Safe and Consistent Comfort Backed by geyser service in Patna
                </h2>
                <p className="content-block-p">
                  Hot water is a daily need which is why <strong>geyser service in Patna</strong> is important for keeping things comfortable and reliable. At Repair Sathi your geyser servicing is planned keeping safety performance and daily usage habits in mind.
                </p>
                <p className="content-block-p">
                  When heating becomes weak or inconsistent repair work is handled through a careful and structured process. The system is checked properly so hot water supply returns to normal without sudden ups and downs.
                </p>
                <p className="content-block-p">
                  With Repair Sathi safety and correct working are always given priority. Many homes depend on <strong>geyser service near me</strong> especially during colder months when hot water is needed every day.
                </p>
                <p className="content-block-p">
                  The approach followed by our technicians avoids rushed work and focuses on steady dependable results. Regular support through geyser service in Patna helps maintain comfort and reduces the chances of sudden breakdowns.
                </p>

                <div className="content-block-ctas">
                  <button
                    onClick={() => handleOpenBooking("geyser-repair")}
                    className="btn-book-service"
                    style={{ padding: "10px 20px", fontSize: "13px" }}
                  >
                    ⚡ Book Geyser Service
                  </button>
                  <a
                    href="tel:+919304415657"
                    className="btn-details-service"
                    style={{ padding: "10px 18px", fontSize: "13px" }}
                  >
                    📞 Call +91-9304415657
                  </a>
                </div>
              </div>

              <div className="content-block-img-wrap" data-gsap="image-reveal">
                <Image
                  src="/images/geyser-repair.webp"
                  alt="Geyser Service in Patna"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="content-block-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SEO SECTION 5: OVEN SERVICE IN PATNA */}
      <section className="content-block-section" data-gsap="fade-up">
        <div className="container">
          <div className="content-block-card">
            <div className="content-block-grid">
              <div>
                <h2 className="content-block-heading">
                  Everyday Kitchen Reliability Powered by oven service in Patna
                </h2>
                <p className="content-block-p">
                  Daily cooking depends a lot on proper heating which is why <strong>oven service in Patna</strong> is an important support for many kitchens. At Repair Sathi any type of oven servicing is handled with care so daily cooking stays smooth and without interruption.
                </p>
                <p className="content-block-p">
                  When heating becomes uneven or the oven feels unstable Repair Sathi provides a clear and reliable way to return it to normal working. The service focuses on bringing back balanced performance so cooking results remain consistent and dependable.
                </p>
                <p className="content-block-p">
                  With us every step is done carefully to ensure reliable output without unnecessary adjustment. Many users choose <strong>oven service in Patna</strong> because it avoids guesswork and focuses on real operational problems.
                </p>
                <p className="content-block-p">
                  Keep your kitchen running smoothly every day. Connect with Repair Sathi and book professional oven service in Patna with ease.
                </p>

                <div className="content-block-ctas">
                  <button
                    onClick={() => handleOpenBooking("microwave-repair")}
                    className="btn-book-service"
                    style={{ padding: "10px 20px", fontSize: "13px" }}
                  >
                    ⚡ Book Microwave Repair
                  </button>
                  <a
                    href="tel:+919304415657"
                    className="btn-details-service"
                    style={{ padding: "10px 18px", fontSize: "13px" }}
                  >
                    📞 Call +91-9304415657
                  </a>
                </div>
              </div>

              <div className="content-block-img-wrap" data-gsap="image-reveal">
                <Image
                  src="/images/oven-sec.webp"
                  alt="Oven Service in Patna"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="content-block-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. QUERY FORM & CONTACT SECTION */}
      <section className="inquiry-section" id="contact" data-gsap="fade-up">
        <div className="container">
          <div className="inquiry-grid">
            {/* Form */}
            <div className="query-card" data-gsap="slide-left">
              <h3 className="query-title">E-mail Us Your Query</h3>
              <p className="query-desc">
                Have questions or need doorstep assistance? Fill out the form and our team will get back to you shortly.
              </p>

              {querySent ? (
                <div
                  style={{
                    padding: "20px",
                    background: "#dcfce7",
                    borderRadius: "8px",
                    color: "#16a34a",
                    fontWeight: "800",
                    textAlign: "center",
                  }}
                >
                  ✓ Thank you! Your query has been submitted. We will contact you at {queryMobile} shortly.
                </div>
              ) : (
                <form onSubmit={handleQuerySubmit}>
                  <div className="query-form-grid">
                    <div className="query-group">
                      <label className="query-label">Your name</label>
                      <input
                        type="text"
                        className="query-input"
                        placeholder="Your name"
                        value={queryName}
                        onChange={(e) => setQueryName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="query-group">
                      <label className="query-label">Your email</label>
                      <input
                        type="email"
                        className="query-input"
                        placeholder="Your email"
                        value={queryEmail}
                        onChange={(e) => setQueryEmail(e.target.value)}
                      />
                    </div>

                    <div className="query-group full">
                      <label className="query-label">Mobile</label>
                      <input
                        type="tel"
                        className="query-input"
                        placeholder="Mobile"
                        value={queryMobile}
                        onChange={(e) => setQueryMobile(e.target.value)}
                        required
                      />
                    </div>

                    <div className="query-group full">
                      <label className="query-label">Your message (optional)</label>
                      <textarea
                        className="query-textarea"
                        placeholder="Your message (optional)"
                        value={queryMessage}
                        onChange={(e) => setQueryMessage(e.target.value)}
                      />
                    </div>
                  </div>

                  <button type="submit" className="query-btn-submit" data-gsap="magnetic">
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Card */}
            <div className="contact-card-box" data-gsap="slide-right">
              <div>
                <h3 className="contact-card-title">CONTACT US</h3>
                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <div className="contact-item-icon">📞</div>
                    <div>
                      <div className="contact-item-label">Phone :</div>
                      <a href="tel:+919304415657" className="contact-item-value">
                        +91-9304415657
                      </a>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-item-icon">✉️</div>
                    <div>
                      <div className="contact-item-label">Email :</div>
                      <a href="mailto:infohrepairsaathi@gmail.com" className="contact-item-value">
                        infohrepairsaathi@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-item-icon">📍</div>
                    <div>
                      <div className="contact-item-label">Address :</div>
                      <div className="contact-item-value">
                        RR guest house ground floor near hi tech hospital saguna more balaji nagar, Patna (India)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: "24px",
                  padding: "14px",
                  background: "rgba(255, 255, 255, 0.06)",
                  borderRadius: "8px",
                  borderLeft: "3px solid #fbbc34",
                  fontSize: "13px",
                  color: "#cbd5e1",
                }}
              >
                Service hours: Monday to Sunday • 8:00 AM – 9:00 PM
              </div>
            </div>
          </div>

          {/* Workshop & Service Center Location Map */}
          <div className="inquiry-map-card" data-gsap="fade-up">
            <div className="inquiry-map-header">
              <div className="inquiry-map-title-group">
                <div className="inquiry-map-icon-badge">📍</div>
                <div>
                  <h3 className="inquiry-map-heading">
                    Locate Repair Saathi Workshop on Google Maps
                  </h3>
                  <p className="inquiry-map-sub">
                    RR guest house ground floor near hi tech hospital saguna more balaji nagar, Patna (India)
                  </p>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/place/repair+sathi+A+To+Z+Ac+repair+Center+Patna/@25.6224743,85.0402694,17z/"
                target="_blank"
                rel="noopener noreferrer"
                className="inquiry-map-btn"
              >
                <span>Open in Google Maps</span>
                <span>↗</span>
              </a>
            </div>

            <div className="inquiry-map-frame-wrap">
              <iframe
                title="repair sathi A To Z Ac repair Center Patna - Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.4714411347236!2d85.0402694!3d25.6224743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed57f9634b027d%3A0x3bad73abcefabe4c!2srepair%20sathi%20A%20To%20Z%20Ac%20repair%20Center%20Patna!5e0!3m2!1sen!2sin!4v1793355734466!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={selectedCategory}
        defaultService={selectedService}
        categories={allCategories}
      />
    </div>
  );
}
