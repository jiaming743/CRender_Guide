---
sidebarDepth: 2
---

# 图形实例

这里将介绍图形实例的一些属性和方法

通过如下方法，我们可以得到一个圆形的图形实例

```js
const circle = render.add({
  name: 'circle',
  shape: { rx: 100, ry: 100, : 30 },
  style: { fill: '#ffe793' }
})
```

## 实例属性表
<full-width-table>
属性|作用|类型
:--:|:--:|:--:
|--|[参数属性表](/guide/prototype.html#参数属性表)|--
pause|图形动画状态|`Boolean`
hovered|图形是否处于hover状态|`Boolean`
dragging|图形动画状态|`Boolean`
</full-width-table>

:::tip
**pause** 设置该属性为`true`时，将中断图形动画
:::

## 实例方法
图形实例的状态都应该通过实例提供的方法去更改

### attr

修改图形属性及状态，修改操作完成后自动触发重绘

```js
/**
 * @param  {String}    attrName 修改的属性名
 * @param  {Any}       value    修改属性的值
 * @return {Undefined}
 */
circle.attr(attrName, value)
```

```js
circle.attr('shape', { rx: 200 })
circle.attr('style', { fill: '#5cb0d9' })
circle.attr('pause', true)
```

### animationTo

使用动画过渡图形状态的更改。启用等待模式，将不会立即渲染动画，而是缓存动画数据，等到下次触发动画渲染时（非等待模式）再渲染

```js
/**
 * @param  {('shape'|'style')} attrName 修改的属性名
 * @param  {Any}               value    修改属性的值
 * @param  {Boolean}           wait     是否启用等待模式
 * @return {Promise}
 */
circle.animationTo(attrName, value, wait = false)
```

```js
circle.animationTo('shape', { rx: 200 })
circle.animationTo('style', { fill: '#5cb0d9' })
```

::: warning
**animationTo**不应用来修改`shape`、`style`外的其他属性
:::

想要同时修改**shape**及**style**然后再进行动画渲染可使用等待模式

```js
circle.animationTo('shape', { rx: 200 }, true)
circle.animationTo('style', { fill: '#5cb0d9' })
```

### animationEnd

直接进入当前图形动画的最后一帧，并结束动画，无参数、无返回值

```js
circle.animationEnd()
```