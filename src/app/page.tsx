import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "AC Repair in Patna | Washing Machine & Refrigerator Service",
  description:
    "Get expert AC, washing machine and refrigerator repair services in Patna. Fast, reliable and affordable solutions by skilled technicians near you",
  alternates: {
    canonical: "https://repairsaathi.in/",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    locale: "en_US",
    type: "website",
    title: "Home Appliance Repair Service in Patna | Repair Saathi",
    description:
      "Trusted home appliance repair service in Patna for AC, refrigerator, washing machine, RO and more.",
    url: "https://repairsaathi.in/",
    siteName: "Repair Saathi Patna | Home Appliance Repair Experts",
    images: [
      {
        url: "https://repairsaathi.in/images/og-repair-saathi.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Repair Saathi - Home Appliance Repair Service in Patna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Appliance Repair Service in Patna | Repair Saathi",
    description:
      "Trusted home appliance repair service in Patna for AC, refrigerator, washing machine, RO and more.",
    images: ["https://repairsaathi.in/images/og-repair-saathi.png"],
  },
  other: {
    "article:publisher": "https://www.facebook.com/profile.php?id=61583969564683",
    "article:modified_time": "2026-01-22T13:02:21+00:00",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
