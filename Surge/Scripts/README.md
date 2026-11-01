# Surge 脚本与模块（Scripts/）

存放 Surge 脚本和模块，**每个脚本/模块一个子文件夹**（含 `.js` 脚本 + `.sgmodule` 模块），自托管引用。

## 目录说明

| 子文件夹 | 文件 | 类型 | 用途 |
|---|---|---|---|
| `MemoryTraffic/` | `MemoryTraffic.js` | generic 脚本 | 内存和流量实时监控面板（面板数据拉取） |
| `MemoryTraffic/` | `MemoryTraffic.sgmodule` | 模块 | 「内存和流量实时监控」模块定义（含 [Panel]/[Script]，供 Surge 模块功能导入） |
| `Meituan/` | `MT.js` | http-response 脚本 | 美团 App 页面优化（去广告/精简 tab） |
| `Meituan/` | `Meituan.sgmodule` | 模块 | 「美团App 12.67.403」模块定义（8 条 MT-1~MT-8 规则） |

## 引用方式

脚本由配置 `[Script]` 段的 `script-path` 以 raw URL 引用：

```
https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Surge/Scripts/<子文件夹>/<文件名>
```

模块由 Surge App「模块」功能以 URL 导入：

```
https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Surge/Scripts/Meituan/Meituan.sgmodule
```

## 说明

- **MemoryTraffic**：原版 mickeu 模块，已适配本机 HTTP API（`https` + `api_key=xiaoMan1997`）。脚本走配置内联（非模块），模块文件为备用/参考。
- **Meituan**：原版 ZenmoFeiShi/Qx 美团模块，脚本已搬运自托管。需在 Surge App 模块设置替换为上述 URL。
- 更新日期：2026-11-01
