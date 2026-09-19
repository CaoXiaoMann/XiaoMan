# DualSubs: YouTube 双语字幕 + 源语言纠正

DualSubs 的 YouTube 增强及双语字幕（歌词）脚本，附带**源语言纠正补丁**。
Loon 插件 / Surge 配置两种格式。

## 解决的问题

官方脚本对泰语、日语、韩语、越南语等**非英语视频**，显示出来是「英语 + 中文」。

原因是 `response.bundle.js` 里有这段逻辑：YouTube 没返回默认字幕索引时，
**无条件取字幕轨道列表的第 1 条**。而 YouTube 经常把英文自动生成字幕排在第 1 条，
所以只要第 1 条是英文就中招 —— 跟视频本身是什么语言无关。

## 补丁做了什么

- 按 **音频轨道语言**（视频真实说话语言）→ **人工上传字幕轨**（非 asr）→ 用户指定语言，
  依次解析出视频的真实源语言，而不是盲目取第 1 条
- 解析结果按视频 ID 缓存，在请求字幕时把 `lang=` 参数覆盖成真实源语言
  （只改默认索引客户端有时不理会，改请求参数才一定生效）
- 新增 `SourceLang` 参数，可手动指定源语言

## 插件链接

```
https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Scripts/YouTube/DualSubs.YouTube.plugin
```

## 导入

- **Loon / Stash / Egern**：插件标签页 → + → 粘贴插件链接
- 导入后**重启 App**，等待脚本生效

## 参数说明

| 参数 | 值 | 说明 |
|------|----|------|
| SourceLang | `AUTO` | 自动识别：保留 YouTube 自己的索引，否则优先音频轨语言，其次人工字幕轨 |
| SourceLang | `NONEN` | 第 1 条是英文但存在非英文字幕轨时，改用非英文轨 |
| SourceLang | `ja` / `th` / `ko` / `zh-Hans` | 强制指定语言，支持区域码前缀匹配（`zh` 可匹配 `zh-Hans`） |

**建议：非英语视频直接用 `NONEN` 或填具体语言代码，最准确。**

⚠️ `AUTO` 的局限：如果视频的所有字幕轨都是自动生成（asr），且响应里没有音频轨语言信息，
AUTO 无法区分，仍会取第 1 条。这种场景请改用 `NONEN` 或具体语言代码。

其余参数（Type / Types / AutoCC / Position / Vendor / ShowOnly / LogLevel）
与官方 DualSubs 一致，可用 BoxJs 配置面板调节：
http://boxjs.com/#/app/DualSubs.YouTube

## 验证是否生效

把 `LogLevel` 设为 `INFO`，播放一个非英语视频，日志里应看到：

```
🎯 Set SourceLang  mode=NONEN  idx=1  tracks=0:en*,1:th*
🎯 SourceLang 覆盖  请求 lang: en  → th
```

看 `tracks=` 那一串：如果里面**根本没有**该语言的轨道（只有 `en*`），
说明 YouTube 没有为该视频生成对应语言的自动字幕，这种情况下任何脚本都无法补救。

## 脚本来源 / 生成方式

仓库里 3 个 `.js` 是**脚本本体**，插件（`.plugin`）是**入口**：

| 文件 | 作用 | 生成方式 |
|------|------|---------|
| `DualSubs.YouTube.plugin` | Loon/Stash 插件入口，写死 `script-path` 指向下面两个 JS | 我基于官方 `DualSubs/YouTube` v1.5.11 的 `.plugin` 模板生成，加了 `SourceLang` 参数 |
| `request.bundle.js` | 拦截 YouTube `timedtext` 请求，把 `lang=` 覆盖成真实源语言 | 在官方 `request.bundle.js` 基础上插入一段 IIFE 补丁 |
| `response.bundle.js` | 解析视频真实语言（优先音频轨 → 人工轨 → 第 0 条），改 `defaultCaptionTrackIndex` | 在官方 `response.bundle.js` 基础上替换「无条件取第 0 条」为完整解析逻辑 |

另外两个 `script-path`（合成器 / 翻译器）**没改动**，仍指向 `DualSubs/Universal` 官方地址，不需要放进仓库。

## 注意

- **Loon/Stash 需要信任 MITM 证书**：本插件要解密 `www.youtube.com` / `m.youtube.com` / `youtubei.googleapis.com` / `*.googlevideo.com` 的流量才能改字幕。如果你之前为去广告把证书删了（看到仓库里 Egern 配置有「删除证书」的提交），导入这个插件后记得在 Loon/Stash 里重新开启 MITM 并信任这几个域名，否则插件不生效
- 基于 DualSubs **v1.5.11**（2024-12-11，上游至今未更新）；上游后续更新时需要重新应用补丁
- 语法通过 `node --check` 校验，解析逻辑 21 项单元测试通过
- 未能实测 YouTube 真实字幕轨响应（innertube 接口在本环境不可用），实际效果请以端上日志为准

## 来源

- 原始脚本：[DualSubs/YouTube](https://github.com/DualSubs/YouTube) by VirgilClyne
- 官方文档：https://DualSubs.github.io/guide/youtube
- 本补丁：源语言纠正（fix1）
