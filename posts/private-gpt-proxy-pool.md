---
title: "零基础，三分钟，构建私人 GPT 代理池：看完还能自己开个中转站"
author: "烁皓 (转载自 X)"
date: '2026-04-18 16:04:05'
tags: ["OpenAI", "Codex", "代理池", "CLIProxyAPI", "中转站"]
---

# 零基础，三分钟，构建私人 GPT 代理池：看完还能自己开个中转站

> 来源：[烁皓 (转载自 X)](https://x.com/eternityspring/status/2045347538278990321)
>
> 整理：by 蛋黄 🐱
>
> 日期：2026-04-18 16:04:05
>
> 标签：OpenAI、Codex、代理池、CLIProxyAPI、中转站

---

一个 Plus 账号不够用，一个 Pro 账号又经常闲着？

3 分钟构建自己本地的代理池，跟着操作完，0 基础也能去开中转站。而这一切，只需要准备一个 Codex。

## 代理池概览

原理：客户端 -> CLIProxyAPI -> 账号调度 -> OpenAI

优缺点：

- 前端配置只配一次，后面换账号不需要改每个客户端
- 多个账号可以集中维护
- 这种方法有点擦边，不过如果只是反代出来在 Codex 中用，风险会小很多

这一段最简单，直接把活交给 Codex。

你可以直接发这句提示词：

`把 https://github.com/router-for-me/CLIProxyAPI 部署到我本地，不要用 Docker。`

对于没有基础的，可以强调不用 Docker，有经验的自行决定。

这样 Codex 一般会直接帮你完成下载、安装依赖、生成配置、启动服务。

服务跑通后，通常会给你一个类似下面的确认结果：

![CLIProxyAPI 本地服务启动成功](https://pbs.twimg.com/media/HGKGMkMaIAASdsO?format=jpg&name=small)

从这张图里至少要确认两件事：

- 服务地址已经起来了，比如 `http://127.0.0.1:8317`
- `/v1/models` 能正常返回，不是 500 或连不上

如果这一步都还没成功，就先不要往后走，先让 Codex 继续把服务修到能访问为止。

## 开启设备码授权

CLIProxyAPI 要接入你的 ChatGPT / Codex 账号，前提是账号允许设备码授权。

先登录你的 ChatGPT 账号，进入安全设置，找到 **Enable device code authorization for Codex** 并开启。

![在 ChatGPT 安全设置中开启 Codex 设备码授权](https://pbs.twimg.com/media/HGKGY6Ja0AAkO8L?format=jpg&name=small)

这一步每个要接入的账号都要开一次。不开的话，后面设备码授权会卡住。

服务部署好、授权开关也打开以后，就可以开始接账号了。

直接对 Codex 说：

`帮我配置 Codex 账号`

它通常会返回一个设备码授权链接和验证码，让你去浏览器完成确认：

![Codex 返回设备码授权链接和验证码](https://pbs.twimg.com/media/HGKGh4RaEAAqFWV?format=jpg&name=small)

如果设备码授权失败，就是过期了，可以让 Codex 再发一遍。

## 打开授权页

在浏览器访问授权链接，正常情况下你会先看到登录页面：

![OpenAI 登录页面](https://pbs.twimg.com/media/HGKGoXdaIAAgiC0?format=jpg&name=small)

输入你的账号密码继续即可。

这个流程里最容易把人劝退的，就是授权页偶尔会直接给你一个报错：

![设备码授权页出现 Oops 报错](https://pbs.twimg.com/media/HGKGvuebEAAKkFC?format=jpg&name=small)

别急，这不一定是失败，有个绕过去的办法：

1. 点 Try again
2. 随便输入一个错误账号，先把流程推进到下一页
3. 再点 Edit 把邮箱改成正确账号，继续输入密码

![点击 Edit 改回正确账号继续登录](https://pbs.twimg.com/media/HGKG4yFaMAAmGcb?format=jpg&name=small)

登录完成后，页面会要求你输入刚才 Codex 提供的 9 位设备码：

![输入设备码完成 Codex 设备授权](https://pbs.twimg.com/media/HGKG_T9bEAAnKmM?format=jpg&name=small)

输完点 Continue。

接着会出现授权确认页，意思是允许 ChatGPT 账号把身份共享给 Codex CLI 使用：

![确认把 ChatGPT 账号授权给 Codex 使用](https://pbs.twimg.com/media/HGKHFSma8AAaasS?format=jpg&name=small)

这里直接点 Continue 就行。

完成以后，回到 Codex 对话里告诉它一声“好了”，它就会继续收尾，把这个账号真正接入到 CLIProxyAPI。

如果你不止一个账号，就继续重复上面的授权流程。

你只需要对 Codex 说：

`还要继续添加账号`

然后重复前边的步骤就可以。

## 管理后台

账号接好之后，打开：

`http://127.0.0.1:8317/management.html`

如果打不开，直接让 Codex 帮你排查。

默认管理密码是 `local-management-key`。

第一次打开时，你会先看到登录页，直接填默认管理密码进入：

![CLIProxyAPI 管理后台登录页](https://pbs.twimg.com/media/HGKHP5xa4AA7Mn4?format=jpg&name=small)

登录成功后，大致会看到这样的后台概览页：

![CLIProxyAPI 管理后台概览页](https://pbs.twimg.com/media/HGKHW93bwAA37dn?format=jpg&name=small)

如果你还想让同一局域网里的其他设备也能调用，也可以对 Codex 说一句：

`把 CLIProxyAPI 配置成局域网可访问。`

## 接到 Codex 前端

当代理层和账号都准备好以后，就可以把 Codex 前端接到这个本地接口上。

让 Codex 直接帮你改 `config.yaml`，核心配置就是这两个值：

```yaml
openai_base_url: "http://192.168.3.6:8317/v1"  # 其中的 ip 对应你本机 IP
api_key: "local-api-key"
```

如果只是本机自己用，也可以把地址写成：

```yaml
openai_base_url: "http://127.0.0.1:8317/v1"
api_key: "local-api-key"
```

其中：

- `openai_base_url` 指向你的 CLIProxyAPI 服务
- `api_key` 默认就是本地代理的访问口令 `local-api-key`

建议直接把这两行复制给 Codex，让它帮你填进去。

重新打开 Codex 后，不要走官方登录，直接选 **Enter API key**：

![Codex 欢迎页选择 Enter API key](https://pbs.twimg.com/media/HGKIF-jaQAA2HsW?format=jpg&name=small)

到输入 API Key 界面，直接填：

`local-api-key`

![Codex Enter API key](https://pbs.twimg.com/media/HGKIL5KbgAAcnTl?format=jpg&name=small)

## 常见问题

### 1. 授权页一直报错怎么办

- 点 Try again
- 先输错账号
- 再点 Edit
- 改回正确账号

### 2. 管理页打不开怎么办

- 看看服务是不是已经退出
- 端口 8317 有没有变
- 你是不是把服务绑定在了别的地址上

不想自己查的话，直接让 Codex 帮你重启并检查。

---

有用就关注一下。

不定期分享 AI 工具的实际用法，不讲概念，只讲能上手的。
