---
title: "一文理清！Hermes 全部高阶工具配置"
author: "Research王13 (转载自 X)"
date: '2026-04-20 00:13:21'
tags: ["Hermes", "Agent", "工具链", "RAG", "搜索"]
---

# 一文理清！Hermes 全部高阶工具配置

> 来源：[Research王13 (转载自 X)](https://x.com/researchwang/status/2045812932538438001)
>
> 整理：by 蛋黄 🐱
>
> 日期：2026-04-20 00:13:21
>
> 标签：Hermes、Agent、工具链、RAG、搜索

---

hermes 出来后，发现并没有太多人迁移过来。这次不像之前 openclaw 小龙虾发布的时候，大家都在等更好的 Agent、等更好的模型。实际操作起来，后面即使出现更好的 Agent，也是“一通百通”的。

为了治好大家的拖延症，作者把实测的 Hermes 配置清单整理出来了。这套配置横跨多个领域，直接从底层逻辑到实战部署，讲每一个组件到底能帮你干什么。

## 推荐阅读结构

- 身份与记忆：SOUL.md / 角色库 / 记忆后端
- 感知能力：内容抓取 / 网页搜索 / 浏览器自动化 / 文档处理
- 表达能力：语音 / 图片生成
- 效率与成本：Token 监控 / 自我进化 / Skill 库
- 生态导航：Hermes 资源入口

## 1. 装完 Hermes 第一件事，不是用它，是告诉它“你是谁”

SOUL.md 是 Hermes 的人格文件，是系统提示的第一个位置。但很多人不知道怎么写。

作者的做法是先从网上摘取一个模板，再慢慢和 Hermes 对话，每次对话完都提醒它修改 SOUL.md，持续迭代。用的是 `agency-agents-zh`，里面有 211 个中文角色模板，覆盖小红书运营、技术写作、研究助手等场景。

211 个模板一个一个浏览太多了，可以用 GitHub 搜索查找你要的领域、岗位名称、所在平台，然后在 Hermes 中说：

```bash
激活 xxxx 模式
```

例如小红书写作模式：

```bash
# 安装命令
https://github.com/jnMetaCode/agency-agents-zh 安装这个存储库

# 激活模式（以小红书写作模式为例）
激活小红书内容写作模式
```

## 2. 记忆层：Hindsight 比内置 MEMORY.md 更主动

Hermes 的记忆系统相比 OpenClaw 已经有进步，但内置的 MEMORY.md 只会记“模型主动写下来的东西”。

换成 Hindsight 之后，它会自动从每次对话中提取实体和关系。比如你周一提了一个项目截止日期，周五新会话里它还能自动记得，不需要重复说明。

```bash
# 安装命令
https://github.com/vectorize-io/hindsight 帮我在服务器上部署 hindsight，并且当作 hermes 的记忆系统

# 可以把自己的第三方 API 导入，或者用 OpenAI
# 作者用的是 DeepSeek 的 API
```

总结：

- SOUL.md → agency-agents-zh（211+ 中文角色模板）
- 记忆 → Hindsight（可以自建到服务器上）

## 3. 感知能力：让 Agent 能读懂互联网、吃掉文档、操作网页

### 内容抓取

作者用了两个工具组合：

- Jina Reader：抓单页，URL 前面加即可输出干净 Markdown
- Crawl4AI：深度抓取，开源、本地运行，基于 Playwright，支持用本地模型做结构化提取，完全免费

```bash
# 安装命令
配置 https://github.com/jina-ai/reader 和 https://github.com/unclecode/crawl4ai
```

### 绕反爬

使用反爬代理和隐身浏览器。Hermes 自带 Scrapling optional-skill，不需要再额外装。

隐身浏览器推荐 CamoFox 和 Browser Use。当前 Hermes 已经内置好了 Browser Use，只需要安装 CamoFox。

```bash
# 安装 camofox
帮我安装 camofox，链接为：https://github.com/jo-inc/camofox-browser
```

### 网页搜索

- Tavily：每月 1000 次免费，专为 AI agent 设计，返回带引用的结构化结果
- DuckDuckGo：零成本兜底

```bash
# 安装 Tavily
# 1. 去 tavily.com 注册，拿 API key（免费 1000 次/月）
https://app.tavily.com/sign-in

# 2. 写入 Hermes 环境变量
echo 'TAVILY_API_KEY=tvly-你的key' >> ~/.hermes/.env

# 3. 设置搜索后端
hermes config set web.backend tavily

# 备选：DuckDuckGo
hermes config set web.backend duckduckgo
```

### 文档处理

- Pandoc：可把 PDF、DOCX、HTML、EPUB、LaTeX、CSV 等转成 Markdown、HTML、DOCX、PDF 等
- Marker：PDF 转 Markdown 效果差时使用

```bash
# 安装 pandoc
帮我安装 pandoc https://pandoc.org/installing.html#linux

# 安装 marker
帮我安装 marker，链接为：https://github.com/datalab-to/marker
PDF 转 Markdown 时使用 marker
```

推荐配置：

- 单页抓取 → Jina Reader
- 批量抓取 → Crawl4AI
- 反爬 → Scrapling
- 搜索 → Tavily + DuckDuckGo
- 浏览器 → CamoFox
- 文档 → Pandoc + Marker

## 4. 让 Agent 会“说”和“画”

### 语音识别

Telegram 场景很刚需。识别用 Whisper 本地模式，支持 99 种语言，Telegram 语音消息可自动转文字；合成用 Edge TTS，微软免费，质量也不错，Hermes 默认方案。

```bash
# 安装 whisper
帮我安装 whisper： https://github.com/openai/whisper
```

### 图片生成

可用 FLUX、Midjourney、DALL-E 3 等。

```bash
# Black Forest Labs 官方 FLUX Skill
hermes skills install black-forest-labs/skills

# 导入 FAL.ai 的 api-key
echo 'FAL_KEY=你的key' >> ~/.hermes/.env
```

## 5. Token 监控、自我进化、Skill 扩展

### Token 监控

- Tokscale：`tokscale --hermes` 看全局消耗
- Hermes Dashboard：可按组件拆解 token

```bash
# tokscale
# tokscale --hermes 看全局消耗
链接：https://github.com/junhoyeo/tokscale

# hermes-dashboard
链接：https://github.com/Bichev/hermes-dashboard
```

### 降低 token 开销

RTK（Rust Token Killer）能把终端命令的 token 消耗压掉 80% 到 90%。

```bash
# RTK (Rust Token Killer)
https://github.com/adityahimaone/hermes-agent
```

### 自我进化

等系统稳定两周后再开。`hermes-agent-self-evolution` 用遗传算法自动优化 Hermes 的 prompt 和行为，但建议搭配一个验证 cron，防止优化循环把你还没调好的配置“优化”得更乱。

### Skill 扩展

- 一次性装 `wondelai/skills`（380+ 跨平台 skill）扩展基础能力
- 再按需从更多 skill 仓库里挑

```bash
# skills 安装
帮我安装这个 链接为：https://github.com/wondelai/skills
```

## 6. 记住一个入口就够了

作者最后给的建议很简单：收藏一个入口就够了——`awesome-hermes-agent`，所有工具、skill、插件、教程都在这里。

---

## 原文链接

[原始推文](https://x.com/researchwang/status/2045812932538438001)
