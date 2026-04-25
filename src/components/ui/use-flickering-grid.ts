"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import {
  drawSpeckles,
  getRgbaPrefix,
  setupGrid,
  type GridParams,
  updateSpeckles,
} from "@/lib/flickering-grid"

export interface UseFlickeringGridOptions {
  squareSize: number
  density: number
  flickerChance: number
  color: string
  width?: number
  height?: number
  maxOpacity: number
}

export function useFlickeringGrid({
  squareSize,
  density,
  flickerChance,
  color,
  width,
  height,
  maxOpacity,
}: UseFlickeringGridOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const colorPrefix = useMemo(() => getRgbaPrefix(color), [color])
  const shouldAnimate = flickerChance > 0

  const resizeCanvas = useCallback(
    (canvas: HTMLCanvasElement, container: HTMLDivElement) =>
      setupGrid(
        canvas,
        width || container.clientWidth,
        height || container.clientHeight,
        density,
        squareSize,
        maxOpacity
      ),
    [density, height, maxOpacity, squareSize, width]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId = 0
    let gridParams: GridParams = resizeCanvas(canvas, container)
    let lastTime = 0

    const drawFrame = () => {
      drawSpeckles(ctx, canvas, gridParams.speckles, gridParams.dpr, colorPrefix)
    }

    const animate = (time: number) => {
      if (!isInView) return

      if (lastTime === 0) {
        lastTime = time
      }

      const deltaTime = (time - lastTime) / 1000
      lastTime = time
      updateSpeckles(gridParams.speckles, deltaTime, flickerChance, maxOpacity)
      drawFrame()
      animationFrameId = requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver(() => {
      gridParams = resizeCanvas(canvas, container)
      if (isInView && !shouldAnimate) {
        drawFrame()
      }
    })

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => setIsInView(Boolean(entry?.isIntersecting)),
      { threshold: 0 }
    )

    resizeObserver.observe(container)
    intersectionObserver.observe(canvas)

    if (isInView) {
      if (shouldAnimate) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        drawFrame()
      }
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
    }
  }, [colorPrefix, flickerChance, isInView, maxOpacity, resizeCanvas, shouldAnimate])

  return { canvasRef, containerRef }
}
