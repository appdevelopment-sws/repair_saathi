import React from "react";
import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Home Appliance Repair Services in Patna | Rate Card & Price List",
  description:
    "Check transparent pricing for doorstep appliance repairs in Patna. Fast AC repair, washing machine service, fridge, geyser & microwave fixing by expert technicians.",
  alternates: {
    canonical: "https://repairsaathi.in/home-appliance-repair-services-patna/",
  },
  openGraph: {
    title: "Home Appliance Repair Services & Pricing in Patna | Repair Saathi",
    description:
      "Explore verified doorstep appliance repairs in Patna starting from ₹199. AC, Refrigerator, Washing Machine, Geyser & Microwave services.",
    url: "https://repairsaathi.in/home-appliance-repair-services-patna/",
    type: "website",
    images: [
      {
        url: "https://repairsaathi.in/wp-content/uploads/2025/12/Repair-Saathi-Home-Service-Logo.webp",
        width: 1125,
        height: 1125,
        alt: "Repair Saathi Services",
      },
    ],
  },
};

export default function AllServicesPage() {
  return <ServicesClient />;
}
