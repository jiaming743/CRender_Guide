export function drawPolylinePath (ctx, points, beginPath = false, closePath = false) {
  if (!ctx || points.length < 3) return false

  if (beginPath) ctx.beginPath()

  points.forEach((point, i) =>
    point && (i === 0 ? ctx.moveTo(...point) : ctx.lineTo(...point)))

  if (closePath) ctx.closePath()
}

export default {
  drawPolylinePath
}