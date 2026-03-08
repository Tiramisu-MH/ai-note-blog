import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "马博士的 AI 笔记",
  description: "记录 AI 学习路上的点滴与思考",
  base: '/ai-note-blog/',
  lang: 'zh-CN',
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '时间线', link: '/timeline' },
      { text: '关于', link: '/about' }
    ],

    // 侧边栏 - 禁用，通过时间线访问
    sidebar: false,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Tiramisu-MH' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: '🦞 记录 AI 学习路上的点滴与思考',
      copyright: 'Copyright © 2026 马博士'
    },

    outline: {
      label: '目录'
    },

    docFooter: {
      prev: '上一篇',
      next: '篇'
    },

    lastUpdated: {
      text: '更新时间',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    appearance: true
  }
})
