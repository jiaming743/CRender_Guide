export default function (render) {
  const { area: [w, h] } = render

  return {
    name: 'bezierCurve',
    animationCurve: 'easeOutBack',
    shape: {
      points: [
        [20, 20],
        [
          [20, 100], [200, 100], [200, 20]
        ]
      ]
    },
    style: {
      lineWidth: 10,
      stroke: '#9ce5f4',
      shadowBlur: 0,
      shadowColor: '#66eece',
      hoverCursor: 'pointer'
    },
    hoverAble: true,
    dragAble: true,
    mouseEnter (e) {
      this.animationTo('style', { lineWidth: 20, shadowBlur: 20 })
    },
    mouseOuter (e) {
      this.animationTo('style', { lineWidth: 10, shadowBlur: 0 })
    }
  }
}