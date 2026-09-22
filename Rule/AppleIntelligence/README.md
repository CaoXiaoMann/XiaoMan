# Apple Intelligence / Siri / iCloud Private Relay 分流规则

**21 条**去重规则（bare，无策略），引用时自行指定代理分组。

> ⚠️ Apple Intelligence 需要在**支持区域**（如美国）的节点上才能用，引用时把策略换成你对应的落地节点组，而不是普通 PROXY。

## 引用

**raw 直链：**
```
https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/AppleIntelligence/AppleIntelligence.list
```

### Egern
```yaml
rule-providers:
  AppleIntelligence:
    type: remote
    url: https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/AppleIntelligence/AppleIntelligence.list
    interval: 86400
    format: list
    behavior: classical
```

### Loon / Stash / Surge
```
[Rule]
RULE-SET,https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/AppleIntelligence/AppleIntelligence.list,<美国/支持区节点组>
```

## 覆盖域名
- **Private Relay 中继**：`apple-relay.apple.com` / `.cloudflare.com` / `.fastly-edge.com` / `.akamaized.net` / `.mask.apple-dns.net`、`cp4.cloudflare.com`
- **iCloud mask 网关**：`mask.icloud.com`、`mask-h2.icloud.com`、`gateway.icloud.com`、`mask.apple-dns.net`、`mask-api.fe.apple-dns.net`、`mask-t.apple-dns.net`、`mask-api.icloud.com`
- **Siri / Apple Intelligence**：`guzzoni.apple.com`、`smoot.apple.com`、`api-siri-prod.apple.com`、`DOMAIN-KEYWORD,siri`
- **定位 / 静态资源**：`ls.apple.com`（含 `gspe1-ssl.ls.apple.com`）、`apps.mzstatic.com`
