import { siteLinks } from "@/data/links"

export interface Project {
  id: string
  title: string
  description: string
  url: string
}

export const projectList: Project[] = [
  {
    id: "prostir",
    title: "prostir",
    description:
      "Shared-home management for residents, bookings and house resources.",
    url: siteLinks.projects.prostir,
  },
  {
    id: "flux",
    title: "flux",
    description:
      "Rust telemetry pipeline with live snapshots and rolling aggregation.",
    url: siteLinks.projects.flux,
  },
  {
    id: "unitrail",
    title: "unitrail.dev",
    description:
      "Audit trails, webhooks, and event history for B2B SaaS teams.",
    url: siteLinks.projects.unitrail,
  },
  {
    id: "boredbank",
    title: "boredbank",
    description: "Digital banking for board-game nights.",
    url: siteLinks.projects.boredbank,
  },
]
