import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/ac-service-in-saguna-more/",
        destination: "/home-appliance-repair-blog/?slug=ac-service-saguna-more-complete-guide-repair-installation",
        permanent: true,
      },
      {
        source: "/home-appliance-repair-in-patna/",
        destination: "/home-appliance-repair-blog/?slug=home-appliance-repair-patna-problems-solutions-guide",
        permanent: true,
      },
      {
        source: "/my-refrigerator-not-cooling/",
        destination: "/home-appliance-repair-blog/?slug=why-is-my-refrigerator-not-cooling-common-problems",
        permanent: true,
      },
      {
        source: "/geyser-repair-phulwari-sharif-common-problems-solutions/",
        destination: "/home-appliance-repair-blog/?slug=geyser-repair-phulwari-sharif-common-problems-solutions",
        permanent: true,
      },
      {
        source: "/ac-repair-danapur-saguna-khagaul/",
        destination: "/home-appliance-repair-blog/?slug=ac-repair-patna-lg-voltas-daikin-danapur-saguna-more",
        permanent: true,
      },
      {
        source: "/washing-machine-repair-danapur/",
        destination: "/home-appliance-repair-blog/?slug=washing-machine-problems-danapur-expert-repair",
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
