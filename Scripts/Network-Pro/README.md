# Network-Pro（网络诊断雷达增强版）

作者：@iTHking

## 脚本链接

```
https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Scripts/Network-Pro/Network-Pro.js
```

## 可选环境变量

- `POLICY`=指定策略组（默认你的配置兜底）
- `YS=1`：显示 IP 的地方启用隐私打码，例如 123.123.123.123 -> 123.123.*.*
- `YS=0` 或不设置：不打码
- `XY`：手动指定协议，例如 VLESS / Trojan / HY2 / AnyTLS
- `XY` 未设置：继续按原逻辑从 Egern 上下文 / 节点元数据 / 节点名尝试识别

## 策略优先级

`POLICY` ＞ `LMT` / `AI` ＞ 单服务内置候选策略名匹配 ＞ 不指定 policy

## 单服务匹配逻辑

- `POLICY` 为空，`LMT`/`AI` 也为空时，每个服务单独使用自己的候选策略名表
- 每个服务在本轮刷新中只匹配一次
- 匹配成功后缓存本轮结果
- 匹配不到时该服务不传 policy，走 Widget 默认请求方式
- 服务小国旗来自该服务实际使用策略的出口地区，不再复用顶部当前代理出口

## 注意

⚠️ 信息密度高所以目前仅适配大尺寸组件