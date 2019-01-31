---
sidebarDepth: 2
---

# 实例方法

这里将介绍**CRender**实例的可用方法

## add

向实例中添加新图形

```js
const element = render.add({ attribute: value, ... })
```

### 参数属性表

<full-width-table>
属性|是否必须|作用|类型|默认值
:--:|:--:|:--:|:--:|:--:
name|是|添加的图形名称|`String`|`null`
shape|是|图形形状配置|`Object`|`null`
style|否|图形样式配置|`Object`|`default`
inVisible|否|图形是否可见|`Boolean`|`true`
animationDelay|否|动画延迟(ms)|`Int`|`0`
animationFrame|否|动画帧数|`Int`|`30`
animationCurve|否|动画动效曲线名|`String`|`linear`
dragAble|否|是否可拖拽|`Boolean`|`false`
hoverAble|否|是否检测其hover状态|`Boolean`|`false`
index|否|图形层级|`Int`|`1`
mouseEnter|否|鼠标进入图形的回调函数|`Function`|`null`
mouseOuter|否|鼠标移出图形的回调函数|`Function`|`null`
onClick|否|图形被点击的回调函数|`Function`|`null`
setGraphOrigin|否|设置图形中心点的方法|`Function`|`default`
</full-width-table>

* **shape** 每个图形的配置都不相同，应查阅对应图形

* **style** 请查阅[图形样式]()

* **inVisible** 设置为`fasle`时图形不渲染，但不影响其交互例如拖拽、点击等操作

* **animationCurve** 具体参阅[Transition曲线表](http://transition.jiaminghi.com/curveTable/)

* **hoverAble** 设置为`true`时，当鼠标进入图形时自动调用配置的**mouseEnter**方法，鼠标移出时调用**mouseOuter**方法

* **index** 该值越大渲染优先级越高

* **setGraphOrigin** 用于设置图形的中心点，旋转及放大效果依赖中心点。你可以覆盖该方法去设置中心点，参数提供：*setGraphOrigin(shape, style)*

:::tip
插件导出了**transition**插件提供的注入配置方法，你可以使用它扩展新的动效曲线

```js
import { injectNewCurve } from 'c-render'

injectNewCurve(curveName, bezierCurve)
```
具体请参阅[Transition](http://transition.jiaminghi.com/)
:::

### 返回值

添加的图形的实例，具体属性及方法参阅[图形实例](/guide/instance.html)

## clearArea

擦除当前画布所有内容（这不意味着实例上的图形被删除），无参数、无返回值

```js
render.clearArea()
```

## drawAllGraph

渲染实例下所有可见图形，无参数、无返回值

```js
render.drawAllGraph()
```

## doAnimation

对所有能进行动画的图形进行动画渲染，无参数、无返回值

```js
render.doAnimation()
```