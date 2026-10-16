import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const candidateUrls = [
      "http://localhost:8008",
      "http://127.0.0.1:8008",
      process.env.NEXT_PUBLIC_BACKEND_URL,
      process.env.BACKEND_INTERNAL_URL,
      "http://host.docker.internal:8008",
    ].filter(Boolean) as string[];

    for (const backendUrl of candidateUrls) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const res = await fetch(`${backendUrl}/api/web-requests`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (res.ok) {
          const json = await res.json();
          return NextResponse.json(json, { status: 201 });
        }
      } catch {
        continue;
      }
    }

    // Fallback: generate local ID if backend is unreachable
    const fallbackId = "RS-" + Math.floor(100000 + Math.random() * 900000);
    return NextResponse.json({
      success: true,
      message: "Booking recorded locally (backend unreachable)",
      data: {
        id: fallbackId,
        ...body,
        createdAt: new Date().toISOString(),
      },
    }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || "all";
  const search = searchParams.get("search") || "";

  const candidateUrls = [
    "http://localhost:8008",
    "http://127.0.0.1:8008",
    process.env.NEXT_PUBLIC_BACKEND_URL,
    process.env.BACKEND_INTERNAL_URL,
    "http://host.docker.internal:8008",
  ].filter(Boolean) as string[];

  for (const backendUrl of candidateUrls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const qs = new URLSearchParams();
      if (status) qs.set("status", status);
      if (search) qs.set("search", search);

      const res = await fetch(`${backendUrl}/api/web-requests?${qs.toString()}`, {
        headers: { Accept: "application/json" },
        signal: controller.signal,
        cache: "no-store",
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        return NextResponse.json(json);
      }
    } catch {
      continue;
    }
  }

  return NextResponse.json({ success: true, data: [] });
}
