<p align="center">
  <img alt="logo" src="./.github/assets/logo.png" width="160">
</p>
<h1 align="center">Oiyo Starter</h1>

<p align="center">
  <strong>由 <a href="https://oiyo.js.org">Oiyo</a> 赋能的 Wot Stater 快速启动模板</strong>
</p>

<p align="center">
  <a href="https://oiyo.js.org/"><img src="https://img.shields.io/badge/Framework-Oiyo-4F46E5?style=flat-square" alt="Oiyo"></a>
  <a href="https://wot-ui.cn/"><img src="https://img.shields.io/badge/UI-Wot_UI-1C64FD?style=flat-square" alt="Wot UI"></a>
  <a href="https://oiyo.js.org/"><img src="https://img.shields.io/badge/Docs-oiyo.js.org-D47F24?style=flat-square" alt="Docs"></a>
  <a href="https://pinia.vuejs.org/"><img src="https://img.shields.io/badge/State-Pinia-FFD859?style=flat-square" alt="Pinia"></a>
  <a href="https://echarts.apache.org/"><img src="https://img.shields.io/badge/Charts-Uni_ECharts-299764?style=flat-square" alt="ECharts"></a>
</p>

<p align="center">
  <a href="https://oiyo.js.org/">📖 在线文档</a>
  ·
  <a href="#快速开始">🚀 快速开始</a>
  ·
  <a href="#项目结构">🔑 技术栈</a>
</p>

---

## 简介

**Oiyo Starter** 是由 [Oiyo](https://oiyo.js.org) 框架赋能 Wot Starter 变体的快速启动模板，面向 UniApp 多端开发场景。

它把页面元信息、布局、自动导入和工程约定整合在一起，让你从第一行业务代码开始，而不是从脚手架配置开始。

| 能力       | 说明                                                    |
|------------|---------------------------------------------------------|
| App.vue    | 应用级组件编写 `<template>` 以及 管理应用级共享状态     |
| 约定式页面 | 页面内 `definePageMeta()`，自动生成路由与 `pages.json`  |
| 布局系统   | `layouts/` + `layout` 元信息，TabBar / 默认布局开箱即用 |
| 自动导入   | 组件、API、Store、工具函数按约定扫描，少写 import       |
| UI 与样式  | Wot UI 2.x + UniUnoCSS 原子化样式                       |
| 状态与图表 | Pinia 持久化、ECharts / UniEcharts 示例页               |
| AI 友好    | 内置 Skills，便于 Agent 理解项目约定                    |

## 技术栈

- **框架**：Oiyo · UniApp · Vue 3 · TypeScript · Vite
- **UI**：Wot UI
- **请求**：OiyoHttp
- **路由**：OiyoRouter · @wot-ui/router 
- **样式**：UniUnoCSS · SASS
- **状态**：Pinia · PiniaPersist
- **图表**：ECharts · UniEcharts

## 快速开始

### 1. 环境要求

- Node.js 18+
- 包管理器推荐 pnpm < 11

### 2. 创建项目

```bash
pnpm create oiyo <project-name> --template wot-starter
```

### 3. 安装依赖

```bash
pnpm install
```

安装完成后会自动执行 `oiyo prepare`，生成类型与路由元数据。

### 4. 开发/构建

```bash
# 默认开发
pnpm dev

# 默认构建
pnpm build

# H5 分环境构建
pnpm build:h5:development
pnpm build:h5:staging
pnpm build:h5:production
```

按终端提示选择目标平台（H5 / 微信小程序等）。

## 社群

我们提供 QQ群 让每一个开发者都能参与最直接的交流

<img src="./.github/assets/qq-qrcode-1.png" alt="Qiyo 交流群" style="width: 280px; height: auto;">

## 作者

**sky [Skiyee]** - 切图仔、全干攻城猫、轮子砖家

| 平台      | 链接                                             |
|-----------|--------------------------------------------------|
| 🌐 官网   | [oiyo.js.org](https://oiyo.js.org/)              |
| 🐧 QQ     | [319619193](https://oiyo.js.org/)                |
| 🗻 掘金   | [skiyee](https://juejin.cn/user/300614247782265) |
| 💬 公众号 | 微信搜「天空言码」或扫码关注 ↓                   |

<img src="./.github/assets/wechat-qrcode-1.png" alt="公众号二维码" width="360">

## 周边

| 项目                                                                 | 描述                                                |
|----------------------------------------------------------------------|-----------------------------------------------------|
| [oiyo](https://github.com/skiyee/oiyo)                               | 颠覆以往认知的 UniApp 增强型工程框架                |
| [wot-ui-intellisense](https://github.com/wot-ui/wot-ui-intellisense) | wot-ui vscode 代码提示插件                          |
| [@wot-ui/router](https://github.com/wot-ui/my-uni)                   | 一个基于 vue3 和 typescript 的轻量级 uni-app 路由库 |
| [uni-echarts](https://uni-echarts.xiaohe.ink/)                       | 适用于 uni-app 的 echarts 组件                      |

## 许可

- [oiyo license](https://github.com/skiyee/oiyo/blob/main/LICENSE)
- [wot license](https://github.com/wot-ui/wot-ui/blob/main/LICENSE)
- [uni-echarts license](https://github.com/xiaohe0601/uni-echarts/blob/dev/LICENSE)
