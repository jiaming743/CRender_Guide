import { getTwoPointDistance, checkPointIsInPolygon, getDistanceBetweenPointAndLine } from '../extend/methods'

export const circle = {
  shape: {
    rx: 0,
    ry: 0,
    r: 10
  },

  draw (ctx, shape, style) {
    ctx.beginPath()

    const { rx, ry, r } = shape

    ctx.arc(rx, ry, r, 0, Math.PI * 2)

    ctx.fill()
    ctx.stroke()

    ctx.closePath()
  },

  hoverCheck (pos, shape, style) {
    const { rx, ry, r } = shape

    const distance = getTwoPointDistance(pos, [rx, ry])

    return distance <= r
  },

  setGraphOrigin (shape, style) {
    const { rx, ry } = shape

    style.graphOrigin = [rx, ry]
  },

  drag ({movementX, movementY}, shape, style) {
    this.attr('shape', {
      rx: shape.rx + movementX,
      ry: shape.ry + movementY
    })
  }
}

export const ring = {
  shape: {
    rx: 0,
    ry: 0,
    r: 50
  },

  draw (ctx, shape, style) {
    ctx.beginPath()

    const { rx, ry, r } = shape

    ctx.arc(rx, ry, r, 0, Math.PI * 2)

    ctx.stroke()

    ctx.closePath()
  },

  hoverCheck (pos, shape, style) {
    const { rx, ry, r } = shape

    const { lineWidth } = style

    const halfLineWidth = lineWidth / 2

    const minDistance = r - halfLineWidth
    const maxDistance = r + halfLineWidth

    const distance = getTwoPointDistance(pos, [rx, ry])

    return (distance >= minDistance && distance <= maxDistance)
  },

  setGraphOrigin (shape, style) {
    const { rx, ry } = shape

    style.graphOrigin = [rx, ry]
  },

  drag ({movementX, movementY}, shape, style) {
    this.attr('shape', {
      rx: shape.rx + movementX,
      ry: shape.ry + movementY
    })
  }
}

export const ellipse = {
  shape: {
    rx: 0,
    ry: 0,
    hr: 10,
    vr: 5
  },

  draw (ctx, shape, style) {
    ctx.beginPath()

    let { rx, ry, hr, vr } = shape

    ctx.ellipse(rx, ry, hr, vr, 0, 0, Math.PI * 2)

    ctx.fill()
    ctx.stroke()

    ctx.closePath()
  },

  hoverCheck (pos, shape, style) {
    const { rx, ry, hr, vr } = shape

    const a = Math.max(hr, vr)
    const b = Math.min(hr, vr)

    const c = Math.sqrt(a * a - b * b)

    const leftFocusPoint = [rx - c, ry]
    const rightFocusPoint = [rx + c, ry]

    const distance = getTwoPointDistance(pos, leftFocusPoint) + getTwoPointDistance(pos, rightFocusPoint)

    return distance <= 2 * a
  },

  setGraphOrigin (shape, style) {
    const { rx, ry } = shape

    style.graphOrigin = [rx, ry]
  },

  drag ({movementX, movementY}, shape, style) {
    this.attr('shape', {
      rx: shape.rx + movementX,
      ry: shape.ry + movementY
    })
  }
}

export const rect = {
  shape: {
    x: 0,
    y: 0,
    w: 20,
    h: 5
  },

  draw (ctx, shape, style) {
    ctx.beginPath()

    let { x, y, w, h } = shape

    ctx.rect(x, y, w, h)

    ctx.fill()
    ctx.stroke()

    ctx.closePath()
  },

  hoverCheck ([px, py], shape, style) {
    let { x, y, w, h } = shape

    if (px < x) return false
    if (py < y) return false

    if (px > x + w) return false
    if (py > y + h) return false

    return true
  },

  setGraphOrigin (shape, style) {
    const { x, y } = shape

    style.graphOrigin = [x, y]
  },

  drag ({movementX, movementY}, shape, style) {
    this.attr('shape', {
      x: shape.x + movementX,
      y: shape.y + movementY
    })
  }
}

export const polygon = {
  shape: {
    points: [
      [0, 0],
      [10, 10],
      [20, 20]
    ]
  },

  draw (ctx, shape, style) {
    ctx.beginPath()

    let { points } = shape

    points.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(...point)
      } else {
        ctx.lineTo(...point)
      }
    })

    ctx.closePath()

    ctx.fill()
    ctx.stroke()
  },

  hoverCheck (point, shape, style) {
    let { points } = shape

    return checkPointIsInPolygon(point, points)
  },

  setGraphOrigin (shape, style) {
    const { points } = shape

    style.graphOrigin = points[0]
  },

  drag ({movementX, movementY}, shape, style) {
    const { points } = shape

    const moveAfterPoints = points.map(([x, y]) => [x + movementX, y + movementY])

    this.attr('shape', {
      points: moveAfterPoints
    })
  }
}

export const polyline = {
  shape: {
    points: [
      [0, 0],
      [10, 10],
      [30, 30]
    ]
  },

  draw (ctx, shape, style) {
    ctx.beginPath()

    let { points } = shape

    points.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(...point)
      } else {
        ctx.lineTo(...point)
      }
    })

    ctx.stroke()

    ctx.closePath()
  },

  hoverCheck (point, shape, style) {
    let { points } = shape

    const lineNum = points.length - 1

    const { lineWidth } = style

    const minus = lineWidth / 2

    if (lineNum === 0) return false

    const lines = new Array(lineNum).fill('').map((t, i) => [points[i], points[i + 1]])

    const result = lines.find(line => getDistanceBetweenPointAndLine(point, ...line) <= minus)

    return result
  },

  setGraphOrigin (shape, style) {
    const { points } = shape

    style.graphOrigin = points[0]
  },

  drag ({movementX, movementY}, shape, style) {
    const { points } = shape

    const moveAfterPoints = points.map(([x, y]) => [x + movementX, y + movementY])

    this.attr('shape', {
      points: moveAfterPoints
    })
  }
}

export default new Map([
  ['circle', circle],
  ['ellipse', ellipse],
  ['rect', rect],
  ['polygon', polygon],
  ['ring', ring],
  ['polyline', polyline]
])