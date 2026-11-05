let body = $response.body;

// 增强版 CSS：覆盖更多广告/横幅/浮层元素（在原版基础上补充）
if (/<\/head>/.test(body)) {
  const css = `
<style>
/* 原版黑料去广告 */
.editormd-preview blockquote,
.footer-desc,
.addbox,
#notice_container,
.gotoclick,
.list-sec,
/* 增强补充：下载横幅/浮层/弹窗 */
.add-to-home,
.addhome,
.app-download,
.download-banner,
.download-bar,
.app-notice,
.to-app,
.open-app,
.guide-download,
.fixed-bottom,
.fixed-bottom-bar,
.bottom-banner,
.bottom-bar,
[style*="position: fixed"][style*="bottom"],
[style*="position:fixed"][style*="bottom"],
#addbox,
.addbox,
.add-box,
.add_box,
.addhome-bar,
.addhome-banner,
.notice-bar,
.notice-banner,
#app_notice,
.app_notice,
.download-app,
.download-app-bar,
.open-in-app,
.goto-app,
.app-tip,
.tip-download,
.install-app,
.install-bar,
.launch-app,
.to-home-screen,
.homescreen-tip,
.pwa-tip,
.pwa-banner,
.pwa-install {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  height: 0 !important;
  min-height: 0 !important;
}
</style>`;
  body = body.replace(/<\/head>/, "</head>" + css);
  $done({ body });
}

$done({});
