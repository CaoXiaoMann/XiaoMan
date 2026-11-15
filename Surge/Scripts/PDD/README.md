# 拼多多去广告模块

两个版本，去广告主体逻辑一致（开屏广告、底栏多多视频、会场入口、聊天页精选推荐及推广、订单页推广、搜索词、个人中心推广），区别仅在**是否屏蔽多多买菜 / 百亿补贴 / 个人中心补贴横幅**。

| 模块 | 文件 | 多多买菜 | 百亿补贴 | 个人中心 200 元补贴横幅 | 说明 |
|------|------|---------|---------|------------------------|------|
| PDD（去买菜补贴栏版） | `PDD.sgmodule` | ❌ 屏蔽 | ❌ 屏蔽 | ❌ 屏蔽 | 首页更精简，买菜/百亿/补贴横幅全隐藏 |
| PDD2（Yi-r8 原版） | `PDD2.sgmodule` | ✅ 保留 | ✅ 保留 | ✅ 保留 | 只去广告，保留买菜/百亿/补贴入口 |

> 注意：两者**不要同时启用**（都走同一批 `api.pinduoduo.com` MITM 重写，重复注入会有冲突风险）。按需二选一。
>
> 若只想保留部分入口（例如保留百亿补贴但屏蔽买菜），可在对应模块里删/留以下字段：
> - 屏蔽百亿补贴：`delpaths([["result","dy_module","billion_subsidy_entrance_dy"]])`
> - 屏蔽多多买菜：`delpaths([["result","dy_module","recommend_fresh_info"]])`
> - 屏蔽个人中心补贴横幅：`delpaths([["personal_banner"]])` + `delpaths([["title_bar_items"]])`

## 安装

- PDD（屏蔽买菜/百亿/补贴）：
  `https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Surge/Scripts/PDD/PDD.sgmodule`
- PDD2（保留买菜/百亿/补贴）：
  `https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Surge/Scripts/PDD/PDD2.sgmodule`

在 Surge → 模块 → 从 URL 安装，粘贴上面的链接即可。

## 模块要点

- 拦截 `api.pinduoduo.com` 的 HTTPDNS 直连请求（`/d` 路径），强制走域名 → MITM 解密 → Body Rewrite 生效。
- 需在 Surge 开启 **HTTPS 解密（MITM）**，并信任证书；`api.pinduoduo.com` 由模块自动追加到 MITM hostname。
- 更新后若 Body Rewrite 不生效，检查 Surge 是否已加载最新模块（点「更新模块」）。
