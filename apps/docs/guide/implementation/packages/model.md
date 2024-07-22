# 数据模型层

整体思路其实和 `Prosemirror` 类似，不过思维导图不同于富文本文档，目前没有 `Mark` 的概念，所以 `model` 只会转换 `Yjs` 的 `Xml` 到对应的 `Node`

## Schema系统

和 `Prosemirror` 一样，我们也需要一个 `Schema` 来定义我们的节点类型，作为一个类似 `Map` 的存在，在对数据进行便利的时候可以更方便的获取对应 `node` 的初始化函数

## Node系统

其实从数据结构上来说，`Yjs` 的任何一个 `Xml` 其实就是一个 `Node` (其实`Text`也算是`Node`的一种)转换到`js`实际上就是一个个的基础的`Object` 但是这个对象如果要直接拿给`Leaferjs`js使用的话，还是需要进行一些基础的处理，例如一些`attrs`属性的存在，部分属性的默认值补全等

所以整个 `Node` 也就是模型层面被单独抽象了出来

当然`Node`还会额外根据当前`Node`对应的`Yjs`的节点基础信息提供一些基本的数据给外部

例如

- **depth** 当前Node对应节点的深度
- **nodeSize** 当前Node对应的节点大小
- **children** 子 `Node`
- **attributes** 定义的这个节点有用的`attrs`属性如果该属性有缺失，会自动根据默认值进行生成并修改回对应的`state`

### NodeSpec定义

一些`Node`的基础定义，表示这个`Node`在`Leaferui`以及数据层面的关联关系

主要是`content`和`group`属性

当然

**这个 `Node` 上的 `attrs` 和 `toCanvas` 渲染的 `leaferjs` 的 元素是这里进行定义的**

`schema`里的`node`主要就是`nodeSpec`

### NodeType定义

提供了一个简单的胶水层，沟通了`Schema`和`NodeSpec`之间的联系
类似于一个工厂函数，可以通过`Yjs`的`Xml`自动推理出是哪个`Node`然后创建出对应的`node`对象出来

本身生成的`nodeType`实例倒是很简单，只有一个`name`以及`spec`(NodeSpec)

## 链接

[Api](/ref/@ymindmap-model.html)

## 目前待开发

[ ] `setAttr/setAttrs` 方法，将`attr`的变更同步回`yjs`上
[ ] `update` 方法，如果有任何属性发生了改变，通知对应的`view`进行更新
