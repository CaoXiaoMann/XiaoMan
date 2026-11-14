// 临时抓包：dump 拼多多个人中心响应里含「补贴/大放送/领取/惊喜」字样的节点完整路径
// 用完即删，不保留
function walk(o, path) {
  if (o === null || typeof o !== 'object') return;
  if (Array.isArray(o)) {
    for (let i = 0; i < o.length && i < 40; i++) walk(o[i], path + '[' + i + ']');
    return;
  }
  for (const k of Object.keys(o)) {
    const v = o[k];
    const p = path + '.' + k;
    // 节点名或字符串值命中关键词 → 打印路径 + 值片段
    const kv = (typeof v === 'string') ? v : '';
    if (/补贴|大放送|领取|惊喜|专享|福利/.test(k) || /补贴|大放送|领取|惊喜/.test(kv)) {
      let s = 'HIT ' + p + ' = ';
      if (typeof v === 'string') s += JSON.stringify(v.slice(0, 60));
      else if (typeof v === 'object') s += '{' + Object.keys(v).slice(0, 10).join(',') + '}';
      else s += String(v);
      console.log(s);
    }
    if (v && typeof v === 'object') walk(v, p);
  }
}

if (typeof $response !== 'undefined' && $response.body) {
  const url = $request.url || '';
  if (/philo\/personal\/hub/.test(url)) {
    console.log('===== PDD SUBSIDY CAPTURE =====');
    try {
      const j = JSON.parse($response.body);
      const root = j.data || j;
      console.log('ROOT keys: ' + JSON.stringify(Object.keys(root)));
      walk(root, '');
    } catch (e) {
      console.log('PARSE ERR ' + e);
    }
    console.log('===== END =====');
  }
}
$done({});
