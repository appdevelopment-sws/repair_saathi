import React from "react";
import type { Metadata } from "next";
import BookingsClient from "./BookingsClient";

export const metadata: Metadata = {
  title: "My Bookings & Service Tracking | Repair Saathi Patna",
  description:
    "Track your home appliance repair booking status, assigned technician, and service history with Repair Saathi in Patna, Danapur, and Saguna More.",
  keywords: [
    "track repair booking patna",
    "repair saathi bookings",
    "appliance service status bihar",
    "technician tracking patna",
  ],
  openGraph: {
    title: "My Bookings & Service Tracking | Repair Saathi Patna",
    description:
      "Track your home appliance repair booking status, assigned technician, and service history with Repair Saathi in Patna.",
    type: "website",
    url: "https://repairsaathi.com/my-bookings/",
  },
  alternates: {
    canonical: "https://repairsaathi.com/my-bookings/",
  },
};

export default function MyBookingsPage() {
  return <BookingsClient />;
}
