// 抓 heiliao.com 网页 HTML，找广告元素类名/id
var body = $response.body || "";
var url = $request.url;
// 找广告相关 class/id
var patterns = [
  /class="[^"]*(addbox|footer-desc|notice_container|gotoclick|list-sec|ad-|-ad|banner|float|popup|dialog|notice|guide|mask|app-download|download|goto)[^"]*"/gi,
  /id="[^"]*(addbox|footer|notice|gotoclick|list-sec|ad|banner|float|popup|dialog)[^"]*"/gi
];
var found = [];
patterns.forEach(function(re){
  var m = body.match(re);
  if (m) found = found.concat(m.slice(0, 20));
});
var uniq = Array.from(new Set(found));
$notification.post("HL网页抓包", url.slice(0, 60), uniq.length ? uniq.join("\n") : "无匹配广告元素");
$done({});
