# Egern 配置（小满的松鼠🐿️ 3.0）

小满的 Egern 3.0 配置，**已移除内置 CA 证书**（更安全，请自行生成）。
配置全文带详细中文注释，适合新手参考。

## 更新时间

**最后更新：2026-10-17**

- 同步作者 3.0 内容：策略组、DNS、规则、模块全面升级
- 移除内置 MITM 证书（`ca_p12` / `ca_passphrase`），改用 Egern 内置生成
- 全文添加小白友好的中文注释与排查指南

## 配置文件

[XiaoManEgern3.0.yaml](XiaoManEgern3.0.yaml) — 完整注释版配置

## 配置链接

```
https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Egern/XiaoManEgern3.0.yaml
```

## 🚀 新手使用教程（3 步搞定）

### 第 1 步：导入配置

1. 打开 **Egern** → 配置（Configuration）
2. 从 URL 导入 → 粘贴上面的链接
3. 更新配置

### 第 2 步：添加机场订阅（必做！）

> ⚠️ **每个地区节点组（香港/台湾/日本/新加坡/韩国/美国/泰国）都需要先添加机场订阅后就能使用了**
> 配置里的 `policies: []` 是故意留空的，靠 `filter` 关键字从你的机场订阅里自动筛选节点。
> 不加订阅 = 策略组空 = 分流规则失效 = 上不了网！

1. Egern → 订阅（Subscription）→ 添加你的机场订阅链接（一般是订阅转换后的 URL）
2. 回到配置 → 更新订阅
3. 打开 PROXY 策略组，就能看到 港/台/日/韩/美/新/泰 各分组里已经有节点了

### 第 3 步：生成并安装 CA 证书（必做！）

本配置已移除内置证书，请自行生成：

1. **Egern → 设置 → 生成 CA 证书**（会生成一个新的证书，比用别人的更安全）
2. **iPhone → 设置 → 已下载描述文件** → 找到刚下载的证书 → 安装
3. **iPhone → 设置 → 通用 → 关于本机 → 证书信任设置** → 打开对新证书的完全信任
4. 回到 Egern 更新配置

> 装了证书后，`mitm.hostnames` 里的域名（当前是 `sub.store`）才会被解密，
> Spotify 去广告、微信增强、B 站去广告等功能模块才能生效。

---

## 📝 配置结构说明（在哪里添加什么）

打开 `XiaoManEgern3.0.yaml`，按需修改：

| 位置 | 配置项 | 你要做什么 |
|------|--------|-----------|
| **基础设置** | `ipv6`、`http_port` 等 | 一般不用改 |
| **DNS 劫持** | `hijack_dns` | 控制劫持哪些 DNS 端口 |
| **数据库/延迟测试** | `geoip_db_url`、`proxy_latency_test_url` | 一般不用改 |
| **DNS 配置** | `dns.bootstrap` / `upstreams` / `forward` | 改 DNS 服务器或分流规则 |
| **策略组** | `policy_groups` | 添加/修改节点分组（smart/auto_test 类型自动从订阅筛选） |
| **分流规则** | `rules` | 添加/修改分流规则（广告拦截、国内外分流等） |
| **URL 重写** | `url_rewrites` | 添加网页跳转规则 |
| **脚本** | `scriptings` | 添加脚本链接（小组件用的） |
| **MITM** | `mitm` | 添加需要解密的域名（`hostnames.includes`） |
| **HTTP 抓包** | `http_captures` | 添加需要抓包的域名 |
| **小组件** | `widgets` | 添加桌面小组件（`script_name` 对应上面 `scriptings` 的 `name`） |
| **模块** | `modules` | 添加功能模块（去广告、会员解锁、脚本中心等） |

### 常见操作示例

**添加一个去广告模块：**
```yaml
modules:
- url: https://example.com/ad-block.lpx   # 模块链接
  enabled: true                            # 启用
```

