---
sidebarDepth: 2
---

# 扩展

## 扩展新图形

插件内置了扩展方法，你可以使用它扩展新的图形。

### extendNewGraph

```javascript
/**
 * @description 扩展新图形
 * @param {String} name   图形名称
 * @param {Object} config 图形基础配置
 * @return {Undefined} 无返回值
 */
function extendNewGraph (name, config) {
    // ...
}
```

### 图形基础配置属性

图形基础配置是一个对象，它具有如下几个属性和方法需要配置。

### shape (必须)

```js
/**
 * @type {Object}
 * @description 图形形状数据
 */
```

### validator (必须)

```js
/**
 * @type {Function}
 * @description 图形配置校验器，添加图形前呗调用，返回值为false时，终止添加行为
 * @param {Graph} Current 图形实例
 * @return {Boolean} 图形配置是否合法
 */
```

### draw (必须)

```js
/**
 * @type {Function}
 * @description 图形绘制器
 * @param {CRender} 当前CRender实例
 * @param {Graph}   当前图形实例
 * @return {Undefined} 无返回值
 */
```

### hoverCheck

```js
/**
 * @type {Function}
 * @description 根据鼠标位置检测当前图形是否处于hover状态,
 *              为mouseEnter, mouseOuter, drag, click等功能提供支持
 * @param {[Number]} 鼠标位置
 * @param {Graph}    当前图形实例
 * @return {Boolean} 是否处于hover状态
 */
```

### setGraphCenter

```js
/**
 * @type {Function}
 * @description 设置图形中心点，为 rotate, scale，translate 提供支持。
 *              添加图形及图形被拖拽时都会被调用.
 * @param {Event} 鼠标事件 (添加图形后用于初始化的调用时，该值为null)
 * @param {Graph} 当前图形实例
 * @return {Undefined} 无返回值
 */
```

### move

```js
/**
 * @type {Function}
 * @description 移动图形，为拖拽功能提供支持
 * @param {Event} 鼠标事件
 * @param {Graph} 当前图形实例
 * @return {Undefined} 无返回值
 */
```

### 扩展示例

```js
import { extendNewGraph } from '@jiaminghi/c-render'

const circle = {
  shape: {
    rx: 0,
    ry: 0,
    r: 0
  },

  validator ({ shape }) {
    const { rx, ry, r } = shape

    if (typeof rx !== 'number' || typeof ry !== 'number' || typeof r !== 'number') {
      console.error('Shape configuration is abnormal!')

      return false
    }

    return true
  },

  draw ({ ctx }, { shape }) {
    ctx.beginPath()

    const { rx, ry, r } = shape

    ctx.arc(rx, ry, r, 0, Math.PI * 2)

    ctx.fill()
    ctx.stroke()

    ctx.closePath()
  },

  hoverCheck (position, { shape }) {
    const { rx, ry, r } = shape

    return checkPointIsInCircle(rx, ry, r, position)
  },

  setGraphCenter (e, { shape, style }) {
    const { rx, ry } = shape

    style.graphCenter = [rx, ry]
  },

  move ({ movementX, movementY }, { shape }) {
    this.attr('shape', {
      rx: shape.rx + movementX,
      ry: shape.ry + movementY
    })
  }
}

extendNewGraph('circle', circle)
```

## 扩展缓动曲线

缓动曲线由[transition](http://transition.jiaminghi.com/)提供，我们将它提供的扩展方法进行了导出，你可以使用它扩展新的缓动曲线。

```javascript
import { injectNewCurve } from '@jiaminghi/c-render'

injectNewCurve('newCurve', curveData)
```

::: tip
transition官网提供了缓动曲线绘制工具及扩展配置说明。
:::