import { FlickeringGrid } from "@/components/ui/flickering-grid"

export interface BadgeFlickerProps {
  flickerChance: number
}

export function BadgeFlicker({ flickerChance }: BadgeFlickerProps) {
  return (
    <FlickeringGrid
      className="badge-flicker"
      aria-hidden="true"
      squareSize={2}
      density={95}
      flickerChance={flickerChance}
      maxOpacity={0.42}
      color="rgb(255, 255, 255)"
    />
  )
}
