// 抓包 v2：捕获所有 api.pinduoduo.com 响应，记录 URL，提取 homepage/hub 与 oak/render 关键字段
function httpResponse(req) {
  var u = req.url || '';
  if (u.indexOf('api.pinduoduo.com') < 0) return { body: req.body };
  try {
    var obj = JSON.parse(req.body || '{}');
    var out = { url: u.split('?')[0].replace('https://api.pinduoduo.com', '') };
    if (u.indexOf('homepage/hub') >= 0) {
      var r = obj.result || {};
      out.top_keys = Object.keys(r).slice(0, 50);
      out.all_top_opts = r.all_top_opts;
      out.dy_keys = r.dy_module ? Object.keys(r.dy_module) : null;
      out.bottom_tabs = r.bottom_tabs;
    }
    if (u.indexOf('oak/integration/render') >= 0) {
      out.ui_keys = obj.ui ? Object.keys(obj.ui) : null;
      out.live_section = (obj.ui && obj.ui.live_section) ? obj.ui.live_section : null;
      out.result_keys = obj.result ? Object.keys(obj.result).slice(0, 50) : null;
    }
    var s = JSON.stringify(out);
    if (s.length > 8000) s = s.slice(0, 8000) + '...TRUNC';
    console.log('PDD_DEBUG ' + s);
  } catch (e) {
    console.log('PDD_DEBUG_ERR ' + u.split('?')[0]);
  }
  return { body: req.body };
}
