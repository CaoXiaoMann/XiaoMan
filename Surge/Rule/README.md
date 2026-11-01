# Surge 分流规则集（Rule/）

本目录存放 Surge 格式的分流规则集，与 `../Egern/Rule/`（Egern 格式）一一对齐。

## 文件说明

每个规则一个子目录，内含 Surge `RULE-SET` 格式的纯文本文件（每行一条规则，不含策略部分）：

```
Rule/
├─ Apple/Apple.list        # Apple 分流
├─ Google/Google.list      # Google 分流
├─ YouTube/YouTube.list    # YouTube 分流
└─ ...（共 17 个，与 Egern/Rule 对齐）
```

## 在 Surge 配置中引用

在 `[Rule]` 段用 `RULE-SET` 引用（raw.githubusercontent.com 自托管）：

```ini
[Rule]
RULE-SET,https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Surge/Rule/Google/Google.list,Proxy
RULE-SET,https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Surge/Rule/YouTube/YouTube.list,YouTube
...
FINAL,Proxy,dns-failed
```

- 规则集文件格式：纯文本每行一条规则（`DOMAIN` / `DOMAIN-SUFFIX` / `DOMAIN-KEYWORD` / `IP-CIDR` / `GEOIP` 等），可选 `no-resolve`、`extended-matching` 参数。
- `FINAL` 不允许出现在规则集文件内；`FINAL` 必须写在 `[Rule]` 段最后。
- 文件顶部以 `#` 开头为注释。

> 来源：MagicRule（https://magicrule.pages.dev/#/c/Surge），更新日期见各文件头。
