import { NextResponse } from "next/server";

export interface CategoryDto {
  id: string | number;
  name: string;
  slug: string;
  description?: string;
  image?: string | null;
  icon?: string | null;
  serviceId?: string;
}

const DEFAULT_CATEGORIES: CategoryDto[] = [
  {
    id: 1,
    name: "Air Conditioner Repair",
    slug: "ac-repair-in-patna",
    serviceId: "ac-repair",
    description: "Complete AC repair, power jet chemical wash, gas filling and installation service in Patna.",
  },
  {
    id: 2,
    name: "Refrigerator Repair",
    slug: "refrigerator-service-in-patna",
    serviceId: "refrigerator-repair",
    description: "Single and double door refrigerator repair, compressor fixing and gas refilling.",
  },
  {
    id: 3,
    name: "Washing Machine Repair",
    slug: "washing-machine-repair-service-in-patna",
    serviceId: "washing-machine",
    description: "Expert washing machine repair in Patna for front-load, top-load, and semi-automatic machines.",
  },
  {
    id: 4,
    name: "Water Purifier Repair",
    slug: "water-cooler-services",
    serviceId: "water-cooler",
    description: "RO water purifier service, membrane change, filter replacement and repair.",
  },
  {
    id: 5,
    name: "Geyser Repair",
    slug: "geyser-repair-in-patna",
    serviceId: "geyser-repair",
    description: "Geyser repair, installation and maintenance service for instant and storage water heaters.",
  },
  {
    id: 6,
    name: "Microwave Repair",
    slug: "microwave-repair-in-patna",
    serviceId: "microwave-repair",
    description: "Microwave oven repair and servicing for all solo, grill and convection models.",
  },
  {
    id: 7,
    name: "Kitchen Chimney Repair",
    slug: "kitchen-chimney-repair-in-patna",
    serviceId: "chimney-repair",
    description: "Kitchen chimney deep cleaning, motor repair, duct fixing and servicing.",
  },
  {
    id: 8,
    name: "Window AC Services",
    slug: "window-ac-service-in-patna",
    serviceId: "window-ac",
    description: "Window AC cleaning, gas charging and cooling repair in Patna.",
  },
];

// Map category name to appropriate service slug and serviceId
function resolveCategoryMapping(name: string): { slug: string; serviceId: string; formattedName: string } {
  const lower = name.toLowerCase();

  if (lower.includes("air condition") || lower.includes("ac ") || lower === "ac") {
    return {
      slug: "ac-repair-in-patna",
      serviceId: "ac-repair",
      formattedName: lower.includes("repair") ? name : `${name} Repair`,
    };
  }
  if (lower.includes("window ac")) {
    return {
      slug: "window-ac-service-in-patna",
      serviceId: "window-ac",
      formattedName: lower.includes("service") ? name : `${name} Services`,
    };
  }
  if (lower.includes("fridge") || lower.includes("refrigerator")) {
    return {
      slug: "refrigerator-service-in-patna",
      serviceId: "refrigerator-repair",
      formattedName: lower.includes("repair") ? name : `${name} Repair`,
    };
  }
  if (lower.includes("washing")) {
    return {
      slug: "washing-machine-repair-service-in-patna",
      serviceId: "washing-machine",
      formattedName: lower.includes("repair") ? name : `${name} Repair`,
    };
  }
  if (lower.includes("water") || lower.includes("purifier") || lower.includes("ro ")) {
    return {
      slug: "water-cooler-services",
      serviceId: "water-cooler",
      formattedName: lower.includes("repair") || lower.includes("purifier") ? name : `${name} Repair`,
    };
  }
  if (lower.includes("geyser") || lower.includes("water heater")) {
    return {
      slug: "geyser-repair-in-patna",
      serviceId: "geyser-repair",
      formattedName: lower.includes("repair") ? name : `${name} Repair`,
    };
  }
  if (lower.includes("microwave") || lower.includes("oven")) {
    return {
      slug: "microwave-repair-in-patna",
      serviceId: "microwave-repair",
      formattedName: lower.includes("repair") ? name : `${name} Repair`,
    };
  }
  if (lower.includes("chimney")) {
    return {
      slug: "kitchen-chimney-repair-in-patna",
      serviceId: "chimney-repair",
      formattedName: lower.includes("repair") ? name : `${name} Repair`,
    };
  }

  // Fallback slug for other categories (like Home Decorator, Laptop, etc.)
  const fallbackSlug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  return {
    slug: fallbackSlug,
    serviceId: fallbackSlug,
    formattedName: name,
  };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
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
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(`${backendUrl}/api/category/get-all-categories?limit=50`, {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const rows = data.data || [];

        if (Array.isArray(rows) && rows.length > 0) {
          const formatted: CategoryDto[] = rows.map((cat: any) => {
            const mapping = resolveCategoryMapping(cat.name || "");
            let imageUrl = cat.image || null;
            if (imageUrl && !imageUrl.startsWith("http")) {
              imageUrl = `${backendUrl}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
            }

            return {
              id: cat.id,
              name: mapping.formattedName,
              slug: mapping.slug,
              serviceId: mapping.serviceId,
              description: cat.description || "",
              image: imageUrl,
              icon: cat.icon || null,
            };
          });

          return NextResponse.json({
            success: true,
            source: "backend",
            backendUrl,
            data: formatted,
          }, {
            headers: {
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            },
          });
        }
      }
    } catch {
      // Try next candidate
      continue;
    }
  }

  return NextResponse.json({
    success: true,
    source: "fallback",
    data: DEFAULT_CATEGORIES,
  });
}

