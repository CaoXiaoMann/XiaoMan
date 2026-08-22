# 今日油价（小组件版）

⛽ 全国实时油价小组件，支持所有省份和城市，实时显示 92/95/98 号汽油和柴油价格。

数据源：http://m.qiyoujiage.com/

## 插件链接

```
https://raw.githubusercontent.com/CaoXiaoMann/XiaoMan/main/Scripts/今日油价/今日油价.js
```

## 使用方法（Egern 小组件）

在 **Egern 小组件编辑** 里添加脚本，并配置环境变量。

### 环境变量

| 名称 | 值 | 说明 |
|------|-----|------|
| `region` | 省份/城市拼音 | 例如 `hainan/haikou`、`guangdong/guangzhou` |
| `SHOW_TREND` | `true` / `false` | 是否显示调价趋势 |

### 地区代码示例

- 直辖市：`beijing`、`shanghai`、`tianjin`、`chongqing`
- 广东：`guangdong/guangzhou`  江苏：`jiangsu/nanjing`
- 福建：`fujian/fuzhou`  浙江：`zhejiang/hangzhou`
- 陕西：`shanxi-3/xian`  ⚠️  山西：`shanxi-1/taiyuan` ⚠️
- 也可以访问 `http://m.qiyoujiage.com/{地区}.shtml` 查看自己省份拼音

## 功能特性

- 🎯 支持全国所有省份和城市
- 📍 标题自动显示当前填写的地区
- ⛽ 实时显示 92/95/98 号汽油和柴油价格
- 🌙 深色模式自动适配
- 📱 全 iPhone 机型适配
- 🔄 内置缓存，网络异常时使用上次数据