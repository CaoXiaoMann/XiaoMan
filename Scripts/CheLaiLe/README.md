# 车来了去广告

适用于车来了 iOS 7.6.6 的 Surge 模块。

## 功能

- 拦截车来了广告配置、广告任务和开屏资源
- 拦截抓包中发现的穿山甲、亿广、百度广告 SDK 请求
- 保留公交查询等业务接口，避免拦截整个 `chelaile.net.cn`

## 使用

1. 安装模块：
   `https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Scripts/CheLaiLe/CheLaiLe.sgmodule`
2. Surge 开启 HTTPS 解密并安装信任证书。
3. 完全退出车来了后重新打开。
4. 若仍显示缓存广告，清理车来了缓存后重试。

本模块仅用于拦截广告请求，不修改会员状态或绕过付费功能。
