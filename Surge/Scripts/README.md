# Surge 脚本与模块（Scripts/）

存放 Surge 脚本和模块，**每个脚本/模块一个子文件夹**（含 `.js` 脚本 + `.sgmodule` 模块），自托管引用。

## 目录说明

| 子文件夹 | 脚本/模块 | 类型 | 用途 |
|---|---|---|---|
| `BiliBili/` | `BiliBili.sgmodule` | 模块 | 哔哩哔哩去广告：过滤广告、移除青少年模式弹窗和充值引导 |
| `CheLaiLe/` | `CheLaiLe.sgmodule` | 模块 | 车来了 7.6.7 去广告（不拦截公交业务接口） |
| `Goofish/` | `Goofish.sgmodule` `goofish.js` `qgg-ops.js` | 模块+脚本 | 闲鱼去广告 |
| `HeiLiao/` | `HeiLiao.sgmodule` `web-v2.js` `app.js` | 模块+脚本 | 黑料网去广告：去除网页广告/横幅/浮层（`web-v2.js` 用 CSS+JS 双保险持续删除 JS 动态渲染的「添加到主屏幕」横幅）|
| `Meituan/` | `Meituan.sgmodule` `MT.js` | 模块+脚本 | 美团 App 去广告/精简（46 拦截规则 + 8 脚本）|
| `MemoryTraffic/` | `MemoryTraffic.sgmodule` `MemoryTraffic.js` | 模块+脚本 | 内存和流量实时监控面板（本机流量 + Tailscale 入站设备累计流量，多设备独立统计）|
| `Network-Pro/` | `Network-Pro.sgmodule` `Network-Pro-v3.js` | 模块+脚本 | 网络诊断雷达：本地网络 + 当前代理（出口 IP/位置/ISP/纯净度/延迟/NAT/DNS）|
| `Pinduoduo/` | `Pinduoduo.sgmodule` | 模块 | 拼多多去广告：移除开屏广告、底部多余页签、顶部频道推广、顶部图标，保留首页推荐商品 |
| `Spotify-Ads/` | `spotify.sgmodule` | 模块 | Spotify 去广告（转自 devchristian1337/loon-plugins）|
| `WeatherKit/` | `WeatherKit.sgmodule` `response.bundle.js` | 模块+脚本 | iRingo WeatherKit 天气增强：解锁全部天气功能、替换空气质量、添加降水数据（adapted from iRingo v3.0.9）|

## 引用方式

**脚本**由配置 `[Script]` 段的 `script-path` 以 raw URL 引用：

```
https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Surge/Scripts/<子文件夹>/<文件名>
```

**模块**由 Surge App「模块」功能以 URL 导入（一键安装）：

```
https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Surge/Scripts/<子文件夹>/<模块名>.sgmodule
```

## 注意事项

- **模块域名匹配要及时更新**：主站域名会变（如黑料网 `18hlw.com` → `heiliao.com`），模块 `[MITM]` hostname 和脚本 pattern 需同步更新，否则脚本不生效。
- **Surge 脚本缓存**：`script-path` 指向的脚本有缓存，改脚本内容但文件名不变可能不生效，**换文件名**（如 `web.js` → `web-v2.js`）可强制刷新。
- **JS 动态渲染的广告**：纯 CSS `display:none` 对 JS 动态创建的元素无效，需 CSS + JS 双保险（`setInterval` 持续删除 + `MutationObserver` 监听新增节点）。
- 更新日期：2026-11-05
