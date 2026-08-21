# WeTalk 签到 + 视频奖励

自动化签到、看视频赚 Coins，支持多账号、随机 UA / IP 伪装、断线自动重试。

## Quantumult X 配置

```conf
[task_local]
20 8,20 * * * https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Scripts/WeTalk/WeTalk.js, tag=WeTalk签到, enabled=true

[rewrite_local]
^https:\/\/api\.wetalkapp\.com\/app\/queryBalanceAndBonus url script-request-header WeTalk.js

[MITM]
hostname = api.wetalkapp.com
```

## Egern 配置

```
# 在 Scripts 标签页添加脚本，URL 填入：
# https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Scripts/WeTalk/WeTalk.js
# Script 类型选择 'cron'，设置 cron 表达式：20 8,20 * * *
```

## 功能特性

- 🎯 多账号全自动适配
- 🎬 自动签到 + 看视频领奖励
- 🌐 随机 UA + 随机伪装 IP
- 🔄 网络异常自动重试（3 次）
- 📊 PingMe 风格汇总通知