# 概览

> 因为之前通过 [Prosemirror](https://prosemirror.net/) 做过协同编辑器，发现其设计非常的精巧，同时正好在公司内负责思维导图相关的开发，于是就开始考虑要不要试着使用 [Prosemirror](https://prosemirror.net/) 的架构方案做一个思维导图试试看

## YMindmap是什么

这是一个 **Canvas** 的思维导图系统，其设计和 [Prosemirror](https://prosemirror.net/) 一样，整个 YMindmap 的核心部分实际没有完全围绕生成思维导图展开，而是将整个项目分为了 视图层，数据层，模型层，核心库实际上并没有做任何思维导图的实现，而思维导图其实是通过 **插件** 的形式提供的，只要保持基本的接口部分不变，整个YMindmap 可以像一个乐高一样，搭建出自己喜欢的任何样子的东西！不过那个时候可能不叫 YMindmap 了吧～

当然整个项目的基石主要是 作为整个数据源的 [Yjs](https://yjs.dev/) 以及作为渲染层的 [Leafer.js](https://www.leaferjs.com/ui/)
