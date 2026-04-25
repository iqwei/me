"use client"

import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

import { useFlickeringGrid } from "./use-flickering-grid"

export interface FlickeringGridProps extends HTMLAttributes<HTMLDivElement> {
  squareSize?: number
  density?: number
  flickerChance?: number
  color?: string
  width?: number
  height?: number
  maxOpacity?: number
}

export function FlickeringGrid({
  squareSize = 2,
  density = 900,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  width,
  height,
  className,
  maxOpacity = 0.3,
  ...props
}: FlickeringGridProps) {
  const { canvasRef, containerRef } = useFlickeringGrid({
    squareSize,
    density,
    flickerChance,
    color,
    width,
    height,
    maxOpacity,
  })

  return (
    <div ref={containerRef} className={cn("h-full w-full", className)} {...props}>
      <canvas ref={canvasRef} className="pointer-events-none" />
    </div>
  )
}
