// 临时抓包：dump 拼多多个人中心聚合接口的关键节点结构到 script-log
// 用完即删，不保留
function logNode(name, v) {
  try {
    const t = Array.isArray(v) ? 'array[' + v.length + ']' : typeof v;
    let s = '  ' + name + ' (' + t + ')';
    if (v && typeof v === 'object') {
      const ks = Object.keys(v);
      s += ' keys=' + JSON.stringify(ks.slice(0, 25));
    } else if (typeof v === 'string') {
      s += ' = ' + v.slice(0, 80);
    }
    console.log(s);
  } catch (e) { console.log('  ' + name + ' <err>'); }
}

if (typeof $response !== 'undefined' && $response.body) {
  const url = $request.url || '';
  console.log('===== PDD CAPTURE ' + url.slice(0, 120) + ' =====');
  try {
    const j = JSON.parse($response.body);
    const root = j.data || j;
    const keys = Object.keys(root);
    console.log('ROOT keys(' + keys.length + '): ' + JSON.stringify(keys));
    // 关注三类：月卡 / 钱包 / 补贴·横幅·活动
    const KW = /card|wallet|qianbao|subsid|promot|banner|activity|marketing|coupon|benefit|red_?pack|hongbao|welfare|gift|task/i;
    for (const k of keys) {
      if (KW.test(k)) logNode(k, root[k]);
    }
    // 钱包/月卡单独深挖一层
    for (const k of ['wallet', 'monthly_card_entrance', 'personal_center_style_v2_vo', 'icon_set']) {
      if (root[k] && typeof root[k] === 'object') {
        console.log('DEEP ' + k + ': ' + JSON.stringify(root[k]).slice(0, 600));
      }
    }
  } catch (e) {
    console.log('PARSE ERR ' + e + ' raw=' + $response.body.slice(0, 200));
  }
  console.log('===== END =====');
}
$done({});