**添加一个桌面小组件：**
```yaml
scriptings:                                # 先在这里添加脚本
- generic:
    name: 我的脚本
    script_url: https://example.com/script.js

widgets:                                   # 再在这里添加小组件
- name: 小组件名称
  script_name: 我的脚本                    # 对应上面 scriptings 的 name
```

**添加一个分流规则：**
```yaml
rules:
- rule_set:
    name: 规则名
    match: https://example.com/rules.list  # 规则集链接
    policy: PROXY                          # 走哪个策略组
    disabled: false
```

**添加一个地区节点组：**
```yaml
policy_groups:
- auto_test:
    name: 澳大利亚节点
    policies: []                           # 空！从订阅自动筛选
    flatten: true
    filter: (?i)🇦🇺|澳大利亚|\b(AU|AUS|Australia)\b
    icon: https://example.com/icon.png
    hidden: true
```

## 配置包含

- **基础设置**：IPv4 代理端口、DNS 劫持、隧道模式、状态栏 VPN 图标
- **DNS**：三套 DNS（国内 / 代理 / 海外直连），22 条 forward 规则做国内外分流
- **策略组**：PROXY / Telegram / ChatGPT / Emby / TV，7 个地区节点组（港/台/日/新/韩/泰/美）
- **分流规则**：广告拦截（AWAvenue + HTTPDNS 拦截）、Apple AI、国内直连、TG/TikTok/GPT/Twitter/YouTube/Spotify/LINE/Facebook/WeChat/GitHub/Apple
- **URL 重写**：google.cn → google.com 跳转
- **脚本**：网络诊断雷达 Pro、今日金价、今日油价
- **小组件**：网络诊断雷达 Pro、西安油价
- **模块**（25 个）：HTTPDNS 拦截、车来了、淘宝、脚本中心、Apple 天气、豆瓣热榜、Spotify 去广告+歌词翻译、豆瓣去广告、TZ 增强、Telegram 增强、百度网盘、微信、NodeTools、百度贴吧、Facebook、知乎去广告、拼多多去广告、京东去广告、12306 去广告、B 站去广告、Sub-Store、BoxJS

## ⚠️ 注意事项

1. **必须先加订阅**，否则策略组全空、几乎无法上网
2. **必须自己装 CA**，否则模块功能全部失效
3. **单模块问题排查**：如果某个 App 崩溃或功能异常，去 `modules` 里把 `enabled` 改成 `false` 排查
4. **模块过多会拖慢 DNS**，觉得卡可以按需精简
5. **配置文件有本地缓存**，改完后记得在 Egern 里点「更新配置」
6. **本配置不含任何内置证书/账号**，安全合规

---

## 📋 常见问题排查（FAQ）

| 问题 | 可能原因 | 解决办法 |
|------|---------|---------|
| 上不了网 | 没添加机场订阅，策略组为空 | Egern → 订阅 → 添加订阅链接 → 更新 |
| Spotify 打不开 | 没装 CA 证书 | 见「第 3 步：生成并安装 CA 证书」 |
| App 内功能异常 | 模块冲突 | 逐个关闭 modules 里对应模块排查 |
| 部分网站打不开 | DNS 污染 / 规则未生效 | 更新配置 → 更新订阅 → 更新规则集 |
| 节点自动切换太频繁 | auto_test 阈值太敏感 | 修改策略组的 `interval` / `tolerance` |
| 想加新的策略组 | 参考已有组结构 | 在 `policy_groups` 里追加新组 |

## 📚 官方文档

- Egern 配置总览：https://egernapp.com/zh-CN/docs/configuration/example
- JavaScript API：https://egernapp.com/zh-CN/docs/javascript-api
- URL Scheme：https://egernapp.com/zh-CN/docs/url-scheme
- FAQ：https://egernapp.com/zh-CN/docs/faq

## 📢 相关

- TG 频道：https://t.me/XiaoManWangMingTianYa
- 仓库主页：https://github.com/CaoXiaoMann/XiaoMan
