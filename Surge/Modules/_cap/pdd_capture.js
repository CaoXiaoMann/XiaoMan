// 极简抓包：dump 拼多多首页 hub 的 result 顶层 keys + dy_module keys
if (typeof $response !== 'undefined' && $response.body) {
  var url = $request.url || '';
  if (url.indexOf('alexa/homepage/hub') !== -1) {
    console.log('=== HOME START ===');
    try {
      var j = JSON.parse($response.body);
      var r = j.result || j.data || j;
      console.log('RESULT_KEYS: ' + Object.keys(r).join(','));
      if (r.dy_module) {
        console.log('DY_KEYS: ' + Object.keys(r.dy_module).join(','));
      } else {
        console.log('DY_KEYS: (no dy_module)');
      }
    } catch (e) {
      console.log('ERR: ' + e);
    }
    console.log('=== HOME END ===');
  }
}
$done({});
