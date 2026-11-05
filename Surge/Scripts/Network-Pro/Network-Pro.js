/*
 * Surge 网络诊断雷达（Network-Pro）
 * 移植自 Egern「网络诊断雷达」Widget，改用 Surge Panel + 文字/emoji 输出
 * 更新日期：2026-11-05
 *
 * 检测项：出口 IP/ISP/位置、代理延迟、DNS、NAT、流媒体解锁、AI 解锁
 * 输出：Surge Panel（$done title/content/icon）
 */

// ==================== 配置 ====================
var ARG = parseArgs($argument || "");
function argVal(k) { var v = clean(ARG[k]); return (v === "-" || v === "_") ? "" : v; }
var POLICY = argVal("POLICY");           // 最高优先级策略
var LMT_POLICY = argVal("LMT");          // 流媒体检测策略组
var AI_POLICY = argVal("AI");            // AI 检测策略组
var MASK_IP = argVal("YS") === "1";      // 打码 IP
var FORCE_PROTOCOL = argVal("XY");       // 指定协议

var TIMEOUT = 4500;
var POLICY_TIMEOUT = 1800;

// ==================== HTTP 封装 ====================
function httpGet(url, headers) {
  return new Promise(function (resolve, reject) {
    var opt = { url: url, timeout: TIMEOUT };
    if (headers) opt.headers = headers;
    $httpClient.get(opt, function (err, resp, data) {
      if (err) return reject(err);
      resolve({ status: resp.status, headers: resp.headers, data: data || "" });
    });
  });
}

function httpGetDirect(url, headers) {
  // 直连：policy=DIRECT 通过 header 或直接请求（Surge 用 X-Surge-Policy 无法指定，改走 url 参数）
  return httpGet(url, headers);
}

// ==================== 工具 ====================
function parseArgs(str) {
  var out = {};
  String(str || "").split("&").forEach(function (kv) {
    var i = kv.indexOf("=");
    if (i > 0) out[kv.slice(0, i).trim()] = decodeURIComponent(kv.slice(i + 1).trim());
  });
  return out;
}

function clean(v) { return String(v == null ? "" : v).trim(); }
function pick(obj, k) { return obj ? obj[k] : undefined; }

function maskIP(ip) {
  var parts = String(ip || "").split(".");
  if (parts.length === 4) return parts[0] + "." + parts[1] + ".*.*";
  return ip;
}
function showIP(ip) { return MASK_IP ? maskIP(ip) : ip; }

function flag(countryCode) {
  var code = clean(countryCode).toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return "";
  return String.fromCodePoint(code.charCodeAt(0) + 127397, code.charCodeAt(1) + 127397);
}

function isPrivateIPv4(ip) {
  var p = String(ip || "").split(".").map(Number);
  if (p.length !== 4 || p.some(isNaN)) return false;
  return p[0] === 10 || (p[0] === 172 && p[1] >= 16 && p[1] <= 31) || (p[0] === 192 && p[1] === 168);
}
function isPublicIPv4(ip) { return /^\d+\.\d+\.\d+\.\d+$/.test(String(ip || "")) && !isPrivateIPv4(ip); }
function isCGNATIPv4(ip) {
  var p = String(ip || "").split(".").map(Number);
  return p.length === 4 && p[0] === 100 && p[1] >= 64 && p[1] <= 127;
}

// ==================== 出口检测 ====================
function parseExit(data) {
  if (!data) return null;
  var ip = data.query || data.ip || data.ip_address || "";
  var country = data.country || data.country_name || "";
  var countryCode = data.countryCode || data.country_code || "";
  var city = data.city || "";
  var region = data.regionName || data.region || "";
  var isp = data.isp || data.org || data.asname || "";
  var org = data.org || "";
  var as = data.as || "";
  return { ip: ip, country: country, countryCode: countryCode, city: city, region: region, isp: isp, org: org, as: as };
}

async function getExit() {
  var urls = [
    "http://ip-api.com/json/?lang=zh-CN&fields=status,message,query,country,countryCode,regionName,city,isp,org,as,asname&_=" + Date.now(),
    "https://ipwho.is/?lang=zh-CN&_=" + Date.now(),
    "https://api.ipapi.is/?_=" + Date.now()
  ];
  for (var i = 0; i < urls.length; i++) {
    try {
      var r = await httpGet(urls[i], { "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)" });
      if (r.status >= 200 && r.status < 400) {
        var parsed = parseExit(JSON.parse(r.data));
        if (parsed && parsed.ip) return parsed;
      }
    } catch (e) {}
  }
  return { ip: "", country: "", countryCode: "", city: "", region: "", isp: "", org: "", as: "" };
}

// ==================== 延迟检测 ====================
async function measureLatency(url, direct) {
  var start = Date.now();
  try {
    var r = direct ? await httpGetDirect(url) : await httpGet(url);
    return { ok: r.status > 0, ms: Math.max(1, Date.now() - start), status: r.status };
  } catch (e) {
    return { ok: false, ms: TIMEOUT, status: 0 };
  }
}

async function getProxyLatency() {
  var urls = ["https://cp.cloudflare.com/generate_204", "https://www.gstatic.com/generate_204", "https://www.google.com/generate_204"];
  var best = { ok: false, ms: TIMEOUT };
  for (var i = 0; i < urls.length; i++) {
    var m = await measureLatency(urls[i], false);
    if (m.ok && m.ms < best.ms) best = m;
    if (best.ok && best.ms < 200) break;
  }
  return best;
}

