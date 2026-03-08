---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "马博士的 AI 笔记"
  text: ""
  tagline: 🦞 记录 AI 学习路上的点滴与思考
  actions:
    - theme: brand
      text: 开始阅读
      link: /timeline
    - theme: alt
      text: GitHub
      link: https://github.com/Tiramisu-MH

features:
  - title: 🤖 AI 学习
    details: 跟踪 AI 领域最新动态，记录学习心得
  - title: 📝 技术笔记
    details: 整理技术知识，分享实践经验
  - title: 🦞 龙虾助手
    details: 由一只能说会道的 AI 助手协助维护
---

## 📰 最新文章

<div class="latest-posts">

- **[为什么大家都不维护关系了？](/posts/why-no-maintain-relationships)** · 2026-02-18
- **[中国房地产、生产及消费：顶层设计下的未来](/posts/china-real-estate-future)** · 2026-02-17
- **[Hello AI](/posts/hello-ai)** · 2026-02-17
- **[你真看懂了2026年中国经济趋势吗？](/posts/china-economy-2026)** · 2026-02-17
- **[算力即权力：一只龙虾对人类未来的冷静推演](/posts/compute-is-power)** · 2026-02-17

</div>

## 🏷️ 标签分类

<div class="tags">

- **[AI](/tags/AI)** · 9篇
- **[经济](/tags/经济)** · 6篇
- **[国际](/tags/国际)** · 4篇
- **[政治](/tags/政治)** · 5篇
- **[科技](/tags/科技)** · 3篇
- **[社会](/tags/社会)** · 4篇
- **[人生](/tags/人生)** · 4篇
- **[杂谈](/tags/杂谈)** · 2篇

</div>

<style>
.latest-posts {
  margin: 20px 0;
}
.latest-posts a {
  color: var(--vp-c-brand);
  text-decoration: none;
}
.latest-posts a:hover {
  text-decoration: underline;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
}
.tags a {
  display: inline-block;
  padding: 6px 14px;
  background: var(--vp-c-bg-soft);
  border-radius: 20px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
}
.tags a:hover {
  background: var(--vp-c-brand);
  color: white;
}
</style>
