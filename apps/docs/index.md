---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "YMindmap"
  text: "一个用Yjs作为数据源的一个思维导图"
  tagline: 通过 Yjs 作为数据驱动 + Leaferjs 作为渲染层的
  actions:
    - theme: brand
      text: 快速上手 -> 
      link: /guide/
    - theme: alt
      text: 示例
      link: /api-examples

features:
  - title: 基于Yjs驱动
    details: 天然的CRDT数据同步方案，支持离线/多人编辑
  - title: 基于Leaferjs渲染层
    details: 国产，简单，快速，搞得定
  - title: Prosemirror Like的底层架构
    details: View Node Model 分离，拓展性更好
---

