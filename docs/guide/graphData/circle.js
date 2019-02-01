export default function (render) {
  const { area: [w, h] } = render

  return {
    name: 'circle',
    animationCurve: 'easeOutBack',
    shape: {
      rx: w / 2,
      ry: h / 2,
      r: 50
    },
    style: {
      fill: '#9ce5f4',
      shadowBlur: 0,
      shadowColor: '#66eece',
      hoverCursor: 'pointer'
    },
    hoverAble: true,
    dragAble: true,
    mouseEnter (e) {
      this.animationTo('shape', { r: 70 }, true)
      this.animationTo('style', { shadowBlur: 20 })
    },
    mouseOuter (e) {
      this.animationTo('shape', { r: 50 }, true)
      this.animationTo('style', { shadowBlur: 0 })
    }
  }
}