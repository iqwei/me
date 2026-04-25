export interface Speckle {
  x: number
  y: number
  size: number
  opacity: number
}

export interface GridParams {
  speckles: Speckle[]
  dpr: number
}

export function getRgbaPrefix(color: string) {
  if (typeof window === "undefined") {
    return "rgba(0, 0, 0,"
  }

  const canvas = document.createElement("canvas")
  canvas.width = 1
  canvas.height = 1

  const ctx = canvas.getContext("2d")
  if (!ctx) {
    return "rgba(0, 0, 0,"
  }

  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)

  const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data)
  return `rgba(${r}, ${g}, ${b},`
}

export function setupGrid(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  density: number,
  squareSize: number,
  maxOpacity: number
): GridParams {
  const dpr = window.devicePixelRatio || 1
  const speckleCount = Math.max(1, Math.floor((width * height) / density))
  const speckles: Speckle[] = []

  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  for (let i = 0; i < speckleCount; i += 1) {
    speckles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.max(1, squareSize * (0.65 + Math.random() * 0.9)),
      opacity: Math.random() * maxOpacity,
    })
  }

  return { speckles, dpr }
}

export function updateSpeckles(
  speckles: Speckle[],
  deltaTime: number,
  flickerChance: number,
  maxOpacity: number
) {
  for (const speckle of speckles) {
    if (Math.random() < flickerChance * deltaTime) {
      speckle.opacity = Math.random() * maxOpacity
    }
  }
}

export function drawSpeckles(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  speckles: Speckle[],
  dpr: number,
  colorPrefix: string
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (const speckle of speckles) {
    ctx.fillStyle = `${colorPrefix}${speckle.opacity})`
    ctx.fillRect(
      speckle.x * dpr,
      speckle.y * dpr,
      speckle.size * dpr,
      speckle.size * dpr
    )
  }
}
