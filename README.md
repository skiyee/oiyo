<img alt="logo" src="./.github/assets/og-image.png" width="100%"><br>

# Oiyo Unibest

<p>由 <a href="https://oiyo.js.org" target="_blank">oiyo</a> 框架赋能的新一代 <a href="https://unibest.tech" target="_blank">unibest</a> 模板，是一个可商业使用的生产级项目模板</p>

## 🍊 介绍

**Oiyo Unibest** 融合了 [oiyo](https://oiyo.js.org) 元框架与 [unibest](https://unibest.tech) 的最佳实践。开箱即用地提供了多端适配、鉴权体系、国际化、自定义TabBar等常见基础设施，帮助你快速启动全端项目。

## ✨ 特性

- **鉴权体系** — 支持单 Token / 双 Token（Access + Refresh）两种模式，自动 401 拦截与静默刷新，请求队列自动重放
- **HTTP 请求层** — 统一错误处理（网络异常、业务码、HTTP 状态码），per-request 级错误提示控制
- **自定义 TabBar** — 支持凸起按钮、角色过滤、角标显示、图标类型切换
- **国际化** — 内置中文简体与英文，基于 vue-i18n，支持模板插值
- **状态管理** — Pinia + 持久化插件
- **布局系统** — 默认布局与 TabBar 布局，页面级灵活切换
- **自动分包** — 原生 subPackages 支持，优化小程序包体积
- **暗色主题** — 全局暗色设计，沉浸式深色背景
- **TypeScript** — 全量类型定义，开发体验友好
- **组合式 API** — 内置 useRequest、useScroll、useUpload 等常用 composables
- **原子化样式** — 基于 UnoCSS，零运行时，按需生成
- **跨平台** — 一套代码同时输出 H5、Android、iOS、微信小程序、支付宝小程序、百度小程序、头条小程序

## 🚀 使用

通过下面的命令可以快速生成项目模板：

```bash
# 如果没有 pnpm 可以通过 npm i -g pnpm 安装。
pnpm create oiyo --template=unibest
```

创建完成后，进入项目，安装依赖：

```bash
# 在 VS Code 中打开项目文件夹：
code <project-name>

# 安装依赖：
pnpm install
```

依赖安装完毕，运行项目：

```bash
# 开发：通过交互方式对平台进行选择
pnpm dev
# 构建：通过交互方式对平台进行选择
# pnpm build

# 或者通过指定模式启动
# pnpm dev h5 test   # 开发 - h5 - 测试环境
# pnpm dev h5 prod   # 开发 - h5 - 生产环境
# pnpm build h5 test   # 构建 - h5 - 测试环境
# pnpm build h5 prod   # 构建 - h5 - 生产环境
```

## 📖 文档

根据需要进入对应「官方站点」进行阅读：

- oiyo: [oiyo.js.org](https://oiyo.js.org/)
- unibest: [unibest.tech](https://unibest.tech)

## 💞 社群

我们提供社群，让每一个开发者都能参与最直接的交流：

- QQ群：[246107301](https://qm.qq.com/q/iVPctWtKQS)

  <img src="./.github/assets/qq-qrcode-1.png" alt="Qiyo 交流群" width="280">

## 💝 关于

作者: **sky [skiyee]** - 切图仔、全干攻城猫、轮子砖家

| 平台      | 链接                                             |
| --------- | ------------------------------------------------ |
| 🌐 官网   | [oiyo.js.org](https://oiyo.js.org/)              |
| 🐧 QQ     | [319619193](https://oiyo.js.org/)                |
| 🗻 掘金   | [skiyee](https://juejin.cn/user/300614247782265) |
| 💬 公众号 | 微信搜「天空言码」或扫码关注 ↓                   |

<img src="./.github/assets/wechat-qrcode-1.png" alt="公众号二维码" width="360">

## 💖 赞赏

<p align="center">
  <a href="https://github.com/skiyee/sponsors">
    <img alt="sponsors" src="https://cdn.jsdelivr.net/gh/skiyee/sponsors@main/oiyo-sponsors.svg"/>
  </a>
</p>

## ⚖️ 许可

- [Oiyo License](https://github.com/skiyee/oiyo/blob/main/LICENSE)
- [Unibest License](https://github.com/feige996/unibest/blob/main/LICENSE)
