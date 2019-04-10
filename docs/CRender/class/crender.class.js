import color from '@jiaminghi/color'

import allGraph from '../config/graphs'

import Graph from './graph.class'

/**
 * @description     Class of CRender
 * @param {Object}  canvas Canvas DOM
 * @return {Object} Instance of CRender
 */
export default class CRender {
  constructor (canvas) {
    if (!canvas) {
      console.error('Missing parameters!')

      return
    }

    const ctx = canvas.getContext('2d')

    const { clientWidth, clientHeight } = canvas

    const area = [clientWidth, clientHeight]

    this.ctx = ctx

    this.area = area

    this.color = color

    // all graphs of added
    this.graphs = []

    this.animationStatus = false

    // bind event handler
    canvas.addEventListener('mousedown', mouseDown.bind(this))
    canvas.addEventListener('mousemove', mouseMove.bind(this))
    canvas.addEventListener('mouseup', mouseUp.bind(this))
  }

}

CRender.prototype.clearArea = function () {
  const { area } = this

  this.ctx.clearRect(0, 0, ...area)
}

CRender.prototype.add = function (config = {}) {
  const { name } = config

  if (!name) {
    console.error('add Missing parameters!')

    return
  }

  const graphConfig = allGraph.get(name)

  if (!graphConfig) {
    console.warn('No corresponding graph configuration found!')

    return
  }

  const graph = new Graph(graphConfig, config)

  if (!graph.validator(graph)) return

  graph.render = this

  this.graphs.unshift(graph)

  this.rankGraphsByIndex()

  this.drawAllGraph()

  return graph
}

CRender.prototype.rankGraphsByIndex = function () {
  const { graphs } = this

  graphs.sort((a, b) => {
    if (a.index > b.index) return -1
    if (a.index === b.index) return 0
    if (a.index < b.index) return 1
  })
}

CRender.prototype.delGraph = function (graph) {
  const { graphs } = this

  const index = graphs.findIndex(g => g === graph)

  if (index === -1) return

  graphs.splice(index, 1)

  this.drawAllGraph()
}

CRender.prototype.delAllGraphs = function () {
  this.graphs = []

  this.drawAllGraph()
}

CRender.prototype.drawAllGraph = function () {
  this.clearArea()

  this.graphs.filter(graph => graph.visible).forEach(graph => graph.drawProcessor(this, graph))
}

CRender.prototype.animationProcessor = function () {
  const { animationStatus } = this

  if (animationStatus) return

  this.animationStatus = true

  return new Promise(resolve => {
    this.animation(() => {
      this.animationStatus = false

      resolve()
    })
  })
}

CRender.prototype.animation = function (callback) {
  const { graphs } = this

  if (!animationAble(graphs)) {
    callback()

    return
  }

  graphs.forEach(graph => graph.turnNextAnimationFrame())

  this.drawAllGraph()

  requestAnimationFrame(this.animation.bind(this, callback))
}

function animationAble (graphs) {
  return graphs.find(graph => !graph.animationPause && graph.animationFrameState.length)
}

function mouseDown (e) {
  const { graphs } = this

  const hoverGraph = graphs.find(graph => graph.status === 'hover')

  if (!hoverGraph || !hoverGraph.drag) return

  hoverGraph.status = 'active'
}

function mouseMove (e) {
  const { offsetX, offsetY } = e
  const position = [offsetX, offsetY]

  const { graphs } = this

  const activeGraph = graphs.find(graph => (graph.status === 'active' || graph.status === 'drag'))

  if (activeGraph) {
    if (typeof activeGraph.move !== 'function') {
      console.error('No move method is provided, cannot be dragged!')

      return
    }

    activeGraph.moveProcessor(e)

    activeGraph.status = 'drag'

    return
  }

  const hoverGraph = graphs.find(graph => graph.status === 'hover')

  const hoverAbleGraphs = graphs.filter(graph =>
    (graph.hover && (typeof graph.hoverCheck === 'function' || graph.hoverRect)))

  const hoveredGraph = hoverAbleGraphs.find(graph => graph.hoverCheckProcessor(position, graph))

  if (hoveredGraph) {
    document.body.style.cursor = hoveredGraph.style.hoverCursor
  } else {
    document.body.style.cursor = 'default'
  }

  let [hoverGraphMouseOuterIsFun, hoveredGraphMouseEnterIsFun] = [false, false]

  if (hoverGraph) hoverGraphMouseOuterIsFun = typeof hoverGraph.mouseOuter === 'function'
  if (hoveredGraph) hoveredGraphMouseEnterIsFun = typeof hoveredGraph.mouseEnter === 'function'

  if (!hoveredGraph && !hoverGraph) return

  if (!hoveredGraph && hoverGraph) {
    if (hoverGraphMouseOuterIsFun) hoverGraph.mouseOuter(e, hoverGraph)

    hoverGraph.status = 'static'

    return
  }

  if (hoveredGraph && hoveredGraph === hoverGraph) return

  if (hoveredGraph && !hoverGraph) {
    if (hoveredGraphMouseEnterIsFun) hoveredGraph.mouseEnter(e, hoveredGraph)

    hoveredGraph.status = 'hover'

    return
  }

  if (hoveredGraph && hoverGraph && hoveredGraph !== hoverGraph) {
    if (hoverGraphMouseOuterIsFun) hoverGraph.mouseOuter(e, hoverGraph)

    hoverGraph.status = 'static'

    if (hoveredGraphMouseEnterIsFun) hoveredGraph.mouseEnter(e, hoveredGraph)

    hoveredGraph.status = 'hover'
  }
}

function mouseUp (e) {
  const { graphs } = this

  const activeGraph = graphs.find(graph => graph.status === 'active')
  const dragGraph = graphs.find(graph => graph.status === 'drag')

  if (activeGraph && typeof activeGraph.click === 'function') activeGraph.click(e, activeGraph)

  graphs.forEach(graph => (graph.status = 'static'))

  if (activeGraph) activeGraph.status = 'hover'
  if (dragGraph) dragGraph.status = 'hover'
}