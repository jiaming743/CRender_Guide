---
sidebarDepth: 2
---

# Style

这里将介绍**Style**类的实例属性。

## 实例属性


### fill

```js
/**
 * @description 图形填充颜色的rgba值
 * @type {Array}
 * @default fill = [0, 0, 0, 1] // rgba(0, 0, 0, 1)
 */
```

### stroke

```js
/**
 * @description 图形描边颜色的rgba值
 * @type {Array}
 * @default stroke = [0, 0, 0, 1]
 */
```

### opacity

```js
/**
 * @description 图形透明度
 * @type {Number}
 * @default opacity = 1
 */
```

### lineCap

```js
/**
 * @description Ctx LineCap属性
 * @type {String}
 * @default lineCap = null
 * @example lineCap = 'butt'|'round'|'square'
 */
```

### lineJoin

```js
/**
 * @description Ctx Linejoin属性
 * @type {String}
 * @default lineJoin = null
 * @example lineJoin = 'round'|'bevel'|'miter'
 */
```

### lineDash

```js
/**
 * @description Ctx LineDash属性 
 * @type {Array}
 * @default lineDash = null
 * @example lineDash = [10, 10]
 */
```

### lineDashOffset

```js
/**
 * @description Ctx LineDashOffset属性
 * @type {Number}
 * @default lineDashOffset = null
 * @example lineDashOffset = 10
 */
```

### shadowBlur

```js
/**
 * @description 阴影模糊距离
 * @type {Number}
 * @default shadowBlur = 0
 */
```

### shadowColor

```js
/**
 * @description 阴影的rgba值
 * @type {Array}
 * @default shadowColor = [0, 0, 0, 0]
 */
```

### shadowOffsetX

```js
/**
 * @description 阴影X轴偏移
 * @type {Number}
 * @default shadowOffsetX = 0
 */
```

### shadowOffsetY

```js
/**
 * @description 阴影Y轴偏移
 * @type {Number}
 * @default shadowOffsetY = 0
 */
```

### lineWidth

```js
/**
 * @description 描边线条宽度
 * @type {Number}
 * @default lineWidth = 0
 */
```

### strokeNoScale

```js
/**
 * @description 描边宽度不放大
 * @type {Boolean}
 * @default strokeNoScale = false
 */
```

### graphCenter

```js
/**
 * @description 图形中心点（用于旋转、位移、缩放）
 * @type {Array}
 * @default graphCenter = null
 * @example graphCenter = [10, 10]
 */
```

### scale

```js
/**
 * @description 图形缩放倍数
 * @type {Array}
 * @default scale = null
 * @example scale = [1.5, 1.5]
 */
```

### rotate

```js
/**
 * @description 图形旋转角度
 * @type {Number}
 * @default rotate = null
 * @example rotate = 10
 */
```

### translate

```js
/**
 * @description 图形位移距离
 * @type {Array}
 * @default translate = null
 * @example translate = [10, 10]
 */
```

### hoverCursor

```js
/**
 * @description Hover时的鼠标样式
 * @type {String}
 * @default hoverCursor = 'pointer'
 * @example hoverCursor = 'default'|'pointer'|'auto'|'crosshair'|'move'|'wait'|...
 */
```

### fontStyle

```js
/**
 * @description Ctx Font style属性
 * @type {String}
 * @default fontStyle = 'normal'
 * @example fontStyle = 'normal'|'italic'|'oblique'
 */
```

### fontVarient

```js
/**
 * @description Ctx Font varient属性
 * @type {String}
 * @default fontVarient = 'normal'
 * @example fontVarient = 'normal'|'small-caps'
 */
```

### fontWeight

```js
/**
 * @description Ctx Font weight属性 
 * @type {String|Number}
 * @default fontWeight = 'normal'
 * @example fontWeight = 'normal'|'bold'|'bolder'|'lighter'|Number
 */
```

### fontSize

```js
/**
 * @description Ctx Font size属性 
 * @type {Number}
 * @default fontSize = 10
 */
```

### fontFamily

```js
/**
 * @description Ctx Font family属性 
 * @type {String}
 * @default fontFamily = 'Arial'
 */
```

### textAlign

```js
/**
 * @description Ctx textAlign属性（水平对齐）
 * @type {String}
 * @default textAlign = 'center'
 * @example textAlign = 'start'|'end'|'left'|'right'|'center'
 */
```

### textBaseline

```js
/**
 * @description Ctx textBaseline属性（垂直对齐）
 * @type {String}
 * @default textBaseline = 'middle'
 * @example textBaseline = 'top'|'bottom'|'middle'|'alphabetic'|'hanging'
 */
```

### gradientColor

```js
/**
 * @description 用于创建渐变色的颜色
 * @type {Array}
 * @default gradientColor = null
 * @example gradientColor = ['#000', '#111', '#222']
 */
```

### gradientType

```js
/**
 * @description 渐变类型
 * @type {String}
 * @default gradientType = 'linear'
 * @example gradientType = 'linear' | 'radial'
 */
```

### gradientParams

```js
/**
 * @description 创建渐变的参数
 * @type {Array}
 * @default gradientParams = null
 * @example gradientParams = [x0, y0, x1, y1] (Linear Gradient)
 * @example gradientParams = [x0, y0, r0, x1, y1, r1] (Radial Gradient)
 */
```

### gradientWith

```js
/**
 * @description 在何时使用渐变色
 * @type {String}
 * @default gradientWith = 'stroke'
 * @example gradientWith = 'stroke' | 'fill'
 */
```

### gradientStops

```js
/**
 * @description 渐变的 color stops
 * @type {String}
 * @default gradientStops = 'auto'
 * @example gradientStops = 'auto' | [0, .2, .3, 1]
 */
```

### colors

```js
/**
 * @description 存储在其中的颜色将支持动画渐变
 * @type {Array|Object}
 * @default colors = null
 * @example colors = ['#000', '#111', '#222']
 * @example colors = { a: '#000', b: '#111' }
 */
```

:::tip
配置`gradientColor`和`gradientParams`后，渐变将自动生效。
:::

## 原型方法

### getStyle

```js
/**
 * @description 获取当前样式配置
 * @return {Object} 样式配置
 */
Style.prototype.getStyle = function () {
}
```