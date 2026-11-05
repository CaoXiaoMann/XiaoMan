// 黑料诊断v3：只处理 HTML 页面（按 Content-Type 过滤），注入去横幅 CSS + 红条标记
var body = $response.body || "";
var url = $request.url;
var ct = ($response.headers && ($response.headers["Content-Type"] || $response.headers["content-type"])) || "";

// 只处理 HTML 页面，跳过图片/CSS/JS/统计等子资源
if (ct.indexOf("text/html") < 0) {
  $done({});
}

try {
  var hasAddbox = body.indexOf('addbox') >= 0;
  var hasHead = body.indexOf('</head>') >= 0;

  // 去横幅 CSS
  var css = '<style>.addbox,.add-box,.add_box,.add-to-home,.addhome,.download-banner,.download-bar,.app-download,.pwa-banner,.pwa-tip,#addbox{display:none !important;visibility:hidden !important;opacity:0 !important;height:0 !important;min-height:0 !important;}</style>';

  // 显眼红条标记（验证注入生效）
  var marker = '<div id="hl-test-marker" style="position:fixed;top:0;left:0;right:0;z-index:99999;background:red;color:white;font-size:18px;padding:10px;text-align:center;font-weight:bold;">HL-FIX-TEST HTML注入生效</div>';

  var injected = false;
  if (hasHead && body.indexOf('hl-test-marker') < 0) {
    body = body.replace('</head>', css + marker + '</head>');
    injected = true;
  }

  $notification.post('HL诊断v3', 'addbox=' + hasAddbox + ' injected=' + injected + ' size=' + body.length, 'CT=' + ct.slice(0, 30));
  $done({ body: body });
} catch (e) {
  $notification.post('HL诊断v3错误', url.slice(-40), String(e));
  $done({});
}
