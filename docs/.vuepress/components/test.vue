<template>
  <div class="test">
    <canvas ref="canvas" />
  </div>
</template>

<script>
import canvasMixin from '../mixins/canvasMixin.js'

import CRender from '../CRender/index.js'

export default {
  name: 'test',
  mixins: [canvasMixin],
  data () {
    return {}
  },
  methods: {
    async init () {
      const { initCanvas } = this

      await initCanvas('canvas')

      const cr = new CRender(this.$refs['canvas'])

      const circle = cr.add({
        name: 'circle',
        animationCurve: 'easeInOutBack',
        shape: {
          rx: 100,
          ry: 100,
          r: 50
        },
        style: {
          fill: '#66d7ee',
          hoverCursor: 'pointer',
        },
        hover: true,
        drag: true,
        index: 999,
        mouseEnter () {
          this.animationEnd()

          this.animationTo('style', { shadowColor: '#ffe793', shadowBlur: 50 })
        },
        mouseOuter () {
          this.animationEnd()

          this.animationTo('style', { shadowColor: '#999', shadowBlur: 1 })
        }
      })

      const circle2 = cr.add({
        name: 'circle',
        animationCurve: 'easeInOutBack',
        shape: {
          rx: 300,
          ry: 300,
          r: 50
        },
        style: {
          fill: '#66d7ee',
          hoverCursor: 'pointer',
        },
        hover: true,
        drag: true,
        mouseEnter () {
          this.animationEnd()

          this.animationTo('style', { shadowColor: '#eb3941', shadowBlur: 50 })
        },
        mouseOuter () {
          this.animationEnd()

          this.animationTo('style', { shadowColor: '#999', shadowBlur: 1 })
        }
      })

      circle.attr('style', { shadowColor: '#999', shadowBlur: 1 })
      circle2.attr('style', { shadowColor: '#999', shadowBlur: 1 })

      console.log(cr)
    }
  },
  mounted () {
    const { init } = this

    init()
  }
}
</script>

<style lang="less">
.test {
  box-shadow: 0 0 3px red;

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
