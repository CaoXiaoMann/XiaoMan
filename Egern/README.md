# Egern 配置（小满的松鼠🐿️ 2.0）

小满的 Egern 2.0 配置，带详细中文注释，适合学习参考。

## 配置文件

[XiaoManEgern2.0.yaml](XiaoManEgern2.0.yaml) — 完整注释版配置

## 配置链接

```
https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Egern/XiaoManEgern2.0.yaml
```

## 使用方法

1. 打开 **Egern** → 配置（Configuration）
2. 导入 `XiaoManEgern2.0.yaml`（从 URL 导入或本地导入）
3. 确保已安装 CA 证书并信任（MITM 需要）
4. 添加你的机场订阅 —— **必须添加**！

### ⚠️ 重要：必须先添加机场订阅

配置里的 **港/台/日/韩/美 策略组** 是 `smart` 类型，通过关键词过滤器**从你的机场订阅节点中自动筛选**，所以：

- ❌ 不添加订阅 → 策略组为空，流量无法分发
- ✅ 添加订阅后 → 各策略组自动匹配对应地区节点（如香港节点组自动筛出含"香港/HK/🇭🇰"的节点）

**添加订阅方法：** Egern → 订阅（Subscription）→ 添加你的机场订阅链接 → 更新订阅
**订阅更新后：** PROXY 策略组中就能看到 港/台/日/韩/美 各分组，手动选择即可

## 配置包含

- **基础设置**：IPv4 代理端口、DNS 劫持、隧道模式
- **DNS**：国内 DoH 加速（阿里/腾讯）
- **策略组**：PROXY、Telegram、ChatGPT、Emby、各地区节点组（自动筛选订阅节点）
- **分流规则**：广告拦截（REJECT-DROP）、国内直连、国际应用指定策略组
- **URL 重写**：google.cn → google.com 跳转
- **脚本/小组件**：网络诊断雷达（需配合仓库 Scripts/NetWork/Network-Pro.js）
- **模块**：去广告（豆瓣/知乎/拼多多/京东/12306/B站等）、Spotify 会员、YouTube 隐藏 Shorts、Sub-Store、BoxJs 等

## 注意事项

- 配置中 **MITM 证书已删除**，导入后需按 Egern 提示重新生成并信任 CA 证书
- 节点策略组（香港/台湾/日本/新加坡/韩国/美国）通过 smart 过滤器从订阅自动筛选，需先添加机场订阅
- 每天定时自动更新各规则集

## 来源

- TG频道: https://t.me/BYouXianLiaoShe
- 最后更新时间: 2026-8-22 10:42