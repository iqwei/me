"use client"

import { useCallback, useEffect, useRef, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface TiltCardProps {
  disabled?: boolean
  tiltLimit?: number
  scale?: number
  perspective?: number
  className?: string
  children?: ReactNode
}

export function TiltCard({
  disabled = false,
  tiltLimit = 8,
  scale = 1.025,
  perspective = 1500,
  className,
  children,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  const setTransform = useCallback(
    (xRot: number, yRot: number, size: number) => {
      const el = ref.current
      if (!el) return

      el.style.transform = `perspective(${perspective}px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale(${size})`
    },
    [perspective]
  )

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (disabled) return

      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height
      const xRot = (py - 0.5) * (tiltLimit * 2)
      const yRot = (px - 0.5) * -(tiltLimit * 2)

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() =>
        setTransform(xRot, yRot, scale)
      )
    },
    [disabled, scale, setTransform, tiltLimit]
  )

  const handlePointerLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
    }

    setTransform(0, 0, 1)
  }, [setTransform])

  useEffect(() => {
    setTransform(0, 0, 1)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [setTransform])

  useEffect(() => {
    if (disabled) {
      handlePointerLeave()
    }
  }, [disabled, handlePointerLeave])

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn("tilt-card", className)}
    >
      {children}
    </div>
  )
}
