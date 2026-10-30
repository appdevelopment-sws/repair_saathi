import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  blogsData,
  getBlogBySlug,
  getRelatedBlogs,
} from "@/data/blogsData";
import BlogPostClient from "./BlogPostClient";

export async function generateStaticParams() {
  return blogsData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | Repair Saathi Patna",
      description: "The requested appliance repair guide could not be found.",
    };
  }

  const title = post.metaTitle || `${post.title} | Repair Saathi Patna`;
  const description = post.metaDescription || post.excerpt;
  const canonicalUrl = `https://repairsaathi.in/home-appliance-repair-blog/${post.slug}/`;
  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `https://repairsaathi.in${post.image}`;

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      siteName: "Repair Saathi Patna | Home Appliance Repair Experts",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
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
      title,
      description,
      images: [imageUrl],
      creator: "@ripendrakr",
      site: "@ripendrakr",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogs(post.slug, post.category, 3);
  const canonicalUrl = `https://repairsaathi.in/home-appliance-repair-blog/${post.slug}/`;
  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `https://repairsaathi.in${post.image}`;

  // Schema.org BlogPosting Structured Data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    headline: post.title,
    description: post.excerpt,
    image: [imageUrl],
    datePublished: "2026-09-01T00:00:00+05:30",
    dateModified: "2026-10-22T10:00:00+05:30",
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: "Certified Appliance Repair Technician",
      worksFor: {
        "@type": "Organization",
        name: "Repair Saathi",
        url: "https://repairsaathi.in/",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Repair Saathi",
      logo: {
        "@type": "ImageObject",
        url: "https://repairsaathi.in/images/logo.png",
      },
    },
    articleSection: post.category,
    inLanguage: "en-US",
  };

  // Schema.org BreadcrumbList Structured Data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://repairsaathi.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Appliance Repair Blog",
        item: "https://repairsaathi.in/home-appliance-repair-blog/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}

