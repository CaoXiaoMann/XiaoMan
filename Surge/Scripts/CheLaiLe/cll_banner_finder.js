// 车来了 banner 定位脚本（临时，定位后删除）
// 检测所有 chelaile API 响应体，命中 banner 特征词则弹出完整 URL
let body = '';
try { body = $response.body || ''; } catch (e) {}
const url = $request.url;
const kw = ['京东', 'jdl', '滑雪', '寄递', '立减', 'banner', 'flowPos', 'advert', 'adConfig'];
let hit = '';
if (body) {
  for (const k of kw) {
    if (body.indexOf(k) !== -1) { hit = k; break; }
  }
}
if (hit) {
  const snippet = body.replace(/\s+/g, ' ').slice(0, 180);
  $notification.post('🎯banner源[' + hit + ']', url.replace(/\?.*/, ''), snippet);
}
$done({});
