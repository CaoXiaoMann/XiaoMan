# XiaoMan

个人自动化配置仓库（**Egern / Surge**），主要收集去广告、签到、网络诊断、工具增强类模块与配置。

📢 **TG频道：** [小满亡命天涯](https://t.me/XiaoManWangMingTianYa)

## 📁 目录结构

```
XiaoMan/
├── Egern/                  # Egern 完整配置与脚本
│   ├── README.md           # 使用教程 + 结构说明 + FAQ
│   ├── XiaoManEgern3.0.yaml# 3.0 配置主文件（全文中文注释）
│   ├── Rule/               # 分流规则集（Egern 规则集合，MagicRule 生成）
│   │   └── <名称>/<名称>.yaml   # 20 个规则集（Facebook/YouTube/TikTok/China/Global…）
│   └── Scripts/            # Egern 脚本（每个独立文件夹）
│       ├── WeTalk/         # WeTalk 签到 + 视频奖励
│       ├── PingMe/         # PingMe 签到 + 视频奖励
│       ├── Network-Pro/    # 网络诊断雷达（Egern 版）
│       ├── Spotify/        # Spotify Premium 解锁
│       ├── JinRiYouJia/    # 全国油价查询
│       └── CheLaiLe/       # 车来了公交实时查询
├── Surge/                  # Surge 模块、规则集、脚本
│   ├── Module/             # 通用模块（广告平台拦截 / DNS 增强 / HTTPDNS 拦截）
│   │   ├── AdBlock.sgmodule
│   │   ├── Fries-DNS-Enhanced.sgmodule
│   │   └── HTTPDNS.sgmodule
│   ├── Rule/               # 分流规则集（Surge RULE-SET 格式，与 Egern/Rule 对齐）
│   │   └── <名称>/<名称>.list   # 25 个规则集（Apple/Google/YouTube/China/GlobalMedia…）
│   └── Scripts/            # Surge 脚本与模块（每个独立文件夹）
│       ├── BiliBili/       # 哔哩哔哩去广告
│       ├── CheLaiLe/       # 车来了去广告
│       ├── Goofish/        # 闲鱼去广告
│       ├── HeiLiao/        # 黑料网去广告（网页横幅/弹窗）
│       ├── HeiLiaoBuDaYang/# 黑料不打烊去广告（保护视频正文）
│       ├── Meituan/        # 美团 App 去广告/精简
│       ├── Network-Pro/    # 网络诊断雷达面板（Surge 版）
│       ├── PDD/            # 拼多多去广告（PDD 屏蔽买菜/百亿 + PDD2 保留）
│       ├── Panel/          # 面板集合（内存/流量/IP 纯净度）
│       ├── Spotify-Ads/    # Spotify 去广告
│       └── WeatherKit/     # iRingo WeatherKit 天气增强
├── LICENSE
└── README.md
```

## 🛠 常用模块直链

**Surge（模块从 URL 一键安装）：**

| 名称 | 链接 |
|------|------|
| 拼多多去广告（屏蔽买菜/百亿） | `Surge/Scripts/PDD/PDD.sgmodule` |
| 拼多多去广告（保留买菜/百亿） | `Surge/Scripts/PDD/PDD2.sgmodule` |
| 车来了去广告 | `Surge/Scripts/CheLaiLe/CheLaiLe.sgmodule` |
| 黑料网去广告 | `Surge/Scripts/HeiLiao/HeiLiao.sgmodule` |
| 美团去广告 | `Surge/Scripts/Meituan/Meituan.sgmodule` |
| 网络诊断雷达面板 | `Surge/Scripts/Network-Pro/Network-Pro.sgmodule` |

完整链接 = `https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/` + 上表路径。

**Egern：**

```
# 3.0 配置
https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Egern/XiaoManEgern3.0.yaml

# 网络诊断雷达（Egern 版）
https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Egern/Scripts/Network-Pro/Network-Pro.js
```

## 📌 使用说明

### Surge
1. 复制上表完整链接（或从 [Surge/Scripts/README.md](Surge/Scripts/README.md) 找到对应模块）
2. Surge → **模块** → 从 URL 安装，粘贴链接
3. 需开启 **HTTPS 解密（MITM）** 并信任证书（模块会自动追加 hostname）
4. 更新时在模块页点「更新模块」即可

### Egern
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

- **2026/11/15** - **PDD2 模块上线**：拼多多去广告保留版（Yi-r8 原版，保留多多买菜/百亿补贴入口），与 PDD 屏蔽版二选一；补屏蔽个人中心 200 元补贴横幅
- **2026/11/15** - **PDD 回退钱包隐藏**：撤销 `delpaths(["wallet"])`，多多钱包恢复显示
- **2026/11/14** - **车来了去广告更新**：新增阿里广告 IP 段屏蔽（`8.134.241.0/24` + 轮换 IP），去除首页 banner
- **2026/11/05** - **黑料网去广告适配**：主站域名 `18hlw.com` → `heiliao.com`，web-v7.js 用 CSS+JS 双保险去除 JS 动态渲染的「添加到主屏幕」横幅与广告弹窗
- **2026/11/01** - **Surge 模块接入**：拼多多/Spotify/Apple 天气 3 个模块接入 + 自托管；DNS 泄漏彻底修复；Surge 配置分离为 ProxyGroup/Rule/mitm 三个部分配置
- **2026/10/31** - **目录重组**：Rule/ 与 Scripts/ 移入 Egern/ 下；新增 TikTok/YouTube/Twitter 策略组，分流规则重排
- **2026/10/20** - **车来了去广告 7.6.7 复查**：定位横幅素材新域名与广点通上报子域，新增 5 条 DOMAIN 规则
- **2026/10/17** - **Egern 3.0 版本发布**：移除内置 CA 证书，全文补充小白友好中文注释；含 25 个功能模块、7 个地区策略组、22 条 DNS 分流规则

## 🌟 致谢

如果我的脚本对你有帮助，欢迎点个 ⭐ Star 支持一下！你的每一次点亮，都是我持续更新和维护的最大动力。
