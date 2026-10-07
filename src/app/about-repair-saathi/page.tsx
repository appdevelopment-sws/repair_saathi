import React from "react";
import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Repair Saathi | Home Appliance Repair Service in Patna",
  description:
    "Repair Saathi is a trusted home appliance repair service in Patna, Bihar backed by 7+ years of industry experience. Fast, reliable, and verified doorstep technicians.",
};

export default function AboutPage() {
  return <AboutClient />;
}
