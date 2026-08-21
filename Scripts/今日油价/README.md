# 今日油价

查询全国各省市今日油价（默认陕西，可自行修改地区拼音）。

## Quantumult X 配置

```conf
[task_local]
0 8 * * * https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Scripts/今日油价/今日油价.js, tag=今日油价, enabled=true
```

## 来源

[RS0485/network-rules](https://raw.githubusercontent.com/RS0485/network-rules/main/scripts/gas-price.js)