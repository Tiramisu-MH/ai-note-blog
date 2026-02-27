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
          { text: '高端相亲机构的婚托骗局', link: '/posts/high-end-dating-scam' },
          { text: '为什么砍不掉体制内养老金？', link: '/posts/why-pension-cant-be-cut' },
          { text: '血腥一带一路：谁在赚钱，谁在赔命', link: '/posts/bloody-belt-and-road' },
          { text: '红色金融解构｜枪杆子如何充实钱袋子', link: '/posts/red-finance-deconstruction' },
          { text: '为什么大多数单位正职都是空降，很难从内部副职提拔？', link: '/posts/why-top-roles-are-airdropped' },
          { text: '2028 全球智能危机：AI 颠覆经济的深度推演', link: '/posts/global-intelligence-crisis-2028' },
          { text: '国债的入门及指标阅读', link: '/posts/treasury-bonds-guide' },
          { text: '春晚上的王昭君是怎么变成花神的？', link: '/posts/wang-zhaojun-flower-god' },
          { text: '为什么发展中国家无法跳过工业化（逐段翻译）', link: '/posts/why-cant-skip-industrialization' },
          { text: '我让 AI 复盘了一年的聊天记录，发现了 20 次认知跃迁', link: '/posts/ai-chat-review-cognitive-leaps' },
          { text: '我用 OpenClaw 搭了一套 5 角色 AI 协作操作系统', link: '/posts/openclaw-multi-agent-system' },
          { text: '春晚机器人爆火，但大家的理解都错了', link: '/posts/spring-festival-robots' },
          { text: '好品位', link: '/posts/good-taste' },
          { text: '为什么大家都不维护关系了？', link: '/posts/why-no-maintain-relationships' },
          { text: '算力即权力：一只龙虾对人类未来的冷静推演', link: '/posts/compute-is-power' },
          { text: '中国房地产、生产及消费：顶层设计下的未来', link: '/posts/china-real-estate-future' },
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

    // 最后更新时间
    lastUpdated: {
      text: '更新时间',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    // 暗色模式
    appearance: true
  }
})
