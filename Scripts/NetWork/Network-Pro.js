/**
 * 📌 桌面小组件: 🛡️ 网络诊断雷达 (实时全量刷新 + 释放 IPv6 落地版)
 * 🎨 解锁落地出口的 IPv6 限制，完美适配双栈/纯 v6 代理节点，集成动态缩短防挤压
 * 文件名: Network-Pro.js
 */
export default async function(ctx) {
  // 1. 统一 UI 规范颜色 (全局 C 对象)
  const C = {
    bg: { light: '#FFFFFF', dark: '#121212' },       
    barBg: { light: '#0000001A', dark: '#FFFFFF22' },
    text: { light: '#1C1C1E', dark: '#FFFFFF' },     
    dim: { light: '#8E8E93', dark: '#8E8E93' },      
    
    cpu: { light: '#007AFF', dark: '#0A84FF' },      // 用于左侧本地列
    mem: { light: '#AF52DE', dark: '#BF5AF2' },      // 用于右侧代理列
    disk: { light: '#FF9500', dark: '#FF9F0A' },     // 用于中危/机房
    netRx: { light: '#34C759', dark: '#30D158' },    // 用于纯净/原生住宅 (绿)
    netTx: { light: '#5856D6', dark: '#5E5CE6' },    
    
    yellow: { light: '#FFCC00', dark: '#FFD60A' },
    red: { light: '#FF3B30', dark: '#FF453A' }
  };

  const safeParse = (text) => {
    if (!text) return {};
    try { return JSON.parse(text); } catch { return {}; }
  };

  // IP 地址动态缩短优化函数（防止 IPv6 挤压字号）
  const fmtIP = (ip) => {
    if (!ip || typeof ip !== 'string') return "获取失败";
    if (ip.includes(':') && ip.length > 16) {
      const parts = ip.split(':');
      return parts.length > 2 ? `${parts[0]}:${parts[1]}...${parts[parts.length - 1]}` : ip;
    }
    return ip;
  };

  const fmtProxyISP = (isp) => {
    if (!isp) return "未知";
    let s = String(isp);
    if (/it7/i.test(s)) return "IT7 Network";
    if (/dmit/i.test(s)) return "DMIT Network";
    if (/cloudflare/i.test(s)) return "Cloudflare";
    if (/akamai/i.test(s)) return "Akamai";
    if (/amazon|aws/i.test(s)) return "AWS";
    if (/google/i.test(s)) return "Google Cloud";
    if (/microsoft|azure/i.test(s)) return "Azure";
    if (/alibaba|aliyun/i.test(s)) return "阿里云";
    if (/tencent/i.test(s)) return "腾讯云";
    if (/oracle/i.test(s)) return "Oracle Cloud";
    return s.length > 11 ? s.substring(0, 11) + "..." : s; 
  };

  const getFlag = (code) => {
    if (!code || code.toUpperCase() === 'TW') return '🇨🇳'; 
    if (code.toUpperCase() === 'XX' || code === 'OK') return '✅';
    return String.fromCodePoint(...code.toUpperCase().split('').map(c => 127397 + c.charCodeAt()));
  };

  // 高级浏览器请求头伪装
  const BASE_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
  const commonHeaders = { 
    "User-Agent": BASE_UA, 
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Cache-Control": "no-cache"
  };

  const readBody = async (r) => {
    if (!r) return "";
    if (typeof r.body === "string" && r.body.length) return r.body;
    if (typeof r.text === "function") {
      try { const t = await r.text(); return typeof t === "string" ? t : ""; } catch { return ""; }
    }
    return "";
  };

  // 2. 获取本地网络状态
  const d = ctx.device || {};
  const isWifi = !!d.wifi?.ssid;
  let netName = "未连接", netIcon = "antenna.radiowaves.left.and.right";
  
  const netInfo = (typeof $network !== 'undefined') ? $network : (ctx.network || {});
  let localIp = netInfo.v4?.primaryAddress || d.ipv4?.address || "获取失败";
  let gateway = netInfo.v4?.primaryRouter || d.ipv4?.gateway || "无网关";

  if (isWifi) { 
    netName = d.wifi.ssid; 
    netIcon = "wifi"; 
  } else if (d.cellular?.radio) {
    const radioMap = { "GPRS": "2.5G", "EDGE": "2.75G", "WCDMA": "3G", "LTE": "4G", "NR": "5G", "NRNSA": "5G" };
    const cellType = radioMap[d.cellular.radio.toUpperCase().replace(/\s+/g, "")] || d.cellular.radio;
    netName = cellType;
    gateway = "蜂窝内网";
  }

  // 3. 第一阶段实时请求
  const fetchLocal = async () => {
    try {
      const res = await ctx.http.get('https://myip.ipip.net/json', { headers: commonHeaders, timeout: 3500 });
      const body = safeParse(await res.text());
      if (body?.data?.ip) return { ip: body.data.ip, loc: `${body.data.location[1] || ""} ${body.data.location[2] || ""}`.trim() };
    } catch (e) {}
    return { ip: "获取失败", loc: "未知" };
  };

  // ⚡ 关键修改：移除 v4 限制，允许获取 IPv6 落地出口地址
  const fetchProxyRawIP = async () => {
    try {
      const res = await ctx.http.get('https://ident.me', { timeout: 3000 });
      const ip = (await res.text())?.trim();
      return ip || null;
    } catch { return null; }
  };

  const fetchLocalDelay = async () => {
    const start = Date.now();
    try { await ctx.http.get('https://www.baidu.com', { timeout: 2000 }); return `${Date.now() - start} ms`; } catch (e) { return "超时"; }
  };

  const fetchProxyDelay = async () => {
    const start = Date.now();
    try { await ctx.http.get('https://cp.cloudflare.com/generate_204', { timeout: 2000 }); return `${Date.now() - start} ms`; } catch (e) { return "超时"; }
  };

  // --- 流媒体与 AI 解锁检测逻辑 ---
  async function checkNetflix() {
    try {
      const checkStatus = async (id) => {
        const r = await ctx.http.get(`https://www.netflix.com/title/${id}`, { timeout: 3500, headers: commonHeaders, followRedirect: false }).catch(() => null);
        return r ? r.status : 0;
      };
      return (await checkStatus(70143836)) === 200 ? "OK" : ((await checkStatus(81280792)) === 200 ? "🍿" : "❌");
    } catch { return "❌"; }
  }

  async function checkDisney() {
    try {
      const res = await ctx.http.get("https://www.disneyplus.com", { timeout: 3500, headers: commonHeaders, followRedirect: false }).catch(() => null);
      if (!res || res.status === 403) return "❌";
      return (res.headers?.location || res.headers?.Location || "").includes("unavailable") ? "❌" : "OK";
    } catch { return "❌"; }
  }

  async function checkTikTok() {
    try {
      const r = await ctx.http.get("https://www.tiktok.com/explore", { timeout: 3500, headers: commonHeaders, followRedirect: false }).catch(() => null);
      if (!r || r.status === 403 || r.status === 401) return "❌";
      const body = await readBody(r);
      if (body.includes("Access Denied") || body.includes("Please wait...")) return "❌";
      const m = body.match(/"region":"([A-Z]{2})"/i);
      return m?.[1] ? m[1].toUpperCase() : "OK";
    } catch { return "❌"; }
  }

  async function checkChatGPT() {
    try {
      const traceRes = await ctx.http.get("https://chatgpt.com/cdn-cgi/trace", { timeout: 3000 }).catch(() => null);
      const m = (await readBody(traceRes))?.match(/loc=([A-Z]{2})/);
      return m?.[1] ? m[1].toUpperCase() : "OK";
    } catch { return "❌"; }
  }

  async function checkClaude() {
    try {
      const res = await ctx.http.get("https://claude.ai/login", { timeout: 4000, headers: commonHeaders }).catch(() => null);
      if (!res) return "❌";
      const body = await readBody(res);
      if (body.includes("App unavailable") || body.includes("certain regions")) return "❌";
      if (res.status === 403 && (body.includes("cf-turnstile") || body.includes("Just a moment"))) return "OK";
      return (res.status === 200 || res.status === 301 || res.status === 302) ? "OK" : "❌";
    } catch { return "❌"; }
  }

  async function checkGemini() {
    try {
      const res = await ctx.http.get("https://gemini.google.com/app", { timeout: 3500, headers: commonHeaders, followRedirect: false }).catch(() => null);
      return (!res || (res.headers?.location || res.headers?.Location || "").includes("faq")) ? "❌" : "OK";
    } catch { return "❌"; }
  }

  // 执行第一阶段并发请求
  const [localData, proxyRawIP, localDelay, proxyDelay] = await Promise.all([
    fetchLocal(), fetchProxyRawIP(), fetchLocalDelay(), fetchProxyDelay()
  ]);

  // 4. 第二阶段：远端高精地理数据及解锁并发请求
  const currentIP = proxyRawIP || "获取失败";

  const fetchProxyFull = async () => {
    try { const res = await ctx.http.get(`https://ipapi.co/${currentIP}/json/`, { timeout: 4000 }); return safeParse(await res.text()); } catch { return {}; }
  };
  const fetchPurityFull = async () => {
    try { const res = await ctx.http.get('https://my.ippure.com/v1/info', { timeout: 4000 }); return safeParse(await res.text()); } catch { return {}; }
  };

  const [fullData, purData, rNF, rDP, rTK, rGPT, rCL, rGM] = await Promise.all([
    fetchProxyFull(), fetchPurityFull(),
    checkNetflix(), checkDisney(), checkTikTok(), checkChatGPT(), checkClaude(), checkGemini()
  ]);

  const cc = fullData.country_code || "XX";
  
  // 国家/地区高级映射字典
  const ccMap = {
    "CN": "中国", "HK": "香港", "MO": "澳门", "TW": "台湾", "SG": "新加坡", 
    "JP": "日本", "KR": "韩国", "MY": "马来西亚", "TH": "泰国", "VN": "越南", 
    "PH": "菲律宾", "ID": "印尼", "IN": "印度", "AU": "澳大利亚", "NZ": "新西兰",
    "KH": "柬埔寨", "LA": "老挝", "MM": "缅甸", "PK": "巴基斯坦", "BD": "孟加拉",
    "LK": "斯里兰卡", "KZ": "哈萨克斯坦", "UZ": "乌兹别克斯坦", "FJ": "斐济",
    "US": "美国", "CA": "加拿大", "MX": "墨西哥", "BR": "巴西", "AR": "阿根廷", 
    "CL": "智利", "CO": "哥伦比亚", "PE": "秘鲁", "UY": "乌拉圭", "PA": "巴拿马",
    "UK": "英国", "GB": "英国", "DE": "德国", "FR": "法国", "NL": "荷兰", 
    "RU": "俄罗斯", "IT": "意大利", "ES": "西班牙", "CH": "瑞士", "SE": "瑞典", 
    "NO": "挪威", "FI": "芬兰", "DK": "丹麦", "IE": "爱尔兰", "BE": "比利时", 
    "AT": "奥地利", "PL": "波兰", "CZ": "捷克", "HU": "匈牙利", "RO": "罗马尼亚", 
    "UA": "乌克兰", "TR": "土耳其", "GR": "希腊", "PT": "葡萄牙", "BG": "保加利亚",
    "EE": "爱沙尼亚", "LV": "拉脱维亚", "LT": "立陶宛", "LU": "卢森堡", "IS": "冰岛",
    "SK": "斯洛伐克", "SI": "斯洛文尼亚", "HR": "克罗地亚", "RS": "塞尔维亚", "CY": "塞浦路斯",
    "AE": "阿联酋", "SA": "沙特", "IL": "以色列", "ZA": "南非", "EG": "埃及", 
    "MA": "摩洛哥", "KW": "科威特", "QA": "卡塔尔", "OM": "阿曼", "BH": "巴林",
    "NG": "尼日利亚", "KE": "肯尼亚", "GH": "加纳", "DZ": "阿尔及利亚"
  };

  // 核心云机房城市高级汉化字典
  const cityMap = {
    "tokyo": "东京", "osaka": "大阪", "nagoya": "名古屋", "fukuoka": "福冈",
    "hong kong": "香港", "hongkong": "香港", "taipei": "台北", "hsinchu": "新竹", 
    "singapore": "新加坡", "seoul": "首尔", "incheon": "仁川", "macau": "澳门",
    "bangkok": "曼谷", "kuala lumpur": "吉隆坡", "manila": "马尼拉", "jakarta": "雅加达",
    "ho chi minh city": "胡志明市", "hanoi": "河内", "phnom penh": "金边",
    "mumbai": "孟办", "bangalore": "班加罗尔", "chennai": "金奈", "new delhi": "新德里",
    "sydney": "悉尼", "melbourne": "墨尔本", "brisbane": "布里斯班", "perth": "珀斯",
    "los angeles": "洛杉矶", "san francisco": "旧金山", "new york": "纽约", 
    "seattle": "西雅图", "sanjose": "圣何塞", "san jose": "圣何塞", "santa clara": "圣克拉拉", 
    "chicago": "芝加哥", "miami": "迈阿密", "ashburn": "阿什本", "oregon": "俄勒冈", 
    "dallas": "达拉斯", "atlanta": "亚特兰大", "phoenix": "凤凰城", "houston": "休斯敦",
    "denver": "丹佛", "salt lake city": "盐湖城", "las vegas": "拉斯维加斯", "boston": "波士顿",
    "toronto": "多伦多", "montreal": "蒙特利尔", "vancouver": "温哥华", "mexico city": "墨西哥城",
    "sao paulo": "圣保罗", "rio de janeiro": "里约热内卢", "buenos aires": "布宜诺斯艾利斯", "santiago": "圣地亚哥",
    "frankfurt": "法兰克福", "london": "伦敦", "paris": "巴黎", "amsterdam": "阿姆斯特丹",
    "manchester": "曼彻斯特", "berlin": "柏林", "munich": "慕尼黑", "hamburg": "汉堡",
    "marseille": "马赛", "milan": "米兰", "rome": "罗马", "madrid": "马德里", "barcelona": "巴塞罗那",
    "zurich": "苏黎世", "geneva": "日内瓦", "stockholm": "斯德哥尔摩", "oslo": "奥斯陆",
    "helsinki": "赫尔辛基", "copenhagen": "哥本哈根", "dublin": "都柏林", "brussels": "布鲁塞尔",
    "vienna": "维也纳", "warsaw": "华沙", "prague": "布格", "budapest": "布达佩斯",
    "moscow": "莫斯科", "st petersburg": "圣彼得堡", "saint petersburg": "圣彼得堡",
    "kiev": "基辅", "kyiv": "基辅", "istanbul": "伊斯坦布尔", "lisbon": "里斯本",
    "dubai": "迪拜", "abu dhabi": "阿布扎比", "riyadh": "利雅得", "jeddah": "吉达",
    "tel aviv": "特拉维夫", "johannesburg": "约翰内斯堡", "cape town": "开普敦", "cairo": "开罗"
  };

  const cityName = fullData.city || "";
  const cnCountry = ccMap[cc.toUpperCase()] || fullData.country_name || "未知";
  const cnCity = cityMap[cityName.toLowerCase()] || cityName;
  
  const finalLocationString = (cnCountry === cnCity || cnCity === "") ? cnCountry : `${cnCountry} ${cnCity}`;

  const finalProxy = {
    ip: fullData.ip || currentIP,
    loc: `${getFlag(cc)} ${finalLocationString}`.trim(),
    isp: fmtProxyISP(fullData.org || fullData.asn),
    cc: cc
  };
  const finalPurity = purData;
  const finalUnlocks = { rNF, rDP, rTK, rGPT, rCL, rGM };

  // 5. 数据清洗与规范化转换
  const isRes = finalPurity?.isResidential;
  let nativeText = "未知属性", nativeIc = "questionmark.building.fill", nativeCol = C.dim;
  if (isRes === true) { nativeText = "原生住宅"; nativeIc = "house.fill"; nativeCol = C.netRx; } 
  else if (isRes === false) { nativeText = "商业机房"; nativeIc = "building.2.fill"; nativeCol = C.disk; }

  const risk = finalPurity?.fraudScore;
  let riskTxt = "无数据", riskCol = C.dim, riskIc = "questionmark.circle.fill";
  if (risk !== undefined && risk !== null) {
    if (risk >= 70) { riskTxt = `高危 (${risk})`; riskCol = C.red; riskIc = "xmark.shield.fill"; } 
    else if (risk >= 30) { riskTxt = `中危 (${risk})`; riskCol = C.disk; riskIc = "exclamationmark.triangle.fill"; } 
    else { riskTxt = `纯净 (${risk})`; riskCol = C.netRx; riskIc = "checkmark.shield.fill"; }
  }

  const fmtUnlock = (name, res, cc) => {
    let flag = "🚫";
    if (res === "🍿" || res === "APP") flag = res;
    else if (res !== "❌") flag = getFlag(res === "OK" || res === "XX" ? cc : res);
    return `${name} ${flag}`; 
  };
  
  const textVideo = `${fmtUnlock('NF', finalUnlocks.rNF, finalProxy.cc)}  ${fmtUnlock('DP', finalUnlocks.rDP, finalProxy.cc)}  ${fmtUnlock('TK', finalUnlocks.rTK, finalProxy.cc)}`;
  const textAI = `${fmtUnlock('GPT', finalUnlocks.rGPT, finalProxy.cc)}  ${fmtUnlock('CL', finalUnlocks.rCL, finalProxy.cc)}  ${fmtUnlock('GM', finalUnlocks.rGM, finalProxy.cc)}`;

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const TIME_COL = { light: 'rgba(0,0,0,0.3)', dark: 'rgba(255,255,255,0.3)' };

  // 6. 抗挤压自适应网格行组件
  const Row = (ic, icCol, label, val, valCol) => ({
    type: 'stack', direction: 'row', alignItems: 'center', gap: 5,
    children: [
      { type: 'image', src: `sf-symbol:${ic}`, color: icCol, width: 11, height: 11 },
      { type: 'text', text: label, font: { size: 10.5, weight: 'regular' }, textColor: C.dim, maxLines: 1, minScale: 0.85 }, 
      { type: 'spacer' },
      { type: 'text', text: val, font: { size: 10.5, weight: 'medium' }, textColor: valCol, maxLines: 1, minScale: 0.75 }
    ]
  });

  // 7. UI 输出结构
  return {
    type: 'widget', 
    padding: 14,
    backgroundColor: C.bg, 
    children: [
      { type: 'stack', direction: 'row', alignItems: 'center', gap: 6, children: [
          { type: 'image', src: 'sf-symbol:waveform.path.ecg', color: C.text, width: 16, height: 16 },
          { type: 'text', text: '网络诊断雷达', font: { size: 14, weight: 'bold' }, textColor: C.text },
          { type: 'spacer' },
          { type: 'text', text: timeStr, font: { size: 10, weight: 'medium' }, textColor: TIME_COL }
      ]},
      { type: 'spacer', length: 12 }, 
      
      { type: 'stack', direction: 'row', gap: 10, children: [
          // 【左边栏】：本地网络
          { type: 'stack', direction: 'column', gap: 4.5, flex: 1, children: [
              Row(netIcon, C.cpu, "环境", netName, C.text),
              Row("wifi.router.fill", C.cpu, "网关", gateway, C.text),
              Row("iphone", C.cpu, "内网", fmtIP(localIp), C.text),             
              Row("globe.asia.australia.fill", C.cpu, "公网", fmtIP(localData.ip), C.text), 
              Row("map.fill", C.cpu, "位置", localData.loc, C.text),
              Row("timer", C.cpu, "延迟", localDelay, C.text), 
              Row("play.tv.fill", C.cpu, "影视", textVideo, C.text) 
          ]},

          // 中央垂直分割线
          { type: 'stack', width: 0.5, backgroundColor: C.barBg },
          
          // 【右边栏】：中转代理出口
          { type: 'stack', direction: 'column', gap: 4.5, flex: 1, children: [
              Row("paperplane.fill", C.mem, "出口", fmtIP(finalProxy.ip), C.text), 
              Row("mappin.and.ellipse", C.mem, "落地", finalProxy.loc, C.text),
              Row("server.rack", C.mem, "厂商", finalProxy.isp, C.text),
              Row(nativeIc, nativeCol, "属性", nativeText, C.text), 
              Row(riskIc, riskCol, "纯净", riskTxt, riskCol),
              Row("timer", C.mem, "延迟", proxyDelay, C.text), 
              Row("cpu", C.mem, "AI", textAI, C.text) 
          ]}
      ]},
      { type: 'spacer' }
    ]
  };
}