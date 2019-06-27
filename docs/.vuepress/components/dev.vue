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

    const verticalLine = render.add({
      name: 'polyline',
      shape: {
        points: [
          [0, 150],
          [740, 150]
        ]
      },
      style: {
        stroke: '#000'
      }
    })

    const horizontal = render.add({
      name: 'polyline',
      shape: {
        points: [
          [370, 0],
          [370, 300]
        ]
      },
      style: {
        stroke: '#000'
      }
    })

    const graph = render.add({
      name: 'text',
      shape: {
        // content: '这是第一行',
        // content: '这是第一行\n这是第二行',
        content: '这是第一行\n这是第二行\n这是第三行',
        position: [370, 150],
        rowGap: 10
      },
      style: {
        fontSize: 20,
        fill: '#666',
        // textAlign: 'left',
        // textAlign: 'center',
        // textAlign: 'right',
        // textBaseline: 'top',
        // textBaseline: 'middle',
        // textBaseline: 'bottom',
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
