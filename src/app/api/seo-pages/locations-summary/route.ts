import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
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

      const res = await fetch(`${backendUrl}/api/seo-pages/locations-summary`, {
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
    { success: false, message: "Unable to reach locations summary service", data: [] },
    { status: 502 }
  );
}

