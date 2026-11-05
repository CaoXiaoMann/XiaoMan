// 抓 heiliao.com 网页 HTML，找广告元素类名/id（用 notification 输出）
var body = $response.body || "";
var url = $request.url;
try {
  var patterns = [
    /class="[^"]*(addbox|footer-desc|notice_container|gotoclick|list-sec|ad-|-ad|banner|float|popup|dialog|notice|guide|mask|app-download|download|goto|editormd)[^"]*"/gi,
    /id="[^"]*(addbox|footer|notice|gotoclick|list-sec|ad|banner|float|popup|dialog)[^"]*"/gi
  ];
  var found = [];
  patterns.forEach(function(re){
    var m = body.match(re);
    if (m) found = found.concat(m.slice(0, 20));
  });
  var uniq = Array.from(new Set(found));
  var title = "HL网页 " + url.slice(0,50) + " (" + body.length + "B)";
  if (uniq.length) {
    $notification.post(title, "广告元素:", uniq.slice(0, 10).join("\n"));
  } else {
    $notification.post(title, "无广告元素/body片段:", body.replace(/<[^>]+>/g," ").slice(0,200));
  }
} catch (e) {
  $notification.post("HL网页错误", url.slice(-50), String(e));
}
$done({});
