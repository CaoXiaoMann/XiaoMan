# XiaoMan

个人自动化脚本仓库（Quantumult X / Egern 通用）

主要收集日常签到、自动任务、生活类脚本。

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

**Quantumult X 配置：**
```conf
[task_local]
20 8,20 * * * https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Scripts/WeTalk.js, tag=WeTalk签到, enabled=true

[rewrite_local]
^https:\/\/api\.wetalkapp\.com\/app\/queryBalanceAndBonus url script-request-header WeTalk.js

[MITM]
hostname = api.wetalkapp.com
```

**Egern 配置：**
```
# 在 Scripts 标签页添加脚本，URL 填入：
# https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Scripts/WeTalk.js
# Script 类型选择 'cron'，设置 cron 表达式：20 8,20 * * *
```

**功能特性：**
- 🎯 多账号全自动适配
- 🎬 自动签到 + 看视频领奖励
- 🌐 随机 UA + 随机伪装 IP
- 🔄 网络异常自动重试（3 次）
- 📊 PingMe 风格汇总通知

### PingMe 签到 + 视频奖励
自动化签到、看视频赚 Coins，支持多账号、随机 IP 伪装、断线自动重试、每日统计。

**Quantumult X 配置：**
```conf
[task_local]
20 8,20 * * * https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Scripts/PingMe.js, tag=PingMe签到, enabled=true

[rewrite_local]
^https:\/\/api\.pingmeapp\.net\/app\/queryBalanceAndBonus url script-request-header PingMe.js

[MITM]
hostname = api.pingmeapp.net
```

**Egern 配置：**
```
# 在 Scripts 标签页添加脚本，URL 填入：
# https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Scripts/PingMe.js
# Script 类型选择 'cron'，设置 cron 表达式：20 8,20 * * *
```

**功能特性：**
- 🎯 多账号全自动适配
- 🎬 自动签到 + 看视频领奖励
- 🌐 随机伪装 IP
- 🔄 网络异常自动重试
- 📊 PingMe 风格汇总通知



### StudyThailand（RevenueCat 破解）
破解 RevenueCat 内购验证，Loon 插件格式，兼容 Egern / Surge / Loon。

**插件链接：**
```
https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Scripts/StudyThailand.plugin
```

**Egern 导入方法：**
在 Scripts 标签页 → 右上角 + → 选择 "Import from URL" → 粘贴插件链接

**Loon 导入方法：**
在插件标签页 → 点击 + → 粘贴插件链接

> 来源：[Yu9191/Reven.sgmodule](https://gist.githubusercontent.com/Yu9191/45d3784ba323e9d2eac25aa3e0acf3e6/raw/Reven.sgmodule)

### 今日油价
查询全国各省市今日油价（默认陕西，可自行修改地区拼因）。

**Quantumult X 配置：**
```conf
[task_local]
0 8 * * * https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Scripts/今日油价.js, tag=今日油价, enabled=true
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