# Apple iCloud Private Relay / 掩码(mask) 代理规则

把 Apple 的 iCloud Private Relay、mask 网关、定位服务等域名统一走 PROXY。

## 规则列表

`AppleRelay.list` — 17 条 DOMAIN / DOMAIN-SUFFIX → PROXY。

涵盖：
- **Private Relay 中继**：`apple-relay.apple.com` / `.cloudflare.com` / `.fastly-edge.com` / `.mask.apple-dns.net`、`cp4.cloudflare.com`
- **iCloud mask 网关**：`mask.icloud.com`、`mask-h2.icloud.com`、`gateway.icloud.com`、`mask.apple-dns.net`、`mask-api.fe.apple-dns.net`、`mask-t.apple-dns.net`、`mask-api.icloud.com`
- **Siri / 定位 / 静态资源**：`guzzoni.apple.com`、`smoot.apple.com`、`ls.apple.com`（含 `gspel-ssl.ls.apple.com`）、`apps.mzstatic.com`

> ⚠️ 原始规则里 `Is.apple.com` / `gspel-ssl.Is.apple.com` 的 `Is`（大写 I）实际是 `ls`（小写 L，Location Services），已修正——`Is.apple.com` 不是真实域名，不改规则无效。

## 引用

**raw 直链：**
```
https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/AppleRelay/AppleRelay.list
```

### Egern（远程订阅）
```yaml
rule-providers:
  AppleRelay:
    type: remote
    url: https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/AppleRelay/AppleRelay.list
    interval: 86400
    format: list
    behavior: classical
```

### Loon
```
[Rule]
RULE-SET,https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/AppleRelay/AppleRelay.list,PROXY
```

### Stash / Surge
```
[Rule]
RULE-SET,https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/AppleRelay/AppleRelay.list,PROXY
```
