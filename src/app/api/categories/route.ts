import { NextResponse } from "next/server";

export interface CategoryServiceItem {
  id: number | string;
  title: string;
  price?: number | string | null;
  rateType?: string;
  duration?: string;
  shortDescription?: string;
}

export interface CategoryDto {
  id: string | number;
  name: string;
  slug: string;
  description?: string;
  image?: string | null;
  icon?: string | null;
  serviceId?: string;
  services?: CategoryServiceItem[];
}

export const DEFAULT_CATEGORIES: CategoryDto[] = [
  {
    id: 1,
    name: "Air Conditioner Repair",
    slug: "ac-repair-in-patna",
    serviceId: "ac-repair",
    icon: "Wind",
    description: "Complete AC repair, power jet chemical wash, gas filling and installation service in Patna.",
    services: [
      { id: "ac-1", title: "AC Repair/Service", price: "₹199" },
      { id: "ac-2", title: "AC Installation/ Removal", price: "₹499" },
      { id: "ac-3", title: "AC Gas Charging & Jet Service", price: "₹1,499" },
      { id: "ac-4", title: "Any Other AC related Service", price: "Inspection" },
    ],
  },
  {
    id: 2,
    name: "Refrigerator Repair",
    slug: "refrigerator-service-in-patna",
    serviceId: "refrigerator-repair",
    icon: "Snowflake",
    description: "Single and double door refrigerator repair, compressor fixing and gas refilling.",
    services: [
      { id: "ref-1", title: "Refrigerator Repair/Service", price: "₹199" },
      { id: "ref-2", title: "Gas Refilling & Leak Fix", price: "₹899" },
      { id: "ref-3", title: "Compressor Replacement", price: "₹1,499" },
      { id: "ref-4", title: "Any Other Refrigerator related Service", price: "Inspection" },
    ],
  },
  {
    id: 3,
    name: "Washing Machine Repair",
    slug: "washing-machine-repair-service-in-patna",
    serviceId: "washing-machine",
    icon: "Shirt",
    description: "Expert washing machine repair in Patna for front-load, top-load, and semi-automatic machines.",
    services: [
      { id: "wm-1", title: "Washing Machine Repair/Service", price: "₹199" },
      { id: "wm-2", title: "Drum & Vibration Repair", price: "₹399" },
      { id: "wm-3", title: "Motor & PCB Motherboard Servicing", price: "₹699" },
      { id: "wm-4", title: "Any Other Washing Machine related Service", price: "Inspection" },
    ],
  },
  {
    id: 4,
    name: "Water Purifier Repair",
    slug: "water-cooler-services",
    serviceId: "water-cooler",
    icon: "Droplets",
    description: "RO water purifier service, membrane change, filter replacement and repair.",
    services: [
      { id: "ro-1", title: "RO Service & Filter Replacement", price: "₹199" },
      { id: "ro-2", title: "Membrane Change & TDS Tuning", price: "₹799" },
      { id: "ro-3", title: "Booster Pump & Leakage Fix", price: "₹499" },
      { id: "ro-4", title: "Any Other Water Purifier related Service", price: "Inspection" },
    ],
  },
  {
    id: 5,
    name: "Geyser Repair",
    slug: "geyser-repair-in-patna",
    serviceId: "geyser-repair",
    icon: "Flame",
    description: "Geyser repair, installation and maintenance service for instant and storage water heaters.",
    services: [
      { id: "gey-1", title: "Geyser Repair/Service", price: "₹199" },
      { id: "gey-2", title: "Heating Element / Coil Replacement", price: "₹399" },
      { id: "gey-3", title: "Thermostat & Water Leakage Fix", price: "₹199" },
      { id: "gey-4", title: "Any Other Geyser related Service", price: "Inspection" },
    ],
  },
  {
    id: 6,
    name: "Microwave Repair",
    slug: "microwave-repair-in-patna",
    serviceId: "microwave-repair",
    icon: "Zap",
    description: "Microwave oven repair and servicing for all solo, grill and convection models.",
    services: [
      { id: "mw-1", title: "Microwave Repair/Service", price: "₹199" },
      { id: "mw-2", title: "Magnetron & Not Heating Fix", price: "₹499" },
      { id: "mw-3", title: "Keypad & Turntable Motor Repair", price: "₹349" },
      { id: "mw-4", title: "Any Other Microwave related Service", price: "Inspection" },
    ],
  },
  {
    id: 7,
    name: "Kitchen Chimney Repair",
    slug: "kitchen-chimney-repair-in-patna",
    serviceId: "chimney-repair",
    icon: "Fan",
    description: "Kitchen chimney deep cleaning, motor repair, duct fixing and servicing.",
    services: [
      { id: "ch-1", title: "Kitchen Chimney Deep Cleaning", price: "₹399" },
      { id: "ch-2", title: "Motor & Suction Repair", price: "₹499" },
      { id: "ch-3", title: "Baffle Filter Chemical Wash", price: "₹199" },
      { id: "ch-4", title: "Any Other Chimney related Service", price: "Inspection" },
    ],
  },
  {
    id: 8,
    name: "Window AC Services",
    slug: "window-ac-service-in-patna",
    serviceId: "window-ac",
    icon: "Wind",
    description: "Window AC cleaning, gas charging and cooling repair in Patna.",
    services: [
      { id: "wac-1", title: "Window AC Servicing & Cleaning", price: "₹199" },
      { id: "wac-2", title: "Window AC Gas Refilling", price: "₹1,199" },
      { id: "wac-3", title: "Installation & Uninstallation", price: "₹499" },
      { id: "wac-4", title: "Any Other Window AC related Service", price: "Inspection" },
    ],
  },
  {
    id: 9,
    name: "Television Repair",
    slug: "television-repair-in-patna",
    serviceId: "television",
    icon: "Tv",
    description: "Smart LED, LCD, OLED and Android TV screen, power board and audio repair.",
    services: [
      { id: "tv-1", title: "TV Screen Display & Backlight Fix", price: "₹499" },
      { id: "tv-2", title: "Motherboard & Power Board Repair", price: "₹699" },
      { id: "tv-3", title: "Sound & Speaker Repair", price: "₹349" },
      { id: "tv-4", title: "Any Other TV related Service", price: "Inspection" },
    ],
  },
  {
    id: 10,
    name: "Laptop Repair",
    slug: "laptop-repair-in-patna",
    serviceId: "laptop",
    icon: "Laptop",
    description: "Laptop screen, keyboard, battery, motherboard and Windows OS repair.",
    services: [
      { id: "lap-1", title: "Laptop Screen / Display Replacement", price: "₹499" },
      { id: "lap-2", title: "Motherboard & Chip-Level Servicing", price: "₹799" },
      { id: "lap-3", title: "Keyboard & Battery Replacement", price: "₹199" },
      { id: "lap-4", title: "Any Other Laptop related Service", price: "Inspection" },
    ],
  },
  {
    id: 11,
    name: "Home Decorator",
    slug: "home-decorator-services-in-patna",
    serviceId: "home-decorator",
    icon: "Home",
    description: "Professional home painting, interior decor and wall finishing services.",
    services: [
      { id: "dec-1", title: "Interior Wall Painting & Texture", price: "₹999" },
      { id: "dec-2", title: "Waterproofing & Crack Filling", price: "₹799" },
      { id: "dec-3", title: "Full Home Decor Consultation", price: "Free" },
      { id: "dec-4", title: "Any Other Home Decor Service", price: "Inspection" },
    ],
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
  if (lower.includes("television") || lower.includes("tv")) {
    return {
      slug: "television-repair-in-patna",
      serviceId: "television",
      formattedName: lower.includes("repair") ? name : `${name} Repair`,
    };
  }
  if (lower.includes("laptop") || lower.includes("computer")) {
    return {
      slug: "laptop-repair-in-patna",
      serviceId: "laptop",
      formattedName: lower.includes("repair") ? name : `${name} Repair`,
    };
  }
  if (lower.includes("decor") || lower.includes("paint")) {
    return {
      slug: "home-decorator-services-in-patna",
      serviceId: "home-decorator",
      formattedName: name,
    };
  }

  // Fallback slug for other categories
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

            let categoryServices: CategoryServiceItem[] = [];
            if (Array.isArray(cat.services) && cat.services.length > 0) {
              categoryServices = cat.services.map((s: any) => {
                const priceVal = s.effectivePrice ?? s.price;
                let formattedPrice = "Inspection";
                if (priceVal != null && priceVal !== "") {
                  const str = String(priceVal).trim();
                  formattedPrice = str.startsWith("₹") ? str : `₹${str}`;
                }

                return {
                  id: s.id,
                  title: s.title || s.name,
                  price: formattedPrice,
                  rateType: s.rateType || "fixed",
                  duration: s.duration,
                  shortDescription: s.shortDescription || "Includes complete diagnosis & 15 days service warranty",
                };
              });
            } else {
              const defaultMatch = DEFAULT_CATEGORIES.find(
                (d) =>
                  d.slug === mapping.slug ||
                  d.serviceId === mapping.serviceId ||
                  (cat.name && d.name.toLowerCase().includes(cat.name.toLowerCase().split(" ")[0]))
              );
              categoryServices = defaultMatch?.services || [
                { id: `${cat.id}-1`, title: `${cat.name} Repair/Service`, price: "₹199", shortDescription: "Includes complete diagnosis & 15 days service warranty" },
                { id: `${cat.id}-2`, title: `${cat.name} Installation & Diagnosis`, price: "₹499", shortDescription: "Includes complete diagnosis & 15 days service warranty" },
                { id: `${cat.id}-3`, title: `Any Other ${cat.name} related Service`, price: "Inspection", shortDescription: "Includes complete diagnosis & 15 days service warranty" },
              ];
            }

            return {
              id: cat.id,
              name: mapping.formattedName,
              slug: mapping.slug,
              serviceId: mapping.serviceId,
              description: cat.description || "",
              image: imageUrl,
              icon: cat.icon || null,
              services: categoryServices,
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

