import type { Project } from "@/data/projects"
import { siteContent } from "@/data/content"

import { BadgeFlicker } from "./badge-flicker"
import { BadgeProjectList } from "./badge-project-list"
import { EmailActionButton } from "./email-action-button"

export interface BadgeBackProps {
  isHidden: boolean
  flickerChance: number
  projects: Project[]
  hasCopiedEmail: boolean
  onBack: () => void
  onCopyEmail: () => void
}

export function BadgeBack({
  isHidden,
  flickerChance,
  projects,
  hasCopiedEmail,
  onBack,
  onCopyEmail,
}: BadgeBackProps) {
  const { badge } = siteContent

  return (
    <div className="badge-face badge-face-back" aria-hidden={isHidden} inert={isHidden}>
      <BadgeFlicker flickerChance={flickerChance} />
      <div className="badge-slot" aria-hidden="true" />

      <div className="badge-topline">
        <span>{badge.projectsHeading}</span>
        <button type="button" className="badge-pill-button" onClick={onBack}>
          {badge.actions.back}
        </button>
      </div>

      <BadgeProjectList projects={projects} />
      <EmailActionButton
        label={badge.actions.email}
        hasCopied={hasCopiedEmail}
        onCopy={onCopyEmail}
      />
    </div>
  )
}
