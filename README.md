# XiaoMan

个人自动化脚本仓库（Quantumult X / Egern 通用）

主要收集日常签到、自动任务、生活类脚本。

📢 **TG频道：** [小满亡命天涯](https://t.me/XiaoManWangMingTianYa)

## 📁 目录结构

```
XiaoMan/
├── Egern/              # Egern 2.1 配置
│   └── XiaoManEgern2.1.yaml
├── Rule/
│   ├── AppleIntelligence/  # Apple Intelligence/Siri 分流规则
│   ├── AppleRelay/   # Apple iCloud Private Relay/掩码 代理规则
│   └── QianJi/        # 钱迹账单直连规则
├── Scripts/            # 脚本目录（每个脚本独立文件夹）
│   ├── WeTalk/         # WeTalk 签到+视频
│   ├── PingMe/         # PingMe 签到+视频
│   ├── Network-Pro/   # 网络诊断雷达（增强版）
│   ├── Spotify/       # Spotify Premium 解锁
│   ├── YouTube/       # YouTube 双语字幕(源语言纠正补丁)
│   ├── tingdiandian/  # 听点点会员解锁
│   └── JinRiYouJia/   # 全国油价查询
├── docs/
│   └── images/         # 文档图片
└── README.md
```

## 🛠 脚本列表

| 脚本 | 说明 | 说明文档 |
|------|------|---------|
| [QianJi](Rule/QianJi/README.md) | 钱迹/账单应用直连规则 | [说明文档](Rule/QianJi/README.md) |
| [AppleRelay](Rule/AppleRelay/README.md) | Apple iCloud Private Relay/掩码 代理规则 | [说明文档](Rule/AppleRelay/README.md) |
| [AppleIntelligence](Rule/AppleIntelligence/README.md) | Apple Intelligence/Siri 分流规则 | [说明文档](Rule/AppleIntelligence/README.md) |
| [YouTube](Scripts/YouTube/README.md) | YouTube 双语字幕 + 源语言纠正补丁 | [说明文档](Scripts/YouTube/README.md) |
| [Egern配置](Egern/XiaoManEgern2.1.yaml) | Egern 2.1 完整注释配置 | [说明](Egern/README.md) |
| [WeTalk](Scripts/WeTalk/WeTalk.js) | WeTalk 签到 + 视频奖励 | [说明](Scripts/WeTalk/README.md) |
| [PingMe](Scripts/PingMe/PingMe.js) | PingMe 签到 + 视频奖励 | [说明](Scripts/PingMe/README.md) |
| [Network-Pro](Scripts/Network-Pro/Network-Pro.js) | 网络诊断雷达（增强版） | [说明](Scripts/Network-Pro/README.md) |
| [Spotify](Scripts/Spotify/spotify.plugin) | Spotify Premium 解锁 | [说明](Scripts/Spotify/README.md) |
| [JinRiYouJia](Scripts/JinRiYouJia/JinRiYouJia.js) | 全国各省市油价查询 | [说明](Scripts/JinRiYouJia/README.md) |

**脚本直链：**
```
# 网络诊断雷达（增强版）
https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Scripts/Network-Pro/Network-Pro.js
```

# 听点点会员解锁
https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Scripts/tingdiandian/TingDianDian.plugin
```

## 📌 使用说明

1. 进入对应脚本文件夹查看配置方法
2. 将配置添加到你的代理工具
3. 首次使用先打开对应 App 触发抓包，自动录入账号
4. 之后每天定时自动执行

## ⚠️ 免责声明

本仓库脚本仅用于个人学习研究，请勿用于商业用途。使用产生的任何问题与作者无关。

## 📢 更新日志

- 2026/06/26 - 新增 WeTalk 签到脚本，增强重试机制，PingMe 风格通知
- 2026/08/21 - 重构仓库结构
- 2026/09/20 - 新增 听点点(tingdiandian)会员解锁脚本（客户端 PRO 解锁），每个脚本独立文件夹并附说明

## 🌟 致谢

如果我的脚本对你有帮助，欢迎点个 ⭐ Star 支持一下！你的每一次点亮，都是我持续更新和维护的最大动力。

