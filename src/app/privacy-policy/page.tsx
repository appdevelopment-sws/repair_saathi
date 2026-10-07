import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Repair Saathi Appliance Services",
  description: "Privacy policy describing how Repair Saathi collects and protects customer data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ padding: "40px 0 60px 0" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        <div style={{ marginBottom: "30px" }}>
          <span className="section-tag">Data Protection</span>
          <h1 className="section-title" style={{ fontSize: "32px" }}>
            Privacy Policy
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
            <strong>Repair Saathi</strong> (“we”, “our”, or “us”) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, share, and safeguard your information when you use our website, mobile app, or any related services (collectively, the “Platform”).
          </p>

          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "24px 0 8px 0" }}>
            1. Information We Collect
          </h2>
          <p style={{ marginBottom: "12px" }}>
            We collect the following personal details during service booking:
            <br />
            • Full name and contact phone number
            <br />
            • Service location / delivery address in Patna
            <br />
            • Email address (for booking receipts and invoice communication)
            <br />
            • Appliance brand, model, and reported fault description
          </p>

          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "24px 0 8px 0" }}>
            2. How We Use Your Information
          </h2>
          <p style={{ marginBottom: "12px" }}>
            • To assign and dispatch qualified technicians to your doorstep
            <br />
            • To communicate visit confirmations, delays, or invoice updates
            <br />
            • To provide post-service support, warranty tracking, and customer service
            <br />
            • We <strong>do not sell</strong> or lease your personal data to any third-party advertisers.
          </p>

          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "24px 0 8px 0" }}>
            3. Data Security
          </h2>
          <p style={{ marginBottom: "16px" }}>
            We maintain technical and physical administrative safeguards designed to ensure the confidentiality, integrity, and safety of customer data against unauthorized access, loss, or alteration.
          </p>
        </div>
      </div>
    </div>
  );
}
