import React from "react";
import type { Metadata } from "next";
import LocationServicesClient from "./LocationServicesClient";

function capitalize(str: string) {
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locationSlug: string }>;
}): Promise<Metadata> {
  const { locationSlug } = await params;
  const locName = capitalize(locationSlug || "Patna");

  return {
    title: `Repair Services in ${locName} | Doorstep Appliance Repair & Maintenance`,
    description: `Book verified doorstep home appliance repairs in ${locName}. Expert AC repair, washing machine service, refrigerator maintenance & RO purifiers with 30-day warranty.`,
    alternates: {
      canonical: `https://repairsaathi.in/locations/${locationSlug}`,
    },
    openGraph: {
      title: `Repair Services in ${locName} - Repair Saathi`,
      description: `Fast 60-minute doorstep appliance repair solutions across ${locName}. Certified technicians & upfront rates.`,
      url: `https://repairsaathi.in/locations/${locationSlug}`,
    },
  };
}

export default async function LocationServicesPage({
  params,
}: {
  params: Promise<{ locationSlug: string }>;
}) {
  const { locationSlug } = await params;
  return <LocationServicesClient locationSlug={locationSlug} />;
}

