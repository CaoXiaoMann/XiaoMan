# Rule 分流规则集

本目录存放从 [MagicRule](https://magicrule.pages.dev/#/c/Egern) 生成的 **Egern 规则集合（rule set）**，每个文件顶部标注了更新日期。

## 格式说明

全部文件均为 Egern 官方规范的**规则集合**格式（详见 <https://egernapp.com/zh-CN/docs/configuration/rules>）：

- 集合类型：`domain_set` / `domain_suffix_set` / `domain_keyword_set` / `domain_wildcard_set` / `geoip_set` / `ip_cidr_set` / `ip_cidr6_set` / `asn_set` / `url_regex_set` / `user_agent_set`
- `no_resolve: true`：IP 类规则不触发 DNS 解析，只匹配已解析的 IP
- 集合内所有条件为「逻辑或」，任一命中即整个规则集命中

## 文件列表

| 文件 | 规则名 | 说明 | 更新日期 |
|------|--------|------|----------|
| Facebook.yaml | Facebook | Facebook / Instagram | 2026-10-31 |
| YouTube.yaml | YouTube | YouTube | 2026-10-31 |
| Line.yaml | Line | LINE | 2026-10-31 |
| Twitter.yaml | Twitter | Twitter / X | 2026-10-31 |
| Spotify.yaml | Spotify | Spotify | 2026-10-31 |
| Telegram.yaml | Telegram | Telegram | 2026-10-31 |
| TikTok.yaml | TikTok | TikTok | 2026-10-31 |
| GPT.yaml | OpenAI | ChatGPT / OpenAI | 2026-10-31 |
| Google.yaml | Google | Google | 2026-10-31 |
| China.yaml | China | 中国国内域名/IP | 2026-10-31 |
| ChinaIPs.yaml | ChinaIPs | 中国 IP / ASN | 2026-10-31 |
| Lan.yaml | Lan | 局域网地址 | 2026-10-31 |
| Apple.yaml | Apple | Apple 生态 | 2026-10-31 |
| GlobalAI.yaml | GlobalAI | 全球 AI 服务 | 2026-10-31 |
| GitHub.yaml | GitHub | GitHub | 2026-10-31 |
| Global.yaml | Global | 全球（宽泛） | 2026-10-31 |

## 在 Egern 配置中引用（rule_set）

把下列 `rules:` 条目粘贴到您的 `Egern/XiaoManEgern3.0.yaml` 的 `rules:` 段即可（从上到下匹配，命中即停）。
规则集通过本仓库 raw URL 自托管引用（推送后可访问）：

```yaml
# --------- 国内直连 ---------
- rule_set:
    name: ChinaIPs                       # 中国 IP/ASN → 直连
    match: https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/ChinaIPs.yaml
    policy: DIRECT
    disabled: false
- rule_set:
    name: China                          # 中国域名 → 直连
    match: https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/China.yaml
    policy: DIRECT
    disabled: false
- rule_set:
    name: Lan                            # 局域网 → 直连
    match: https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/Lan.yaml
    policy: DIRECT
    disabled: false
- rule_set:
    name: Apple                          # Apple 生态 → 直连
    match: https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/Apple.yaml
    policy: DIRECT
    disabled: false

# --------- 海外应用分流 ---------
- rule_set:
    name: TG                             # Telegram
    match: https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/Telegram.yaml
    policy: Telegram
    disabled: false
- rule_set:
    name: TikTok                         # TikTok
    match: https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/TikTok.yaml
    policy: Telegram
    disabled: false
- rule_set:
    name: GPT                            # ChatGPT / OpenAI
    match: https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/GPT.yaml
    policy: ChatGPT
    disabled: false
- rule_set:
    name: Twitter                        # Twitter / X
    match: https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/Twitter.yaml
    policy: PROXY
    disabled: false
- rule_set:
    name: YouTube                        # YouTube
    match: https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/YouTube.yaml
    policy: PROXY
    disabled: false
- rule_set:
    name: Spotify                        # Spotify
    match: https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/Spotify.yaml
    policy: PROXY
    disabled: false
- rule_set:
    name: LINE                           # LINE
    match: https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/Line.yaml
    policy: PROXY
    disabled: false
- rule_set:
    name: Facebook                       # Facebook / Instagram
    match: https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/Facebook.yaml
    policy: PROXY
    disabled: false
- rule_set:
    name: Google                         # Google
    match: https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/Google.yaml
    policy: PROXY
    disabled: false
- rule_set:
    name: GlobalAI                       # 全球 AI 服务
    match: https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/GlobalAI.yaml
    policy: PROXY
    disabled: false
- rule_set:
    name: GitHub                         # GitHub
    match: https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/GitHub.yaml
    policy: PROXY
    disabled: false
- rule_set:
    name: Global                         # 全球（兜底前的宽泛代理）
    match: https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/Global.yaml
    policy: PROXY
    disabled: false
```

> 提示：`match` 也可改用本地相对路径（`../Rule/Facebook.yaml`），前提是 Egern 配置与 Rule 目录在设备上同时存在且用本地文件方式加载。
