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
      // { text: '示例', link: '/guide/' },
      { text: '实现原理', link: '/guide/implementation/' }
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
