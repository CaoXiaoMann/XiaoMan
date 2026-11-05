let body = $response.body;

if (/<\/head>/.test(body) && body.indexOf('hl-kill-addbox') < 0) {
  // 1) CSS：隐藏横幅（对静态渲染的横幅）
  const css = `<style id="hl-kill-addbox-css">
.addbox,.add-box,.add_box,.add-to-home,.addhome,.addhome-bar,.addhome-banner,
.download-banner,.download-bar,.app-download,.app-download-bar,.pwa-banner,.pwa-tip,
.pwa-install,.install-app,.install-bar,#addbox,.bottom-banner,.bottom-bar,.fixed-bottom
{display:none !important;visibility:hidden !important;opacity:0 !important;height:0 !important;min-height:0 !important;}
</style>`;

  // 2) JS：持续删除 JS 动态渲染的横幅（对抗反复创建）
  const js = `<script id="hl-kill-addbox">
(function(){
  function kill(){
    var sels=['.addbox','.add-box','.add_box','#addbox','.add-to-home','.addhome'];
    sels.forEach(function(s){
      document.querySelectorAll(s).forEach(function(el){ el.remove(); });
    });
  }
  // 立即执行 + DOMContentLoaded + 持续监听
  kill();
  document.addEventListener('DOMContentLoaded', kill);
  window.addEventListener('load', kill);
  setInterval(kill, 300);
  // MutationObserver：监听新增节点，出现横幅立即删
  var mo = new MutationObserver(function(){ kill(); });
  mo.observe(document.documentElement, {childList:true, subtree:true});
})();
</script>`;

  body = body.replace('</head>', css + js + '</head>');
  $done({ body });
} else {
  $done({});
}
