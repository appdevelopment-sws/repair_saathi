import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund and Returns Policy | Repair Saathi",
  description: "Transparent refund and cancellation policy for Repair Saathi doorstep appliance repairs in Patna.",
  alternates: {
    canonical: "https://repairsaathi.in/refund-and-returns-policy/",
  },
};

export default function RefundPolicyPage() {
  return (
    <div style={{ padding: "40px 0 60px 0" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        <div style={{ marginBottom: "30px" }}>
          <span className="section-tag">Customer Protection</span>
          <h1 className="section-title" style={{ fontSize: "32px" }}>
            Refund and Returns Policy
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
            At <strong>Repair Saathi</strong>, we aim to provide transparent and satisfactory service to all our customers. This Refund Policy outlines the terms and conditions under which refunds may be issued for repair services booked through our platform.
          </p>

          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "24px 0 8px 0" }}>
            1. Eligibility for Refunds
          </h2>
          <p style={{ marginBottom: "12px" }}>
            Refunds or fee adjustments are applicable under the following circumstances:
            <br />
            • <strong>Service Not Delivered:</strong> If no technician was assigned or reached your doorstep within the promised appointment timeframe.
            <br />
            • <strong>Cancellation by Repair Saathi:</strong> If we cancel your booking due to non-availability of specialized components or emergency technical constraints.
            <br />
            • <strong>Technician No-Show:</strong> If a scheduled professional fails to arrive and rescheduling is rejected by the customer.
            <br />
            • <strong>Duplicate Charges:</strong> In case of accidental online payment double deductions.
          </p>

          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "24px 0 8px 0" }}>
            2. Cancellation Timeline &amp; Fees
          </h2>
          <div
            style={{
              overflowX: "auto",
              margin: "16px 0",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
                textAlign: "left",
              }}
            >
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                  <th style={{ padding: "10px 14px" }}>Scenario</th>
                  <th style={{ padding: "10px 14px" }}>Refund Eligibility</th>
                  <th style={{ padding: "10px 14px" }}>Processing</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "10px 14px" }}>Cancellation &gt; 2 hrs before slot</td>
                  <td style={{ padding: "10px 14px", color: "#16a34a", fontWeight: "700" }}>100% Full Refund</td>
                  <td style={{ padding: "10px 14px" }}>Original Mode / Instant</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "10px 14px" }}>Cancellation &lt; 2 hrs before slot</td>
                  <td style={{ padding: "10px 14px" }}>Full refund minus minor visiting allowance</td>
                  <td style={{ padding: "10px 14px" }}>3-5 business days</td>
                </tr>
                <tr>
                  <td style={{ padding: "10px 14px" }}>After technician has reached &amp; diagnosed</td>
                  <td style={{ padding: "10px 14px" }}>Inspection visit charge non-refundable</td>
                  <td style={{ padding: "10px 14px" }}>N/A</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "24px 0 8px 0" }}>
            3. Spare Parts Warranty Replacement
          </h2>
          <p style={{ marginBottom: "16px" }}>
            If a replaced component malfunctions within the warranty window (30 to 90 days), Repair Saathi will replace the component free of charge without any additional labor fee.
          </p>
        </div>
      </div>
    </div>
  );
}
