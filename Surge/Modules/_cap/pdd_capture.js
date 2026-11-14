// 诊断脚本：记录所有 api.pinduoduo.com 响应的 URL，确认脚本机制是否工作
if (typeof $response !== 'undefined') {
  var url = $request.url || '';
  console.log('PDD_URL: ' + url.slice(0, 120));
  if (url.indexOf('alexa/homepage/hub') !== -1 && $response.body) {
    try {
      var j = JSON.parse($response.body);
      var r = j.result || j.data || j;
      console.log('RESULT_KEYS: ' + Object.keys(r).join(','));
      if (r.dy_module) console.log('DY_KEYS: ' + Object.keys(r.dy_module).join(','));
    } catch (e) { console.log('ERR: ' + e); }
  }
}
$done({});
