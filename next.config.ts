import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/ac-service-in-saguna-more/",
        destination: "/home-appliance-repair-blog/ac-service-saguna-more-complete-guide-repair-installation/",
        permanent: true,
      },
      {
        source: "/home-appliance-repair-in-patna/",
        destination: "/home-appliance-repair-blog/home-appliance-repair-patna-problems-solutions-guide/",
        permanent: true,
      },
      {
        source: "/my-refrigerator-not-cooling/",
        destination: "/home-appliance-repair-blog/why-is-my-refrigerator-not-cooling-common-problems/",
        permanent: true,
      },
      {
        source: "/geyser-repair-phulwari-sharif-common-problems-solutions/",
        destination: "/home-appliance-repair-blog/geyser-repair-phulwari-sharif-common-problems-solutions/",
        permanent: true,
      },
      {
        source: "/ac-repair-danapur-saguna-khagaul/",
        destination: "/home-appliance-repair-blog/ac-repair-patna-lg-voltas-daikin-danapur-saguna-more/",
        permanent: true,
      },
      {
        source: "/washing-machine-repair-danapur/",
        destination: "/home-appliance-repair-blog/washing-machine-problems-danapur-expert-repair/",
        permanent: true,
      },
      {
        source: "/kitchen-chimney-repair-bailey-road/",
        destination: "/product/kitchen-chimney-repair-in-patna/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
