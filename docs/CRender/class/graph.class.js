import Style from './style.class'

export default class Graph {
  constructor (graph, config) {
    if (!config.shape) config.shape = {}
    if (!config.style) config.style = {}

    Object.assign(this, graph, config)

    this.style = new Style(config.style)
  }
}

Graph.prototype.drawProcessor = function (render, graph) {
  graph.style.initStyle(render.ctx)

  graph.draw(render, graph)
}