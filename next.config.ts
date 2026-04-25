import type { NextConfig } from "next";

import { siteLinks } from "./src/data/links";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: siteLinks.analytics.posthogStaticAssets,
      },
      {
        source: "/ingest/array/:path*",
        destination: siteLinks.analytics.posthogArray,
      },
      {
        source: "/ingest/:path*",
        destination: siteLinks.analytics.posthogIngest,
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
