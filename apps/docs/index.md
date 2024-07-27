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
      text: API
      link: /ref/@ymindmap-core.html
  image: https://www.plantuml.com/plantuml/png/SoWkIImgoStCIybDBE2oAIwfp4cruuBoNJ8JquiISnMgkHGKzDABKbFpG4mWS4fCpauloY_DIt7EpyalKiZ9JCye0Ii0IjTorNBPw4DDqbRmXPgjhQrWOmDMOsU7oj7LHU8uf0ALGxG00000

features:
  - title: 基于Yjs驱动
    details: 天然的CRDT数据同步方案，支持离线/多人编辑
  - title: 基于Leaferjs渲染层
    details: 国产，简单，快速，搞得定
  - title: Prosemirror Like的底层架构
    details: View Node Model 分离，拓展性更好
---

<div class="demo-container" style="width: 100%;display: flex;justify-content: center;align-items: center;height: 300px;margin-top: 64px;">
  <div class="demo" style="width: 100%;height: 100%;overflow: hidden;border-radius:8px;"></div>
</div>

<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  const { Mindmap, getDefaultData } = await import('@ymindmap/browser');
  const { TextMindmapExtension } = await import('@ymindmap/extension-text');
  const { MindmapExtension } = await import('@ymindmap/extension-mindmap');
  new Mindmap({
    el: '.demo',
    data: getDefaultData(),
    editable: true,
    extensions: {
      Text: TextMindmapExtension,
      Mindmap: MindmapExtension
    },
  })
})
</script>
