"use client"

import { useEffect, useRef, useState } from "react"
import { motion, type MotionProps, useReducedMotion } from "motion/react"
import { toast } from "sonner"

import { TiltCard } from "@/components/ui/tilt-card"
import { siteConfig } from "@/data/config"
import { siteContent } from "@/data/content"
import { projectList } from "@/data/projects"

import { BadgeBack } from "./badge-back"
import { BadgeFront } from "./badge-front"

const COPY_RESET_DELAY_MS = 1800
const FLICKER_CHANCE = 0.78
const FLIP_TRANSITION: NonNullable<MotionProps["transition"]> = {
  type: "spring",
  bounce: 0,
  duration: 0.75,
}

export function PhysicalBadge() {
  const [isShowingProjects, setIsShowingProjects] = useState(false)
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const copyResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { badge } = siteContent

  const flipTransition: NonNullable<MotionProps["transition"]> =
    prefersReducedMotion ? { duration: 0 } : FLIP_TRANSITION
  const flickerChance = prefersReducedMotion ? 0 : FLICKER_CHANCE

  useEffect(() => {
    return () => {
      if (copyResetTimeoutRef.current) {
        clearTimeout(copyResetTimeoutRef.current)
      }
    }
  }, [])

  const handleCopyEmail = async () => {
    if (hasCopiedEmail) return

    try {
      await navigator.clipboard.writeText(siteConfig.author.email)
      setHasCopiedEmail(true)
      toast.success(badge.toasts.copySuccess, {
        description: siteConfig.author.email,
      })

      if (copyResetTimeoutRef.current) {
        clearTimeout(copyResetTimeoutRef.current)
      }

      copyResetTimeoutRef.current = setTimeout(() => {
        setHasCopiedEmail(false)
      }, COPY_RESET_DELAY_MS)
    } catch {
      toast.error(badge.toasts.copyError, {
        description: siteConfig.author.email,
      })
    }
  }

  return (
    <section className="badge-shell" aria-label={badge.ariaLabel}>
      <TiltCard
        className="badge-tilt"
        disabled={isShowingProjects || Boolean(prefersReducedMotion)}
      >
        <motion.div
          className="badge-card"
          initial={false}
          animate={{ rotateY: isShowingProjects ? 180 : 0 }}
          transition={flipTransition}
        >
          <BadgeFront
            isHidden={isShowingProjects}
            flickerChance={flickerChance}
            onShowProjects={() => setIsShowingProjects(true)}
          />
          <BadgeBack
            isHidden={!isShowingProjects}
            flickerChance={flickerChance}
            projects={projectList}
            hasCopiedEmail={hasCopiedEmail}
            onBack={() => setIsShowingProjects(false)}
            onCopyEmail={handleCopyEmail}
          />
        </motion.div>
      </TiltCard>
    </section>
  )
}
