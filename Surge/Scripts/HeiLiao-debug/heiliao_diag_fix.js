// 黑料网诊断+修复：拦截 heiliao.com HTML，检测并直接注入去横幅 CSS
var body = $response.body || "";
var url = $request.url;
try {
  var hasAddbox = body.indexOf('addbox') >= 0;
  var hasOldCSS = body.indexOf('footer-desc') >= 0 && body.indexOf('display:none') >= 0; // 原 web.js CSS 已注入
  var hasHead = body.indexOf('</head>') >= 0;

  // 直接注入增强 CSS（不管 web.js 有没有生效）
  var css = '<style>.addbox,.add-box,.add_box,.add-to-home,.addhome,.download-banner,.download-bar,.app-download,.pwa-banner,.pwa-tip,#addbox{display:none !important;visibility:hidden !important;opacity:0 !important;height:0 !important;min-height:0 !important;}</style>';

  if (hasHead && hasAddbox && body.indexOf('hl-fix-css') < 0) {
    body = body.replace('</head>', '<style id="hl-fix-css">' + css + '</style></head>');
  }

  // 诊断报告
  var diag = 'hasAddbox=' + hasAddbox + ' hasOldCSS=' + hasOldCSS + ' hasHead=' + hasHead + ' size=' + body.length;
  $notification.post('HL诊断', url.slice(0, 50), diag);

  $done({ body: body });
} catch (e) {
  $notification.post('HL诊断错误', url.slice(-40), String(e));
  $done({});
}
