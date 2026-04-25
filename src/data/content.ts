export interface BadgeActionsContent {
  showProjects: string
  back: string
  email: string
}

export interface BadgeToastContent {
  copySuccess: string
  copyError: string
}

export interface BadgeContent {
  ariaLabel: string
  employerLabel: string
  roleLabel: string
  bio: string
  projectsHeading: string
  actions: BadgeActionsContent
  toasts: BadgeToastContent
}

export interface SiteContent {
  badge: BadgeContent
}

export const siteContent: SiteContent = {
  badge: {
    ariaLabel: "Oleksandr Halashevskyi work badge",
    employerLabel: "@ Sivo (YC W21)",
    roleLabel: "product engineer",
    bio: "I enjoy working on data-heavy systems that stay readable when things get messy.",
    projectsHeading: "selected work",
    actions: {
      showProjects: "view projects",
      back: "back",
      email: "email me",
    },
    toasts: {
      copySuccess: "Email copied",
      copyError: "Could not copy email",
    },
  },
}
