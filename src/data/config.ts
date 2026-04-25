import type { ConfigDefaults } from "posthog-js"

import { siteLinks } from "@/data/links"

export interface AuthorConfig {
  name: string
  location: string
  email: string
}

export interface SeoConfig {
  title: string
  description: string
}

export interface AnalyticsConfig {
  posthogDefaultsDate: ConfigDefaults
  posthogApiHost: string
}

export interface SiteConfig {
  name: string
  domain: string
  author: AuthorConfig
  seo: SeoConfig
  analytics: AnalyticsConfig
}

export const siteConfig: SiteConfig = {
  name: "Oleksandr Halashevskyi",
  domain: "halashevskyi.nl",
  author: {
    name: "Oleksandr Halashevskyi",
    location: "Netherlands",
    email: "halashevskyi.nl@gmail.com",
  },
  seo: {
    title: "Oleksandr Halashevskyi",
    description:
      "Backend-leaning full-stack engineer.",
  },
  analytics: {
    posthogDefaultsDate: "2025-05-24",
    posthogApiHost:
      process.env.NEXT_PUBLIC_POSTHOG_HOST ??
      siteLinks.analytics.posthogIngestProxy,
  },
}
