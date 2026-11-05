// 精简抓包：homepage/hub 顶部 icon_set + all_top_opts（Surge $done 标准写法）
var body = $response.body;
var url = $request.url;
if (url.indexOf('/api/alexa/homepage/hub') >= 0 && body) {
  try {
    var obj = JSON.parse(body);
    var r = obj.result || {};
    var out = {};
    if (Array.isArray(r.icon_set)) {
      out.icon_set = r.icon_set.map(function (i) {
        return (i.app_name || i.name || '') + '|' + (i.link || i.url || '');
      });
    } else { out.icon_set = typeof r.icon_set; }
    if (Array.isArray(r.all_top_opts)) {
      out.all_top_opts = r.all_top_opts.map(function (i) {
        return 'tab' + (i.tab_id !== undefined ? i.tab_id : '?') + ':' + (i.name || i.tab_name || i.title || '') + '|' + (i.link || '');
      });
    } else { out.all_top_opts = typeof r.all_top_opts; }
    if (Array.isArray(r.module_order)) {
      out.module_order = r.module_order.map(function (m) { return m.module_name || ''; }).slice(0, 40);
    }
    out.top_keys = Object.keys(r);
    var s = JSON.stringify(out);
    console.log('PDD_TOP ' + s.slice(0, 3000));
  } catch (e) {
    console.log('PDD_TOP_ERR ' + e);
  }
}
$done({ body: body });
