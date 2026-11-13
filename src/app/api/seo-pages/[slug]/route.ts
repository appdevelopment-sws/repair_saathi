import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json(
      { success: false, message: "Slug is required" },
      { status: 400 }
    );
  }

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
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(`${backendUrl}/api/seo-pages/slug/${encodeURIComponent(slug)}`, {
        signal: controller.signal,
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data, {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate",
          },
        });
      }
    } catch {
      continue;
    }
  }

  return NextResponse.json(
    { success: false, message: "Page not found or service unreachable" },
    { status: 404 }
  );
}

