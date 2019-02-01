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
      fill: '#9ce5f4',
      shadowBlur: 0,
      shadowColor: '#66eece',
      hoverCursor: 'pointer',
      translate: [0, 0]
    },
    hoverAble: true,
    dragAble: true,
    mouseEnter (e) {
      this.animationTo('shape', { w: 400 }, true)
      this.animationTo('style', { shadowBlur: 20, translate: [-100, 0] })
    },
    mouseOuter (e) {
      this.animationTo('shape', { w: 200 }, true)
      this.animationTo('style', { shadowBlur: 0, translate: [0, 0] })
    }
  }
}