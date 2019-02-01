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
      stroke: '#9ce5f4',
      lineWidth: 20,
      hoverCursor: 'pointer',
      shadowBlur: 0,
      shadowColor: '#66eece'
    },
    hoverAble: true,
    dragAble: true,
    mouseEnter (e) {
      this.animationTo('style', { shadowBlur: 20, lineWidth: 30 })
    },
    mouseOuter (e) {
      this.animationTo('style', { shadowBlur: 0, lineWidth: 20 })
    }
  }
}