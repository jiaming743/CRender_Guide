import { deepClone } from '../extend/methods'

import { tranColorAttrToRgbaValue } from '../config/style'

import style from '../config/style'

import elements from '../config/elements'

import baseAttr from '../config/baseAttr'

import elementExtend from './instance'

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

  this.initAttribute(mixinElement)

  addElementExtend(mixinElement)

  this.elements.push(mixinElement)

  this.drawAllGraph()

  this.rankElementsByIndex()

  return mixinElement
}

function getMixinElement (element, config) {
  const clonedElement = deepClone(element, true)

  const clonedStyle = deepClone(style)

  const clonedBaseAttr = deepClone(baseAttr)

  Object.assign(clonedStyle, config.style || {})

  config.style = clonedStyle

  const mixinElement = {}

  Object.assign(mixinElement, clonedBaseAttr, clonedElement, config)

  tranColorAttrToRgbaValue(mixinElement.style)

  return mixinElement
}

function initAttribute (element) {
  element.render = this
  element.animationRoot = []
  element.animationKeys = []
  element.animationFrameState = []

  return element
}

function addElementExtend (element) {
  const extendKeys = Object.keys(elementExtend)

  extendKeys.forEach(key => element[key] = elementExtend[key])

  return element
}

function clearArea () {
  const { ctx, area } = this

  ctx.clearRect(0, 0, ...area)
}

function drawAllGraph () {
  const { elements } = this

  const visibleElements = elements.filter(ele => ele.inVisible)

  this.clearArea()

  visibleElements.forEach(ele => ele.doDraw())
}

function doAnimation () {
  const { animationStatus } = this

  if (animationStatus) return

  this.animationStatus = true

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

export function rankElementsByIndex () {
  const { elements } = this

  elements.sort((a, b) => {
    if (a.index > b.index) return -1
    if (a.index === b.index) return 0
    if (a.index < b.index) return 1
  })
}

export function mouseMove ({ offsetX, offsetY, movementX, movementY }) {
  const { elements } = this

  const mousePos = [offsetX, offsetY]

  const hoverAbleElements = elements.filter(ele => ele.hover && ele.hoverCheck)

  const hoverElement = hoverAbleElements.find(ele => ele.hoverCheck(mousePos, ele.shape, ele.style))

  this.lastMousePosition = mousePos

  const currentHoverElement = this.setCurrentHoverElement(hoverElement)

  currentHoverElement &&
    currentHoverElement.drag &&
      currentHoverElement.dragging &&
        typeof currentHoverElement.doDrag === 'function' &&
          currentHoverElement.doDrag([movementX, movementY], currentHoverElement.shape, currentHoverElement.style)
}

export function mouseDown (e) {
  this.hoverElement &&
    this.hoverElement.drag &&
      (this.hoverElement.dragging = true)
}

export function mouseUp (e) {
  this.hoverElement && (this.hoverElement.dragging = false)
}

export function setCurrentHoverElement (hoverElement = false) {
  if (hoverElement && hoverElement.hovered) return hoverElement

  if ((!hoverElement && this.hoverElement) || (hoverElement && this.hoverElement)) {
    typeof this.hoverElement.mouseOuter === 'function' && this.hoverElement.mouseOuter()

    this.hoverElement.hovered = false

    this.hoverElement = ''

    document.body.style.cursor = 'default'
  }

  if (!hoverElement) return ''

  hoverElement.hovered = true

  typeof hoverElement.mouseEnter === 'function' && hoverElement.mouseEnter()

  this.hoverElement = hoverElement

  document.body.style.cursor = hoverElement.style.hoverCursor || 'default'

  return hoverElement
}

const prototypes = {
  add,
  initAttribute,
  clearArea,
  drawAllGraph,
  doAnimation,
  animations,
  rankElementsByIndex,
  mouseMove,
  mouseDown,
  mouseUp,
  setCurrentHoverElement
}

export default function extendPrototype (cl) {
  const prototypeKeys = Object.keys(prototypes)

  prototypeKeys.forEach(key => cl.prototype[key] = prototypes[key])
}