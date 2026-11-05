let body = $response.body;

// 黑料网去广告 web-v6：横幅+弹窗（v4）+ 内容/链接识别删广告卡（不误删内链视频）
if (/<\/head>/.test(body) && body.indexOf('hlbdy-v6') < 0) {
  var css = '<style id="hlbdy-v6">' +
    '.addbox,.ad-popup,.horizontal-banner{display:none!important}' +
    '</style>';
  body = body.replace('</head>', css + '</head>');

  var js = '<script>(function(){' +
    // 广告文案：只用明确广告词（"约炮/裸舞/情趣"等新闻标题也常见，已剔除避免误删正常视频）
    'var ADW=/hlwh26|获取地址邮箱|最新网址|裸色APP|主播上新|娱乐城|棋牌|PG电子/i;' +
    'function rm(el){el.style.display="none";var p=el.parentNode;if(p&&p.parentNode)p.parentNode.removeChild(p);else if(p)p.removeChild(el);}' +
    'function kill(){' +
    // 1) 横幅/浮层：文案命中广告词即删（addbox/banner/横幅容器）
    'document.querySelectorAll("div,a,section").forEach(function(e){' +
    'var c=(e.className||"").toString();' +
    'if(/addbox|horizontal-banner|ad-popup/i.test(c)){rm(e);return;}' +
    'var t=(e.innerText||"").slice(0,200);' +
    'if(/addbox|banner|slider-item|home-nav/i.test(c) && ADW.test(t)){rm(e);}' +
    '});' +
    // 2) 列表卡：.video-item 里 href 外链（非 heiliao 内链）或文案命中广告词即删，内链视频保留
    'document.querySelectorAll(".video-item,.post-card,article").forEach(function(e){' +
    'var t=(e.innerText||"").slice(0,200);' +
    'var a=e.querySelector("a[href]");' +
    'var h=a?(a.getAttribute("href")||""):"";' +
    'var isExt=/^https?:/i.test(h) && h.indexOf("heiliao")<0;' +
    'if(isExt || ADW.test(t)){rm(e);}' +
    '});' +
    '}' +
    'kill();setInterval(kill,300);new MutationObserver(kill).observe(document.documentElement,{childList:true,subtree:true});' +
    '})()</script>';
  body = body.replace('</body>', js + '</body>');
}

$done({ body: body });
