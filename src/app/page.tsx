import { AmbientGridBackground } from "@/components/sections/ambient-grid-background"
import { PhysicalBadge } from "@/components/sections/physical-badge"

export default function Home() {
  return (
    <main className="badge-stage">
      <AmbientGridBackground />
      <PhysicalBadge />
    </main>
  )
}
