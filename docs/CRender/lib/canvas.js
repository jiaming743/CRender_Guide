export function drawPolylinePath (ctx, points, beginPath = false, closePath = false) {
  if (!ctx || points.length < 2) return false

  if (beginPath) ctx.beginPath()

  points.forEach((point, i) =>
    point && (i === 0 ? ctx.moveTo(...point) : ctx.lineTo(...point)))

  if (closePath) ctx.closePath()
}

export function drawBezierCurvePath (ctx, points, moveTo = false, beginPath = false, closePath = false) {
  if (!ctx || !points) return false

  if (beginPath) ctx.beginPath()

  if (moveTo) ctx.moveTo(...moveTo)

  points.forEach(item => (item && ctx.bezierCurveTo(...item[0], ...item[1], ...item[2])))

  if (closePath) ctx.closePath()
}

export default {
  drawPolylinePath,
  drawBezierCurvePath
}