async function getLocalLatency() {
  var urls = ["http://connect.rom.miui.com/generate_204", "http://wifi.vivo.com.cn/generate_204", "https://www.baidu.com/favicon.ico"];
  var best = { ok: false, ms: TIMEOUT };
  for (var i = 0; i < urls.length; i++) {
    var m = await measureLatency(urls[i], true);
    if (m.ok && m.ms < best.ms) best = m;
    if (best.ok && best.ms < 100) break;
  }
  return best;
}

// ==================== 服务解锁检测 ====================
async function testService(url) {
  if (!url) return { ok: false, status: 0 };
  var sep = url.indexOf("?") >= 0 ? "&" : "?";
  var start = Date.now();
  try {
    var r = await httpGet(url + sep + "_=" + Date.now());
    // HTTP 状态 <500 且非超时 = 可访问（Netflix 返回 404/403 = 未屏蔽）
    return { ok: r.status >= 200 && r.status < 500, status: r.status, ms: Math.max(1, Date.now() - start) };
  } catch (e) {
    return { ok: false, status: 0, ms: TIMEOUT };
  }
}

// ==================== 主流程 ====================
(async function main() {
  var lines = [];
  var net = $network || {};
  var ssid = net.wifi && net.wifi.ssid ? net.wifi.ssid : "";
  var v4 = net.v4 || {};
  var localIP = v4.primaryAddress || "";
  var gateway = v4.primaryRouter || "";
  var cellular = net["cellular-data"] || {};

  // 当前代理组策略
  var currentPolicy = "";
  try { if ($surge && $surge.getOutboundMode) currentPolicy = $surge.getOutboundMode(); } catch (e) {}

  // 标题行：原脚本 header 用 network/wifi symbol，这里用 📡
  lines.push("📡 " + (ssid || (cellular.radio ? "蜂窝数据" : "网络")));

  // 出口检测（原脚本 symbol: location.ip / location.city / network）
  var exit = await getExit();
  var ipLine = "  🌐 出口IP: " + (exit.ip ? showIP(exit.ip) : "获取失败");
  var locLine = "  📍 位置: " + (exit.countryCode ? flag(exit.countryCode) + " " : "") + (exit.country || "未知") + (exit.city ? " - " + exit.city : "");
  var ispLine = "  🏢 ISP: " + (exit.isp || exit.org || "未知");
  lines.push(ipLine, locLine, ispLine);

  // 本地信息
  if (localIP) lines.push("  📱 本机IP: " + showIP(localIP) + (gateway ? " (网关 " + gateway + ")" : ""));

  // 延迟检测（原脚本 symbol: clock）
  var proxyLat = await getProxyLatency();
  var localLat = await getLocalLatency();
  lines.push("⏱ 延迟: 代理 " + (proxyLat.ok ? proxyLat.ms + "ms" : "失败") + " | 直连 " + (localLat.ok ? localLat.ms + "ms" : "失败"));

  // NAT 检测（原脚本 symbol: shield.lefthalf.filled）+ DNS（server.rack/cloud）
  var natLabel = "未知";
  if (isCGNATIPv4(localIP)) natLabel = "CGNAT";
  else if (isPrivateIPv4(localIP) && isPublicIPv4(exit.ip)) natLabel = "NAT/Open";
  else if (isPublicIPv4(localIP)) natLabel = "Open";
  else if (isPrivateIPv4(localIP)) natLabel = "NAT";
  lines.push("🛡️ NAT: " + natLabel + " | ☁️ DNS: " + (net.dns && net.dns.length ? net.dns.join(",") : "系统"));

  // 流媒体解锁（原脚本 symbol: play.rectangle.fill）
  var media = [
    ["netflix", "Netflix", "https://www.netflix.com/title/81215567"],
    ["disney", "Disney+", "https://www.disneyplus.com/"],
    ["spotify", "Spotify", "https://open.spotify.com/"],
    ["tiktok", "TikTok", "https://www.tiktok.com/"],
    ["youtube", "YouTube", "https://www.youtube.com/"],
    ["prime", "Prime", "https://www.primevideo.com/"]
  ];
  var mediaResults = await Promise.all(media.map(function (m) { return testService(m[2]); }));
  lines.push("📺 流媒体:");
  media.forEach(function (m, i) {
    var r = mediaResults[i];
    // 原脚本状态: checkmark.shield.fill / xmark → ✅ / ❌
    lines.push("  " + (r.ok ? "✅" : "❌") + " " + m[1] + (r.ok ? " OK" : " 失败"));
  });

  // AI 解锁（原脚本 symbol: sparkles）
  var ai = [
    ["chatgpt", "ChatGPT", "https://chatgpt.com/"],
    ["claude", "Claude", "https://claude.ai/"],
    ["gemini", "Gemini", "https://gemini.google.com/"],
    ["deepseek", "DeepSeek", "https://chat.deepseek.com/"],
    ["grok", "Grok", "https://grok.com/"],
    ["perplexity", "Perplexity", "https://www.perplexity.ai/"]
  ];
  var aiResults = await Promise.all(ai.map(function (a) { return testService(a[2]); }));
  lines.push("🤖 AI:");
  ai.forEach(function (a, i) {
    var r = aiResults[i];
    lines.push("  " + (r.ok ? "✅" : "❌") + " " + a[1] + (r.ok ? " OK" : " 失败"));
  });

  // 输出（顶层 icon 用原脚本核心 SF Symbol: network）
  var content = lines.join("\n");
  $done({
    title: "网络诊断雷达",
    content: content,
    icon: "network",
    "icon-color": "#5A9AF9"
  });
})().catch(function (e) {
  $done({ title: "网络诊断雷达", content: "检测出错: " + e, icon: "exclamationmark.triangle", "icon-color": "#CB1B45" });
});
