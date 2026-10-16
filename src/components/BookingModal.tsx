"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { CategoryDto, CategoryServiceItem } from "@/app/api/categories/route";
import WhatsAppIcon from "./WhatsAppIcon";

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: CategoryDto | null;
  defaultService?: string;
  categories?: CategoryDto[];
}

export interface AdditionalApplianceItem {
  category: CategoryDto;
  selectedRequirements: string[];
}

// Default fallback category if none passed
const DEFAULT_AC_CATEGORY: CategoryDto = {
  id: 1,
  name: "Air Conditioner Repair",
  slug: "ac-repair-in-patna",
  serviceId: "ac-repair",
  services: [
    { id: "ac-1", title: "AC Repair/Service", price: "₹299" },
    { id: "ac-2", title: "AC Installation/ Removal", price: "₹499" },
    { id: "ac-3", title: "Any Other AC related Service", price: "Inspection" },
  ],
};

// Helper to pick banner background image based on category
function getCategoryBannerImage(slug: string = "", name: string = ""): string {
  const lower = (slug + " " + name).toLowerCase();
  if (lower.includes("window ac")) return "/images/window-ac-dark.webp";
  if (lower.includes("ac") || lower.includes("air condition")) return "/images/ac-repair-dark.webp";
  if (lower.includes("fridge") || lower.includes("refrigerator")) return "/images/freeze-repair-dark.webp";
  if (lower.includes("wash")) return "/images/washing-dark.webp";
  if (lower.includes("purifier") || lower.includes("ro") || lower.includes("water")) return "/images/water-purifier.webp";
  if (lower.includes("geyser") || lower.includes("heater")) return "/images/geyser-repair.webp";
  if (lower.includes("microwave") || lower.includes("oven")) return "/images/microwave-repair.webp";
  if (lower.includes("chimney")) return "/images/chimney-repair.webp";
  return "/images/ac-repair-dark.webp";
}

// Red Brush Stroke Ribbon Banner Component (meticulously styled after Screenshot 2)
function BrushRibbon({ text = "#ApkeGharKaServicePartner" }: { text?: string }) {
  return (
    <div className="brush-ribbon-container">
      <div className="brush-ribbon-svg-wrap">
        <svg
          viewBox="0 0 540 80"
          className="brush-ribbon-svg"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="brushGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EA4335" />
              <stop offset="50%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
          </defs>
          {/* Main ragged brush body */}
          <path
            d="M 38,42 
               C 22,30 8,24 -2,27 
               C 12,23 26,20 44,18 
               C 88,13 174,11 270,11 
               C 366,11 452,13 496,18 
               C 514,20 528,23 542,27 
               C 532,24 518,30 502,42 
               C 518,44 530,48 540,52 
               C 524,54 508,52 494,56 
               C 514,59 524,64 516,67 
               C 498,66 476,64 454,66 
               C 376,69 280,71 190,70 
               C 126,70 62,68 26,65 
               C 8,63 -2,59 -2,55 
               C 12,53 22,54 28,50 
               C 16,48 8,44 2,40 
               C 12,39 24,40 38,42 Z"
            fill="url(#brushGrad)"
          />
          {/* Top/bottom paint bristle streaks */}
          <path
            d="M 60,15 Q 180,10 270,10 Q 360,10 480,15"
            stroke="#EF4444"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M 40,68 Q 160,72 270,72 Q 380,72 500,68"
            stroke="#DC2626"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* Horizontal paint splatters */}
          <line x1="-10" y1="28" x2="26" y2="26" stroke="#EA4335" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="-6" y1="36" x2="32" y2="35" stroke="#EA4335" strokeWidth="3" strokeLinecap="round" />
          <line x1="-12" y1="44" x2="20" y2="43" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
          <line x1="518" y1="28" x2="548" y2="30" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="510" y1="36" x2="544" y2="37" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
          <line x1="522" y1="44" x2="550" y2="45" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="brush-ribbon-text">{text}</span>
      </div>
    </div>
  );
}

