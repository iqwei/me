import type { CSSProperties } from "react"

const softCells = [
  { column: -3, row: 2, delay: "-2s" },
  { column: 2, row: 1, delay: "-7s" },
  { column: 4, row: 2, delay: "-11s" },
  { column: 2, row: 3, delay: "-5s" },
]

const pixelClusters = [
  {
    column: -1,
    row: 1,
    corner: "tr",
    delay: -0.8,
    pixels: ["glass", "blue", null, null, "blue", "glass", "lime", null, "blue"],
  },
  {
    column: 3,
    row: 2,
    corner: "tl",
    delay: -3.2,
    pixels: ["blue", null, "glass", "glass", "lime", null, null, "blue", "glass"],
  },
  {
    column: -2,
    row: 4,
    corner: "br",
    delay: -5.6,
    pixels: [null, "glass", "blue", "blue", null, "glass", "glass", "lime", null],
  },
]

function cssVars(vars: Record<`--${string}`, string | number>) {
  return vars as CSSProperties
}

function repeatGridSize(count: number) {
  return Array.from({ length: Math.abs(count) }, () => "var(--ambient-grid-size)")
    .join(count < 0 ? " - " : " + ")
}

function gridX(column: number) {
  if (column === 0) {
    return "calc(50% - var(--ambient-grid-half))"
  }

  const operator = column < 0 ? "-" : "+"
  return `calc(50% - var(--ambient-grid-half) ${operator} ${repeatGridSize(column)})`
}

function gridY(row: number) {
  if (row === 0) {
    return "0px"
  }

  return `calc(${repeatGridSize(row)})`
}

export function AmbientGridBackground() {
  return (
    <div className="ambient-grid-bg" aria-hidden="true">
      {softCells.map((cell) => (
        <span
          key={`${cell.column}-${cell.row}`}
          className="ambient-grid-cell"
          style={cssVars({
            "--ambient-cell-top": gridY(cell.row),
            "--ambient-cell-left": gridX(cell.column),
            "--ambient-cell-delay": cell.delay,
          })}
        />
      ))}

      {pixelClusters.map((cluster) => (
        <div
          key={`${cluster.column}-${cluster.row}-${cluster.corner}`}
          className={`ambient-pixel-cluster ambient-corner-${cluster.corner}`}
          style={cssVars({
            "--ambient-cluster-x": gridX(cluster.column),
            "--ambient-cluster-y": gridY(cluster.row),
          })}
        >
          {cluster.pixels.map((tone, pixelIndex) => (
            <span
              key={pixelIndex}
              className={
                tone
                  ? `ambient-pixel ambient-pixel-${tone}`
                  : "ambient-pixel ambient-pixel-empty"
              }
              style={cssVars({
                "--ambient-pixel-delay": `${cluster.delay - pixelIndex * 0.36}s`,
              })}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
