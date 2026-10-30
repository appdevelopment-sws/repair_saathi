import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import GsapProvider from "@/components/GsapProvider";
import ThreeBackground from "@/components/ThreeBackground";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fbbc34",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://repairsaathi.in"),
  title: {
    default: "AC Repair in Patna | Washing Machine & Refrigerator Service",
    template: "%s | Repair Saathi",
  },
  description:
    "Get expert AC, washing machine and refrigerator repair services in Patna. Fast, reliable and affordable solutions by skilled technicians near you",
  keywords: [
    "AC repair in Patna",
    "Washing machine service Patna",
    "Refrigerator repair Patna",
    "Geyser repair Patna",
    "Microwave repair Patna",
    "Kitchen chimney repair Patna",
    "Home appliance repair near me",
    "Repair Saathi Patna",
  ],
  authors: [{ name: "Repair Saathi" }],
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
        alt: "Repair Saathi - Patna's Trusted Home Appliance Repair Services",
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
    images: [
      "https://repairsaathi.in/images/og-repair-saathi.png",
    ],
    creator: "@ripendrakr",
    site: "@ripendrakr",
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  other: {
    "article:publisher": "https://www.facebook.com/profile.php?id=61583969564683",
    "article:modified_time": "2026-01-22T13:02:21+00:00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://repairsaathi.in/",
        url: "https://repairsaathi.in/",
        name: "AC Repair in Patna | Washing Machine & Refrigerator Service",
        isPartOf: { "@id": "https://repairsaathi.in/#website" },
        about: { "@id": "https://repairsaathi.in/#organization" },
        primaryImageOfPage: { "@id": "https://repairsaathi.in/#primaryimage" },
        image: { "@id": "https://repairsaathi.in/#primaryimage" },
        thumbnailUrl:
          "https://repairsaathi.in/images/logo.png",
        datePublished: "2025-10-03T06:56:30+00:00",
        dateModified: "2026-01-22T13:02:21+00:00",
        description:
          "Get expert AC, washing machine and refrigerator repair services in Patna. Fast, reliable and affordable solutions by skilled technicians near you",
        breadcrumb: { "@id": "https://repairsaathi.in/#breadcrumb" },
        inLanguage: "en-US",
        potentialAction: [
          {
            "@type": "ReadAction",
            target: ["https://repairsaathi.in/"],
          },
        ],
      },
      {
        "@type": "ImageObject",
        inLanguage: "en-US",
        "@id": "https://repairsaathi.in/#primaryimage",
        url: "https://repairsaathi.in/images/og-repair-saathi.png",
        contentUrl:
          "https://repairsaathi.in/images/og-repair-saathi.png",
        width: 1200,
        height: 630,
        caption: "Repair Saathi - Home Appliance Repair in Patna",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://repairsaathi.in/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://repairsaathi.in/#website",
        url: "https://repairsaathi.in/",
        name: "Repair Saathi",
        description: "Expert Technicians • Doorstep Service • Honest Pricing",
        publisher: { "@id": "https://repairsaathi.in/#organization" },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://repairsaathi.in/?s={search_term_string}",
            },
            "query-input": {
              "@type": "PropertyValueSpecification",
              valueRequired: true,
              valueName: "search_term_string",
            },
          },
        ],
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": "https://repairsaathi.in/#organization",
        name: "Repair Saathi",
        url: "https://repairsaathi.in/",
        logo: {
          "@type": "ImageObject",
          inLanguage: "en-US",
          "@id": "https://repairsaathi.in/#/schema/logo/image/",
          url: "https://repairsaathi.in/images/logo.png",
          contentUrl:
            "https://repairsaathi.in/images/logo.png",
          width: 512,
          height: 512,
          caption: "Repair Saathi",
        },
        image: { "@id": "https://repairsaathi.in/#/schema/logo/image/" },
        sameAs: [
          "https://www.facebook.com/profile.php?id=61583969564683",
          "https://www.instagram.com/a2zsmttc/",
          "https://www.linkedin.com/in/ripendrakr/",
          "https://x.com/ripendrakr",
          "https://www.threads.com/@a2zsmttc",
        ],
      },
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": "https://repairsaathi.in/#localbusiness",
        name: "Repair Saathi",
        image:
          "https://repairsaathi.in/images/logo.png",
        telephone: "+91-9304415657",
        email: "infohrepairsaathi@gmail.com",
        url: "https://repairsaathi.in/",
        priceRange: "₹₹",
        parentOrganization: { "@id": "https://repairsaathi.in/#organization" },
        sameAs: [
          "https://www.facebook.com/profile.php?id=61583969564683",
          "https://www.instagram.com/a2zsmttc/",
          "https://www.linkedin.com/in/ripendrakr/",
          "https://x.com/ripendrakr",
          "https://www.threads.com/@a2zsmttc",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "RR Guest House, Ground floor, Near Hi Tech Hospital, Saguna More Balaji Nagar",
          addressLocality: "Patna",
          addressRegion: "Bihar",
          postalCode: "801503",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "25.6224743",
          longitude: "85.0402694",
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
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          property="article:publisher"
          content="https://www.facebook.com/profile.php?id=61583969564683"
        />
        <meta
          property="article:modified_time"
          content="2026-01-22T13:02:21+00:00"
        />
        <link
          rel="preload"
          as="image"
          href="/images/freeze-repair-dark.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/logo.webp"
          type="image/webp"
        />
        <script
          type="application/ld+json"
          className="yoast-schema-graph"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />
      </head>
      <body className={nunito.variable}>
        <ThreeBackground />
        <GsapProvider>
          <Navbar />
          <div className="site-content-wrapper">
            <main>{children}</main>
            <Footer />
          </div>
          <FloatingActions />
        </GsapProvider>
      </body>
    </html>
  );
}
