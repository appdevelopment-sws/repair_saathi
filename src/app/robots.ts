import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/wp-admin/",
          "/wp-includes/",
          "/wp-content/plugins/",
          "/api/",
          "/my-bookings/",
        ],
      },
    ],
    sitemap: "https://repairsaathi.in/sitemap.xml",
    host: "https://repairsaathi.in",
  };
}
