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

      const cr = new CRender(this.ctx, this.canvasWH)

      const circle = cr.add({
        name: 'circle',
        animationDelay: 1000,
        animationCurve: 'easeOutBack',
        shape: {
          rx: 350,
          ry: 150,
          r: 20
        }
      })

      circle.animationTo('shape', { r: 60 })
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
