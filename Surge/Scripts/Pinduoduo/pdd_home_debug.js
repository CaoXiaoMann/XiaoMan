// 抓包：dump homepage/hub 顶部 icon_set + all_top_opts，找多多买菜/百亿补贴
function httpResponse(req) {
  var u = req.url || '';
  if (u.indexOf('/api/alexa/homepage/hub') < 0) return { body: req.body };
  try {
    var obj = JSON.parse(req.body || '{}');
    var r = obj.result || {};
    var out = { url: u.split('?')[0] };
    // 顶部图标排：result.icon_set
    if (Array.isArray(r.icon_set)) {
      out.icon_set = r.icon_set.map(function (i) {
        return { app_name: i.app_name || i.name || '', link: i.link || i.url || '', type: i.type || '' };
      });
    } else if (r.icon_set) {
      out.icon_set_keys = Object.keys(r.icon_set);
    } else {
      out.icon_set = 'MISSING';
    }
    // 频道栏：all_top_opts
    if (Array.isArray(r.all_top_opts)) {
      out.all_top_opts = r.all_top_opts.map(function (i) {
        return { tab_id: i.tab_id, name: i.name || i.tab_name || i.title || '', link: i.link || '' };
      });
    } else {
      out.all_top_opts = r.all_top_opts || 'MISSING';
    }
    // 其他可能的入口字段
    ['icon_fold_zone', 'dy_module', 'module_order', 'home_screen_skin', 'banner'].forEach(function (k) {
      if (r[k]) out[k + '_keys'] = Array.isArray(r[k]) ? r[k].length + '_items' : Object.keys(r[k]);
    });
    var s = JSON.stringify(out);
    if (s.length > 7000) s = s.slice(0, 7000) + '...TRUNC';
    console.log('PDD_HOME_DEBUG ' + s);
  } catch (e) {
    console.log('PDD_HOME_DEBUG_ERR ' + u.split('?')[0] + ' ' + e);
  }
  return { body: req.body };
}
