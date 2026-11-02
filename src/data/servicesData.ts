export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  image: string;
  price: string;
  originalPrice?: string;
  discountBadge?: string;
  rating: number;
  reviewsCount: number;
  description: string;
  features: string[];
  inclusions: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "geyser-repair",
    slug: "geyser-repair-in-patna",
    title: "Geyser Repair in Patna",
    shortTitle: "Geyser Repair",
    category: "Geyser Services",
    image: "/images/geyser-repair.webp",
    price: "₹199.00",
    originalPrice: "₹399.00",
    discountBadge: "50% OFF",
    rating: 4.9,
    reviewsCount: 312,
    description: "Get quick and reliable geyser repair in Patna for instant, storage, and gas geysers. Our certified technicians resolve heating coil issues, thermostat faults, water leakage, and electrical short circuits on the same day.",
    features: [
      "Same-day doorstep inspection & repair",
      "Genuine heating elements & thermostat replacements",
      "90-day service warranty on parts replaced",
      "Trained technicians specialized in all top brands"
    ],
    inclusions: [
      "Complete electrical diagnosis & safety check",
      "Coil and thermostat testing",
      "Leakage inspection and tank check",
      "Post-repair functional testing"
    ]
  },
  {
    id: "microwave-repair",
    slug: "microwave-repair-in-patna",
    title: "Microwave Repair in Patna",
    shortTitle: "Microwave Repair",
    category: "Microwave Services",
    image: "/images/microwave-repair.webp",
    price: "₹199.00",
    originalPrice: "₹399.00",
    discountBadge: "50% OFF",
    rating: 4.8,
    reviewsCount: 245,
    description: "Professional microwave oven repair service in Patna. We repair solo, grill, and convection microwaves. Whether it's not heating, turntable not spinning, keypad unresponsive, or sparking inside, our experts fix it promptly.",
    features: [
      "Magnetron and high voltage diode troubleshooting",
      "Touch keypad repair & replacement",
      "Zero hidden fees with transparent rate card",
      "High-grade safety compliant testing"
    ],
    inclusions: [
      "Comprehensive multi-point inspection",
      "Microwave power circuit diagnostics",
      "Cleaning of interior magnetron chamber area",
      "Heating test and safety leakage test"
    ]
  },
  {
    id: "chimney-repair",
    slug: "kitchen-chimney-repair-in-patna",
    title: "Kitchen Chimney Repair in Patna",
    shortTitle: "Chimney Repair",
    category: "Chimney Services",
    image: "/images/chimney-repair.webp",
    price: "₹199.00",
    originalPrice: "₹399.00",
    discountBadge: "50% OFF",
    rating: 4.9,
    reviewsCount: 189,
    description: "Keep your kitchen smoke-free with specialized kitchen chimney repair and deep cleaning services across Patna. We fix auto-clean issues, motor humming noises, suction loss, and touch sensor defects.",
    features: [
      "Deep degreasing with high-pressure cleaning",
      "Motor, capacitor and impeller servicing",
      "Baffle and cassette filter chemical wash",
      "Supported brands: Glen, Faber, Hindware, Elica, Kaff, Sunflame"
    ],
    inclusions: [
      "Suction power and motor rotation analysis",
      "Duct pipe inspection for blockages",
      "Control panel & auto-clean mechanism check",
      "Complete operational trial"
    ]
  },
  {
    id: "window-ac",
    slug: "window-ac-service-in-patna",
    title: "Window AC Services in Patna",
    shortTitle: "Window AC Services",
    category: "AC Services",
    image: "/images/window-ac-service.webp",
    price: "₹199.00",
    originalPrice: "₹499.00",
    discountBadge: "40% OFF",
    rating: 4.9,
    reviewsCount: 420,
    description: "Keep your room chilled even in peak Patna heat. Comprehensive Window AC service, water-jet cleaning, gas charging, noise reduction, and compressor troubleshooting by certified AC mechanics.",
    features: [
      "Foam & high-pressure jet cleaning",
      "Refrigerant leak detection & charging (R22, R32, R410A)",
      "Vibration dampening and noise removal",
      "Thermostat and PCB circuit board repairs"
    ],
    inclusions: [
      "Cooling coil and condenser deep cleaning",
      "Air filter wash and antimicrobial sanitization",
      "Drain pipe unclogging and blower speed check",
      "Current amp load testing"
    ]
  },
  {
    id: "refrigerator-repair",
    slug: "refrigerator-service-in-patna",
    title: "Refrigerator Repair in Patna",
    shortTitle: "Refrigerator Repair",
    category: "Fridge / Refrigerator Services",
    image: "/images/freeze-repair-dark.webp",
    price: "₹199.00",
    originalPrice: "₹499.00",
    discountBadge: "60% OFF",
    rating: 4.9,
    reviewsCount: 560,
    description: "Top-rated fridge and refrigerator repair service in Patna. We service single-door, double-door, and side-by-side refrigerators. Fixing cooling loss, gas leakage, compressor tripping, ice buildup, and defrosting failures.",
    features: [
      "Doorstep repair in under 60-90 minutes",
      "Genuine relay, overload protector and thermostat spares",
      "High-precision refrigerant charging",
      "Compatible with LG, Samsung, Whirlpool, Godrej, Haier"
    ],
    inclusions: [
      "Gas pressure measurement and leak check",
      "Compressor electrical continuity & start test",
      "Defrost sensor and heater coil verification",
      "Temperature calibration"
    ]
  },
  {
    id: "ac-repair",
    slug: "ac-repair-in-patna",
    title: "AC Repair & Split AC Service in Patna",
    shortTitle: "AC Repair & Servicing",
    category: "AC Services",
    image: "/images/ac-repair-sec.webp",
    price: "₹199.00",
    originalPrice: "₹599.00",
    discountBadge: "50% OFF",
    rating: 5.0,
    reviewsCount: 780,
    description: "Affordable Split AC checkup and basic servicing in Patna. This service includes air filter cleaning and complete operational testing only.",
    features: [
      "Doorstep technician arrival within 30-60 minutes",
      "Air filter cleaning and dust removal",
      "Cooling performance & airflow test",
      "Transparent upfront pricing with zero hidden charges"
    ],
    inclusions: [
      "Air filter removal and thorough cleaning",
      "Basic electrical wiring and continuity check",
      "Cooling performance and airflow test",
      "Complete post-service operational testing"
    ]
  },
  {
    id: "washing-machine",
    slug: "washing-machine-repair-service-in-patna",
    title: "Washing Machine Services & Repair in Patna",
    shortTitle: "Washing Machine Repair",
    category: "Washing Machine Services",
    image: "/images/washing-machine-sec.webp",
    price: "₹199.00",
    originalPrice: "₹999.00",
    discountBadge: "80% OFF",
    rating: 4.9,
    reviewsCount: 610,
    description: "Expert washing machine repair in Patna for front-load, top-load, and semi-automatic machines. We fix spin drum not rotating, excessive vibration, water draining problems, motor humming, and error code troubleshooting.",
    features: [
      "Drum bearing and spider arm replacement",
      "Drain pump and inlet water valve repair",
      "Motherboard (PCB) chip level servicing",
      "Supported: IFB, Bosch, LG, Samsung, Whirlpool"
    ],
    inclusions: [
      "Drum balance and suspension shockers test",
      "Drain pipe and filter cleaning",
      "Drive belt tension check",
      "Full spin cycle demo and trial"
    ]
  },
  {
    id: "water-cooler",
    slug: "water-cooler-services",
    title: "Water Cooler & RO Purifier Services in Patna",
    shortTitle: "Water Cooler & RO Services",
    category: "Water Cooler Services",
    image: "/images/water-purifier.webp",
    price: "₹349.00",
    originalPrice: "₹999.00",
    discountBadge: "65% OFF",
    rating: 4.8,
    reviewsCount: 175,
    description: "Reliable commercial water cooler and domestic RO water purifier repair in Patna. Fast repair for compressor failures, cooling coil leaks, tap repairs, TDS balancing, membrane changes, and booster pump troubleshooting.",
    features: [
      "Sanitization and tank descaling",
      "Thermostat replacement & cooling tune-up",
      "Water leakage fixing and tap replacement",
      "Commercial and residential doorstep support"
    ],
    inclusions: [
      "Refrigerant leak and pressure inspection",
      "Electrical condenser fan inspection",
      "Filter cleaning and TDS test",
      "Leak-free operation test"
    ]
  }
];

export const popularCategories = [
  { name: "AC Service in Patna", link: "/product/ac-repair-in-patna/" },
  { name: "Washing Machine Services in Patna", link: "/product/washing-machine-repair-service-in-patna/" },
  { name: "Fridge / Refrigerator Services in Patna", link: "/product/refrigerator-service-in-patna/" },
  { name: "Geyser Service in Patna", link: "/product/geyser-repair-in-patna/" },
  { name: "Microwave Services", link: "/product/microwave-repair-in-patna/" },
  { name: "Chimney Services", link: "/product/kitchen-chimney-repair-in-patna/" },
  { name: "Water Cooler Services", link: "/product/water-cooler-services/" },
  { name: "Window AC Services", link: "/product/window-ac-service-in-patna/" }
];
