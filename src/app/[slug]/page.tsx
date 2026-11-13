import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoLandingPageClient from "./SeoLandingPageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPageData(slug: string) {
  const candidateUrls = [
    process.env.BACKEND_INTERNAL_URL,
    process.env.NEXT_PUBLIC_BACKEND_URL,
    "http://host.docker.internal:8008",
    "http://127.0.0.1:8008",
    "http://localhost:8008",
  ].filter(Boolean) as string[];

  for (const backendUrl of candidateUrls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(`${backendUrl}/api/seo-pages/slug/${encodeURIComponent(slug)}`, {
        signal: controller.signal,
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch {
      continue;
    }
  }

  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageData(slug);

  if (!page) {
    return {
      title: "Page Not Found | Repair Saathi",
      description: "The requested repair service page could not be found.",
    };
  }

  return {
    title: page.metaTitle || `${page.h1Heading} | Repair Saathi`,
    description: page.metaDescription || page.heroDescription,
    keywords: page.metaKeywords
      ? page.metaKeywords.split(",").map((k: string) => k.trim())
      : [`${page.serviceName} in ${page.locationName}`, "repair saathi"],
    alternates: {
      canonical: page.canonicalUrl || `https://repairsaathi.in/${page.slug}`,
    },
    openGraph: {
      title: page.metaTitle || page.h1Heading,
      description: page.metaDescription || page.heroDescription,
      url: page.canonicalUrl || `https://repairsaathi.in/${page.slug}`,
      type: "website",
      images: page.ogImage ? [{ url: page.ogImage }] : undefined,
    },
  };
}

export default async function SeoLandingPageRoute({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageData(slug);

  if (!page) {
    notFound();
  }

  return <SeoLandingPageClient page={page} />;
}
