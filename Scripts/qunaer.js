/**
 * Qunar Ad Block - 去哪儿旅行广告屏蔽
 * 适配 Egern / Surge / Loon / Quantumult X
 * 
 * 屏蔽：
 *  - 开屏广告 (homefront)
 *  - 百度统计 (sofire)
 *  - 个推广告推送 (ido.gepush)
 *  - 运营弹窗/数据 (qbi, qde)
 *  - 取号日志 (log2.cmpassport)
 *  - 登录历史统计 (diplomat)
 *  - 热更新 (hotfix)
 *  - 广告图片CDN (qunarzz)
 *
 * 用法（Egern）：
 *  Scripts → 添加脚本 → 类型 http-request
 *  匹配 URL: ^https:\/\/[^/]+\.(qunar\.com|qunarzz\.com|baidu\.com|gepush\.com)(\/|$)
 */

// 要屏蔽的广告/统计/推送域名
const BLOCK_DOMAINS = [
    'homefront.qunar.com',     // 开屏广告
    'qde.qunar.com',           // 预加载运营位
    'qbi.qunar.com',           // 运营数据/弹窗
    'sofire.baidu.com',        // 百度统计
    'ido.gepush.com',          // 个推广告推送
    'log2.cmpassport.com',     // 取号日志
    'diplomat.qunar.com',      // 登录历史/统计
    'hotfix.qunar.com',        // 热更新
    'qunarzz.com',             // 广告图片CDN
];

const url = $request.url;
let blocked = false;

for (let i = 0; i < BLOCK_DOMAINS.length; i++) {
    if (url.indexOf(BLOCK_DOMAINS[i]) >= 0) {
        blocked = true;
        break;
    }
}

if (blocked) {
    // 直接拒绝请求
    $done({ response: { status: 403, body: 'blocked' } });
} else {
    $done({});
}