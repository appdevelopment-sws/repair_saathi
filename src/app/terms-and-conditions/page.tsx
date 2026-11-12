import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Repair Saathi",
  description: "Terms and conditions governing the use of Repair Saathi home appliance repair services in Patna.",
  alternates: {
    canonical: "https://repairsaathi.in/terms-and-conditions/",
  },
};

export default function TermsPage() {
  return (
    <div style={{ padding: "40px 0 60px 0" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        <div style={{ marginBottom: "30px" }}>
          <span className="section-tag">Legal Terms</span>
          <h1 className="section-title" style={{ fontSize: "32px" }}>
            Terms and Conditions
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px" }}>Last Updated: 01/01/2025</p>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "36px",
            borderRadius: "16px",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-sm)",
            lineHeight: "1.8",
            color: "#334155",
            fontSize: "15px",
          }}
        >
          <p style={{ marginBottom: "16px" }}>
            Welcome to <strong>Repair Saathi</strong>! These Terms &amp; Conditions (“Terms”) govern your access to and use of our website, mobile application, and services, including the online booking of repair services for home electronic appliances (collectively, the “Platform”).
          </p>
          <p style={{ marginBottom: "24px" }}>
            By accessing or using Repair Saathi, you agree to be bound by these Terms. If you do not agree, please do not use our services.
          </p>

          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "24px 0 8px 0" }}>
            1. Definitions
          </h2>
          <p style={{ marginBottom: "12px" }}>
            • <strong>“Repair Saathi” / “We” / “Us” / “Our”</strong>: refers to the platform owned and operated by Repair Saathi, offering repair services for home appliances in Patna and surrounding regions.
            <br />
            • <strong>“User” / “You”</strong>: refers to any person accessing or using the Platform to book repair services.
            <br />
            • <strong>“Technician”</strong>: refers to certified technical professionals assigned to perform doorstep repair and maintenance.
            <br />
            • <strong>“Service”</strong>: refers to diagnosis, servicing, installation, or spare parts replacement booked via Repair Saathi.
          </p>

          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "24px 0 8px 0" }}>
            2. Services Provided
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Repair Saathi enables customers to schedule doorstep repair and maintenance services for various home appliances (ACs, refrigerators, washing machines, geysers, microwaves, chimneys, water coolers). All services are conducted by verified technicians adhering to safety standards.
          </p>

          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "24px 0 8px 0" }}>
            3. Booking &amp; Payment
          </h2>
          <p style={{ marginBottom: "16px" }}>
            • Users can book appointments online or by phone.
            <br />
            • Visiting charges and price estimates are shared transparently prior to work commencement.
            <br />
            • Payment can be made via UPI, cash, credit/debit cards, or net banking upon successful completion of the service.
          </p>

          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "24px 0 8px 0" }}>
            4. Warranty &amp; Guarantee
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Repairs carried out with replacement components include up to upto 90-day warranty on spare parts and workmanship, unless explicitly stated otherwise. Warranty does not cover accidental physical damage, power surges, or unauthorized third-party tampering post-repair.
          </p>

          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "24px 0 8px 0" }}>
            5. User Responsibilities
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Users must provide accurate appliance details and location directions, ensure technician access at the scheduled time, and inspect the repaired appliance in the presence of the technician before completing payment.
          </p>
        </div>
      </div>
    </div>
  );
}
