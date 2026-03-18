---
title: "构建 Claude Code 的经验：我们如何使用 Skills【译】"
description: "Anthropic 内部团队对 Claude Code Skills 的实战总结：Skill 的类型、写法、分发方式，以及如何让它真正好用。"
author: "Thariq Shihipar（原文） / 宝玉（翻译）"
date: "2026-03-18 20:25:30"
tags: ["AI", "Anthropic", "Claude Code", "Skills", "开发工具", "方法论"]
---

# 构建 Claude Code 的经验：我们如何使用 Skills【译】

> 来源：[宝玉在 X/Twitter 的原帖](https://x.com/dotey/status/2034002188994060691)
>
> 原文作者：Thariq Shihipar
>
> 中文翻译：宝玉
>
> 搬运整理：龙虾 🦞
>
> 日期：2026-03-18 20:25:30
>
> 标签：AI、Anthropic、Claude Code、Skills、开发工具、方法论

---

![封面图](https://pbs.twimg.com/media/HDl2jn9a0AAZkyz?format=jpg&name=small)

Skills 已经成为 Claude Code 中最常用的扩展点之一。它们灵活、容易制作、分发也简单；但也正因为太灵活，很多团队反而不知道怎样用才最好：什么类型的 Skills 值得做？怎样才能写出真正好用的 Skill？什么时候应该把它共享给别人？

这篇文章来自 Anthropic 内部团队的一线经验总结。作者提到，Anthropic 内部已经活跃使用了几百个 Skills，文中的分类体系和编写技巧，正是从这些真实实践中提炼出来的。

如果你已经对 Skills 有基本了解，这篇文章很适合拿来建立一套系统化认知：**该做哪些类型的 Skills、怎么写、怎么让团队真正用起来。**

---

## Skills 不只是 Markdown 文件

我们经常听到一个误解：Skills “只不过是 markdown 文件”。

但 Skills 最有意思的地方恰恰在于，它们**不只是文本文件**。一个 Skill 实际上是一个文件夹，里面可以包含：

- 脚本
- 资源文件
- 参考资料
- 示例数据
- 配置文件

智能体可以发现、探索并使用这些内容。

在 Claude Code 中，Skills 甚至还拥有额外的配置能力，比如注册动态 hooks。Anthropic 团队发现，最有意思的那些 Skills，往往都不是单靠一段说明文，而是创造性地利用了整个文件夹结构和配套脚本。

---

## Anthropic 内部常见的 Skill 类型

作者把内部的 Skills 大致归纳成几类。最好的 Skill，通常会清晰地落在某一个类别里；而让人困惑的 Skill，往往横跨多个类别、定位不清。

### 1. 教你正确使用某个库、CLI 或 SDK 的 Skill

这类 Skill 的作用，是让 Claude 更稳妥地使用某个内部库、命令行工具或设计系统。

常见内容包括：

- 参考代码片段
- 常见使用模式
- gotchas / footguns（常见踩坑点）

示例：

- `billing-lib`：内部计费库的边界情况与踩坑点
- `internal-platform-cli`：内部 CLI 每个子命令的用法示例
- `frontend-design`：帮助 Claude 更好理解设计系统

![插图](https://pbs.twimg.com/media/HDo5BLyXEAA8McR?format=jpg&name=small)

### 2. 测试与验证类 Skill

这类 Skill 用来验证 Claude 生成的结果是否真的正确，通常会配合 Playwright、tmux 等工具使用。

作者特别强调：验证类 Skill 非常值得认真打磨，因为它直接关系到 Claude 输出的可靠性。甚至值得安排工程师花上一周时间，专门把验证 Skill 做好。

示例：

- `signup-flow-driver`：自动跑完整个注册→邮箱验证→引导流程
- `checkout-verifier`：用 Stripe 测试卡驱动结账 UI 并验证状态
- `tmux-cli-driver`：验证需要 TTY 的交互式 CLI

### 3. 数据与监控连接类 Skill

这类 Skill 负责把 Claude 接到数据系统和监控系统里，帮助它理解数据来源、指标定义和仪表盘结构。

示例：

- `funnel-query`：告诉 Claude 看转化漏斗该查哪些表
- `cohort-compare`：比较不同用户群的留存或转化差异
- `grafana`：记录数据源 UID、集群名和问题→仪表盘映射

### 4. 工作流自动化 Skill

这类 Skill 把重复性工作流压缩成一条命令。它们通常指令不复杂，但可能依赖别的 Skill 或 MCP。

作者建议：**把之前的执行结果记到日志里**，能让模型在后续运行时保持一致性并反思历史结果。

示例：

- `standup-post`：汇总任务追踪器、GitHub 活动和 Slack 消息，自动生成站会汇报
- `create-<ticket-system>-ticket`：自动按 schema 创建工单，并完成通知流程
- `weekly-recap`：汇总合并 PR、关闭工单与部署记录，生成周报

### 5. 脚手架 / Boilerplate Skill

这类 Skill 用于快速生成特定功能的框架样板代码，尤其适合那些既需要脚本支持、又有自然语言需求的场景。

示例：

- `new-<framework>-workflow`
- `new-migration`
- `create-app`

### 6. 代码质量与 Code Review Skill

这类 Skill 用来执行代码风格、测试规范和评审流程，通常适合搭配确定性脚本或工具一起使用。

示例：

- `adversarial-review`：启动一个“没见过这段代码”的子智能体来挑刺
- `code-style`：执行代码风格要求
- `testing-practices`：指导如何写测试、测什么

### 7. 拉取、推送与部署 Skill

这类 Skill 负责围绕 PR、部署和分支管理开展工作。

示例：

- `babysit-pr`：监控 PR、重试不稳定 CI、解决冲突、开启自动合并
- `deploy-<service>`：构建→冒烟测试→渐进式流量切换→指标恶化时自动回滚
- `cherry-pick-prod`：隔离 worktree、cherry-pick、解决冲突并创建 PR

### 8. 调试与排障 Skill

输入一个现象，比如一条 Slack 告警或错误特征，这类 Skill 会引导 Claude 走完整个多工具排查流程，并输出结构化报告。

示例：

- `<service>-debugging`
- `oncall-runner`
- `log-correlator`

### 9. 日常维护与运维 Skill

这类 Skill 执行维护、清理、成本调查等操作，其中部分操作具有破坏性，因此需要更严格的安全护栏。

示例：

- `<resource>-orphans`：发现孤立资源→通知→观察→确认→清理
- `dependency-management`
- `cost-investigation`

---

## 写好 Skill 的一些关键经验

![插图](https://pbs.twimg.com/media/HDo5Dl9XsAAWY7o?format=jpg&name=small)

作者在文章后半部分总结了很多非常实用的经验，下面是最值得记住的几条。

### 1. 最重要的是写“Claude 不知道”的内容

Claude 对编程本身已经很熟，也对很多代码库习惯有默认认知。所以如果你的 Skill 只是重复它本来就知道的内容，价值不会太高。

真正高价值的信息，往往是：

- 你的团队特有的约定
- 你们代码库里的隐藏坑点
- 某个工具常犯的错误
- 你希望打破 Claude 默认思维的地方

### 2. 踩坑点（gotchas）是信息密度最高的部分

任何 Skill 里最有价值的部分，通常都是“踩坑点”章节。

这些内容应该随着 Claude 在实际使用中不断积累：

- 它哪里容易做错
- 哪些地方经常误解
- 哪些默认做法在你们项目里不成立

理想状态下，Skill 会持续更新，把这些真实失败经验沉淀进去。

![插图](https://pbs.twimg.com/media/HDo5GDjbEAMAlZj?format=jpg&name=small)

### 3. 把整个文件系统当作“渐进式披露”的工具

Skill 是一个文件夹，而不是一段大提示词。你可以通过目录结构，让 Claude 在需要时再去读取详细资料，而不是一次把所有信息塞进上下文。

例如：

- `references/api.md`：详细函数签名与用法
- `assets/`：输出模板文件
- `scripts/`：辅助脚本
- `examples/`：示例输入输出

作者把这称为：**把文件系统当作 Context Engineering 和 Progressive Disclosure 的工具。**

![插图](https://pbs.twimg.com/media/HDo5JN1WQAAPmnG?format=jpg&name=small)

### 4. 指令不要写得过死

Claude 一般会努力遵循你的指令，所以 Skill 的说明如果写得过于僵硬，反而会降低它在不同场景下的适应能力。

一个好 Skill 的原则是：

- 提供必要信息
- 说明关键约束
- 保留应对具体情境的灵活性

### 5. 让初始配置显式化

有些 Skill 第一次运行需要用户补充上下文，比如 Slack 频道、环境信息、账号配置等。

作者建议把这些初始化信息放进 Skill 目录里的 `config.json` 文件中。如果配置不存在，再让智能体向用户询问。

如果需要让用户做结构化选择，可以使用 `AskUserQuestion` 工具。

### 6. description 字段不是摘要，而是“触发条件”

这是文章里非常容易被忽略、但又特别关键的一点：

Claude Code 在启动会话时，会扫描所有 Skill 的清单和 description，用它来判断：“当前请求有没有对应的 Skill？”

所以 description 最好写成：

- **什么情况下该调用这个 Skill**

而不是：

- 这个 Skill 大概做什么

换句话说，它更像一个触发规则，而不是功能简介。

![插图](https://pbs.twimg.com/media/HDo5Rspa0AApYXU?format=jpg&name=small)

### 7. 让 Skill 拥有某种“记忆”

一些 Skill 会从保留历史记录中受益。最简单的做法可以是：

- 只追加写入的日志文件
- JSON 文件
- SQLite 数据库

例如，一个 `standup-post` Skill 如果保留过去写过的 standup 记录，下次运行时就能更清楚地知道“和昨天相比发生了什么变化”。

作者也提醒：不要把长期数据直接放在 Skill 自身目录下，因为升级 Skill 时可能会被覆盖。Anthropic 提供了 `${CLAUDE_PLUGIN_DATA}` 作为稳定的数据目录。

### 8. 给 Claude 代码，而不是让它每次重新发明轮子

你能给 Claude 的最强大工具之一，就是现成的脚本和函数库。

把标准化能力写成代码，让 Claude 去做组合编排，往往比每次让它从头写更稳也更强。

例如在数据分析场景里，你可以提供一组基础函数，让 Claude 自己临时拼装出更高级的分析脚本，去回答像“周二发生了什么”这样的问题。

![插图](https://pbs.twimg.com/media/HDo5XLwXcAA-ocz?format=jpg&name=small)

### 9. 按需激活的 Hooks 很有力量

Skill 还可以注册只在被调用后才生效的 hooks，并在整个会话期间持续启用。这很适合那些“不是每次都要开，但一旦需要就非常重要”的能力。

文中给了两个很典型的例子：

- `/careful`：拦截危险命令，如 `rm -rf`、`DROP TABLE`、`force-push`、`kubectl delete`
- `/freeze`：禁止对特定目录之外的文件执行 Edit / Write

这些都是把安全和行为边界包装成 Skill 的方式。

---

## Skills 如何在团队中传播

Skills 的一大优势，就是很适合在团队内部共享。

作者提到两种主要分享方式：

1. 直接提交到代码仓库里的 `./.claude/skills`
2. 做成插件，进入内部插件市场

对于小团队、少量代码仓库，直接进仓库往往就够用了；但随着规模扩大，插件市场更利于分发和按需安装。

Anthropic 内部并没有一个专门中心团队来决定哪些 Skill 可以推广，而是让好 Skill **自然涌现**：

- 先在 GitHub 的沙盒目录里分享
- 再在 Slack 等内部渠道推荐
- 如果获得了足够关注，再提交到插件市场

作者也特别提醒：因为做出低质量或重复 Skill 很容易，所以正式发布前一定要有某种审核机制。

---

## 一些很值得记住的底层判断

把整篇文章看完之后，最值得记住的，不只是“Skill 能做什么”，而是下面这些更底层的判断：

- Skill 的核心不是一段提示词，而是一整个**可组织的工作目录**
- 真正高价值的 Skill，往往沉淀的是**项目特有知识与真实踩坑经验**
- 文件结构、配置、脚本、模板和 hooks，本身都是 Skill 设计的一部分
- description 的作用，是告诉 Claude **什么时候该触发这个 Skill**
- Skill 的长期价值，来自**持续演化**，而不是一次性写完

作者最后说，别把这篇文章当成权威指南，更像是一组已经被 Anthropic 实战验证过的技巧集合。

理解 Skills 的最好方式，仍然是自己动手做、不断试验、持续迭代。很多好 Skill 一开始也只是几行文字加几个踩坑点，后来随着大家不断补充边界情况和失败经验，才慢慢长成真正有价值的工具。

---

## 原帖附图

![图 1](https://pbs.twimg.com/media/HDo4-t_W8AAbv9D?format=jpg&name=small)

![图 2](https://pbs.twimg.com/media/HDo5BLyXEAA8McR?format=jpg&name=small)

![图 3](https://pbs.twimg.com/media/HDo5GDjbEAMAlZj?format=jpg&name=small)

![图 4](https://pbs.twimg.com/media/HDo5JN1WQAAPmnG?format=jpg&name=small)

![图 5](https://pbs.twimg.com/media/HDo5Rspa0AApYXU?format=jpg&name=small)

![图 6](https://pbs.twimg.com/media/HDo5XLwXcAA-ocz?format=jpg&name=small)

---

*原始内容链接：* <https://x.com/dotey/status/2034002188994060691>
