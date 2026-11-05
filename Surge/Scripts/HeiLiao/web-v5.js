let body = $response.body;

// 黑料网去广告 web-v5：删外链广告(.tjtagmanager通用标记)+横幅+弹窗
if (/<\/head>/.test(body) && body.indexOf('hl-kill-ads') < 0) {
  const css = `
<style id="hl-kill-ads-css">
.tjtagmanager,.gotoclick,.pgx-card,.addbox{display:none!important}
</style>`;
  body = body.replace('</head>', css + '</head>');

  const script = `
<script id="hl-kill-ads">
(function(){
  var cssText='.tjtagmanager,.gotoclick,.pgx-card,.addbox{display:none!important}';
  function addCSS(){if(document.getElementById('hl-kill-ads-css'))return;var s=document.createElement('style');s.id='hl-kill-ads-css';s.textContent=cssText;document.head.appendChild(s);}
  addCSS();
  var AD=/约炮|娱乐城|棋牌|裸色|春药|hlwh|18hlw|最新网址|获取地址邮箱|下载.*[Aa][Pp][Pp]/;
  function isAd(el){
    var c=(el.className&&el.className.toString?el.className.toString():'');
    if(/(^|\\s)(tjtagmanager|gotoclick|pgx-card|addbox)(\\s|$)/.test(c))return true;
    if(/van-popup|popup-wrapper|popup-panel/.test(c)){if(AD.test(el.innerText||''))return true;}
    if(el.tagName==='A'){var h=el.getAttribute('href')||'';if(/^https?:/i.test(h)&&!/heiliao\\.com|18hlw\\.com/i.test(h)&&/(^|\\s)(tjtagmanager|gotoclick|pgx-card)(\\s|$)/.test(c))return true;}
    return false;
  }
  function kill(){
    addCSS();
    document.querySelectorAll('.tjtagmanager,.gotoclick,.pgx-card,.addbox,.van-popup,.van-overlay,.popup-wrapper,.popup-panel').forEach(function(el){
      if(isAd(el)){el.style.display='none';var p=el.parentNode;if(p&&p.parentNode)p.parentNode.removeChild(p);else if(p)p.removeChild(el);}
    });
  }
  kill();
  setInterval(kill,200);
  new MutationObserver(kill).observe(document.documentElement,{childList:true,subtree:true});
})();
</script>`;
  body = body.replace('</body>', script + '</body>');
}

$done({ body: body });
