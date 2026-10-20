# 车来了去广告

适用于车来了 iOS 7.6.7 的 Surge 模块（兼容 7.6.6）。

## 功能

- 拦截车来了广告配置、广告任务、开屏资源与自有埋点
- 拦截抓包中发现的穿山甲、亿广、腾讯广点通、百度、快手 KCG 广告 SDK 请求
- 保留公交查询、站点、天气、通知等业务接口，避免拦截整个 `chelaile.net.cn`

## 使用

1. 安装模块：
   `https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Scripts/CheLaiLe/CheLaiLe.sgmodule`
2. Surge 开启 HTTPS 解密并安装信任证书。
3. 完全退出车来了后重新打开。
4. 若仍显示缓存广告，清理车来了缓存后重试。

本模块仅用于拦截广告请求，不修改会员状态或绕过付费功能。

## 更新记录

- **2026/10/20（7.6.7）** 用户反馈「京东快递横幅还在」，按 7.6.7 实机抓包（1073 条）复查，
  找到两个真实原因：
  1. **车来了已升到 7.6.7**，横幅位 `bigIcon` 素材从 `image3` 改投新域名
     `cdn.smartimg.chelaile.net.cn`（域名名即 smart-marketing-img），旧规则完全没覆盖
     —— 现已加 `DOMAIN-SUFFIX,smartimg.chelaile.net.cn`
  2. **7.6.7 新增广点通上报子域** `c3` / `v` / `t` / `v3`（gdt_mclick 点击上报、
     gdt_stats 上报），现已全部拦截
  顺带修掉一个隐蔽 bug：`[Rule]` 段规则行尾的 `#` 注释会被 Surge 当成正文，导致那行
  规则**整体失效**。所有行尾注释已改为独立注释行
- **2026/10/20** 按 7.6.6 实机抓包（1195 条请求）补全漏网广告：新增 25 条 DOMAIN 规则
  与 1 条 URL Rewrite，覆盖穿山甲模板 CDN `pglstatp-toutiao.com`、穿山甲日志
  `ctobsnssdk.com`、巨量/火山 `mssdk.volces.com` 等、腾讯广点通 `v2mi.gdt.qq.com`、
  `sdk.e.qq.com`、`adsmind.ugdtimg.com`、百度广告视频 `nadvideo2.baidu.com` 与素材
  `feed-image.baidu.com`、滴滴归因 `gungnir.xiaojukeji.com`、快手 KCG
  `orzonera.yingt.fun`、易点天下 `1rtb.com`、淘宝 DSP `rtb.julang.taobao.com`、
  `qh-material.taobao.com`，以及车来了埋点 `logs.chelaile.net.cn` 与
  `DataAnalysisInfo/UdidFilter`
- **2026/10/20（补）** 追加 `DOMAIN-SUFFIX,jomoxc.com`：百度广告视频在
  `nadvideo2.baidu.com` 被拦后会改走这个动态 CDN 镜像（`:7633` / `:8318`）
  拉同一个 mp4 文件，只拦主地址时视频广告照样播
- 2026/10/17 首次整理，含亿广、穿山甲、腾讯、百度广告拦截

## 验证方式

用抓包跑模拟匹配（DOMAIN / DOMAIN-SUFFIX / URL Rewrite），两份抓包均 0 条正则异常、
0 条代理工具流量误拦、0 条广告域名漏拦：

| 抓包 | 类别 | 总数 | 拦截 |
|------|------|------|------|
| 7.6.6（1189 条） | 车来了自有域名 | 151 | 70 |
| | 第三方请求 | 1038 | 937 |
| | 代理工具自身 | 6 | 0 |
| 7.6.7（1073 条） | 车来了自有域名 | 477 | 221 |
| | 第三方请求 | 588 | 424 |
| | 代理工具自身 | 8 | 0 |

7.6.7 未拦的第三方 164 条为淘宝/支付宝/高德/小红书 SDK、推送通道与通用 CDN，
均为车来了业务所需，整域拦有误伤风险。

## 抓包排查方法（换新素材时复用）

1. Surge 导出抓包（目录形式，每条目含 `basic` / `request_headers` / `response_body`）
2. `response_body` 是 **chunked 分帧 + brotli** 编码，需剥掉分帧头后 `brotli.decompress`
3. 解 `goocity/flowPos/home` 看 `advertList`，解 `adpub/sdk/adConfig` 看
   `setting.bigIcon` —— 这两个字段就是横幅与开屏的素材 URL
4. 对比前后两次抓包的域名列表，只保留「新出现」的域名，逐个判断是广告还是业务
5. 用脚本模拟规则匹配，检查正则异常数与代理工具流量误拦数是否为 0

## 故意不拦截

- `api.map.baidu.com`：百度地图 SDK 校验，屏蔽会导致定位/地图失效
- `config.jpush.cn`、`tsis.jpush.cn`、`*.getui.*`、`*.gepush.com`、`cnlogs.umeng.com`、
  `utoken.umeng.com`：推送通道与注册，屏蔽会导致到站推送收不到
- `image3.chelaile.net.cn` 整域：混有定位图标等业务图片，只按具体广告图拦截
- `sf3-cdn-tos.douyinstatic.com`、`p3-sign.douyinpic.com`、`*.xiaohongshu.com`：
  通用素材 CDN，未确认是否承载到站语音，整域拦有误伤风险
- `wcp.taobao.com`、`124.70.194.16`、`110.43.121.3`：广告追踪的
  共用 CDN 与裸 IP 回源，收益低于误伤风险
- 代理工具自身流量（`kelee.one`、`raw.githubusercontent.com` 等脚本源）

## 仍然会看到的广告（已知限制）

- **没有「广告」水印的首页横幅**（京东快递优惠券、美团权益图、本地生活展览推广）是
  车来了自家运营位。素材有两条投递通道：`cdn.smartimg.chelaile.net.cn`（7.6.7 起）
  与 `image3.chelaile.net.cn`，两者已用 DOMAIN 拦掉，**不依赖 HTTPS 解密**
- **横幅配置的解密依赖**：`goocity/flowPos`、`adpub/adConfig` 靠 URL Rewrite 拦，
  **URL Rewrite 必须 HTTPS 解密才生效**。解密失效时配置仍能取到，但素材 CDN 已被
  DOMAIN 拦掉，横幅依然加载不出来；所以解密失效时你会看到「图标/素材空白」而不是
  「广告变多」
- **若换新素材仍能看到横幅**：说明素材又换域名了。用抓包找响应体里的 `bigIcon` /
  `iconUrl` 字段即可定位，通常是 `chelaile.net.cn` 下的新子域
- **无解密依赖的兜底**：模块里留了一行注释掉的
  `# DOMAIN-SUFFIX,image3.chelaile.net.cn,REJECT`，去掉注释即可生效，代价是
  定位/站点等业务小图标也会加载失败；确认解密可用时保持注释状态
- 广告 SDK 的**本地缓存兜底**：素材在上次联网时缓存过，本次即使配置请求被拦，
  仍可能用缓存素材播一次
- **开屏广告预取**：部分 SDK 在 App 未启动时就把下一屏广告下到本地
- `sf3-cdn-tos.douyinstatic.com` 的互动广告音效、`p3-sign.douyinpic.com` 的素材图：
  承载在抖音通用 CDN 上，只能靠上游配置请求（`pglstatp-toutiao.com` 等）被拦来间接止血
- 已拦主地址 `nadvideo2.baidu.com` 后，SDK 曾改走 `*.jomoxc.com:7633/8318` 的
  动态回源镜像拉同一个视频，现已一并拦截（见模块内 `jomoxc.com` 那行的说明）
