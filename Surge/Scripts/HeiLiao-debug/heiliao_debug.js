// 临时抓包：dump 黑料 App 接口原始响应，定位广告字段
var body = $response.body;
var url = $request.url;
try {
  var obj = JSON.parse(body);
  var keys = Object.keys(obj);
  console.log("HL_DEBUG " + url + " KEYS=" + keys.join(","));
  // 递归找广告相关字段
  function findAd(o, path, depth) {
    if (depth > 3 || !o) return;
    for (var k in o) {
      if (/ad|banner|float|notice|popup|guide|red|activity|dialog|mask|slide|scroll|inter|launch|splash|gdt|advert/i.test(k)) {
        console.log("HL_AD " + path + "." + k + " = " + JSON.stringify(o[k]).slice(0, 200));
      }
      if (typeof o[k] === "object") findAd(o[k], path + "." + k, depth + 1);
    }
  }
  findAd(obj, "", 0);
} catch (e) {
  console.log("HL_DEBUG_ERR " + url + " " + e);
}
$done({});
