export const circle = {
  shape: {
    rx: 0,
    ry: 0,
    r: 0
  },

  validator (shape) {
    const { rx, ry, r } = shape

    if (typeof rx !== 'number' || typeof ry !== 'number' || typeof r !== 'number') {
      console.error('Shape configuration is abnormal!')

      return false
    }

    return true
  },

  draw ({ ctx }, { shape, style }) {
    ctx.beginPath()

    const { rx, ry, r } = shape

    ctx.arc(rx, ry, r, 0, Math.PI * 2)

    ctx.fill()
    ctx.stroke()

    ctx.closePath()
  },

  hoverCheck (pos, shape, style) {
    const { rx, ry, r } = shape

    return checkPointIsInCircle(rx, ry, r, pos)
  },

  setGraphCenter (shape, style) {
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

const graphs = new Map([
  ['circle', circle]
])

export default graphs

export function extendNewGraph (name, config) {
  if (!name || !config) {
    console.warn('extendNewGraph Missing Parameters!')

    return
  }

  config.set(name, config)
}