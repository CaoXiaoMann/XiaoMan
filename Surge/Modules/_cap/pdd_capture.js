// 极简抓包：dump 拼多多首页 hub 接口的顶层与 dy_module 结构
// 不用递归，避免 WKWebView JS 异常
if (typeof $response !== 'undefined' && $response.body) {
  var url = $request.url || '';
  if (url.indexOf('alexa/homepage/hub') !== -1) {
    console.log('===== HOME START =====');
    try {
      var j = JSON.parse($response.body);
      var r = j.result || j.data || j;
      // 顶层 keys
      console.log('L1: ' + Object.keys(r).join(','));
      // dy_module
      if (r.dy_module) {
        console.log('DY: ' + Object.keys(r.dy_module).join(','));
      } else {
        console.log('DY: (none)');
      }
      // 找含 买菜/补贴 的字符串值所在 key 路径（只扫两层）
      var ks = Object.keys(r);
      for (var i = 0; i < ks.length; i++) {
        var v = r[ks[i]];
        if (v && typeof v === 'object') {
          var sk = Object.keys(v);
          for (var m = 0; m < sk.length; m++) {
            var sv = v[sk[m]];
            var s = (typeof sv === 'string') ? sv : JSON.stringify(sv);
            if (s && s.indexOf('买菜') !== -1 || (s && s.indexOf('补贴') !== -1)) {
              console.log('FOUND ' + ks[i] + '.' + sk[m] + ' = ' + String(s).slice(0, 50));
            }
          }
        }
      }
    } catch (e) {
      console.log('ERR ' + e);
    }
    console.log('===== HOME END =====');
  }
}
$done({});
