# 钱迹/账单应用直连规则

4 条域名走直连, 覆盖钱迹记账 App 及其账单图片 CDN。

## 域名清单

| 域名 | 用途 |
|------|------|
| qianjiapp.com | 钱迹 App 主域名 |
| xxoojoke.com | 相关域名 |
| litangkj.com | 相关域名 |
| qianjibillimage.kodo-accelerate.cn-south-1.qiniucs.com | 账单图片 CDN (七牛云) |

## 在 Egern 中引用

作为 rule_set 引用 (策略在主配置里指定):

```yaml
- rule_set:
    name: 钱迹账单
    match: https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Rule/QianJi/QianJi.yaml
    policy: DIRECT
    disabled: false
    update_interval: 86400
```

或直接内联 (每条 domain_suffix 的 match 是单个字符串):

```yaml
- domain_suffix:
    name: 钱迹
    match: qianjiapp.com
    policy: DIRECT
- domain_suffix:
    name: 笑话
    match: xxoojoke.com
    policy: DIRECT
- domain_suffix:
    name: 理塘
    match: litangkj.com
    policy: DIRECT
- domain_suffix:
    name: 账单图片CDN
    match: qianjibillimage.kodo-accelerate.cn-south-1.qiniucs.com
    policy: DIRECT
```

## 格式

`QianJi.yaml` 采用 **Egern 原生规则集格式** (`domain_suffix_set` 列表), 符合 [Egern 官方文档](https://egernapp.com/zh-CN/docs/configuration/rules)。
规则集内所有条件为逻辑或关系, 任一匹配则整个规则集匹配。
原始规则为 Surge/Loon `.list` 格式, 已转换为 Egern 原生格式。
