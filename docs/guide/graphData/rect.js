export default function (render) {
  const { area: [w, h] } = render

  const rectWidth = 200
  const rectHeight = 50

  return {
    name: 'rect',
    animationCurve: 'easeOutBack',
    shape: {
      x: w / 2 - rectWidth / 2,
      y: h / 2 - rectHeight / 2,
      w: rectWidth,
      h: rectHeight
    },
    style: {
      fill: '#ffe793',
      hoverCursor: 'pointer',
      shadowBlur: 0,
      shadowColor: '#46bd87'
    },
    hoverAble: true,
    dragAble: true,
    mouseEnter (e) {
      this.animationTo('shape', { w: 300 }, true)
      this.animationTo('style', { w: 250, shadowBlur: 20 })
    },
    mouseOuter (e) {
      this.animationTo('shape', { w: 200 }, true)
      this.animationTo('style', { shadowBlur: 0 })
    }
  }
}