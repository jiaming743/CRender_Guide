import { getCircleRadianPoint } from '../../CRender/lib/util'

export default function (render) {
  const { area: [w, h] } = render

  const offsetX = w / 2
  const offsetY = h / 2

  const insideRadius = w / 5
  const outsideRadius = w / 3

  const PI2 = Math.PI * 2

  const PI2Div7 = PI2 / 7
  const PI2Div21 = PI2 / 21

  const insidePoints = new Array(7).fill('')
    .map((foo, i) => getCircleRadianPoint(offsetX, offsetY, insideRadius, PI2Div7 * i))

  const outsidePoints = new Array(21).fill('')
    .map((foo, i) => getCircleRadianPoint(offsetX, offsetY, outsideRadius, PI2Div21 * i))

  const points = insidePoints

  return {
    name: 'bezierCurve',
    animationCurve: 'easeOutBack',
    hover: true,
    drag: true,
    shape: {
      points,
      close: true
    },
    style: {
      fill: '#9ce5f4',
      shadowBlur: 0,
      shadowColor: '#66eece',
      hoverCursor: 'pointer'
    },
    mouseEnter (e) {
      this.animation('style', { lineWidth: 20, shadowBlur: 20 })
    },
    mouseOuter (e) {
      this.animation('style', { lineWidth: 10, shadowBlur: 0 })
    }
  }
}