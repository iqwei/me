import posthog from "posthog-js"

import { siteConfig } from "@/data/config"
import { siteLinks } from "@/data/links"

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY

if (key) {
  posthog.init(key, {
    api_host: siteConfig.analytics.posthogApiHost,
    ui_host: siteLinks.analytics.posthogUi,
    defaults: siteConfig.analytics.posthogDefaultsDate,
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  })
}
