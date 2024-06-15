# 一个基于Yjs的mindmap项目

一个个人的 yjs/fabric 项目
核心项目定义参考了[prosemirror](https://prosemirror.net/)

如果你觉得很像，那就对了

目前刚刚立项

希望未来可以有更多人参与

## 路径

### apps/docs

项目的测试/doc目录，目前待开发

### extensions

拓展系统，目前待开发

### packages

各类基础包

#### packages/core

核心库，生成整个编辑器

#### packages/model

模型定义，参考了prosemirror，主要用来绑定schema和Yjs.XmlElement

可以基于node来自动初始化一个yjs的xmlElement

也可以基于Yjs.XmlElement来创建一个node来创建对应的 fabric 对象

#### packages/state

状态定义，对Yjs.state的简单封装，额外增加了当前选中态

#### packages/view

视图定义

定义了基础的Topic模型 + 绑定 yjs 和 fabric

### startkits

待施工，给vue2/vue3/react未来使用的默认绑定组件

大概我不会开发的大概

## ROADMAP

- [ ] 基于prosemirror完成基础的类型定义
- [ ] 定义出第一个简单的 Topic
- [ ] 渲染出第一个Topic
- [ ] 一个Command系统
- [ ] command支持创建Topic
- [ ] Topic支持创建子Topic（）
- [ ] Topic支持输入文字
- [ ] content/group校验系统
- [ ] 。。。
