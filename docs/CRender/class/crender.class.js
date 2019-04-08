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

    // all graphs of added
    this.graphs = []

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

  const defaultConfig = {
    visible: true,
    animationDelay: 0,
    animationFrame: 30,
    animationCurve: 'linear',
    drag: false,
    hover: false,
    index: 1
  }

  const configAbleNot = {
    status: 'static'
  }

  Object.assign(config, defaultConfig, configAbleNot)

  const graph = new Graph(graphConfig, config)

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

CRender.prototype.drawAllGraph = function () {
  this.graphs.forEach(graph => graph.drawProcessor(this, graph))
}

function mouseDown () {

}

function mouseMove (e) {
  console.error(e)

  const { graphs } = this

  const activeGraph = graphs.find(graph => (graph.status === 'active' || graph.status === 'drag'))

  if (activeGraph) {
    activeGraph.drag(e)

    if (typeof activeGraph.setGraphCenter === 'function') activeGraph.setGraphCenter()

    activeGraph.status = 'move'
  }

  const hoverAbleGraphs = graphs.filter(graph => (graph.hover && graph.hoverCheck === 'function'))


}

function mouseUp () {}