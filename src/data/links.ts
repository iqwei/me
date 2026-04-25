export interface SocialLinks {
  x: string
}

export interface ProjectLinks {
  prostir: string
  flux: string
  unitrail: string
  boredbank: string
}

export interface AnalyticsLinks {
  posthogIngestProxy: string
  posthogStaticAssets: string
  posthogArray: string
  posthogIngest: string
  posthogUi: string
}

export interface SiteLinks {
  site: string
  social: SocialLinks
  projects: ProjectLinks
  analytics: AnalyticsLinks
}

export const siteLinks: SiteLinks = {
  site: "https://ninetynine.dev",
  social: {
    x: "https://x.com/prostir_nl",
  },
  projects: {
    prostir: "https://prostir.nl",
    flux: "https://github.com/iqwei/flux",
    unitrail: "https://github.com/iqwei/unitrail",
    boredbank: "https://boredbank.app",
  },
  analytics: {
    posthogIngestProxy: "/ingest",
    posthogStaticAssets: "https://eu-assets.i.posthog.com/static/:path*",
    posthogArray: "https://eu-assets.i.posthog.com/array/:path*",
    posthogIngest: "https://eu.i.posthog.com/:path*",
    posthogUi: "https://eu.posthog.com",
  },
}
