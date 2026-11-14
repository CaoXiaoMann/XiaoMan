// 临时抓包：dump 拼多多首页 hub 接口 dy_module 的子节点名，定位买菜/补贴栏在 8.25.0 的真实路径
function walk(o, path) {
  if (o === null || typeof o !== 'object') return;
  if (Array.isArray(o)) { for (let i = 0; i < Math.min(o.length, 30); i++) walk(o[i], path + '[' + i + ']'); return; }
  for (const k of Object.keys(o)) {
    const p = path + '.' + k;
    // 打印 dy_module 下所有子节点，以及任何含 fresh/subsidy/买菜/补贴 的节点
    if (/dy_module/.test(path) && Object.keys(o).length) {
      // 只在 dy_module 直接子层打印
    }
    if (/fresh|subsidy|billion|买菜|补贴|recommend_fresh|entrance/i.test(k)) {
      console.log('HIT ' + p + ' = ' + (typeof o[k] === 'object' ? '{' + Object.keys(o[k]||{}).slice(0,8).join(',') + '}' : String(o[k]).slice(0,40)));
    }
    if (o[k] && typeof o[k] === 'object') walk(o[k], p);
  }
}

if (typeof $response !== 'undefined' && $response.body) {
  const url = $request.url || '';
  if (/alexa\/homepage\/hub/.test(url)) {
    console.log('===== PDD HOME CAPTURE (8.25.0) =====');
    try {
      const j = JSON.parse($response.body);
      const r = j.result || j.data || j;
      console.log('result keys: ' + JSON.stringify(Object.keys(r)));
      const dy = r.dy_module;
      if (dy && typeof dy === 'object') {
        console.log('dy_module keys: ' + JSON.stringify(Object.keys(dy)));
      } else {
        console.log('dy_module 不存在/类型: ' + typeof dy);
      }
      walk(r, '');
    } catch (e) { console.log('PARSE ERR ' + e); }
    console.log('===== END =====');
  }
}
$done({});
