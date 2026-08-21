# XiaoMan

个人自动化脚本仓库（Quantumult X / Egern 通用）

主要收集日常签到、自动任务、生活类脚本。

## 📁 目录结构

```
XiaoMan/
├── Scripts/            # 脚本目录（每个脚本独立文件夹）
│   ├── WeTalk/         # WeTalk 签到+视频
│   ├── PingMe/         # PingMe 签到+视频
│   └── 今日油价/        # 全国油价查询
├── docs/
│   └── images/         # 文档图片
└── README.md
```

## 🛠 脚本列表

| 脚本 | 说明 | 脚本文件 | 说明文档 |
|------|------|---------|---------|
| WeTalk | WeTalk 签到 + 视频奖励 | [WeTalk.js](Scripts/WeTalk/WeTalk.js) | [说明](Scripts/WeTalk/README.md) |
| PingMe | PingMe 签到 + 视频奖励 | [PingMe.js](Scripts/PingMe/PingMe.js) | [说明](Scripts/PingMe/README.md) |
| 今日油价 | 全国各省市油价查询 | [今日油价.js](Scripts/今日油价/今日油价.js) | [说明](Scripts/今日油价/README.md) |

## 📌 使用说明

1. 进入对应脚本文件夹查看配置方法
2. 将配置添加到你的代理工具
3. 首次使用先打开对应 App 触发抓包，自动录入账号
4. 之后每天定时自动执行

## ⚠️ 免责声明

本仓库脚本仅用于个人学习研究，请勿用于商业用途。使用产生的任何问题与作者无关。

## 📢 更新日志

- 2026/06/26 - 新增 WeTalk 签到脚本，增强重试机制，PingMe 风格通知
- 2026/08/21 - 重构仓库结构，每个脚本独立文件夹并附说明