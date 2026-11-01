# Surge 脚本（Script/）

存放 Surge 脚本，每个脚本一个子目录（对齐 `../Rule/` 的子目录风格）：

| 子目录 | 脚本 | 用途 |
|---|---|---|
| `MemoryTraffic/` | `MemoryTraffic.js` | 内存和流量实时监控面板（自托管，已适配 https HTTP API + api_key） |
| `Meituan/` | `MT.js` | 美团 App 页面优化（原 ZenmoFeiShi/Qx 搬运） |

- 脚本由配置 `[Script]` 段的 `script-path` 以 raw URL 引用：
  `https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Surge/Script/<名>/<名>.js`
- 更新日期：2026-11-01
