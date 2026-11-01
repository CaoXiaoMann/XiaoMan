# PingMe 签到 + 视频奖励

自动化签到、看视频赚 Coins，支持多账号、随机 IP 伪装、断线自动重试、每日统计。

## Quantumult X 配置

```conf
[task_local]
20 8,20 * * * https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Scripts/PingMe/PingMe.js, tag=PingMe签到, enabled=true

[rewrite_local]
^https:\/\/api\.pingmeapp\.net\/app\/queryBalanceAndBonus url script-request-header PingMe.js

[MITM]
hostname = api.pingmeapp.net
```

## Egern 配置

```
# 在 Scripts 标签页添加脚本，URL 填入：
# https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Scripts/PingMe/PingMe.js
# Script 类型选择 'cron'，设置 cron 表达式：20 8,20 * * *
```

## 功能特性

- 🎯 多账号全自动适配
- 🎬 自动签到 + 看视频领奖励
- 🌐 随机伪装 IP
- 🔄 网络异常自动重试
- 📊 PingMe 风格汇总通知