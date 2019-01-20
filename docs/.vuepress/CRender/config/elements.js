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
  }
}

export default new Map([
  ['circle', circle]
])