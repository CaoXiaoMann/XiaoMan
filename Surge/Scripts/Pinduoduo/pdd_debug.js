// 临时抓包：提取拼多多 homepage/hub 的 all_top_opts 与 oak/integration/render 的 live_section
function httpResponse(req) {
  var u = req.url || '';
  try {
    var obj = JSON.parse(req.body || '{}');
    var out = {};
    if (u.indexOf('homepage/hub') >= 0) {
      var r = obj.result || {};
      out.target = 'homepage_hub';
      out.top_keys = Object.keys(r).slice(0, 40);
      out.all_top_opts = r.all_top_opts;
      out.dy_module_keys = r.dy_module ? Object.keys(r.dy_module) : null;
      out.bottom_tabs = r.bottom_tabs;
    }
    if (u.indexOf('oak/integration/render') >= 0) {
      out.target = 'oak_render';
      out.ui_keys = obj.ui ? Object.keys(obj.ui) : null;
      out.live_section = (obj.ui && obj.ui.live_section) ? obj.ui.live_section : null;
      out.result_keys = obj.result ? Object.keys(obj.result).slice(0, 40) : null;
    }
    var s = JSON.stringify(out);
    if (s.length > 6000) s = s.slice(0, 6000) + '...TRUNC';
    console.log('PDD_DEBUG ' + s);
  } catch (e) {
    console.log('PDD_DEBUG_ERR ' + (req.body || '').slice(0, 300));
  }
  return { body: req.body };
}
