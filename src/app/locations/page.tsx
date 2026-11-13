import React from "react";
import type { Metadata } from "next";
import LocationsClient from "./LocationsClient";

export const metadata: Metadata = {
  title: "Locations We Serve | Repair Saathi Doorstep Appliance Repair",
  description:
    "Explore all cities and localities served by Repair Saathi across Bihar including Patna, Danapur, Kankarbagh, Boring Road, and more. Certified technicians, transparent pricing.",
  keywords: [
    "repair saathi service locations",
    "appliance repair locations patna",
    "ac repair danapur",
    "washing machine repair kankarbagh",
    "doorstep repair bihar",
  ],
  alternates: {
    canonical: "https://repairsaathi.in/locations",
  },
  openGraph: {
    title: "Locations We Serve | Repair Saathi",
    description:
      "Explore all areas and cities served by Repair Saathi for doorstep AC, washing machine, and refrigerator repairs.",
    type: "website",
    url: "https://repairsaathi.in/locations",
  },
};

export default function LocationsPage() {
  return <LocationsClient />;
}

