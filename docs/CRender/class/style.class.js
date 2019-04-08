import { getRgbaValue, getColorFromRgbValue } from '@jiaminghi/color'

export default class Style {
  constructor (style) {
    style = this.colorProcessor(style)

    const defaultStyle = {
      /**
       * @description Rgba value of graph fill color 
       * @type {Array}
       * @example fill = [0, 0, 0, 1]
       */
      fill: [0, 0, 0, 1],
      /**
       * @description Rgba value of graph stroke color 
       * @type {Array}
       * @example stroke = [0, 0, 0, 1]
       */
      stroke: [0, 0, 0, 0],
      /**
       * @description Opacity of graph
       * @type {Number}
       * @example opacity = 1
       */
      opacity: 1,
      /**
       * @description LineCap of Ctx
       * @type {String}
       * @example opacity = 'butt'|'round'|'square'
       */
      lineCap: null,
      /**
       * @description Linejoin of Ctx
       * @type {String}
       * @example lineJoin = 'round'|'bevel'|'miter'
       */
      lineJoin: null,
      /**
       * @description LineDash of Ctx
       * @type {Array}
       * @example lineDash = [10, 10]
       */
      lineDash: null,
      /**
       * @description LineDashOffset of Ctx
       * @type {Number}
       * @example lineDashOffset = 10
       */
      lineDashOffset: null,
      /**
       * @description ShadowBlur of Ctx
       * @type {Number}
       * @example shadowBlur = 10
       */
      shadowBlur: 0,
      /**
       * @description Rgba value of graph shadow color 
       * @type {Array}
       * @example shadowColor = [0, 0, 0, 1]
       */
      shadowColor: [0, 0, 0, 0],
      /**
       * @description ShadowOffsetX of Ctx
       * @type {Number}
       * @example shadowOffsetX = 10
       */
      shadowOffsetX: 0,
      /**
       * @description ShadowOffsetY of Ctx
       * @type {Number}
       * @example shadowOffsetY = 10
       */
      shadowOffsetY: 0,
      /**
       * @description LineWidth of Ctx
       * @type {Number}
       * @example lineWidth = 10
       */
      lineWidth: 0,
      /**
       * @description Stroke width is not scaled
       * @type {Boolean}
       * @example strokeNoScale = true
       */
      strokeNoScale: false,
      /**
       * @description Center point of the graph
       * @type {Array}
       * @example graphCenter = [10, 10]
       */
      graphCenter: null,
      /**
       * @description Hover rectangle detection area
       * @type {Array}
       * @example hoverRect = [10, 10, 100, 100] | [startPointX, startPointY, width, height]
       */
      hoverRect: null,
      /**
       * @description Graph magnification
       * @type {Array}
       * @example scale = [1.5, 1.5]
       */
      scale: null,
      /**
       * @description Graph rotation degree
       * @type {Number}
       * @example rotate = 10
       */
      rotate: null,
      /**
       * @description Graph translate distance
       * @type {Array}
       * @example translate = [10, 10]
       */
      translate: null,
      /**
       * @description Cursor status when hover
       * @type {String}
       * @example hoverCursor = 'default'|'pointer'
       */
      hoverCursor: 'default',
      /**
       * @description Font of Ctx
       * @type {String}
       * @example font = 'font'
       */
      font: null,
      /**
       * @description TextAlign of Ctx
       * @type {String}
       * @example textAlign = 'start'|'end'|'left'|'right'|'center'
       */
      textAlign: 'center',
      /**
       * @description TextBaseline of Ctx
       * @type {String}
       * @example textBaseline = 'top'|'bottom'|'middle'|'alphabetic'|'hanging'
       */
      textBaseline: 'middle'
    }

    Object.assign(this, defaultStyle, style)
  }
}

const colorProcessorKeys = ['fill', 'stroke', 'shadowColor']

/**
 * @description Set colors to rgba value
 * @param {Object} style style config
 * @return {Object} style config after process
 */
Style.prototype.colorProcessor = function (style) {
  const allKeys = Object.keys(style)

  const colorKeys = allKeys.filter(key => colorProcessorKeys.find(k => k === key))

  colorKeys.forEach(key => (style[key] = getRgbaValue(style[key])))

  return style
}

Style.prototype.initStyle = function(ctx) {
  initTransform(ctx, this)

  initGraphStyle(ctx, this)
}

function initTransform (ctx, style) {
  ctx.save()

  const { graphCenter, rotate, scale, translate } = style

  if (!(graphCenter instanceof Array)) return

  ctx.translate(...graphCenter)

  if (rotate) ctx.rotate(rotate * Math.PI / 180)

  if (scale instanceof Array) ctx.scale(...scale)

  if (translate) ctx.translate(...translate)

  ctx.translate(-graphCenter[0], -graphCenter[1])
}

const autoSetStyleKeys = [
  'lineCap', 'lineJoin', 'lineDashOffset',
  'shadowOffsetX', 'shadowOffsetY', 'lineWidth',
  'font', 'textAlign', 'textBaseline'
]

function initGraphStyle (ctx, style) {
  let { fill, stroke, shadowColor, opacity } = style

  autoSetStyleKeys.forEach(key => {
    if (key || typeof key === 'number') ctx[key] = style[key]
  })

  fill = [...fill]
  stroke = [...stroke]
  shadowColor = [...shadowColor]

  fill[3] *= opacity
  stroke[3] *= opacity
  shadowColor[3] *= opacity

  ctx.fillStyle = getColorFromRgbValue(fill)
  ctx.strokeStyle = getColorFromRgbValue(stroke)
  ctx.shadowColor = getColorFromRgbValue(shadowColor)

  const { lineDash, shadowBlur } = style

  if (lineDash) ctx.setLineDash(lineDash)

  if (typeof shadowBlur === 'number') ctx.shadowBlur = shadowBlur > 0 ? shadowBlur : 0.001
}