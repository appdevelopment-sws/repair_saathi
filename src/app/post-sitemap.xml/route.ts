import { NextResponse } from "next/server";
import { blogsData } from "@/data/blogsData";

export async function GET() {
  const baseUrl = "https://repairsaathi.in";

  // Post sitemap items matching WordPress Yoast post-sitemap.xml structure
  const posts = [
    {
      loc: `${baseUrl}/home-appliance-repair-blog/`,
      lastmod: "2026-10-22T10:00:00+00:00",
      images: [] as string[],
    },
    {
      loc: `${baseUrl}/ac-service-in-saguna-more/`,
      lastmod: "2026-09-05T12:42:34+00:00",
      images: [`${baseUrl}/images/ac-repair-dark.webp`],
    },
    {
      loc: `${baseUrl}/home-appliance-repair-in-patna/`,
      lastmod: "2026-09-11T09:56:50+00:00",
      images: [`${baseUrl}/images/oven-sec.webp`],
    },
    {
      loc: `${baseUrl}/my-refrigerator-not-cooling/`,
      lastmod: "2026-09-19T06:55:05+00:00",
      images: [`${baseUrl}/images/refrigerator-sec.webp`],
    },
    {
      loc: `${baseUrl}/geyser-repair-phulwari-sharif-common-problems-solutions/`,
      lastmod: "2026-09-21T06:19:04+00:00",
      images: [`${baseUrl}/images/geyser-repair.webp`],
    },
    {
      loc: `${baseUrl}/ac-repair-danapur-saguna-khagaul/`,
      lastmod: "2026-09-24T09:35:43+00:00",
      images: [`${baseUrl}/images/ac-repair-sec.webp`],
    },
    {
      loc: `${baseUrl}/washing-machine-repair-danapur/`,
      lastmod: "2026-09-28T11:54:46+00:00",
      images: [`${baseUrl}/images/washing-machine-sec.webp`],
    },
    {
      loc: `${baseUrl}/kitchen-chimney-repair-bailey-road/`,
      lastmod: "2026-10-08T12:10:20+00:00",
      images: [`${baseUrl}/images/chimney-repair.webp`],
    },
    ...blogsData.map((b) => ({
      loc: `${baseUrl}/home-appliance-repair-blog/?slug=${b.slug}`,
      lastmod: "2026-10-22T10:00:00+00:00",
      images: [b.image.startsWith("http") ? b.image : `${baseUrl}${b.image}`],
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${posts
  .map(
    (p) => `\t<url>
\t\t<loc>${p.loc}</loc>
\t\t<lastmod>${p.lastmod}</lastmod>${
      p.images.length > 0
        ? "\n" +
          p.images
            .map(
              (img) => `\t\t<image:image>\n\t\t\t<image:loc>${img}</image:loc>\n\t\t</image:image>`
            )
            .join("\n")
        : ""
    }
\t</url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
