import { siteConfig } from "@/data/config"
import { siteContent } from "@/data/content"

import { BadgeFlicker } from "./badge-flicker"

export interface BadgeFrontProps {
  isHidden: boolean
  flickerChance: number
  onShowProjects: () => void
}

export function BadgeFront({
  isHidden,
  flickerChance,
  onShowProjects,
}: BadgeFrontProps) {
  const { badge } = siteContent

  return (
    <div className="badge-face badge-face-front" aria-hidden={isHidden} inert={isHidden}>
      <BadgeFlicker flickerChance={flickerChance} />
      <div className="badge-slot" aria-hidden="true" />

      <div className="badge-topline">
        <span>{badge.employerLabel}</span>
        <span>{siteConfig.author.location}</span>
      </div>

      <div className="badge-main">
        <p className="badge-kicker">
          {badge.roleLabel}
        </p>
        <h1>{siteConfig.author.name}</h1>
        <p>{badge.bio}</p>
      </div>

      <button type="button" className="badge-action" onClick={onShowProjects}>
        {badge.actions.showProjects}
      </button>
    </div>
  )
}
