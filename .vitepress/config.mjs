import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "马博士的 AI 笔记",
  description: "记录 AI 学习路上的点滴与思考",
  base: '/ai-note-blog/',
  lang: 'zh-CN',
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/big-things-happening' },
      { text: '关于', link: '/about' }
    ],

    sidebar: [
      {
        text: '文章',
        items: [
          { text: '你真看懂了2026年中国经济趋势吗？', link: '/posts/china-economy-2026' },
          { text: '大事正在发生', link: '/posts/big-things-happening' },
          { text: 'Hello AI', link: '/posts/hello-ai' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Tiramisu-MH' }
    ],

    // 搜索功能
    search: {
      provider: 'local'
    },

    // 页脚
    footer: {
      message: '🦞 记录 AI 学习路上的点滴与思考',
      copyright: 'Copyright © 2026 马博士'
    },

    // 大纲显示
    outline: {
      label: '目录'
    },

    // 文档页脚
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    // 暗色模式
    appearance: true
  }
})
