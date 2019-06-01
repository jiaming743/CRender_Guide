<template>
  <div class="dev">
    <canvas ref="canvas" />
  </div>
</template>

<script>
import CRender from '../../CRender'

export default {
  name: 'DEV',
  methods: {},
  mounted () {
    const canvas = this.$refs['canvas']

    const render = new CRender(canvas)

    const graph = render.add({
      name: 'circle',
      shape: {
        rx: 250,
        ry: 100,
        r: 100
      },
      hover: true,
      drag: true,
      style: {
        fill: '#666',
        gradientColor: ['#111', '#888'],
        gradientParams: [0, 0, 300, 0],
        gradientWith: 'fill'
      },
    })
  }
}
</script>

<style lang="less">
.dev {
  width: 100%;
  height: 300px;
  box-shadow: 0 0 3px green;

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
