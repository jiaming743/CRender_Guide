import Style from './style.class'

import transition from '@jiaminghi/transition'

import {
  deepClone,
  getRotatePointPos,
  getScalePointPos,
  getTranslatePointPos
} from '../lib/util'

export default class Graph {
  constructor (graph, config) {
    config = deepClone(config, true)

    const defaultConfig = {
      visible: true,
      animationDelay: 0,
      animationFrame: 30,
      animationCurve: 'linear',
      animationPause: false,
      drag: false,
      hover: false,
      index: 1
    }
  
    const configAbleNot = {
      status: 'static',
      animationRoot: [],
      animationKeys: [],
      animationFrameState: [],
      cache: {}
    }
  
    if (!config.shape) config.shape = {}
    if (!config.style) config.style = {}

    const shape = Object.assign({}, graph.shape, config.shape)

    Object.assign(defaultConfig, config, configAbleNot)

    Object.assign(this, graph, defaultConfig)

    this.shape = shape
    this.style = new Style(config.style)

    this.addedProcessor()
  }
}


Graph.prototype.addedProcessor = function () {
  if (typeof this.setGraphCenter === 'function') this.setGraphCenter(null, this)

  // The life cycle 'added"
  if (typeof this.added === 'function') this.added(this)
}

Graph.prototype.drawProcessor = function (render, graph) {
  graph.style.initStyle(render.ctx)

  graph.draw(render, graph)

  graph.style.restoreTransform(render.ctx)
}

Graph.prototype.hoverCheckProcessor = function (position, { style, hoverCheck }) {
  const { graphCenter, rotate, scale, translate } = style

  if (graphCenter) {
    if (rotate) position = getRotatePointPos(-rotate, position, graphCenter)
    if (scale) position = getScalePointPos(scale.map(s => 1 / s), position, graphCenter)
    if (translate) position = getTranslatePointPos(translate.map(v => v * -1), position)
  }

  return hoverCheck(position, this)
}

Graph.prototype.moveProcessor = function (e) {
  this.move(e, this)

  if (typeof this.setGraphCenter === 'function') this.setGraphCenter(e, this)
}

Graph.prototype.attr = function (attrName, change = undefined) {
  if (!attrName || change === undefined) return false

  change = deepClone(change, true)

  const isObject = typeof this[attrName] === 'object'

  const { render } = this

  if (attrName === 'style') {
    this.style.update(change)
  } else if (isObject) {
    Object.assign(this[attrName], change)
  } else {
    this[attrName] = change
  }

  if (attrName === 'index') render.rankGraphsByIndex()

  render.drawAllGraph()
}

Graph.prototype.animation = async function (attrName, change, wait = false) {
  if (attrName !== 'shape' && attrName !== 'style') {
    console.error('Only supported shape and style animation!')

    return
  }

  change = deepClone(change, true)

  if (attrName === 'style') this.style.colorProcessor(change)

  const changeRoot = this[attrName]

  const changeKeys = Object.keys(change)

  const beforeState = {}

  changeKeys.forEach(key => (beforeState[key] = changeRoot[key]))

  const { animationFrame, animationCurve, animationDelay } = this

  const animationFrameState = transition(animationCurve, beforeState, change, animationFrame, true)

  this.animationRoot.push(changeRoot)
  this.animationKeys.push(changeKeys)
  this.animationFrameState.push(animationFrameState)

  if (wait) return

  if (animationDelay > 0) await delay(animationDelay)

  const { render } = this

  return new Promise(async reslove => {
    await render.animationProcessor()

    reslove()
  })
}

Graph.prototype.turnNextAnimationFrame = function () {
  const { animationRoot, animationKeys, animationFrameState, animationPause } = this

  if (animationPause) return

  animationRoot.forEach((root, i) => {
    animationKeys[i].forEach(key => {
      root[key] = animationFrameState[i][0][key]
    })
  })

  animationFrameState.forEach((stateItem, i) => {
    stateItem.shift()

    const noFrame = stateItem.length === 0

    if (noFrame) animationRoot[i] = null
    if (noFrame) animationKeys[i] = null
  })

  this.animationFrameState = animationFrameState.filter(state => state.length)
  this.animationRoot = animationRoot.filter(root => root)
  this.animationKeys = animationKeys.filter(keys => keys)
}

Graph.prototype.pauseAnimation = function () {
  this.attr('animationPause', true)
}

Graph.prototype.playAnimation = function () {
  const { render } = this

  this.attr('animationPause', false)

  return new Promise(async reslove => {
    await render.animationProcessor()

    reslove()
  })
}

function delay (time) {
  return new Promise(reslove => {
    setTimeout(reslove, time)
  })
}