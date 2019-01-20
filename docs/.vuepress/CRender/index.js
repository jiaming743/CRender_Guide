import { deepClone } from './extend/methods'

import transition from '@jiaminghi/transition'

import elements from './config/elements'

import style from './config/style'

import baseAttr from './config/baseAttr'

const CRENDERS = []

export default class CRender {

  constructor (ctx, area) {
    if (!ctx || !area) {
      console.error('Missing parameters!')

      return
    }

    this.ctx = ctx

    this.area = area

    this.elements = []

    this.animationStatus = false

    this.renderIndex = CRENDERS.length

    CRENDERS.push(this)
  }

}

CRender.prototype.add = add
CRender.prototype.initAttribute = initAttribute
CRender.prototype.clearArea = clearArea
CRender.prototype.drawAllGraph = drawAllGraph
CRender.prototype.doAnimation = doAnimation
CRender.prototype.animations = animations

function add (config = {}) {
  const { name } = config

  if (!name) {
    console.warn('Missing parameters!')

    return
  }

  const element = elements.get(name)

  if (!element) {
    console.warn('No corresponding graphic configuration found!')

    return
  }

  const mixinElement = getMixinElement(element, config)

  addElementExtend(mixinElement)

  this.initAttribute(mixinElement)

  this.elements.push(mixinElement)

  this.drawAllGraph()

  return mixinElement
}

function getMixinElement (element, config) {
  const clonedElement = deepClone(element, true)

  const clonedStyle = deepClone(style)

  const clonedBaseAttr = deepClone(baseAttr)

  const mixinElement = {}

  Object.assign(mixinElement, { style: clonedStyle }, clonedBaseAttr, clonedElement, config)

  return mixinElement
}

function addElementExtend (element) {
  element.attr = attr
  element.doDraw = doDraw
  element.turnToNextFrame = turnToNextFrame
  element.animationTo = animationTo

  return element
}

function initAttribute (element) {
  element.render = this
  element.animationRoot = []
  element.animationKeys = []
  element.animationFrameState = []

  return element
}

function clearArea () {
  const { ctx, area } = this

  ctx.clearRect(0, 0, ...area)
}

function drawAllGraph () {
  const { elements } = this

  this.clearArea()

  elements.forEach(ele => ele.doDraw())
}

function doAnimation () {
  const { elements, animationStatus } = this

  if (animationStatus) return

  this.animationStatus = true

  let i = 0

  return new Promise(resolve => {

    this.animations(e => {
      this.animationStatus = false

      resolve()
    })

  })
}

function checkAnimationAble (elements) {
  return elements.find(ele => !ele.pause && ele.animationFrameState.length)
}

function animations (callback) {
  const { elements } = this

  if (!checkAnimationAble(elements)) {
    callback()

    return
  }

  elements.forEach(ele => ele.turnToNextFrame())

  this.drawAllGraph()

  requestAnimationFrame(this.animations.bind(this, callback))
}

function attr (attrName, change) {
  if (!attrName || (!change && change !== false) || attrName === 'attr') return false

  const clone = typeof this[attrName] === 'object'

  clone && Object.assign(this[attrName], change)
  !clone && (this[attrName] = change)

  draw()
}

function doDraw () {
  const { render: { ctx }, shape, style, draw } = this

  draw(ctx, shape, style, draw)
}

function turnToNextFrame () {
  const { animationRoot, animationKeys, animationFrameState, pause } = this

  if (pause) return

  animationRoot.forEach((r, i) =>
    animationKeys[i].forEach(k => (r[k] = animationFrameState[i][0][k])))

  animationFrameState.forEach((afs, i) => {
    afs.shift()

    const noFrame = afs.length === 0

    noFrame && animationRoot.splice(i, 1)
    noFrame && animationKeys.splice(i, 1)
  })

  this.animationFrameState = animationFrameState.filter(afs => afs.length)
}

async function animationTo (attrName, change, wait = false) {
  if (attrName !== 'shape' && attrName !== 'style') {
    console.warn('Only supported shape and style animation!')

    return
  }

  const changeRoot = this[attrName]

  const changeKeys = Object.keys(change)
  
  const objectAttr = changeKeys.filter(k => typeof change[k] === 'object')

  const beforeState = {}

  changeKeys.forEach(k => (beforeState[k] = changeRoot[k]))

  const { animationFrame, animationCurve, animationDelay } = this

  const animationFrameState = transition(animationCurve, beforeState, change, animationFrame)

  const objectAttrFrameState = objectAttr.map(k =>
      transition(animationCurve, changeRoot[k], change[k], animationFrame))

  animationFrameState.forEach((frameState, i) =>
    objectAttr.forEach(k => (frameState[k] = objectAttrFrameState[i][k])))

  this.animationRoot.push(changeRoot)

  this.animationKeys.push(changeKeys)

  this.animationFrameState.push(animationFrameState)

  if (wait) return

  if (animationDelay > 0) await delay(animationDelay)

  const { render } = this

  return new Promise(async resolve => {
    await render.doAnimation()

    resolve()
  })
}

async function delay (time) {
  return new Promise(reslove => {
    setTimeout(reslove, time)
  })
}
