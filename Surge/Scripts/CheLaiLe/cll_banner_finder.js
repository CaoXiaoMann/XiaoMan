// 车来了 banner 定位 v2（临时，定位后删除）
// 把首页/广告相关接口的响应体原文弹出来，直接看内容
const url = $request.url;
let body = '';
try { body = $response.body || ''; } catch (e) {}
// 只关注首页、广告、flowPos、advert 相关接口
if (/encryptedHomePage|flowPos|advert|adConfig|banner|homePage|stop!|line!/i.test(url)) {
  const path = url.replace(/^https?:\/\/[^/]+/, '').replace(/\?.*/, '');
  // 响应体可能是加密串，截断展示前 200 字符 + 长度
  const snippet = body ? body.replace(/\s+/g, ' ').slice(0, 200) : '(空)';
  $notification.post('[' + path + '] len=' + body.length, '车来了响应体', snippet);
}
$done({});