export default function BookingModal({
  isOpen,
  onClose,
  category,
  defaultService = "ac-repair",
  categories = [],
}: BookingModalProps) {
  // Active Category State
  const [mounted, setMounted] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<CategoryDto>(category || DEFAULT_AC_CATEGORY);
  const [activeTab, setActiveTab] = useState<"book" | "rates" | "faqs">("book");

  // Full categories list for cross-category selection (cart style)
  const [allCategoriesList, setAllCategoriesList] = useState<CategoryDto[]>(categories || []);

  // Multi-Appliance Cart State
  const [additionalAppliances, setAdditionalAppliances] = useState<AdditionalApplianceItem[]>([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [selectedCatIdToAdd, setSelectedCatIdToAdd] = useState("");

  // Booking Form State
  const [needWhen, setNeedWhen] = useState("Today");
  const [customDate, setCustomDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("10:00 AM - 01:00 PM");
  const [brand, setBrand] = useState("");
  const [landmark, setLandmark] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [email, setEmail] = useState("");
  const [problemNotes, setProblemNotes] = useState("");
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ open/close accordion state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Sync category when prop changes or modal opens
  useEffect(() => {
    if (!isOpen) return;

    if (categories && categories.length > 0) {
      setAllCategoriesList(categories);
    }

    if (category) {
      setCurrentCategory(category);
      const srvs = category.services || [];
      if (srvs.length > 0) {
        setSelectedRequirements([srvs[0].title]);
      } else {
        setSelectedRequirements([`${category.name} Repair/Service`]);
      }
      return;
    }

    // Try finding matching category from provided categories list
    if (categories && categories.length > 0) {
      const match = categories.find(
        (c) =>
          c.serviceId === defaultService ||
          c.slug === defaultService ||
          (c.name && c.name.toLowerCase().includes(defaultService.toLowerCase().split("-")[0]))
      );
      if (match) {
        setCurrentCategory(match);
        const srvs = match.services || [];
        if (srvs.length > 0) {
          setSelectedRequirements([srvs[0].title]);
        }
        return;
      }
    }

    // Fallback: fetch dynamic categories
    fetch("/api/categories")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
          setAllCategoriesList(json.data);
          const match = json.data.find(
            (c: CategoryDto) =>
              c.serviceId === defaultService ||
              c.slug === defaultService ||
              (c.name && c.name.toLowerCase().includes(defaultService.toLowerCase().split("-")[0]))
          );
          const target = match || json.data[0];
          setCurrentCategory(target);
          if (target.services && target.services.length > 0) {
            setSelectedRequirements([target.services[0].title]);
          }
        }
      })
      .catch(() => {
        setCurrentCategory(DEFAULT_AC_CATEGORY);
        setSelectedRequirements(["AC Repair/Service"]);
      });
  }, [isOpen, category, defaultService, categories]);

  if (!isOpen || !mounted) return null;

  // Available services list for current category
  const servicesList: CategoryServiceItem[] =
    currentCategory.services && currentCategory.services.length > 0
      ? currentCategory.services
      : [
          { id: "1", title: `${currentCategory.name} Repair/Service`, price: "₹299" },
          { id: "2", title: `${currentCategory.name} Installation & Diagnosis`, price: "₹499" },
          { id: "3", title: `Any Other ${currentCategory.name} related Service`, price: "Inspection" },
        ];

  // Comma-separated subtitle matching Screenshot 1
  const servicesSubtitle = servicesList.map((s) => s.title).join(", ");

  // Categories available to add (excluding current category and already added ones)
  const availableCategoriesToAdd = allCategoriesList.filter(
    (c) =>
      c.id !== currentCategory.id &&
      c.name.toLowerCase() !== currentCategory.name.toLowerCase() &&
      !additionalAppliances.some(
        (a) => a.category.id === c.id || a.category.name.toLowerCase() === c.name.toLowerCase()
      )
  );

  // Add another appliance to booking
  const handleAddAdditionalAppliance = () => {
    if (!selectedCatIdToAdd) return;
    const catObj = allCategoriesList.find((c) => String(c.id) === String(selectedCatIdToAdd));
    if (!catObj) return;

    const defaultReq =
      catObj.services && catObj.services.length > 0
        ? [catObj.services[0].title]
        : [`${catObj.name} Repair/Service`];

    setAdditionalAppliances((prev) => [
      ...prev,
      {
        category: catObj,
        selectedRequirements: defaultReq,
      },
    ]);
    setSelectedCatIdToAdd("");
    setIsAddingCategory(false);
  };

  // Remove an added appliance
  const handleRemoveAdditionalAppliance = (catId: string | number) => {
    setAdditionalAppliances((prev) => prev.filter((a) => a.category.id !== catId));
  };

  // Toggle requirement for additional appliance
  const toggleAdditionalRequirement = (catId: string | number, reqTitle: string) => {
    setAdditionalAppliances((prev) =>
      prev.map((item) => {
        if (item.category.id !== catId) return item;
        const exists = item.selectedRequirements.includes(reqTitle);
        if (exists) {
          if (item.selectedRequirements.length === 1) return item;
          return {
            ...item,
            selectedRequirements: item.selectedRequirements.filter((t) => t !== reqTitle),
          };
        } else {
          return {
            ...item,
            selectedRequirements: [...item.selectedRequirements, reqTitle],
          };
        }
      })
    );
  };

  // Toggle requirement checkbox for primary category
  const toggleRequirement = (title: string) => {
    setSelectedRequirements((prev) => {
      if (prev.includes(title)) {
        if (prev.length === 1) return prev;
        return prev.filter((t) => t !== title);
      } else {
        return [...prev, title];
      }
    });
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const generatedId = "RS-" + Math.floor(100000 + Math.random() * 900000);
    const scheduledDate = needWhen === "Custom Date" && customDate ? customDate : needWhen;

    const allAppliancesBooked: Array<{ name: string; brand?: string; requirements: string[] }> = [
      {
        name: currentCategory.name,
        brand: brand.trim() || undefined,
        requirements: selectedRequirements,
      },
      ...additionalAppliances.map((a) => ({
        name: a.category.name,
        brand: undefined,
        requirements: a.selectedRequirements,
      })),
    ];

    const combinedServiceName = allAppliancesBooked
      .map((a) => `${a.name}${a.brand ? ` [${a.brand}]` : ""} (${a.requirements.join(", ")})`)
      .join(" + ");

    const formattedAddress = landmark.trim()
      ? `${address.trim()} (Landmark: ${landmark.trim()})`
      : address.trim();

    const formattedMessage = [
      brand.trim() ? `Brand: ${brand.trim()}` : null,
      landmark.trim() ? `Landmark: ${landmark.trim()}` : null,
      alternatePhone.trim() ? `Alternate / WhatsApp: ${alternatePhone.trim()}` : null,
      problemNotes.trim() ? `Issue Details: ${problemNotes.trim()}` : null,
      allAppliancesBooked.length > 1
        ? `Multi-Appliances (${allAppliancesBooked.length}):\n` +
          allAppliancesBooked
            .map((a, i) => `${i + 1}. ${a.name}${a.brand ? ` (${a.brand})` : ""}: ${a.requirements.join(", ")}`)
            .join("\n")
        : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    const webRequestPayload = {
      inquiryId: generatedId,
      customerName: name.trim(),
      phone: phone.trim(),
      email: email.trim() || null,
      address: formattedAddress,
      city: "Patna",
      category: currentCategory.name,
      serviceName: combinedServiceName,
      preferredDate: scheduledDate,
      preferredTime: preferredTime || "10:00 AM - 01:00 PM",
      message: formattedMessage || `Booked ${currentCategory.name} Service`,
      appliances: allAppliancesBooked,
      source: "Website Booking Modal",
    };

    let confirmedId = generatedId;

    try {
      // 1. Send to Next.js API /api/web-requests/ (with trailing slash!)
      const res = await fetch("/api/web-requests/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webRequestPayload),
      });

      if (res.ok) {
        const json = await res.json();
        if (json?.data?.id) {
          confirmedId = json.data.id;
        }
      } else {
        // Fallback: direct to backend if proxy fails
        const directRes = await fetch("http://localhost:8008/api/web-requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(webRequestPayload),
        });
        if (directRes.ok) {
          const directJson = await directRes.json();
          if (directJson?.data?.id) {
            confirmedId = directJson.data.id;
          }
        }
      }
    } catch (err) {
      console.warn("Failed to send booking to /api/web-requests/, trying direct backend fallback:", err);
      try {
        const directRes = await fetch("http://localhost:8008/api/web-requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(webRequestPayload),
        });
        if (directRes.ok) {
          const directJson = await directRes.json();
          if (directJson?.data?.id) {
            confirmedId = directJson.data.id;
          }
        }
      } catch {
        // Continue with generated ID
      }
    } finally {
      setIsSubmitting(false);
    }

    const bookingItem = {
      id: confirmedId,
      serviceName: combinedServiceName,
      categoryName: currentCategory.name,
      brand: brand.trim() || undefined,
      requirements: selectedRequirements,
      appliances: allAppliancesBooked,
      customerName: name.trim(),
      phone: phone.trim(),
      address: formattedAddress,
      scheduledDate,
      preferredTime,
      date: new Date().toISOString().split("T")[0],
      status: "Confirmed",
      bookedAt: new Date().toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    try {
      const existing = JSON.parse(localStorage.getItem("rs_bookings") || "[]");
      existing.unshift(bookingItem);
      localStorage.setItem("rs_bookings", JSON.stringify(existing));
    } catch {
      // Fallback
    }

    setBookingId(confirmedId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setPhone("");
    setAddress("");
    setBrand("");
    setLandmark("");
    setAlternatePhone("");
    setEmail("");
    setProblemNotes("");
    setPreferredTime("10:00 AM - 01:00 PM");
    setAdditionalAppliances([]);
    setIsAddingCategory(false);
    setSelectedCatIdToAdd("");
    setActiveTab("book");
    onClose();
  };

  const bannerImg = getCategoryBannerImage(currentCategory.slug, currentCategory.name);

  // Category Title formatted as "${Name} in Patna"
  const displayTitle = currentCategory.name.toLowerCase().includes("in patna")
    ? currentCategory.name
    : `${currentCategory.name} in Patna`;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {!submitted ? (
          <>
            {/* UPPER DARK BANNER SECTION (MATCHING SCREENSHOT 1 & SCREENSHOT 2) */}
            <div className="modal-banner-header">
              {/* Subtle background image */}
              <div className="modal-banner-bg-img">
                <Image
                  src={bannerImg}
                  alt={currentCategory.name}
                  fill
                  sizes="350px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="modal-banner-content">
                {/* Red Brush Stroke Ribbon Accent (Screenshot 2) */}
                <BrushRibbon text="#ApkeGharKaServicePartner" />

                {/* Heading (Screenshot 1) */}
                <h3 className="modal-banner-title">{displayTitle}</h3>

                {/* Subtitle listing dynamic services (Screenshot 1) */}
                <p className="modal-banner-subtitle">{servicesSubtitle}</p>

                {/* 4 Green Checkmark Trust Badges (Screenshot 1) */}
                <div className="modal-trust-row">
                  <span className="modal-trust-item">
                    <span className="trust-check-badge">✓</span>
                    Low Cost
                  </span>
                  <span className="modal-trust-item">
                    <span className="trust-check-badge">✓</span>
                    Expert Own Technician(No Tie-Up)
                  </span>
                  <span className="modal-trust-item">
                    <span className="trust-check-badge">✓</span>
                    Free Inspection
                  </span>
                  <span className="modal-trust-item">
                    <span className="trust-check-badge">✓</span>
                    15 days Warranty*
                  </span>
                </div>
              </div>
            </div>

            {/* THREE TABS HEADER (SCREENSHOT 1) */}
            <div className="modal-tabs-header">
              <button
                type="button"
                className={`modal-tab-btn ${activeTab === "book" ? "active" : ""}`}
                onClick={() => setActiveTab("book")}
              >
                Book Free Visit
              </button>
              <button
                type="button"
                className={`modal-tab-btn ${activeTab === "rates" ? "active" : ""}`}
                onClick={() => setActiveTab("rates")}
              >
                Rate(s)
              </button>
              <button
                type="button"
                className={`modal-tab-btn ${activeTab === "faqs" ? "active" : ""}`}
                onClick={() => setActiveTab("faqs")}
              >
                FAQs
              </button>
            </div>

            {/* SCROLLABLE MODAL BODY */}
            <div className="modal-scroll-body">
              {/* TAB 1: BOOK FREE VISIT */}
              {activeTab === "book" && (
                <form onSubmit={handleSubmit}>
                  {/* Field 1: Service Date & Time Slot Grid */}
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">When do you Need Service?</label>
                      <select
                        className="form-select-styled"
                        value={needWhen}
                        onChange={(e) => setNeedWhen(e.target.value)}
                      >
                        <option value="Today">Today (Same Day Service)</option>
                        <option value="Tomorrow">Tomorrow</option>
                        <option value="Custom Date">Pick a Custom Date</option>
                      </select>

                      {needWhen === "Custom Date" && (
                        <input
                          type="date"
                          className="form-input"
                          style={{ marginTop: "6px" }}
                          value={customDate}
                          onChange={(e) => setCustomDate(e.target.value)}
                          required
                        />
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Preferred Time Slot</label>
                      <select
                        className="form-select-styled"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                      >
                        <option value="10:00 AM - 01:00 PM">10:00 AM - 01:00 PM (Morning)</option>
                        <option value="01:00 PM - 04:00 PM">01:00 PM - 04:00 PM (Afternoon)</option>
                        <option value="04:00 PM - 07:00 PM">04:00 PM - 07:00 PM (Evening)</option>
                        <option value="07:00 PM - 09:00 PM">07:00 PM - 09:00 PM (Late Slot)</option>
                      </select>
                    </div>
                  </div>

                  {/* Field 2: Appliance Brand (Optional) */}
                  <div className="form-group">
                    <label className="form-label">
                      <span>Appliance Brand / Make</span>
                      <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>(Optional)</span>
                    </label>
                    <select
                      className="form-select-styled"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    >
                      <option value="">-- Select Brand (e.g. Voltas, LG, Samsung) --</option>
                      <option value="LG">LG</option>
                      <option value="Samsung">Samsung</option>
                      <option value="Voltas">Voltas</option>
                      <option value="Daikin">Daikin</option>
                      <option value="Whirlpool">Whirlpool</option>
                      <option value="Godrej">Godrej</option>
                      <option value="Haier">Haier</option>
                      <option value="Blue Star">Blue Star</option>
                      <option value="Lloyd">Lloyd</option>
                      <option value="Carrier">Carrier</option>
                      <option value="Panasonic">Panasonic</option>
                      <option value="Hitachi">Hitachi</option>
                      <option value="IFB">IFB</option>
                      <option value="Kent">Kent</option>
                      <option value="Aquaguard">Aquaguard</option>
                      <option value="Other / Local">Other / Not Listed</option>
                    </select>
                  </div>

                  {/* Field 3: Requirment(s) - DYNAMIC CHECKBOXES (Screenshot 1) */}
                  <div className="requirement-section">
                    <label className="requirement-label">Requirment(s)</label>
                    <div className="requirement-checkbox-row">
                      {servicesList.map((srv) => {
                        const isChecked = selectedRequirements.includes(srv.title);
                        return (
                          <label key={srv.id} className="requirement-item">
                            <input
                              type="checkbox"
                              className="requirement-checkbox-input"
                              checked={isChecked}
                              onChange={() => toggleRequirement(srv.title)}
                            />
                            <span className="requirement-item-text">{srv.title}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* MULTI-APPLIANCE / CART ADDON SECTION */}
                  <div className="multi-appliance-section">
                    {/* Render any added appliances */}
                    {additionalAppliances.length > 0 && (
                      <div className="additional-appliances-list">
                        {additionalAppliances.map((item, idx) => {
                          const srvList: CategoryServiceItem[] =
                            item.category.services && item.category.services.length > 0
                              ? item.category.services
                              : [
                                  { id: `${item.category.id}-1`, title: `${item.category.name} Repair/Service` },
                                  { id: `${item.category.id}-2`, title: `${item.category.name} Installation & Diagnosis` },
                                  { id: `${item.category.id}-3`, title: `Any Other ${item.category.name} related Service` },
                                ];

                          return (
                            <div key={item.category.id} className="additional-appliance-card">
                              <div className="additional-appliance-header">
                                <div className="additional-appliance-title">
                                  <span className="appliance-badge">Appliance #{idx + 2}</span>
                                  <strong>{item.category.name}</strong>
                                </div>
                                <button
                                  type="button"
                                  className="btn-remove-appliance"
                                  onClick={() => handleRemoveAdditionalAppliance(item.category.id)}
                                >
                                  ✕ Remove
                                </button>
                              </div>

                              <div className="requirement-checkbox-row">
                                {srvList.map((srv) => {
                                  const isChecked = item.selectedRequirements.includes(srv.title);
                                  return (
                                    <label key={srv.id} className="requirement-item">
                                      <input
                                        type="checkbox"
                                        className="requirement-checkbox-input"
                                        checked={isChecked}
                                        onChange={() => toggleAdditionalRequirement(item.category.id, srv.title)}
                                      />
                                      <span className="requirement-item-text">{srv.title}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Button or Dropdown to Add Another Category */}
                    {availableCategoriesToAdd.length > 0 && (
                      <div className="add-appliance-control">
                        {!isAddingCategory ? (
                          <button
                            type="button"
                            className="btn-add-more-appliance"
                            onClick={() => setIsAddingCategory(true)}
                          >
                            <div className="add-appliance-left">
                              <span className="add-plus-circle">+</span>
                              <span>Add Another Appliance for Service</span>
                            </div>
                            <span className="cart-badge-chip">
                              🛒 {1 + additionalAppliances.length} {1 + additionalAppliances.length === 1 ? "Appliance" : "Appliances"}
                            </span>
                          </button>
                        ) : (
                          <div className="add-category-picker-box">
                            <div className="add-picker-header">
                              <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#0f172a" }}>
                                Select Another Appliance to Add:
                              </span>
                              <button
                                type="button"
                                className="btn-picker-cancel"
                                onClick={() => {
                                  setIsAddingCategory(false);
                                  setSelectedCatIdToAdd("");
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                            <div className="add-picker-row">
                              <select
                                className="form-select-styled"
                                style={{ flex: 1 }}
                                value={selectedCatIdToAdd}
                                onChange={(e) => setSelectedCatIdToAdd(e.target.value)}
                              >
                                <option value="">-- Choose Appliance (e.g. AC, Fridge, Geyser) --</option>
                                {availableCategoriesToAdd.map((c) => (
                                  <option key={c.id} value={String(c.id)}>
                                    {c.name}
                                  </option>
                                ))}
                              </select>
                              <button
                                type="button"
                                className="btn-confirm-add-cat"
                                disabled={!selectedCatIdToAdd}
                                onClick={handleAddAdditionalAppliance}
                              >
                                + Add
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Customer Information Fields */}
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Rahul Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Mobile Number *</label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="10-digit number (e.g. 9304415657)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        pattern="[0-9]{10}"
                        title="Please enter a valid 10-digit mobile number"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">
                        <span>Area / Colony in Patna *</span>
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Boring Road, Saguna More, Kankarbagh"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <span>Alternate / WhatsApp No.</span>
                        <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="e.g. 9876543210"
                        value={alternatePhone}
                        onChange={(e) => setAlternatePhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Complete House / Flat Address *</label>
                    <textarea
                      className="form-textarea"
                      style={{ minHeight: "60px" }}
                      placeholder="Flat/House No, Building/Apartment Name, Street, Landmark"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span>Specific Issue / Problem Note</span>
                      <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>(Optional)</span>
                    </label>
                    <textarea
                      className="form-textarea"
                      style={{ minHeight: "52px" }}
                      placeholder="e.g. Not cooling, making unusual buzzing noise, water dripping from indoor unit..."
                      value={problemNotes}
                      onChange={(e) => setProblemNotes(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn-book-submit" disabled={isSubmitting}>
                    {isSubmitting ? "⏳ Processing Your Booking..." : "⚡ Confirm Free Visit Booking"}
                  </button>

                  <p className="booking-form-assurance">
                    🔒 Zero cancellation charge • Pay only after 100% service satisfaction
                  </p>
                </form>
              )}

              {/* TAB 2: RATE(S) */}
              {activeTab === "rates" && (
                <div className="rates-list-container">
                  {servicesList.map((srv) => (
                    <div key={srv.id} className="rate-card-item">
                      <div className="rate-card-info">
                        <h4>{srv.title}</h4>
                        <p>{srv.shortDescription || "Includes complete diagnosis & 15 days service warranty"}</p>
                      </div>
                      <div className="rate-card-action">
                        <span className="rate-card-price">{srv.price || "Free Inspection"}</span>
                        <button
                          type="button"
                          className="rate-card-btn"
                          onClick={() => {
                            setSelectedRequirements([srv.title]);
                            setActiveTab("book");
                          }}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: "12px", fontSize: "12px", color: "#64748b", textAlign: "center" }}>
                    *Final pricing depends on spare parts if needed. Technician will provide a clear upfront quote before starting.
                  </div>
                </div>
              )}

              {/* TAB 3: FAQS */}
              {activeTab === "faqs" && (
                <div className="faqs-container">
                  {[
                    {
                      q: "Is the technician visit really free?",
                      a: "Yes! Doorstep inspection is 100% free with zero cancellation fee. If you choose not to proceed with the repair after inspection, you pay nothing.",
                    },
                    {
                      q: "How fast can the technician arrive in Patna?",
                      a: "Our certified in-house technicians arrive within 60 to 90 minutes across all major Patna areas including Boring Road, Kankarbagh, Bailey Road, Saguna More, Danapur, and Rajendra Nagar.",
                    },
                    {
                      q: "Do you offer a warranty on the repair service?",
                      a: "Yes, every service comes with a 15-day service guarantee. If the same problem reoccurs within 15 days, we fix it completely free of charge.",
                    },
                    {
                      q: "Are your technicians verified and direct employees?",
                      a: "Yes! We do not tie up with unverified freelancers. All Repair Saathi technicians are thoroughly background-verified with uniform and official ID.",
                    },
                  ].map((faq, idx) => (
                    <div key={idx} className="faq-modal-card">
                      <button
                        type="button"
                        className="faq-modal-trigger"
                        onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                      >
                        <span>{faq.q}</span>
                        <span>{expandedFaq === idx ? "▲" : "▼"}</span>
                      </button>
                      {expandedFaq === idx && (
                        <div className="faq-modal-answer">{faq.a}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          /* SUCCESS CONFIRMATION STATE */
          <div className="modal-success-box">
            <div className="success-check-circle">✓</div>
            <h3 className="modal-banner-title" style={{ color: "#16a34a", fontSize: "22px" }}>
              Free Visit Confirmed!
            </h3>
            <p style={{ fontSize: "14px", color: "#475569", margin: "8px 0 16px 0" }}>
              Thank you, <strong>{name}</strong>! Our technician will call you on{" "}
              <strong>{phone}</strong> shortly.
            </p>

            <div
              style={{
                background: "#f8fafc",
                padding: "16px",
                borderRadius: "12px",
                border: "1.5px dashed #cbd5e1",
                marginBottom: "20px",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                  Booking Reference ID
                </span>
                <span style={{ fontSize: "16px", fontWeight: "900", color: "#0f172a" }}>
                  {bookingId}
                </span>
              </div>
              <div style={{ fontSize: "13px", color: "#334155", marginBottom: "4px" }}>
                <strong>Booked Appliance(s):</strong>
                <ul style={{ margin: "6px 0 0 16px", padding: 0 }}>
                  <li>
                    <strong>{currentCategory.name}:</strong> {selectedRequirements.join(", ")}
                  </li>
                  {additionalAppliances.map((a) => (
                    <li key={a.category.id} style={{ marginTop: "4px" }}>
                      <strong>{a.category.name}:</strong> {a.selectedRequirements.join(", ")}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={handleReset}
                className="btn-book-submit"
                style={{ flex: 1, padding: "10px" }}
              >
                Done
              </button>
              <a
                href={`https://wa.me/919304415657?text=${encodeURIComponent(
                  `Hi Repair Saathi, I booked service for ${[
                    `${currentCategory.name} (${selectedRequirements.join(", ")})`,
                    ...additionalAppliances.map((a) => `${a.category.name} (${a.selectedRequirements.join(", ")})`),
                  ].join(" + ")} (Ref: ${bookingId}) for ${name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#25d366",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  fontSize: "14px",
                  textDecoration: "none",
                }}
              >
                <WhatsAppIcon size={18} color="#fff" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
