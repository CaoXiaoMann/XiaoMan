# XiaoMan

个人自动化脚本仓库（Surge / Quantumult X / Loon 通用）

主要收集日常签到、自动任务、生活类脚本，适配主流 iOS 代理工具。

## 📁 目录结构

```
XiaoMan/
├── Scripts/          # 脚本主目录
├── docs/
│   └── images/       # 文档图片
└── README.md
```

## 🛠 脚本列表

### WeTalk 签到 + 视频奖励
自动化签到、看视频赚 Coins，支持多账号、随机 UA / IP 伪装、断线自动重试。

**定时任务配置：**
```
[task_local]
20 8,20 * * * https://raw.githubusercontent.com/caoxiaoman999/XiaoMan/main/Scripts/WeTalk.js, tag=WeTalk签到, enabled=true
```

**重写抓包：**
```
[rewrite_local]
^https:\/\/api\.wetalkapp\.com\/app\/queryBalanceAndBonus url script-request-header https://raw.githubusercontent.com/caoxiaoman999/XiaoMan/main/Scripts/WeTalk.js

[MITM]
hostname = api.wetalkapp.com
```

**功能特性：**
- 🎯 多账号全自动适配
- 🎬 自动签到 + 看视频领奖励
- 🌐 随机 UA + 随机伪装 IP
- 🔄 网络异常自动重试（3 次）
- 📊 PingMe 风格汇总通知

### PingMe 抓包配置
PingMe 应用 Cookie 获取配置。

**重写抓包：**
```
[rewrite_local]
^https:\/\/api\.pingmeapp\.net\/app\/queryBalanceAndBonus url script-request-header https://raw.githubusercontent.com/caoxiaoman999/XiaoMan/main/Scripts/PingMe.conf

[MITM]
hostname = api.pingmeapp.net
```

### 今日油价
查询全国各省市今日油价（默认陕西，可自行修改地区拼因）。

**定时任务配置：**
```
[task_local]
0 8 * * * https://raw.githubusercontent.com/caoxiaoman999/XiaoMan/main/Scripts/今日油价.js, tag=今日油价, enabled=true
```

> 来源：[RS0485/network-rules](https://raw.githubusercontent.com/RS0485/network-rules/main/scripts/gas-price.js)

## 📌 使用说明

1. 将脚本按上述配置添加到你的代理工具
2. 首次使用先打开对应 App 触发抓包，自动录入账号
3. 之后每天定时自动执行

## ⚠️ 免责声明

本仓库脚本仅用于个人学习研究，请勿用于商业用途。使用产生的任何问题与作者无关。

## 📢 更新日志

- 2026/06/26 - 新增 WeTalk 签到脚本，增强重试机制，PingMe 风格通知