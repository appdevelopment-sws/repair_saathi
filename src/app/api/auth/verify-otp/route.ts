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
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const res = await fetch(`${backendUrl}/api/auth/verify-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const json = await res.json();
        return NextResponse.json(json, { status: res.status });
      } catch {
        continue;
      }
    }

    return NextResponse.json(
      { success: false, message: "Backend authentication service is unreachable" },
      { status: 503 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to process request" },
      { status: 500 }
    );
  }
}

