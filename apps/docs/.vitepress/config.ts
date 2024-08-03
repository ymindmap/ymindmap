import { defineConfig } from 'vitepress'
import MarkdownItTextualUml from 'markdown-it-textual-uml';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/ymindmap/',
  title: "YMindmap",
  description: "A mindmap with yjs and Leafer.js",
  head: [
    [
      'script',
      {
        async: 'async',
        src: 'https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.9.1/mermaid.min.js',
      },
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '快速上手', link: '/guide/' },
      { text: '实现原理', link: '/guide/implementation/' },
      { text: 'API 参考手册', link: '/ref/@ymindmap-view.html' },
    ],

    sidebar: [
      {
        text: '快速上手',
        items: [
          { text: '简介', link: '/guide/' },
          { text: '安装', link: '/guide/install.html' },
        ]
      },
      {
        text: '示例',
        items: [
          { text: '协同', link: '/demos/collab.html' },
        ]
      },
      {
        text: '数据管理原理',
        items: [
          { text: '设计思路', link: '/guide/implementation/' },
          { text: 'model', link: '/guide/implementation/packages/model.html' },
          { text: 'state', link: '/guide/implementation/packages/state.html' },
          { text: 'view', link: '/guide/implementation/packages/view.html' },
          { text: 'core', link: '/guide/implementation/packages/core.html' },
          { text: 'browser', link: '/guide/implementation/packages/browser.html' },
          { text: '插件系统', link: '/guide/implementation/extensions/' },
        ]
      },
      {
        text: '思维导图原理',
        items: [
          { text: 'Mindmap', link: '/guide/implementation/extensions/mindmap.html' },
        ]
      },
      {
        text: 'API 参考手册',
        items: [
          { text: '@ymindmap/view', link: '/ref/@ymindmap-view.html' },
          { text: '@ymindmap/model', link: '/ref/@ymindmap-model.html' },
          { text: '@ymindmap/state', link: '/ref/@ymindmap-state.html' },
          { text: '@ymindmap/core', link: '/ref/@ymindmap-core.html' },
          { text: '@ymindmap/browser', link: '/ref/@ymindmap-browser.html' },
          { text: '@ymindmap/extension-mindmap', link: '/ref/@ymindmap-extension-mindmap.html' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ymindmap/ymindmap' }
    ],
    search: {
      provider: 'local'
    }
  },
  markdown: {
    config(markdownIt) {
      markdownIt.use(MarkdownItTextualUml)
    }
  },
})
