# 车来了去广告

适用于车来了 iOS 7.6.6 的 Surge 模块。

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

- **2026/10/20** 按 7.6.6 实机抓包（1195 条请求）补全漏网广告：新增 25 条 DOMAIN 规则
  与 1 条 URL Rewrite，覆盖穿山甲模板 CDN `pglstatp-toutiao.com`、穿山甲日志
  `ctobsnssdk.com`、巨量/火山 `mssdk.volces.com` 等、腾讯广点通 `v2mi.gdt.qq.com`、
  `sdk.e.qq.com`、`adsmind.ugdtimg.com`、百度广告视频 `nadvideo2.baidu.com` 与素材
  `feed-image.baidu.com`、滴滴归因 `gungnir.xiaojukeji.com`、快手 KCG
  `orzonera.yingt.fun`、易点天下 `1rtb.com`、淘宝 DSP `rtb.julang.taobao.com`、
  `qh-material.taobao.com`，以及车来了埋点 `logs.chelaile.net.cn` 与
  `DataAnalysisInfo/UdidFilter`
- 2026/10/17 首次整理，含亿广、穿山甲、腾讯、百度广告拦截

## 验证方式

用同一份抓包跑模拟匹配（DOMAIN / DOMAIN-SUFFIX / URL Rewrite），结果：

| 类别 | 总数 | 拦截 | 说明 |
|------|------|------|------|
| 车来了自有域名 | 151 | 70 | 剩余 81 条为 bus/ notice/ city/ wow/ led-weather 等业务接口 |
| 第三方请求 | 1038 | 935 | 剩余 103 条为推送、统计与通用 CDN，见下方说明 |
| 代理工具自身请求 | 6 | 0 | 脚本源与订阅源，必须放行 |

其中本次新增规则单独命中 374 条。

## 故意不拦截

- `api.map.baidu.com`：百度地图 SDK 校验，屏蔽会导致定位/地图失效
- `config.jpush.cn`、`tsis.jpush.cn`、`*.getui.*`、`*.gepush.com`、`cnlogs.umeng.com`、
  `utoken.umeng.com`：推送通道与注册，屏蔽会导致到站推送收不到
- `image3.chelaile.net.cn` 整域：混有定位图标等业务图片，只按具体广告图拦截
- `sf3-cdn-tos.douyinstatic.com`、`p3-sign.douyinpic.com`、`*.xiaohongshu.com`：
  通用素材 CDN，未确认是否承载到站语音，整域拦有误伤风险
- `wcp.taobao.com`、`*.jomoxc.com`、`124.70.194.16`、`110.43.121.3`：广告追踪的
  共用 CDN 与裸 IP 回源，收益低于误伤风险
- 代理工具自身流量（`kelee.one`、`raw.githubusercontent.com` 等脚本源）
