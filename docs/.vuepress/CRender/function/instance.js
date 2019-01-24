import transition from '@jiaminghi/transition'

import { tranColorAttrToRgbaValue } from '../config/style'

function attr (attrName, change) {
  if (!attrName || (!change && change !== false) || attrName === 'attr') return false

  const clone = typeof this[attrName] === 'object'

  if (attrName === 'style') tranColorAttrToRgbaValue(change)

  clone && Object.assign(this[attrName], change)
  !clone && (this[attrName] = change)

  const { render } = this

  render.drawAllGraph()
}

function doDraw () {
  const { render, style } = this

  render.initTransform(style)
  render.initGraphStyle(style)

  const { drawBefore, shape, draw } = this

  typeof drawBefore === 'function' && this.drawBefore(ctx, shape, style)

  draw(render.ctx, shape, style, draw)
}

function turnToNextFrame () {
  const { animationRoot, animationKeys, animationFrameState, pause } = this

  if (pause) return

  animationRoot.forEach((r, i) =>
    animationKeys[i].forEach(k => (r[k] = animationFrameState[i][0][k])))

  animationFrameState.forEach((stateItem, i) => {
    stateItem.shift()

    const noFrame = stateItem.length === 0

    if (noFrame) animationRoot[i] = ''
    if (noFrame) animationKeys[i] = ''
  })

  this.animationFrameState = animationFrameState.filter(afs => afs.length)
  this.animationRoot = animationRoot.filter(r => r)
  this.animationKeys = animationKeys.filter(k => k)
}

async function animationTo (attrName, change, wait = false) {
  if (attrName !== 'shape' && attrName !== 'style') {
    console.warn('Only supported shape and style animation!')

    return
  }

  if (attrName === 'style') tranColorAttrToRgbaValue(change)

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
    objectAttr.forEach((k, j) => (frameState[k] = objectAttrFrameState[j][i])))

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

export function animationEnd () {
  const { animationFrameState, animationKeys, animationRoot, render } = this

  animationRoot.forEach((r, i) => {
    const currentKeys = animationKeys[i]
    const lastState = animationFrameState[i].pop()

    currentKeys.forEach(key => (r[key] = lastState[key]))
  })

  this.animationFrameState = []
  this.animationKeys = []
  this.animationRoot = []

  return render.doAnimation()
}

export default {
  attr,
  doDraw,
  turnToNextFrame,
  animationTo,
  animationEnd
}