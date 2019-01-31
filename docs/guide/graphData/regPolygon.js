export default function (render) {
  const { area: [w, h] } = render

  return {
    name: 'regPolygon',
    animationCurve: 'easeOutBack',
    shape: {
      rx: w / 2,
      ry: h / 2,
      r: 60,
      side: 6
    },
    style: {
      fill: '#ffe793',
      hoverCursor: 'pointer',
      shadowBlur: 0,
      rotate: 0,
      shadowColor: '#46bd87'
    },
    hoverAble: true,
    dragAble: true,
    mouseEnter (e) {
      this.animationTo('shape', { endAngle: Math.PI, r: 100 }, true)
      this.animationTo('style', { shadowBlur: 20, rotate: 180 })
    },
    mouseOuter (e) {
      this.animationTo('shape', { endAngle: Math.PI / 3, r: 60 }, true)
      this.animationTo('style', { shadowBlur: 0, rotate: 0 })
    }
  }
}