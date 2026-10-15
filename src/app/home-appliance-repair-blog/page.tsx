import React from "react";
import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Home Appliance Repair Blog & Maintenance Guides | Repair Saathi Patna",
  description:
    "Explore expert troubleshooting guides, appliance repair costs, and maintenance advice by certified Repair Saathi technicians in Patna, Danapur, Saguna More, and Khagaul.",
  keywords: [
    "home appliance repair blog patna",
    "ac repair tips patna",
    "washing machine troubleshooting danapur",
    "refrigerator not cooling fix patna",
    "geyser service guide bihar",
    "doorstep appliance repair advice",
  ],
  openGraph: {
    title: "Home Appliance Repair Blog & Guides | Repair Saathi Patna",
    description:
      "Expert tips, troubleshooting guides, and home appliance maintenance advice written by certified Repair Saathi technicians in Patna.",
    type: "website",
    url: "https://repairsaathi.in/home-appliance-repair-blog/",
  },
  alternates: {
    canonical: "https://repairsaathi.in/home-appliance-repair-blog/",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
