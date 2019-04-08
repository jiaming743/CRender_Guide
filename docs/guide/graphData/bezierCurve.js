export default function (render) {
  const { area: [w, h] } = render

  return {
    name: 'bezierCurve',
    animationCurve: 'test',
    shape: {
      points: [
        [20,70],
        [[-12.5,60],[30,30],[50,30]],
        [[70,30],[75,70],[100,70]],
        [[125,70],[130,30],[150,30]],
        [[170,30],[212.5,60],[180,70]],
        [[147.5,80],[52.5,80],[20,70]]
      ]
      
    },
    style: {
      lineWidth: 2,
      stroke: '#9ce5f4',
      shadowBlur: 0,
      shadowColor: '#66eece',
      hoverCursor: 'pointer',
      lineDash: [0, 999],
      // lineCap: 'round'
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