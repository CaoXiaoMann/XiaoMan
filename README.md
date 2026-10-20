# XiaoMan

个人自动化脚本仓库（Egern / Quantumult X）

主要收集日常签到、自动任务、生活类脚本，以及 Egern 完整配置。

📢 **TG频道：** [小满亡命天涯](https://t.me/XiaoManWangMingTianYa)

## 📁 目录结构

```
XiaoMan/
├── Egern/              # Egern 3.0 完整配置（含小白友好注释）
│   ├── README.md                    # 使用教程 + 结构说明 + FAQ
│   └── XiaoManEgern3.0.yaml         # 3.0 配置主文件
├── Scripts/            # 脚本目录（每个脚本独立文件夹）
│   ├── WeTalk/         # WeTalk 签到 + 视频奖励
│   ├── PingMe/         # PingMe 签到 + 视频奖励
│   ├── Network-Pro/    # 网络诊断雷达（增强版）
│   ├── Spotify/        # Spotify Premium 解锁
│   ├── JinRiYouJia/    # 全国油价查询
│   └── CheLaiLe/       # 车来了公交实时查询
├── docs/
│   └── images/         # 文档图片
├── LICENSE
└── README.md
```

## 🛠 脚本 & 配置列表

| 名称 | 说明 | 说明文档 |
|------|------|---------|
| [Egern 3.0 配置](Egern/XiaoManEgern3.0.yaml) | Egern 完整配置（无内置证书，全文中文注释） | [说明](Egern/README.md) |
| [WeTalk](Scripts/WeTalk/WeTalk.js) | WeTalk 签到 + 视频奖励 | [说明](Scripts/WeTalk/README.md) |
| [PingMe](Scripts/PingMe/PingMe.js) | PingMe 签到 + 视频奖励 | [说明](Scripts/PingMe/README.md) |
| [Network-Pro](Scripts/Network-Pro/Network-Pro.js) | 网络诊断雷达（增强版） | [说明](Scripts/Network-Pro/README.md) |
| [Spotify](Scripts/Spotify/spotify.plugin) | Spotify Premium 解锁 | [说明](Scripts/Spotify/README.md) |
| [JinRiYouJia](Scripts/JinRiYouJia/JinRiYouJia.js) | 全国各省市油价查询 | [说明](Scripts/JinRiYouJia/README.md) |
| [CheLaiLe](Scripts/CheLaiLe/CheLaiLe.sgmodule) | 车来了公交实时查询 | [说明](Scripts/CheLaiLe/README.md) |

**常用脚本直链：**
```
# Egern 3.0 配置
https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Egern/XiaoManEgern3.0.yaml

# 网络诊断雷达（增强版）
https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Scripts/Network-Pro/Network-Pro.js

# 车来了公交查询
https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Scripts/CheLaiLe/CheLaiLe.sgmodule
```

## 📌 使用说明

1. 进入对应脚本文件夹查看配置方法
2. 将配置添加到你的代理工具
3. 首次使用先打开对应 App 触发抓包，自动录入账号
4. 之后每天定时自动执行

**Egern 3.0 配置特别提醒：** 使用前必须
1. 添加机场订阅（不加 = 地区策略组空 = 上不了网）
2. 自行生成并安装 CA 证书（不加 = 模块功能全部失效）

详见 [Egern/README.md](Egern/README.md)。

## ⚠️ 免责声明

本仓库脚本仅用于个人学习研究，请勿用于商业用途。使用产生的任何问题与作者无关。

## 📢 更新日志

- **2026/10/20** - **车来了去广告更新**：按 7.6.6 实机抓包（1195 条请求）补全 25 条 DOMAIN 规则与 1 条 URL Rewrite，新增拦截穿山甲模板/日志、腾讯广点通 SDK、百度广告视频素材、滴滴归因、快手 KCG、淘宝 DSP、易点天下 SSP 及车来了自有埋点；规则模拟匹配拦截 1005 条，公交业务接口与到站推送全部保留
- **2026/10/17** - **Egern 3.0 版本发布**：基于作者 3.0 内容，移除内置 CA 证书，全文补充小白友好的中文注释与排查指南；含 25 个功能模块、7 个地区策略组、22 条 DNS 分流规则
- 2026/10/17 - 删除 Rule/ 目录（AppleIntelligence / AppleRelay / QianJi 规则）
- 2026/08/21 - 重构仓库结构
- 2026/06/26 - 新增 WeTalk 签到脚本，增强重试机制，PingMe 风格通知

## 🌟 致谢

如果我的脚本对你有帮助，欢迎点个 ⭐ Star 支持一下！你的每一次点亮，都是我持续更新和维护的最大动力。
