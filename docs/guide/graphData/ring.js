export default function (render) {
  const { area: [w, h] } = render

  return {
    name: 'ring',
    animationCurve: 'easeOutBack',
    shape: {
      rx: w / 2,
      ry: h / 2,
      r: 50
    },
    style: {
      stroke: '#ffe793',
      lineWidth: 20,
      hoverCursor: 'pointer',
      shadowBlur: 0,
      shadowColor: '#46bd87'
    },
    hoverAble: true,
    dragAble: true,
    mouseEnter (e) {
      this.animationTo('shape', { r: 60 }, true)
      this.animationTo('style', { shadowBlur: 20 })
    },
    mouseOuter (e) {
      this.animationTo('shape', { r: 50 }, true)
      this.animationTo('style', { shadowBlur: 0 })
    }
  }
}