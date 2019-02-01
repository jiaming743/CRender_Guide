export default function (render) {
  const { area: [w, h] } = render

  return {
    name: 'ellipse',
    animationCurve: 'easeOutBack',
    shape: {
      rx: w / 2,
      ry: h / 2,
      hr: 80,
      vr: 30
    },
    style: {
      fill: '#9ce5f4',
      shadowBlur: 0,
      shadowColor: '#66eece',
      scale: [1, 1],
      hoverCursor: 'pointer'
    },
    hoverAble: true,
    dragAble: true,
    mouseEnter (e) {
      this.animationTo('style', { scale: [2, 2], shadowBlur: 20 })
    },
    mouseOuter (e) {
      this.animationTo('style', { scale: [1, 1], shadowBlur: 0 })
    }
  }
}