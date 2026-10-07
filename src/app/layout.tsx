import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import ThreeBackground from "@/components/ThreeBackground";

export const metadata: Metadata = {
  metadataBase: new URL("https://repairsaathi.in"),
  title: "AC Repair in Patna | Washing Machine & Refrigerator Service | Repair Saathi",
  description:
    "Get expert AC, washing machine and refrigerator repair services in Patna. Fast, reliable and affordable solutions by skilled technicians near you. Same day doorstep service.",
  keywords: [
    "AC repair in Patna",
    "Washing machine service Patna",
    "Refrigerator repair Patna",
    "Geyser repair Patna",
    "Microwave repair Patna",
    "Kitchen chimney repair Patna",
    "Home appliance repair near me",
    "Repair Saathi Patna"
  ],
  authors: [{ name: "Repair Saathi" }],
  openGraph: {
    title: "Home Appliance Repair Service in Patna | Repair Saathi",
    description:
      "Trusted home appliance repair service in Patna for AC, refrigerator, washing machine, RO and more.",
    url: "https://repairsaathi.in/",
    siteName: "Repair Saathi Patna | Home Appliance Repair Experts",
    images: [
      {
        url: "/images/logo.webp",
        width: 1125,
        height: 1125,
        alt: "Repair Saathi Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Appliance Repair Service in Patna | Repair Saathi",
    description:
      "Trusted home appliance repair service in Patna for AC, refrigerator, washing machine, RO and more.",
    images: ["/images/logo.webp"],
  },
  icons: {
    icon: "/images/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Repair Saathi",
    image: "https://repairsaathi.in/images/logo.webp",
    telephone: "+91-9304415657",
    email: "infohrepairsaathi@gmail.com",
    url: "https://repairsaathi.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "RR Guest House, Ground floor, Near Hi Tech Hospital, Saguna More Balaji Nagar",
      addressLocality: "Patna",
      addressRegion: "Bihar",
      postalCode: "801503",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "25.6186",
      longitude: "85.0443",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "21:00",
      },
    ],
    priceRange: "₹₹",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThreeBackground />
        <Navbar />
        <div className="site-content-wrapper">
          <main>{children}</main>
          <Footer />
        </div>
        <FloatingActions />
      </body>
    </html>
  );
}
