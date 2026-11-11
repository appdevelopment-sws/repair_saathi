import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  blogsData,
  BlogPost,
  getBlogBySlug,
  getRelatedBlogs,
} from "@/data/blogsData";
import BlogPostClient from "./BlogPostClient";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
  return blogsData.map((post) => ({
    slug: post.slug,
  }));
}

// Fetch single blog: Check backend candidate URLs first, then fallback to static blogsData
async function fetchBlogPost(rawSlug: string): Promise<BlogPost | null> {
  const slug = decodeURIComponent(rawSlug).trim();
  if (!slug) return null;

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

      const res = await fetch(`${backendUrl}/api/blogs/${encodeURIComponent(slug)}`, {
        signal: controller.signal,
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const item = json.data;

          let formattedDate = "Recently Published";
          if (item.createdAt) {
            try {
              formattedDate = new Date(item.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              });
            } catch {
              formattedDate = "Recently Published";
            }
          }

          let tags: string[] = [];
          if (Array.isArray(item.tags)) {
            tags = item.tags;
          } else if (typeof item.tags === "string") {
            try {
              const parsed = JSON.parse(item.tags);
              if (Array.isArray(parsed)) tags = parsed;
              else tags = item.tags.split(",").map((s: string) => s.trim());
            } catch {
              tags = item.tags.split(",").map((s: string) => s.trim());
            }
          }

          const blogPost: BlogPost = {
            id: String(item.id),
            slug: item.slug,
            title: item.title,
            author: item.author || "Repair Saathi Technical Team",
            date: formattedDate,
            readTime: item.readTime || "5 min read",
            category: item.category || "Appliance Care",
            image: item.image || "/images/og-repair-saathi.png",
            imageLink: item.imageLink || undefined,
            excerpt: item.excerpt || "",
            content: item.content || "",
            tags,
            metaTitle: item.metaTitle || `${item.title} | Repair Saathi Patna`,
            metaDescription: item.metaDescription || item.excerpt,
            isFeatured: !!item.isFeatured,
          };
          return blogPost;
        }
      }
    } catch {
      continue;
    }
  }

  // Fallback to static blogsData if not found in database
  const staticPost = getBlogBySlug(slug);
  return staticPost || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);

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
  const post = await fetchBlogPost(slug);

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
    datePublished: post.date || new Date().toISOString(),
    dateModified: new Date().toISOString(),
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
