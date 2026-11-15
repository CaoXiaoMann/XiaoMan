// 车来了接口日志（临时定位用，定位后删除）
// 记录所有 chelaile API 请求 URL 到 Surge 事件日志
const url = $request.url;
const host = $request.headers && $request.headers['Host'] ? $request.headers['Host'] : '';
const method = $request.method || 'GET';
// 只记录业务接口（排除静态埋点 logs/atrace 减少噪音）
if (/chelaileapp\.cn|chelaile\.net\.cn/i.test(url) && !/\/h52\/report|\/adAnalysis/i.test(url)) {
  const short = method + ' ' + url.replace(/\?/, '\n?');
  $notification.post('车来了接口', host, short);
}
$done({});
