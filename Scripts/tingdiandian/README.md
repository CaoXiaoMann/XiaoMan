# 听点点 (tingdiandian) 会员解锁

拦截 `GET https://api.tingdiandian.com/user/<id>` 响应，把免费账号的会员字段改写为「永久 PRO」并放宽客户端额度上限。

## 改写的字段

| 字段 | 原值 (free) | 改写后 |
|---|---|---|
| `isPro` | `false` | `true` |
| `entitlement` | `"free"` | `"pro"` |
| `isProPermanentMember` / `isBasicPermanentMember` / `showPermanentMember` | `false` | `true` |
| `permanentMemberCardVersion` | `0` | `1` |
| `isOneYearMember` / `isOneMonthMember` / `isBasicOneMonthMember` | `false` | `true` |
| `*MemberEndDate` | `null` | `2099-12-31T23:59:59.000Z` |
| `hasUsedNewUserOffer` | `false` | `true`（不再弹新用户试用引导） |
| `newUserOfferVariant` / `newUserOfferExpiresAt` | `"7d"` / 有值 | `null` |
| `timeLimit` | `900` (15min) | `9999999` |
| `tokenLimit` / `pointsLimit` / `pointsMonthlyGrant` / `pointsRolloverAvailable` | 各自小值 | `9999999` |

**不改** `pointsUsed` / `tokenUsed` / `timeUsed` —— 这些是服务端真实已用量，篡改会与服务端记账冲突；limit 拉高后「剩余」自然显示为极大值。

## ⚠️ 效果边界（务必知悉）

本脚本**只绕过客户端门控**：隐藏升级提示、解锁本地时长门槛（可提交更长的转写视频）、放宽显示额度。

听点点的核心付费价值——**AI 转写的点点额度**——是**服务端真实记账**的（`pointsUsed`/`tokenUsed` 在服务端扣减，转写时服务端按 60 点/小时计费并校验余额）。客户端改成 PRO **骗不了服务端**：余额真实耗尽时，转写请求仍会被服务端拒绝。内容库本身对免费用户已全开放（`/content-source` 返回完整 video/audio/三语翻译）。

## 安装

### Loon
插件订阅链接（上传到仓库后）：
```
https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Scripts/tingdiandian/TingDianDian.plugin
```
或本地：把 `unlock.js` 放进 Loon 脚本目录，改用 `.plugin` 里注释掉的那行本地 `script-path`。

### Stash / Surge
把 `tingdiandian.stash.conf` 的 `[Script]` 与 `[MITM]` 段合并进你的配置。

### Egern
把 `tingdiandian.egern.yaml` 的 `mitm` 与 `scripts` 合并进你的 Egern 配置。

## 文件
- `unlock.js` — 响应脚本本体（已通过 14/14 本地单测，含 `patchBody` 字符串往返、used 值不变性校验）
- `TingDianDian.plugin` — Loon 插件
- `tingdiandian.stash.conf` — Stash/Surge 片段
- `tingdiandian.egern.yaml` — Egern 片段
