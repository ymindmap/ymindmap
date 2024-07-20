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
      { text: 'API 参考手册', link: '/ref/packages.html' },
    ],

    sidebar: [
      {
        text: '快速上手',
        items: [
        ]
      },
      {
        text: '示例',
        items: [
        ]
      },
      {
        text: '实现原理',
        items: [
          { text: '设计思路', link: '/guide/implementation/' },
        ]
      },
      {
        text: 'API 参考手册',
        items: [
          { text: '核心库', link: '/ref/packages.html' },
          { text: '插件', link: '/ref/extensions.html' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  markdown: {
    config(markdownIt) {
      markdownIt.use(MarkdownItTextualUml)
    }
  }
})
