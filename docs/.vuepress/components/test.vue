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

      const item = cr.add({
        name: 'polyline',
        animationCurve: 'easeInOutBack',
        shape: {
          points: [
            [100, 100],
            [210, 180],
            [382, 200]
          ]
        },
        style: {
          stroke: '#66d7ee',
          hoverCursor: 'pointer',
          lineWidth: 20
        },
        hoverAble: true,
        dragAble: true,
        mouseEnter () {
          this.animationEnd()

          this.animationTo('style', { shadowColor: '#ffe793', shadowBlur: 50 })
        },
        mouseOuter () {
          this.animationEnd()

          this.animationTo('style', { shadowColor: '#999', shadowBlur: 1 })
        }
      })

      item.attr('style', { shadowColor: '#999', shadowBlur: 1 })

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
