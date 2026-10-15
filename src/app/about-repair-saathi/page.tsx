import React from "react";
import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Repair Saathi | Home Appliance Repair Service in Patna",
  description:
    "Repair Saathi is a trusted home appliance repair service in Patna, Bihar backed by 7+ years of industry experience. Fast, reliable, and verified doorstep technicians.",
  alternates: {
    canonical: "https://repairsaathi.in/about-repair-saathi/",
  },
  openGraph: {
    title: "About Repair Saathi | Home Appliance Repair Service in Patna",
    description:
      "Repair Saathi is a trusted home appliance repair service in Patna, Bihar backed by 7+ years of industry experience. Fast, reliable, and verified doorstep technicians.",
    url: "https://repairsaathi.in/about-repair-saathi/",
    type: "website",
    images: [
      {
        url: "https://repairsaathi.in/wp-content/uploads/2025/12/Repair-Saathi-Home-Service-Logo.webp",
        width: 1125,
        height: 1125,
        alt: "Repair Saathi",
      },
    ],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
