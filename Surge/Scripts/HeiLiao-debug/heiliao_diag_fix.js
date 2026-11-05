// 黑料诊断v2：注入显眼测试标记 + 去横幅 CSS，肉眼验证注入是否生效
var body = $response.body || "";
var url = $request.url;
try {
  var hasAddbox = body.indexOf('addbox') >= 0;
  var hasHead = body.indexOf('</head>') >= 0;
  var hasBody = body.indexOf('<body') >= 0;

  // 1) 去横幅 CSS
  var css = '<style>.addbox,.add-box,.add_box,.add-to-home,.addhome,.download-banner,.download-bar,.app-download,.pwa-banner,.pwa-tip,#addbox{display:none !important;visibility:hidden !important;opacity:0 !important;height:0 !important;min-height:0 !important;}</style>';

  // 2) 显眼测试标记（页面顶部红条，验证注入是否生效）
  var marker = '<div id="hl-test-marker" style="position:fixed;top:0;left:0;right:0;z-index:99999;background:red;color:white;font-size:18px;padding:10px;text-align:center;font-weight:bold;">HL-FIX-TEST 注入生效</div>';

  var injected = false;
  if (hasHead && body.indexOf('hl-test-marker') < 0) {
    body = body.replace('</head>', css + marker + '</head>');
    injected = true;
  }

  // 诊断报告（简短，方便通知显示）
  var diag = 'addbox=' + hasAddbox + ' head=' + hasHead + ' body=' + hasBody + ' injected=' + injected + ' size=' + body.length;
  $notification.post('HL诊断v2', diag, '红条=注入生效 / 无红条=未生效');

  $done({ body: body });
} catch (e) {
  $notification.post('HL诊断错误', url.slice(-40), String(e));
  $done({});
}
