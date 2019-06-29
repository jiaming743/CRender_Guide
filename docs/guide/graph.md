---
sidebarDepth: 2
---

# Graph

这里将介绍**Graph**类，例如实例属性、原型方法以及生命周期。

## 实例属性

这里是**Graph**实例属性的介绍，添加图形时，你可以对他们进行配置。

### visible

```js
/**
 * @description 是否绘制图形
 * @type {Boolean}
 * @default visible = true
 */
```

### shape

```js
/**
 * @description Graph shape数据
 * @type {Object}
 */
```

### [style](/guide/style.md)

```js
/**
 * @description Graph style数据 (Style实例)
 * @type {Style}
 */
```

### drag

```js
/**
 * @description 是否启用拖拽功能
 * @type {Boolean}
 * @default drag = false
 */
```

### hover

```js
/**
 * @description 是否启用hover检测
 * @type {Boolean}
 * @default hover = false
 */
```

### index

```js
/**
 * @description Graph 绘制层级（index高者优先绘制）
 * @type {Number}
 * @default index = 1
 */
```

### animationDelay

```js
/**
 * @description 动画延迟时间(ms)
 * @type {Number}
 * @default animationDelay = 0
 */
```

### animationFrame

```js
/**
 * @description 动画持续帧数
 * @type {Number}
 * @default animationFrame = 30
 */
```

### [animationCurve](http://transition.jiaminghi.com/)

```js
/**
 * @description 动画动态曲线（由transition提供动画状态）
 * @type {String}
 * @default animationCurve = 'linear'
 */
```

### animationPause

```js
/**
 * @description 是否暂停图形动画
 * @type {Boolean}
 * @default animationPause = false
 */
```

### hoverRect

```js
/**
 * @description 图形矩形hover检测区（优先级高于图形默认的hoverCheck方法）
 * @type {Null|Array}
 * @default hoverRect = null
 * @example hoverRect = [0, 0, 100, 100] // [矩形起始x, y坐标, 矩形宽度, 高度]
 */
```

### mouseEnter

```js
/**
 * @description Mouse enter事件处理器
 * @type {Function|Null}
 * @default mouseEnter = null
 */
```

### mouseOuter

```js
/**
 * @description Mouse outer事件处理器
 * @type {Function|Null}
 * @default mouseOuter = null
 */
```

### click

```js
/**
 * @description Mouse click事件处理器
 * @type {Function|Null}
 * @default click = null
 */
```

::: tip TIP
启用图形的**mouseEnter**，**mouseOuter**，**click**等事件支持需要将`hover`属性配置为`true`。扩展的新图形需要配置**hoverCheck**方法以提供事件支持。
:::

## 原型方法

这里是**Graph**原型方法的介绍。


### attr

```js
/**
 * @description 更新图形状态
 * @param {String} attrName 要更新的属性名
 * @param {Any} change      属性值
 * @return {Undefined} 无返回值
 */
Graph.prototype.attr = function (attrName, change = undefined) {
	// ...
}
```

### animation

```js
/**
 * @description 更新图形状态（伴随过渡动画），仅支持style和shape属性
 * @param {String} attrName 要更新的属性名
 * @param {Any} change      属性值
 * @param {Boolean} wait    是否存储动画队列，等待下次动画请求
 * @return {Promise} Animation Promise
 */
Graph.prototype.animation = async function (attrName, change, wait = false) {
	// ...
}
```

### animationEnd

```js
/**
 * @description 跳至最后一帧动画
 * @return {Undefined} 无返回值
 */
Graph.prototype.animationEnd = function () {
    // ...
}
```

### pauseAnimation

```js
/**
 * @description 暂停图形动画
 * @return {Undefined} 无返回值
 */
Graph.prototype.pauseAnimation = function () {
    // ...
}
```

### playAnimation

```js
/**
 * @description 尝试动画行为
 * @return {Undefined} 无返回值
 */
Graph.prototype.playAnimation = function () {
    // ...
}
```

## 生命周期

当你向**render**中添加图形时，你可以配置下列方法，它们将在特定的时间被调用。

::: tip TIP
图形实例以及其他相关数据将被作为参数传入这些方法。
:::

### added

图形添加完成后被调用。

### beforeDraw

图形样式初始化之后，图形绘制之前被调用，**render**实例作为第二个参数被传入。可以针对需求，修改canvas的ctx样式。

### drawed
图形绘制之后被调用，**render**实例作为第二个参数被传入。

### beforeMove

移动图形之前被调用（drag行为发生前），鼠标事件作为第一个参数被传入。

### moved
移动图形之后被调用（drag行为发生后），鼠标事件作为第一个参数被传入。

### beforeDelete
删除图形之前被调用。

### deleted
图形删除之后被调用。
