---
sidebarDepth: 2
---

# 介绍
插件基于**Canvas**渲染图形，用法简单，极易上手。内置了较为丰富的基础图形，能够极大提升开发效率，在此基础上，你也可以十分容易的扩展新图形。

## 特点

* 动效

基于**transition**插件提供了动效支持，调用图形实例的**animation**方法去更改其状态，**CRender**将自动渲染图形状态过渡动画，动画——轻而易举

[Transition](http://transition.jiaminghi.com/)

* 交互

内置的基础图形都提供了**drag**、**mouseEnter**、**mouseOut**、**click**等功能及事件的支持

## 安装

* npm安装

```sh
npm install @jiaminghi/c-render
```

* yarn安装

```sh
yarn add @jiaminghi/c-render
```

## 扩展

要为**CRender**扩展新的图形或添加新的动效曲线请参阅[扩展](/extend/#扩展)