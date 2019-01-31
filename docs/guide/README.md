# 介绍
插件基于**Canvas**渲染图形，用法简单，极易上手。内置了较为丰富的基础图形，能够极大提升开发效率，在此基础上，你也可以进行新图形的扩展，这是十分方便的。

## 优点

* 动效

基于**transition**插件提供了动效支持，当需要更改图形状态时，调用**animationTo**方法，将自动渲染图形状态过渡动画，动画——轻而易举

[Transition](http://transition.jiaminghi.com/)

* 交互

内置的基础图形都提供了**拖拽**、**mouseEnter**、**mouseOut**、**click**等功能及事件的支持

* 轻量

插件及依赖未压缩版体积尚不足**60K**

## 安装

* npm安装

```sh
npm install @jiaminghi/c-render -D
```

* yarn安装

```sh
yarn add @jiaminghi/c-render -D
```

## 下载

* github下载

从github[项目地址](https://github.com/jiaming743/CRender)去下载

* 官网下载

从官网[下载地址](http://crender.jiaminghi.com/download/crender.zip)去下载

下载完成后将下载后的压缩包进行解压，然后放入你的项目中

## 构建实例

```js
import CRender from 'c-render'

const canvas = document.getElementById('canvas')

const render = new CRender(canvas)
```

:::tip
构建实例时需要传入唯一且必需的参数：**canvas**DOM节点
:::

## 扩展

要为**CRender**扩展新的图形请参阅[扩展](/extend/#扩展)

<!-- <test /> -->