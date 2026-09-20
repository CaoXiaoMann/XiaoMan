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
```

或直接内联 (不引用外部文件):

```yaml
- domain_suffix:
    name: 钱迹账单
    match:
      - qianjiapp.com
      - xxoojoke.com
      - litangkj.com
      - qianjibillimage.kodo-accelerate.cn-south-1.qiniucs.com
    policy: DIRECT
    disabled: false
```

## 格式

`QianJi.yaml` 采用 mihomo classical 规则集格式 (`payload:` 列表), 兼容 Egern / Clash Meta / mihomo。
原始规则为 Surge/Loon `.list` 格式, 已转换。
