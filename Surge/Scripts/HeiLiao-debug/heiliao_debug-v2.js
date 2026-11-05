// 临时抓包：dump 黑料 App 接口原始响应，定位广告字段（用 notification 输出，notify 级别可见）
var body = $response.body;
var url = $request.url;
try {
  var obj = JSON.parse(body);
  var keys = Object.keys(obj);
  var ads = [];
  function findAd(o, path, depth) {
    if (depth > 3 || !o) return;
    for (var k in o) {
      if (/ad|banner|float|notice|popup|guide|red|activity|dialog|mask|slide|scroll|inter|launch|splash|gdt|advert/i.test(k)) {
        ads.push(path + "." + k + "=" + JSON.stringify(o[k]).slice(0, 120));
      }
      if (typeof o[k] === "object") findAd(o[k], path + "." + k, depth + 1);
    }
  }
  findAd(obj, "", 0);
  var tail = url.split("/").pop();
  $notification.post("HL抓包 " + tail, "KEYS: " + keys.join(","), ads.length ? ads.join("\n") : "无广告字段");
} catch (e) {
  $notification.post("HL抓包错误", url.slice(-50), String(e));
}
$done({});
